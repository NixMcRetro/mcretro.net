#!/usr/bin/env python3
"""Check the deployed VRAMpage package against the exact approved local files."""
import argparse
import hashlib
from pathlib import Path, PurePosixPath
import time
from urllib.error import URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


def verify(base, source):
    for file in sorted(source.rglob('*')):
        if not file.is_file():
            continue
        name = file.relative_to(source).as_posix()
        path = PurePosixPath(name)
        if path.is_absolute() or '..' in path.parts or file.is_symlink():
            raise ValueError('Unsafe deployed file path')
        expected = file.read_bytes()
        request = Request(base.rstrip('/') + '/' + quote(name, safe='/'),
                          headers={'Cache-Control': 'no-cache', 'User-Agent': 'McRetro-VRAMpage-Deployment-Check'})
        with urlopen(request, timeout=30) as response:
            actual = response.read(len(expected) + 1)
            if actual != expected:
                raise ValueError(f'Live file differs from approved package: {name}')
            if name.endswith('.wasm') and response.headers.get_content_type() != 'application/wasm':
                raise ValueError('Live WebAssembly MIME type must be application/wasm')
        print(f'Live file verified: {name} SHA256={hashlib.sha256(expected).hexdigest()}', flush=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url', default='https://mcretro.net/homepages/vrampage-md/')
    parser.add_argument('--source', type=Path, default=Path('homepages/vrampage-md'))
    parser.add_argument('--attempts', type=int, default=8)
    args = parser.parse_args()
    if args.attempts < 1:
        parser.error('--attempts must be positive')
    for attempt in range(args.attempts):
        try:
            verify(args.base_url, args.source)
            break
        except (OSError, URLError, ValueError) as error:
            if attempt == args.attempts - 1:
                raise
            print(f'Waiting for Pages/CDN propagation: {error}', flush=True)
            time.sleep(15)
    print('Live VRAMpage runtime, cartridges, source ZIP and notices match the approved deployment.')
