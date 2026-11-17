#!/usr/bin/env python3
"""Rename the existing optimised McRetro JXL files IN PLACE, without copies.

Reads ONLY:
  ~/Desktop/McRetro-R2-Staging/photo-gallery/albums.generated.json
  ~/Desktop/McRetro-R2-Staging/reports/photos-upload-plan.csv
  ~/Desktop/McRetro-R2-Staging/reports/audit-summary.json (if present)
  ~/Desktop/McRetro-PhotoGallery-Optimised-v2/full and /thumbs

Never opens or modifies the original 26 GB collection.
No Cloudflare or GitHub requests, and no R2 uploads or deletions.

Default: preview planned local moves without changing anything.
--apply: Rename optimised files and atomically fix the local upload-plan CSV.
--verify: Confirm all optimised files now use the final public filenames.
If an interruption occurs, repeat --apply to resume without overwriting files.
"""
from __future__ import annotations

import argparse
import csv
import os
from pathlib import Path
import shutil
import sys
import tempfile

from validate_r2_upload import DEFAULT_STAGE, DEFAULT_CONVERTED, validate


def _read_plan(stage: Path):
    plan = stage / 'reports/photos-upload-plan.csv'
    with plan.open(newline='', encoding='utf-8') as stream:
        reader = csv.DictReader(stream)
        if not reader.fieldnames:
            raise ValueError('Upload plan has no CSV header')
        fields = list(reader.fieldnames)
        rows = list(reader)
    return plan, fields, rows


def _exact_names(directory: Path, cache: dict[Path, set[str]]) -> set[str]:
    if directory not in cache:
        if not directory.is_dir() or directory.is_symlink():
            raise ValueError('Converted photo directory missing or symlinked: ' + str(directory))
        cache[directory] = set(os.listdir(directory))
    return cache[directory]


def prepare(stage: Path, converted: Path, *, after_partial: bool = True):
    """Preflight every image before any rename, using ONLY converted/staged data."""
    photos, checked, total = validate(stage, converted,
                                      allow_partial_local_rename=after_partial)
    if not (converted / 'full').is_dir() or not (converted / 'thumbs').is_dir():
        raise ValueError('Expected existing optimised full/ and thumbs/ directories')
    plan, fields, rows = _read_plan(stage)
    if len(rows) != len(checked):
        raise ValueError('Upload-plan rows changed during preflight')
    cache = {}
    seen_targets = set()
    actions = []
    for row in rows:
        key = row['r2_key']
        final = converted.joinpath(*key.split('/'))
        legacy = Path(row['local_path'])
        if not legacy.is_absolute():
            raise ValueError('Plan contains a relative path: ' + key)
        # The current upload plan must reference either a prior converted path
        # or the new final key path. validate() enforces that mapping.
        names = _exact_names(final.parent, cache)
        final_exact = final.name in names
        legacy_exact = legacy.name in names
        if final_exact and legacy_exact and final != legacy:
            raise ValueError('Both source and destination exist; refusing overwrite: ' + key)
        if final_exact:
            source = final
        elif legacy_exact:
            source = legacy
        else:
            raise ValueError('No exact source or final filename on disk: ' + key)
        if source.parent != final.parent:
            raise ValueError('Unexpected cross-directory rename: ' + key)
        if final.as_posix().casefold() in seen_targets:
            raise ValueError('Collision between output paths (case-insensitive): ' + key)
        seen_targets.add(final.as_posix().casefold())
        if source.is_symlink() or not source.is_file():
            raise ValueError('Invalid local converted source: ' + str(source))
        actions.append((source, final, row))
    return plan, fields, rows, actions, len(photos), total


def _write_updated_plan(plan: Path, fields: list[str], rows: list[dict]) -> None:
    """Atomically replace only the small STAGING CSV after all renames succeed."""
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile('w', newline='', encoding='utf-8',
                                         dir=plan.parent, prefix='.r2-plan-pending-',
                                         suffix='.csv', delete=False) as handle:
            temp_path = Path(handle.name)
            writer = csv.DictWriter(handle, fieldnames=fields, extrasaction='raise')
            writer.writeheader()
            writer.writerows(rows)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temp_path, plan)
    finally:
        if temp_path is not None and temp_path.exists():
            temp_path.unlink()


def run(stage: Path, converted: Path, mode: str) -> int:
    plan, fields, rows, actions, photos, total = prepare(stage, converted)
    to_rename = [(src, final, row) for src, final, row in actions if src != final]
    print(f'Validated {photos:,} photos; {len(rows):,} planned objects; {total / 1e9:.3f} GB')
    print(f'Already using final filenames: {len(rows) - len(to_rename):,}')
    print(f'Files requiring an in-place rename: {len(to_rename):,}')
    print('Working only in:', converted)
    print('Original 26 GB archive: not accessed, changed, or scanned.')
    for src, final, _ in to_rename[:8]:
        print(' ', src.name, '->', final.name)

    if mode == 'preview':
        print('PREVIEW ONLY. To perform the local renames, run with --apply.')
        return 0
    if mode == 'verify':
        if to_rename:
            raise ValueError('Not fully renamed. Run --apply first.')
        # A previous --apply may have finished renaming before updating the CSV.
        if any(Path(row['local_path']) != final
               for _, final, row in actions):
            raise ValueError('Upload plan still references old paths. Run --apply again to repair it.')
        validate(stage, converted)
        print('VERIFIED: all filenames match the exact intended R2 object keys.')
        return 0

    # Keep a small, separate record of the original converted filenames for
    # provenance and possible recovery. This backup contains paths only,
    # never photo data. It is not uploaded.
    backup = plan.with_name('photos-upload-plan.before-local-rename.csv')
    if backup.is_symlink():
        raise ValueError('Refusing to use a symlink as local plan backup')
    if not backup.exists():
        with plan.open('rb') as source, backup.open('xb') as output:
            shutil.copyfileobj(source, output)
            output.flush()
            os.fsync(output.fileno())
        print('Saved original upload-plan path mapping:', backup)
    print('Renaming optimised files in place. No local duplicate tree will be made.', flush=True)
    changed = 0
    for src, final, _ in to_rename:
        # The preflight already confirmed that the destination has no exact
        # preexisting file and that the source file is valid and unique.
        # Recheck immediately before the atomic same-directory rename.
        if final.name in os.listdir(final.parent):
            raise ValueError('Destination appeared; refusing overwrite: ' + str(final))
        if not src.is_file() or src.is_symlink():
            raise ValueError('Source changed before rename: ' + str(src))
        src.rename(final)
        changed += 1
        if changed % 1000 == 0 or changed == len(to_rename):
            print(f'  Renamed {changed:,} / {len(to_rename):,}', flush=True)
    updated_rows = []
    for _, final, row in actions:
        fixed = dict(row)
        fixed['local_path'] = str(final)
        updated_rows.append(fixed)
    _write_updated_plan(plan, fields, updated_rows)
    validate(stage, converted)
    print('PASS: existing optimised files renamed in place; upload plan updated.')
    print('Original collection untouched. No Cloudflare R2 upload/deletion.')
    return 0


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--stage', type=Path, default=DEFAULT_STAGE)
    parser.add_argument('--converted', type=Path, default=DEFAULT_CONVERTED)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument('--apply', action='store_true', help='Rename the optimised files IN PLACE')
    mode.add_argument('--verify', action='store_true', help='Verify completed renames and plan')
    args = parser.parse_args(argv)
    stage = args.stage.expanduser().absolute()
    converted = args.converted.expanduser().absolute()
    operation = 'apply' if args.apply else ('verify' if args.verify else 'preview')
    return run(stage, converted, operation)


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError) as exc:
        print('ERROR:', exc, file=sys.stderr)
        sys.exit(2)
