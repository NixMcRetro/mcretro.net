"""Safety tests for the owner-authorised McRetro Photo Gallery site publisher.

All fixtures are synthetic and local. Never contacts R2 or touches user
photos, originals, cloud bucket, real gallery metadata, or private files.
"""
import csv
import io
import json
from contextlib import redirect_stdout
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
            patch.object(pub, "EXPECTED_PHOTOGRAPHS", 2),
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
            self.assertNotIn("filename", photo)
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

    def test_privacy_gate_blocks_a_private_email_in_visible_catalogue(self):
        site, photos, _ = self.local_files()
        modified = json.loads(json.dumps(self.private))
        modified["folders"][0]["name"] = "Private person@example.com"
        public = pub.public_projection(modified)
        with self.assertRaisesRegex(ValueError, "privacy preflight"):
            pub.scan_public_privacy(self.stage, self.converted, site,
                                    public, photos)

    def test_retina_at_3x_filename_is_not_an_email(self):
        pattern = next(pat for label, pat in pub.SENSITIVE_PUBLIC_MARKERS
                       if label == "email address")
        self.assertTrue(pub.is_retina_suffix_email_false_positive(
            "full/projects/project-yampad/yampad-on@3x.jxl", pattern
        ))
        self.assertTrue(pub.is_retina_suffix_email_false_positive(
            "thumbs/projects/project-yampad/yampad-on@2x.jxl", pattern
        ))
        site, photos, _ = self.local_files()
        modified = json.loads(json.dumps(self.private))
        modified["photos"][0]["path"] = "full/project/yampad-on@3x.jxl"
        modified["photos"][0]["thumbnail"] = "thumbs/project/yampad-on@3x.jxl"
        pub.scan_public_privacy(self.stage, self.converted, site,
                                pub.public_projection(modified), photos)

    def test_retina_exception_does_not_hide_real_email(self):
        pattern = next(pat for label, pat in pub.SENSITIVE_PUBLIC_MARKERS
                       if label == "email address")
        self.assertFalse(pub.is_retina_suffix_email_false_positive(
            "full/private/person@example.com@3x.jxl", pattern
        ))
        self.assertFalse(pub.is_retina_suffix_email_false_positive(
            "full/private/person@example.com.jxl", pattern
        ))
        self.assertFalse(pub.is_retina_suffix_email_false_positive(
            "full/private/name@3x.jpg.jxl", pattern
        ))

    def test_privacy_gate_blocks_optimised_jxl_exif_container(self):
        site, photos, public = self.local_files()
        target_key = next(k for k in photos if k.endswith(".jxl"))
        with (self.stage / "reports/photos-upload-plan.csv").open(newline="", encoding="utf-8") as stream:
            row = next(r for r in csv.DictReader(stream) if r["r2_key"] == target_key)
        image = Path(row["local_path"])
        image.write_bytes(
            pub.JXL_CONTAINER_SIGNATURE +
            b"\x00\x00\x00\x0cExif" + b"TEST"
        )
        self.assertIn("Exif", pub.jxl_private_boxes(image))
        with self.assertRaisesRegex(ValueError, "privacy preflight"):
            pub.scan_public_privacy(self.stage, self.converted, site,
                                    public, photos)

    def test_blocked_yampad_gif_reports_safe_reason_without_values(self):
        site, photos, catalogue = self.local_files()
        key = "full/projects/project-yampad/animated.gif"
        gif = self.converted / key
        gif.parent.mkdir(parents=True, exist_ok=True)
        gif.write_bytes(b"GIF89a" + b"\0" * 100)
        plan = self.stage / "reports/photos-upload-plan.csv"
        with plan.open("a", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle,
                                    fieldnames=["r2_key", "local_path"])
            writer.writerow({"r2_key": key, "local_path": str(gif)})
        photos[key] = gif.stat().st_size

        def deny(_path, diagnostics=None):
            diagnostics.append("GIF Comment does not match owner-reviewed text")
            return False

        with patch.object(pub, "gif_metadata_extensions",
                          return_value=["GIF Comment extension"]), \
             patch.object(pub, "cleared_yampad_gif_extensions",
                          side_effect=deny):
            stderr = io.StringIO()
            from contextlib import redirect_stderr
            with redirect_stderr(stderr):
                with self.assertRaisesRegex(ValueError, "privacy preflight"):
                    pub.scan_public_privacy(self.stage, self.converted, site,
                                            catalogue, photos)
        message = stderr.getvalue()
        self.assertIn("Project Yampad GIF validation:", message)
        self.assertIn("Comment does not match", message)
        self.assertNotIn("private comment data", message)

    def test_brotli_metadata_box_is_conservatively_flagged(self):
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / "test.jxl"
            path.write_bytes(
                pub.JXL_CONTAINER_SIGNATURE +
                b"\x00\x00\x00\x0dbrob" + b"Exif" + b"X"
            )
            self.assertIn("compressed Exif", pub.jxl_private_boxes(path))

    def test_codestream_optimised_jxl_has_no_container_metadata_boxes(self):
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / "test.jxl"
            path.write_bytes(b"\xff\x0a" + b"sample codestream" * 10)
            self.assertEqual(pub.jxl_private_boxes(path), [])

    def test_privacy_audit_exits_before_remote_access(self):
        with patch.object(pub, "check_local") as local, \
             patch.object(pub, "list_remote") as remote, \
             patch.object(pub.shutil, "which") as rclone:
            self.assertEqual(pub.main(["--privacy-audit"]), 0)
        local.assert_called_once()
        remote.assert_not_called()
        rclone.assert_not_called()

    def test_privacy_report_lists_all_issues_without_loosening_upload_gate(self):
        site, photos, public = self.local_files()
        altered = json.loads(public)
        altered["photos"][0]["path"] = "full/private/person@example.com.jxl"
        public_with_warning = (json.dumps(altered) + "\n").encode()
        target_key = next(k for k in photos if k.endswith(".jxl"))
        with (self.stage / "reports/photos-upload-plan.csv").open(
            newline="", encoding="utf-8"
        ) as stream:
            row = next(r for r in csv.DictReader(stream)
                       if r["r2_key"] == target_key)
        Path(row["local_path"]).write_bytes(
            pub.JXL_CONTAINER_SIGNATURE +
            b"\x00\x00\x00\x0dbrob" + b"Exif" + b"X"
        )
        with patch.object(pub, "describe_exif_tag_names") as details:
            pub.scan_public_privacy(self.stage, self.converted, site,
                                    public_with_warning, photos,
                                    report_only=True)
        details.assert_called_once()
        self.assertEqual(len(details.call_args.args[0]), 1)
        with self.assertRaisesRegex(ValueError, "privacy preflight"):
            pub.scan_public_privacy(self.stage, self.converted, site,
                                    public_with_warning, photos)

    @staticmethod
    def minimal_safe_exif_record(source: str):
        return {
            "SourceFile": source,
            "Composite:ImageSize": "1280x960",
            "Composite:Megapixels": 1.2,
            "ExifIFD:ColorSpace": 1,
            "ExifIFD:ExifImageHeight": 960,
            "ExifIFD:ExifImageWidth": 1280,
            "ExifTool:ExifToolVersion": 13.50,
            "Jpeg2000:CompatibleBrands": "jxl ",
            "Jpeg2000:MajorBrand": "jxl ",
            "Jpeg2000:MinorVersion": 0,
        }

    def test_strict_technical_exif_allowlist_clears_only_dimension_tags(self):
        file = Path("/synthetic/clean.jxl")
        record = self.minimal_safe_exif_record(str(file))
        result = subprocess.CompletedProcess(
            [], 0, stdout=json.dumps([record]).encode(), stderr=b""
        )
        with patch.object(pub.shutil, "which",
                          return_value="/usr/bin/exiftool"), \
             patch.object(pub.subprocess, "run", return_value=result):
            self.assertEqual(
                pub.cleared_technical_exif([("full/test.jxl", file)]),
                {"full/test.jxl"},
            )

    def test_exif_allowlist_refuses_gps_even_with_benign_nine_tags(self):
        file = Path("/synthetic/private.jxl")
        record = self.minimal_safe_exif_record(str(file))
        record["GPS:GPSLatitude"] = -33.123
        result = subprocess.CompletedProcess(
            [], 0, stdout=json.dumps([record]).encode(), stderr=b""
        )
        with patch.object(pub.shutil, "which",
                          return_value="/usr/bin/exiftool"), \
             patch.object(pub.subprocess, "run", return_value=result):
            self.assertEqual(
                pub.cleared_technical_exif([("full/private.jxl", file)]),
                set(),
            )

    def test_exif_allowlist_refuses_missing_dimensions_or_parser_error(self):
        file = Path("/synthetic/incomplete.jxl")
        record = self.minimal_safe_exif_record(str(file))
        record.pop("ExifIFD:ExifImageWidth")
        result = subprocess.CompletedProcess(
            [], 0, stdout=json.dumps([record]).encode(), stderr=b""
        )
        with patch.object(pub.shutil, "which",
                          return_value="/usr/bin/exiftool"), \
             patch.object(pub.subprocess, "run", return_value=result):
            self.assertEqual(
                pub.cleared_technical_exif([("full/incomplete.jxl", file)]),
                set(),
            )
        record["ExifIFD:ExifImageWidth"] = 960
        record["ExifTool:Warning"] = "decoder warning"
        result = subprocess.CompletedProcess(
            [], 0, stdout=json.dumps([record]).encode(), stderr=b""
        )
        with patch.object(pub.shutil, "which",
                          return_value="/usr/bin/exiftool"), \
             patch.object(pub.subprocess, "run", return_value=result):
            self.assertEqual(
                pub.cleared_technical_exif([("full/incomplete.jxl", file)]),
                set(),
            )

    def test_exif_allowlist_requires_exiftool(self):
        with patch.object(pub.shutil, "which", return_value=None):
            self.assertEqual(pub.cleared_technical_exif(
                [("full/metadata.jxl", Path("/synthetic/a.jxl"))]), set())

    def test_same_size_email_and_gif_still_block_with_safe_exif(self):
        site, photos, base_catalogue = self.local_files()
        altered = json.loads(base_catalogue)
        altered["photos"][0]["path"] = "full/foo/person@example.com.jxl"
        public = (json.dumps(altered) + "\n").encode()
        target = next(k for k in photos if k.endswith(".jxl"))
        with (self.stage / "reports/photos-upload-plan.csv").open(
            newline="", encoding="utf-8"
        ) as stream:
            row = next(x for x in csv.DictReader(stream)
                       if x["r2_key"] == target)
        path = Path(row["local_path"])
        path.write_bytes(
            pub.JXL_CONTAINER_SIGNATURE +
            b"\x00\x00\x00\x0dbrob" + b"Exif" + b"X"
        )
        rec = self.minimal_safe_exif_record(str(path))
        result = subprocess.CompletedProcess(
            [], 0, stdout=json.dumps([rec]).encode(), stderr=b""
        )
        with patch.object(pub.shutil, "which",
                          return_value="/usr/bin/exiftool"), \
             patch.object(pub.subprocess, "run", return_value=result):
            with self.assertRaisesRegex(ValueError, "privacy preflight"):
                pub.scan_public_privacy(self.stage, self.converted, site,
                                        public, photos)

    def test_exif_report_displays_tag_names_never_sensitive_values(self):
        first = ("/synthetic/a.jxl", "/synthetic/path/a")
        records = [{
            "SourceFile": first[1],
            "EXIF:GPSLatitude": "-33.987654",
            "EXIF:GPSLongitude": "151.123456",
            "EXIF:OwnerName": "DO NOT PRINT PRIVATE VALUE",
            "EXIF:Make": "PrivateCamera",
            "File:FileName": "a.jxl",
        }]
        result = subprocess.CompletedProcess(
            [], 0, stdout=json.dumps(records).encode(), stderr=b""
        )
        output = io.StringIO()
        with patch.object(pub.shutil, "which",
                          return_value="/usr/local/bin/exiftool"), \
             patch.object(pub.subprocess, "run", return_value=result), \
             redirect_stdout(output):
            pub.describe_exif_tag_names([(first[0], Path(first[1]))])
        shown = output.getvalue()
        self.assertIn("EXIF:GPSLatitude", shown)
        self.assertIn("EXIF:GPSLongitude", shown)
        self.assertIn("EXIF:OwnerName", shown)
        self.assertNotIn("-33.987654", shown)
        self.assertNotIn("151.123456", shown)
        self.assertNotIn("DO NOT PRINT PRIVATE VALUE", shown)
        self.assertNotIn("PrivateCamera", shown)

    def test_gif_loop_control_is_not_misclassified_as_private_metadata(self):
        # Minimal 1x1 GIF with a normal NETSCAPE2.0 looping extension.
        image = (b"GIF89a\x01\x00\x01\x00\x80\x00\x00"
                 + b"\x00\x00\x00\xff\xff\xff"
                 + b"\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00"
                 + b"\x02\x02\x4c\x01\x00\x3b")
        loop = b"\x21\xff\x0bNETSCAPE2.0\x03\x01\x00\x00\x00"
        with tempfile.TemporaryDirectory() as temp:
            filepath = Path(temp) / "loop.gif"
            filepath.write_bytes(image[:19] + loop + image[19:])
            self.assertEqual(pub.gif_metadata_extensions(filepath), [])

    def test_gif_real_comment_extension_is_flagged_without_contents(self):
        image = (b"GIF89a\x01\x00\x01\x00\x80\x00\x00"
                 + b"\x00\x00\x00\xff\xff\xff"
                 + b"\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00"
                 + b"\x02\x02\x4c\x01\x00\x3b")
        comment = b"\x21\xfe\x06SECRET\x00"
        with tempfile.TemporaryDirectory() as temp:
            filepath = Path(temp) / "with-comment.gif"
            filepath.write_bytes(image[:19] + comment + image[19:])
            findings = pub.gif_metadata_extensions(filepath)
            self.assertEqual(findings, ["GIF Comment extension"])
            self.assertNotIn("SECRET", str(findings))

    def test_gif_random_comment_bytes_inside_image_data_not_flagged(self):
        image = (b"GIF89a\x01\x00\x01\x00\x80\x00\x00"
                 + b"\x00\x00\x00\xff\xff\xff"
                 + b"\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00"
                 + b"\x02\x04\x21\xfe\x4c\x01\x00\x3b")
        with tempfile.TemporaryDirectory() as temp:
            filepath = Path(temp) / "image-byte-pattern.gif"
            filepath.write_bytes(image)
            self.assertEqual(pub.gif_metadata_extensions(filepath), [])

    def test_unresolved_diagnostic_redacts_values_and_reads_only_optimised_gif(self):
        with tempfile.TemporaryDirectory() as temp:
            stage = Path(temp) / "stage"
            converted = Path(temp) / "converted"
            (stage / "photo-gallery").mkdir(parents=True)
            (stage / "reports").mkdir(parents=True)
            file = converted / "full/projects/project-yampad/animated.gif"
            file.parent.mkdir(parents=True)
            image = (b"GIF89a\x01\x00\x01\x00\x80\x00\x00"
                     + b"\x00\x00\x00\xff\xff\xff"
                     + b"\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00"
                     + b"\x02\x02\x4c\x01\x00\x3b")
            private_comment = b"contact@example.org"
            comment = (b"\x21\xfe" + bytes([len(private_comment)]) +
                       private_comment + b"\x00")
            application = b"\x21\xff\x0bPRIVATEAPP1\x03\x01\x02\x03\x00"
            file.write_bytes(image[:19] + comment + application + image[19:])
            catalogue = {
                "schema_version": 1,
                "albums": [], "folders": [],
                "photos": [{
                    "path": "full/private/contact@example.org.jxl",
                    "thumbnail": "thumbs/private/contact@example.org.jxl",
                    "title": "Synthetic", "album": "album-test",
                }],
            }
            (stage / "photo-gallery/albums.generated.json").write_text(
                json.dumps(catalogue), encoding="utf-8"
            )
            with (stage / "reports/photos-upload-plan.csv").open(
                "w", encoding="utf-8", newline=""
            ) as stream:
                writer = csv.DictWriter(stream,
                                        fieldnames=["r2_key", "local_path"])
                writer.writeheader()
                writer.writerow({
                    "r2_key": "full/projects/project-yampad/animated.gif",
                    "local_path": str(file),
                })
            buf = io.StringIO()
            with redirect_stdout(buf):
                pub.inspect_remaining_privacy(stage, converted)
            output = buf.getvalue()
            self.assertIn("2 fields across 1 photo(s)", output)
            self.assertIn("EMAIL-SHAPED-TEXT", output)
            self.assertIn("GIF Comment", output)
            self.assertIn("other application", output)
            self.assertIn("email address", output)
            self.assertNotIn("contact@example.org", output)
            self.assertNotIn("PRIVATEAPP1", output)
            self.assertIn("website publication remains blocked", output)

    def test_gif_icc_application_is_classified_without_payload_contents(self):
        with tempfile.TemporaryDirectory() as temp:
            photo = Path(temp) / "synthetic.gif"
            image = (b"GIF89a\x01\x00\x01\x00\x80\x00\x00"
                     + b"\x00\x00\x00\xff\xff\xff"
                     + b"\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00"
                     + b"\x02\x02\x4c\x01\x00\x3b")
            profile = b"\x00" * 40 + b"acsp" + b"\x00" * 100
            # The recognised application ID is public format metadata;
            # profile bytes remain confidential in diagnostic output.
            ext = (b"\x21\xff\x0bICCRGBG1012" +
                   bytes([len(profile)]) + profile + b"\x00")
            photo.write_bytes(image[:19] + ext + ext + image[19:])
            records = pub.gif_extension_privacy_details(photo)
            self.assertEqual(len(records), 2)
            self.assertEqual(records[0]["type"], "GIF ICC colour profile")
            self.assertEqual(records[1]["type"], "GIF ICC colour profile")
            self.assertEqual(records[0]["payload_digest"],
                             records[1]["payload_digest"])
            self.assertNotIn(profile, records)

    @staticmethod
    def synthetic_yampad_gif(path: Path, *, comment: bytes =
                            b"Optimized using ezgif.com",
                            duplicate_profile: bool = True):
        image = (b"GIF89a\x01\x00\x01\x00\x80\x00\x00"
                 + b"\x00\x00\x00\xff\xff\xff"
                 + b"\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00"
                 + b"\x02\x02\x4c\x01\x00\x3b")

        def subblocks(data):
            return (b"".join(bytes([len(data[i:i + 255])]) + data[i:i + 255]
                             for i in range(0, len(data), 255)) + b"\x00")

        profile = bytes([1, 1]) + b"\0" * 546
        profile2 = profile if duplicate_profile else (
            bytes([1, 1]) + b"\1" + b"\0" * 545
        )
        first = b"\x21\xff\x0bICCRGBG1012" + subblocks(profile)
        other = b"\x21\xff\x0bICCRGBG1012" + subblocks(profile2)
        comment_block = b"\x21\xfe" + subblocks(comment)
        path.write_bytes(image[:19] + first + comment_block +
                         other + image[19:])

    @staticmethod
    def yampad_exif_record(path: Path):
        record = {
            "SourceFile": str(path),
            "File:Comment": "Optimized using ezgif.com",
        }
        for group in ("ICC_Profile", "ICC_Profile2"):
            for name in pub.SAFE_YAMPAD_ICC_TAGS:
                record[group + ":" + name] = "technical value"
            record[group + ":ProfileDescription"] = "Display P3"
            record[group + ":ProfileCopyright"] = "Copyright Apple Inc., 2017"
        for group in ("ICC-header", "ICC-header2"):
            record[group + ":ProfileVersion"] = "4.0.0"
            record[group + ":ProfileClass"] = "Display Device Profile"
            record[group + ":ColorSpaceData"] = "RGB"
            record[group + ":ProfileConnectionSpace"] = "XYZ"
            record[group + ":ProfileFileSignature"] = "acsp"
            record[group + ":DeviceManufacturer"] = "Apple"
        return record

    def test_verified_yampad_metadata_passes_exact_allowlist(self):
        with tempfile.TemporaryDirectory() as temp:
            gif = Path(temp) / "animated.gif"
            self.synthetic_yampad_gif(gif)
            record = self.yampad_exif_record(gif)
            result = subprocess.CompletedProcess(
                [], 0, stdout=json.dumps([record]).encode(), stderr=b""
            )
            with patch.object(pub.shutil, "which",
                              return_value="/usr/local/bin/exiftool"), \
                 patch.object(pub.subprocess, "run", return_value=result):
                self.assertTrue(pub.cleared_yampad_gif_extensions(gif))
            self.assertEqual(pub.gif_metadata_extensions(gif), [
                "other GIF application extension",
                "GIF Comment extension",
                "other GIF application extension",
            ])

    def test_verified_yampad_rejects_unknown_icc_header_fields(self):
        with tempfile.TemporaryDirectory() as temp:
            gif = Path(temp) / "animated.gif"
            self.synthetic_yampad_gif(gif)
            record = self.yampad_exif_record(gif)
            record["ICC-header:UnexpectedPrivateNote"] = "sensitive data"
            mocked = subprocess.CompletedProcess(
                [], 0, stdout=json.dumps([record]).encode(), stderr=b""
            )
            reasons = []
            with patch.object(pub.shutil, "which",
                              return_value="/usr/local/bin/exiftool"), \
                 patch.object(pub.subprocess, "run", return_value=mocked):
                self.assertFalse(pub.cleared_yampad_gif_extensions(
                    gif, diagnostics=reasons))
            self.assertIn("unexpected names", str(reasons))
            self.assertNotIn("sensitive data", str(reasons))

    def test_verified_yampad_rejects_different_icc_header_copies(self):
        with tempfile.TemporaryDirectory() as temp:
            gif = Path(temp) / "animated.gif"
            self.synthetic_yampad_gif(gif)
            record = self.yampad_exif_record(gif)
            record["ICC-header2:DeviceManufacturer"] = "Another Vendor"
            mocked = subprocess.CompletedProcess(
                [], 0, stdout=json.dumps([record]).encode(), stderr=b""
            )
            reasons = []
            with patch.object(pub.shutil, "which",
                              return_value="/usr/local/bin/exiftool"), \
                 patch.object(pub.subprocess, "run", return_value=mocked):
                self.assertFalse(pub.cleared_yampad_gif_extensions(
                    gif, diagnostics=reasons))
            self.assertIn("Two ICC fixed-format header copies differ",
                          str(reasons))
            self.assertNotIn("Another Vendor", str(reasons))

    def test_verified_yampad_rejects_private_icc_header_value(self):
        with tempfile.TemporaryDirectory() as temp:
            gif = Path(temp) / "animated.gif"
            self.synthetic_yampad_gif(gif)
            record = self.yampad_exif_record(gif)
            for group in ("ICC-header", "ICC-header2"):
                record[group + ":DeviceManufacturer"] = "person@example.com"
            mocked = subprocess.CompletedProcess(
                [], 0, stdout=json.dumps([record]).encode(), stderr=b""
            )
            reasons = []
            with patch.object(pub.shutil, "which",
                              return_value="/usr/local/bin/exiftool"), \
                 patch.object(pub.subprocess, "run", return_value=mocked):
                self.assertFalse(pub.cleared_yampad_gif_extensions(
                    gif, diagnostics=reasons))
            self.assertIn("potentially sensitive header field", str(reasons))
            self.assertNotIn("person@example.com", str(reasons))

    def test_verified_yampad_comment_fails_if_changed_even_without_pii(self):
        with tempfile.TemporaryDirectory() as temp:
            gif = Path(temp) / "animated.gif"
            self.synthetic_yampad_gif(gif, comment=b"Another harmless GIF note")
            record = self.yampad_exif_record(gif)
            record["File:Comment"] = "Another harmless GIF note"
            result = subprocess.CompletedProcess(
                [], 0, stdout=json.dumps([record]).encode(), stderr=b""
            )
            with patch.object(pub.shutil, "which",
                              return_value="/usr/local/bin/exiftool"), \
                 patch.object(pub.subprocess, "run", return_value=result):
                self.assertFalse(pub.cleared_yampad_gif_extensions(gif))

    def test_verified_yampad_refuses_changed_profile_or_unexpected_tags(self):
        with tempfile.TemporaryDirectory() as temp:
            gif = Path(temp) / "animated.gif"
            self.synthetic_yampad_gif(gif, duplicate_profile=False)
            record = self.yampad_exif_record(gif)
            result = subprocess.CompletedProcess(
                [], 0, stdout=json.dumps([record]).encode(), stderr=b""
            )
            with patch.object(pub.shutil, "which",
                              return_value="/usr/local/bin/exiftool"), \
                 patch.object(pub.subprocess, "run", return_value=result):
                self.assertFalse(pub.cleared_yampad_gif_extensions(gif))

            self.synthetic_yampad_gif(gif)
            record["ICC_Profile2:OwnerName"] = "private identity"
            result = subprocess.CompletedProcess(
                [], 0, stdout=json.dumps([record]).encode(), stderr=b""
            )
            with patch.object(pub.shutil, "which",
                              return_value="/usr/local/bin/exiftool"), \
                 patch.object(pub.subprocess, "run", return_value=result):
                self.assertFalse(pub.cleared_yampad_gif_extensions(gif))
            record.pop("ICC_Profile2:OwnerName")
            record["ICC_Profile2:ProfileCopyright"] = "Private person"
            result = subprocess.CompletedProcess(
                [], 0, stdout=json.dumps([record]).encode(), stderr=b""
            )
            with patch.object(pub.shutil, "which",
                              return_value="/usr/local/bin/exiftool"), \
                 patch.object(pub.subprocess, "run", return_value=result):
                self.assertFalse(pub.cleared_yampad_gif_extensions(gif))

    def test_yampad_diagnostics_redact_unexpected_private_metadata_values(self):
        with tempfile.TemporaryDirectory() as temp:
            gif = Path(temp) / "animated.gif"
            self.synthetic_yampad_gif(gif)
            record = self.yampad_exif_record(gif)
            record["File:Comment"] = "Private data 1800 SECRET"
            result = subprocess.CompletedProcess(
                [], 0, stdout=json.dumps([record]).encode(), stderr=b""
            )
            reasons = []
            with patch.object(pub.shutil, "which",
                              return_value="/usr/local/bin/exiftool"), \
                 patch.object(pub.subprocess, "run", return_value=result):
                self.assertFalse(pub.cleared_yampad_gif_extensions(
                    gif, diagnostics=reasons
                ))
            self.assertEqual(len(reasons), 1)
            self.assertIn("GIF Comment does not match", reasons[0])
            self.assertNotIn("SECRET", str(reasons))
            self.assertNotIn("Private data", str(reasons))

    def test_yampad_diagnostics_identify_schema_mismatch_without_values(self):
        with tempfile.TemporaryDirectory() as temp:
            gif = Path(temp) / "animated.gif"
            self.synthetic_yampad_gif(gif)
            record = self.yampad_exif_record(gif)
            record["ICC_Profile2:OwnerName"] = "PRIVATE PERSON"
            result = subprocess.CompletedProcess(
                [], 0, stdout=json.dumps([record]).encode(), stderr=b""
            )
            reasons = []
            with patch.object(pub.shutil, "which",
                              return_value="/usr/local/bin/exiftool"), \
                 patch.object(pub.subprocess, "run", return_value=result):
                self.assertFalse(pub.cleared_yampad_gif_extensions(
                    gif, diagnostics=reasons
                ))
            self.assertEqual(len(reasons), 1)
            self.assertIn("unexpected names=['OwnerName']", reasons[0])
            self.assertNotIn("PRIVATE PERSON", reasons[0])

    def test_verified_yampad_requires_successful_exiftool(self):
        with tempfile.TemporaryDirectory() as temp:
            gif = Path(temp) / "animated.gif"
            self.synthetic_yampad_gif(gif)
            with patch.object(pub.shutil, "which", return_value=None):
                self.assertFalse(pub.cleared_yampad_gif_extensions(gif))
            with patch.object(pub.shutil, "which",
                              return_value="/usr/local/bin/exiftool"), \
                 patch.object(pub.subprocess, "run",
                              return_value=subprocess.CompletedProcess(
                                  [], 1, stdout=b"[]", stderr=b"error"
                              )):
                self.assertFalse(pub.cleared_yampad_gif_extensions(gif))

    def test_unresolved_diagnostic_does_not_contact_r2(self):
        with patch.object(pub, "inspect_remaining_privacy") as scan, \
             patch.object(pub, "list_remote") as remote, \
             patch.object(pub, "publish") as upload:
            self.assertEqual(pub.main(["--inspect-unresolved"]), 0)
        scan.assert_called_once()
        remote.assert_not_called()
        upload.assert_not_called()

    def test_privacy_report_cli_does_not_contact_r2(self):
        with patch.object(pub, "check_local") as local, \
             patch.object(pub, "list_remote") as remote, \
             patch.object(pub.shutil, "which") as rclone:
            self.assertEqual(pub.main(["--privacy-report"]), 0)
        self.assertTrue(local.call_args.kwargs["privacy_report"])
        remote.assert_not_called()
        rclone.assert_not_called()

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
             patch.object(pub, "verify_existing_site_bytes") as original_check, \
             patch.object(pub.shutil, "which", return_value="/usr/bin/rclone"), \
             patch.object(pub, "verify_remote"):
            self.assertEqual(
                pub.publish(self.stage, self.converted, TEMPLATE, "upload"), 0
            )
        original_check.assert_called_once()
        self.assertEqual(original_check.call_args.args[1],
                         {"albums.json", "index.html"})
        key_lists = [key for call in copy.call_args_list for key in call.args[1]]
        self.assertNotIn("albums.json", key_lists)
        self.assertNotIn("index.html", key_lists)

    def test_existing_same_size_private_catalogue_bytes_abort_upload(self):
        site, _, _ = self.local_files()
        with tempfile.TemporaryDirectory() as tmp:
            temp = Path(tmp)
            (temp / "albums.json").write_bytes(b"public-safe")
            with patch.object(pub.subprocess, "run",
                              return_value=subprocess.CompletedProcess([], 1)) as run:
                with self.assertRaisesRegex(ValueError, "vetted release"):
                    pub.verify_existing_site_bytes(site, {"albums.json"},
                                                   self.stage, temp)
            command = run.call_args.args[0]
            self.assertEqual(command[:2], ["rclone", "check"])
            self.assertIn("--download", command)
            self.assertIn("--one-way", command)
            self.assertEqual(run.call_args.kwargs["input"], b"albums.json\0")

    def test_privacy_scan_blocks_third_party_autoloaded_javascript(self):
        from publish_photo_gallery_site import ExternalResourceScanner
        parser = ExternalResourceScanner()
        parser.feed('<a href="https://mcretro.net/">Home</a>'
                    '<script src="https://tracker.example/pixel.js"></script>'
                    '<img src="/thumbs/photo.jxl">')
        self.assertEqual(parser.external, ["script has external src"])

    def test_privacy_scan_does_not_confuse_navigation_links_with_trackers(self):
        from publish_photo_gallery_site import ExternalResourceScanner
        parser = ExternalResourceScanner()
        parser.feed('<a href="https://mcretro.net/">Home</a>'
                    '<a href="https://files.mcretro.net/">Files</a>'
                    '<img src="/thumbs/IMG_1.jxl">'
                    '<link href="/assets/fonts/korataki.woff2" rel="preload">')
        self.assertEqual(parser.external, [])

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
