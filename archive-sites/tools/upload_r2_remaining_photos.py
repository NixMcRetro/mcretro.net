#!/usr/bin/env python3
"""Resumable, *photo-only* McRetro R2 upload after the verified 20-object pilot.

Owner's 17th November 2026 request is limited to the remaining 16,803
optimised photograph/thumbnail/GIF objects. Site HTML, metadata, fonts, File
Server files, and the original ~26 GB photo archive are outside this scope.

Default: validate the full local manifest and inspect R2, with NO uploads.
--demo: animated PHOTON UPLINK preview, no local scan or network activity.
--upload: copy ONLY missing, allowlisted objects, NEVER overwrite or delete.
--verify: check exact remote keys and sizes, public MIME/size samples and 40 downloaded-byte samples.
--deep-verify: read-only byte comparison of ALL 16,823 R2 objects (~4.277 GB).

The original 20 pilot objects must already be present with their expected
sizes and MIME types. Existing objects are excluded from transfer and are
never overwritten. If interrupted, rerun --upload to resume missing keys.

Requires rclone and nearby gallery_keys.py, validate_r2_upload.py and
upload_r2_test20.py (for the immutable, frozen pilot key set).
"""
from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
from pathlib import Path
import shutil
import subprocess
import sys
from urllib.parse import quote
from urllib.request import Request, urlopen

from r2_neon_dashboard import show_demo, run_upload_with_dashboard, require_rich, preflight_display
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
        # Fast lsjson --no-mimetype deliberately omits this field: inspecting
        # MIME for thousands of S3 objects may need a slow HEAD per object.
        # If a full-MIME result is supplied, never ignore an actual mismatch.
        mime = item.get("MimeType")
        if mime not in (None, "") and mime != row["mime"]:
            raise ValueError(
                "Existing R2 object MIME mismatch: " + key +
                " (" + repr(mime) + ")"
            )
    return sorted(set(plan) - set(remote))


def header_sample_keys(remote: dict[str, dict]) -> list[str]:
    """Known pilot plus up to 40 evenly distributed, existing non-pilot keys."""
    others = sorted(set(remote) - PILOT_KEYS)
    if len(others) <= SAMPLE_COUNT:
        sampled = others
    else:
        sampled = [others[i * (len(others) - 1) // (SAMPLE_COUNT - 1)]
                   for i in range(SAMPLE_COUNT)]
    return sorted((PILOT_KEYS & set(remote)) | set(sampled))


def verify_public_headers(plan: dict[str, dict], remote: dict[str, dict]) -> None:
    """Read-only HEAD samples for actual published Content-Type and Length.

    A fast bucket ListObjects response gives exact keys and bytes, but not MIME.
    Check all 20 pilot objects plus up to 40 dispersed existing object URLs,
    concurrently, without requiring thousands of serial S3 HEAD requests.
    """
    keys = header_sample_keys(remote)
    if not keys:
        raise ValueError("Cannot inspect public image headers: no R2 objects")
    def inspect(key: str) -> str:
        url = "https://photos.mcretro.net/" + quote(key, safe="/")
        request = Request(url, method="HEAD")
        try:
            with urlopen(request, timeout=15) as response:
                if response.status != 200:
                    raise ValueError("HTTP " + str(response.status))
                actual_mime = response.headers.get_content_type()
                size_str = response.headers.get("Content-Length", "")
                expected = plan[key]
                if actual_mime != expected["mime"]:
                    raise ValueError("public Content-Type " + repr(actual_mime) +
                                     ", expected " + repr(expected["mime"]))
                if not size_str.isdigit() or int(size_str) != int(expected["bytes"]):
                    raise ValueError("public Content-Length " + repr(size_str) +
                                     ", expected " + repr(expected["bytes"]))
        except Exception as exc:
            raise ValueError(f"Public delivery header audit failed for {key}: {exc}") from exc
        return key
    print(
        f"Checking public Content-Type and Length for {len(keys)} "
        "dispersed photos (includes all 20 pilot objects)...", flush=True
    )
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(inspect, key) for key in keys]
        # Handle failures, but allow workers to finish cleanly.
        for future in as_completed(futures):
            future.result()
    print(f"PASS: {len(keys)} sampled public image headers match.", flush=True)


def nul_keys(keys: list[str]) -> bytes:
    return ("\0".join(keys) + "\0").encode("utf-8") if keys else b""


def rclone_copy_command() -> list[str]:
    return [
        "rclone", "copy", "--files-from0", "-", "--ignore-existing",
        "--s3-no-check-bucket", "--transfers", "4", "--checkers", "8",
        "--stats", "1s", "--stats-log-level", "INFO",
        "--use-json-log", "-v",
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


def assess(plan: dict[str, dict], on_stage=None, quiet: bool = False) -> tuple[list[str], dict[str, dict]]:
    if on_stage is not None:
        on_stage(1)  # Existing R2 inventory, after validating local images.
    remote = all_remote_objects(with_mime=False)
    if on_stage is not None:
        on_stage(2)  # Validate exact keys/sizes and public delivery samples.
    missing = audit_existing(plan, remote)
    # MIME is not silently assumed correct: sample the actual browser-facing
    # JPEG XL/GIF Content-Type and byte length, and always check the full pilot.
    # Unlike rclone lsjson's default, this avoids thousands of S3 HEAD calls.
    verify_public_headers(plan, remote)
    present_bytes = sum(int(plan[key]["bytes"]) for key in remote)
    missing_bytes = sum(int(plan[key]["bytes"]) for key in missing)
    if not quiet:
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
        f"PASS: exactly {EXPECTED_OBJECTS:,} R2 keys and sizes "
        f"match the local catalogue ({EXPECTED_BYTES:,} bytes). "
        "Content-Type/Length independently checked for all pilot objects "
        "and a distributed sample; not every object's MIME type.",
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
    mode.add_argument("--demo", action="store_true",
                      help="Show the animated PHOTON UPLINK dashboard without accessing R2")
    args = parser.parse_args(argv)
    if args.demo:
        show_demo()
        return 0
    if args.upload:
        require_rich()  # Fail before any transfer if the optional UI package is absent.
    if not shutil.which("rclone"):
        raise ValueError("rclone command not installed")
    if args.verify or args.deep_verify:
        # Explicit verification modes remain independent and read-only.
        plan = local_plan()
        verify(plan, deep=args.deep_verify)
        return 0
    # Read-only preflight: show progress through local scan and remote listing.
    # This same preflight executes before real --upload as a safety gate.
    with preflight_display() as status:
        plan = local_plan()
        missing, _ = assess(plan, on_stage=status.advance, quiet=True)
        status.finish()
    missing_bytes = sum(int(plan[key]["bytes"]) for key in missing)
    print(
        f"Local: {EXPECTED_PHOTOS:,} photographs / {EXPECTED_OBJECTS:,} objects / "
        f"{EXPECTED_BYTES:,} bytes (validated)\n"
        f"R2 already present: {EXPECTED_OBJECTS - len(missing):,} matching, "
        f"{EXPECTED_BYTES - missing_bytes:,} bytes\n"
        f"Remaining for upload: {len(missing):,} objects, {missing_bytes:,} bytes\n"
        "Original 26 GB archive: NOT ACCESSED. No HTML, fonts or File Server objects selected.",
        flush=True,
    )
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
    bytes_to_send = sum(int(plan[key]["bytes"]) for key in missing)
    return_code = run_upload_with_dashboard(
        rclone_copy_command(), nul_keys(missing), bytes_to_send,
        len(missing), EXPECTED_OBJECTS - len(missing),
    )
    if return_code:
        raise ValueError(
            f"Upload interrupted or failed with rclone status {return_code}. "
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
