import json
from pathlib import Path
import subprocess
import unittest
from unittest.mock import patch

import upload_r2_test20 as uploader


def fixture_rows():
    return [
        {
            "r2_key": key,
            "local_path": str(uploader.CONVERTED / key),
            "bytes": "123",
            "mime": "image/jxl",
            "kind": "gallery" if key.startswith("full/") else "thumbnail",
            "approved_for_publication": "NO",
        }
        for key in sorted(uploader.KEYS)
    ]


def rclone_remote_metadata(rows):
    return [
        {
            "Path": r["r2_key"],
            "Name": Path(r["r2_key"]).name,
            "Size": int(r["bytes"]),
            "MimeType": "image/jxl",
            "IsDir": False,
        }
        for r in rows
    ]


class ExactTestUploadTests(unittest.TestCase):
    def setUp(self):
        self.rows = fixture_rows()

    def test_exact_keys_are_the_user_approved_sample(self):
        self.assertEqual(len(uploader.FULL), 10)
        self.assertEqual(len(uploader.KEYS), 20)
        self.assertTrue(all(k.endswith(".jxl") for k in uploader.KEYS))
        self.assertEqual(
            len([k for k in uploader.KEYS if k.startswith("thumbs/")]), 10)
        self.assertIn(
            "full/accessories/eeprom-programmers/minipro-tl866cs/IMG_0835.jxl",
            uploader.KEYS)
        self.assertIn(
            "thumbs/accessories/hp-l1706-17-inch-lcd-colour-monitor-px849a/"
            "serial-cnk7040y04/IMG_0460.jxl", uploader.KEYS)

    @patch.object(uploader, "validate")
    def test_local_selection_requires_all_gallery_counts_and_final_names(self, validate):
        all_rows = self.rows + [{"r2_key": f"other-{i}"} for i in range(16803)]
        validate.return_value = ([{}] * 8412, all_rows, 0)
        self.assertEqual(uploader.selected_rows(), self.rows)
        bad = [dict(r) for r in all_rows]
        bad[0]["local_path"] = "/wrong/IMG_0835.jxl"
        validate.return_value = ([{}] * 8412, bad, 0)
        with self.assertRaisesRegex(ValueError, "local filename"):
            uploader.selected_rows()

    @patch.object(uploader, "selected_rows")
    @patch.object(uploader.shutil, "which", return_value="/usr/bin/rclone")
    @patch.object(uploader.subprocess, "run")
    def test_default_preflight_only_lists_bucket(self, run, which, selected):
        selected.return_value = self.rows
        run.return_value = subprocess.CompletedProcess(
            args=["rclone", "lsjson"], returncode=0, stdout="[]", stderr="")
        self.assertEqual(uploader.main([]), 0)
        self.assertEqual(run.call_count, 1)
        self.assertEqual(run.call_args.args[0][0:2], ["rclone", "lsjson"])
        self.assertNotIn("--upload", run.call_args.args[0])

    @patch.object(uploader, "selected_rows")
    @patch.object(uploader.shutil, "which", return_value="/usr/bin/rclone")
    @patch.object(uploader.subprocess, "run")
    def test_nonempty_bucket_aborts_without_upload(self, run, which, selected):
        selected.return_value = self.rows
        run.return_value = subprocess.CompletedProcess(
            args=["rclone", "lsjson"], returncode=0,
            stdout=json.dumps([{"Path": "Cozy Retro-Tech Hammock with Parrots.png"}]),
            stderr="")
        with self.assertRaisesRegex(ValueError, "no longer empty"):
            uploader.main(["--upload"])
        self.assertEqual(run.call_count, 1)

    @patch.object(uploader, "selected_rows")
    @patch.object(uploader.shutil, "which", return_value="/usr/bin/rclone")
    @patch.object(uploader.subprocess, "run")
    def test_explicit_upload_exact_20_non_overwrite_and_byte_check(
        self, run, which, selected
    ):
        selected.return_value = self.rows
        run.side_effect = [
            subprocess.CompletedProcess(args=[], returncode=0, stdout="[]", stderr=""),
            subprocess.CompletedProcess(args=[], returncode=0),
            subprocess.CompletedProcess(
                args=[], returncode=0, stdout=json.dumps(
                    rclone_remote_metadata(self.rows)), stderr=""),
            subprocess.CompletedProcess(args=[], returncode=0),
        ]
        self.assertEqual(uploader.main(["--upload"]), 0)
        self.assertEqual(run.call_count, 4)
        commands = [call.args[0] for call in run.call_args_list]
        self.assertEqual([command[1] for command in commands],
                         ["lsjson", "copy", "lsjson", "check"])
        copy_command = commands[1]
        self.assertIn("--ignore-existing", copy_command)
        self.assertIn("--files-from0", copy_command)
        self.assertIn("--s3-no-check-bucket", copy_command)
        self.assertNotIn("--dry-run", copy_command)
        self.assertNotIn("sync", copy_command)
        self.assertNotIn("--delete-excluded", copy_command)
        self.assertEqual(copy_command[-2:], [
            str(uploader.CONVERTED), "r2:mcretro-photos"])
        self.assertEqual(
            set(run.call_args_list[1].kwargs["input"].rstrip(b"\x00").split(b"\x00")),
            {key.encode("utf-8") for key in uploader.KEYS})
        self.assertIn("--download", commands[3])
        self.assertIn("--one-way", commands[3])
        self.assertEqual(
            run.call_args_list[3].kwargs["input"],
            run.call_args_list[1].kwargs["input"])

    @patch.object(uploader, "selected_rows")
    @patch.object(uploader.shutil, "which", return_value="/usr/bin/rclone")
    @patch.object(uploader.subprocess, "run")
    def test_verify_rejects_bad_content_type_without_writes(
        self, run, which, selected
    ):
        selected.return_value = self.rows
        objects = rclone_remote_metadata(self.rows)
        objects[0]["MimeType"] = "application/octet-stream"
        run.return_value = subprocess.CompletedProcess(
            args=[], returncode=0, stdout=json.dumps(objects), stderr="")
        with self.assertRaisesRegex(ValueError, "Content-Type"):
            uploader.main(["--verify"])
        self.assertEqual(run.call_count, 1)

    @patch.object(uploader, "selected_rows")
    @patch.object(uploader.shutil, "which", return_value="/usr/bin/rclone")
    @patch.object(uploader.subprocess, "run")
    def test_verify_requires_all_exact_keys_and_checks_no_upload(
        self, run, which, selected
    ):
        selected.return_value = self.rows
        remote = rclone_remote_metadata(self.rows)[:-1]
        run.return_value = subprocess.CompletedProcess(
            args=[], returncode=0, stdout=json.dumps(remote), stderr="")
        with self.assertRaisesRegex(ValueError, "object set differs"):
            uploader.main(["--verify"])
        self.assertEqual(run.call_count, 1)


if __name__ == "__main__":
    unittest.main()
