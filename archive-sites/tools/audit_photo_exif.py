#!/usr/bin/env python3
"""Audit McRetro's ORIGINAL photo metadata without changing any source files.

Requires the local ExifTool CLI (brew install exiftool). The full original
directory is scanned once; the script writes only local review reports.

    python3 archive-sites/tools/audit_photo_exif.py
    python3 ~/Downloads/audit_photo_exif.py

Never writes images, publishes EXIF, uploads to GitHub/Cloudflare, or alters
the gallery catalogue. GPS coordinates are deliberately NOT captured in CSV.
Some other metadata may still be private; keep all reports local.
"""
from __future__ import annotations

import argparse
from collections import Counter
import csv
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys

DEFAULT_PHOTOS = Path('/Users/nix/Desktop/R2 FILES/photos')
DEFAULT_STAGE = Path.home() / 'Desktop/McRetro-R2-Staging'
SUPPORTED = {'.jpg', '.jpeg', '.png', '.tif', '.tiff', '.heic', '.webp', '.bmp', '.gif'}
TARGET_STEMS = {'hntn7023', 'img 0005'}
EXIF_ARGS = [
    '-j', '-G1', '-r',
    '-FileName', '-FileType', '-DateTimeOriginal', '-CreateDate',
    '-DateCreated', '-TimeCreated', '-Make', '-Model', '-LensModel',
    '-ImageDescription', '-Description', '-Caption-Abstract', '-Title',
    '-XPTitle', '-XPComment', '-UserComment', '-Keywords', '-Subject',
    '-GPSLatitude', '-GPSLongitude', '-GPSPosition',
    '-Error', '-Warning',
]


def metadata_value(record: dict, *keys: str) -> str:
    """Use preferred tags, preserving the first meaningful non-empty value."""
    for name in keys:
        values = [v for k, v in record.items() if k == name or k.endswith(':' + name)]
        for v in values:
            if isinstance(v, str) and v.strip() and v.strip() != '-':
                return v.strip()
            if isinstance(v, (int, float)):
                return str(v)
            if isinstance(v, list) and v:
                return ', '.join(str(item) for item in v[:15])
    return ''


def has_metadata(record: dict, *keys: str) -> bool:
    return bool(metadata_value(record, *keys))


def safe_text(value: str, max_len: int = 1000) -> str:
    # EXIF text may contain control characters, whitespace or spreadsheet formula
    # triggers. This CSV is purely for local review, but escape formulas anyway.
    text = re.sub(r'[\x00-\x1f\x7f]+', ' ', value).strip()[:max_len]
    return "'" + text if text.startswith(('=', '+', '-', '@')) else text


def normalised_stem(filename: str) -> str:
    return re.sub(r'\s+', ' ', re.sub(r'[-_]+', ' ', Path(filename).stem)).strip().casefold()


def build_report(records: list[dict], root: Path) -> tuple[list[dict], dict, list[dict]]:
    rows = []
    target_rows = []
    counts = Counter()
    camera_models = Counter()
    for record in records:
        source = record.get('SourceFile')
        if not isinstance(source, str):
            counts['invalid_source'] += 1
            continue
        source_path = Path(source)
        try:
            relative = source_path.resolve().relative_to(root.resolve()).as_posix()
        except ValueError:
            counts['unsafe_source'] += 1
            continue
        if source_path.suffix.lower() not in SUPPORTED:
            counts['unsupported_in_scan'] += 1
            continue
        if source_path.is_symlink():
            counts['symlinks_skipped'] += 1
            continue
        capture = metadata_value(record, 'DateTimeOriginal')
        creation = metadata_value(record, 'CreateDate', 'DateCreated')
        make = metadata_value(record, 'Make')
        model = metadata_value(record, 'Model')
        lens = metadata_value(record, 'LensModel')
        title = metadata_value(record, 'Title', 'XPTitle')
        caption = metadata_value(record, 'ImageDescription', 'Caption-Abstract', 'Description',
                                 'UserComment', 'XPComment')
        keywords = metadata_value(record, 'Keywords', 'Subject')
        gps = has_metadata(record, 'GPSLatitude', 'GPSLongitude', 'GPSPosition')
        error = metadata_value(record, 'Error')
        generic = bool(re.fullmatch(r'(?:img|dsc|dscf|dscn|image|photo|pxl|p|hntr|hntn)'
                                    r'[-_\s\d]*', source_path.stem, re.I))
        state = ('caption/title present' if title or caption else
                 'date/camera only' if capture or creation or model else
                 'no useful descriptive metadata')
        row = {
            'source_relative_path': safe_text(relative),
            'filename': safe_text(source_path.name),
            'generic_filename': 'YES' if generic else 'NO',
            'date_time_original': safe_text(capture),
            'other_creation_date': safe_text(creation),
            'camera_make': safe_text(make),
            'camera_model': safe_text(model),
            'lens_model': safe_text(lens),
            'embedded_title': safe_text(title),
            'embedded_caption': safe_text(caption),
            'keywords': safe_text(keywords),
            'gps_metadata_present': 'YES' if gps else 'NO',
            'metadata_usefulness': state,
            'exiftool_error': safe_text(error),
            'owner_title_approved': 'NO',
            'owner_replacement_title': '',
        }
        rows.append(row)
        counts['images_scanned'] += 1
        if capture:
            counts['with_date_time_original'] += 1
        if capture or creation:
            counts['with_some_creation_date'] += 1
        if model:
            counts['with_camera_model'] += 1
            camera_models[(make + ' ' + model).strip()] += 1
        if title or caption:
            counts['with_embedded_caption_or_title'] += 1
        if gps:
            counts['with_gps_metadata'] += 1
        if generic:
            counts['generic_filenames'] += 1
        if error:
            counts['exiftool_errors'] += 1
        if state == 'no useful descriptive metadata':
            counts['no_useful_descriptive_metadata'] += 1
        if normalised_stem(source_path.name) in TARGET_STEMS:
            target_rows.append(row)
    summary = {
        'photos_scanned': counts['images_scanned'],
        'photos_with_capture_date': counts['with_date_time_original'],
        'photos_with_any_creation_date': counts['with_some_creation_date'],
        'photos_with_camera_model': counts['with_camera_model'],
        'photos_with_embedded_caption_or_title': counts['with_embedded_caption_or_title'],
        'photos_with_gps_metadata': counts['with_gps_metadata'],
        'photos_with_generic_filename': counts['generic_filenames'],
        'photos_without_useful_descriptive_metadata': counts['no_useful_descriptive_metadata'],
        'exiftool_errors': counts['exiftool_errors'],
        'invalid_or_unsafe_records': counts['invalid_source'] + counts['unsafe_source'],
        'most_common_cameras': [{'camera': k, 'count': n} for k, n in camera_models.most_common(15)],
        'example_filenames_found': len(target_rows),
        'publication_approved': False,
        'privacy_note': 'GPS coordinates are omitted; local reports may still contain private metadata.',
    }
    return rows, summary, target_rows


def write_csv(path: Path, rows: list[dict], fields: list[str]):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', newline='', encoding='utf-8') as stream:
        writer = csv.DictWriter(stream, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--photos', type=Path, default=DEFAULT_PHOTOS)
    parser.add_argument('--stage', type=Path, default=DEFAULT_STAGE)
    args = parser.parse_args(argv)
    root = args.photos.expanduser()
    stage = args.stage.expanduser()
    if not root.is_dir() or root.is_symlink():
        parser.error('Original photo directory not found or is a symlink: ' + str(root))
    if stage.is_symlink():
        parser.error('Staging directory is a symlink')
    root = root.resolve()
    stage = stage.resolve()
    if root == stage or root in stage.parents or stage in root.parents:
        parser.error('Staging must be separate from the original photo directory')
    executable = shutil.which('exiftool')
    if not executable:
        parser.error('ExifTool not installed. On macOS run: brew install exiftool')
    print('Scanning original images read-only:', root, flush=True)
    command = [executable, *EXIF_ARGS]
    for extension in sorted(SUPPORTED):
        command.extend(['-ext', extension.lstrip('.')])
    command.append(str(root))
    result = subprocess.run(command, capture_output=True, text=True, errors='replace')
    if not result.stdout.strip():
        raise RuntimeError('ExifTool returned no JSON. ' + result.stderr[-800:])
    records = json.loads(result.stdout)
    if not isinstance(records, list):
        raise ValueError('Unexpected ExifTool JSON output')
    rows, summary, targets = build_report(records, root)
    # This is a private report containing local paths and metadata.
    reports = stage / 'reports'
    fields = ['source_relative_path','filename','generic_filename','date_time_original',
              'other_creation_date','camera_make','camera_model','lens_model',
              'embedded_title','embedded_caption','keywords','gps_metadata_present',
              'metadata_usefulness','exiftool_error','owner_title_approved','owner_replacement_title']
    write_csv(reports / 'photo-exif-audit.csv', rows, fields)
    write_csv(reports / 'photo-exif-screenshot-examples.csv', targets, fields)
    (reports / 'photo-exif-summary.json').write_text(
        json.dumps(summary, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(json.dumps(summary, indent=2, ensure_ascii=False))
    print('Local reports:', reports)
    print('No originals, generated gallery captions or Cloudflare objects were changed.')
    if result.returncode != 0:
        print('WARNING: ExifTool reported nonzero exit status; review the CSV error column.', file=sys.stderr)
        return 2
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, RuntimeError, json.JSONDecodeError) as exc:
        print('ERROR:', exc, file=sys.stderr)
        sys.exit(2)
