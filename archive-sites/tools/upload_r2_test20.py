#!/usr/bin/env python3
"""Upload ONLY the 20 McRetro photos validated at 15:16 on 17 November 2026.

Scope is frozen to the ten exact full/ paths and their ten thumbs/ twins.
--preflight (default): read-only checks, exact object listing, no changes.
--upload: explicitly authorised 20-object R2 upload, no existing-object overwrites.
--verify: read-only remote names, size, MIME and downloaded-byte comparison.

Requires rclone and the nearby validate_r2_upload.py and gallery_keys.py.
Never touches the 26 GB photo originals. Never publishes the gallery site.
Never deletes R2 objects. Never changes publication approval flags.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import shutil
import subprocess
import sys

from validate_r2_upload import DEFAULT_STAGE, DEFAULT_CONVERTED, FINAL_DESTINATION, validate

# FROZEN: exactly the ten distinct full-resolution keys from the owner's
# successful 2026-11-17 15:16 AEDT dry run, with the matching thumbnails.
FULL = (
    "full/accessories/eeprom-programmers/eeprom-uv-eraser/IMG_2474.jxl",
    "full/accessories/eeprom-programmers/gq-4x/IMG_2449.jxl",
    "full/accessories/eeprom-programmers/gq-4x/IMG_2475.jxl",
    "full/accessories/eeprom-programmers/gq-4x4/IMG_0841.jxl",
    "full/accessories/eeprom-programmers/minipro-tl866cs/IMG_0835.jxl",
    "full/accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04/IMG_0456.jxl",
    "full/accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04/IMG_0457.jxl",
    "full/accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04/IMG_0458.jxl",
    "full/accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04/IMG_0459.jxl",
    "full/accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04/IMG_0460.jxl",
)
KEYS = frozenset(FULL + tuple("thumbs/" + key[5:] for key in FULL))
assert len(FULL) == 10 and len(KEYS) == 20

STAGE = DEFAULT_STAGE.expanduser().absolute()
CONVERTED = DEFAULT_CONVERTED.expanduser().absolute()


def selected_rows() -> list[dict]:
    photos, all_rows, _ = validate(STAGE, CONVERTED)
    rows = sorted((r for r in all_rows if r["r2_key"] in KEYS),
                  key=lambda r: r["r2_key"])
    if len(photos) != 8412 or len(all_rows) != 16823 or len(rows) != 20:
        raise ValueError("Unexpected gallery or test-batch count; aborting")
    if {r["r2_key"] for r in rows} != KEYS:
        raise ValueError("Frozen 20-object selection differs from the upload plan")
    for row in rows:
        key = row["r2_key"]
        if row["mime"] != "image/jxl" or row["approved_for_publication"] != "NO":
            raise ValueError("Unexpected MIME/approval: " + key)
        if Path(row["local_path"]) != CONVERTED.joinpath(*key.split("/")):
            raise ValueError("Optimised local filename is not the final R2 name: " + key)
    return rows


def all_remote_objects() -> dict[str, dict]:
    """Read only. Lists the final bucket without changing its contents."""
    command = [
        "rclone", "lsjson", "--recursive", "--files-only",
        "--no-modtime", "--s3-no-check-bucket", FINAL_DESTINATION,
    ]
    result = subprocess.run(command, capture_output=True, text=True, check=False)
    if result.returncode:
        raise ValueError("Cannot read final R2 bucket: " + result.stderr[-600:])
    records = json.loads(result.stdout)
    if not isinstance(records, list):
        raise ValueError("Unexpected rclone lsjson response")
    remote = {}
    for item in records:
        if not isinstance(item, dict) or not isinstance(item.get("Path"), str):
            raise ValueError("Unexpected R2 object listing record")
        key = item["Path"]
        if key in remote:
            raise ValueError("Duplicate key in R2 listing: " + key)
        remote[key] = item
    return remote


def nul_keys(rows: list[dict]) -> bytes:
    return ("\0".join(row["r2_key"] for row in rows) + "\0").encode("utf-8")


def upload_command() -> list[str]:
    return [
        "rclone", "copy", "--files-from0", "-", "--ignore-existing",
        "--s3-no-check-bucket", "--transfers", "4", "--checkers", "8",
        "--stats", "10s", "-v", str(CONVERTED), FINAL_DESTINATION,
    ]


def verify(rows: list[dict]) -> None:
    remote = all_remote_objects()
    actual, expected = set(remote), set(KEYS)
    if actual != expected:
        missing = sorted(expected - actual)
        extra = sorted(actual - expected)
        raise ValueError(
            f"R2 object set differs from the exact 20-object test. "
            f"Missing: {missing[:5]} ({len(missing)}); "
            f"unexpected: {extra[:5]} ({len(extra)})")
    for row in rows:
        key = row["r2_key"]
        item = remote[key]
        if item.get("Size") != int(row["bytes"]):
            raise ValueError("R2 object size differs: " + key)
        if item.get("MimeType") != "image/jxl":
            raise ValueError("R2 Content-Type is not image/jxl for " + key +
                             " (got " + repr(item.get("MimeType")) + ")")
    print("PASS: exactly 20 R2 objects, all names, sizes and image/jxl metadata match.", flush=True)

    # The sample is only ~4.825 MiB. Verify actual bytes with GETs: sizes
    # and storage metadata alone do not prove photo content integrity.
    check = [
        "rclone", "check", "--download", "--one-way", "--files-from0", "-",
        "--s3-no-check-bucket", str(CONVERTED), FINAL_DESTINATION,
    ]
    status = subprocess.run(check, input=nul_keys(rows), check=False)
    if status.returncode:
        raise ValueError("Downloaded-byte comparison failed; inspect rclone output")
    print("PASS: all 20 R2 objects match the local images byte for byte.", flush=True)
    print("The other 16,803 gallery objects and all gallery HTML remain unuploaded.")


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    choice = parser.add_mutually_exclusive_group()
    choice.add_argument("--upload", action="store_true",
                        help="Perform ONLY the owner-authorised first 20-object upload")
    choice.add_argument("--verify", action="store_true",
                        help="Read back remote metadata and downloaded bytes; NO upload")
    args = parser.parse_args(argv)
    if shutil.which("rclone") is None:
        raise ValueError("rclone executable missing")
    rows = selected_rows()
    print("Validated the complete local 8,412-photo plan.", flush=True)
    print("FROZEN sample: 10 full-resolution .jxl + 10 matching .jxl thumbnails.", flush=True)
    print("Sample total: {:.3f} MiB".format(
        sum(int(row["bytes"]) for row in rows) / (1024 * 1024)), flush=True)
    if args.verify:
        verify(rows)
        return 0

    remote = all_remote_objects()
    if remote:
        raise ValueError(
            f"R2 bucket is no longer empty ({len(remote)} objects); refusing "
            "first-upload attempt. Use --verify if the test was already uploaded.")
    print("PASS: remote bucket is empty; no existing R2 objects can be overwritten.", flush=True)
    for row in rows:
        print(" ", row["r2_key"])
    if not args.upload:
        print("PREFLIGHT COMPLETE. This was read-only; no uploads or deletes.")
        print("Only run --upload when you want to execute the authorised batch.")
        return 0

    print("Uploading exactly these 20 objects. No deletes, no overwrites.", flush=True)
    rc = subprocess.run(upload_command(), input=nul_keys(rows), check=False).returncode
    if rc:
        raise ValueError(
            f"rclone copy failed with status {rc}. Do not rerun --upload blindly; "
            "first inspect the bucket and use --verify to diagnose the partial batch.")
    print("Transfer finished. Verifying remote metadata and downloaded bytes.", flush=True)
    verify(rows)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print("STOPPED: " + str(error), file=sys.stderr)
        sys.exit(2)
