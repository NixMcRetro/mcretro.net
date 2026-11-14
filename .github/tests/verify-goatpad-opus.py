#!/usr/bin/env python3
"""Verify GOATPAD's 24 kbps Opus-only source and published site.

The original Ogg files live solely in Git history, not the current tree.
No encoding is performed during Jekyll builds.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ALIASES = {28: 16, 23: 18, 36: 21, 32: 22, 37: 25, 88: 38, 64: 46, 62: 47}
ALL_PADS = {row * 10 + column for row in range(1, 9) for column in range(1, 9)}
EXPECTED = ALL_PADS - set(ALIASES)


def verify_audio(audio: Path) -> int:
    if not audio.is_dir():
        raise ValueError(f"Missing GOATPAD audio directory: {audio}")
    files = sorted(path for path in audio.iterdir() if path.is_file())
    actual = {int(path.stem) for path in files if path.suffix == ".opus" and path.stem.isdigit()}
    if actual != EXPECTED or len(files) != len(EXPECTED):
        raise ValueError(
            f"GOATPAD must have exactly 56 unique .opus files, no legacy audio: "
            f"got {len(files)} files; missing {sorted(EXPECTED - actual)}, "
            f"unexpected {sorted(actual - EXPECTED)}"
        )
    total = 0
    for path in files:
        data = path.read_bytes()
        if path.suffix != ".opus" or not data.startswith(b"OggS") or b"OpusHead" not in data[:128]:
            raise ValueError(f"Invalid or non-Opus audio: {path}")
        total += len(data)
    return total


def main(site: Path) -> None:
    source_bytes = verify_audio(ROOT / "homepages/goatpad/audio")
    built_bytes = verify_audio(site / "homepages/goatpad/audio")
    if source_bytes != built_bytes:
        raise ValueError(f"Deployed audio differs in size from source: {source_bytes} vs {built_bytes}")

    app = (site / "homepages/goatpad/main.js").read_text(encoding="utf-8")
    if '.opus' not in app or any(ext in app for ext in ('.ogg', '.mp3', '.wav')):
        raise ValueError("GOATPAD runtime must use only Opus with no audio fallback")
    html = (site / "homepages/goatpad/index.html").read_text(encoding="utf-8")
    if 'href="./icon.png"' not in html or 'href="./LICENSE"' not in html:
        raise ValueError("GOATPAD must retain its PNG favicon and original MIT licence link")
    if not (site / "homepages/goatpad/LICENSE").is_file():
        raise ValueError("GOATPAD original MIT licence notice was not published")
    print(f"PASS: GOATPAD source and deployment both contain exactly 56 Opus recordings "
          f"({built_bytes:,} bytes); 64 accessible pads, no Ogg/MP3/fallbacks, MIT notice present")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", default="_site")
    args = parser.parse_args()
    try:
        main(Path(args.site).resolve())
    except (OSError, ValueError) as error:
        sys.exit(f"GOATPAD Opus verification failed: {error}")
