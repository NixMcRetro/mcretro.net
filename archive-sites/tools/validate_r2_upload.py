#!/usr/bin/env python3
"""Read-only preflight for the McRetro photo upload plan to the final R2 bucket.

This program never uploads, deletes, approves, or creates an R2 bucket.
The only supported rclone operation is COPY with a mandatory --dry-run
to the existing final public bucket. No upload mode exists.

Python 3.9+ standard library; rclone is needed only for --rclone-dry-run.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys

DEFAULT_STAGE = Path.home() / 'Desktop/McRetro-R2-Staging'
DEFAULT_CONVERTED = Path.home() / 'Desktop/McRetro-PhotoGallery-Optimised-v2'
FINAL_DESTINATION = 'r2:mcretro-photos'
JXL_BOX = b'\x00\x00\x00\x0cJXL \r\n\x87\n'
REQUIRED_COLUMNS = frozenset(
    {'r2_key', 'local_path', 'kind', 'bytes', 'mime', 'approved_for_publication'}
)


def valid_key(key: str) -> bool:
    """Accept exact source-relative R2 photo paths, not URLs or shell patterns."""
    if not isinstance(key, str) or not key.startswith(('full/', 'thumbs/')):
        return False
    if any(c in key for c in ('?', '#', '\\', '\x00', '\r', '\n')):
        return False
    if any(ord(c) < 32 or ord(c) == 127 for c in key):
        return False
    if any(part in ('', '.', '..') for part in key.split('/')):
        return False
    return key.endswith(('.jxl', '.gif'))


def image_signature_ok(path: Path, mime: str) -> bool:
    with path.open('rb') as stream:
        header = stream.read(12)
    if mime == 'image/jxl':
        return header.startswith(b'\xff\x0a') or header == JXL_BOX
    if mime == 'image/gif':
        return header.startswith((b'GIF87a', b'GIF89a'))
    return False


def validate(stage: Path, converted: Path, deep_hash: bool = False):
    """Return (photo records, plan rows, total bytes); no filesystem changes."""
    manifest = stage / 'photo-gallery/albums.generated.json'
    plan = stage / 'reports/photos-upload-plan.csv'
    audit = stage / 'reports/audit-summary.json'
    for path in (manifest, plan):
        if not path.is_file() or path.is_symlink():
            raise ValueError('Missing or symlinked input file: ' + str(path))
    if not converted.is_dir() or converted.is_symlink():
        raise ValueError('Converted image directory is missing or a symlink')
    if converted.resolve() == stage.resolve() or converted.resolve() in stage.resolve().parents:
        raise ValueError('Stage directory must be separate from converted images')

    data = json.loads(manifest.read_text(encoding='utf-8'))
    if data.get('schema_version') != 1 or not isinstance(data.get('photos'), list):
        raise ValueError('Expected schema_version 1 with a photos list')
    if not isinstance(data.get('albums'), list):
        raise ValueError('Missing albums array')

    album_ids = [a.get('id') for a in data['albums'] if isinstance(a, dict)]
    if len(album_ids) != len(data['albums']) or len(set(album_ids)) != len(album_ids):
        raise ValueError('Invalid or duplicated album identifiers')
    if not all(isinstance(a, str) and a for a in album_ids):
        raise ValueError('Empty/invalid album identifier')

    photos = data['photos']
    desired = set()
    fulls = set()
    gif_count = 0
    for photo in photos:
        if not isinstance(photo, dict) or photo.get('album') not in album_ids:
            raise ValueError('Photo record has an invalid album')
        full, thumb = photo.get('path'), photo.get('thumbnail')
        if not valid_key(full) or not full.startswith('full/'):
            raise ValueError('Invalid full-image key in catalogue: ' + repr(full))
        if not valid_key(thumb):
            raise ValueError('Invalid thumbnail key in catalogue: ' + repr(thumb))
        if full in fulls:
            raise ValueError('Duplicate full-image key in catalogue: ' + full)
        fulls.add(full)
        if full.endswith('.gif'):
            gif_count += 1
            if thumb != full:
                raise ValueError('GIF must share its full-image key as thumbnail: ' + full)
        elif thumb != 'thumbs/' + full[len('full/'):]:
            raise ValueError('Full and thumbnail paths do not correspond: ' + full)
        desired.update((full, thumb))

    if audit.exists():
        if audit.is_symlink():
            raise ValueError('Audit summary may not be a symlink')
        summary = json.loads(audit.read_text(encoding='utf-8')).get('photos', {})
        if summary.get('missing_pairs') != 0:
            raise ValueError('Audit reports missing photo pairs; regenerate/repair first')
        if summary.get('converted_pairs') != len(photos):
            raise ValueError('Audit and catalogue photograph counts differ; regenerate first')

    with plan.open(newline='', encoding='utf-8') as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames or not REQUIRED_COLUMNS.issubset(reader.fieldnames):
            raise ValueError('Unexpected upload plan CSV columns')
        rows = list(reader)

    actual = set()
    total = 0
    for row in rows:
        key = row['r2_key']
        if not valid_key(key):
            raise ValueError('Unsafe object key in upload plan: ' + repr(key))
        if key in actual:
            raise ValueError('Duplicate object key in upload plan: ' + key)
        actual.add(key)
        if key not in desired:
            raise ValueError('Unreferenced object in upload plan: ' + key)
        if row['approved_for_publication'] != 'NO':
            raise ValueError('Publication approval must remain NO during staging preflight: ' + key)
        if key.endswith('.gif'):
            expected_mime = 'image/gif'
            expected_kind = 'animation'
            if not key.startswith('full/'):
                raise ValueError('GIF must be stored under full/: ' + key)
        else:
            expected_mime = 'image/jxl'
            expected_kind = 'thumbnail' if key.startswith('thumbs/') else 'gallery'
        if row['mime'] != expected_mime or row['kind'] != expected_kind:
            raise ValueError('Incorrect media type or kind for: ' + key)
        if not re.fullmatch(r'[1-9][0-9]*', row['bytes'] or ''):
            raise ValueError('Invalid byte count for: ' + key)
        expected = converted.joinpath(*key.split('/'))
        local = Path(row['local_path'])
        if not local.is_absolute() or local != expected:
            raise ValueError('Local file is not exactly the expected converted path for: ' + key)
        if not expected.is_file() or expected.is_symlink():
            raise ValueError('Missing or symlinked image: ' + key)
        if expected.resolve() != expected.absolute():
            raise ValueError('Symlinked path component detected for: ' + key)
        size = expected.stat().st_size
        if size != int(row['bytes']) or size < 16:
            raise ValueError('Size differs from plan for: ' + key)
        if not image_signature_ok(expected, expected_mime):
            raise ValueError('Invalid JXL/GIF file signature for: ' + key)
        if deep_hash:
            digest = hashlib.sha256()
            with expected.open('rb') as stream:
                for chunk in iter(lambda: stream.read(1024 * 1024), b''):
                    digest.update(chunk)
            if not digest.digest():
                raise ValueError('Unable to hash: ' + key)
        total += size

    if desired != actual:
        missing = sorted(desired - actual)
        raise ValueError(f'{len(missing)} catalogue objects absent from upload plan; first: {missing[:3]}')
    expected_count = 2 * len(photos) - gif_count
    if len(actual) != expected_count:
        raise ValueError('Unexpected full/thumbnail/GIF object count')
    return photos, rows, total


def dry_run_command(converted: Path) -> list[str]:
    """Deliberately no mode capable of writing to R2, even if called directly."""
    return [
        'rclone', 'copy', '--dry-run', '--s3-no-check-bucket',
        '--files-from0', '-', '--transfers', '4', '--checkers', '8',
        '--stats', '15s', str(converted), FINAL_DESTINATION,
    ]


def perform_rclone_dry_run(converted: Path, keys: list[str]) -> int:
    if not shutil.which('rclone'):
        raise ValueError('rclone is not installed')
    if not keys:
        raise ValueError('No files selected for dry run')
    if any(not valid_key(k) for k in keys):
        raise ValueError('Unsafe key in rclone selection')
    payload = ('\0'.join(keys) + '\0').encode('utf-8')
    command = dry_run_command(converted)
    print(f'Executing rclone DRY RUN for {len(keys)} objects against {FINAL_DESTINATION} (PUBLIC BUCKET; NO UPLOAD)', flush=True)
    return subprocess.run(command, input=payload, check=False).returncode


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--stage', type=Path, default=DEFAULT_STAGE)
    parser.add_argument('--converted', type=Path, default=DEFAULT_CONVERTED)
    parser.add_argument('--deep-hash', action='store_true',
                        help='Read every byte and compute SHA-256 locally (no hashes saved)')
    parser.add_argument('--rclone-dry-run', action='store_true',
                        help='Run the fixed FINAL destination command with mandatory --dry-run')
    parser.add_argument('--all', action='store_true',
                        help='In dry-run mode, simulate every object rather than 10 photographs')
    args = parser.parse_args(argv)
    if args.all and not args.rclone_dry_run:
        parser.error('--all requires --rclone-dry-run')
    stage, converted = args.stage.expanduser().absolute(), args.converted.expanduser().absolute()
    photos, rows, total = validate(stage, converted, deep_hash=args.deep_hash)
    print(f'PASS: {len(photos):,} photographs; {len(rows):,} unique objects; {total / 1e9:.3f} GB')
    print('PASS: exact catalogue match, expected local paths, sizes, signatures, MIME and NO approvals')
    print('No original or converted image was modified. No R2 operation has been performed.')
    if not args.rclone_dry_run:
        print('Optional: --rclone-dry-run (10 photographs, read-only simulation)')
        print('Optional: --rclone-dry-run --all (all objects, read-only simulation)')
        return 0
    if args.all:
        selected = sorted(row['r2_key'] for row in rows)
    else:
        sample = sorted(photos, key=lambda p: p['path'])[:10]
        selected = sorted({key for p in sample for key in (p['path'], p['thumbnail'])})
    return perform_rclone_dry_run(converted, selected)


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print('FAILED: ' + str(exc), file=sys.stderr)
        sys.exit(2)
