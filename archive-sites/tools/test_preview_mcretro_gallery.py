import http.client
from http.server import ThreadingHTTPServer
import json
from pathlib import Path
import tempfile
import threading
import unittest

from preview_mcretro_gallery import make_handler, resolve_object, safe_key, validate, local_theme_fonts, local_static_pages
from gallery_routes import folder_url


class GalleryPreviewTests(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        self.root = Path(tmp.name)
        self.images = self.root / 'converted'
        self.stage = self.root / 'stage'
        self.images.mkdir()
        self.stage.mkdir()
        self.html = self.root / 'index.html'
        self.html.write_text('<!doctype html><title>Local gallery preview</title>', encoding='utf-8')
        self.manifest = self.stage / 'albums.generated.json'
        for name in ('full/retro/pic.jpg.jxl', 'thumbs/retro/pic.jpg.jxl'):
            p = self.images / name
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_bytes(b'\xff\x0a' + b'X' * 18)
        self.manifest.write_text(json.dumps({
            'schema_version': 1,
            'albums': [{'id': 'retro', 'title': 'Retro', 'path': 'retro'}],
            'folders': [
                {'path':'','name':'All photographs','parent':None,'url':'/','photo_count':1},
                {'path':'retro','name':'Retro','parent':'','url':folder_url('retro'),'photo_count':1},
            ],
            'photos': [{
                'album': 'retro',
                'path': 'full/retro/pic.jpg.jxl',
                'thumbnail': 'thumbs/retro/pic.jpg.jxl',
                'title': 'Retro',
                'alt': 'Image of a retro object'
            }]
        }), encoding='utf-8')

    def test_catalogue_count_and_strict_file_allowlist(self):
        data, objects, missing, report = validate(self.manifest, self.images)
        self.assertEqual(report['albums'], 1)
        self.assertEqual(report['photos'], 1)
        self.assertEqual(report['valid_local_objects'], 2)
        self.assertEqual(missing, [])
        self.assertFalse(report['approved_for_publication'])
        self.assertEqual(len(objects), 2)
        self.assertTrue(safe_key('full/retro/pic.jpg.jxl'))
        for name in ('/etc/passwd', 'full/../secret.jpg.jxl', 'full/x?y.jxl',
                     'thumbs/../../photos/private.jpg.jxl', 'full/retro/bad\\path.jxl'):
            self.assertFalse(safe_key(name))
        with self.assertRaises(ValueError):
            resolve_object(self.images, 'full/../private.jpg.jxl')

    def test_clean_r2_keys_map_to_unmodified_local_conversions(self):
        data = json.loads(self.manifest.read_text(encoding='utf-8'))
        photo = data['photos'][0]
        photo['source_path'] = 'retro/pic.jpg'
        photo['filename'] = 'pic.jpg'
        photo['path'] = 'full/retro/PIC.jxl'
        photo['thumbnail'] = 'thumbs/retro/PIC.jxl'
        self.manifest.write_text(json.dumps(data), encoding='utf-8')
        _, objects, missing, report = validate(self.manifest, self.images)
        self.assertEqual(missing, [])
        self.assertTrue(report['ready_for_local_preview'])
        self.assertEqual(objects['full/retro/PIC.jxl'], self.images/'full/retro/pic.jpg.jxl')
        self.assertEqual(objects['thumbs/retro/PIC.jxl'], self.images/'thumbs/retro/pic.jpg.jxl')
        server = ThreadingHTTPServer(('127.0.0.1', 0),
                                     make_handler(self.html, self.manifest, objects))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        self.addCleanup(thread.join, 2)
        self.addCleanup(server.server_close)
        self.addCleanup(server.shutdown)
        conn = http.client.HTTPConnection('127.0.0.1', server.server_port, timeout=4)
        self.addCleanup(conn.close)
        for public_key in ('full/retro/PIC.jxl', 'thumbs/retro/PIC.jxl'):
            conn.request('GET', '/' + public_key)
            response = conn.getresponse()
            self.assertEqual(response.status, 200)
            self.assertEqual(response.getheader('Content-Type'), 'image/jxl')
            self.assertTrue(response.read().startswith(bytes((255, 10))))
        conn.request('GET', '/full/retro/pic.jpg.jxl')
        response = conn.getresponse()
        self.assertEqual(response.status, 404)
        response.read()

    def test_renamed_in_place_files_are_served_from_final_public_paths(self):
        data = json.loads(self.manifest.read_text(encoding='utf-8'))
        photo = data['photos'][0]
        photo['source_path'] = 'retro/pic.jpg'
        photo['filename'] = 'pic.jpg'
        photo['path'] = 'full/retro/PIC.jxl'
        photo['thumbnail'] = 'thumbs/retro/PIC.jxl'
        self.manifest.write_text(json.dumps(data), encoding='utf-8')
        for prefix in ('full', 'thumbs'):
            src = self.images / prefix / 'retro/pic.jpg.jxl'
            src.rename(src.with_name('PIC.jxl'))
        _, objects, missing, report = validate(self.manifest, self.images)
        self.assertEqual(missing, [])
        self.assertTrue(report['ready_for_local_preview'])
        self.assertEqual(objects['full/retro/PIC.jxl'],
                         self.images / 'full/retro/PIC.jxl')
        self.assertEqual(objects['thumbs/retro/PIC.jxl'],
                         self.images / 'thumbs/retro/PIC.jxl')

    def test_empty_unreviewed_alt_text_is_valid(self):
        """Regression: catalogue builder deliberately leaves unverified alt empty."""
        data = json.loads(self.manifest.read_text(encoding='utf-8'))
        data['photos'][0]['alt'] = ''
        data['photos'][0]['alt_approved'] = False
        data['photos'][0]['caption'] = ''
        data['photos'][0]['caption_approved'] = False
        self.manifest.write_text(json.dumps(data), encoding='utf-8')
        _, objects, missing, report = validate(self.manifest, self.images)
        self.assertEqual(missing, [])
        self.assertEqual(len(objects), 2)
        self.assertTrue(report['ready_for_local_preview'])

        data['photos'][0]['alt_approved'] = True
        self.manifest.write_text(json.dumps(data), encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'Approved photo alt text cannot be empty'):
            validate(self.manifest, self.images)

    def test_bad_alt_type_is_rejected(self):
        data = json.loads(self.manifest.read_text(encoding='utf-8'))
        data['photos'][0]['alt'] = 123
        self.manifest.write_text(json.dumps(data), encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'Photo alt text must be a string'):
            validate(self.manifest, self.images)

    def test_missing_files_and_symlinks_rejected(self):
        p = self.images / 'thumbs/retro/pic.jpg.jxl'
        p.unlink()
        p.symlink_to(self.images/'full/retro/pic.jpg.jxl')
        with self.assertRaises(ValueError):
            validate(self.manifest, self.images)
        p.unlink()
        _, _, missing, report = validate(self.manifest, self.images)
        self.assertEqual(missing, ['thumbs/retro/pic.jpg.jxl'])
        self.assertFalse(report['ready_for_local_preview'])

    def test_font_route_only_allows_staged_woff2_assets(self):
        font = self.stage / 'assets/fonts/korataki.woff2'
        font.parent.mkdir(parents=True, exist_ok=True)
        font.write_bytes(b'wOF2' + b'0' * 32)
        (font.parent / 'unrelated-secret.txt').write_text('not public')
        assets, missing = local_theme_fonts(self.manifest)
        self.assertIn('assets/fonts/korataki.woff2', assets)
        self.assertEqual(len(missing), 4)
        _, objects, _, _ = validate(self.manifest, self.images)
        server = ThreadingHTTPServer(('127.0.0.1', 0),
                                     make_handler(self.html, self.manifest, objects, assets))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        self.addCleanup(thread.join, 2)
        self.addCleanup(server.server_close)
        self.addCleanup(server.shutdown)
        conn = http.client.HTTPConnection('127.0.0.1', server.server_port, timeout=4)
        self.addCleanup(conn.close)
        conn.request('GET', '/assets/fonts/korataki.woff2')
        res = conn.getresponse()
        self.assertEqual(res.status, 200)
        self.assertEqual(res.getheader('Content-Type'), 'font/woff2')
        self.assertEqual(res.read(), font.read_bytes())
        conn.request('GET', '/assets/fonts/unrelated-secret.txt')
        res = conn.getresponse()
        self.assertEqual(res.status, 404)
        res.read()

    def test_static_folder_url_returns_actual_html_without_404(self):
        website = self.stage / 'site'
        route = folder_url('retro')
        (website / route.lstrip('/')).parent.mkdir(parents=True, exist_ok=True)
        (website / route.lstrip('/')).write_text('<html><h1>Retro</h1><a href="/">Back</a></html>')
        (website / 'index.html').write_text('<html><a href="' + route + '">Retro</a></html>')
        (website / 'sitemap.xml').write_text('<urlset/>')
        pages, missing = local_static_pages(self.manifest)
        self.assertEqual(missing, [])
        self.assertIn(route, pages)
        self.assertNotIn('/albums/secret.html', pages)
        _, objects, _, _ = validate(self.manifest, self.images)
        server = ThreadingHTTPServer(('127.0.0.1', 0),
                                     make_handler(self.html, self.manifest, objects,
                                                  static_pages=pages))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        self.addCleanup(thread.join, 2)
        self.addCleanup(server.server_close)
        self.addCleanup(server.shutdown)
        conn = http.client.HTTPConnection('127.0.0.1', server.server_port, timeout=4)
        self.addCleanup(conn.close)
        for url, expected, mime in (
            ('/', 200, 'text/html'),
            (route, 200, 'text/html'),
            ('/sitemap.xml', 200, 'application/xml'),
            ('/albums/secret.html', 404, 'text/html'),
            ('/albums/../secret.html', 404, 'text/html'),
        ):
            with self.subTest(url=url):
                conn.request('GET', url)
                response = conn.getresponse()
                self.assertEqual(response.status, expected)
                self.assertTrue(response.getheader('Content-Type').startswith(mime))
                body = response.read()
                if url == route:
                    self.assertIn(b'<h1>Retro</h1>', body)
        conn.request('HEAD', route)
        response = conn.getresponse()
        self.assertEqual(response.status, 200)
        self.assertEqual(response.read(), b'')

    def test_server_only_serves_whitelisted_images(self):
        _, objects, _, _ = validate(self.manifest, self.images)
        handler = make_handler(self.html, self.manifest, objects)
        server = ThreadingHTTPServer(('127.0.0.1', 0), handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        self.addCleanup(thread.join, 2)
        self.addCleanup(server.server_close)
        self.addCleanup(server.shutdown)
        conn = http.client.HTTPConnection('127.0.0.1', server.server_port, timeout=4)
        self.addCleanup(conn.close)
        for url, expected, mime in [
            ('/', 200, 'text/html'),
            ('/albums.json', 200, 'application/json'),
            ('/full/retro/pic.jpg.jxl', 200, 'image/jxl'),
            ('/thumbs/retro/pic.jpg.jxl', 200, 'image/jxl'),
            ('/nonexistent.jxl', 404, 'text/html'),
            ('/full/%2e%2e/secret.jpg.jxl', 404, 'text/html'),
            ('/../../etc/passwd', 404, 'text/html')
        ]:
            with self.subTest(url=url):
                conn.request('GET', url)
                response = conn.getresponse()
                self.assertEqual(response.status, expected)
                self.assertTrue(response.getheader('Content-Type').startswith(mime))
                response.read()
        conn.request('HEAD', '/full/retro/pic.jpg.jxl')
        response = conn.getresponse()
        self.assertEqual(response.status, 200)
        self.assertEqual(response.getheader('Content-Type'), 'image/jxl')
        self.assertEqual(response.read(), b'')


if __name__ == '__main__':
    unittest.main()
