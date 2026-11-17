import csv
import json
from pathlib import Path
import tempfile
import unittest
from build_mcretro_r2_catalogues import build_photos, build_files_review, validate_dirs


class ArchiveBuilderTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.original = self.root / 'original'
        self.converted = self.root / 'converted'
        self.files = self.root / 'files'
        self.stage = self.root / 'stage'
        for p in (self.original, self.converted, self.files):
            p.mkdir()

    def photo(self, rel):
        src = self.original / rel
        src.parent.mkdir(parents=True, exist_ok=True)
        src.write_bytes(b'fake-original-jpeg')
        for k in ('full', 'thumbs'):
            out = self.converted / k / (rel + '.jxl')
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_bytes(b'\xff\x0a' + b'0' * 20)

    def test_album_build_and_collision_safe_keys(self):
        self.photo('sega/saturn/IMG_0001.jpg')
        self.photo('sega/saturn/IMG_0001.png')
        self.photo('computers/mac/image.jpg')
        (self.original / 'sega' / 'saturn' / 'video.mov').write_bytes(b'not a photo')
        (self.original / 'symlink.jpg').symlink_to(self.original/'computers/mac/image.jpg')
        (self.files / 'readme.txt').write_text('hello')
        result = build_photos(self.original, self.converted, self.stage)
        self.assertEqual(result['converted_pairs'], 3)
        self.assertEqual(result['skipped'], 2)
        self.assertEqual(result['albums'], 2)
        data = json.loads((self.stage/'photo-gallery/albums.generated.json').read_text())
        self.assertEqual(len(data['photos']), 3)
        self.assertTrue(all(p['caption'] == '' and p['caption_approved'] is False
                            and p['alt'] == '' and p['alt_approved'] is False
                            and p['date_taken'] is None and p['date_taken_approved'] is False
                            for p in data['photos']))
        self.assertEqual({p['filename'] for p in data['photos']},
                         {'IMG_0001.jpg', 'IMG_0001.png', 'image.jpg'})
        folder_map = {f['path']: f for f in data['folders']}
        self.assertEqual(folder_map['']['photo_count'], 3)
        self.assertEqual(folder_map['sega']['photo_count'], 2)
        self.assertEqual(folder_map['sega/saturn']['direct_photo_count'], 2)
        self.assertEqual(folder_map['sega/saturn']['parent'], 'sega')
        self.assertEqual(folder_map['computers/mac']['photo_count'], 1)
        self.assertEqual(folder_map['computers/mac']['parent'], 'computers')
        self.assertTrue(all('path' in a for a in data['albums']))
        keys = [p['path'] for p in data['photos']]
        self.assertEqual(len(keys), len(set(keys)))
        self.assertIn('full/sega/saturn/IMG_0001.jpg.jxl', keys)
        self.assertIn('full/sega/saturn/IMG_0001.png.jxl', keys)
        with (self.stage/'reports/photos-upload-plan.csv').open() as handle:
            rows = list(csv.DictReader(handle))
        self.assertEqual(len(rows), 6)
        self.assertTrue(all(r['approved_for_publication'] == 'NO' for r in rows))
        files = build_files_review(self.files, self.stage)
        self.assertEqual(files['candidate_files'], 1)
        with (self.stage/'reports/file-server-owner-review.csv').open() as handle:
            review = list(csv.DictReader(handle))
        self.assertEqual(review[0]['publish_approval'], 'NOT_REVIEWED')
        draft = json.loads((self.stage/'file-server/catalogue.generated.json').read_text())
        self.assertTrue(draft['owner_review_required'])
        self.assertEqual(draft['files'][0]['review_status'], 'NOT_REVIEWED')

    def test_nested_folder_hierarchy_including_parent_with_photos(self):
        self.photo('consoles/sega/cover.jpg')
        self.photo('consoles/sega/saturn/unit.jpg')
        self.photo('consoles/sega/saturn/model-1/front.jpg')
        result = build_photos(self.original, self.converted, self.stage)
        self.assertEqual(result['converted_pairs'], 3)
        data = json.loads((self.stage/'photo-gallery/albums.generated.json').read_text())
        folders = {entry['path']: entry for entry in data['folders']}
        self.assertEqual(folders['']['photo_count'], 3)
        self.assertEqual(folders['consoles']['photo_count'], 3)
        self.assertEqual(folders['consoles/sega']['photo_count'], 3)
        self.assertEqual(folders['consoles/sega']['direct_photo_count'], 1)
        self.assertEqual(folders['consoles/sega/saturn']['photo_count'], 2)
        self.assertEqual(folders['consoles/sega/saturn']['direct_photo_count'], 1)
        self.assertEqual(folders['consoles/sega/saturn/model-1']['photo_count'], 1)
        self.assertEqual(folders['consoles/sega/saturn/model-1']['direct_photo_count'], 1)

    def test_optional_bmp_and_gif_archive_items(self):
        self.photo('consoles/nintendo/capture/image0000.bmp')
        gif = self.original/'projects/project-yampad/animated.gif'
        gif.parent.mkdir(parents=True, exist_ok=True)
        gif.write_bytes(b'GIF89a' + b'0' * 30)
        copied = self.converted/'full/projects/project-yampad/animated.gif'
        copied.parent.mkdir(parents=True, exist_ok=True)
        copied.write_bytes(gif.read_bytes())
        report = build_photos(self.original, self.converted, self.stage)
        self.assertEqual(report['converted_pairs'], 2)
        self.assertEqual(report['missing_pairs'], 0)
        data = json.loads((self.stage/'photo-gallery/albums.generated.json').read_text())
        self.assertEqual(len(data['photos']), 2)
        animated = next(item for item in data['photos'] if item['path'].endswith('.gif'))
        self.assertEqual(animated['path'], animated['thumbnail'])
        with (self.stage/'reports/photos-upload-plan.csv').open() as handle:
            uploads = list(csv.DictReader(handle))
        self.assertEqual(len(uploads), 3)
        self.assertEqual([r['mime'] for r in uploads].count('image/gif'), 1)
        self.assertTrue(all(item['approved_for_publication'] == 'NO' for item in uploads))

    def test_missing_output_flagged(self):
        (self.original/'A.JPG').write_bytes(b'jpeg')
        report = build_photos(self.original, self.converted, self.stage)
        self.assertEqual(report['missing_pairs'], 1)
        self.assertEqual(report['converted_pairs'], 0)

    def test_unsafe_pathnames_reported_for_owner_review(self):
        (self.original/'bad#name.jpg').write_bytes(b'jpeg')
        (self.files/'unsafe?name.zip').write_bytes(b'zip')
        result = build_photos(self.original, self.converted, self.stage)
        self.assertEqual(result['skipped'], 1)
        self.assertEqual(result['missing_pairs'], 0)
        file_result = build_files_review(self.files, self.stage)
        self.assertEqual(file_result['excluded'], 1)

    def test_no_nested_staging(self):
        with self.assertRaises(ValueError):
            validate_dirs(self.original, self.converted, self.files, self.original/'inside')


if __name__ == '__main__':
    unittest.main()
