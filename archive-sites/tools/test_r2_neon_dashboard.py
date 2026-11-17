"""Tests for PHOTON UPLINK telemetry: real stats, safe simulation and display."""
import importlib.util
import json
import os
import unittest
import io
from contextlib import redirect_stdout
from unittest.mock import patch

from r2_neon_dashboard import (
    Telemetry, dashboard, pretty_bytes, pretty_time, require_rich,
    preflight_display, PreflightDisplay,
)


class TelemetryTests(unittest.TestCase):
    def test_real_progress_comes_only_from_rclone_stats(self):
        t = Telemetry(total_files=200, total_bytes=2_000_000,
                      already_present=20)
        t.consume(json.dumps({"level": "info", "msg": "Copied (new) to: first.jxl",
                              "object": "full/a/first.jxl"}).encode())
        self.assertEqual(t.sent_bytes, 0)
        self.assertEqual(t.files_done, 0)
        self.assertEqual(t.recent[0], "full/a/first.jxl")
        event = {
            "level": "info", "msg": "rclone stats",
            "stats": {
                "bytes": 1234567, "transfers": 63,
                "speed": 330000, "eta": 4.0,
                "elapsedTime": 9.2,
                "transferring": [
                    {"name": "full/a/new.jxl", "bytes": 90000, "size": 150000},
                    {"name": "thumbs/a/new.jxl"}
                ],
            },
        }
        self.assertTrue(t.consume(json.dumps(event)))
        self.assertEqual(t.sent_bytes, 1234567)
        self.assertEqual(t.files_done, 63)
        self.assertEqual(t.speed, 330000)
        self.assertEqual(t.eta, 4.0)
        self.assertEqual(len(t.active), 2)
        self.assertEqual(t.elapsed, 9.2)

    def test_bad_inputs_do_not_forge_transfer_success(self):
        t = Telemetry(20, 3000, 20)
        t.consume(b"not a JSON log")
        t.consume('{"level":"warning","msg":"network retry"}')
        self.assertEqual((t.files_done, t.sent_bytes), (0, 0))
        self.assertEqual(len(t.warnings), 2)
        t.consume('{"stats":{"bytes":5000,"transfers":999,"speed":null,"eta":null}}')
        self.assertEqual((t.files_done, t.sent_bytes), (20, 3000))
        self.assertIsNone(t.eta)
        # Protect against non-monotonic rclone retry stats jumping backwards.
        t.consume('{"stats":{"bytes":2,"transfers":1}}')
        self.assertEqual((t.files_done, t.sent_bytes), (20, 3000))

    def test_synthetic_progress_cannot_leak_to_real_transfer(self):
        t = Telemetry(16803, 4270000000, 20)
        with self.assertRaisesRegex(ValueError, "forbidden"):
            t.set_demo_position(.5)
        demo = Telemetry(16803, 4270000000, 20, demo=True)
        demo.set_demo_position(.5)
        self.assertGreater(demo.sent_bytes, 0)
        self.assertEqual(demo.phase, "SIMULATED UPLINK")

    def test_read_only_preflight_fallback_reports_every_stage(self):
        output = io.StringIO()
        with patch("r2_neon_dashboard.require_rich",
                   side_effect=ValueError("Rich missing")):
            with redirect_stdout(output):
                with preflight_display() as ui:
                    ui.advance(1)
                    ui.advance(2)
                    ui.finish()
        result = output.getvalue()
        self.assertIn("LOCAL ARCHIVE", result)
        self.assertIn("R2 INVENTORY", result)
        self.assertIn("SAFETY INTERLOCKS", result)
        self.assertIn("nothing uploaded", result)

    def test_display_helpers_are_consistent(self):
        self.assertEqual(pretty_bytes(0), "0 B")
        self.assertEqual(pretty_bytes(1024), "1.00 KiB")
        self.assertEqual(pretty_time(None), "CALCULATING")
        self.assertEqual(pretty_time(65), "01m 05s")
        self.assertEqual(pretty_time(3661), "01h 01m")


@unittest.skipUnless(importlib.util.find_spec("rich") is not None,
                     "Rich is optional for the CLI, installed separately on the Mac")
class RenderTests(unittest.TestCase):
    def test_preflight_panel_displays_real_stages_and_no_upload_notice(self):
        from rich.console import Console
        ui = PreflightDisplay()
        ui.advance(1)
        ui.advance(2)
        ui.finish()
        console = Console(width=100, force_terminal=False, record=True)
        console.print(ui.render())
        visible = console.export_text()
        self.assertIn("PHOTON UPLINK", visible)
        self.assertIn("LOCAL ARCHIVE", visible)
        self.assertIn("R2 INVENTORY", visible)
        self.assertIn("SAFETY INTERLOCKS", visible)
        self.assertIn("NO UPLOADS", visible)
        self.assertIn("PREFLIGHT COMPLETE", visible)

    def test_live_dashboard_fits_normal_120_by_20_terminal(self):
        from rich.console import Console
        t = Telemetry(16803, 4270000000, 20)
        t.consume(json.dumps({"stats": {
            "bytes": 1200000000, "transfers": 4921, "speed": 3200000,
            "eta": 940, "elapsedTime": 360,
            "transferring": [{"name": "full/consoles/sega/mega-drive/IMG_0297.jxl"}]
        }}))
        with patch("r2_neon_dashboard.shutil.get_terminal_size",
                   return_value=os.terminal_size((120, 20))):
            console = Console(width=120, height=20, force_terminal=False,
                              record=True)
            console.print(dashboard(t))
            visible = console.export_text()
        self.assertLessEqual(len(visible.splitlines()), 20, visible)
        for label in ("PHOTON UPLINK", "DATA SENT", "SPEED", "ETA",
                      "OBJECTS", "DATA", "FILES", "ACTIVE OBJECT",
                      "ORIGINALS PROTECTED"):
            self.assertIn(label, visible)

    def test_small_120_by_13_terminal_keeps_essentials(self):
        from rich.console import Console
        t = Telemetry(16803, 4270000000, 20, demo=True)
        t.set_demo_position(.35)
        with patch("r2_neon_dashboard.shutil.get_terminal_size",
                   return_value=os.terminal_size((120, 13))):
            console = Console(width=120, height=13,
                              force_terminal=False, record=True)
            console.print(dashboard(t))
            visible = console.export_text()
        self.assertLessEqual(len(visible.splitlines()), 13, visible)
        self.assertIn("PHOTON UPLINK", visible)
        self.assertIn("SIMULATION ONLY", visible)
        self.assertIn("35.0%", visible)

    def test_preflight_has_elapsed_time(self):
        from rich.console import Console
        ui = PreflightDisplay()
        with patch("r2_neon_dashboard.time.monotonic",
                   return_value=ui.started + 76.5):
            console = Console(width=120, force_terminal=False, record=True)
            console.print(ui.render())
            visible = console.export_text()
        self.assertIn("ELAPSED 01m 16s", visible)
        self.assertIn("NO DATA TRANSFER", visible)

    def test_80_column_demo_renders_without_transfer(self):
        from rich.console import Console
        t = Telemetry(16803, 4270000000, 20, demo=True)
        t.set_demo_position(.43)
        with patch("r2_neon_dashboard.shutil.get_terminal_size",
                   return_value=os.terminal_size((80, 24))):
            console = Console(width=80, force_terminal=False, record=True)
            console.print(dashboard(t))
            visible = console.export_text()
        self.assertIn("PHOTON UPLINK", visible)
        self.assertIn("SIMULATION", visible)
        self.assertIn("NO RCLONE", visible)
        self.assertIn("43.0%", visible)

    def test_live_mode_is_clearly_public_not_simulation(self):
        from rich.console import Console
        t = Telemetry(10, 2000, 20)
        with patch("r2_neon_dashboard.shutil.get_terminal_size",
                   return_value=os.terminal_size((120, 36))):
            console = Console(width=120, force_terminal=False, record=True)
            console.print(dashboard(t))
            visible = console.export_text()
        self.assertIn("LIVE // PUBLIC R2", visible)
        self.assertIn("EXACT FILE ALLOWLIST", visible)
        self.assertNotIn("SIMULATION ONLY", visible)


if __name__ == "__main__":
    unittest.main()
