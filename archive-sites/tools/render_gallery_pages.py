#!/usr/bin/env python3
"""Generate actual static HTML folder pages for the McRetro Photo Gallery.

Unlike JavaScript hash links, these pages have fetchable HTML URLs and ordinary
anchors. They are useful for bookmarks, sharing and archival crawlers.

Reads the locally generated manifest and the existing gallery template.
Writes ONLY to ~/Desktop/McRetro-R2-Staging/photo-gallery/site/ and an
unapproved HTML upload plan. Never uploads, publishes or edits originals.

    python3 archive-sites/tools/render_gallery_pages.py
"""
from __future__ import annotations

import argparse
from collections import defaultdict
import csv
from html import escape
import json
from pathlib import Path
import shutil

from gallery_routes import legacy_folder_url, validate_routes

DEFAULT_STAGE = Path.home() / 'Desktop/McRetro-R2-Staging'
DEFAULT_TEMPLATE = Path(__file__).resolve().parents[1] / 'photo-gallery/index.html'
SITE_HOST = 'https://photos.mcretro.net'

FOLDER_MARKER = '<div id="folders" class="folder-grid"></div>'
FOLDER_LIST_MARKER = '<div id="folder-list" class="folder-list">'
BREADCRUMB_MARKER = '<nav id="breadcrumbs" class="breadcrumbs" aria-label="Folder path"></nav>'
PHOTO_MARKER = '<div id="grid" class="grid"></div>'
TITLE_MARKER = '<title>McRetro Photo Gallery</title>'
DESCRIPTION_MARKER = ('<meta name="description" content="McRetro\'s archive of retro computers, '
                      'repair photographs, gaming hardware and the natural world.">')


def safe_image_url(key: str) -> str:
    from urllib.parse import quote
    if not isinstance(key, str) or not key.startswith(('full/', 'thumbs/')):
        raise ValueError('Unexpected image key')
    if any(c in key for c in '?#\\\x00') or any(part in ('', '.', '..') for part in key.split('/')):
        raise ValueError('Unsafe image key')
    if not (key.lower().endswith('.jxl') or key.lower().endswith('.gif')):
        raise ValueError('Unexpected image type')
    return '/' + '/'.join(quote(segment, safe='') for segment in key.split('/'))


def render_static_page(template: str, folder: dict, by_path: dict,
                       children: dict, album_by_path: dict, by_album: dict):
    path = folder['path']
    parts = [folder]
    node = folder
    while node['parent'] is not None:
        node = by_path[node['parent']]
        parts.append(node)
    parts.reverse()
    crumbs = ['<ol class="static-crumbs" aria-label="Current folder">']
    for item in parts:
        label = escape(item['name'], quote=True)
        href = escape(item['url'], quote=True)
        crumbs.append('<li><a href="' + href + '"' +
                      (' aria-current="page"' if item['path'] == path else '') + '>' +
                      label + '</a></li>')
    crumbs.append('</ol>')
    folder_links = []
    for child in sorted(children[path], key=lambda n: n['name'].casefold()):
        folder_links.append(
            '<a class="folder-card" href="' + escape(child['url'], quote=True) + '">'
            '<span class="folder-icon" aria-hidden="true">📁</span>'
            '<span><strong>' + escape(child['name']) + '</strong>'
            '<small>' + str(child['photo_count']) + ' photographs</small></span></a>')
    # A leaf folder has no extra empty-list panel above its photographs.
    photos = by_album.get(album_by_path.get(path, ''), [])
    image_links = []
    for index, photo in enumerate(photos, 1):
        approved_caption = (
            photo.get('caption', '').strip()
            if photo.get('caption_approved') is True and isinstance(photo.get('caption'), str)
            else ''
        )
        approved_alt = (
            photo.get('alt', '').strip()
            if photo.get('alt_approved') is True and isinstance(photo.get('alt'), str)
            else ''
        )
        accessible_name = (approved_caption or
                           f'Open photograph {index} of {len(photos)} in {folder["name"]}')
        caption_markup = ('<span class="tile-caption">' + escape(approved_caption) + '</span>'
                          if approved_caption else '')
        image_links.append(
            '<a class="tile" aria-label="' + escape(accessible_name, quote=True) +
            '" href="' + escape(safe_image_url(photo['path']), quote=True) + '">'
            '<span class="photo-frame"><img loading="lazy" src="' +
            escape(safe_image_url(photo.get('thumbnail') or photo['path']), quote=True) +
            '" alt="' + escape(approved_alt, quote=True) + '"></span>' +
            caption_markup + '</a>')
    if not image_links:
        image_links.append('<p class="empty">Choose a subfolder to explore these photographs.</p>' if children[path]
                           else '<p class="empty">No photographs at this level.</p>')
    replacements = {
        FOLDER_MARKER: '<div id="folders" class="folder-grid">' + ''.join(folder_links) + '</div>',
        FOLDER_LIST_MARKER: '<div id="folder-list" class="folder-list"' +
                           ('' if children[path] else ' hidden') + '>',
        BREADCRUMB_MARKER: '<nav id="breadcrumbs" class="breadcrumbs" aria-label="Folder path">' +
                           ''.join(crumbs) + '</nav>',
        PHOTO_MARKER: '<div id="grid" class="grid">' + ''.join(image_links) + '</div>',
        TITLE_MARKER: '<title>' + escape(folder['name'] + ' | McRetro Photo Gallery') + '</title>',
        DESCRIPTION_MARKER: '<meta name="description" content="' +
                            escape('Browse ' + str(folder['photo_count']) + ' photographs in ' +
                                   folder['name'] + ' at McRetro Photo Gallery.', quote=True) + '">',
    }
    result = template
    for marker, substitution in replacements.items():
        if result.count(marker) != 1:
            raise ValueError('Gallery template has changed; static marker missing or repeated: ' + marker[:60])
        result = result.replace(marker, substitution)
    return result


def render_legacy_redirect(destination: str) -> str:
    """Static compatibility page for an old hashed album URL.

    This is generated from a validated canonical route. Never put user-supplied
    HTML or unreviewed photo metadata into a redirect page.
    """
    if (not destination.startswith('/albums/') or
            not destination.endswith('.html') or
            any(ch not in 'abcdefghijklmnopqrstuvwxyz0123456789-/.' for ch in destination)):
        raise ValueError('Unsafe canonical redirect destination')
    safe = escape(destination, quote=True)
    canonical = safe  # Same-origin canonical link; no external auto-loaded href.
    return (
        '<!doctype html>\n<html lang="en"><head><meta charset="utf-8">'
        '<meta name="robots" content="noindex,follow">'
        '<meta http-equiv="refresh" content="0; url=' + safe + '">'
        '<link rel="canonical" href="' + canonical + '">'
        '<title>Album moved | McRetro Photo Gallery</title>'
        '</head><body><main><p>This album has moved to '
        '<a href="' + safe + '">its permanent address</a>.'
        '</p></main></body></html>\n'
    )


def render_pages(stage: Path, template_path: Path) -> dict:
    manifest = stage / 'photo-gallery/albums.generated.json'
    if not manifest.is_file():
        raise ValueError(f'Manifest not found: {manifest}. Run build_mcretro_r2_catalogues.py first.')
    if not template_path.is_file():
        raise ValueError('Gallery template HTML not found: ' + str(template_path))
    data = json.loads(manifest.read_text(encoding='utf-8'))
    if data.get('schema_version') != 1:
        raise ValueError('Unexpected catalogue schema')
    folders = data.get('folders')
    if not isinstance(folders, list) or not folders:
        raise ValueError('Manifest needs a generated folder tree')
    routes = validate_routes(folders)
    by_path = {item['path']: item for item in folders}
    children = defaultdict(list)
    for folder in folders:
        path = folder['path']
        parent = folder.get('parent')
        if path and parent not in by_path:
            raise ValueError('Orphan folder: ' + path)
        if path:
            children[parent].append(folder)
    album_by_path = {}
    for album in data.get('albums', []):
        path = album.get('path', '')
        if path not in by_path or path in album_by_path:
            raise ValueError('Album missing a distinct folder: ' + repr(path))
        album_by_path[path] = album['id']
    by_album = defaultdict(list)
    for photo in data.get('photos', []):
        if photo.get('album') not in set(album_by_path.values()):
            raise ValueError('Photograph refers to an unknown album')
        safe_image_url(photo['path'])
        safe_image_url(photo.get('thumbnail') or photo['path'])
        by_album[photo['album']].append(photo)
    template = template_path.read_text(encoding='utf-8')
    output = stage / 'photo-gallery/site'
    if output.is_symlink():
        raise ValueError('Refusing symlink staging output')
    output.mkdir(parents=True, exist_ok=True)
    rows = []
    for folder in folders:
        route = routes[folder['path']]
        local = output / ('index.html' if route == '/' else route.lstrip('/'))
        # Never overwrite an unrelated or unexpectedly changed manually edited HTML file.
        if local.is_symlink():
            raise ValueError('Refusing symlink in output: ' + str(local))
        local.parent.mkdir(parents=True, exist_ok=True)
        html = render_static_page(template, folder, by_path, children, album_by_path, by_album)
        local.write_text(html, encoding='utf-8')
        rows.append({'r2_key': local.relative_to(output).as_posix(), 'local_path': str(local),
                     'mime': 'text/html; charset=utf-8', 'bytes': local.stat().st_size,
                     'approved_for_publication': 'NO'})
        if folder['path']:
            alias = legacy_folder_url(folder['path']).lstrip('/')
            if alias == local.relative_to(output).as_posix():
                raise ValueError('Legacy redirect unexpectedly overlaps canonical route')
            old_page = output / alias
            if old_page.is_symlink():
                raise ValueError('Refusing symlink legacy redirect: ' + str(old_page))
            old_page.parent.mkdir(parents=True, exist_ok=True)
            old_page.write_text(render_legacy_redirect(route), encoding='utf-8')
            rows.append({'r2_key': alias, 'local_path': str(old_page),
                         'mime': 'text/html; charset=utf-8', 'bytes': old_page.stat().st_size,
                         'approved_for_publication': 'NO'})
    # Copy the generated catalogue to its expected public object key.
    catalogue = output / 'albums.json'
    shutil.copyfile(manifest, catalogue)
    rows.append({'r2_key':'albums.json','local_path':str(catalogue),'mime':'application/json',
                 'bytes':catalogue.stat().st_size,'approved_for_publication':'NO'})
    sitemap = output / 'sitemap.xml'
    urls = [SITE_HOST + url for url in routes.values()]
    sitemap.write_text('<?xml version="1.0" encoding="UTF-8"?>\n'
                       '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
                       ''.join('  <url><loc>' + escape(url) + '</loc></url>\n'
                               for url in sorted(urls)) +
                       '</urlset>\n', encoding='utf-8')
    rows.append({'r2_key':'sitemap.xml','local_path':str(sitemap),'mime':'application/xml',
                 'bytes':sitemap.stat().st_size,'approved_for_publication':'NO'})
    report = stage / 'reports/gallery-pages-upload-plan.csv'
    report.parent.mkdir(parents=True, exist_ok=True)
    with report.open('w', newline='', encoding='utf-8') as stream:
        writer = csv.DictWriter(stream,
                                fieldnames=['r2_key','local_path','mime','bytes','approved_for_publication'])
        writer.writeheader()
        writer.writerows(rows)
    return {'html_pages':2*len(folders)-1, 'folder_pages':len(folders)-1,
            'legacy_redirect_pages':len(folders)-1,
            'sitemap_urls':len(urls),'unapproved_objects':len(rows),
            'preview_site':str(output),'published':False}


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--stage', type=Path, default=DEFAULT_STAGE)
    p.add_argument('--html', type=Path, default=DEFAULT_TEMPLATE)
    a = p.parse_args()
    result = render_pages(a.stage.expanduser(), a.html.expanduser())
    print(json.dumps(result, indent=2))
    print('Draft HTML pages only. Nothing uploaded to R2 or published.')


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        raise SystemExit('ERROR: ' + str(exc))
