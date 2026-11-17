"""Unit tests for the explicitly invoked, photo-only remaining R2 uploader."""
import subprocess
import unittest
from email.message import Message
from urllib.parse import unquote
from unittest.mock import patch

import upload_r2_remaining_photos as task


def fixture():
    keys = sorted(task.PILOT_KEYS) + [
        "full/consoles/sega/IMG_9991.jxl",
        "thumbs/consoles/sega/IMG_9991.jxl",
        "full/projects/project-yampad/animated.gif",
    ]
    plan = {
        key: {"r2_key": key, "bytes": "123",
              "mime": "image/gif" if key.endswith(".gif") else "image/jxl",
              "local_path": str(task.CONVERTED / key),
              "approved_for_publication": "NO"}
        for key in keys
    }
    remote = {
        key: {"Path": key, "Size": 123, "MimeType": plan[key]["mime"]}
        for key in task.PILOT_KEYS
    }
    return plan, remote


class PhotoOnlyUploadTests(unittest.TestCase):
    def setUp(self):
        self.plan, self.remote = fixture()
        self.headers_patch = patch.object(task, "verify_public_headers")
        self.headers_mock = self.headers_patch.start()
        self.addCleanup(self.headers_patch.stop)

    def test_exact_existing_pilot_and_remaining_selection(self):
        pending = task.audit_existing(self.plan, self.remote)
        self.assertEqual(pending, sorted(set(self.plan) - task.PILOT_KEYS))
        self.assertEqual(len(pending), 3)
        self.assertTrue(all(key not in task.PILOT_KEYS for key in pending))
        self.assertEqual(len(task.PILOT_KEYS), 20)

    def test_reject_unknown_remote_objects_even_with_correct_pilot(self):
        remote = dict(self.remote)
        remote["index.html"] = {"Path": "index.html", "Size": 100,
                                "MimeType": "text/html"}
        with self.assertRaisesRegex(ValueError, "unexpected objects"):
            task.audit_existing(self.plan, remote)

    def test_reject_tampered_existing_objects_no_overwrite(self):
        remote = dict(self.remote)
        key = next(iter(remote))
        remote[key] = dict(remote[key], Size=124)
        with self.assertRaisesRegex(ValueError, "size mismatch"):
            task.audit_existing(self.plan, remote)
        remote[key] = dict(remote[key], Size=123,
                           MimeType="application/octet-stream")
        with self.assertRaisesRegex(ValueError, "MIME mismatch"):
            task.audit_existing(self.plan, remote)

    def test_fast_inventory_can_verify_names_sizes_without_mime_head(self):
        fast_remote = {
            k: {"Path": k, "Size": 123} for k in task.PILOT_KEYS
        }
        pending = task.audit_existing(self.plan, fast_remote)
        self.assertEqual(len(pending), 3)
        with patch.object(task, "all_remote_objects",
                          return_value=fast_remote) as fetch:
            missing, listed = task.assess(self.plan, quiet=True)
        fetch.assert_called_once_with(with_mime=False)
        self.headers_mock.assert_called_once_with(self.plan, fast_remote)
        self.assertEqual(len(missing), 3)

    def test_missing_pilot_stops_before_upload(self):
        remote = dict(self.remote)
        remote.pop(next(iter(task.PILOT_KEYS)))
        with self.assertRaisesRegex(ValueError, "pilot objects are missing"):
            task.audit_existing(self.plan, remote)

    def test_rclone_command_cannot_upload_originals_or_unplanned_tree(self):
        command = task.rclone_copy_command()
        self.assertEqual(command[0:2], ["rclone", "copy"])
        self.assertIn("--ignore-existing", command)
        self.assertIn("--files-from0", command)
        self.assertIn("--s3-no-check-bucket", command)
        self.assertNotIn("sync", command)
        self.assertNotIn("--delete-excluded", command)
        self.assertNotIn("--ignore-times", command)
        self.assertNotIn("--metadata", command)
        self.assertNotIn("--dry-run", command)
        self.assertEqual(command[-2:], [str(task.CONVERTED), task.FINAL_DESTINATION])
        self.assertEqual(set(task.sampled_keys(self.plan)),
                         set(self.plan) - task.PILOT_KEYS)

    def test_read_only_preflight_stage_order_without_upload(self):
        class Tracer:
            def __init__(self):
                self.events = []
            def __enter__(self):
                self.events.append("enter")
                return self
            def __exit__(self, typ, exc, tb):
                self.events.append("exit")
            def advance(self, stage):
                self.events.append(stage)
            def finish(self):
                self.events.append("done")

        tracer = Tracer()
        with patch.object(task, "preflight_display", return_value=tracer), \
             patch.object(task, "local_plan", return_value=self.plan), \
             patch.object(task, "all_remote_objects", return_value=self.remote), \
             patch.object(task.shutil, "which", return_value="/usr/bin/rclone"), \
             patch.object(task, "run_upload_with_dashboard") as upload:
            self.assertEqual(task.main([]), 0)
        self.assertEqual(tracer.events, ["enter", 1, 2, "done", "exit"])
        upload.assert_not_called()

    @patch.object(task, "all_remote_objects")
    @patch.object(task, "local_plan")
    @patch.object(task.shutil, "which", return_value="/usr/bin/rclone")
    @patch.object(task.subprocess, "run")
    def test_default_is_preflight_only(self, run, which, local, remote):
        local.return_value = self.plan
        remote.return_value = self.remote
        self.assertEqual(task.main([]), 0)
        run.assert_not_called()
        self.assertEqual(remote.call_count, 1)

    @patch.object(task, "run_upload_with_dashboard", return_value=0)
    @patch.object(task, "all_remote_objects")
    @patch.object(task, "local_plan")
    @patch.object(task.shutil, "which", return_value="/usr/bin/rclone")
    @patch.object(task.subprocess, "run")
    def test_upload_only_the_three_missing_objects_and_check_bytes(
        self, run, which, local, remote, upload
    ):
        local.return_value = self.plan
        full = {**self.remote, **{
            key: {"Path": key, "Size": 123, "MimeType": self.plan[key]["mime"]}
            for key in set(self.plan) - set(self.remote)
        }}
        remote.side_effect = [self.remote, full]
        run.return_value = subprocess.CompletedProcess(args=[], returncode=0)
        with patch.object(task, "EXPECTED_OBJECTS", len(self.plan)), patch.object(task, "require_rich"):
            self.assertEqual(task.main(["--upload"]), 0)
        self.assertEqual(run.call_count, 1)
        self.assertEqual(upload.call_count, 1)
        command, raw_keys, byte_count, file_count, existing_count = upload.call_args.args
        self.assertEqual(command[1], "copy")
        self.assertIn("--use-json-log", command)
        self.assertIn("--stats-log-level", command)
        keys = raw_keys.rstrip(b"\0").split(b"\0")
        self.assertEqual(set(keys), {
            key.encode() for key in set(self.plan) - task.PILOT_KEYS
        })
        self.assertEqual(byte_count, 3 * 123)
        self.assertEqual(file_count, 3)
        self.assertEqual(existing_count, 20)
        self.assertEqual(run.call_args.args[0][1], "check")
        self.assertIn("--download", run.call_args.args[0])
        self.assertTrue(set(run.call_args.kwargs["input"]
                            .rstrip(b"\0").split(b"\0")).isdisjoint(
                            {k.encode() for k in task.PILOT_KEYS}))

    @patch.object(task, "run_upload_with_dashboard", return_value=0)
    @patch.object(task, "all_remote_objects")
    @patch.object(task, "local_plan")
    @patch.object(task.shutil, "which", return_value="/usr/bin/rclone")
    @patch.object(task.subprocess, "run")
    def test_interrupted_upload_resumes_only_missing_keys(
        self, run, which, local, remote, upload
    ):
        local.return_value = self.plan
        one = "full/consoles/sega/IMG_9991.jxl"
        remote.side_effect = [
            {**self.remote, one: {"Path": one, "Size": 123, "MimeType": "image/jxl"}},
            {k: {"Path": k, "Size": 123, "MimeType": v["mime"]}
             for k, v in self.plan.items()},
        ]
        run.return_value = subprocess.CompletedProcess(args=[], returncode=0)
        with patch.object(task, "EXPECTED_OBJECTS", len(self.plan)), patch.object(task, "require_rich"):
            self.assertEqual(task.main(["--upload"]), 0)
        sent = upload.call_args.args[1].rstrip(b"\0").split(b"\0")
        self.assertNotIn(one.encode(), sent)
        self.assertNotIn(next(iter(task.PILOT_KEYS)).encode(), sent)
        self.assertEqual(len(sent), 2)

    @patch.object(task, "all_remote_objects")
    @patch.object(task, "local_plan")
    @patch.object(task.shutil, "which", return_value="/usr/bin/rclone")
    @patch.object(task.subprocess, "run")
    def test_verify_incomplete_never_uploads(self, run, which, local, remote):
        local.return_value = self.plan
        remote.return_value = self.remote
        with self.assertRaisesRegex(ValueError, "INCOMPLETE"):
            task.main(["--verify"])
        run.assert_not_called()

    @patch.object(task, "all_remote_objects")
    @patch.object(task, "local_plan")
    @patch.object(task.shutil, "which", return_value="/usr/bin/rclone")
    @patch.object(task.subprocess, "run")
    def test_deep_verification_reads_all_keys_no_writes(
        self, run, which, local, remote
    ):
        local.return_value = self.plan
        remote.return_value = {
            k: {"Path": k, "Size": 123, "MimeType": v["mime"]}
            for k, v in self.plan.items()
        }
        run.return_value = subprocess.CompletedProcess(args=[], returncode=0)
        with patch.object(task, "EXPECTED_OBJECTS", len(self.plan)):
            self.assertEqual(task.main(["--deep-verify"]), 0)
        self.assertEqual(run.call_count, 1)
        self.assertEqual(run.call_args.args[0][1], "check")
        self.assertEqual(
            set(run.call_args.kwargs["input"].rstrip(b"\0").split(b"\0")),
            {key.encode() for key in self.plan},
        )

    @patch.object(task, "show_demo")
    @patch.object(task, "all_remote_objects")
    @patch.object(task, "local_plan")
    @patch.object(task.shutil, "which")
    def test_demo_is_independent_from_rclone_and_the_originals(
        self, which, local, remote, demo
    ):
        self.assertEqual(task.main(["--demo"]), 0)
        demo.assert_called_once_with()
        local.assert_not_called()
        remote.assert_not_called()
        which.assert_not_called()

    @patch.object(task, "all_remote_objects")
    @patch.object(task, "local_plan")
    @patch.object(task.shutil, "which", return_value="/usr/bin/rclone")
    @patch.object(task, "run_upload_with_dashboard", return_value=13)
    def test_real_transfer_failure_stops_without_verification(
        self, upload, which, local, remote
    ):
        local.return_value = self.plan
        remote.return_value = self.remote
        with patch.object(task, "require_rich"):
            with self.assertRaisesRegex(ValueError, "rclone status 13"):
                task.main(["--upload"])
        remote.assert_called_once()

    @patch.object(task, "validate")
    def test_local_photo_counts_change_or_changed_approval_fails(self, validate):
        validate.return_value = ([{}] * 10, [], 1000)
        with self.assertRaisesRegex(ValueError, "counts/bytes changed"):
            task.local_plan()


class PublicHeaderTests(unittest.TestCase):
    def test_distributed_samples_include_all_original_20(self):
        keys = {key: {} for key in task.PILOT_KEYS}
        for i in range(100):
            keys[f"full/other/IMG_{i:04d}.jxl"] = {}
        chosen = task.header_sample_keys(keys)
        self.assertEqual(len(chosen), 60)
        self.assertTrue(task.PILOT_KEYS.issubset(chosen))

    def test_exact_public_content_type_and_size_checked(self):
        plan, remote = fixture()
        class Response:
            status = 200
            def __init__(self, length, mime):
                self.headers = Message()
                self.headers["Content-Type"] = mime
                self.headers["Content-Length"] = str(length)
            def __enter__(self):
                return self
            def __exit__(self, *args):
                return False

        def good(request, timeout):
            self.assertEqual(request.get_method(), "HEAD")
            key = unquote(request.full_url.split("photos.mcretro.net/", 1)[1])
            self.assertIn(key, task.PILOT_KEYS)
            return Response(123, "image/jxl")

        with patch.object(task, "urlopen", side_effect=good) as get:
            task.verify_public_headers(plan, remote)
        self.assertEqual(get.call_count, 20)

    def test_wrong_public_mime_fails_closed(self):
        plan, remote = fixture()
        class Response:
            status = 200
            headers = Message()
            headers["Content-Type"] = "application/octet-stream"
            headers["Content-Length"] = "123"
            def __enter__(self):
                return self
            def __exit__(self, *args):
                return False

        with patch.object(task, "urlopen", return_value=Response()):
            with self.assertRaisesRegex(ValueError, "Content-Type"):
                task.verify_public_headers(plan, remote)


if __name__ == "__main__":
    unittest.main()
