#!/usr/bin/env python3
"""Publish only a specifically approved EK-1 release, preserving exact bytes."""
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import shutil
import stat
import subprocess
import sys
import tempfile
import zipfile

PIN = json.loads(Path(".github/ek1-release.json").read_text())
VERSION = PIN["version"]
COMMIT = PIN["source_commit"]
NAME = f"EK-1-v{VERSION}-offline.zip"
PREFIX = f"EK-1-v{VERSION}/"
BASE = "https://github.com/NixMcRetro/EK-1/releases/download/v" + VERSION + "/"
API = "https://api.github.com/repos/NixMcRetro/EK-1/releases/tags/v" + VERSION

def require(condition, message):
    if not condition:
        raise ValueError(message)

def fetch(url, destination):
    subprocess.run(["curl", "--fail", "--location", "--retry", "3",
                    "--retry-delay", "2", "--connect-timeout", "20",
                    "--max-time", "120", "--max-filesize", "25000000",
                    "--output", str(destination), url], check=True)

def digest(data):
    return hashlib.sha256(data).hexdigest()

def blob(data):
    return hashlib.sha1(f"blob {len(data)}\0".encode() + data).hexdigest()

def verify_archive(archive):
    expected = PIN["files"]
    with zipfile.ZipFile(archive) as z:
        require(z.comment.decode("ascii") == COMMIT, "Wrong git archive commit")
        actual = {}
        for member in z.infolist():
            name = member.filename
            require(name.startswith(PREFIX) and "\\" not in name, "Unexpected ZIP path")
            relative = name[len(PREFIX):]
            p = PurePosixPath(relative)
            require(not p.is_absolute() and ".." not in p.parts, "Unsafe ZIP path")
            require(not stat.S_ISLNK(member.external_attr >> 16), "Unexpected symlink")
            if member.is_dir():
                continue
            require(relative in expected and relative not in actual, "Unexpected/duplicate file: " + relative)
            record = expected[relative]
            require(member.file_size == record["size"], "Unexpected file size: " + relative)
            data = z.read(member)
            require(blob(data) == record["git_blob"], "Wrong source bytes: " + relative)
            actual[relative] = data
        require(set(actual) == set(expected), "Incomplete corresponding source")
    return actual

def verify_site(site):
    dest = Path(site) / "goodies/ek-1"
    source = verify_archive(dest / NAME)
    checksum = digest((dest / NAME).read_bytes())
    require((dest / (NAME + ".sha256")).read_text() == f"{checksum}  {NAME}\n", "Wrong mirrored checksum")
    expected = set(PIN["runtime"]) | {NAME, NAME + ".sha256"}
    paths = {p.relative_to(dest).as_posix() for p in dest.rglob("*") if p.is_file()}
    require(paths == expected, "Unexpected or missing hosted files")
    for name in PIN["runtime"]:
        require((dest / name).read_bytes() == source[name], "Hosted file differs: " + name)
    html = source["index.html"].decode()
    require(f"v{VERSION}" in html and html.startswith("<!doctype html>"), "Wrong standalone entrypoint")
    for ref in re.findall(r'(?:src|href)="(\./[^"]+)"', html):
        require(ref[2:] in expected, "Unpublished local dependency: " + ref)
    print(f"PASS: EK-1 v{VERSION}: {len(PIN['runtime'])} exact runtime/notice files and complete corresponding source.")

def install(site):
    dest = Path(site) / "goodies/ek-1"
    require(not dest.exists(), "Refusing to overwrite a pre-existing EK-1 directory")
    with tempfile.TemporaryDirectory() as tmp:
        temp = Path(tmp)
        fetch(API, temp / "release.json")
        rel = json.loads((temp / "release.json").read_text())
        require(rel["tag_name"] == "v" + VERSION and rel["target_commitish"] == COMMIT
                and not rel["draft"] and not rel["prerelease"], "Unapproved or unpublished release")
        assets = {a["name"]: a for a in rel["assets"]}
        for filename in (NAME, NAME + ".sha256"):
            require(assets[filename]["browser_download_url"] == BASE + filename, "Unexpected release URL")
            fetch(BASE + filename, temp / filename)
            data = (temp / filename).read_bytes()
            require(assets[filename]["digest"] == "sha256:" + digest(data), "Release asset digest mismatch")
        archive = temp / NAME
        checksum = digest(archive.read_bytes())
        require((temp / (NAME + ".sha256")).read_text() == f"{checksum}  {NAME}\n", "Release checksum mismatch")
        data = verify_archive(archive)
        dest.mkdir(parents=True)
        for name in PIN["runtime"]:
            path = dest / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data[name])
        for name in (NAME, NAME + ".sha256"):
            shutil.copyfile(temp / name, dest / name)
    verify_site(site)

if __name__ == "__main__":
    if len(sys.argv) != 3 or sys.argv[1] not in ("install", "verify"):
        raise SystemExit("Usage: ek1-package.py install|verify SITE")
    (install if sys.argv[1] == "install" else verify_site)(sys.argv[2])
