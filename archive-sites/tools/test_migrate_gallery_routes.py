"""Offline, synthetic regression tests for route migration. No R2 access."""
from collections import defaultdict
import csv
import json
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch

from build_mcretro_r2_catalogues import build_photos
from gallery_routes import legacy_folder_url
from preview_mcretro_gallery import FONT_RELATIVE_PATHS
from render_gallery_pages import render_static_page
import migrate_gallery_routes as migration
import publish_photo_gallery_site as pub

TEMPLATE = Path(__file__).resolve().parents[1] / 'photo-gallery/index.html'


class RouteMigrationTests(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        base = Path(temp.name)
        original = base / 'original'
        self.converted = base / 'converted'
        self.stage = base / 'stage'
        original.mkdir()
        self.converted.mkdir()
        for source in ('the-collection/retired/old.jpg', 'the-collection/new.jpg'):
            src = original / source
            src.parent.mkdir(parents=True, exist_ok=True)
            src.write_bytes(b'SYNTHETIC TEST SOURCE ONLY')
            for kind in ('full', 'thumbs'):
                photo = self.converted / kind / (source + '.jxl')
                photo.parent.mkdir(parents=True, exist_ok=True)
                photo.write_bytes(b'\xff\x0a' + b'SYNTHETIC TEST JXL' * 4)
        build_photos(original, self.converted, self.stage)
        self.manifest = self.stage / migration.CATALOGUE
        self.original_manifest = json.loads(self.manifest.read_text())
        self.folder_count = len(self.original_manifest['folders'])
        shutil.rmtree(original)
        for rel in FONT_RELATIVE_PATHS:
            font = self.manifest.parent / 'assets/fonts' / rel
            font.parent.mkdir(parents=True, exist_ok=True)
            font.write_bytes(b'wOF2' + b'SYNTHETIC FONT')

        # Recreate the *previous* flat gallery release locally. No real files.
        old = json.loads(self.manifest.read_text())
        for node in old['folders']:
            node['url'] = legacy_folder_url(node['path'])
        self.manifest.write_text(json.dumps(old), encoding='utf-8')
        site = self.stage / migration.SITE
        site.mkdir(parents=True, exist_ok=True)
        template = TEMPLATE.read_text(encoding='utf-8')
        by_path = {f['path']: f for f in old['folders']}
        children = defaultdict(list)
        for node in old['folders']:
            if node['path']:
                children[node['parent']].append(node)
        albums = {a['path']: a['id'] for a in old['albums']}
        by_album = defaultdict(list)
        for photo in old['photos']:
            by_album[photo['album']].append(photo)
        rows = []
        for node in old['folders']:
            url = node['url']
            key = 'index.html' if url == '/' else url.lstrip('/')
            file = site / key
            file.parent.mkdir(parents=True, exist_ok=True)
            file.write_text(render_static_page(template, node, by_path, children,
                                               albums, by_album), encoding='utf-8')
            rows.append(self._row(file, key))
        sitemap = site / 'sitemap.xml'
        sitemap.write_text(
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            ''.join('<url><loc>https://photos.mcretro.net' +
                    node['url'] + '</loc></url>\n' for node in old['folders']) +
            '</urlset>\n', encoding='utf-8')
        rows.append(self._row(sitemap, 'sitemap.xml'))
        private_catalogue = site / 'albums.json'
        private_catalogue.write_bytes(self.manifest.read_bytes())
        rows.append(self._row(private_catalogue, 'albums.json'))
        with (self.stage / 'reports/gallery-pages-upload-plan.csv').open(
                'w', newline='', encoding='utf-8') as stream:
            writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
            writer.writeheader()
            writer.writerows(rows)

        patches = {
            migration: [('EXPECTED_CANONICAL_HTML', self.folder_count),
                        ('EXPECTED_OLD_SITE', self.folder_count + 2 + 5),
                        ('EXPECTED_PHOTOS', 4)],
            pub: [('EXPECTED_HTML', self.folder_count * 2 - 1),
                  ('EXPECTED_SITE', self.folder_count * 2 + 1),
                  ('EXPECTED_PUBLIC', self.folder_count * 2 + 6),
                  ('EXPECTED_PHOTOS', 4),
                  ('EXPECTED_PHOTOGRAPHS', 2),
                  ('EXPECTED_IMAGE_BYTES', 4 * len(b'\xff\x0a' + b'SYNTHETIC TEST JXL' * 4))]
        }
        for module, values in patches.items():
            for name, value in values:
                control = patch.object(module, name, value)
                control.start()
                self.addCleanup(control.stop)
        rclone_check = patch.object(
            migration.shutil, 'which',
            side_effect=lambda name: '/usr/bin/rclone' if name == 'rclone' else None
        )
        rclone_check.start()
        self.addCleanup(rclone_check.stop)

    @staticmethod
    def _row(file, key):
        return {'r2_key': key, 'local_path': str(file),
                'mime': ('application/xml' if key.endswith('.xml') else
                         'application/json' if key.endswith('.json') else
                         'text/html; charset=utf-8'),
                'bytes': str(file.stat().st_size),
                'approved_for_publication': 'NO'}

    def prepare(self):
        with patch.object(migration, 'list_remote', side_effect=AssertionError('R2 called')):
            migration.prepare(self.stage, TEMPLATE)

    def test_prepare_keeps_public_baseline_and_exact_legacy_redirects(self):
        old_manifest_bytes = self.manifest.read_bytes()
        self.prepare()
        snapshot = self.stage / migration.BASELINE
        self.assertEqual((snapshot / 'original-private-manifest.json').read_bytes(),
                         old_manifest_bytes)
        old_catalogue = (snapshot / 'old-site/albums.json').read_text()
        self.assertNotIn('source_path', old_catalogue)
        self.assertNotIn('"filename"', old_catalogue)
        new = json.loads(self.manifest.read_text())
        urls = {node['path']: node['url'] for node in new['folders']}
        self.assertEqual(urls['the-collection/retired'],
                         '/albums/the-collection/retired.html')
        redirect = (self.stage / migration.SITE /
                    legacy_folder_url('the-collection/retired').lstrip('/')).read_text()
        self.assertIn('url=/albums/the-collection/retired.html', redirect)
        self.assertIn('noindex,follow', redirect)
        with self.assertRaisesRegex(ValueError, 'baseline already exists'):
            migration.prepare(self.stage, TEMPLATE)
        site, images, catalogue = pub.check_local(self.stage, self.converted, TEMPLATE)
        self.assertEqual(len(site), self.folder_count * 2 + 6)
        self.assertEqual(len(images), 4)
        self.assertNotIn(b'source_path', catalogue)

    def test_preflight_requires_exact_remote_old_or_new_bytes(self):
        self.prepare()
        site, images, catalogue = pub.check_local(self.stage, self.converted, TEMPLATE)
        new = {
            key: (catalogue if key == 'albums.json' else
                  migration._safe_file(self.stage / 'photo-gallery', key).read_bytes()
                  if key.endswith('.woff2') else
                  migration._safe_file(self.stage / migration.SITE, key).read_bytes())
            for key in site
        }
        old = {
            key: file.read_bytes() for key, file in
            migration._baseline_map(self.stage, [
                f['path'] for f in json.loads(self.manifest.read_text())['folders']
            ]).items()
        }
        remote_blobs = dict(old)
        remote = {key: {'Path': key, 'Size': len(value)}
                  for key, value in remote_blobs.items()}
        remote.update({key: {'Path': key, 'Size': size} for key, size in images.items()})
        with patch.object(migration, 'list_remote', return_value=remote), \
             patch.object(migration, '_remote_bytes',
                          side_effect=lambda key: remote_blobs[key]):
            _, _, _, pending = migration.inspect(self.stage, self.converted, TEMPLATE)
        self.assertIn('albums/the-collection/retired.html', pending)
        self.assertIn('albums.json', pending)

        corrupted = 'albums.json'
        remote_blobs[corrupted] = b'PRIVATE OR UNEXPECTED BYTES'
        remote[corrupted]['Size'] = len(remote_blobs[corrupted])
        with patch.object(migration, 'list_remote', return_value=remote), \
             patch.object(migration, '_remote_bytes',
                          side_effect=lambda key: remote_blobs[key]):
            with self.assertRaisesRegex(ValueError, 'neither reviewed release'):
                migration.inspect(self.stage, self.converted, TEMPLATE)

        remote_blobs.update(new)
        remote = {key: {'Path': key, 'Size': len(value)} for key, value in remote_blobs.items()}
        remote.update({key: {'Path': key, 'Size': size} for key, size in images.items()})
        with patch.object(migration, 'list_remote', return_value=remote), \
             patch.object(migration, '_remote_bytes',
                          side_effect=lambda key: remote_blobs[key]):
            _, _, _, pending = migration.inspect(self.stage, self.converted, TEMPLATE)
        self.assertEqual(pending, [])


if __name__ == '__main__':
    unittest.main()
