"""McRetro // PHOTON UPLINK: Rich live terminal telemetry for rclone.

Visualisation only. This module does not choose R2 keys, bypass validation,
approve publication, or touch the 26 GB original photo collection.
Synthetic values are permitted exclusively in --demo mode.
"""
from __future__ import annotations

from collections import deque
from contextlib import contextmanager
from dataclasses import dataclass, field
import json
import math
import os
import shutil
import subprocess
import sys
import threading
import time

CYAN, VIOLET, MINT = "#54E8FF", "#B39AFF", "#7EFFC6"
AMBER, MUTED = "#FFD18C", "#8495B5"


def pretty_bytes(value: int | float) -> str:
    number = max(0.0, float(value or 0))
    for unit in ("B", "KiB", "MiB", "GiB", "TiB"):
        if number < 1024 or unit == "TiB":
            return f"{number:,.0f} {unit}" if unit == "B" else f"{number:,.2f} {unit}"
        number /= 1024
    return "0 B"


def pretty_time(seconds: object) -> str:
    if (not isinstance(seconds, (int, float)) or isinstance(seconds, bool)
            or not math.isfinite(seconds) or seconds < 0):
        return "CALCULATING"
    hours, remainder = divmod(int(seconds), 3600)
    minutes, remainder = divmod(remainder, 60)
    return f"{hours:02d}h {minutes:02d}m" if hours else f"{minutes:02d}m {remainder:02d}s"


def _number(value: object) -> float | None:
    if isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value):
        return float(value)
    return None


def _safe_name(name: object) -> str:
    text = "".join(c if ord(c) >= 32 and ord(c) != 127 else " " for c in str(name))
    return text[-100:] if len(text) > 100 else text


@dataclass
class Telemetry:
    """Counters come from rclone's stats; event logs are only activity hints."""
    total_files: int
    total_bytes: int
    already_present: int
    demo: bool = False
    sent_bytes: int = 0
    files_done: int = 0
    speed: float = 0.0
    eta: float | None = None
    active: list[str] = field(default_factory=list)
    recent: deque[str] = field(default_factory=lambda: deque(maxlen=4))
    warnings: deque[str] = field(default_factory=lambda: deque(maxlen=2))
    phase: str = "PREPARING CHANNEL"
    elapsed: float = 0.0

    def consume(self, line: bytes | str) -> bool:
        """Accept newline-delimited JSON from rclone --use-json-log."""
        if isinstance(line, bytes):
            line = line.decode("utf-8", errors="replace")
        try:
            event = json.loads(line)
        except (ValueError, TypeError):
            if line.strip():
                self.warnings.appendleft(_safe_name(line.strip()))
            return False
        if not isinstance(event, dict):
            return False
        stats = event.get("stats")
        if isinstance(stats, dict):
            sent, files = _number(stats.get("bytes")), _number(stats.get("transfers"))
            speed, eta = _number(stats.get("speed")), _number(stats.get("eta"))
            if sent is not None:
                self.sent_bytes = min(self.total_bytes, max(self.sent_bytes, int(sent)))
            if files is not None:
                self.files_done = min(self.total_files, max(self.files_done, int(files)))
            if speed is not None:
                self.speed = max(0, speed)
            self.eta = eta if eta is not None and eta >= 0 else None
            transfers = stats.get("transferring")
            self.active = [_safe_name(v["name"]) for v in transfers[:4]
                           if isinstance(v, dict) and v.get("name")] if isinstance(transfers, list) else []
            elapsed = _number(stats.get("elapsedTime"))
            if elapsed is not None:
                self.elapsed = elapsed
            self.phase = "UPLINK ACTIVE"
            return True
        msg, level = _safe_name(event.get("msg", "")), str(event.get("level", "")).lower()
        if "Copied (new)" in msg:
            self.recent.appendleft(_safe_name(event.get("object") or msg))
            return True
        if level in ("error", "fatal", "warning"):
            self.warnings.appendleft(msg or "rclone warning")
            return True
        return False

    def set_demo_position(self, fraction: float) -> None:
        if not self.demo:
            raise ValueError("Synthetic telemetry is forbidden in a real upload")
        f = min(1.0, max(0.0, fraction))
        self.sent_bytes = int(self.total_bytes * f)
        self.files_done = int(self.total_files * f)
        self.speed = 2_850_000 + (1 + math.sin(f * 9)) * 620_000
        self.eta = (self.total_bytes - self.sent_bytes) / max(1, self.speed)
        self.active = ["full/consoles/sega/mega-drive/IMG_0297.jxl",
                       "thumbs/computers/apple-macintosh-lc-475/IMG_2320.jxl"]
        self.phase = "SIMULATED UPLINK"
        self.elapsed = f * 37
        if f >= 1:
            self.phase, self.active, self.eta = "DEMO COMPLETE", [], 0


def require_rich() -> None:
    try:
        import rich  # noqa: F401
    except ImportError as error:
        raise ValueError(
            "Install Rich in an isolated environment first: "
            "python3 -m venv ~/Downloads/mcretro-r2-venv && "
            "~/Downloads/mcretro-r2-venv/bin/python -m pip install rich"
        ) from error



def compact_dashboard(t: Telemetry, height: int):
    """Fit the entire live transfer UI within an ordinary 120x20 Terminal.

    Under 16 rows use an even tighter flat layout. No telemetry is invented.
    """
    from rich import box
    from rich.align import Align
    from rich.console import Group
    from rich.panel import Panel
    from rich.progress import BarColumn, Progress, TextColumn
    from rich.table import Table
    from rich.text import Text

    small = height < 16
    headline = Table.grid(expand=True)
    headline.add_column(ratio=1)
    headline.add_column(justify="right")
    name = Text("◆ McRETRO / ", style=f"bold {CYAN}")
    name.append("PHOTON UPLINK", style=f"bold {VIOLET}")
    headline.add_row(name,
                     Text("SIMULATION // NO NETWORK" if t.demo else "LIVE // PUBLIC R2",
                          style=f"bold {AMBER}" if t.demo else f"bold {MINT}"))
    if small:
        header = headline
    else:
        headline.add_row(Text("photos.mcretro.net", style=MUTED),
                         Text(t.phase, style=f"bold {CYAN}"))
        header = Panel(headline, box=box.ROUNDED, border_style=VIOLET, padding=(0, 1))

    metrics = Table.grid(expand=True, padding=(0, 1))
    for _ in range(4):
        metrics.add_column(ratio=1)
    metrics.add_row(*[Text(label, style=MUTED) for label in
                      ("DATA SENT", "SPEED", "ETA", "OBJECTS")])
    metrics.add_row(
        Text(pretty_bytes(t.sent_bytes), style=f"bold {CYAN}"),
        Text(pretty_bytes(t.speed) + "/s" if t.speed else "--",
             style=f"bold {VIOLET}"),
        Text(pretty_time(t.eta), style=f"bold {MINT}"),
        Text(f"{t.files_done:,} / {t.total_files:,}", style=f"bold {AMBER}"),
    )
    metric_view = metrics if small else Panel(metrics, box=box.ROUNDED,
                                              border_style="#344969",
                                              padding=(0, 1))
    bars = []
    for label, colour, total, sent in (
        ("DATA", CYAN, t.total_bytes, t.sent_bytes),
        ("FILES", VIOLET, t.total_files, t.files_done),
    ):
        progress = Progress(TextColumn(f"[bold {colour}]{label}[/]"),
                            BarColumn(bar_width=None, complete_style=colour,
                                      finished_style=MINT),
                            TextColumn("[bold]{task.percentage:>5.1f}%[/]"),
                            expand=True, auto_refresh=False)
        progress.add_task("live", total=max(1, total),
                          completed=min(total, sent))
        bars.append(progress)
    progress_body = Group(
        *bars,
        Text(f"{t.already_present:,} existing  •  {pretty_time(t.elapsed)} elapsed  •  "
             f"{pretty_bytes(t.total_bytes)} queued", style=MUTED),
    )
    progress_view = progress_body if small else Panel(
        progress_body, title="◈ LIVE TRANSMISSION", title_align="left",
        box=box.ROUNDED, border_style=CYAN, padding=(0, 1))

    active = t.active[0] if t.active else "--"
    recent = t.recent[0] if t.recent else "--"
    channels = Table.grid(expand=True, padding=(0, 1))
    channels.add_column(ratio=1)
    channels.add_column(ratio=1)
    channels.add_row(Text("ACTIVE OBJECT", style=f"bold {CYAN}"),
                     Text("LAST COMPLETED", style=f"bold {VIOLET}"))
    channels.add_row(Text(active[-50:], style="white"),
                     Text(recent[-50:], style="white"))
    if t.warnings:
        channels.add_row(Text("ALERT: " + t.warnings[0][-75:], style=f"bold {AMBER}"),
                         Text("", style=MUTED))
    channel_view = channels if small else Panel(channels, box=box.ROUNDED,
                                                border_style="#46537A", padding=(0, 1))
    footer = Text(
        "◇ EXACT ALLOWLIST   ◇ NO OVERWRITES   ◇ ORIGINALS PROTECTED   ◇ NO HTML PUBLISHING",
        justify="center", style=f"bold {MUTED}")
    if t.demo:
        footer = Text("SIMULATION ONLY  ◇ NO RCLONE OR R2 REQUESTS",
                      justify="center", style=f"bold {AMBER}")
    return Group(header, metric_view, progress_view, channel_view, Align.center(footer))


def dashboard(t: Telemetry):
    """Create a responsive, polished Rich renderable with live stats."""
    require_rich()
    from rich import box
    from rich.align import Align
    from rich.columns import Columns
    from rich.console import Group
    from rich.panel import Panel
    from rich.progress import BarColumn, Progress, TextColumn
    from rich.table import Table
    from rich.text import Text

    width, height = shutil.get_terminal_size((100, 28))
    if height <= 22:
        return compact_dashboard(t, height)
    compact = width < 104 or height < 30
    tag = " SIMULATION // NO NETWORK " if t.demo else " LIVE // PUBLIC R2 "
    title = Text("◆  McRETRO", style=f"bold {CYAN}")
    title.append("  /  ", style=MUTED)
    title.append("PHOTON UPLINK", style=f"bold {VIOLET}")
    headline = Table.grid(expand=True)
    headline.add_column(ratio=1)
    headline.add_column(justify="right")
    headline.add_row(title, Text(tag, style=f"bold {AMBER}" if t.demo else f"bold {MINT}"))
    headline.add_row(Text("ARCHIVE TRANSMISSION CONTROL  ◇  photos.mcretro.net", style=MUTED),
                     Text(t.phase, style=f"bold {CYAN}"))

    def tile(name: str, value: str, hint: str, colour: str):
        body = Table.grid()
        body.add_column()
        body.add_row(Text(name, style=MUTED))
        body.add_row(Text(value, style=f"bold {colour}"))
        body.add_row(Text(hint, style=MUTED))
        return Panel(body, box=box.ROUNDED, border_style="#344969",
                     padding=(0, 1), expand=True)

    tiles = [
        tile("SENT TO R2", pretty_bytes(t.sent_bytes), "of " + pretty_bytes(t.total_bytes), CYAN),
        tile("TRANSFER VELOCITY", pretty_bytes(t.speed) + "/s" if t.speed else "--",
             "rclone telemetry", VIOLET),
        tile("TIME REMAINING", pretty_time(t.eta), "rclone ETA", MINT),
        tile("OBJECTS SENT", f"{t.files_done:,} / {t.total_files:,}",
             f"+ {t.already_present:,} pre-existing", AMBER),
    ]
    metrics = Columns(tiles[:3] if compact else tiles,
                      equal=True, expand=True, padding=(0, 1))

    bars = []
    for label, colour, total, completed in (
        ("DATA", CYAN, t.total_bytes, t.sent_bytes),
        ("FILES", VIOLET, t.total_files, t.files_done),
    ):
        bar = Progress(TextColumn(f"[bold {colour}]{label}[/]"),
                       BarColumn(bar_width=None, complete_style=colour, finished_style=MINT),
                       TextColumn("[bold]{task.percentage:>5.1f}%[/]"),
                       expand=True, auto_refresh=False)
        bar.add_task("transfer", total=max(1, total), completed=min(total, completed))
        bars.append(bar)
    progress_body = Group(*bars,
                          Text(f"  {t.files_done:,} / {t.total_files:,} files  •  "
                               f"{t.already_present:,} previously present  •  "
                               f"{pretty_time(t.elapsed)} elapsed", style=MUTED))
    progress_panel = Panel(progress_body, title="◈ UPLINK PROGRESS", title_align="left",
                           border_style=CYAN, box=box.ROUNDED,
                           padding=(0, 1) if compact else (1, 2))

    activity = Table.grid(expand=True, padding=(0, 1))
    activity.add_column(ratio=1)
    activity.add_column(ratio=1)
    activity.add_row(Text("ACTIVE CHANNELS", style=f"bold {CYAN}"),
                     Text("RECENTLY SENT", style=f"bold {VIOLET}"))
    for i in range(1 if compact else 3):
        active = t.active[i] if i < len(t.active) else "--"
        recent = t.recent[i] if i < len(t.recent) else "--"
        activity.add_row(Text(active[-52:], style="white" if i == 0 else MUTED),
                         Text(recent[-52:], style="white" if i == 0 else MUTED))
    if t.warnings:
        activity.add_row(Text("ALERT / " + t.warnings[0][:65], style=f"bold {AMBER}"), "")
    activity_panel = Panel(activity, border_style="#46537A", box=box.ROUNDED,
                           title="◈ CHANNEL TELEMETRY", title_align="left",
                           padding=(0, 1) if compact else (1, 2))
    safety = ("◇ EXACT ALLOWLIST  ◇ NO OVERWRITES  ◇ ORIGINALS PROTECTED  ◇ NO WEB PUBLISHING"
              if compact else
              "◇ EXACT FILE ALLOWLIST    ◇ NO OVERWRITES    ◇ ORIGINALS PROTECTED    ◇ NO HTML PUBLISHING")
    footer = Text(safety, style=f"bold {MUTED}", justify="center")
    if t.demo:
        footer.append("\nSIMULATION ONLY. NO RCLONE EXECUTION OR R2 REQUESTS.",
                      style=f"bold {AMBER}")
    return Group(Panel(headline, box=box.DOUBLE, border_style=VIOLET,
                       padding=(0, 1) if compact else (1, 2)),
                 metrics, progress_panel, activity_panel, Align.center(footer))



STAGES = (
    ("LOCAL ARCHIVE", "Validate 8,412 optimised photos and 16,823 objects"),
    ("R2 INVENTORY", "Read existing object names, sizes and MIME types"),
    ("SAFETY INTERLOCKS", "Verify the 20 pilot objects and calculate missing keys"),
)


class PreflightDisplay:
    """Read-only activity display; never synthesises percentages or file counts."""

    def __init__(self):
        self.stage = 0
        self.started = time.monotonic()
        self.stage_started = self.started
        self.completed = False
        self.note = "READ ONLY // NO DATA TRANSFER"
        self.live = None
        self.console = None

    def render(self):
        from rich import box
        from rich.console import Group
        from rich.panel import Panel
        from rich.spinner import Spinner
        from rich.table import Table
        from rich.text import Text

        headline = Text("◆  McRETRO  /  ", style=f"bold {CYAN}")
        headline.append("PHOTON UPLINK", style=f"bold {VIOLET}")
        headline.append("    ◇  PREFLIGHT", style=f"bold {AMBER}")
        lines = Table.grid(expand=True, padding=(0, 1))
        lines.add_column(width=3)
        lines.add_column()
        for idx, (name, detail) in enumerate(STAGES):
            if idx < self.stage or self.completed:
                mark = Text("✓", style=f"bold {MINT}")
                colour = MINT
            elif idx == self.stage:
                mark = Spinner("dots", style=CYAN)
                colour = CYAN
            else:
                mark = Text("○", style=MUTED)
                colour = MUTED
            lines.add_row(mark, Text(name, style=f"bold {colour}"))
            lines.add_row("", Text(detail, style=MUTED))
        footer = Text(
            "◇ NO UPLOADS   ◇ NO OVERWRITES   ◇ ORIGINAL 26 GB ARCHIVE PROTECTED",
            style=f"bold {MUTED}",
            justify="center",
        )
        elapsed = pretty_time(time.monotonic() - self.started)
        footer.append("\nELAPSED " + elapsed + "  •  " + self.note,
                      style=f"bold {MINT}" if self.completed else f"bold {AMBER}")
        return Panel(Group(headline, lines, footer), box=box.DOUBLE,
                     border_style=VIOLET, padding=(1, 2))

    def advance(self, stage: int) -> None:
        if stage not in (0, 1, 2) or stage < self.stage:
            raise ValueError("Invalid preflight stage transition")
        if stage != self.stage:
            self.stage_started = time.monotonic()
        self.stage = stage
        if self.live is not None:
            self.live.update(self.render())
        elif self.console is not None:
            name = STAGES[stage][0]
            self.console.print(f"[{CYAN}]◆ PREFLIGHT[/]  {name} ...")

    def finish(self) -> None:
        self.completed = True
        self.note = "PREFLIGHT COMPLETE // AWAITING EXPLICIT UPLOAD COMMAND"
        if self.live is not None:
            self.live.update(self.render())
        elif self.console is not None:
            self.console.print(f"[{MINT}]✓ PREFLIGHT COMPLETE[/]  No images transferred.")


@contextmanager
def preflight_display():
    """Animated activity during blocking local validation and remote listing.

    Stage changes are driven by completed operations, not invented progress.
    No R2 calls or file operations are made by the display itself.
    """
    try:
        require_rich()
    except ValueError:
        # Preserve the original dependency-free read-only preflight when Rich
        # is not installed in the Python interpreter used to launch this CLI.
        class PlainPreflight:
            def advance(self, stage: int) -> None:
                if stage not in (1, 2):
                    raise ValueError("Invalid preflight stage")
                print(f"PREFLIGHT: {STAGES[stage][0]} ...", flush=True)

            def finish(self) -> None:
                print("PREFLIGHT COMPLETE (read-only; nothing uploaded)", flush=True)

        print(f"PREFLIGHT: {STAGES[0][0]} ...", flush=True)
        yield PlainPreflight()
        return

    from rich.console import Console
    from rich.live import Live

    ui = PreflightDisplay()
    ui.console = Console()
    if not ui.console.is_terminal:
        ui.advance(0)
        yield ui
    else:
        with Live(get_renderable=ui.render, console=ui.console, refresh_per_second=8,
                  transient=False, vertical_overflow="crop") as live:
            ui.live = live
            yield ui


def show_demo(duration: float = 7) -> None:
    """An animated, clearly labelled preview. No access to R2 or the photo tree."""
    require_rich()
    from rich.console import Console
    from rich.live import Live

    console = Console()
    telemetry = Telemetry(total_files=16803, total_bytes=4270000000,
                          already_present=20, demo=True)
    telemetry.set_demo_position(0)
    if not console.is_terminal:
        console.print(dashboard(telemetry))
        console.print("[yellow]Simulation only; animation needs an interactive terminal.[/]")
        return
    with Live(dashboard(telemetry), console=console, refresh_per_second=8,
              transient=False, vertical_overflow="crop") as live:
        start = time.monotonic()
        while True:
            fraction = (time.monotonic() - start) / max(.1, duration)
            if fraction >= 1:
                break
            telemetry.set_demo_position(1 - (1 - fraction) ** 2)
            if not telemetry.recent and fraction > .2:
                telemetry.recent.appendleft("full/accessories/eeprom-programmers/IMG_0835.jxl")
            live.update(dashboard(telemetry))
            time.sleep(.125)
        telemetry.set_demo_position(1)
        live.update(dashboard(telemetry))
    console.print("[bold #FFD18C]DEMO FINISHED[/]  No files transferred or cloud requests made.")


def run_upload_with_dashboard(command: list[str], payload: bytes,
                              total_bytes: int, total_files: int,
                              existing_files: int) -> int:
    """Display real JSON stats from the supplied already-authorised rclone command."""
    require_rich()
    from rich.console import Console
    from rich.live import Live

    console = Console()
    telemetry = Telemetry(total_files, total_bytes, existing_files)
    proc = subprocess.Popen(command, stdin=subprocess.PIPE,
                            stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    errors: list[str] = []

    def send_allowlist():
        try:
            assert proc.stdin is not None
            proc.stdin.write(payload)
            proc.stdin.close()
        except (BrokenPipeError, OSError) as exc:
            errors.append(f"rclone failed reading allowlist: {exc}")

    writer = threading.Thread(target=send_allowlist, daemon=True)
    writer.start()
    try:
        with Live(dashboard(telemetry), console=console, refresh_per_second=8,
                  transient=False, vertical_overflow="crop") as live:
            assert proc.stderr is not None
            last_render = 0.0
            for line in proc.stderr:
                updated = telemetry.consume(line)
                now = time.monotonic()
                if updated and now - last_render >= .18:
                    live.update(dashboard(telemetry))
                    last_render = now
            return_code = proc.wait()
            writer.join(timeout=5)
            telemetry.phase = ("TRANSFER COMPLETE / READBACK PENDING"
                               if return_code == 0 else
                               f"TRANSFER INTERRUPTED / EXIT {return_code}")
            live.update(dashboard(telemetry))
    except KeyboardInterrupt:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
            proc.wait()
        raise
    if errors and return_code == 0:
        raise ValueError("; ".join(errors))
    return return_code
