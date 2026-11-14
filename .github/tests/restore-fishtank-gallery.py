#!/usr/bin/env python3
"""Reconstruct unchanged Fish Tank World JPEGs for GitHub Pages.

Large original photos were committed as contiguous 900,000-byte binary parts
because single-blob uploads were unreliable. This assembles the exact bytes,
checks every expected photograph and thumbnail, and fails on missing parts.
"""
from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PARTS = ROOT / "homepages/fishtankworld/gallery-source/Fish"
GALLERY = ROOT / "homepages/fishtankworld/gallery/Fish"

# Exact sizes from the owner's original Google Drive photo archive.
EXPECTED_SIZES = {
    "barry1.jpg": 3075193,
    "IMG_20170717_210214.jpg": 3860693,
    "IMG_20170717_210231.jpg": 4084169,
    "IMG_20170903_113958.jpg": 4110340,
    "IMG_20171021_190141.jpg": 5576718,
    "IMG_20180124_213538.jpg": 4918237,
    "IMG_20180124_213603.jpg": 5035241,
    "IMG_20180124_213617.jpg": 4890880,
    "IMG_20180124_213723.jpg": 4503385,
    "IMG_20180215_225656.jpg": 5720599,
    "IMG_20180215_225712.jpg": 4424961,
    "IMG_20180330_005556.jpg": 4082226,
    "IMG_20180330_005658.jpg": 3908256,
}


def verify_jpeg(path: Path, expected_size: int) -> None:
    if not path.is_file():
        raise RuntimeError(f"Missing archival JPEG: {path}")
    size = path.stat().st_size
    if size != expected_size:
        raise RuntimeError(f"Wrong size for {path}: {size} (expected {expected_size})")
    with path.open("rb") as photo:
        start = photo.read(3)
        photo.seek(-2, 2)
        end = photo.read(2)
    if not start.startswith(b"\xff\xd8") or end != b"\xff\xd9":
        raise RuntimeError(f"Invalid JPEG boundaries: {path}")


def check_complete_gallery(gallery: Path) -> None:
    for name, expected_size in EXPECTED_SIZES.items():
        verify_jpeg(gallery / name, expected_size)
        thumbnail = gallery / name.replace(".jpg", "_thumb.jpg")
        if not thumbnail.is_file() or thumbnail.stat().st_size == 0:
            raise RuntimeError(f"Missing thumbnail: {thumbnail}")


def reconstruct() -> None:
    GALLERY.mkdir(parents=True, exist_ok=True)
    for name, expected_size in EXPECTED_SIZES.items():
        if name == "barry1.jpg":
            continue  # Already committed as a complete, original JPEG.
        found = list(PARTS.glob(name + ".part*"))
        numbered = []
        for part in found:
            match = re.fullmatch(re.escape(name) + r"\.part(\d{2})", part.name)
            if not match:
                raise RuntimeError(f"Unexpected photo segment: {part}")
            numbered.append((int(match.group(1)), part))
        numbered.sort()
        if not numbered or [number for number, _ in numbered] != list(range(len(numbered))):
            raise RuntimeError(f"Missing or non-contiguous segments for {name}")

        destination = GALLERY / name
        temporary = GALLERY / (name + ".restoring")
        try:
            with temporary.open("wb") as complete:
                for _, part in numbered:
                    with part.open("rb") as source:
                        shutil.copyfileobj(source, complete)
            verify_jpeg(temporary, expected_size)
            temporary.replace(destination)
        finally:
            temporary.unlink(missing_ok=True)

    check_complete_gallery(GALLERY)
    print(f"Restored and verified {len(EXPECTED_SIZES)} original gallery JPEGs.")


def verify_built_site(destination: Path) -> None:
    built_gallery = destination / "homepages/fishtankworld/gallery"
    check_complete_gallery(built_gallery / "Fish")
    index = built_gallery / "index.html"
    if not index.is_file():
        raise RuntimeError(f"Missing built gallery page: {index}")
    markup = index.read_text(encoding="utf-8")
    for name in EXPECTED_SIZES:
        if f'./Fish/{name}"' not in markup:
            raise RuntimeError(f"Gallery page has no link to {name}")
    if (destination / "homepages/fishtankworld/gallery-source").exists():
        raise RuntimeError("Source JPEG parts must not be published.")
    print("Verified all 13 photographs and thumbnails in built site.")


if __name__ == "__main__":
    try:
        if len(sys.argv) == 3 and sys.argv[1] == "--verify-built":
            verify_built_site(Path(sys.argv[2]))
        elif len(sys.argv) == 1:
            reconstruct()
        else:
            raise RuntimeError("Usage: restore-fishtank-gallery.py [--verify-built _site]")
    except (OSError, RuntimeError) as error:
        sys.exit(f"Fish Tank World gallery failure: {error}")
