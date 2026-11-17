import csv
from html.parser import HTMLParser
import json
from pathlib import Path
import tempfile
import unittest

from build_mcretro_r2_catalogues import build_photos
from gallery_routes import folder_url, validate_routes
from render_gallery_pages import render_pages

TEMPLATE = Path(__file__).resolve().parents[1] / 'photo-gallery/index.html'


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            href = dict(attrs).get('href')
            if href:
                self.hrefs.append(href)


class StaticGalleryTests(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        root = Path(tmp.name)
        self.original = root / 'original'
        self.converted = root / 'converted'
        self.stage = root / 'stage'
        self.original.mkdir()
        self.converted.mkdir()

    def photo(self, path):
        original = self.original / path
        original.parent.mkdir(parents=True, exist_ok=True)
        original.write_bytes(b'sample-image')
        for size in ('full', 'thumbs'):
            output = self.converted / size / (path + '.jxl')
            output.parent.mkdir(parents=True, exist_ok=True)
            output.write_bytes(b'\xff\x0a' + b'0' * 20)

    def test_readable_canonical_url_stable_and_unambiguous(self):
        a = folder_url('accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04')
        b = folder_url('computers/serial-cnk7040y04')
        self.assertTrue(a.startswith('/albums/serial-cnk7040y04-'))
        self.assertTrue(a.endswith('.html'))
        self.assertLess(len(a), 100)
        self.assertEqual(a, folder_url('accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04'))
        self.assertNotEqual(a, b)
        self.assertEqual(folder_url(''), '/')
        with self.assertRaises(ValueError):
            folder_url('../etc/passwd')

    def test_static_html_and_sitemap_show_real_folder_links(self):
        self.photo('accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04/IMG_1.jpg')
        self.photo('accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04/IMG_2.jpg')
        self.photo('consoles/sega/mega-drive/model-1/front.jpg')
        summary = build_photos(self.original, self.converted, self.stage)
        self.assertEqual(summary['converted_pairs'], 3)
        manifest_path = self.stage / 'photo-gallery/albums.generated.json'
        manifest = json.loads(manifest_path.read_text())
        routes = validate_routes(manifest['folders'])
        self.assertGreater(len(routes), 5)
        result = render_pages(self.stage, TEMPLATE)
        self.assertEqual(result['html_pages'], len(routes))
        self.assertFalse(result['published'])
        website = self.stage / 'photo-gallery/site'
        root = (website / 'index.html').read_text()
        parser = LinkParser()
        parser.feed(root)
        self.assertIn(routes['accessories'], parser.hrefs)
        self.assertTrue(all('#folder=' not in link for link in parser.hrefs),
                        'Canonical links must not use JavaScript hash fragments')
        self.assertIn('fetch("/albums.json"', root)
        leaf = 'accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/serial-cnk7040y04'
        page = (website / routes[leaf].lstrip('/')).read_text()
        self.assertIn('Serial CNK7040Y04 | McRetro Photo Gallery', page)
        self.assertIn('HP L1706 17-inch LCD Colour Monitor PX849A', page)
        self.assertNotIn('IMG 1</strong>', page)
        self.assertNotIn('Serial CNK7040Y04</small>', page)
        self.assertIn('aria-label="Open photograph 1 of 2 in Serial CNK7040Y04"', page)
        self.assertIn('alt=""', page)
        self.assertNotIn('class="tile-label"', page)
        self.assertIn('id="folder-list" class="folder-list" hidden', page,
                      'Leaf album should not reserve space for an empty folder panel')
        self.assertIn('/thumbs/accessories/', page)
        self.assertIn('/full/accessories/', page)
        parsed = LinkParser()
        parsed.feed(page)
        self.assertIn(routes['accessories'], parsed.hrefs)
        self.assertIn(routes['accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a'], parsed.hrefs)
        self.assertTrue(any(link.startswith('/full/') for link in parsed.hrefs))
        sitemap = (website / 'sitemap.xml').read_text()
        self.assertIn('https://photos.mcretro.net' + routes[leaf], sitemap)
        with (self.stage / 'reports/gallery-pages-upload-plan.csv').open() as source:
            planned = list(csv.DictReader(source))
        self.assertEqual(len(planned), len(routes) + 2)
        self.assertTrue(all(item['approved_for_publication'] == 'NO' for item in planned))

    def test_unsafe_photo_names_escaped_in_html(self):
        self.photo('consoles/sega/amp&chip.jpg')
        build_photos(self.original, self.converted, self.stage)
        render_pages(self.stage, TEMPLATE)
        site = self.stage / 'photo-gallery/site'
        route = folder_url('consoles/sega')
        html = (site / route.lstrip('/')).read_text()
        self.assertIn('amp%26chip.jxl', html)
        self.assertNotIn('amp&amp;chip</strong>', html)
        self.assertNotIn('amp&chip</strong>', html)

    def test_only_explicitly_approved_captions_and_alt_appear(self):
        self.photo('consoles/sega/IMG_0005.jpg')
        self.photo('consoles/sega/IMG_0006.jpg')
        build_photos(self.original, self.converted, self.stage)
        manifest_path = self.stage/'photo-gallery/albums.generated.json'
        manifest = json.loads(manifest_path.read_text())
        first, second = manifest['photos']
        first['caption'] = 'Rear AV connections'
        first['caption_approved'] = True
        first['alt'] = 'Rear connections on a Sega console'
        first['alt_approved'] = True
        second['caption'] = 'Unreviewed model identification'
        second['caption_approved'] = False
        second['alt'] = 'Unverified object in image'
        second['alt_approved'] = False
        manifest_path.write_text(json.dumps(manifest))
        render_pages(self.stage, TEMPLATE)
        page = (self.stage/'photo-gallery/site'/folder_url('consoles/sega').lstrip('/')).read_text()
        self.assertIn('Rear AV connections', page)
        self.assertIn('alt="Rear connections on a Sega console"', page)
        self.assertNotIn('Unreviewed model identification', page)
        self.assertNotIn('Unverified object in image', page)
        self.assertNotIn('>IMG 0005<', page)
        self.assertNotIn('>IMG 0006<', page)

    def test_idempotent_render_does_not_mutate_sources(self):
        self.photo('accessories/sample.jpg')
        build_photos(self.original, self.converted, self.stage)
        manifest = (self.stage / 'photo-gallery/albums.generated.json')
        before = manifest.read_bytes()
        first = render_pages(self.stage, TEMPLATE)
        second = render_pages(self.stage, TEMPLATE)
        self.assertEqual(first, second)
        self.assertEqual(manifest.read_bytes(), before)


if __name__ == '__main__':
    unittest.main()
