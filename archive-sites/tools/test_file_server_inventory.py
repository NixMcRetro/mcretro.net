"""Synthetic, local-only regression tests for File Server private review."""
import csv
import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parent))
import file_server_inventory as archive


class FileServerReviewTests(unittest.TestCase):
    def setUp(self):
        self.sandbox = tempfile.TemporaryDirectory()
        self.addCleanup(self.sandbox.cleanup)
        base = Path(self.sandbox.name)
        self.source = base / "historical-files"
        self.stage = base / "private-review"
        (self.source / "drivers").mkdir(parents=True)
        (self.source / "copies").mkdir()
        (self.source / "drivers" / "card.bin").write_bytes(b"sample historical data")
        (self.source / "copies" / "duplicate.bin").write_bytes(b"sample historical data")
        (self.source / ".DS_Store").write_bytes(b"excluded")
        (self.source / "drivers" / "local-link.bin").symlink_to(
            self.source / "drivers" / "card.bin"
        )

    def review_rows(self):
        with (self.stage / "owner-review.csv").open(newline="", encoding="utf-8") as file:
            return list(csv.DictReader(file))

    def save_review_rows(self, rows):
        with (self.stage / "owner-review.csv").open("w", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=archive.REVIEW_FIELDS)
            writer.writeheader()
            writer.writerows(rows)

    def approve_one(self):
        rows = self.review_rows()
        chosen = next(row for row in rows if row["source_path"] == "drivers/card.bin")
        chosen.update({
            "decision": "APPROVE", "content_inspected": "YES",
            "privacy_approved": "YES", "rights_basis": "OWNED",
            "rights_evidence": "Created by owner as a synthetic fixture",
            "public_key": "downloads/drivers/card.bin", "title": "Card utility",
            "description": "Synthetic test archive file", "category": "Drivers",
            "year": "1998", "hardware": "Sample card",
        })
        self.save_review_rows(rows)
        return chosen

    def test_scan_only_reads_files_and_never_approves_anything(self):
        summary = archive.scan(self.source, self.stage)
        self.assertEqual(summary["candidates"], 2)
        self.assertEqual(summary["duplicate_groups"], 1)
        self.assertEqual(summary["approved"], 0)
        self.assertEqual(summary["publication"], "NONE")
        self.assertEqual(len(self.review_rows()), 2)
        self.assertTrue(all(row["decision"] == "HOLD" for row in self.review_rows()))
        private = json.loads((self.stage / "inventory.private.json").read_text())
        self.assertTrue(all("duplicate content" in row["risk_flags"] for row in private["files"]))
        self.assertEqual(len(list(self.stage.glob("*"))), 3)
        self.assertFalse((self.stage / "approved-catalogue.preview.json").exists())
        self.assertEqual((self.source / "drivers" / "card.bin").read_bytes(),
                         b"sample historical data")
        self.assertEqual((self.stage / "owner-review.csv").stat().st_mode & 0o777, 0o600)
        self.assertEqual(self.stage.stat().st_mode & 0o777, 0o700)
        skipped = (self.stage / "excluded.private.csv").read_text()
        self.assertIn(".DS_Store", skipped)
        self.assertIn("local-link.bin", skipped)

    def test_rejects_nested_staging_and_rerun_overwrite(self):
        with self.assertRaisesRegex(ValueError, "separate"):
            archive.scan(self.source, self.source / "review")
        archive.scan(self.source, self.stage)
        with self.assertRaisesRegex(ValueError, "already exist"):
            archive.scan(self.source, self.stage)

    def test_prepare_requires_explicit_full_owner_approval(self):
        archive.scan(self.source, self.stage)
        rows = self.review_rows()
        rows[0]["decision"] = "APPROVE"
        self.save_review_rows(rows)
        with self.assertRaisesRegex(ValueError, "manual content"):
            archive.prepare(self.source, self.stage)
        self.assertFalse((self.stage / "approved-catalogue.preview.json").exists())

    def test_prepare_rehashes_and_emits_only_approved_public_fields(self):
        archive.scan(self.source, self.stage)
        chosen = self.approve_one()
        result = archive.prepare(self.source, self.stage)
        self.assertEqual(result["approved"], 1)
        self.assertEqual(result["publication"], "NONE")
        catalogue = json.loads(
            (self.stage / "approved-catalogue.preview.json").read_text()
        )
        self.assertEqual(len(catalogue["files"]), 1)
        entry = catalogue["files"][0]
        self.assertEqual(entry["path"], "downloads/drivers/card.bin")
        self.assertEqual(entry["sha256"], chosen["sha256"])
        self.assertEqual(entry["year"], 1998)
        self.assertNotIn("rights_evidence", entry)
        self.assertNotIn("source_path", entry)
        self.assertNotIn(str(self.source), json.dumps(catalogue))
        plan = (self.stage / "approved-upload-plan.preview.csv").read_text()
        self.assertIn("source_relative_path", plan)
        self.assertNotIn(str(self.source), plan)
        with self.assertRaisesRegex(ValueError, "already exist"):
            archive.prepare(self.source, self.stage)

    def test_changed_source_blocks_preview(self):
        archive.scan(self.source, self.stage)
        self.approve_one()
        (self.source / "drivers" / "card.bin").write_bytes(b"changed")
        with self.assertRaisesRegex(ValueError, "Source bytes changed"):
            archive.prepare(self.source, self.stage)
        self.assertFalse((self.stage / "approved-catalogue.preview.json").exists())

    def test_public_path_traversal_and_private_metadata_blocked(self):
        archive.scan(self.source, self.stage)
        self.approve_one()
        rows = self.review_rows()
        chosen = next(row for row in rows if row["decision"] == "APPROVE")
        chosen["public_key"] = "downloads/../private.bin"
        self.save_review_rows(rows)
        with self.assertRaisesRegex(ValueError, "under downloads"):
            archive.prepare(self.source, self.stage)
        chosen["public_key"] = "downloads/card.bin"
        chosen["description"] = "Email somebody@example.com for access"
        self.save_review_rows(rows)
        with self.assertRaisesRegex(ValueError, "privacy review"):
            archive.prepare(self.source, self.stage)

    def test_review_integrity_is_tied_to_original_checksum(self):
        archive.scan(self.source, self.stage)
        self.approve_one()
        rows = self.review_rows()
        rows[0]["sha256"] = "0" * 64
        self.save_review_rows(rows)
        with self.assertRaisesRegex(ValueError, "fingerprint"):
            archive.prepare(self.source, self.stage)

    def test_no_approvals_never_emits_public_candidate(self):
        archive.scan(self.source, self.stage)
        with self.assertRaisesRegex(ValueError, "No manually approved"):
            archive.prepare(self.source, self.stage)
        self.assertFalse((self.stage / "approved-catalogue.preview.json").exists())

    def test_formula_like_names_are_not_spreadsheet_formulas(self):
        (self.source / "=SUM(1,2).bin").write_bytes(b"test")
        archive.scan(self.source, self.stage)
        row = next(x for x in self.review_rows() if "SUM" in x["source_path"])
        self.assertTrue(row["source_path"].startswith("'="))
        self.assertEqual(row["decision"], "HOLD")


if __name__ == "__main__":
    unittest.main()
