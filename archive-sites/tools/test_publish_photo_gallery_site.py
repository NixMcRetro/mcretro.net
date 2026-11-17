"""Safety tests for the owner-authorised McRetro Photo Gallery site publisher.

All fixtures are synthetic and local. Never contacts R2 or touches user
photos, originals, cloud bucket, real gallery metadata, or private files.
"""
import csv
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest
from unittest.mock import patch

import publish_photo_gallery_site as pub
from build_mcretro_r2_catalogues import build_photos
from preview_mcretro_gallery import FONT_RELATIVE_PATHS
from render_gallery_pages import render_pages

TEMPLATE = Path(__file__).resolve().parents[1] / "photo-gallery/index.html"


class GalleryWebsitePublishTests(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        root = Path(tmp.name)
        self.original = root / "synthetic-originals"
        self.converted = root / "synthetic-optimised"
        self.stage = root / "staging"
        self.original.mkdir()
        self.converted.mkdir()
        for rel in ("computers/apple/IMG_0001.jpg",
                    "accessories/eeprom/IMG_0002.png"):
            source = self.original / rel
            source.parent.mkdir(parents=True, exist_ok=True)
            source.write_bytes(b"SYNTHETIC SOURCE FIXTURE ONLY")
            for prefix in ("full", "thumbs"):
                converted = self.converted / prefix / (rel + ".jxl")
                converted.parent.mkdir(parents=True, exist_ok=True)
                converted.write_bytes(b"\xff\x0a" + b"test image" * 10)
        build_photos(self.original, self.converted, self.stage)
        render_pages(self.stage, TEMPLATE)
        self.manifest = self.stage / "photo-gallery/albums.generated.json"
        for name in FONT_RELATIVE_PATHS:
            font = self.manifest.parent / "assets/fonts" / name
            font.parent.mkdir(parents=True, exist_ok=True)
            font.write_bytes(b"wOF2" + b"synthetic font" * 3)
        # The original fixtures can disappear: the publisher never needs them.
        shutil.rmtree(self.original)
        private = json.loads(self.manifest.read_text())
        self.private = private
        self.expected_pages = len(private["folders"])
        self.expected_site = self.expected_pages + 2
        self.count_patches = [
            patch.object(pub, "EXPECTED_HTML", self.expected_pages),
            patch.object(pub, "EXPECTED_SITE", self.expected_site),
            patch.object(pub, "EXPECTED_FONTS", 5),
            patch.object(pub, "EXPECTED_PUBLIC", self.expected_site + 5),
            patch.object(pub, "EXPECTED_PHOTOS", 4),
            patch.object(pub, "EXPECTED_IMAGE_BYTES",
                         4 * len(b"\xff\x0a" + b"test image" * 10)),
        ]
        for item in self.count_patches:
            item.start()
            self.addCleanup(item.stop)

    def local_files(self):
        return pub.check_local(self.stage, self.converted, TEMPLATE)

    def complete_remote(self):
        site, photos, catalogue = self.local_files()
        values = {
            k: {"Path": k, "Size": size} for k, size in photos.items()
        }
        values.update({
            k: {"Path": k, "Size": v["bytes"]} for k, v in site.items()
        })
        return values

    def photo_remote(self):
        _, photos, _ = self.local_files()
        return {k: {"Path": k, "Size": sz} for k, sz in photos.items()}

    def test_public_catalogue_keeps_browser_fields_without_private_sources(self):
        b = pub.public_projection(self.private)
        data = json.loads(b)
        self.assertEqual(data["schema_version"], 1)
        self.assertEqual(len(data["photos"]), 2)
        self.assertEqual(len(data["folders"]), self.expected_pages)
        self.assertEqual(data["photos"][0]["path"], self.private["photos"][0]["path"])
        self.assertNotIn(b"source_path", b)
        self.assertNotIn(b"local_path", b)
        self.assertNotIn(b"original_source_path", b)
        for photo in data["photos"]:
            self.assertFalse(photo["alt_approved"])
            self.assertFalse(photo["caption_approved"])
            self.assertEqual(photo["alt"], "")
            self.assertIn("filename", photo)
        self.assertNotEqual(
            b, (self.stage / "photo-gallery/site/albums.json").read_bytes()
        )

    def test_projection_does_not_include_unreviewed_or_unknown_fields(self):
        data = json.loads(json.dumps(self.private))
        data["photos"][0]["private_note"] = "do not publish"
        data["photos"][0]["source_path"] = "/Users/private/raw-photo.jpg"
        data["photos"][0]["alt"] = "unreviewed invented description"
        data["photos"][0]["alt_approved"] = False
        public = pub.public_projection(data).decode()
        self.assertNotIn("do not publish", public)
        self.assertNotIn("/Users/private/", public)
        self.assertNotIn("unreviewed invented description", public)

    def test_exact_website_allowlist_does_not_include_finder_or_reviews(self):
        site, photos, data = self.local_files()
        self.assertEqual(len(site), self.expected_site + 5)
        self.assertIn("index.html", site)
        self.assertIn("albums.json", site)
        self.assertIn("sitemap.xml", site)
        self.assertEqual(sum(k.endswith(".woff2") for k in site), 5)
        self.assertFalse(any(".DS_Store" in key for key in site))
        self.assertFalse(any("review" in key or key.endswith(".csv")
                             for key in site))
        self.assertFalse(set(site) & set(photos))
        self.assertIsNone(site["albums.json"]["local"])
        self.assertIsNone(site["albums.json"]["source"])
        self.assertEqual(site["albums.json"]["bytes"], len(data))

    def test_read_only_default_never_calls_transfer(self):
        remote = self.photo_remote()
        with patch.object(pub, "list_remote", return_value=remote), \
             patch.object(pub, "run_copy") as copy, \
             patch.object(pub.shutil, "which", return_value="/usr/bin/rclone"), \
             patch.object(pub, "verify_remote") as verify:
            self.assertEqual(pub.publish(self.stage, self.converted, TEMPLATE), 0)
        copy.assert_not_called()
        verify.assert_not_called()

    def test_abort_if_any_photograph_missing(self):
        site, photos, _ = self.local_files()
        remote = self.photo_remote()
        remote.pop(next(iter(photos)))
        with self.assertRaisesRegex(ValueError, "gallery images are absent"):
            pub.compare_remote(site, photos, remote)

    def test_abort_unplanned_object_or_collision_without_deleting(self):
        site, photos, _ = self.local_files()
        remote = self.photo_remote()
        remote["file-server/sensitive.zip"] = {"Path": "file-server/sensitive.zip",
                                               "Size": 123}
        with self.assertRaisesRegex(ValueError, "Unplanned remote objects"):
            pub.compare_remote(site, photos, remote)

    def test_abort_existing_website_key_of_different_size(self):
        site, photos, _ = self.local_files()
        remote = self.photo_remote()
        remote["index.html"] = {"Path": "index.html",
                                "Size": site["index.html"]["bytes"] + 3}
        with self.assertRaisesRegex(ValueError, "different size"):
            pub.compare_remote(site, photos, remote)

    def test_upload_stages_index_last_never_use_private_catalogue(self):
        remote = self.photo_remote()
        with patch.object(pub, "list_remote", return_value=remote), \
             patch.object(pub, "run_copy") as copy, \
             patch.object(pub.shutil, "which", return_value="/usr/bin/rclone"), \
             patch.object(pub, "verify_remote"):
            self.assertEqual(
                pub.publish(self.stage, self.converted, TEMPLATE, "upload"), 0
            )
        stages = [call.args for call in copy.call_args_list]
        self.assertEqual(len(stages), 5)
        self.assertEqual(stages[0][2], "font/woff2")
        self.assertEqual(stages[1][1], ["albums.json"])
        self.assertNotEqual(stages[1][0], self.stage / "photo-gallery/site")
        self.assertEqual(stages[2][2], "text/html; charset=utf-8")
        self.assertEqual(stages[3][1], ["sitemap.xml"])
        self.assertEqual(stages[4][1], ["index.html"])
        self.assertEqual(sum(len(keys) for _, keys, _ in stages),
                         self.expected_site + 5)

    def test_resume_preserves_existing_matching_site_objects(self):
        site, photos, catalogue = self.local_files()
        remote = self.photo_remote()
        for key in ("albums.json", "index.html"):
            remote[key] = {"Path": key, "Size": site[key]["bytes"]}
        with patch.object(pub, "list_remote", return_value=remote), \
             patch.object(pub, "run_copy") as copy, \
             patch.object(pub.shutil, "which", return_value="/usr/bin/rclone"), \
             patch.object(pub, "verify_remote"):
            self.assertEqual(
                pub.publish(self.stage, self.converted, TEMPLATE, "upload"), 0
            )
        key_lists = [key for call in copy.call_args_list for key in call.args[1]]
        self.assertNotIn("albums.json", key_lists)
        self.assertNotIn("index.html", key_lists)

    def test_copy_uses_only_exact_keys_no_overwrite_or_sync(self):
        with patch.object(pub.subprocess, "run",
                          return_value=subprocess.CompletedProcess([], 0)) as run:
            pub.run_copy(Path("/synthetic/public/site"), ["albums/abc.html"],
                         "text/html; charset=utf-8")
        command = run.call_args.args[0]
        self.assertEqual(command[:2], ["rclone", "copy"])
        self.assertIn("--files-from0", command)
        self.assertIn("--ignore-existing", command)
        self.assertIn("--metadata-set", command)
        self.assertIn("content-type=text/html; charset=utf-8", command)
        self.assertNotIn("sync", command)
        self.assertNotIn("--delete-excluded", command)
        self.assertEqual(run.call_args.kwargs["input"], b"albums/abc.html\0")
        self.assertNotIn("--dry-run", command)

    def test_verify_only_never_runs_copy(self):
        remote = self.complete_remote()
        with patch.object(pub, "list_remote", return_value=remote), \
             patch.object(pub, "run_copy") as copy, \
             patch.object(pub.shutil, "which", return_value="/usr/bin/rclone"), \
             patch.object(pub, "verify_remote") as verify:
            self.assertEqual(pub.publish(self.stage, self.converted, TEMPLATE,
                                         "verify"), 0)
        copy.assert_not_called()
        verify.assert_called_once()

    def test_public_projection_keeps_future_owner_approved_alt(self):
        data = json.loads(json.dumps(self.private))
        data["photos"][0]["alt_approved"] = True
        data["photos"][0]["alt"] = "Owner reviewed image description."
        public = json.loads(pub.public_projection(data))
        self.assertEqual(public["photos"][0]["alt"],
                         "Owner reviewed image description.")
        self.assertTrue(public["photos"][0]["alt_approved"])


if __name__ == "__main__":
    unittest.main()
