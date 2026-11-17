#!/usr/bin/env python3
"""Build local review artefacts for the historical McRetro R2 archives.

Only reads source/conversion trees; writes reports and draft manifests to a separate
staging directory. Does NOT upload files, edit originals or approve downloads.
Python 3.9+ standard library only.
"""
from __future__ import annotations

import argparse
from collections import Counter, defaultdict
import csv
import hashlib
import json
import os
from pathlib import Path
import re
import sys

from gallery_naming import load_rules, build_name_review
from gallery_routes import folder_url

DEFAULT_ORIGINAL = Path('/Users/nix/Desktop/R2 FILES/photos')
DEFAULT_CONVERTED = Path.home() / 'Desktop/McRetro-PhotoGallery-Optimised-v2'
DEFAULT_FILES = Path('/Users/nix/Desktop/R2 FILES/files')
DEFAULT_STAGE = Path.home() / 'Desktop/McRetro-R2-Staging'
SUPPORTED = {'.jpg', '.jpeg', '.png', '.tif', '.tiff', '.heic', '.webp', '.bmp', '.gif'}
PHOTO_PREFIXES = ('full/', 'thumbs/')
JXL_MAGIC = (b'\xff\x0a', b'\x00\x00\x00\x0cJXL \r\n\x87\n')
GENERIC = re.compile(r'^(?:img|dsc|dscf|dscn|image|photo|p|pxl|scan|screenshot|screen-shot|screen_shot)[-_\s\d.]*$', re.I)
GB = 1_000_000_000


def safe_relative(root: Path, target: Path) -> str:
    # pathlib uses forward-slash paths on macOS. Prohibit ambiguous keys.
    rel = target.relative_to(root).as_posix()
    if not rel or any(x in rel for x in ('?', '#', '\\')):
        raise ValueError(f'Unsafe R2 object key: {rel!r}')
    if any(part in ('', '.', '..') for part in rel.split('/')):
        raise ValueError(f'Unsafe R2 path: {rel!r}')
    return rel


def pretty(s: str) -> str:
    return re.sub(r'\s+', ' ', s.replace('_', ' ').replace('-', ' ')).strip() or 'Untitled'


def iter_files(root: Path):
    """Yield files, without following symlinks or including resource forks."""
    for base, dirs, files in os.walk(root, followlinks=False):
        dirs[:] = sorted(d for d in dirs if not (Path(base) / d).is_symlink())
        for name in sorted(files):
            p = Path(base) / name
            yield p


def jxl_ok(path: Path) -> bool:
    if not path.is_file() or path.is_symlink() or path.stat().st_size < 16:
        return False
    with path.open('rb') as f:
        header = f.read(12)
    return header.startswith(JXL_MAGIC[0]) or header == JXL_MAGIC[1]


def gif_ok(path: Path) -> bool:
    if not path.is_file() or path.is_symlink() or path.stat().st_size < 16:
        return False
    with path.open('rb') as stream:
        return stream.read(6) in (b'GIF87a', b'GIF89a')


def write_csv(path: Path, fields: list[str], rows: list[dict]):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=fields, extrasaction='ignore')
        w.writeheader()
        w.writerows(rows)


def write_json(path: Path, data: dict):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')


def validate_dirs(original: Path, converted: Path, files: Path, stage: Path):
    for label, root in (('Original photographs', original), ('Converted photographs', converted)):
        if not root.is_dir() or root.is_symlink():
            raise ValueError(f'{label} folder missing or a symlink: {root}')
    bases = (original.resolve(), converted.resolve(), files.resolve())
    staging = stage.resolve()
    for b in bases:
        if staging == b or staging in b.parents or b in staging.parents:
            raise ValueError('Staging must be separate from originals, converted images and file server.')


def build_photos(original: Path, converted: Path, stage: Path, rules: dict | None = None) -> dict:
    rules = load_rules() if rules is None else rules
    originals = []
    skipped = []
    for p in iter_files(original):
        try:
            rel = safe_relative(original, p)
        except ValueError:
            skipped.append({'path': p.relative_to(original).as_posix(),
                            'reason': 'unsafe URL characters in path; review before publishing',
                            'extension': p.suffix.lower(), 'bytes': ''})
            continue
        if p.is_symlink():
            skipped.append({'path': rel, 'reason': 'symbolic link', 'extension': p.suffix.lower(), 'bytes': ''})
            continue
        if not p.is_file():
            continue
        st = p.stat()
        if p.suffix.lower() not in SUPPORTED:
            skipped.append({'path': rel, 'reason': 'unsupported or non-image file',
                            'extension': p.suffix.lower() or '[none]', 'bytes': st.st_size})
        else:
            originals.append((p, rel, st.st_size))

    albums_by_dir = defaultdict(list)
    images = []
    missing = []
    review = []
    upload = []
    total_original = total_gallery = total_thumbs = 0
    seen_keys = set()
    for p, rel, size in sorted(originals, key=lambda row: row[1].casefold()):
        is_gif = p.suffix.lower() == '.gif'
        full = converted / 'full' / (rel if is_gif else rel + '.jxl')
        thumb = full if is_gif else converted / 'thumbs' / (rel + '.jxl')
        problems = []
        if not (gif_ok(full) if is_gif else jxl_ok(full)):
            problems.append('missing/invalid full image')
        if not is_gif and not jxl_ok(thumb):
            problems.append('missing/invalid thumbnail JXL')
        if problems:
            missing.append({'path': rel, 'problem': '; '.join(problems)})
            continue
        full_key = 'full/' + rel + ('' if is_gif else '.jxl')
        thumb_key = full_key if is_gif else 'thumbs/' + rel + '.jxl'
        keys = (full_key,) if is_gif else (full_key, thumb_key)
        if any(key in seen_keys for key in keys):
            raise ValueError(f'Duplicate output object key: {rel}')
        seen_keys.update(keys)
        directory = Path(rel).parent.as_posix()
        albums_by_dir[directory].append(rel)
        title = pretty(p.stem)
        total_original += size
        gallery_size = full.stat().st_size
        thumb_size = 0 if is_gif else thumb.stat().st_size
        total_gallery += gallery_size
        total_thumbs += thumb_size
        entries = ((full_key, full, 'animation' if is_gif else 'gallery',
                    gallery_size, 'image/gif' if is_gif else 'image/jxl'),)
        if not is_gif:
            entries += ((thumb_key, thumb, 'thumbnail', thumb_size, 'image/jxl'),)
        for key, local, kind, bytes_, mime in entries:
            upload.append({'r2_key': key, 'local_path': str(local), 'kind': kind,
                           'bytes': bytes_, 'mime': mime, 'approved_for_publication': 'NO'})
        if GENERIC.fullmatch(p.stem) or is_gif:
            review.append({'source_path': rel, 'album_folder': directory,
                           'reason': ('animated GIF: review motion and description before publication'
                                      if is_gif else 'generic filename; photographic alt text needs editorial review'),
                           'suggested_alt': f'Archive image {title} from {pretty(Path(directory).name)}'})
        images.append((rel, directory, title, full_key, thumb_key))

    all_dirs = set()
    for directory in albums_by_dir:
        if directory == '.':
            continue
        parts = directory.split('/')
        all_dirs.update('/'.join(parts[:i + 1]) for i in range(len(parts)))
    display_names, name_review = build_name_review(list(all_dirs), rules)
    albums = []
    album_ids = {}
    for directory, members in sorted(albums_by_dir.items(), key=lambda kv: kv[0].casefold()):
        digest = hashlib.sha256(directory.encode('utf-8')).hexdigest()[:16]
        identifier = 'album-' + digest
        album_ids[directory] = identifier
        parts = Path(directory).parts if directory != '.' else ()
        top = display_names.get(parts[0], 'Uncategorised') if parts else 'Uncategorised'
        label = display_names.get(directory, 'Uncategorised')
        albums.append({'id': identifier, 'title': label, 'description': directory if directory != '.' else 'Root album',
                       'path': '' if directory == '.' else directory, 'group': top})

    # The only generated alt text is an honest filename/folder description.
    # Generic text is explicitly queued for owner review before public release.
    photos = []
    for rel, directory, title, full_key, thumb_key in images:
        album = album_ids[directory]
        photos.append({'path': full_key, 'thumbnail': thumb_key, 'title': title,
                       'alt': f'Archive photograph {title} in {pretty(Path(directory).name)}',
                       'album': album})

    # Folder tree mirrors every source directory level, not merely the leaf
    # directories that contain pictures. A single folder can hold both images
    # and child folders. Paths remain source-relative, not display-name slugs.
    folder_nodes = {'': {'path': '', 'url': '/', 'name': 'All photographs', 'parent': None,
                         'photo_count': 0, 'direct_photo_count': 0}}
    def ensure_folder(directory):
        if not directory or directory == '.':
            return
        prefix = ''
        for segment in directory.split('/'):
            node_path = segment if not prefix else prefix + '/' + segment
            if node_path not in folder_nodes:
                folder_nodes[node_path] = {
                    'path': node_path, 'url': folder_url(node_path), 'name': display_names.get(node_path, pretty(segment)),
                    'parent': prefix, 'photo_count': 0, 'direct_photo_count': 0}
            prefix = node_path

    for directory in albums_by_dir:
        ensure_folder(directory)
    for _, directory, _, _, _ in images:
        node_path = '' if directory == '.' else directory
        folder_nodes[node_path]['direct_photo_count'] += 1
        folder_nodes['']['photo_count'] += 1
        while node_path:
            folder_nodes[node_path]['photo_count'] += 1
            node_path = folder_nodes[node_path]['parent']
    folders = [folder_nodes[key] for key in sorted(folder_nodes, key=lambda p: (p.count('/'), p.casefold()))]

    photo_stage = stage / 'photo-gallery'
    write_json(photo_stage / 'albums.generated.json',
               {'schema_version': 1, 'albums': albums, 'folders': folders, 'photos': photos})
    write_csv(stage / 'reports' / 'skipped-photo-files.csv', ['path','reason','extension','bytes'], skipped)
    write_csv(stage / 'reports' / 'missing-photo-conversions.csv', ['path','problem'], missing)
    write_csv(stage / 'reports' / 'photo-alt-review.csv', ['source_path','album_folder','reason','suggested_alt'], review)
    write_csv(stage / 'reports' / 'photos-upload-plan.csv', ['r2_key','local_path','kind','bytes','mime','approved_for_publication'], upload)
    write_csv(stage / 'reports' / 'folder-name-review.csv',
              ['folder_path', 'original_segment', 'proposed_display_name', 'needs_review', 'method_or_reason',
               'owner_approved', 'owner_replacement'], name_review)

    # Output is a preview-only draft; never a published catalogue.
    return {'original_supported_files': len(originals), 'converted_pairs': len(images),
            'skipped': len(skipped), 'missing_pairs': len(missing), 'albums': len(albums), 'folder_labels': len(name_review),
            'folder_labels_needing_review': sum(r['needs_review'] == 'YES' for r in name_review),
            'generic_alt_to_review': len(review), 'input_gb': round(total_original/GB, 3),
            'output_gb': round((total_gallery+total_thumbs)/GB, 3),
            'full_gb': round(total_gallery/GB, 3), 'thumbs_gb': round(total_thumbs/GB, 3),
            'skipped_extensions': dict(sorted(Counter(r['extension'] for r in skipped).items())),
            'skipped_bytes': sum(int(r['bytes']) for r in skipped if isinstance(r['bytes'], int))}


def build_files_review(files_root: Path, stage: Path) -> dict:
    rows = []
    errors = []
    if not files_root.is_dir():
        return {'status': 'not found; no file-server audit produced', 'path': str(files_root)}
    for path in iter_files(files_root):
        try:
            rel = safe_relative(files_root, path)
        except ValueError:
            errors.append({'path': path.relative_to(files_root).as_posix(),
                           'reason': 'unsafe URL characters in path; review before publishing'})
            continue
        if path.is_symlink() or not path.is_file():
            errors.append({'path': rel, 'reason': 'symlink/nonregular, skipped'})
            continue
        st = path.stat()
        rows.append({'r2_key': rel, 'local_path': str(path), 'bytes': st.st_size,
                     'category': pretty(Path(rel).parts[0]) if '/' in rel else 'Uncategorised',
                     'filename': path.name, 'extension': path.suffix.lower(),
                     'publish_approval': 'NOT_REVIEWED', 'description': '', 'rights_notes': ''})
    rows.sort(key=lambda r: r['r2_key'].casefold())
    write_csv(stage/'reports'/'file-server-owner-review.csv',
              ['r2_key','local_path','bytes','category','filename','extension','publish_approval','description','rights_notes'], rows)
    write_csv(stage/'reports'/'file-server-skipped.csv', ['path','reason'], errors)
    draft_files = []
    for item in rows:
        draft_files.append({'path': item['r2_key'], 'title': pretty(Path(item['filename']).stem),
                            'description': 'Archival file; description and redistribution rights pending owner review.',
                            'category': item['category'], 'size_bytes': item['bytes'],
                            'year': None, 'sha256': None, 'review_status': 'NOT_REVIEWED'})
    write_json(stage/'file-server'/'catalogue.generated.json',
               {'schema_version': 1, 'owner_review_required': True, 'files': draft_files})
    return {'status': 'review required; none approved', 'candidate_files': len(rows),
            'total_gb': round(sum(r['bytes'] for r in rows)/GB, 3), 'excluded': len(errors)}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--photos', type=Path, default=DEFAULT_ORIGINAL)
    parser.add_argument('--converted', type=Path, default=DEFAULT_CONVERTED)
    parser.add_argument('--files', type=Path, default=DEFAULT_FILES)
    parser.add_argument('--stage', type=Path, default=DEFAULT_STAGE)
    parser.add_argument('--names', type=Path, default=None, help='Folder display-names.json override file')
    args = parser.parse_args(argv)
    photo_root, conversion_root, file_root, staging = (
        p.expanduser().resolve() for p in (args.photos, args.converted, args.files, args.stage))
    validate_dirs(photo_root, conversion_root, file_root, staging)
    staging.mkdir(parents=True, exist_ok=True)
    naming_rules = load_rules(args.names.expanduser() if args.names else None)
    photo_summary = build_photos(photo_root, conversion_root, staging, naming_rules)
    files_summary = build_files_review(file_root, staging)
    result = {'photos': photo_summary, 'file_server': files_summary,
              'publication': 'NONE; local drafts and review reports only'}
    write_json(staging/'reports'/'audit-summary.json', result)
    print(json.dumps(result, indent=2))
    print('\nReview output:', staging)
    print('No originals were changed; no objects were uploaded; no downloads were approved.')
    if photo_summary['missing_pairs']:
        print('WARNING: Some photo pairs are missing; do not publish until fixed.', file=sys.stderr)
        return 2
    return 0

if __name__ == '__main__':
    try:
        sys.exit(main())
    except (ValueError, OSError) as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        sys.exit(2)
