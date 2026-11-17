import csv
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from prepare_r2_photo_upload_tree import destination_for, copy_photographs, verify_tree
from validate_r2_upload import validate


class LocalUploadReadyTests(unittest.TestCase):
    def setUp(self):
        temp = TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name)
        self.stage = self.root / 'stage'
        self.converted = self.root / 'converted'
        (self.stage / 'photo-gallery').mkdir(parents=True)
        (self.stage / 'reports').mkdir(parents=True)
        (self.converted / 'full/album').mkdir(parents=True)
        (self.converted / 'thumbs/album').mkdir(parents=True)
        files = [
            ('full/album/IMG_0835.jxl', 'full/album/img_0835.jpg.jxl', 'gallery'),
            ('thumbs/album/IMG_0835.jxl', 'thumbs/album/img_0835.jpg.jxl', 'thumbnail'),
            ('full/album/ANOTHER.jxl', 'full/album/another.png.jxl', 'gallery'),
            ('thumbs/album/ANOTHER.jxl', 'thumbs/album/another.png.jxl', 'thumbnail'),
        ]
        self.rows = []
        for key, local, kind in files:
            content = b'\xff\x0a' + bytes([len(self.rows) + 60]) * 50
            source = self.converted / local
            source.write_bytes(content)
            self.rows.append({'r2_key': key, 'local_path': str(source), 'bytes': str(len(content)),
                              'mime': 'image/jxl', 'kind': kind,
                              'approved_for_publication': 'NO'})
        photos = [
            {'album': 'album', 'path': 'full/album/IMG_0835.jxl',
             'thumbnail': 'thumbs/album/IMG_0835.jxl',
             'source_path': 'album/img_0835.jpg', 'filename': 'img_0835.jpg'},
            {'album': 'album', 'path': 'full/album/ANOTHER.jxl',
             'thumbnail': 'thumbs/album/ANOTHER.jxl',
             'source_path': 'album/another.png', 'filename': 'another.png'},
        ]
        (self.stage / 'photo-gallery/albums.generated.json').write_text(json.dumps(
            {'schema_version': 1, 'albums': [{'id': 'album'}], 'photos': photos}),
            encoding='utf-8')
        (self.stage / 'reports/audit-summary.json').write_text(json.dumps(
            {'photos': {'converted_pairs': 2, 'missing_pairs': 0}}), encoding='utf-8')
        with (self.stage / 'reports/photos-upload-plan.csv').open('w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=list(self.rows[0]))
            writer.writeheader()
            writer.writerows(self.rows)

    def test_preflight_and_local_copy_never_change_converted_sources(self):
        _, rows, _ = validate(self.stage, self.converted)
        before = {p['r2_key']: Path(p['local_path']).read_bytes() for p in rows}
        output = copy_photographs(self.stage, self.converted, rows)
        self.assertEqual(output, destination_for(self.stage))
        verify_tree(output, rows, hash_contents=True)
        self.assertTrue((output / 'full/album/IMG_0835.jxl').is_file())
        self.assertTrue((output / 'thumbs/album/ANOTHER.jxl').is_file())
        self.assertFalse((output / 'full/album/img_0835.jpg.jxl').exists())
        self.assertEqual(before, {p['r2_key']: Path(p['local_path']).read_bytes() for p in rows})

    def test_refuses_to_overwrite_existing_upload_ready_tree(self):
        _, rows, _ = validate(self.stage, self.converted)
        copy_photographs(self.stage, self.converted, rows)
        with self.assertRaisesRegex(ValueError, 'already exists'):
            copy_photographs(self.stage, self.converted, rows)

    def test_sha256_finds_same_size_mutations_in_export(self):
        _, rows, _ = validate(self.stage, self.converted)
        output = copy_photographs(self.stage, self.converted, rows)
        edited = output / 'full/album/IMG_0835.jxl'
        edited.write_bytes(b'\xff\x0a' + b'X' * 50)
        verify_tree(output, rows, hash_contents=False)
        with self.assertRaisesRegex(ValueError, 'content differs'):
            verify_tree(output, rows, hash_contents=True)

    def test_symlink_in_export_is_rejected(self):
        _, rows, _ = validate(self.stage, self.converted)
        output = copy_photographs(self.stage, self.converted, rows)
        target = output / 'thumbs/album/IMG_0835.jxl'
        target.unlink()
        target.symlink_to(self.converted / 'thumbs/album/img_0835.jpg.jxl')
        with self.assertRaisesRegex(ValueError, 'symlinked'):
            verify_tree(output, rows)

    def test_extra_unplanned_export_file_is_rejected(self):
        _, rows, _ = validate(self.stage, self.converted)
        output = copy_photographs(self.stage, self.converted, rows)
        (output / 'unplanned.txt').write_text('x')
        with self.assertRaisesRegex(ValueError, 'Unexpected file'):
            verify_tree(output, rows)


if __name__ == '__main__':
    unittest.main()
