#!/usr/bin/env python3
"""Fail the Jekyll build if 2016 guide content, chapter links or original JXL are lost."""
from pathlib import Path
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
assert 'Historical reconstruction note:' not in page, 'Removed Part 9 note must not reappear'
removed_source = 'https://web.archive.org/web/20190824000515/https://mcretro.net/take-back-the-darknet-part-9/'
assert removed_source not in page, 'Removed Part 9 Wayback citation must not reappear'
part9_source = Path('_posts/2016-01-04-take-back-the-darknet-part-9.md').read_text(encoding='utf-8')
assert removed_source not in part9_source, 'Archived source still cites removed Part 9 Wayback link'
assert 'Historical reconstruction note:' not in part9_source, 'Archived source still has removed warning'
for path in ['/var/www', '/var/www/blog', '/var/www/files/public']:
    assert part9_source.count(f'<Directory {path}>') == 3, f'Expected reconstructed Apache directory {path} in each host'
assert part9_source.count('</Directory>') == 9, 'Reconstructed Directory tags must be balanced'
assert '\u201d' not in part9_source, 'Typographic smart quotes must not remain in Apache examples'
assert 'Raspberry Pi OS stopped creating that account automatically in April 2022' in page, 'Part 2 historical note lost'
assert '/assets/js/darknet-accordion.js' in page and (site / 'assets/js/darknet-accordion.js').is_file(), 'Deep-link script missing'
for chapter in range(1, 15):
    assert f'id="part-{chapter}"' in page, f"Missing chapter {chapter}"
    old = site / f'take-back-the-darknet-part-{chapter}' / 'index.html'
    assert not old.exists(), f"Legacy address for part {chapter} must not publish or redirect"
print('PASS: original JXL, 14 exclusive panels, absent legacy URLs, and historical warnings.')
