#!/usr/bin/env python3
"""Check the exact hosted release, not just the HTML status code."""
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile
import time

pin = json.loads(Path(".github/ek1-release.json").read_text())
name = f"EK-1-v{pin['version']}-offline.zip"
base = "https://mcretro.net/homepages/ek-1/"

def fetch(url):
    return subprocess.check_output(["curl", "--fail", "--location", "--silent", "--show-error",
                                    "--connect-timeout", "15", "--max-time", "60", url])

def check():
    html = fetch(base)
    assert f"v{pin['version']}".encode() in html, "Wrong live version"
    for path in pin["runtime"]:
        data = fetch(base + path)
        assert hashlib.sha1(f"blob {len(data)}\0".encode() + data).hexdigest() == pin["files"][path]["git_blob"], path
    archive = fetch(base + name)
    expected = fetch(base + name + ".sha256").decode()
    assert expected == f"{hashlib.sha256(archive).hexdigest()}  {name}\n"
    goodies = fetch("https://mcretro.net/goodies/").decode()
    assert "/homepages/ek-1/" in goodies and "/goodies/ek-1/" not in goodies, "Incorrect Goodies link"
    old_status = subprocess.check_output(["curl", "--silent", "--show-error", "--output", "/dev/null",
                                          "--write-out", "%{http_code}", "--connect-timeout", "15",
                                          "--max-time", "60", "https://mcretro.net/goodies/ek-1/"]).decode()
    assert old_status in ("404", "410"), "Obsolete EK-1 URL is still served or redirects: " + old_status
    print(f"PASS: live EK-1 v{pin['version']}, all runtime files, checksum and Goodies link")

for attempt in range(5):
    try:
        check()
        break
    except (AssertionError, subprocess.CalledProcessError) as e:
        if attempt == 4:
            raise
        print(f"Live deployment not yet visible: {e}", flush=True)
        time.sleep(15)
