import json
from pathlib import Path
import tempfile
import unittest

from audit_photo_exif import build_report, metadata_value, normalised_stem, safe_text


class ExifAuditTests(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        self.root = Path(tmp.name)
        self.folder = self.root / 'the-collection' / 'retired'
        self.folder.mkdir(parents=True)
        for name in ('HNTN7023.JPG', 'IMG_0005.JPG', 'other.jpeg'):
            (self.folder / name).write_bytes(b'image')

    def test_screen_example_photos_and_metadata(self):
        records = [
            {'SourceFile': str(self.folder / 'HNTN7023.JPG'),
             'EXIF:DateTimeOriginal': '2012:06:30 15:21:03',
             'EXIF:Make': 'Canon', 'EXIF:Model': 'Canon EOS 600D',
             'EXIF:GPSLatitude': 1.23456, 'EXIF:GPSLongitude': 2.34567},
            {'SourceFile': str(self.folder / 'IMG_0005.JPG'),
             'EXIF:DateTimeOriginal': '2012:06:30 15:22:17',
             'XMP:Description': 'My games room'},
            {'SourceFile': str(self.folder / 'other.jpeg')},
        ]
        rows, summary, targets = build_report(records, self.root)
        self.assertEqual(summary['photos_scanned'], 3)
        self.assertEqual(summary['photos_with_capture_date'], 2)
        self.assertEqual(summary['photos_with_camera_model'], 1)
        self.assertEqual(summary['photos_with_embedded_caption_or_title'], 1)
        self.assertEqual(summary['photos_with_gps_metadata'], 1)
        self.assertEqual(summary['example_filenames_found'], 2)
        self.assertEqual(len(targets), 2)
        self.assertEqual(rows[0]['gps_metadata_present'], 'YES')
        self.assertNotIn('1.23456', json.dumps(rows))
        self.assertNotIn('2.34567', json.dumps(rows))
        self.assertEqual(rows[1]['embedded_caption'], 'My games room')
        self.assertTrue(all(row['owner_title_approved'] == 'NO' for row in rows))
        self.assertEqual(rows[2]['metadata_usefulness'], 'no useful descriptive metadata')

    def test_spreadsheet_formula_escapes_and_filename_normalisation(self):
        self.assertEqual(normalised_stem('IMG_0005.JPG'), 'img 0005')
        self.assertEqual(normalised_stem('HNTN7023.jpg'), 'hntn7023')
        self.assertEqual(safe_text('=IMPORTXML("private")'), '\'=IMPORTXML("private")')
        self.assertEqual(safe_text('Example\ncaption'), 'Example caption')

    def test_source_outside_original_is_rejected(self):
        records = [{'SourceFile': '/outside/sensitive.jpg', 'EXIF:Model': 'Private'}]
        rows, summary, targets = build_report(records, self.root)
        self.assertEqual(rows, [])
        self.assertEqual(targets, [])
        self.assertEqual(summary['invalid_or_unsafe_records'], 1)

    def test_exif_prefix_tags_are_supported(self):
        self.assertEqual(metadata_value({'XMP:DateTimeOriginal': '2013:01:02 12:34:56'},
                                        'DateTimeOriginal'), '2013:01:02 12:34:56')


if __name__ == '__main__':
    unittest.main()
