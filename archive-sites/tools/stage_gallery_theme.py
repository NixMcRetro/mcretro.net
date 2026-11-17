#!/usr/bin/env python3
"""Stage the existing McRetro.net fonts for a self-contained R2 gallery preview.

Downloads *unchanged* font bytes and OFL notices from the user's own public
GitHub repository to a separate local staging folder. No assets are committed,
uploaded to R2, or installed as system fonts.

    python3 archive-sites/tools/stage_gallery_theme.py
"""
from __future__ import annotations
import argparse
import csv
import hashlib
from pathlib import Path
import urllib.request

DEFAULT_STAGE = Path.home() / 'Desktop/McRetro-R2-Staging'
SOURCE_ROOT = 'https://raw.githubusercontent.com/NixMcRetro/mcretro.net/main/assets/fonts/'
# Trusted Git blob IDs retrieved from mcretro.net main at implementation time.
ASSETS = {
    'korataki.woff2': '74a3480df62c9fe91602dc4c8e94460bec76c113',
    'montserrat/montserrat-latin-400-normal.woff2': '6fbeafa9917dd84cd0c761eeac60af8218c06f0c',
    'montserrat/montserrat-latin-700-normal.woff2': 'ff9d6a7f9979665cf6811588f174ecf9493e2655',
    'montserrat/OFL.txt': '35ae34c4c51f3836b6afcc05a95bd4bced9e7abc',
    'merriweather/merriweather-latin-400-normal.woff2': '824753f06bc6b71449a3f960fb2f8602d89c0e78',
    'merriweather/merriweather-latin-700-normal.woff2': '1c1896b0cb4d4d3e5649cb644fcb948a56cc6a7d',
    'merriweather/OFL.txt': 'b327be10d8432394f407d504fceca64d04b008d7',
}


def git_blob_hash(content: bytes) -> str:
    return hashlib.sha1(b'blob ' + str(len(content)).encode('ascii') + b'\0' + content).hexdigest()


def stage_fonts(stage: Path):
    if stage.is_symlink():
        raise ValueError('Staging directory may not be a symlink')
    folder = stage / 'photo-gallery/assets/fonts'
    rows = []
    for name, expected in ASSETS.items():
        destination = folder / name
        if any(parent.is_symlink() for parent in (destination, *destination.parents)):
            raise ValueError('Refusing symlink path: ' + str(destination))
        if destination.exists():
            content = destination.read_bytes()
            action = 'Existing verified local asset'
        else:
            with urllib.request.urlopen(SOURCE_ROOT + name, timeout=30) as response:
                content = response.read(4_000_001)
            action = 'Downloaded and verified'
        if len(content) > 4_000_000 or git_blob_hash(content) != expected:
            raise ValueError(f'Font or licence changed or incomplete: {name}; refusing to stage')
        if not destination.exists():
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(content)
        print(f'{action}: {name} ({len(content):,} bytes)')
        rows.append({
            'r2_key': 'assets/fonts/' + name,
            'local_path': str(destination),
            'bytes': len(content),
            'mime': 'font/woff2' if name.endswith('.woff2') else 'text/plain; charset=utf-8',
            'approved_for_publication': 'NO',
        })
    report = stage/'reports/theme-assets-upload-plan.csv'
    report.parent.mkdir(parents=True, exist_ok=True)
    with report.open('w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=['r2_key','local_path','bytes','mime','approved_for_publication'])
        writer.writeheader()
        writer.writerows(rows)
    print('All assets verified in:', folder)
    print('No font assets have been published or uploaded to R2.')
    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--stage', type=Path, default=DEFAULT_STAGE)
    args = parser.parse_args()
    try:
        stage_fonts(args.stage.expanduser())
    except (OSError, ValueError, urllib.error.URLError) as exc:
        parser.exit(2, f'ERROR: {exc}\n')


if __name__ == '__main__':
    main()
