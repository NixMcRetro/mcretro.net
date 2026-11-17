import csv
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from rename_optimised_jxl_in_place import prepare, run
from validate_r2_upload import validate


class InPlaceConvertedRenameTests(unittest.TestCase):
    def setUp(self):
        temp = TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name)
        self.converted = self.root / 'McRetro-PhotoGallery-Optimised-v2'
        self.stage = self.root / 'stage'
        (self.converted / 'full/saturn').mkdir(parents=True)
        (self.converted / 'thumbs/saturn').mkdir(parents=True)
        (self.stage / 'reports').mkdir(parents=True)
        (self.stage / 'photo-gallery').mkdir(parents=True)
        self.originals = self.root / '26GB-originals-leave-alone'
        self.originals.mkdir()
        self.original_marker = self.originals / 'DO-NOT-TOUCH.txt'
        self.original_marker.write_bytes(b'unmodified originals')
        self.photos = [
            {'album': 'a', 'source_path': 'saturn/img_0835.jpg', 'filename': 'img_0835.jpg',
             'path': 'full/saturn/IMG_0835.jxl', 'thumbnail': 'thumbs/saturn/IMG_0835.jxl'},
            {'album': 'a', 'source_path': 'saturn/animation.gif', 'filename': 'animation.gif',
             'path': 'full/saturn/animation.gif', 'thumbnail': 'full/saturn/animation.gif'},
        ]
        self.rows = []
        for key, old, kind, mime, payload in [
            ('full/saturn/IMG_0835.jxl', 'full/saturn/img_0835.jpg.jxl',
             'gallery', 'image/jxl', b'\xff\x0a' + b'a' * 30),
            ('thumbs/saturn/IMG_0835.jxl', 'thumbs/saturn/img_0835.jpg.jxl',
             'thumbnail', 'image/jxl', b'\xff\x0a' + b'b' * 30),
            ('full/saturn/animation.gif', 'full/saturn/animation.gif',
             'animation', 'image/gif', b'GIF89a' + b'0' * 30),
        ]:
            file = self.converted / old
            file.parent.mkdir(parents=True, exist_ok=True)
            file.write_bytes(payload)
            self.rows.append({'r2_key': key, 'local_path': str(file),
                              'kind': kind, 'bytes': str(len(payload)),
                              'mime': mime, 'approved_for_publication': 'NO'})
        self.save()
        self.before_bytes = {row['r2_key']: Path(row['local_path']).read_bytes()
                             for row in self.rows}

    def save(self):
        (self.stage / 'photo-gallery/albums.generated.json').write_text(json.dumps({
            'schema_version': 1, 'albums': [{'id': 'a'}], 'photos': self.photos
        }), encoding='utf-8')
        (self.stage / 'reports/audit-summary.json').write_text(json.dumps({
            'photos': {'converted_pairs': len(self.photos), 'missing_pairs': 0}
        }), encoding='utf-8')
        with (self.stage / 'reports/photos-upload-plan.csv').open('w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=list(self.rows[0]))
            writer.writeheader()
            writer.writerows(self.rows)

    def test_preview_does_not_modify_local_files(self):
        self.assertEqual(run(self.stage, self.converted, 'preview'), 0)
        self.assertTrue((self.converted / 'full/saturn/img_0835.jpg.jxl').is_file())
        self.assertFalse((self.converted / 'full/saturn/IMG_0835.jxl').exists())
        self.assertEqual(self.original_marker.read_bytes(), b'unmodified originals')

    def test_rename_in_place_and_repair_staging_csv(self):
        self.assertEqual(run(self.stage, self.converted, 'apply'), 0)
        self.assertEqual(run(self.stage, self.converted, 'verify'), 0)
        for row in self.rows:
            final = self.converted / row['r2_key']
            self.assertEqual(final.read_bytes(), self.before_bytes[row['r2_key']])
        self.assertFalse((self.converted / 'full/saturn/img_0835.jpg.jxl').exists())
        self.assertFalse((self.converted / 'thumbs/saturn/img_0835.jpg.jxl').exists())
        self.assertEqual(self.original_marker.read_bytes(), b'unmodified originals')
        with (self.stage / 'reports/photos-upload-plan.csv').open() as stream:
            updated = list(csv.DictReader(stream))
        self.assertEqual([r['local_path'] for r in updated],
                         [str(self.converted / r['r2_key']) for r in updated])
        self.assertTrue(all(r['approved_for_publication'] == 'NO' for r in updated))
        validate(self.stage, self.converted)
        self.assertEqual(run(self.stage, self.converted, 'apply'), 0)

    def test_can_resume_after_interruption_before_csv_update(self):
        # Rename only one file, leaving the original source path in the CSV.
        self.assertEqual(validate(self.stage, self.converted)[1][0]['kind'], 'gallery')
        legacy = self.converted / self.rows[0]['r2_key'].replace('IMG_0835.jxl', 'img_0835.jpg.jxl')
        final = self.converted / self.rows[0]['r2_key']
        legacy.rename(final)
        with self.assertRaises(ValueError):
            validate(self.stage, self.converted)
        self.assertEqual(run(self.stage, self.converted, 'apply'), 0)
        self.assertEqual(run(self.stage, self.converted, 'verify'), 0)

    def test_refuse_existing_destination_and_keep_source(self):
        target = self.converted / 'full/saturn/IMG_0835.jxl'
        target.write_bytes(b'\xff\x0a' + b'UNRELATED' * 5)
        with self.assertRaisesRegex(ValueError, 'Both legacy and final'):
            run(self.stage, self.converted, 'apply')
        self.assertTrue((self.converted / 'full/saturn/img_0835.jpg.jxl').is_file())
        self.assertEqual(self.original_marker.read_bytes(), b'unmodified originals')


if __name__ == '__main__':
    unittest.main()
