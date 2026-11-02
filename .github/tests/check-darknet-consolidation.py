#!/usr/bin/env python3
"""Fail the Jekyll build if 2016 guide content, chapter links or original JXL are lost."""
from pathlib import Path
import re
import sys

site = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('_site')
canonical = site / 'take-back-the-darknet' / 'index.html'
assert canonical.is_file(), f'Missing canonical guide: {canonical}'
page = canonical.read_text(encoding='utf-8')
hero = '/assets/images/2016/01/take-back-the-darknet/take-back-the-darknet.jxl'
assert page.count(f'src="{hero}"') == 1, 'A single original JXL hero is required'
assert page.index(f'src="{hero}"') < page.index('id="part-1"'), 'JXL must appear before all accordion sections'
assert (site / hero.lstrip('/')).stat().st_size == 149747, 'Original JXL changed or is missing'
assert page.count('name="mcretro-darknet"') == 14, 'Expected fourteen mutually-exclusive accordion panels'
assert 'Historical reconstruction note:' in page, 'Part 9 reconstruction notice missing'
assert 'not as tested, paste-ready Apache or security instructions' in page, 'Part 9 archive safety warning missing'
part9_source = Path('_posts/2016-01-04-take-back-the-darknet-part-9.md').read_text(encoding='utf-8')
for path in ['/var/www', '/var/www/blog', '/var/www/files/public']:
    assert part9_source.count(f'<Directory {path}>') == 3, f'Expected reconstructed Apache directory {path} in each host'
assert part9_source.count('</Directory>') == 9, 'Reconstructed Directory tags must be balanced'
assert '\u201d' not in part9_source, 'Typographic smart quotes must not remain in Apache examples'
assert 'Raspberry Pi OS stopped creating that account automatically in April 2022' in page, 'Part 2 historical note lost'
assert '/assets/js/darknet-accordion.js' in page and (site / 'assets/js/darknet-accordion.js').is_file(), 'Deep-link script missing'
for chapter in range(1, 15):
    assert f'id="part-{chapter}"' in page, f'Missing chapter {chapter}'
    old = site / f'take-back-the-darknet-part-{chapter}' / 'index.html'
    assert old.is_file(), f'Legacy address for part {chapter} is missing'
    redirect = old.read_text(encoding='utf-8')
    assert re.search('http-equiv=["\\\']refresh', redirect, re.I), f'Part {chapter} did not produce an HTML redirect'
    assert '/take-back-the-darknet/' in redirect, f'Part {chapter} does not redirect to the canonical guide'
    if chapter != 1:
        assert f'#part-{chapter}' in redirect, f'Part {chapter} redirect does not target the chapter'
print('PASS: original JXL, 14 exclusive panels, all 14 legacy redirects, and historical warnings.')
