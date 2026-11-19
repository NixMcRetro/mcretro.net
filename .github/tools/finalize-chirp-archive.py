#!/usr/bin/env python3
"""Verify and localise a pinned, full Channel Chirp Jekyll site snapshot.

Runs only against the freshly built _site/chirp/archive directory.
Never contacts live websites or uploads/deletes hosted objects.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urlsplit

EXPECTED_SOURCE_POSTS = 229
EXPECTED_CLIPS = 509
EXPECTED_IMAGES = 16
BASE = "/chirp/archive"

# Keep links to the main global Pagefind search asset, which is generated
# later in the McRetro Pages workflow, rather than in the old site snapshot.
ROOT_EXCEPTIONS = ("/pagefind/",)

def digest(file: Path) -> str:
    h = hashlib.sha256()
    with file.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


ATTR = re.compile(r'(?P<prefix>\b(?:href|src|data-manifest|data-audio-root)\s*=\s*)(?P<quote>["\'])(?P<value>[^"\']+)(?P=quote)', re.I)


def localise(value: str) -> str:
    if value.startswith("//"):
        return value
    if value.startswith("/") and not value.startswith(BASE + "/") and value != BASE:
        if value.startswith(ROOT_EXCEPTIONS):
            return value
        return BASE + value
    parsed = urlsplit(value)
    if parsed.scheme in {"http", "https"} and parsed.netloc.lower() in {
        "channelchirp.com", "www.channelchirp.com"
    }:
        path = parsed.path or "/"
        url = BASE + path
        if parsed.query:
            url += "?" + parsed.query
        if parsed.fragment:
            url += "#" + parsed.fragment
        return url
    return value


def validate(source: Path, dest: Path) -> dict:
    if not source.is_dir() or not dest.is_dir():
        raise ValueError("Source checkout and completed static build are required")
    post_files = sorted((source / "_posts").glob("*.md"))
    if len(post_files) != EXPECTED_SOURCE_POSTS:
        raise ValueError(f"Original post count changed: {len(post_files)}; expected {EXPECTED_SOURCE_POSTS}")

    original_audio = sorted((source / "assets/soundborb/audio").glob("*.mp3"))
    copied_audio = sorted((dest / "assets/soundborb/audio").glob("*.mp3"))
    if len(original_audio) != EXPECTED_CLIPS or len(copied_audio) != EXPECTED_CLIPS:
        raise ValueError(f"Soundborb audio incomplete: source={len(original_audio)}, built={len(copied_audio)}")
    original_names = {p.name for p in original_audio}
    if original_names != {p.name for p in copied_audio}:
        raise ValueError("Original and copied Soundborb MP3 inventories differ")
    for original in original_audio:
        built = dest / "assets/soundborb/audio" / original.name
        if original.stat().st_size != built.stat().st_size or digest(original) != digest(built):
            raise ValueError(f"MP3 downloaded-byte mismatch: {original.name}")

    manifest = json.loads((dest / "assets/soundborb/clips.json").read_text(encoding="utf-8"))
    clips = manifest.get("clips")
    if not isinstance(clips, list) or len(clips) != EXPECTED_CLIPS:
        raise ValueError("Soundborb manifest does not describe exactly 509 clips")
    ids: set[str] = set()
    references: set[str] = set()
    for item in clips:
        clip_id, relative = item.get("id"), item.get("src")
        if not isinstance(clip_id, str) or clip_id in ids:
            raise ValueError("Soundborb clip ID invalid or duplicated")
        if not isinstance(relative, str) or not re.fullmatch(r"audio/[A-Za-z0-9_-]+\.mp3", relative):
            raise ValueError(f"Unsafe clip audio reference: {relative!r}")
        ids.add(clip_id)
        references.add(relative[6:])
    if references != original_names:
        raise ValueError("MP3 files and JSON catalogue references differ")

    original_images = {p.name for p in (source / "images").iterdir() if p.is_file()}
    copied_images = {p.name for p in (dest / "images").iterdir() if p.is_file()}
    if len(original_images) != EXPECTED_IMAGES or original_images != copied_images:
        raise ValueError(f"Historical image inventory incomplete: {len(copied_images)} copied")
    for name in original_images:
        if digest(source / "images" / name) != digest(dest / "images" / name):
            raise ValueError(f"Historical image bytes differ: {name}")
    for relative in ["assets/soundborb/clips.json", "js/soundborb.js",
                     "css/soundborb.css", "css/soundborb-site.css"]:
        if digest(source / relative) != digest(dest / relative):
            raise ValueError(f"Historical supporting asset bytes differ: {relative}")


    rendered = 0
    for article in post_files:
        fm = article.read_text(encoding="utf-8")
        # Avoid matching across YAML line breaks into the Markdown content.
        permalink_line = next((line for line in fm.splitlines()
                               if line.startswith("permalink:")), None)
        if permalink_line is None:
            raise ValueError(f"Missing canonical permalink: {article.name}")
        raw = permalink_line.partition(":")[2].strip()
        if raw and raw[0] in ("'", '"') and raw[-1] == raw[0]:
            raw = raw[1:-1]
        if not raw.startswith("/") or not raw.endswith("/"):
            raise ValueError(f"Unexpected permalink format: {article.name}")
        slug = raw.strip("/")
        target = dest / slug / "index.html"
        if not target.is_file():
            raise ValueError(f"Missing generated original article: {slug}")
        rendered += 1

    for page in ["index.html", "pudge/index.html", "tillie/index.html",
                 "chip/index.html", "timeline/index.html", "diet/index.html",
                 "soundborb/index.html", "adventures/index.html"]:
        if not (dest / page).is_file():
            raise ValueError(f"Missing historical feature page: {page}")

    return {"original_posts": rendered, "mp3": len(copied_audio),
            "images": len(copied_images), "clip_manifest": len(clips)}


def rewrite_html(dest: Path) -> int:
    updated = 0
    for path in dest.rglob("*.html"):
        html = path.read_text(encoding="utf-8")
        def replace(match: re.Match) -> str:
            before = match.group("value")
            after = localise(before)
            if before == after:
                return match.group(0)
            return match.group("prefix") + match.group("quote") + after + match.group("quote")
        patched = ATTR.sub(replace, html)
        if patched != html:
            path.write_text(patched, encoding="utf-8")
            updated += 1

    # An embedded CNAME must never attempt to claim the former domain.
    old_cname = dest / "CNAME"
    if old_cname.exists():
        old_cname.unlink()
    return updated


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--source", type=Path, required=True)
    ap.add_argument("--site", type=Path, required=True)
    args = ap.parse_args()

    source = args.source.resolve()
    site = args.site.resolve()
    counts = validate(source, site)
    rewritten = rewrite_html(site)

    # If an old site-local link survives, it might rely on channelchirp.com
    # once that domain has been retired. Fail closed.
    for html in site.rglob("*.html"):
        text = html.read_text(encoding="utf-8")
        if re.search(r'(?:href|src)\s*=\s*["\']https?://(?:www\.)?channelchirp\.com/', text, re.I):
            raise ValueError(f"Unmigrated old-domain HTML link: {html}")
    print(f"PASS: Channel Chirp snapshot has {counts['original_posts']} original articles, "
          f"{counts['mp3']} MP3s, {counts['images']} images, "
          f"{counts['clip_manifest']} verified soundboard entries; "
          f"localised links in {rewritten} HTML pages.")
    print("NOTE: This covers the original published repository; image metadata, private details "
          "and third-party dependencies require owner review before the draft PR can merge.")


if __name__ == "__main__":
    main()
