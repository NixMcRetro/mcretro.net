#!/usr/bin/env python3
"""Read-only local readiness audit for the McRetro Photo Gallery.

Checks the *existing* ~4 GB optimised files, generated photo catalogue, upload
plan and local static HTML. It NEVER reads the 26 GB original photo archive,
connects to R2, uploads, deletes, generates pages, or approves publication.

From Downloads, keep the current branch versions of these helpers together:
gallery_keys.py, gallery_routes.py, gallery_naming.py, gallery_descriptions.py,
validate_r2_upload.py, preview_mcretro_gallery.py, render_gallery_pages.py.

    python3 audit_gallery_staging.py --html ~/Downloads/mcretro-gallery-index.html

A nonzero exit indicates technical inconsistencies; a zero exit does NOT give
editorial, copyright, privacy, accessibility, or publication approval.
"""
from __future__ import annotations

import argparse
from collections import Counter, defaultdict
import csv
import json
from pathlib import Path
import sys
from xml.etree import ElementTree

from gallery_routes import legacy_folder_url, validate_routes
from preview_mcretro_gallery import (
    validate as preview_validate, local_theme_fonts, local_static_pages,
)
from render_gallery_pages import render_legacy_redirect, render_static_page
from validate_r2_upload import (
    DEFAULT_CONVERTED, DEFAULT_STAGE, validate as upload_validate,
)

FIELDS = ('alt', 'caption', 'scene_description', 'components', 'search_terms',
          'date_taken')
PUBLIC_HOST = 'https://photos.mcretro.net'


def _page_key(route: str) -> str:
    return 'index.html' if route == '/' else route.lstrip('/')


def _verify_site(stage: Path, data: dict, html: Path | None) -> dict:
    root = stage / 'photo-gallery/site'
    manifest = stage / 'photo-gallery/albums.generated.json'
    routes = validate_routes(data['folders'])
    alias_keys = {
        _page_key(legacy_folder_url(path)) for path in routes if path
    }
    expected_keys = {_page_key(route) for route in routes.values()} | alias_keys | {
        'albums.json', 'sitemap.xml',
    }
    problems: list[str] = []

    catalogue = root / 'albums.json'
    if not catalogue.is_file() or catalogue.is_symlink():
        problems.append('Generated site/albums.json is missing')
    elif catalogue.read_bytes() != manifest.read_bytes():
        problems.append('Generated site/albums.json is STALE relative to the local manifest')

    sitemap = root / 'sitemap.xml'
    if not sitemap.is_file() or sitemap.is_symlink():
        problems.append('Generated site/sitemap.xml is missing')
    else:
        try:
            xml = ElementTree.parse(sitemap)
            namespace = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            found = [element.text for element in xml.findall('.//s:loc', namespace)]
            expected_urls = {PUBLIC_HOST + route for route in routes.values()}
            if len(found) != len(expected_urls) or set(found) != expected_urls:
                problems.append('Sitemap URLs are stale, incomplete or duplicated')
        except ElementTree.ParseError:
            problems.append('Sitemap is invalid XML')

    if html is None or not html.is_file() or html.is_symlink():
        problems.append('Current gallery HTML template unavailable: cannot verify generated page freshness')
        verified_pages = 0
    else:
        template = html.read_text(encoding='utf-8')
        folders = data['folders']
        by_path = {f['path']: f for f in folders}
        children = defaultdict(list)
        for folder in folders:
            if folder['path']:
                children[folder['parent']].append(folder)
        album_by_path = {a['path']: a['id'] for a in data['albums']}
        by_album = defaultdict(list)
        for photo in data['photos']:
            by_album[photo['album']].append(photo)
        verified_pages = 0
        stale = []
        for folder in folders:
            key = _page_key(routes[folder['path']])
            path = root / key
            if not path.is_file() or path.is_symlink():
                stale.append(key)
                continue
            expected_html = render_static_page(
                template, folder, by_path, children, album_by_path, by_album)
            if path.read_text(encoding='utf-8') != expected_html:
                stale.append(key)
            else:
                verified_pages += 1
            if folder['path']:
                alias_key = _page_key(legacy_folder_url(folder['path']))
                alias_path = root / alias_key
                if (not alias_path.is_file() or alias_path.is_symlink() or
                        alias_path.read_text(encoding='utf-8') !=
                        render_legacy_redirect(routes[folder['path']])):
                    stale.append(alias_key)
                else:
                    verified_pages += 1
        if stale:
            problems.append(f'{len(stale)} missing or STALE static HTML pages; first: {stale[:3]}')

    plan = stage / 'reports/gallery-pages-upload-plan.csv'
    if not plan.is_file() or plan.is_symlink():
        problems.append('Missing local gallery-pages-upload-plan.csv')
    else:
        with plan.open(newline='', encoding='utf-8') as stream:
            reader = csv.DictReader(stream)
            rows = list(reader)
        names = [r.get('r2_key') for r in rows]
        if len(names) != len(expected_keys) or set(names) != expected_keys:
            problems.append('Generated page upload-plan keys differ from expected static site keys')
        for row in rows:
            key = row.get('r2_key', '')
            path = root / key
            if key not in expected_keys or key.startswith('/') or '..' in key.split('/'):
                problems.append('Unplanned/unsafe static object in page upload plan: ' + key)
                continue
            if row.get('approved_for_publication') != 'NO':
                problems.append('Static object is incorrectly marked approved: ' + key)
            if row.get('local_path') != str(path):
                problems.append('Static object local path differs: ' + key)
            mime = ('application/json' if key == 'albums.json' else
                    'application/xml' if key == 'sitemap.xml' else
                    'text/html; charset=utf-8')
            if row.get('mime') != mime:
                problems.append('Static object MIME differs: ' + key)
            if not path.is_file() or path.is_symlink():
                problems.append('Missing/unsafe static site file: ' + key)
            elif row.get('bytes') != str(path.stat().st_size):
                problems.append('Static file size differs from page upload plan: ' + key)

    # Finder can recreate .DS_Store even after a fresh static rebuild.
    # Report normal Finder metadata but don't fail the technical site audit
    # on it. This is NOT an upload allowlist: only exact planned object keys
    # may ever be selected for publication, not a recursive folder copy.
    finder_metadata = []
    if root.is_dir():
        unexpected = [
            p for p in root.rglob('*') if (p.is_file() or p.is_symlink()) and
            p.relative_to(root).as_posix() not in expected_keys
        ]
        finder_metadata = sorted(
            p.relative_to(root).as_posix() for p in unexpected
            if p.name == '.DS_Store' and p.is_file() and not p.is_symlink()
        )
        extras = sorted(
            p.relative_to(root).as_posix() for p in unexpected
            if not (p.name == '.DS_Store' and p.is_file() and not p.is_symlink())
        )
        if extras:
            problems.append(f'{len(extras)} unplanned static site files (do not bulk upload); first: {extras[:3]}')

    return {
        'expected_static_pages': len(routes) + len(alias_keys),
        'expected_static_objects': len(expected_keys),
        'exact_html_pages_verified': verified_pages,
        'ignored_finder_metadata_count': len(finder_metadata),
        'ignored_finder_metadata_examples': finder_metadata[:3],
        'problems': problems[:25],
        'total_problem_count': len(problems),
    }


def audit(stage: Path, converted: Path, template: Path | None = None) -> dict:
    """Return a JSON-serialisable report; read-only; never access original images."""
    photos, rows, total_bytes = upload_validate(stage, converted)
    manifest = stage / 'photo-gallery/albums.generated.json'
    data, objects, missing, preview = preview_validate(manifest, converted)
    if missing or len(objects) != len(rows):
        raise ValueError('Local preview image count differs from validated upload plan')
    if len(data['photos']) != len(photos):
        raise ValueError('Gallery and upload plan photo counts differ')
    fields = {k: 0 for k in FIELDS}
    unapproved_exposed = []
    for photo in data['photos']:
        for k in FIELDS:
            approved = photo.get(k + '_approved') is True
            value = photo.get(k)
            if approved:
                if not value:
                    raise ValueError('Approved metadata is empty: ' + str(photo['path']) + '/' + k)
                fields[k] += 1
            elif value not in (None, '', []):
                unapproved_exposed.append(str(photo['path']) + '/' + k)
    if unapproved_exposed:
        raise ValueError('Unreviewed metadata present in manifest: ' +
                         ', '.join(unapproved_exposed[:4]))

    routes = validate_routes(data.get('folders', []))
    if not routes:
        raise ValueError('Missing valid static folder routes')
    if template is None:
        default = Path(__file__).resolve().parents[1] / 'photo-gallery/index.html'
        template = default if default.is_file() else Path.home() / 'Downloads/mcretro-gallery-index.html'
    site = _verify_site(stage, data, template)
    fonts, missing_fonts = local_theme_fonts(manifest)
    _, preview_missing_pages = local_static_pages(manifest)

    file_server = stage / 'file-server/catalogue.generated.json'
    file_server_record = {'present': file_server.is_file(), 'review_required': True}
    if file_server.is_file() and not file_server.is_symlink():
        file_data = json.loads(file_server.read_text(encoding='utf-8'))
        file_server_record = {
            'present': True,
            'candidate_files': len(file_data.get('files', [])),
            'review_required': file_data.get('owner_review_required') is True,
        }

    site_issues = site['problems'] + [
        'Missing locally staged fonts: ' + ', '.join(missing_fonts)
    ] if missing_fonts else site['problems']
    if preview_missing_pages:
        site_issues.append('Local preview cannot serve all generated routes: ' +
                           ', '.join(preview_missing_pages[:3]))
    return {
        'status': 'LOCAL AUDIT ONLY; not a publication decision',
        'original_26gb_collection_accessed': False,
        'r2_contacted': False,
        'photo_count': len(photos),
        'album_count': len(data['albums']),
        'folder_page_count': len(routes),
        'local_object_count': len(rows),
        'local_bytes': total_bytes,
        'gif_objects': sum(row['r2_key'].endswith('.gif') for row in rows),
        'local_converted_files_verified': len(objects),
        'reviewed_metadata_counts': fields,
        'pending_visual_alt_review': len(photos) - fields['alt'],
        'staged_font_count': len(fonts),
        'static_site': site,
        'page_or_font_issues': site_issues[:30],
        'file_server': file_server_record,
        'technical_staging_consistent': not site_issues,
        'publication_authorised': False,
        'additional_r2_upload_authorised': False,
    }


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--stage', type=Path, default=DEFAULT_STAGE)
    parser.add_argument('--converted', type=Path, default=DEFAULT_CONVERTED)
    parser.add_argument('--html', type=Path, default=None,
                        help='Current gallery template to compare every generated static HTML page')
    args = parser.parse_args(argv)
    result = audit(
        args.stage.expanduser().absolute(),
        args.converted.expanduser().absolute(),
        args.html.expanduser().absolute() if args.html else None,
    )
    print(json.dumps(result, indent=2))
    print('\nLOCAL-ONLY. No original collection access, R2 requests, uploads or publication.')
    if not result['technical_staging_consistent']:
        print('ACTION: correct or regenerate only local staging/HTML, then rerun this check.')
        return 2
    print('PASS: local images and static site agree. Editorial review and publication still require separate approval.')
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, TypeError, json.JSONDecodeError) as exc:
        print('ERROR: local readiness audit stopped: ' + str(exc), file=sys.stderr)
        sys.exit(2)
