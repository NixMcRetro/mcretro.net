#!/usr/bin/env python3
"""Prepare previously skipped BMP and GIF images for the local gallery.

Default mode only lists work. --apply creates lossless JPEG XL pairs for BMPs
and copies animated GIFs unchanged into the converted tree. It never changes
the original source or uploads any files.

    python3 archive-sites/tools/prepare_gallery_extras.py
    python3 archive-sites/tools/prepare_gallery_extras.py --apply
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

DEFAULT_SOURCE = Path('/Users/nix/Desktop/R2 FILES/photos')
DEFAULT_OUTPUT = Path.home() / 'Desktop/McRetro-PhotoGallery-Optimised-v2'


def is_within(a: Path, b: Path) -> bool:
    return a == b or b in a.parents


def assert_directories(source: Path, converted: Path):
    if not source.is_dir() or source.is_symlink():
        raise ValueError(f'Original photos directory missing or symlinked: {source}')
    if converted.is_symlink():
        raise ValueError(f'Converted folder must not be a symlink: {converted}')
    a, b = source.resolve(), converted.resolve()
    if is_within(a, b) or is_within(b, a):
        raise ValueError('Converted folder must be separate from original photographs')


def discover(source: Path):
    for root, dirs, filenames in os.walk(source, followlinks=False):
        dirs[:] = sorted(d for d in dirs if not (Path(root) / d).is_symlink())
        for name in sorted(filenames):
            p = Path(root) / name
            if p.is_symlink() or not p.is_file() or p.suffix.lower() not in ('.bmp', '.gif'):
                continue
            rel = p.relative_to(source).as_posix()
            if any(ch in rel for ch in '?#\\'):
                print(f'SKIP unsafe URL pathname: {rel}', file=sys.stderr)
                continue
            yield p, rel


def run(command: list[str]):
    p = subprocess.run(command, text=True, capture_output=True)
    if p.returncode:
        raise RuntimeError(f'{command[0]} failed: {(p.stderr or p.stdout)[-500:]}')


def jxl_header(path: Path):
    if not path.is_file() or path.stat().st_size < 16:
        return False
    with path.open('rb') as stream:
        magic = stream.read(12)
    return magic.startswith(b'\xff\x0a') or magic == b'\x00\x00\x00\x0cJXL \r\n\x87\n'


def gif_header(path: Path):
    if not path.is_file():
        return False
    with path.open('rb') as stream:
        return stream.read(6) in (b'GIF87a', b'GIF89a')


def file_sha(path: Path):
    sha = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            sha.update(chunk)
    return sha.hexdigest()


def prepare_bmp(source: Path, rel: str, converted: Path):
    full = converted / 'full' / (rel + '.jxl')
    thumb = converted / 'thumbs' / (rel + '.jxl')
    if full.is_symlink() or thumb.is_symlink():
        raise RuntimeError('Refusing output symlink')
    if jxl_header(full) and jxl_header(thumb):
        return 'already converted'
    if full.exists() or thumb.exists():
        raise RuntimeError('Partial or unrecognised outputs exist; inspect before retry')
    work_root = converted / '_work'
    work_root.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='bmp-extra-', dir=work_root) as d:
        tmp = Path(d)
        png, thumb_png = tmp/'full.png', tmp/'thumb.png'
        out, small = tmp/'full.jxl', tmp/'thumb.jxl'
        run(['sips', '-s', 'format', 'png', str(source), '--out', str(png)])
        run(['sips', '-s', 'format', 'png', '-Z', '480', str(source), '--out', str(thumb_png)])
        # Lossless JXL is appropriate for pixel art and screen captures.
        run(['cjxl', str(png), str(out), '-d', '0', '-e', '7'])
        run(['cjxl', str(thumb_png), str(small), '-d', '0', '-e', '7'])
        if not jxl_header(out) or not jxl_header(small):
            raise RuntimeError('Invalid JXL output')
        # Decode both before committing their output files.
        run(['djxl', str(out), str(tmp/'verified-full.png')])
        run(['djxl', str(small), str(tmp/'verified-thumb.png')])
        full.parent.mkdir(parents=True, exist_ok=True)
        thumb.parent.mkdir(parents=True, exist_ok=True)
        os.replace(out, full)
        os.replace(small, thumb)
    return f'{full.stat().st_size:,} bytes full + {thumb.stat().st_size:,} bytes thumbnail'


def prepare_gif(source: Path, rel: str, converted: Path):
    target = converted / 'full' / rel
    if target.is_symlink():
        raise RuntimeError('Refusing output symlink')
    if not gif_header(source):
        raise RuntimeError('Source does not contain a valid GIF signature')
    if target.exists():
        if gif_header(target) and file_sha(target) == file_sha(source):
            return 'already copied, byte-for-byte identical'
        raise RuntimeError('Different file already exists at destination; inspect first')
    target.parent.mkdir(parents=True, exist_ok=True)
    # A copied GIF retains animation, unlike converting just its first frame.
    with tempfile.NamedTemporaryFile(dir=target.parent, prefix='.gif-', delete=False) as f:
        temporary = Path(f.name)
    try:
        shutil.copy2(source, temporary)
        if file_sha(temporary) != file_sha(source):
            raise RuntimeError('GIF copy verification failed')
        os.replace(temporary, target)
    finally:
        temporary.unlink(missing_ok=True)
    return f'copied {target.stat().st_size:,} bytes without altering animation'


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply', action='store_true', help='Create extra public-copy files locally; no uploads')
    parser.add_argument('--photos', type=Path, default=DEFAULT_SOURCE)
    parser.add_argument('--converted', type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args(argv)
    photos = args.photos.expanduser()
    converted = args.converted.expanduser()
    assert_directories(photos, converted)
    candidates = list(discover(photos))
    print(f'Found {len(candidates)} BMP/GIF originals: '
          f'{sum(p.suffix.lower()==".bmp" for p,_ in candidates)} BMP, '
          f'{sum(p.suffix.lower()==".gif" for p,_ in candidates)} GIF')
    if not args.apply:
        print('DRY RUN: nothing written. Rerun with --apply to generate local copies.')
        for _, rel in candidates:
            print('  ' + rel)
        return 0
    for cmd in ('sips', 'cjxl', 'djxl'):
        if not shutil.which(cmd):
            parser.error(f'Missing {cmd} command; install jpeg-xl or check macOS PATH')
    converted.mkdir(parents=True, exist_ok=True)
    errors = []
    for i, (p, rel) in enumerate(candidates, 1):
        try:
            if p.suffix.lower() == '.bmp':
                result = prepare_bmp(p, rel, converted)
            else:
                result = prepare_gif(p, rel, converted)
            print(f'[{i}/{len(candidates)}] OK {rel}: {result}', flush=True)
        except (OSError, RuntimeError) as exc:
            errors.append((rel, str(exc)))
            print(f'[{i}/{len(candidates)}] FAILED {rel}: {exc}', file=sys.stderr)
    print(f'Done: {len(candidates)-len(errors)} successful, {len(errors)} failed.')
    print('Original files unchanged. No Cloudflare uploads or GitHub publication.')
    return 1 if errors else 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError) as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        sys.exit(2)
