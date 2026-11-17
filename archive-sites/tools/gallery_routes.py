"""Stable, readable, directly fetchable archive folder URLs.

Each folder is represented by an actual .html object in the public R2 bucket.
The short digest disambiguates same-named folders without exposing a long or
percent-encoded local source pathname. Do not rename routes after publication.
"""
from __future__ import annotations

import hashlib
import re
import unicodedata


def folder_url(path: str) -> str:
    if path == '':
        return '/'
    if (not isinstance(path, str) or path.startswith('/') or
            any(c in path for c in '?#\\\x00') or
            any(part in ('', '.', '..') for part in path.split('/'))):
        raise ValueError(f'Unsafe folder path: {path!r}')
    last = path.split('/')[-1]
    ascii_label = unicodedata.normalize('NFKD', last).encode('ascii', 'ignore').decode('ascii')
    slug = re.sub(r'[^a-z0-9]+', '-', ascii_label.lower()).strip('-')[:40].strip('-') or 'folder'
    digest = hashlib.sha256(path.encode('utf-8')).hexdigest()[:10]
    return '/albums/' + slug + '-' + digest + '.html'


def validate_routes(folders: list[dict]) -> dict[str, str]:
    routes: dict[str, str] = {}
    used = set()
    for node in folders:
        path = node.get('path')
        if not isinstance(path, str) or path in routes:
            raise ValueError(f'Duplicate or invalid folder path: {path!r}')
        url = folder_url(path)
        if url in used or node.get('url') != url:
            raise ValueError(f'Incorrect or duplicate canonical folder URL: {path!r}')
        used.add(url)
        routes[path] = url
    if '' not in routes:
        raise ValueError('Root folder missing')
    return routes
