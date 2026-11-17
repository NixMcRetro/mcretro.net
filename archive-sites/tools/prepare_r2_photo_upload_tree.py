#!/usr/bin/env python3
"""Prepare a separate, human-inspectable R2 photo tree with final .jxl names.

Nothing is uploaded. Originals and converted source images are never renamed,
moved, deleted, or written. macOS cp -c uses APFS copy-on-write cloning when
supported, and falls back to a conventional copy when necessary.

Usage:
    python3 prepare_r2_photo_upload_tree.py                 # checks & examples
    python3 prepare_r2_photo_upload_tree.py --create        # make separate tree
    python3 prepare_r2_photo_upload_tree.py --verify        # verify existing tree
    python3 prepare_r2_photo_upload_tree.py --verify --sha256
"""
from __future__ import annotations

import argparse
import hashlib
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

from validate_r2_upload import DEFAULT_STAGE, DEFAULT_CONVERTED, image_signature_ok, validate


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for piece in iter(lambda: f.read(1024 * 1024), b''):
            h.update(piece)
    return h.hexdigest()


def destination_for(stage: Path) -> Path:
    return stage / 'photo-gallery' / 'upload-ready'


def verify_tree(destination: Path, rows: list[dict], *, hash_contents: bool = False) -> None:
    """Only read existing files; check exact membership and expected media."""
    if not destination.is_dir() or destination.is_symlink():
        raise ValueError('Staged upload tree missing or symlinked: ' + str(destination))
    expected = {row['r2_key']: row for row in rows}
    present = set()
    checked_bytes = 0
    for base, directories, files in os.walk(destination, followlinks=False):
        for folder in directories:
            p = Path(base) / folder
            if p.is_symlink():
                raise ValueError('Symlinked directory in upload tree: ' + str(p))
        for name in files:
            path = Path(base) / name
            key = path.relative_to(destination).as_posix()
            if key not in expected:
                raise ValueError('Unexpected file in upload tree: ' + key)
            if path.is_symlink() or not path.is_file():
                raise ValueError('Non-regular/symlinked file in upload tree: ' + key)
            row = expected[key]
            if path.stat().st_size != int(row['bytes']):
                raise ValueError('Staged file size mismatch: ' + key)
            if not image_signature_ok(path, row['mime']):
                raise ValueError('Staged file signature mismatch: ' + key)
            if hash_contents and sha256(path) != sha256(Path(row['local_path'])):
                raise ValueError('Staged file content differs from conversion: ' + key)
            if key in present:
                raise ValueError('Duplicate staged file: ' + key)
            present.add(key)
            checked_bytes += path.stat().st_size
    if present != set(expected):
        missing = sorted(set(expected) - present)
        raise ValueError(f'{len(missing)} staged objects missing; first: {missing[:3]}')
    print(f'PASS: {len(present):,} locally staged objects ({checked_bytes / 1e9:.3f} GB)')
    if hash_contents:
        print('PASS: all staged bytes match the original converted files (SHA-256)')
    else:
        print('PASS: exact key membership, file sizes and signatures; use --sha256 for byte-level comparison')


def copy_photographs(stage: Path, converted: Path, rows: list[dict]) -> Path:
    target = destination_for(stage)
    if target.exists() or target.is_symlink():
        raise ValueError('Upload-ready directory already exists; refusing to overwrite: ' + str(target))
    parent = target.parent
    if not parent.is_dir() or parent.is_symlink():
        raise ValueError('Stage photo-gallery directory missing or symlinked: ' + str(parent))
    if target.resolve() == converted.resolve() or converted.resolve() in target.resolve().parents:
        raise ValueError('Upload-ready directory must not overlap converted images')
    print('Preparing FINAL public filenames in a separate local directory:', target, flush=True)
    print('Existing converted files and originals will not be modified.', flush=True)
    print('Using macOS APFS clone copies when possible (falls back to ordinary copies).', flush=True)
    with tempfile.TemporaryDirectory(prefix='upload-ready-pending-', dir=parent) as scratch:
        root = Path(scratch)
        for index, row in enumerate(rows, 1):
            source = Path(row['local_path'])
            target_file = root.joinpath(*row['r2_key'].split('/'))
            target_file.parent.mkdir(parents=True, exist_ok=True)
            # On macOS, cp -c attempts a copy-on-write clone. It is NOT a hardlink.
            # On other systems, or if the clone attempt fails, perform a normal copy.
            cloned = False
            if sys.platform == 'darwin':
                proc = subprocess.run(['cp', '-c', str(source), str(target_file)],
                                      stdout=subprocess.DEVNULL, stderr=subprocess.PIPE,
                                      check=False)
                cloned = proc.returncode == 0
                if not cloned and target_file.exists():
                    target_file.unlink()
            if not cloned:
                shutil.copyfile(source, target_file)
            if target_file.stat().st_size != int(row['bytes']):
                raise ValueError('Copy size mismatch: ' + row['r2_key'])
            if not image_signature_ok(target_file, row['mime']):
                raise ValueError('Copy signature mismatch: ' + row['r2_key'])
            if index % 1000 == 0 or index == len(rows):
                print(f'  Prepared {index:,} / {len(rows):,} files', flush=True)
        verify_tree(root, rows)
        if target.exists() or target.is_symlink():
            raise ValueError('Upload-ready directory appeared during processing; refusing overwrite')
        root.rename(target)
    return target


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--stage', type=Path, default=DEFAULT_STAGE)
    parser.add_argument('--converted', type=Path, default=DEFAULT_CONVERTED)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument('--create', action='store_true', help='Create separate local upload-ready tree')
    mode.add_argument('--verify', action='store_true', help='Check existing local upload-ready tree')
    parser.add_argument('--sha256', action='store_true',
                        help='With --verify, compare all staged file bytes against converted sources')
    args = parser.parse_args(argv)
    if args.sha256 and not args.verify:
        parser.error('--sha256 requires --verify')
    stage = args.stage.expanduser().absolute()
    converted = args.converted.expanduser().absolute()
    photos, rows, total = validate(stage, converted)
    target = destination_for(stage)
    print(f'PASS: {len(photos):,} photos, {len(rows):,} planned files, {total / 1e9:.3f} GB')
    if args.verify:
        verify_tree(target, rows, hash_contents=args.sha256)
    elif args.create:
        copy_photographs(stage, converted, rows)
        print('SUCCESS: inspect the separate local upload-ready folder in Finder:', target)
        print('Nothing uploaded. Use rclone --dry-run only after examining these files.')
    else:
        print('Preview of planned LOCAL file copies (source -> upload-ready):')
        for row in rows[:6]:
            print(' ', Path(row['local_path']).name, '->', row['r2_key'])
        print('To make real renamed local copies without changing sources, rerun with --create.')
        print('The output is a separate directory, NOT the original converted folder.')
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (ValueError, OSError) as exc:
        print('ERROR:', exc, file=sys.stderr)
        sys.exit(2)
