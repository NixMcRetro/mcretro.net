#!/usr/bin/env python3
"""Resumable, *photo-only* McRetro R2 upload after the verified 20-object pilot.

Owner's 17th November 2026 request is limited to the remaining 16,803
optimised photograph/thumbnail/GIF objects. Site HTML, metadata, fonts, File
Server files, and the original ~26 GB photo archive are outside this scope.

Default: validate the full local manifest and inspect R2, with NO uploads.
--upload: copy ONLY missing, allowlisted objects, NEVER overwrite or delete.
--verify: check exact remote keys, sizes, MIME and 40 downloaded-byte samples.
--deep-verify: read-only byte comparison of ALL 16,823 R2 objects (~4.277 GB).

The original 20 pilot objects must already be present with their expected
sizes and MIME types. Existing objects are excluded from transfer and are
never overwritten. If interrupted, rerun --upload to resume missing keys.

Requires rclone and nearby gallery_keys.py, validate_r2_upload.py and
upload_r2_test20.py (for the immutable, frozen pilot key set).
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import shutil
import subprocess
import sys

from upload_r2_test20 import KEYS as PILOT_KEYS, all_remote_objects
from validate_r2_upload import (
    DEFAULT_STAGE, DEFAULT_CONVERTED, FINAL_DESTINATION, validate,
)

STAGE = DEFAULT_STAGE.expanduser().absolute()
CONVERTED = DEFAULT_CONVERTED.expanduser().absolute()
EXPECTED_PHOTOS = 8412
EXPECTED_OBJECTS = 16823
EXPECTED_BYTES = 4276856102
SAMPLE_COUNT = 40


def local_plan() -> dict[str, dict]:
    """Read validated local converted image set. NO original photo tree."""
    photos, rows, total = validate(STAGE, CONVERTED)
    if (len(photos), len(rows), total) != (
        EXPECTED_PHOTOS, EXPECTED_OBJECTS, EXPECTED_BYTES
    ):
        raise ValueError(
            "Local photograph counts/bytes changed from verified checkpoint: "
            f"{len(photos)} photos, {len(rows)} objects, {total} bytes"
        )
    plan = {}
    for row in rows:
        key = row["r2_key"]
        if key in plan:
            raise ValueError("Repeated local object key: " + key)
        if row["approved_for_publication"] != "NO":
            raise ValueError("Unexpected modification to approval field for " + key)
        if Path(row["local_path"]) != CONVERTED.joinpath(*key.split("/")):
            raise ValueError("Optimised local path is not the final R2 key: " + key)
        if row["mime"] != ("image/gif" if key.endswith(".gif") else "image/jxl"):
            raise ValueError("Unexpected image MIME: " + key)
        plan[key] = row
    if len(plan) != EXPECTED_OBJECTS or not PILOT_KEYS.issubset(plan):
        raise ValueError("The expected frozen 20-object pilot is absent from the gallery plan")
    if len(PILOT_KEYS) != 20:
        raise ValueError("Pilot key list has changed; aborting")
    return plan


def audit_existing(plan: dict[str, dict],
                   remote: dict[str, dict]) -> list[str]:
    """Reject unknown remote objects or mismatched existing objects before writing."""
    unexpected = sorted(set(remote) - set(plan))
    if unexpected:
        raise ValueError(
            f"R2 contains {len(unexpected)} unexpected objects "
            f"(first {unexpected[:3]}). Refusing to upload."
        )
    absent_pilot = sorted(PILOT_KEYS - set(remote))
    if absent_pilot:
        raise ValueError(
            f"Previously verified pilot objects are missing: {absent_pilot[:3]}. "
            "No subsequent upload is permitted until reviewed."
        )
    for key, item in remote.items():
        row = plan[key]
        if item.get("Size") != int(row["bytes"]):
            raise ValueError("Existing R2 object size mismatch: " + key)
        if item.get("MimeType") != row["mime"]:
            raise ValueError(
                "Existing R2 object MIME mismatch: " + key +
                " (" + repr(item.get("MimeType")) + ")"
            )
    return sorted(set(plan) - set(remote))


def nul_keys(keys: list[str]) -> bytes:
    return ("\0".join(keys) + "\0").encode("utf-8") if keys else b""


def rclone_copy_command() -> list[str]:
    return [
        "rclone", "copy", "--files-from0", "-", "--ignore-existing",
        "--s3-no-check-bucket", "--transfers", "4", "--checkers", "8",
        "--stats", "15s", "--progress",
        str(CONVERTED), FINAL_DESTINATION,
    ]


def sampled_keys(plan: dict[str, dict]) -> list[str]:
    """Deterministic coverage from full images and thumbs, not just first album."""
    remaining = sorted(set(plan) - PILOT_KEYS)
    if len(remaining) <= SAMPLE_COUNT:
        return remaining
    return [remaining[i * (len(remaining) - 1) // (SAMPLE_COUNT - 1)]
            for i in range(SAMPLE_COUNT)]


def verify_bytes(keys: list[str]) -> None:
    command = [
        "rclone", "check", "--download", "--one-way",
        "--files-from0", "-", "--s3-no-check-bucket",
        "--stats", "30s", str(CONVERTED), FINAL_DESTINATION,
    ]
    print(f"Comparing the actual downloaded bytes of {len(keys):,} R2 objects...",
          flush=True)
    result = subprocess.run(command, input=nul_keys(keys), check=False)
    if result.returncode:
        raise ValueError(
            f"Read-only byte comparison returned status {result.returncode}; "
            "investigate before publishing."
        )


def assess(plan: dict[str, dict]) -> tuple[list[str], dict[str, dict]]:
    remote = all_remote_objects()
    missing = audit_existing(plan, remote)
    present_bytes = sum(int(plan[key]["bytes"]) for key in remote)
    missing_bytes = sum(int(plan[key]["bytes"]) for key in missing)
    print(
        f"Local: {EXPECTED_PHOTOS:,} photographs / {EXPECTED_OBJECTS:,} objects / "
        f"{EXPECTED_BYTES:,} bytes (all validated)\n"
        f"R2 already present: {len(remote):,} matching, "
        f"{present_bytes:,} bytes\n"
        f"Remaining for upload: {len(missing):,} objects, "
        f"{missing_bytes:,} bytes\n"
        "Protected originals: NOT ACCESSED. No HTML, fonts or File Server objects selected.",
        flush=True,
    )
    return missing, remote


def verify(plan: dict[str, dict], deep: bool = False) -> None:
    missing, remote = assess(plan)
    if missing:
        raise ValueError(
            f"R2 collection INCOMPLETE: {len(missing):,} objects are still absent. "
            "After reviewing the reason, rerun --upload to resume the same allowlist."
        )
    if len(remote) != EXPECTED_OBJECTS:
        raise ValueError("Unexpected complete-bucket object count")
    print(
        f"PASS: exactly {EXPECTED_OBJECTS:,} R2 keys, sizes and image MIME types "
        f"match the local catalogue ({EXPECTED_BYTES:,} bytes).",
        flush=True,
    )
    keys = sorted(plan) if deep else sampled_keys(plan)
    verify_bytes(keys)
    print(
        f"PASS: {len(keys):,} downloaded-byte comparisons match. "
        + ("ALL objects checked." if deep else
           f"Deterministic sample only; use --deep-verify for all {EXPECTED_OBJECTS:,}."),
        flush=True,
    )
    print("No gallery website, catalogue, metadata or File Server content was uploaded.")


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--upload", action="store_true",
                      help="Upload ONLY missing photo objects; requires explicit invocation")
    mode.add_argument("--verify", action="store_true",
                      help="Verify remote metadata and 40 actual byte samples, read-only")
    mode.add_argument("--deep-verify", action="store_true",
                      help="Download-check ALL 4.277 GB, read-only; slower")
    args = parser.parse_args(argv)
    if not shutil.which("rclone"):
        raise ValueError("rclone command not installed")
    plan = local_plan()
    if args.verify or args.deep_verify:
        verify(plan, deep=args.deep_verify)
        return 0
    missing, _ = assess(plan)
    if not args.upload:
        print("READ-ONLY PREFLIGHT. No upload, overwrite or deletion performed.")
        print("The owner-requested upload, if intended, is explicitly started with --upload.")
        print("Public bucket warning: every uploaded image URL is directly accessible.")
        return 0
    if not missing:
        print("All photo objects already exist; nothing to upload.")
        return 0
    # 'copy' on this exact NUL-delimited allowlist cannot traverse the rest of
    # the local tree, and --ignore-existing skips any unexpected race at a key.
    # Deliberately no recursive copy, sync, deletes, metadata upload or HTML.
    print(
        f"STARTING PHOTO-ONLY UPLOAD: exactly {len(missing):,} missing objects.\n"
        "Images will be PUBLIC at photos.mcretro.net immediately.\n"
        "No overwrites, deletes or uploads from the 26 GB original archive.",
        flush=True,
    )
    result = subprocess.run(rclone_copy_command(), input=nul_keys(missing),
                            check=False)
    if result.returncode:
        raise ValueError(
            f"Upload interrupted or failed with rclone status {result.returncode}. "
            "Nothing will be deleted. A later --upload will recheck R2 and "
            "resume only missing keys, subject to the same owner-approved scope."
        )
    print("Transfer completed. Running full remote metadata and sampled-byte verification.",
          flush=True)
    verify(plan)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, TypeError, json.JSONDecodeError) as exc:
        print("STOPPED: " + str(exc), file=sys.stderr)
        sys.exit(2)
