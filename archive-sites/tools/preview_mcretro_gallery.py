#!/usr/bin/env python3
"""Audit and preview the McRetro Photo Gallery locally, with no upload or publication.

From the repository checkout:
    python3 archive-sites/tools/preview_mcretro_gallery.py --check-only
    python3 archive-sites/tools/preview_mcretro_gallery.py --decode-album-samples
    python3 archive-sites/tools/preview_mcretro_gallery.py

If this script was downloaded separately, pass --html pointing at a downloaded
copy of archive-sites/photo-gallery/index.html. Ctrl+C stops the local server.

Only approved manifest keys in the CONVERTED image tree are served. Never serve
the original photo archive or expose the server beyond 127.0.0.1.
"""
from __future__ import annotations

import argparse
from collections import Counter
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
from urllib.parse import unquote, urlsplit

from gallery_routes import validate_routes
from gallery_keys import public_photo_paths

DEFAULT_MANIFEST = Path.home() / 'Desktop/McRetro-R2-Staging/photo-gallery/albums.generated.json'
DEFAULT_CONVERTED = Path.home() / 'Desktop/McRetro-PhotoGallery-Optimised-v2'
DEFAULT_HTML = Path(__file__).resolve().parents[1] / 'photo-gallery/index.html'
PREVIEW_HOST = '127.0.0.1'
JXL_BOX = b'\x00\x00\x00\x0cJXL \r\n\x87\n'


def safe_key(value: str) -> bool:
    return (isinstance(value, str) and bool(value)
            and not value.startswith('/') and not any(c in value for c in '?#\\\x00')
            and all(part not in ('', '.', '..') for part in value.split('/'))
            and value.startswith(('full/', 'thumbs/'))
            and (value.endswith('.jxl') or value.lower().endswith('.gif')))


def magic_ok(path: Path) -> bool:
    if not path.is_file() or path.is_symlink() or path.stat().st_size < 16:
        return False
    with path.open('rb') as stream:
        header = stream.read(12)
    if path.suffix.lower() == '.jxl':
        return header.startswith(b'\xff\x0a') or header == JXL_BOX
    if path.suffix.lower() == '.gif':
        return header[:6] in (b'GIF87a', b'GIF89a')
    return False


def resolve_object(converted: Path, key: str) -> Path:
    if not safe_key(key):
        raise ValueError(f'Unsafe preview object key: {key!r}')
    root = converted.resolve()
    candidate = converted.joinpath(*key.split('/'))
    # Do not accept symlinks in any part of a requested image path.
    if candidate.is_symlink() or candidate.resolve() != candidate.absolute():
        raise ValueError(f'Symlink/redirected path not permitted: {key}')
    resolved = candidate.resolve()
    if root not in resolved.parents:
        raise ValueError(f'Object outside converted tree: {key}')
    return resolved


def validate(manifest: Path, converted: Path):
    if not manifest.is_file():
        raise ValueError(f'No generated photo catalogue found: {manifest}. Run the catalogue builder first.')
    if not converted.is_dir() or converted.is_symlink():
        raise ValueError(f'Converted image directory missing or symlinked: {converted}')
    data = json.loads(manifest.read_text(encoding='utf-8'))
    if data.get('schema_version') != 1:
        raise ValueError('Unsupported album schema version')
    if not isinstance(data.get('albums'), list) or not isinstance(data.get('photos'), list):
        raise ValueError('Catalogue must contain albums and photos arrays')
    ids = set()
    for album in data['albums']:
        if not isinstance(album, dict) or not isinstance(album.get('id'), str) or not album['id']:
            raise ValueError('Album without valid ID')
        if album['id'] in ids:
            raise ValueError('Duplicate album ID: ' + album['id'])
        ids.add(album['id'])
    sources = [p.get('source_path') for p in data['photos']]
    if any(source is not None for source in sources):
        if not all(isinstance(source, str) for source in sources):
            raise ValueError('Mixed legacy and clean-key photo records')
        public_names = public_photo_paths(sources)
    else:
        public_names = None  # Legacy local-preview catalogues remain usable.
    seen = set()
    allowed = {}
    missing = []
    genres = Counter()
    albums_with_photos = Counter()
    for photo in data['photos']:
        if not isinstance(photo, dict) or photo.get('album') not in ids:
            raise ValueError('Photo uses unknown album ID')
        # Unreviewed visual descriptions intentionally remain empty. The
        # gallery supplies a useful ordinal/album label for the thumbnail
        # control without pretending to describe the image's contents.
        # Only explicitly approved visual descriptions must be non-empty.
        alt = photo.get('alt', '')
        if not isinstance(alt, str):
            raise ValueError('Photo alt text must be a string when supplied')
        if photo.get('alt_approved') is True and not alt.strip():
            raise ValueError('Approved photo alt text cannot be empty')
        key = photo.get('path')
        if not isinstance(key, str) or key in seen:
            raise ValueError(f'Duplicate or missing photo path: {key!r}')
        seen.add(key)
        albums_with_photos[photo['album']] += 1
        thumbnail = photo.get('thumbnail') or key
        source = photo.get('source_path')
        if public_names is not None:
            if key != 'full/' + public_names[source]:
                raise ValueError('Public photo key does not match source: ' + key)
            if thumbnail != (key if key.endswith('.gif') else 'thumbs/' + public_names[source]):
                raise ValueError('Public thumbnail key does not match source: ' + key)
            if photo.get('filename') != Path(source).name:
                raise ValueError('Filename does not match source: ' + source)
        for object_key in {key, thumbnail}:
            if public_names is None:
                local_key = object_key
            else:
                prefix = object_key.split('/', 1)[0]
                local_key = prefix + '/' + source + ('' if source.lower().endswith('.gif') else '.jxl')
            local = resolve_object(converted, local_key)
            if object_key.endswith('.gif') and thumbnail == key:
                genres['GIF animations'] += 1
            if object_key not in allowed:
                if not magic_ok(local):
                    missing.append(object_key)
                else:
                    allowed[object_key] = local
    summary = {
        'albums': len(data['albums']),
        'albums_with_photos': len(albums_with_photos),
        'photos': len(data['photos']),
        'valid_local_objects': len(allowed),
        'missing_or_invalid_objects': len(missing),
        'total_valid_object_bytes': sum(p.stat().st_size for p in allowed.values()),
        'gif_animation_objects': sum(k.lower().endswith('.gif') for k in allowed),
        'ready_for_local_preview': len(missing) == 0 and bool(data['photos']),
        'approved_for_publication': False,
    }
    return data, allowed, missing, summary


def sample_decode(data: dict, objects: dict):
    if not shutil.which('djxl'):
        raise ValueError('Install jpeg-xl (djxl) to decode sample thumbnails')
    # One thumbnail from each album: checks representative actual decoded pixels
    # rather than trusting just the JXL signature.
    sampled = {}
    for photo in data['photos']:
        sampled.setdefault(photo['album'], photo.get('thumbnail') or photo['path'])
    failures = []
    checks = 0
    with tempfile.TemporaryDirectory(prefix='mcretro-gallery-qa-') as scratch:
        root = Path(scratch)
        for album, key in sorted(sampled.items()):
            if not key.lower().endswith('.jxl'):
                continue  # GIF fidelity is preserved via byte-for-byte copying.
            path = objects.get(key)
            if path is None:
                failures.append(f'{album}: missing {key}')
                continue
            out = root / 'checked.png'
            command = subprocess.run(['djxl', str(path), str(out)],
                                     capture_output=True, text=True, errors='replace')
            if command.returncode != 0 or not out.is_file() or out.stat().st_size == 0:
                failures.append(f'{album}: decode failed for {key}: {command.stderr[-200:]}')
            checks += 1
            out.unlink(missing_ok=True)
    return checks, failures


FONT_RELATIVE_PATHS = (
    'korataki.woff2',
    'montserrat/montserrat-latin-400-normal.woff2',
    'montserrat/montserrat-latin-700-normal.woff2',
    'merriweather/merriweather-latin-400-normal.woff2',
    'merriweather/merriweather-latin-700-normal.woff2',
)


def local_theme_fonts(manifest: Path) -> tuple[dict, list]:
    """Allowlist only exact staged WOFF2 paths; never serve unreviewed files."""
    root = manifest.parent / 'assets/fonts'
    assets = {}
    missing = []
    for rel in FONT_RELATIVE_PATHS:
        target = root.joinpath(*rel.split('/'))
        if not target.is_file() or target.is_symlink() or target.resolve() != target.absolute():
            missing.append(rel)
            continue
        with target.open('rb') as stream:
            if stream.read(4) != b'wOF2':
                missing.append(rel)
                continue
        assets['assets/fonts/' + rel] = target
    return assets, missing


def local_static_pages(manifest: Path) -> tuple[dict, list]:
    """Allow only validated manifest folder routes and the generated sitemap."""
    stage = manifest.parent / 'site'
    if not stage.is_dir() or stage.is_symlink():
        return {}, ['Static folder pages have not been generated']
    data = json.loads(manifest.read_text(encoding='utf-8'))
    folders = data.get('folders', [])
    if not folders or (isinstance(folders, list) and all('url' not in f for f in folders)):
        return {}, ['Old folder catalogue: rerun build_mcretro_r2_catalogues.py for static URLs']
    routes = validate_routes(folders)
    pages = {}
    missing = []
    for path in routes.values():
        object_key = 'index.html' if path == '/' else path.lstrip('/')
        filename = stage / object_key
        if filename.is_symlink() or filename.resolve() != filename.absolute():
            raise ValueError(f'Refusing unsafe generated route: {path}')
        if not filename.is_file():
            missing.append(object_key)
            continue
        pages[path] = filename
    sitemap = stage / 'sitemap.xml'
    if sitemap.is_file() and not sitemap.is_symlink():
        pages['/sitemap.xml'] = sitemap
    else:
        missing.append('sitemap.xml')
    return pages, missing


def make_handler(html_path: Path, manifest_path: Path, objects: dict, theme_assets: dict | None = None, static_pages: dict | None = None):
    theme_assets = theme_assets or {}
    static_pages = static_pages or {}
    html = html_path.read_bytes()
    manifest = manifest_path.read_bytes()

    class PreviewHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            self.send_preview(include_body=True)

        def do_HEAD(self):
            self.send_preview(include_body=False)

        def send_preview(self, include_body: bool):
            try:
                key = unquote(urlsplit(self.path).path, encoding='utf-8', errors='strict')
            except (ValueError, UnicodeError):
                self.send_error(400, 'Invalid URL encoding')
                return
            if key in ('/', '/index.html'):
                if '/' in static_pages:
                    content, mime, filename = None, 'text/html; charset=utf-8', static_pages['/']
                else:
                    content, mime, filename = html, 'text/html; charset=utf-8', None
            elif key in static_pages:
                content, filename = None, static_pages[key]
                mime = 'application/xml; charset=utf-8' if key == '/sitemap.xml' else 'text/html; charset=utf-8'
            elif key == '/albums.json':
                content, mime, filename = manifest, 'application/json; charset=utf-8', None
            elif key.startswith('/') and key[1:] in objects:
                content, filename = None, objects[key[1:]]
                mime = 'image/gif' if filename.suffix.lower() == '.gif' else 'image/jxl'
            elif key.startswith('/') and key[1:] in theme_assets:
                content, filename = None, theme_assets[key[1:]]
                mime = 'font/woff2'
            else:
                self.send_error(404, 'Not in local gallery catalogue')
                return
            try:
                length = len(content) if content is not None else filename.stat().st_size
                self.send_response(200)
                self.send_header('Content-Type', mime)
                self.send_header('Content-Length', str(length))
                self.send_header('Cache-Control', 'no-store')
                self.send_header('X-Content-Type-Options', 'nosniff')
                self.send_header('Content-Security-Policy',
                                 "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; "
                                 "style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'none'")
                self.end_headers()
                if include_body:
                    if content is not None:
                        self.wfile.write(content)
                    else:
                        with filename.open('rb') as stream:
                            shutil.copyfileobj(stream, self.wfile, length=1024 * 1024)
            except (BrokenPipeError, ConnectionResetError):
                pass

        def log_message(self, format, *args):
            # Keep the local terminal readable; errors still appear on request.
            if args and str(args[1] if len(args) > 1 else '').startswith(('4', '5')):
                super().log_message(format, *args)

    return PreviewHandler


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--manifest', type=Path, default=DEFAULT_MANIFEST)
    parser.add_argument('--converted', type=Path, default=DEFAULT_CONVERTED)
    parser.add_argument('--html', type=Path, default=DEFAULT_HTML)
    parser.add_argument('--port', type=int, default=8766)
    parser.add_argument('--check-only', action='store_true', help='Validate manifest and local objects; do not serve')
    parser.add_argument('--decode-album-samples', action='store_true',
                        help='Decode one JXL thumbnail per album then exit')
    args = parser.parse_args(argv)
    manifest = args.manifest.expanduser()
    converted = args.converted.expanduser()
    data, objects, missing, summary = validate(manifest, converted)
    print(json.dumps(summary, indent=2))
    if missing:
        for key in missing[:20]:
            print('MISSING/INVALID:', key, file=sys.stderr)
        if len(missing) > 20:
            print(f'... and {len(missing)-20} more', file=sys.stderr)
        return 2
    if args.decode_album_samples:
        count, failures = sample_decode(data, objects)
        print(f'Decoded {count} representative album thumbnails; failures: {len(failures)}')
        for failure in failures:
            print('FAILED:', failure, file=sys.stderr)
        return 2 if failures else 0
    assets, missing_fonts = local_theme_fonts(manifest)
    if missing_fonts:
        print('THEME FONT WARNING: Missing local font files:', ', '.join(missing_fonts), file=sys.stderr)
        print('Run stage_gallery_theme.py to get McRetro typography in the local preview.', file=sys.stderr)
    else:
        print('McRetro self-hosted fonts ready for localhost preview.')
    pages, missing_pages = local_static_pages(manifest)
    if missing_pages:
        print('STATIC PAGE WARNING: ' + ', '.join(missing_pages[:8]), file=sys.stderr)
        print('Run render_gallery_pages.py to create archivally accessible folder URLs.', file=sys.stderr)
    else:
        print(f'{len(pages)-1} static folder pages ready for localhost preview.')
    if args.check_only:
        return 0
    html = args.html.expanduser()
    if not html.is_file():
        raise ValueError(f'Gallery HTML not found: {html}. Download index.html or supply --html.')
    if not 1 <= args.port <= 65535:
        raise ValueError('Port must be between 1 and 65535')
    handler = make_handler(html, manifest, objects, assets, pages)
    with ThreadingHTTPServer((PREVIEW_HOST, args.port), handler) as server:
        print(f'LOCAL PREVIEW ONLY: http://{PREVIEW_HOST}:{args.port}/')
        print('Original photographs, file-server archives, and all unpublished files remain inaccessible.')
        print('Press Ctrl+C to stop. No upload or publication occurs.')
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print('\nLocal preview stopped.')
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        sys.exit(2)
