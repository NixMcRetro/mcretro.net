#!/usr/bin/env python3
"""Prevent silent deletion of blog images, GIFs, and embedded media in PRs.

Usage: python3 scripts/check_post_media.py BASE_SHA HEAD_SHA [true|false]
The optional third argument acknowledges intentional removals, supplied by
an explicit 'intentional-media-removal' PR label.
"""
import re
import subprocess
import sys

IMAGE = re.compile(r'!\[[^\]\n]*\]\(\s*(?:<([^>]+)>|([^\s)]+))', re.I)
LIQUID = re.compile(r'\{%\s*include\s+([^\s%]*(?:youtube|video|image|figure)[^\s%]*)\s+([^%]*?)\s*%\}', re.I)
HTML = re.compile(r'<(?:img|iframe|video|source)\b[^>]*\b(?:src|poster)\s*=\s*["\']([^"\']+)["\']', re.I)


def git(*args):
    return subprocess.check_output(["git", *args], text=True)


def media(text):
    found = []
    for match in IMAGE.finditer(text):
        found.append((match.start(), "image", (match.group(1) or match.group(2)).strip()))
    for match in LIQUID.finditer(text):
        found.append((match.start(), "include", f"{match.group(1)} {match.group(2).strip()}"))
    for match in HTML.finditer(text):
        found.append((match.start(), "html", match.group(1).strip()))
    return [item[1:] for item in sorted(found)]


def missing_subsequence(before, after):
    i = 0
    missing = []
    for item in before:
        while i < len(after) and after[i] != item:
            i += 1
        if i == len(after):
            missing.append(item)
        else:
            i += 1
    return missing


def main():
    if len(sys.argv) not in (3, 4):
        sys.exit("Usage: check_post_media.py BASE_SHA HEAD_SHA [true|false]")
    base, head = sys.argv[1:3]
    approved = len(sys.argv) == 4 and sys.argv[3].lower() == "true"
    changed = subprocess.check_output(
        ["git", "diff", "--name-only", "-z", "--diff-filter=ACMR", base, head, "--", "_posts/"]
    ).decode().split("\0")
    failures = {}
    checked = 0
    for path in filter(None, changed):
        if not path.endswith(".md"):
            continue
        try:
            old = git("show", f"{base}:{path}")
        except subprocess.CalledProcessError:
            continue  # New article, no media baseline
        new = git("show", f"{head}:{path}")
        before = media(old)
        after = media(new)
        checked += 1
        lost = missing_subsequence(before, after)
        if lost:
            failures[path] = lost

    if failures:
        print("Article media references removed or reordered:")
        for path, lost in failures.items():
            print(f"\n{path}:")
            for kind, value in lost:
                print(f"  - {kind}: {value}")
        if not approved:
            sys.exit(
                "\nMEDIA CHECK FAILED. Restore these references. "
                "Only an explicitly approved intentional-media-removal PR label can bypass this check."
            )
        print("\nIntentional removals acknowledged by PR label.")
    else:
        print(f"Article media check passed for {checked} existing Markdown posts.")


if __name__ == "__main__":
    main()
