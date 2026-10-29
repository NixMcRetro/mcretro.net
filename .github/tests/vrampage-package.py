#!/usr/bin/env python3
"""Verify the hosted package against independently reviewed source identity."""
import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import re
import stat
import sys
import zipfile

RUNTIME = {
    'index.html', 'style.css', 'app.js', 'framebuffer.js', 'rgb-encoder.js',
    'circuit-config.js', 'experiment-comparison.js', 'cartridges.js',
    'cartridges.json', 'core/genplus.js', 'core/genplus.wasm', 'build-info.json',
    'SHA256SUMS.txt', 'source-and-licences.html',
}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def safe_name(name):
    path = PurePosixPath(name)
    return (name and not path.is_absolute() and path.as_posix() == name
            and not any(part in {'', '.', '..'} for part in path.parts)
            and '\\' not in name and ':' not in name)


def require(condition, reason):
    if not condition:
        raise ValueError(reason)


def verify(site, pin_path):
    site = Path(site)
    pin = json.loads(Path(pin_path).read_text())
    info = json.loads((site / 'build-info.json').read_text())
    manifest = json.loads((site / 'cartridges.json').read_text())
    require(info['application_version'] == info['version'] == pin['version'], 'Application version differs from reviewed pin')
    require(info['source_commit'] == pin['source_commit'], 'Source commit differs from reviewed pin')
    source_name = f"source/VRAMpage-MD-v{pin['version']}-corresponding-source.zip"
    require(info['source_archive']['path'] == source_name, 'Unexpected source archive path')
    source = (site / source_name).read_bytes()
    require(len(source) <= 32 * 1024 * 1024, 'Source archive too large')
    require(digest(source) == pin['source_archive_sha256'] == info['source_archive']['sha256'], 'Source archive differs from reviewed SHA-256')
    roms = manifest['cartridges']
    require(manifest['schemaVersion'] == 1 and len(roms) > 0, 'Invalid cartridge manifest')
    require(len({cart['id'] for cart in roms}) == len(roms), 'Duplicate cartridge ID')
    require(manifest['defaultCartridge'] in {cart['id'] for cart in roms}, 'Unapproved default cartridge')
    approved_paths = set()
    for cart in roms:
        path = cart['path']
        require(cart['approved'] is True and safe_name(path) and path.startswith('demo/'), 'Unapproved cartridge or unsafe path')
        require(path not in approved_paths, 'Duplicate cartridge path')
        approved_paths.add(path)
        data = (site / path).read_bytes()
        require(len(data) == cart['size'] and digest(data) == cart['sha256'], f'Cartridge identity mismatch: {path}')
    paths = set()
    for file in site.rglob('*'):
        require(not file.is_symlink(), f'Symlink in website package: {file}')
        if file.is_file():
            paths.add(file.relative_to(site).as_posix())
    require(paths == RUNTIME | approved_paths | {source_name}, 'Missing or unexpected website files, including unapproved ROMs')
    require(digest((site / 'SHA256SUMS.txt').read_bytes()) == pin['checksums_sha256'], 'Package checksums differ from reviewed pin')
    sums = {}
    for line in (site / 'SHA256SUMS.txt').read_text().splitlines():
        match = re.fullmatch(r'([0-9a-f]{64})  ([A-Za-z0-9_./-]+)', line)
        require(match is not None, 'Invalid package checksum line')
        checksum, name = match.groups()
        require(safe_name(name) and name not in sums, 'Unsafe or duplicate checksum path')
        sums[name] = checksum
    require(set(sums) == paths - {'SHA256SUMS.txt'}, 'Checksums do not cover the exact package')
    for name, checksum in sums.items():
        require(digest((site / name).read_bytes()) == checksum, f'Package checksum mismatch: {name}')
    with zipfile.ZipFile(io.BytesIO(source)) as archive:
        members = archive.infolist()
        names = [member.filename for member in members]
        require(len(names) == len(set(names)) and len(names) <= 4000, 'Duplicate or excessive source entries')
        require(sum(member.file_size for member in members) <= 64 * 1024 * 1024, 'Excessive expanded source size')
        for member in members:
            require(safe_name(member.filename) and not member.is_dir()
                    and not stat.S_ISLNK(member.external_attr >> 16), 'Unsafe source archive entry')
        source_info = json.loads(archive.read('SOURCE-INFO.json'))
        require(source_info['version'] == pin['version'] and source_info['source_commit'] == pin['source_commit'], 'Source identity mismatch')
        require(source_info['core_sha256'] == info['core_sha256'], 'Source and runtime core metadata differ')
        require(set(names) == set(source_info['files']) | {'SOURCE-INFO.json'}, 'Source inventory mismatch')
        for name, checksum in source_info['files'].items():
            require(digest(archive.read(name)) == checksum, f'Source checksum mismatch: {name}')
        required = {
            'REBUILD.txt', 'emulator/BUILDING.txt', 'emulator/wasm-genplus/CMakeLists.txt',
            'emulator/wasm-genplus/src/main/c/core/m68k/m68k.h',
            'emulator/wasm-genplus/src/main/c/core/ntsc/license.txt',
            'project/THIRD-PARTY-NOTICES.md', 'project/demo-cart/CARTRIDGE-NOTICES.md',
            'project/licences/EMSCRIPTEN-LICENSE.txt', 'project/licences/MUSL-COPYRIGHT.txt',
            'project/licences/LLVM-COMPILER-RT-LICENSE.txt', 'project/licences/LINKED-SYSTEM-NOTICES.txt',
        }
        require(required <= set(names), 'Missing corresponding source or licence text')
        for name, checksum in info['core_sha256'].items():
            data = (site / 'core' / name).read_bytes()
            require(digest(data) == checksum and data == archive.read('runtime/core/' + name), 'Compiled core does not match corresponding source')
        require((site / 'cartridges.json').read_bytes() == archive.read('project/site/cartridges.json'), 'Manifest differs from reviewed source')
        require(b'GNU LESSER GENERAL PUBLIC LICENSE' in archive.read('emulator/wasm-genplus/src/main/c/core/ntsc/license.txt'), 'Missing full LGPL licence')
    require((site / 'core/genplus.wasm').read_bytes().startswith(b'\0asm\x01\0\0\0'), 'Invalid WebAssembly module header')
    html = (site / 'index.html').read_text()
    page = (site / 'source-and-licences.html').read_text()
    require('href="source-and-licences.html"' in html, 'Missing source/licence page link')
    require('href="' + source_name + '"' in page, 'Missing same-origin corresponding-source link')
    require('GNU LESSER GENERAL PUBLIC LICENSE' in page and 'Karl Stenerud' in page, 'Missing readable library notices')
    return len(paths)


if __name__ == '__main__':
    count = verify(sys.argv[1] if len(sys.argv) > 1 else 'homepages/vrampage-md', '.github/vrampage-release.json')
    print(f'Verified {count} website files, approved ROMs, exact source/runtime and all SHA-256 checksums.')
