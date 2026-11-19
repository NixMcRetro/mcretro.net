import csv
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

from validate_r2_upload import (
    FINAL_DESTINATION, dry_run_command, perform_rclone_dry_run, valid_key, validate,
)


class FinalR2PreflightTests(unittest.TestCase):
    def setUp(self):
        self.tmp = TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        root = Path(self.tmp.name)
        self.converted = root / 'converted'
        self.stage = root / 'stage'
        (self.converted / 'full').mkdir(parents=True)
        (self.converted / 'thumbs').mkdir()
        (self.stage / 'reports').mkdir(parents=True)
        (self.stage / 'photo-gallery').mkdir()

        self.photos = [
            {'album': 'a', 'source_path': 'sega/picture.jpg', 'filename': 'picture.jpg',
             'path': 'full/sega/PICTURE.jxl', 'thumbnail': 'thumbs/sega/PICTURE.jxl'},
            {'album': 'a', 'source_path': 'other/animated.gif', 'filename': 'animated.gif',
             'path': 'full/other/animated.gif', 'thumbnail': 'full/other/animated.gif'},
        ]
        self.rows = []
        for key, kind, mime, payload in (
            ('full/sega/PICTURE.jxl', 'gallery', 'image/jxl', b'\xff\x0a' + b'A' * 40),
            ('thumbs/sega/PICTURE.jxl', 'thumbnail', 'image/jxl', b'\xff\x0a' + b'B' * 20),
            ('full/other/animated.gif', 'animation', 'image/gif', b'GIF89a' + b'0' * 40),
        ):
            local_key = key.replace('PICTURE.jxl', 'picture.jpg.jxl')
            path = self.converted / local_key
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(payload)
            self.rows.append({'r2_key': key, 'local_path': str(path), 'kind': kind,
                              'bytes': str(len(payload)), 'mime': mime,
                              'approved_for_publication': 'NO'})
        self.save()

    def save(self):
        (self.stage / 'photo-gallery/albums.generated.json').write_text(
            json.dumps({'schema_version': 1, 'albums': [{'id': 'a'}],
                        'photos': self.photos}), encoding='utf-8')
        (self.stage / 'reports/audit-summary.json').write_text(
            json.dumps({'photos': {'converted_pairs': len(self.photos), 'missing_pairs': 0}}),
            encoding='utf-8')
        with (self.stage / 'reports/photos-upload-plan.csv').open(
            'w', newline='', encoding='utf-8'
        ) as handle:
            writer = csv.DictWriter(handle, fieldnames=[
                'r2_key', 'local_path', 'kind', 'bytes', 'mime', 'approved_for_publication'
            ])
            writer.writeheader()
            writer.writerows(self.rows)

    def test_valid_collection_gif_has_no_extra_thumbnail(self):
        photos, rows, total = validate(self.stage, self.converted, deep_hash=True)
        self.assertEqual(len(photos), 2)
        self.assertEqual(len(rows), 3)
        self.assertEqual(total, sum(int(r['bytes']) for r in self.rows))

    def test_duplicate_object_key_blocked(self):
        self.rows.append(dict(self.rows[0]))
        self.save()
        with self.assertRaisesRegex(ValueError, 'Duplicate object'):
            validate(self.stage, self.converted)

    def test_missing_object_in_plan_blocked(self):
        self.rows.pop(0)
        self.save()
        with self.assertRaisesRegex(ValueError, 'absent from upload plan'):
            validate(self.stage, self.converted)

    def test_unreferenced_object_blocked(self):
        self.photos.pop()
        self.save()
        with self.assertRaisesRegex(ValueError, 'Unreferenced'):
            validate(self.stage, self.converted)

    def test_size_mismatch_blocked(self):
        self.rows[0]['bytes'] = '999'
        self.save()
        with self.assertRaisesRegex(ValueError, 'Size differs'):
            validate(self.stage, self.converted)

    def test_invalid_signature_blocked(self):
        Path(self.rows[0]['local_path']).write_bytes(b'Z' * 42)
        self.save()
        with self.assertRaisesRegex(ValueError, 'signature'):
            validate(self.stage, self.converted)

    def test_wrong_mime_blocked(self):
        self.rows[0]['mime'] = 'application/octet-stream'
        self.save()
        with self.assertRaisesRegex(ValueError, 'media type'):
            validate(self.stage, self.converted)

    def test_wrong_local_source_path_blocked(self):
        self.rows[0]['local_path'] = str(self.converted / 'full/other/animated.gif')
        self.save()
        with self.assertRaisesRegex(ValueError, 'not an expected converted path'):
            validate(self.stage, self.converted)

    def test_publication_approval_unexpected_blocked(self):
        self.rows[0]['approved_for_publication'] = 'YES'
        self.save()
        with self.assertRaisesRegex(ValueError, 'approval'):
            validate(self.stage, self.converted)

    def test_missing_pairs_in_audit_blocked(self):
        (self.stage / 'reports/audit-summary.json').write_text(
            json.dumps({'photos': {'converted_pairs': 2, 'missing_pairs': 1}}))
        with self.assertRaisesRegex(ValueError, 'missing photo pairs'):
            validate(self.stage, self.converted)

    def test_mismatched_album_blocked(self):
        self.photos[0]['album'] = 'unknown'
        self.save()
        with self.assertRaisesRegex(ValueError, 'invalid album'):
            validate(self.stage, self.converted)

    def test_symlinked_image_blocked(self):
        img = Path(self.rows[0]['local_path'])
        img.unlink()
        img.symlink_to(Path(self.rows[1]['local_path']))
        self.save()
        with self.assertRaisesRegex(ValueError, 'symlinked image'):
            validate(self.stage, self.converted)

    def test_unsafe_paths_blocked(self):
        for name in ('full/../escape.jxl', 'thumbs/bad#name.jxl',
                     'full/a\nb.jxl', '/full/test.jxl', 'full/a\\b.jxl'):
            with self.subTest(name=name):
                self.assertFalse(valid_key(name))

    @patch('validate_r2_upload.subprocess.run')
    @patch('validate_r2_upload.shutil.which', return_value='/usr/bin/rclone')
    def test_rclone_is_always_dry_run_and_final_destination(self, _which, run):
        run.return_value.returncode = 0
        self.assertEqual(
            perform_rclone_dry_run([self.rows[0]]), 0)
        command = run.call_args.args[0]
        self.assertEqual(command[0:2], ['rclone', 'copyto'])
        self.assertIn('--dry-run', command)
        self.assertIn('--s3-no-check-bucket', command)
        self.assertEqual(command[-1], FINAL_DESTINATION + '/' + self.rows[0]['r2_key'])
        self.assertEqual(command[-2], self.rows[0]['local_path'])
        self.assertNotIn('input', run.call_args.kwargs)

    @patch('validate_r2_upload.subprocess.run')
    @patch('validate_r2_upload.shutil.which', return_value='/usr/bin/rclone')
    def test_renamed_local_files_use_single_allowlisted_bulk_dry_run(self, _which, run):
        run.return_value.returncode = 0
        for row in self.rows:
            old = Path(row['local_path'])
            dest = self.converted / row['r2_key']
            if dest != old:
                old.rename(dest)
                row['local_path'] = str(dest)
        self.save()
        validate(self.stage, self.converted)
        self.assertEqual(perform_rclone_dry_run(self.rows, converted=self.converted), 0)
        self.assertEqual(run.call_count, 1)
        args = run.call_args.args[0]
        self.assertEqual(args[:2], ['rclone', 'copy'])
        self.assertIn('--dry-run', args)
        self.assertIn('--files-from0', args)
        self.assertEqual(args[-1], FINAL_DESTINATION)
        self.assertEqual(args[-2], str(self.converted))
        self.assertIn(b'full/sega/PICTURE.jxl\\0'.replace(b'\\0', b'\x00'),
                      run.call_args.kwargs['input'])

    def test_direct_command_targets_only_final_bucket_for_dry_run(self):
        command = dry_run_command(Path(self.rows[0]['local_path']), self.rows[0]['r2_key'])
        self.assertIn('--dry-run', command)
        self.assertEqual(command[-1], 'r2:mcretro-photos/full/sega/PICTURE.jxl')


if __name__ == '__main__':
    unittest.main()
