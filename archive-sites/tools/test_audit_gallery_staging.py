"""Regressions for read-only photo gallery project readiness audit."""
import csv
import json
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch

from audit_gallery_staging import audit
from build_mcretro_r2_catalogues import build_photos
from preview_mcretro_gallery import FONT_RELATIVE_PATHS
from render_gallery_pages import render_pages

TEMPLATE = Path(__file__).resolve().parents[1] / "photo-gallery/index.html"


class GalleryReadinessTests(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        root = Path(temp.name)
        self.source = root / "synthetic-test-originals"
        self.converted = root / "converted"
        self.stage = root / "stage"
        self.source.mkdir()
        self.converted.mkdir()
        for key in (
            "consoles/sega/dreamcast/img_0835.jpg",
            "computers/ibm/model-m/keyboard.png",
        ):
            source = self.source / key
            source.parent.mkdir(parents=True, exist_ok=True)
            source.write_bytes(b"FAKE PHOTOGRAPH TEST FIXTURE")
            for kind in ("full", "thumbs"):
                jxl = self.converted / kind / (key + ".jxl")
                jxl.parent.mkdir(parents=True, exist_ok=True)
                jxl.write_bytes(b"\xff\x0a" + bytes([len(key)]) * 32)
        summary = build_photos(self.source, self.converted, self.stage)
        self.assertEqual(summary["converted_pairs"], 2)
        render_pages(self.stage, TEMPLATE)
        self.manifest = self.stage / "photo-gallery/albums.generated.json"
        for rel in FONT_RELATIVE_PATHS:
            font = self.manifest.parent / "assets/fonts" / rel
            font.parent.mkdir(parents=True, exist_ok=True)
            font.write_bytes(b"wOF2" + b"synthetic-test-font-bytes")
        shutil.rmtree(self.source)

    def test_read_only_ready_after_original_fixture_removed(self):
        # Auditing the converted set never needs any historical originals.
        with patch("subprocess.run", side_effect=AssertionError("No subprocess allowed")):
            result = audit(self.stage, self.converted, TEMPLATE)
        self.assertTrue(result["technical_staging_consistent"])
        self.assertEqual(result["photo_count"], 2)
        self.assertEqual(result["local_object_count"], 4)
        self.assertEqual(result["album_count"], 2)
        self.assertEqual(result["staged_font_count"], len(FONT_RELATIVE_PATHS))
        self.assertEqual(result["pending_visual_alt_review"], 2)
        self.assertEqual(result["static_site"]["expected_static_pages"],
                         result["static_site"]["exact_html_pages_verified"])
        self.assertFalse(result["additional_r2_upload_authorised"])
        self.assertFalse(result["publication_authorised"])
        self.assertFalse(result["original_26gb_collection_accessed"])
        self.assertFalse(result["r2_contacted"])

    def test_stale_public_catalogue_is_detected(self):
        site_catalogue = self.stage / "photo-gallery/site/albums.json"
        site_catalogue.write_text("{}")
        result = audit(self.stage, self.converted, TEMPLATE)
        self.assertFalse(result["technical_staging_consistent"])
        self.assertTrue(any("STALE" in issue for issue in result["page_or_font_issues"]))

    def test_stale_static_folder_page_is_detected(self):
        site = self.stage / "photo-gallery/site"
        page = next((site / "albums").glob("*.html"))
        page.write_text("<html>outdated archive</html>")
        result = audit(self.stage, self.converted, TEMPLATE)
        self.assertFalse(result["technical_staging_consistent"])
        self.assertTrue(any("STALE static HTML" in issue for issue in
                            result["page_or_font_issues"]))

    def test_unapproved_caption_never_passes(self):
        data = json.loads(self.manifest.read_text())
        data["photos"][0]["caption"] = "Unreviewed person identification"
        data["photos"][0]["caption_approved"] = False
        self.manifest.write_text(json.dumps(data))
        with self.assertRaisesRegex(ValueError, "Unreviewed metadata present"):
            audit(self.stage, self.converted, TEMPLATE)

    def test_only_explicitly_approved_alt_is_counted(self):
        data = json.loads(self.manifest.read_text())
        data["photos"][0]["alt"] = "A Dreamcast photographed from the front"
        data["photos"][0]["alt_approved"] = True
        self.manifest.write_text(json.dumps(data))
        # Site is out of date until rerendered from that approved manifest.
        result = audit(self.stage, self.converted, TEMPLATE)
        self.assertEqual(result["reviewed_metadata_counts"]["alt"], 1)
        self.assertEqual(result["pending_visual_alt_review"], 1)
        self.assertFalse(result["technical_staging_consistent"])
        render_pages(self.stage, TEMPLATE)
        self.assertTrue(audit(self.stage, self.converted, TEMPLATE)["technical_staging_consistent"])

    def test_publication_approval_in_page_plan_rejected(self):
        plan = self.stage / "reports/gallery-pages-upload-plan.csv"
        with plan.open(newline="", encoding="utf-8") as handle:
            reader = csv.DictReader(handle)
            names = reader.fieldnames
            rows = list(reader)
        rows[0]["approved_for_publication"] = "YES"
        with plan.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=names)
            writer.writeheader()
            writer.writerows(rows)
        result = audit(self.stage, self.converted, TEMPLATE)
        self.assertFalse(result["technical_staging_consistent"])
        self.assertTrue(any("incorrectly marked approved" in issue for issue
                            in result["page_or_font_issues"]))

    def test_missing_fonts_and_extra_static_asset_reported(self):
        (self.manifest.parent / "assets/fonts/korataki.woff2").unlink()
        (self.stage / "photo-gallery/site/unplanned.html").write_text("unplanned")
        result = audit(self.stage, self.converted, TEMPLATE)
        self.assertFalse(result["technical_staging_consistent"])
        self.assertTrue(any("Missing locally staged fonts" in issue for issue
                            in result["page_or_font_issues"]))
        self.assertTrue(any("unplanned static site files" in issue for issue
                            in result["page_or_font_issues"]))


if __name__ == "__main__":
    unittest.main()
