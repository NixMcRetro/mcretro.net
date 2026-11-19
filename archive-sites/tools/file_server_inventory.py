#!/usr/bin/env python3
"""Private, File Server-only inventory and owner-review preparation.

Reads only the explicitly supplied file source directory. Never scans photos,
modifies originals, connects to R2, or publishes anything. Python 3.9+ stdlib.
Generated manifests are PRIVATE, even if they contain no approved entries.
"""
from __future__ import annotations

import argparse
from collections import defaultdict
import csv
import hashlib
import json
import mimetypes
import os
from pathlib import Path
import re
import stat
import sys
import unicodedata

REPO_ROOT = Path(__file__).resolve().parents[2]
REVIEW_FIELDS = (
    "id", "source_path", "bytes", "sha256", "risk_flags", "decision",
    "content_inspected", "privacy_approved", "rights_basis", "rights_evidence",
    "public_key", "title", "description", "category", "year", "hardware",
    "decision_notes",
)
DECISIONS = {"HOLD", "EXCLUDE", "APPROVE"}
RIGHTS = {"OWNED", "PERMISSION", "OPEN_LICENCE", "PUBLIC_DOMAIN"}
SKIP_NAMES = {".DS_Store", "Thumbs.db", "desktop.ini", ".env", ".git", ".svn"}
SKIP_SUFFIXES = {".pem", ".key", ".p12", ".pfx"}
CONTAINER_SUFFIXES = {".zip", ".7z", ".rar", ".tar", ".gz", ".iso", ".dmg", ".img"}
EMAIL = re.compile(r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", re.I)
SENSITIVE = re.compile(r"(?i)(?:password|passwd|credential|secret|private|serial[-_ ]?(?:no|number)?|imei|api[-_]?key|token)")
ABSOLUTE_PATH = re.compile(r"(?i)(?:/(?:users|home)/|[a-z]:[\\/])")
CONTROL = re.compile(r"[\x00-\x1f\x7f]")


def valid_key(key: str) -> bool:
    if not isinstance(key, str) or not key or key.startswith("/") or CONTROL.search(key):
        return False
    if any(c in key for c in ("?", "#", "\\")):
        return False
    return all(part not in ("", ".", "..") and part == part.strip() for part in key.split("/"))


def sheet_safe(value: str) -> str:
    """Prevent spreadsheet applications treating an untrusted filename as a formula."""
    return "'" + value if value.lstrip().startswith(("=", "+", "-", "@")) else value


def private_write(path: Path, data: str) -> None:
    flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL
    if hasattr(os, "O_NOFOLLOW"):
        flags |= os.O_NOFOLLOW
    fd = os.open(path, flags, 0o600)
    with os.fdopen(fd, "w", encoding="utf-8", newline="") as output:
        output.write(data)


def private_json(path: Path, payload: dict) -> None:
    private_write(path, json.dumps(payload, indent=2, ensure_ascii=False) + "\n")


def private_csv(path: Path, fields: tuple[str, ...], rows: list[dict]) -> None:
    import io
    output = io.StringIO(newline="")
    writer = csv.DictWriter(output, fieldnames=fields, extrasaction="ignore")
    writer.writeheader()
    writer.writerows(rows)
    private_write(path, output.getvalue())


def within(path: Path, parent: Path) -> bool:
    return path == parent or parent in path.parents


def roots(source: Path, stage: Path, create: bool) -> tuple[Path, Path]:
    source = source.expanduser().absolute()
    stage = stage.expanduser().absolute()
    if not source.is_dir() or source.is_symlink():
        raise ValueError("File source must be an existing, non-symlinked directory")
    if stage.is_symlink():
        raise ValueError("Review staging directory must not be a symlink")
    source_real, stage_real = source.resolve(), stage.resolve()
    if within(source_real, stage_real) or within(stage_real, source_real):
        raise ValueError("Source and staging must be in separate directory trees")
    if within(stage_real, REPO_ROOT) or within(REPO_ROOT, stage_real):
        raise ValueError("Private review outputs must remain outside the repository")
    if create:
        stage.mkdir(parents=True, exist_ok=True, mode=0o700)
        if stage.is_symlink():
            raise ValueError("Review staging directory changed to a symlink")
        stage.chmod(0o700)
    elif not stage.is_dir():
        raise ValueError("Existing private staging directory is required")
    return source_real, stage_real


def source_file(source: Path, relative: str) -> Path:
    if not valid_key(relative):
        raise ValueError("Unsafe source-relative path in inventory")
    current = source
    for part in relative.split("/"):
        current = current / part
        if current.is_symlink():
            raise ValueError("A source path changed to a symlink")
    if not current.is_file() or not stat.S_ISREG(current.stat().st_mode):
        raise ValueError("Approved source is no longer a regular file")
    if not within(current.resolve(), source):
        raise ValueError("Source file escapes the supplied root")
    return current


def checksum(path: Path) -> tuple[int, str]:
    before = path.stat()
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        while True:
            block = handle.read(1024 * 1024)
            if not block:
                break
            digest.update(block)
    after = path.stat()
    if (before.st_size, before.st_mtime_ns, before.st_ino) != (
        after.st_size, after.st_mtime_ns, after.st_ino
    ):
        raise ValueError("A source file changed during inventory hashing")
    return after.st_size, digest.hexdigest()


def risk_flags(relative: str) -> list[str]:
    flags = []
    if EMAIL.search(relative):
        flags.append("email-like filename")
    if SENSITIVE.search(relative) or ABSOLUTE_PATH.search(relative):
        flags.append("potentially sensitive filename")
    if any(p.startswith(".") for p in relative.split("/")):
        flags.append("hidden path")
    if Path(relative).suffix.casefold() in CONTAINER_SUFFIXES:
        flags.append("inspect embedded files and metadata")
    return flags


def scan(source: Path, stage: Path) -> dict:
    source, stage = roots(source, stage, create=True)
    for name in ("inventory.private.json", "owner-review.csv", "excluded.private.csv"):
        if (stage / name).exists():
            raise ValueError("Review outputs already exist; choose a fresh staging directory")
    inventory, excluded = [], []
    for base, directories, names in os.walk(source, topdown=True, followlinks=False):
        base_path = Path(base)
        keep = []
        for name in sorted(directories):
            directory = base_path / name
            rel = directory.relative_to(source).as_posix()
            if directory.is_symlink() or name in SKIP_NAMES or name.startswith("."):
                excluded.append({"source_path": sheet_safe(rel), "reason": "excluded directory or symlink"})
            else:
                keep.append(name)
        directories[:] = keep
        for name in sorted(names):
            path = base_path / name
            rel = path.relative_to(source).as_posix()
            if (name in SKIP_NAMES or name.startswith(".") or
                    path.suffix.lower() in SKIP_SUFFIXES):
                excluded.append({"source_path": sheet_safe(rel), "reason": "system or sensitive sidecar"})
                continue
            if path.is_symlink() or not path.is_file():
                excluded.append({"source_path": sheet_safe(rel), "reason": "symlink or nonregular file"})
                continue
            if not valid_key(rel):
                excluded.append({"source_path": sheet_safe(rel), "reason": "unsafe object key"})
                continue
            size, sha = checksum(path)
            category = rel.split("/")[0] if "/" in rel else "Uncategorised"
            inventory.append({
                "id": hashlib.sha256(rel.encode("utf-8")).hexdigest(),
                "source_path": rel, "bytes": size, "sha256": sha,
                "category": category, "risk_flags": risk_flags(rel),
            })
    by_hash, by_normalised = defaultdict(list), defaultdict(list)
    for item in inventory:
        by_hash[item["sha256"]].append(item)
        normal = unicodedata.normalize("NFC", item["source_path"]).casefold()
        by_normalised[normal].append(item)
    for group in by_hash.values():
        if len(group) > 1:
            for item in group:
                item["risk_flags"].append("duplicate content")
    for group in by_normalised.values():
        if len(group) > 1:
            for item in group:
                item["risk_flags"].append("case/Unicode path collision")
    inventory.sort(key=lambda item: item["source_path"].casefold())
    reviews = []
    for item in inventory:
        reviews.append({
            "id": item["id"], "source_path": sheet_safe(item["source_path"]),
            "bytes": item["bytes"], "sha256": item["sha256"],
            "risk_flags": "; ".join(item["risk_flags"]),
            "decision": "HOLD", "content_inspected": "NO", "privacy_approved": "NO",
            "rights_basis": "UNKNOWN", "rights_evidence": "", "public_key": "",
            "title": "", "description": "", "category": item["category"],
            "year": "", "hardware": "", "decision_notes": "",
        })
    private_json(stage / "inventory.private.json", {
        "schema_version": 1, "publication": "NONE", "files": inventory,
    })
    private_csv(stage / "owner-review.csv", REVIEW_FIELDS, reviews)
    private_csv(stage / "excluded.private.csv", ("source_path", "reason"), excluded)
    return {
        "candidates": len(inventory), "excluded": len(excluded),
        "duplicate_groups": sum(len(g) > 1 for g in by_hash.values()),
        "flagged": sum(bool(i["risk_flags"]) for i in inventory),
        "approved": 0, "publication": "NONE",
    }


def safe_public_text(value: str) -> bool:
    return bool(value and value == value.strip() and not CONTROL.search(value)
                and not EMAIL.search(value) and not ABSOLUTE_PATH.search(value)
                and not SENSITIVE.search(value))


def prepare(source: Path, stage: Path) -> dict:
    source, stage = roots(source, stage, create=False)
    if any((stage / n).exists() for n in (
        "approved-catalogue.preview.json", "approved-upload-plan.preview.csv",
        "approved-summary.private.json"
    )):
        raise ValueError("Approved preview outputs already exist; do not overwrite")
    for name in ("inventory.private.json", "owner-review.csv"):
        if not (stage / name).is_file() or (stage / name).is_symlink():
            raise ValueError("Expected private inventory and review files are missing")
    inventory = json.loads((stage / "inventory.private.json").read_text(encoding="utf-8"))
    if inventory.get("schema_version") != 1 or inventory.get("publication") != "NONE":
        raise ValueError("Unrecognised private inventory schema or publication state")
    files = inventory.get("files")
    if not isinstance(files, list):
        raise ValueError("Private inventory has no file list")
    by_id = {item["id"]: item for item in files}
    if len(by_id) != len(files):
        raise ValueError("Duplicate inventory IDs")
    with (stage / "owner-review.csv").open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != list(REVIEW_FIELDS):
            raise ValueError("Owner-review CSV columns are missing or changed")
        review = list(reader)
    if len(review) != len(files) or {row["id"] for row in review} != set(by_id):
        raise ValueError("Owner-review rows do not match the immutable inventory")
    if len({row["id"] for row in review}) != len(review):
        raise ValueError("Duplicate owner-review IDs")
    approved, transfers, keys = [], [], set()
    for row in review:
        item = by_id[row["id"]]
        if (row["sha256"] != item["sha256"] or row["bytes"] != str(item["bytes"])
                or row["source_path"] != sheet_safe(item["source_path"])
                or row["risk_flags"] != "; ".join(item["risk_flags"])):
            raise ValueError("Owner-review fingerprint or inventory fields changed")
        if row["decision"] not in DECISIONS:
            raise ValueError("Owner-review decision must be HOLD, EXCLUDE, or APPROVE")
        if row["decision"] != "APPROVE":
            continue
        if (row["content_inspected"] != "YES" or row["privacy_approved"] != "YES"
                or row["rights_basis"] not in RIGHTS or not row["rights_evidence"].strip()):
            raise ValueError("Approved item lacks manual content, privacy, or rights evidence")
        key = row["public_key"]
        if not valid_key(key) or not key.startswith("downloads/"):
            raise ValueError("Approved public key must be under downloads/")
        normal_key = unicodedata.normalize("NFC", key).casefold()
        if normal_key in keys:
            raise ValueError("Duplicate public download key")
        keys.add(normal_key)
        for field in ("public_key", "title", "description", "category"):
            if not safe_public_text(row[field]):
                raise ValueError("A public catalogue field requires privacy review")
        for field in ("year", "hardware"):
            if row[field] and not safe_public_text(row[field]):
                raise ValueError("A public catalogue field requires privacy review")
        year = None
        if row["year"]:
            if not (row["year"].isdigit() and len(row["year"]) == 4):
                raise ValueError("Archive year must be a four-digit integer or blank")
            year = int(row["year"])
        path = source_file(source, item["source_path"])
        size, sha = checksum(path)
        if (size, sha) != (item["bytes"], item["sha256"]):
            raise ValueError("Source bytes changed after owner review; rescan required")
        mime = mimetypes.guess_type(key)[0] or "application/octet-stream"
        approved.append({
            "path": key, "title": row["title"], "description": row["description"],
            "category": row["category"], "year": year,
            "hardware": row["hardware"], "size_bytes": size, "sha256": sha,
        })
        transfers.append({
            "r2_key": key, "source_relative_path": item["source_path"],
            "bytes": size, "sha256": sha, "content_type": mime,
            "owner_approved": "YES",
        })
    if not approved:
        raise ValueError("No manually approved files; refusing to create an empty release")
    approved.sort(key=lambda item: item["path"])
    transfers.sort(key=lambda item: item["r2_key"])
    private_json(stage / "approved-catalogue.preview.json", {
        "schema_version": 1, "files": approved,
    })
    private_csv(stage / "approved-upload-plan.preview.csv", (
        "r2_key", "source_relative_path", "bytes", "sha256",
        "content_type", "owner_approved",
    ), transfers)
    private_json(stage / "approved-summary.private.json", {
        "approved_files": len(approved), "approved_bytes": sum(x["size_bytes"] for x in approved),
        "review_sha256": hashlib.sha256(
            (stage / "owner-review.csv").read_bytes()
        ).hexdigest(), "publication": "NONE",
    })
    return {"approved": len(approved), "publication": "NONE", "deployment": "NOT_SUPPORTED"}


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("operation", choices=("scan", "prepare"))
    parser.add_argument("--source", type=Path, required=True,
                        help="Historical file archive root (not the photograph source)")
    parser.add_argument("--stage", type=Path, required=True,
                        help="PRIVATE staging directory outside both source and Git repository")
    args = parser.parse_args(argv)
    try:
        result = scan(args.source, args.stage) if args.operation == "scan" else prepare(
            args.source, args.stage
        )
        print(json.dumps(result, indent=2))
        print("Private local review only. No files have been published or uploaded.")
        return 0
    except (OSError, ValueError, KeyError, TypeError, json.JSONDecodeError) as error:
        # Print error class and short message only; avoid dumping private file paths.
        print("File Server review stopped: " + str(error), file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
