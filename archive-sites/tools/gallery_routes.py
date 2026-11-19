"""Canonical nested gallery URLs and compatibility links for old flat URLs.

New paths are real static HTML R2 object keys, without server-side rewrites.
Old hashed routes are recognised only to identify obsolete R2 object keys for retirement.
Collision suffixes are used only for sibling names whose normalised slugs
would otherwise match. Never rename public image object keys.
"""
from __future__ import annotations

from collections import Counter
import hashlib
import re
import unicodedata


def _validated_parts(path: str) -> list[str]:
    if (not isinstance(path, str) or not path or path.startswith('/') or
            any(ord(c) < 32 or ord(c) == 127 for c in path) or
            any(c in path for c in '?#\\') or
            any(part in ('', '.', '..') for part in path.split('/'))):
        raise ValueError(f'Unsafe gallery folder path: {path!r}')
    return path.split('/')


def _slug(segment: str, length: int = 80) -> str:
    ascii_label = unicodedata.normalize('NFKD', segment).encode('ascii', 'ignore').decode('ascii')
    return re.sub(r'[^a-z0-9]+', '-', ascii_label.lower()).strip('-')[:length].strip('-') or 'folder'


def legacy_folder_url(path: str) -> str:
    """Original published flat route, used solely to inventory old keys to retire."""
    if path == '':
        return '/'
    parts = _validated_parts(path)
    old_slug = _slug(parts[-1], 40)
    # This reproduces the *original* 40-character legacy slug, including
    # truncation after normalization (before collision hashing).
    digest = hashlib.sha256(path.encode('utf-8')).hexdigest()[:10]
    return '/albums/' + old_slug + '-' + digest + '.html'


def folder_url(path: str) -> str:
    """Readable default; use plan_folder_routes for collision-aware catalogues."""
    if path == '':
        return '/'
    return '/albums/' + '/'.join(_slug(s) for s in _validated_parts(path)) + '.html'


def plan_folder_routes(paths: list[str]) -> dict[str, str]:
    """Assign stable nested paths and hash only true sibling slug collisions."""
    if '' not in paths or len(paths) != len(set(paths)):
        raise ValueError('Gallery needs one unique root folder')
    all_paths = set(paths)
    for path in paths:
        if path:
            parts = _validated_parts(path)
            parent = '/'.join(parts[:-1])
            if parent not in all_paths:
                raise ValueError(f'Gallery folder has no parent: {path!r}')
    siblings: dict[str, Counter] = {}
    for path in paths:
        if path:
            parent, _, last = path.rpartition('/')
            siblings.setdefault(parent, Counter())[_slug(last)] += 1

    routes = {'': '/'}
    for path in sorted((p for p in paths if p), key=lambda p: (p.count('/'), p)):
        parent, _, last = path.rpartition('/')
        name = _slug(last)
        if siblings[parent][name] > 1:
            name += '-' + hashlib.sha256(path.encode('utf-8')).hexdigest()[:10]
        parent_route = routes[parent]
        route = (parent_route.removesuffix('.html') + '/' + name + '.html'
                 if parent else '/albums/' + name + '.html')
        routes[path] = route

    canonical = set(routes.values())
    legacy = {legacy_folder_url(path) for path in paths if path}
    if len(canonical) != len(routes) or any(key in canonical for key in legacy):
        raise ValueError('Canonical folder URL conflicts with an old hashed key')
    return routes


def validate_routes(folders: list[dict]) -> dict[str, str]:
    paths = [node.get('path') for node in folders]
    if any(not isinstance(p, str) for p in paths):
        raise ValueError('Invalid gallery folder path')
    routes = plan_folder_routes(paths)
    for node in folders:
        if node.get('url') != routes[node['path']]:
            raise ValueError('Incorrect canonical nested folder URL: ' + node['path'])
        parent = node.get('parent')
        expected_parent = None if not node['path'] else node['path'].rpartition('/')[0]
        if parent != expected_parent:
            raise ValueError('Incorrect gallery parent folder: ' + node['path'])
    return routes
