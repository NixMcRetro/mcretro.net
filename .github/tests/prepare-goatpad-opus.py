#!/usr/bin/env python3
"""Build an Opus-only GOATPAD deployment from the unmodified historical recordings.

The tracked .ogg recordings are source material only. GitHub Pages receives
56 unique .opus files, not the .ogg sources or alternate-format fallbacks.
"""
from __future__ import annotations

import argparse
import hashlib
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "homepages/goatpad/audio"
ALIASES = {
    28: 16, 23: 18, 36: 21, 32: 22,
    37: 25, 88: 38, 64: 46, 62: 47,
}
EXPECTED = {int(f"{row}{column}") for row in range(1, 9) for column in range(1, 9)}
CANONICAL = EXPECTED - set(ALIASES)


def fail(message: str) -> None:
    raise RuntimeError(message)


def validate_source() -> None:
    names = {int(p.stem) for p in SOURCE.glob("*.ogg") if p.stem.isdigit()}
    if names != EXPECTED:
        fail(f"Expected 64 archival source sounds, found {len(names)}; missing={EXPECTED - names}")
    for alias, target in ALIASES.items():
        left = hashlib.sha256((SOURCE / f"{alias}.ogg").read_bytes()).digest()
        right = hashlib.sha256((SOURCE / f"{target}.ogg").read_bytes()).digest()
        if left != right:
            fail(f"Original files {alias}.ogg and {target}.ogg are no longer identical")


def encode(site: Path, bitrate: int) -> None:
    if not shutil.which("ffmpeg"):
        fail("FFmpeg is required to produce the Opus-only deployment")
    validate_source()
    output = site / "homepages/goatpad/audio"
    output.mkdir(parents=True, exist_ok=True)
    # Encode each distinct recording only once. The browser maps eight
    # duplicate pad IDs to their identical canonical sound.
    for number in sorted(CANONICAL):
        source = SOURCE / f"{number}.ogg"
        target = output / f"{number}.opus"
        temporary = output / f"{number}.opus.encoding"
        command = [
            "ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(source), "-map", "0:a:0", "-c:a", "libopus",
            "-b:a", f"{bitrate}k", "-vbr", "on", "-compression_level", "8",
            "-application", "audio", "-f", "opus", str(temporary),
        ]
        try:
            subprocess.run(command, check=True, capture_output=True, text=True)
            data = temporary.read_bytes()
            if len(data) < 100 or not data.startswith(b"OggS") or b"OpusHead" not in data[:128]:
                fail(f"Invalid Opus output for pad {number}")
            temporary.replace(target)
        except subprocess.CalledProcessError as error:
            fail(f"FFmpeg failed to encode pad {number}: {error.stderr[-2000:]}")
        finally:
            temporary.unlink(missing_ok=True)

    # Only remove source formats after every Opus file passed checks.
    for original in output.glob("*.ogg"):
        original.unlink()
    # PNG is the site's only favicon: no need to publish the large .ico.
    (site / "homepages/goatpad/favicon.ico").unlink(missing_ok=True)
    verify(site, bitrate)


def verify(site: Path, bitrate: int | None = None) -> None:
    output = site / "homepages/goatpad/audio"
    actual = {int(p.stem) for p in output.glob("*.opus") if p.stem.isdigit()}
    if actual != CANONICAL:
        fail(f"Opus library mismatch: expected {len(CANONICAL)}, found {len(actual)}")
    others = [
        p.name for p in output.iterdir() if p.is_file() and p.suffix.lower() != ".opus"
    ]
    if others:
        fail(f"Deployment contains non-Opus audio files: {others}")
    opus_bytes = 0
    for key in CANONICAL:
        path = output / f"{key}.opus"
        data = path.read_bytes()
        if not data.startswith(b"OggS") or b"OpusHead" not in data[:128]:
            fail(f"Invalid Opus file for pad {key}")
        opus_bytes += len(data)
    app = (site / "homepages/goatpad/main.js").read_text(encoding="utf-8")
    if '".opus"' not in app and "'.opus'" not in app and "}.opus" not in app:
        fail("Soundboard does not request Opus samples")
    if ".ogg" in app or ".mp3" in app:
        fail("Soundboard must have no legacy audio fallback")
    page = (site / "homepages/goatpad/index.html").read_text(encoding="utf-8")
    if 'href="./icon.png"' not in page:
        fail("GOATPAD must use the lightweight PNG favicon")
    print(f"GOATPAD: {len(CANONICAL)} Opus files for 64 pads; "
          f"{opus_bytes:,} bytes ({opus_bytes / (1024 * 1024):.2f} MiB) "
          f"at {bitrate or 'recorded'} kbps; no alternate audio formats")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", default="_site", help="Jekyll output directory")
    parser.add_argument("--bitrate", type=int, choices=(24, 32, 48, 64), default=24)
    parser.add_argument("--verify", action="store_true")
    args = parser.parse_args()
    try:
        (verify if args.verify else encode)(Path(args.site).resolve(), args.bitrate)
    except (OSError, RuntimeError) as error:
        sys.exit(f"GOATPAD Opus build failure: {error}")
