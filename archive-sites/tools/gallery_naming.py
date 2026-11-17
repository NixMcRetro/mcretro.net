"""Display-only McRetro folder name formatter.

R2 keys, album IDs, disk paths and file names are NEVER rewritten.
Override rules come from config/folder-names.json, and all suggestions can
be inspected in the generated folder-name-review.csv before publication.
"""
from __future__ import annotations

import json
from pathlib import Path
import re

DEFAULT_RULES = Path(__file__).resolve().parents[1] / 'config' / 'folder-names.json'


def load_rules(path: Path | None = None) -> dict:
    filename = Path(path) if path is not None else DEFAULT_RULES
    if not filename.is_file():
        raise ValueError(f'Folder naming configuration not found: {filename}. '
                         'Download archive-sites/config/folder-names.json and use --names.')
    data = json.loads(filename.read_text(encoding='utf-8'))
    if data.get('schema_version') != 1:
        raise ValueError('Unsupported folder naming rules schema version')
    for name in ('word_case', 'phrase_case', 'folder_overrides'):
        if not isinstance(data.get(name), dict):
            raise ValueError('Missing/invalid folder naming rules: ' + name)
    return data


def format_segment(path: str, rules: dict) -> tuple[str, bool, str]:
    """Return (display label, needs owner review, reason)."""
    if path == '':
        return 'All photographs', False, 'root'
    slug = path.split('/')[-1]
    if path in rules['folder_overrides']:
        return rules['folder_overrides'][path], False, 'explicit owner-approved override'
    if slug.lower().startswith('serial-'):
        value = slug[7:].strip(' _-')
        if value.lower() in ('no_serial', 'no-serial', 'unknown', 'unknown1', 'unknown2', 'missingno.'):
            return 'Serial not recorded' if value.lower().startswith('no') else 'Serial ' + value.replace('_', ' ').title(), True, 'unconfirmed serial placeholder'
        return 'Serial ' + value.upper().replace('_', '-'), True, 'serial identifier uppercased; check original characters'
    if slug.lower().startswith('part-'):
        # Preserve the difference between a part number, ID and FRU.
        m = re.match(r'^part-(.+)$', slug, flags=re.I)
        if m:
            value = m.group(1).replace('-id-', ' ID ').replace('-fru-', ' FRU ')
            return 'Part ' + value.upper(), True, 'technical part/FRU identifier; verify case'
    raw = slug.lower()
    phrase_map = rules['phrase_case']
    # Replacement markers are letters only so they survive ordinary separators.
    replacements = {}
    for i, (phrase, display) in enumerate(sorted(phrase_map.items(), key=lambda x: -len(x[0]))):
        marker = 'mcname' + chr(97 + (i // 26) % 26) + chr(97 + i % 26) + 'token'
        pattern = r'(?<![a-z0-9])' + re.escape(phrase.lower()) + r'(?![a-z0-9])'
        adjusted, matches = re.subn(pattern, marker, raw)
        if matches:
            raw = adjusted
            replacements[marker] = display
    # Distinguish measurements from separators: 17-inch retains its hyphen.
    raw = re.sub(r'(\d+)-inch\b', r'\1INCHTOKEN', raw)
    tokens = [x for x in re.split(r'[-_\s]+', raw) if x]
    minor = set(rules.get('no_auto_case_words', []))
    labelled = []
    flagged = []
    for i, token in enumerate(tokens):
        if token in replacements:
            labelled.append(replacements[token])
        elif token.endswith('INCHTOKEN') and token[:-len('INCHTOKEN')].isdigit():
            labelled.append(token[:-len('INCHTOKEN')] + '-inch')
        elif token in rules['word_case']:
            labelled.append(rules['word_case'][token])
        elif i and token in minor:
            labelled.append(token)
        elif re.search(r'[a-z]', token) and re.search(r'\d', token):
            labelled.append(token.upper())
            flagged.append(token)
        else:
            labelled.append(token[:1].upper() + token[1:])
    result = ' '.join(labelled) or slug
    if flagged:
        return result, True, 'technical token(s) need review: ' + ', '.join(flagged)
    return result, False, 'standard display-name rules'


def build_name_review(paths: list[str], rules: dict) -> tuple[dict[str, str], list[dict]]:
    display = {}
    records = []
    for path in sorted(set(paths), key=str.casefold):
        if path == '':
            continue
        name, review, method = format_segment(path, rules)
        display[path] = name
        records.append({
            'folder_path': path,
            'original_segment': path.split('/')[-1],
            'proposed_display_name': name,
            'needs_review': 'YES' if review else 'NO',
            'method_or_reason': method,
            'owner_approved': 'NO',
            'owner_replacement': '',
        })
    return display, records
