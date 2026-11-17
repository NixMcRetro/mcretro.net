"""Optional owner-reviewed photo metadata, keyed by original source-relative path.

A private JSON sidecar is loaded from the Mac's staging folder. Only entries
explicitly marked approved are copied into the potentially public catalogue.
Unreviewed guesses (including AI proposals) are NOT exported.

Descriptions of visible objects/chip markings, short captions and accessibility
alt text serve different purposes and have independent approval flags.
"""
from __future__ import annotations

import json
from pathlib import Path
import re

FIELDS = {
    'caption': 160,
    'scene_description': 360,
    'alt': 420,
    'date_taken': 40,
}
LIST_FIELDS = {'components': (30, 120), 'search_terms': (30, 100)}


def load_descriptions(path: Path, required: bool = False) -> dict[str, dict]:
    if not path.is_file():
        if required:
            raise ValueError(f'Photo descriptions sidecar not found: {path}')
        return {}
    if path.is_symlink():
        raise ValueError('Photo description sidecar may not be a symlink')
    data = json.loads(path.read_text(encoding='utf-8'))
    if not isinstance(data, dict) or data.get('schema_version') != 1:
        raise ValueError('Expected photo description JSON schema_version 1')
    photos = data.get('photos')
    if not isinstance(photos, dict):
        raise ValueError('Descriptions require a photos object keyed by original relative path')
    for path, record in photos.items():
        if (not isinstance(path, str) or not path or path.startswith('/') or
                any(char in path for char in ('?', '#', '\\', '\x00')) or
                any(part in ('', '.', '..') for part in path.split('/'))):
            raise ValueError(f'Invalid original source-relative photo key: {path!r}')
        if not isinstance(record, dict):
            raise ValueError(f'Expected an object for photo: {path}')
    return photos


def approved_metadata(record: dict) -> dict:
    """Never export unapproved source fields, not even to the draft catalogue."""
    output = {}
    for field, max_len in FIELDS.items():
        approved = record.get(field + '_approved') is True
        value = record.get(field, '')
        if approved:
            if not isinstance(value, str) or not value.strip() or len(value) > max_len:
                raise ValueError(f'Approved {field} must be nonempty text up to {max_len} characters')
            if any(ord(ch) < 32 and ch not in '\t\n' for ch in value):
                raise ValueError(f'Control character in approved {field}')
            if field == 'date_taken' and not re.match(r'^\d{4}-\d{2}-\d{2}(?:$|T)', value):
                raise ValueError('Use ISO date format (YYYY-MM-DD) for approved date_taken')
            output[field] = value.strip()
        else:
            output[field] = None if field == 'date_taken' else ''
        output[field + '_approved'] = approved
    for field, (max_items, max_len) in LIST_FIELDS.items():
        approved = record.get(field + '_approved') is True
        items = record.get(field, [])
        if approved:
            if (not isinstance(items, list) or not 1 <= len(items) <= max_items or
                any(not isinstance(v, str) or not v.strip() or len(v) > max_len for v in items)):
                raise ValueError(f'Approved {field} must contain 1-{max_items} short strings')
            output[field] = list(dict.fromkeys(item.strip() for item in items))
        else:
            output[field] = []
        output[field + '_approved'] = approved
    return output
