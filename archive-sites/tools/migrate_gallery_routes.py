#!/usr/bin/env python3
"""Guarded migration from flat hashed Photo Gallery URLs to nested URLs.

--prepare: LOCAL ONLY. Save the exact old, public-safe website baseline before
           replacing local staged HTML/manifest with nested URLs and redirects.
--preflight: READ ONLY. Privacy audit, remote inventory and downloaded-byte gate.
--upload: Explicitly authorised WEBSITE-ONLY update, no photos/delete/sync.
--verify: READ ONLY. Compare all expected site bytes after migration.

Never reads the historical photo originals or publishes private manifest fields.
Partial uploads are resumable: remote files must match either the captured old
baseline or the exact new desired bytes before an overwrite is authorised.
"""
from __future__ import annotations

import argparse
import csv
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

from gallery_routes import legacy_folder_url, plan_folder_routes
from preview_mcretro_gallery import local_theme_fonts
from render_gallery_pages import render_pages
from publish_photo_gallery_site import (
    EXPECTED_CANONICAL_HTML, EXPECTED_FONTS, EXPECTED_PHOTOS, FINAL_DESTINATION,
    MIME_BY_SUFFIX, check_local, keys_input, list_remote, public_projection,
    verify_remote, DEFAULT_CONVERTED, DEFAULT_STAGE,
)

BASELINE = "reports/gallery-route-migration"
SITE = "photo-gallery/site"
CATALOGUE = "photo-gallery/albums.generated.json"
EXPECTED_OLD_SITE = EXPECTED_CANONICAL_HTML + 2 + EXPECTED_FONTS


def _sha(blob: bytes) -> str:
    return hashlib.sha256(blob).hexdigest()


def _safe_file(root: Path, key: str) -> Path:
    if (not key or key.startswith('/') or '\\' in key or
            any(p in ('', '.', '..') for p in key.split('/'))):
        raise ValueError('Unsafe website object key')
    file = root.joinpath(*key.split('/'))
    if not file.is_file() or file.is_symlink() or not file.resolve().is_relative_to(root.resolve()):
        raise ValueError('Missing or unsafe local website object: ' + key)
    return file


def _baseline_map(stage: Path, paths: list[str]) -> dict[str, Path]:
    saved = stage / BASELINE / 'old-site'
    fonts, missing = local_theme_fonts(stage / CATALOGUE)
    if missing or len(fonts) != EXPECTED_FONTS:
        raise ValueError('Existing gallery fonts are missing or unsafe')
    keys = {'index.html', 'sitemap.xml', 'albums.json'}
    keys.update(legacy_folder_url(p).lstrip('/') for p in paths if p)
    keys.update(fonts)
    if len(keys) != EXPECTED_OLD_SITE:
        raise ValueError('Unexpected original site key count')
    records = json.loads(_safe_file(stage / BASELINE, 'baseline-sha256.json').read_text())
    if not isinstance(records, dict) or set(records) != keys:
        raise ValueError('Original site checksum manifest is incomplete')
    files = {key: _safe_file(saved, key) for key in sorted(keys)}
    if any(not isinstance(records[key], str) or _sha(file.read_bytes()) != records[key]
           for key, file in files.items()):
        raise ValueError('Original public-safe website baseline was altered')
    return files


def prepare(stage: Path, template: Path) -> None:
    """Snapshot the old *public-safe* bytes; modify local staging only."""
    snapshot = stage / BASELINE
    if snapshot.exists() or snapshot.is_symlink():
        raise ValueError('A migration baseline already exists; refusing to overwrite it')
    if not template.is_file() or template.is_symlink():
        raise ValueError('Missing or unsafe HTML template')
    manifest = _safe_file(stage, CATALOGUE)
    old = manifest.read_bytes()
    data = json.loads(old)
    if data.get('schema_version') != 1 or not isinstance(data.get('folders'), list):
        raise ValueError('Unexpected original gallery manifest')
    folders = data['folders']
    paths = [f['path'] for f in folders]
    routes = plan_folder_routes(paths)
    if len(folders) != EXPECTED_CANONICAL_HTML:
        raise ValueError('Original folder count changed from reviewed release')
    if any(f.get('url') != legacy_folder_url(f['path']) for f in folders):
        raise ValueError('Local manifest is not the original hashed-route release')
    if any(p.get(field + '_approved') is True for p in data['photos']
           for field in ('alt', 'caption', 'scene_description', 'components',
                         'search_terms', 'date_taken')):
        raise ValueError('Newly approved photo metadata needs separate review')

    if _safe_file(stage / SITE, 'albums.json').read_bytes() != old:
        raise ValueError('Original staged private catalogue does not match manifest')
    public_json = public_projection(data)
    old_keys = {'index.html', 'sitemap.xml', 'albums.json'} | {
        legacy_folder_url(p).lstrip('/') for p in paths if p
    }
    fonts, missing = local_theme_fonts(manifest)
    if missing or len(fonts) != EXPECTED_FONTS:
        raise ValueError('Missing expected staged fonts')
    old_keys.update(fonts)
    if len(old_keys) != EXPECTED_OLD_SITE:
        raise ValueError('Unexpected original site release object count')

    with (stage / 'reports/gallery-pages-upload-plan.csv').open(
            newline='', encoding='utf-8') as stream:
        planned = list(csv.DictReader(stream))
    if len(planned) != len(old_keys) - EXPECTED_FONTS or {
            row['r2_key'] for row in planned} != (old_keys - set(fonts)):
        raise ValueError('Original HTML plan differs from expected hashed routes')

    with tempfile.TemporaryDirectory(prefix='route-migration-', dir=stage / 'reports') as tmp:
        temporary = Path(tmp) / 'snapshot'
        saved = temporary / 'old-site'
        checksum_map = {}
        for key in sorted(old_keys):
            if key == 'albums.json':
                blob = public_json  # NEVER copy the private local site/albums.json.
            else:
                file = fonts[key] if key in fonts else _safe_file(stage / SITE, key)
                if key not in fonts:
                    row = next((r for r in planned if r['r2_key'] == key), None)
                    if (row is None or row.get('approved_for_publication') != 'NO'
                            or row.get('local_path') != str(file)
                            or row.get('bytes') != str(file.stat().st_size)
                            or row.get('mime') != MIME_BY_SUFFIX[file.suffix]):
                        raise ValueError('Original site plan mismatch: ' + key)
                blob = file.read_bytes()
            dest = saved / key
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(blob)
            checksum_map[key] = _sha(blob)
        (temporary / 'baseline-sha256.json').write_text(
            json.dumps(checksum_map, sort_keys=True, indent=2) + '\n',
            encoding='utf-8')
        (temporary / 'original-private-manifest.json').write_bytes(old)
        temporary.rename(snapshot)

    # Only the private STAGING manifest and generated pages are changed.
    for item in folders:
        item['url'] = routes[item['path']]
    manifest.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n',
                        encoding='utf-8')
    result = render_pages(stage, template)
    if (result['html_pages'] != 2 * EXPECTED_CANONICAL_HTML - 1 or
            result['legacy_redirect_pages'] != EXPECTED_CANONICAL_HTML - 1):
        raise ValueError('Nested page generation did not match expected counts')
    print('LOCAL STAGING PREPARED: nested folder URLs plus old-link redirects.')
    print(f'Original {len(old_keys)} public-safe site objects captured under {snapshot}')
    print('NO R2 access or upload. Run --preflight before any release.')


def _remote_bytes(key: str) -> bytes:
    command = ['rclone', 'cat', FINAL_DESTINATION.rstrip('/') + '/' + key,
               '--s3-no-check-bucket']
    result = subprocess.run(command, capture_output=True, check=False, timeout=120)
    if result.returncode:
        raise ValueError('R2 download failed for website object: ' + key)
    return result.stdout


def inspect(stage: Path, converted: Path, html: Path):
    """Fail closed unless EVERY remote object is exactly expected-old/new."""
    site, photos, catalogue = check_local(stage, converted, html)
    manifest = json.loads((stage / CATALOGUE).read_text(encoding='utf-8'))
    paths = [folder['path'] for folder in manifest['folders']]
    baseline = _baseline_map(stage, paths)
    new_root = stage / SITE
    new_site = {}
    for key in site:
        new_site[key] = (catalogue if key == 'albums.json'
                         else _safe_file(stage / 'photo-gallery', key).read_bytes()
                         if key.endswith('.woff2')
                         else _safe_file(new_root, key).read_bytes())
    expected = set(photos) | set(baseline) | set(new_site)
    remote = list_remote()
    extras = sorted(set(remote) - expected)
    if extras:
        raise ValueError(f'Unrecognised R2 objects ({len(extras)}); first: {extras[:3]}')
    if len(photos) != EXPECTED_PHOTOS:
        raise ValueError('Photo-object inventory changed')
    for key, size in photos.items():
        if key not in remote or remote[key].get('Size') != size:
            raise ValueError('Missing/changed existing R2 photo: ' + key)
    if any(key not in remote for key in baseline):
        raise ValueError('Missing originally published website object: migration blocked')
    if not shutil.which('rclone'):
        raise ValueError('rclone is unavailable')

    # Only 336 old website objects plus up to 328 new canonical pages are read.
    # Hash remote bytes, never interpret them as text or print their contents.
    state = {}
    targets = sorted((set(baseline) | set(new_site)) & set(remote))
    def classify(key):
        observed = _remote_bytes(key)
        if len(observed) != remote[key].get('Size'):
            raise ValueError('R2 website size changed during migration check: ' + key)
        if key in new_site and observed == new_site[key]:
            return key, 'new'
        if key in baseline and observed == baseline[key].read_bytes():
            return key, 'old'
        raise ValueError('R2 website bytes match neither reviewed release: ' + key)
    with ThreadPoolExecutor(max_workers=6) as executor:
        for key, value in executor.map(classify, targets):
            state[key] = value
    if not all(key in new_site or key in baseline for key in state):
        raise ValueError('Unplanned migration key')
    remaining = sorted(key for key in new_site if state.get(key) != 'new')
    print(f'R2 photos unchanged: {len(photos):,}; old website baseline: {len(baseline)}')
    print(f'Exact new website keys: {len(new_site)}; remaining to write: {len(remaining)}')
    print('READ-ONLY remote byte checks PASSED; unexpected bytes remain blocking.')
    return site, photos, catalogue, remaining


def upload(stage: Path, converted: Path, html: Path) -> None:
    site, photos, catalogue, remaining = inspect(stage, converted, html)
    if not remaining:
        print('Nothing to upload; all website objects already match.')
        return
    site_root = stage / SITE
    with tempfile.TemporaryDirectory(prefix='public-route-migration-') as tmp:
        root = Path(tmp)
        (root / 'albums.json').write_bytes(catalogue)
        # New canonical pages before redirects; index last. No image objects.
        groups = [
            (stage / 'photo-gallery', sorted(
                k for k in remaining if k.endswith('.woff2')), 'font/woff2'),
            (site_root, sorted(
                k for k in remaining if k.startswith('albums/')
                and k not in {legacy_folder_url(p['path']).lstrip('/')
                              for p in json.loads((stage / CATALOGUE).read_text())['folders']
                              if p['path']}), 'text/html; charset=utf-8'),
            (site_root, sorted(
                k for k in remaining if k.startswith('albums/')
                and k in {legacy_folder_url(p['path']).lstrip('/')
                          for p in json.loads((stage / CATALOGUE).read_text())['folders']
                          if p['path']}), 'text/html; charset=utf-8'),
            (root, ['albums.json'] if 'albums.json' in remaining else [],
             'application/json'),
            (site_root, ['sitemap.xml'] if 'sitemap.xml' in remaining else [],
             'application/xml'),
            (site_root, ['index.html'] if 'index.html' in remaining else [],
             'text/html; charset=utf-8'),
        ]
        for source, keys, mime in groups:
            if not keys:
                continue
            print(f'Updating {len(keys)} exact website keys ({mime})')
            command = [
                'rclone', 'copy', '--files-from0', '-', '--ignore-times',
                '--s3-no-check-bucket', '--metadata-set', 'content-type=' + mime,
                '--transfers', '4', '--checkers', '8', '--stats', '10s',
                str(source), FINAL_DESTINATION,
            ]
            result = subprocess.run(command, input=keys_input(keys), check=False)
            if result.returncode:
                raise ValueError('Website route transfer stopped; rerun --preflight before resuming')
        verify_remote(site, photos, catalogue, root)
    print('ROUTE MIGRATION VERIFIED. Existing image files were not touched.')


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--stage', type=Path, default=DEFAULT_STAGE)
    parser.add_argument('--converted', type=Path, default=DEFAULT_CONVERTED)
    parser.add_argument('--html', type=Path,
                        default=Path.home() / 'Downloads/mcretro-gallery-index.html')
    actions = parser.add_mutually_exclusive_group(required=True)
    actions.add_argument('--prepare', action='store_true')
    actions.add_argument('--preflight', action='store_true')
    actions.add_argument('--upload', action='store_true')
    actions.add_argument('--verify', action='store_true')
    args = parser.parse_args(argv)
    stage, converted, html = (args.stage.expanduser().absolute(),
                              args.converted.expanduser().absolute(),
                              args.html.expanduser().absolute())
    if args.prepare:
        prepare(stage, html)
    elif args.verify:
        site, photos, catalogue = check_local(stage, converted, html)
        with tempfile.TemporaryDirectory(prefix='public-route-verify-') as tmp:
            root = Path(tmp)
            (root / 'albums.json').write_bytes(catalogue)
            verify_remote(site, photos, catalogue, root)
    elif args.upload:
        upload(stage, converted, html)
    else:
        inspect(stage, converted, html)
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, TypeError, json.JSONDecodeError,
            subprocess.TimeoutExpired) as error:
        print('STOPPED: ' + str(error), file=sys.stderr)
        sys.exit(2)
