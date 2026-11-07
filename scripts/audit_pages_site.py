#!/usr/bin/env python3
"""Report the final Jekyll + Pagefind output without modifying the site."""

from __future__ import annotations

import os
import sys
from collections import Counter
from pathlib import Path

# Use decimal GB here so the check is conservative about a 1 GB site limit.
PAGES_LIMIT_BYTES = 1_000_000_000
IMAGE_EXTENSIONS = {
    ".avif", ".bmp", ".gif", ".jpeg", ".jpg", ".jxl", ".png",
    ".svg", ".tif", ".tiff", ".webp",
}


def mb(size: int) -> str:
    return f"{size / 1_000_000:,.2f} MB"


def category(relative: Path) -> str:
    parts = relative.parts
    if parts[0] == "assets" and len(parts) > 2:
        return "/".join(parts[:2])
    if parts[0] in {"pagefind", "homepages", "archive", "blog"}:
        return parts[0]
    if len(parts) > 1 and relative.name == "index.html":
        return "article pages and other root-level directories"
    return "other site files"


def scan(root: Path) -> tuple[int, int, Counter[str], Counter[str], Counter[str], list[tuple[int, str]]]:
    counts: Counter[str] = Counter()
    bytes_by_area: Counter[str] = Counter()
    bytes_by_image_year: Counter[str] = Counter()
    largest: list[tuple[int, str]] = []
    total = 0
    file_count = 0

    for current, _dirs, names in os.walk(root):
        for name in names:
            path = Path(current) / name
            if path.is_symlink():
                raise RuntimeError(f"Site contains an unexpected symlink: {path}")
            if not path.is_file():
                continue

            relative = path.relative_to(root)
            size = path.stat().st_size
            file_count += 1
            total += size
            bytes_by_area[category(relative)] += size

            suffix = path.suffix.lower()
            if suffix in IMAGE_EXTENSIONS:
                counts["images"] += 1
                if relative.parts[:2] == ("assets", "images"):
                    year = relative.parts[2] if len(relative.parts) > 3 else "misc"
                    bytes_by_image_year[year] += size
            if suffix == ".html":
                counts["HTML files"] += 1
            if relative.parts[0] == "pagefind":
                counts["Pagefind files"] += 1

            largest.append((size, relative.as_posix()))
    largest.sort(reverse=True)
    return total, file_count, counts, bytes_by_area, bytes_by_image_year, largest[:15]


def audit(root: Path) -> int:
    if not root.is_dir():
        print(f"ERROR: generated site directory does not exist: {root}", file=sys.stderr)
        return 2

    total, files, counts, areas, image_years, largest = scan(root)
    if not files:
        print("ERROR: no files found in generated site", file=sys.stderr)
        return 2

    report = [
        "# GitHub Pages build-output audit",
        "",
        "This report covers the final Jekyll and Pagefind output directory. "
        "It does not change any site files or trigger a Pages deployment.",
        "",
        f"- Total size: **{mb(total)}** ({total:,} bytes; {total / (1024 ** 2):,.2f} MiB)",
        f"- Total files: **{files:,}**",
        f"- HTML files: **{counts['HTML files']:,}**",
        f"- Images: **{counts['images']:,}**",
        f"- Pagefind files: **{counts['Pagefind files']:,}**",
        f"- Conservative size threshold: **{mb(PAGES_LIMIT_BYTES)}**",
        "",
        "## Output directories",
        "| Area | Size |",
        "| --- | ---: |",
    ]
    for name, size in areas.most_common():
        report.append(f"| `{name}` | {mb(size)} |")

    report += ["", "## Image directories", "| Directory | Size |", "| --- | ---: |"]
    for name, size in image_years.most_common():
        report.append(f"| `assets/images/{name}` | {mb(size)} |")

    report += ["", "## Largest published files", "| File | Size |", "| --- | ---: |"]
    for size, name in largest:
        report.append(f"| `{name}` | {mb(size)} |")

    passed = total <= PAGES_LIMIT_BYTES
    report += [
        "",
        f"**1 GB size check: {'PASS' if passed else 'FAIL'}**.",
        "A passing result does not establish that GitHub Pages file synchronisation will succeed.",
    ]
    text = "\n".join(report) + "\n"
    print(text)
    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a", encoding="utf-8") as stream:
            stream.write(text)
    return 0 if passed else 1


if __name__ == "__main__":
    try:
        raise SystemExit(audit(Path(sys.argv[1] if len(sys.argv) > 1 else "_site")))
    except (OSError, RuntimeError) as exc:
        print(f"ERROR: audit failed: {exc}", file=sys.stderr)
        raise SystemExit(2) from exc
