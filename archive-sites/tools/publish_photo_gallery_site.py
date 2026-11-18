#!/usr/bin/env python3
"""Publish only the already-generated McRetro Photo Gallery website to R2.

Owner approval (17th November 2026): upload the existing gallery design.
Scope: 329 generated HTML pages, a *public-projected* albums.json,
one sitemap.xml and five self-hosted WOFF2 fonts (336 keys in total).
No photos (already present), File Server content, private source_path fields,
review sidecars, original 26 GB archive, root Cloudflare rewrite, or GitHub merge.

Default: read-only preflight. --upload: staged, exact-key, no-overwrite publish.
--verify: read-only check that the complete design exists and matches bytes.

The original private albums.generated.json and site/albums.json are NEVER
sent to R2. The browser-compatible public catalogue is built in a temporary
directory and is intentionally restricted to presentation fields.

This command is designed for the owner's Mac with rclone configured as r2:.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
import re
import struct
import shutil
import subprocess
import sys
import tempfile

from audit_gallery_staging import audit
from preview_mcretro_gallery import local_theme_fonts
from validate_r2_upload import DEFAULT_CONVERTED, DEFAULT_STAGE, FINAL_DESTINATION

EXPECTED_HTML = 329
EXPECTED_SITE = 331
EXPECTED_FONTS = 5
EXPECTED_PHOTOS = 16823
EXPECTED_PHOTOGRAPHS = 8412
EXPECTED_IMAGE_BYTES = 4276856102
EXPECTED_PUBLIC = EXPECTED_SITE + EXPECTED_FONTS

# The image URL and album title are already inherently public once the gallery
# launches. Do not additionally copy the original source filename into JSON.
# Existing browser JS derives a display name from the public JXL path instead.
PHOTO_FIELDS = ("path", "thumbnail", "title", "album")
ALBUM_FIELDS = ("id", "title", "path", "group")
FOLDER_FIELDS = ("path", "url", "name", "parent", "photo_count", "direct_photo_count")
REVIEW_FIELDS = ("alt", "caption", "scene_description", "components",
                 "search_terms", "date_taken")
MIME_BY_SUFFIX = {
    ".html": "text/html; charset=utf-8",
    ".xml": "application/xml",
    ".json": "application/json",
    ".woff2": "font/woff2",
}
SITE_ROOT = "photo-gallery/site"


def public_projection(private: dict) -> bytes:
    """Drop private source_path and all unknown/unapproved review attributes."""
    if private.get("schema_version") != 1:
        raise ValueError("Unknown photo gallery catalogue schema")
    albums, folders, photos = (private.get(k) for k in ("albums", "folders", "photos"))
    if not all(isinstance(items, list) for items in (albums, folders, photos)):
        raise ValueError("Malformed private gallery catalogue")
    output = {"schema_version": 1, "albums": [], "folders": [], "photos": []}
    for src in albums:
        if not isinstance(src, dict):
            raise ValueError("Invalid album record")
        output["albums"].append({k: src[k] for k in ALBUM_FIELDS if k in src})
    for src in folders:
        if not isinstance(src, dict):
            raise ValueError("Invalid folder record")
        output["folders"].append({k: src[k] for k in FOLDER_FIELDS if k in src})
    for src in photos:
        if not isinstance(src, dict):
            raise ValueError("Invalid photo record")
        item = {k: src[k] for k in PHOTO_FIELDS if k in src}
        if not all(k in item for k in ("path", "thumbnail", "title", "album")):
            raise ValueError("Missing essential public photo fields")
        for field in REVIEW_FIELDS:
            approved = src.get(field + "_approved") is True
            # A rejected/unreviewed value must never be sent to the public.
            item[field + "_approved"] = approved
            if approved:
                value = src.get(field)
                if not value or not isinstance(value, (str, list)):
                    raise ValueError("Approved field has invalid value: " + field)
                item[field] = value
            else:
                item[field] = [] if field in ("components", "search_terms") else (
                    None if field == "date_taken" else ""
                )
        output["photos"].append(item)
    return (json.dumps(output, ensure_ascii=False, separators=(",", ":"), sort_keys=True)
            + "\n").encode("utf-8")


# A small, conservative first line of defence. These regexes screen *public
# names and generated HTML*, not the private manifest's source_path values.
# Human review is still required for people, house numbers in pictures, etc.
SENSITIVE_PUBLIC_MARKERS = (
    ("local machine path", re.compile(
        r"(?i)(?:/users/[^/\s\"'<>]+/|/home/[^/\s\"'<>]+/|"
        r"[a-z]:\\users\\|file://|smb://|afp://)")),
    ("email address", re.compile(
        r"(?i)\b[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}\b")),
    ("potential secret token", re.compile(
        r"\b(?:AKIA|ASIA)[A-Z0-9]{16}\b|"
        r"(?i:-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)|"
        r"(?i:\b(?:api[_ -]?key|password|access[_ -]?token)\s*[:=])")),
    ("sensitive location/ID label", re.compile(
        r"(?i)(?:^|[/\s_.-])(?:gps|geotag|coordinates|latitude|longitude|"
        r"passport|birth.?certificate|medical.?record|driver.?licen[cs]e|"
        r"bank.?statement|tax.?file.?number|home.?address|confidential)"
        r"(?:$|[/\s_.-])")),
)


def is_retina_suffix_email_false_positive(value: str, pattern: re.Pattern) -> bool:
    """Recognise '@2x.jxl' and '@3x.jxl' display-scale filenames only.

    The broad email regex can mistake 'image@3x.jxl' for an email because
    '.jxl' looks like a top-level domain. Require EVERY email-shaped match
    to end precisely at that JXL filename suffix. An actual address such as
    'person@example.com@3x.jxl' must still be flagged.
    """
    if not re.search(r"(?i)@[23]x\.jxl$", value):
        return False
    matches = list(pattern.finditer(value))
    return bool(matches) and all(
        match.end() == len(value) and
        match.group(0).lower().endswith(".jxl")
        for match in matches
    )


class ExternalResourceScanner(HTMLParser):
    """Passive navigation links are fine; external auto-loaded resources are not."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.external = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        field = "href" if tag == "link" else "src"
        if tag not in ("script", "iframe", "img", "link", "video",
                       "audio", "source", "embed", "object"):
            return
        if tag == "object":
            field = "data"
        url = attributes.get(field) or ""
        if url.startswith(("http://", "https://", "//")):
            self.external.append(tag + " has external " + field)


JXL_CONTAINER_SIGNATURE = b"\x00\x00\x00\x0cJXL \r\n\x87\n"
PRIVATE_JXL_BOX_TYPES = {b"Exif", b"xml ", b"jumb", b"jbrd"}
KNOWN_JXL_BOX_TYPES = {
    b"JXL ", b"ftyp", b"jxll", b"jxlc", b"jxlp", b"jxli",
    b"jxic", b"jxld", b"jxlv", b"jxlm",
}


def jxl_private_boxes(path: Path) -> list[str]:
    """Inspect JXL container *box headers*, never the 26 GB source archive.

    Raw JPEG XL codestreams contain no EXIF/XML/JUMBF container boxes.
    For containers, jump between box headers without decoding pixel data.
    Reject unknown/custom boxes and compressed boxes conservatively.
    """
    size = path.stat().st_size
    with path.open("rb") as stream:
        signature = stream.read(12)
        if signature.startswith(b"\xff\x0a"):
            return []
        if signature != JXL_CONTAINER_SIGNATURE:
            raise ValueError("Invalid JPEG XL signature: " + path.name)
        stream.seek(0)
        flagged = []
        while stream.tell() < size:
            beginning = stream.tell()
            header = stream.read(8)
            if len(header) != 8:
                raise ValueError("Truncated JPEG XL box header: " + path.name)
            length, kind = struct.unpack(">I4s", header)
            header_size = 8
            if length == 1:
                extended = stream.read(8)
                if len(extended) != 8:
                    raise ValueError("Truncated JPEG XL extended box: " + path.name)
                length = struct.unpack(">Q", extended)[0]
                header_size = 16
            elif length == 0:
                length = size - beginning
            if length < header_size or beginning + length > size:
                raise ValueError("Invalid JPEG XL box length: " + path.name)
            if kind in PRIVATE_JXL_BOX_TYPES:
                flagged.append(kind.decode("ascii", "replace").strip())
            elif kind == b"brob":
                # Brotli-compressed boxes can conceal Exif/XMP/JUMBF data.
                if length - header_size < 4:
                    raise ValueError("Invalid Brotli metadata box")
                inner = stream.read(4)
                flagged.append("compressed " + inner.decode("ascii", "replace").strip())
            elif kind not in KNOWN_JXL_BOX_TYPES:
                flagged.append("unknown " + kind.decode("ascii", "replace").strip())
            stream.seek(beginning + length)
        return flagged


def gif_metadata_extensions(path: Path) -> list[str]:
    """Parse actual GIF extension blocks, ignoring image data and loop controls.

    Never output comment/application values: report only structural types.
    This avoids matching arbitrary '\x21\xfe' bytes inside pixel data.
    """
    data = path.read_bytes()
    if len(data) < 14 or data[:6] not in (b"GIF87a", b"GIF89a"):
        raise ValueError("Invalid GIF structure: " + path.name)
    packed = data[10]
    index = 13 + (3 * (1 << ((packed & 7) + 1)) if packed & 128 else 0)
    findings = []

    def skip_subblocks(pos: int) -> int:
        while True:
            if pos >= len(data):
                raise ValueError("Truncated GIF data sub-block")
            length = data[pos]
            pos += 1
            if pos + length > len(data):
                raise ValueError("Truncated GIF extension data")
            pos += length
            if length == 0:
                return pos

    while index < len(data):
        marker = data[index]
        index += 1
        if marker == 0x3B:  # GIF trailer
            if index != len(data):
                findings.append("trailing data after GIF trailer")
            return findings
        if marker == 0x21:  # extension introducer
            if index >= len(data):
                raise ValueError("Truncated GIF extension")
            label = data[index]
            index += 1
            if index >= len(data):
                raise ValueError("Truncated GIF extension block size")
            header_len = data[index]
            index += 1
            if index + header_len > len(data):
                raise ValueError("Truncated GIF extension header")
            header = data[index:index + header_len]
            index += header_len
            if label == 0xFE:
                findings.append("GIF Comment extension")
            elif label == 0xFF:
                if header in (b"NETSCAPE2.0", b"ANIMEXTS1.0"):
                    pass  # ordinary animation loop control, not a privacy alert
                elif header == b"XMP DataXMP":
                    findings.append("GIF XMP application extension")
                else:
                    findings.append("other GIF application extension")
            elif label == 0x01:
                findings.append("GIF Plain Text extension")
            elif label not in (0xF9,):
                findings.append("unrecognised GIF extension")
            index = skip_subblocks(index)
            continue
        if marker == 0x2C:  # image descriptor
            if index + 9 > len(data):
                raise ValueError("Truncated GIF frame descriptor")
            local_packed = data[index + 8]
            index += 9
            if local_packed & 128:
                index += 3 * (1 << ((local_packed & 7) + 1))
            if index >= len(data):
                raise ValueError("Truncated GIF LZW data")
            index += 1  # LZW minimum code size
            index = skip_subblocks(index)
            continue
        raise ValueError("Unexpected GIF block marker")
    raise ValueError("GIF trailer missing")


def gif_extension_privacy_details(path: Path) -> list[dict]:
    """Report GIF extension TYPES and risky-pattern categories, not values.

    This is only an inspection helper: the publication gate continues to
    block any GIF Comment or unknown Application extension regardless of this
    diagnostic's result. Never print raw payloads or application identifiers.
    """
    data = path.read_bytes()
    if len(data) < 14 or data[:6] not in (b"GIF87a", b"GIF89a"):
        raise ValueError("Invalid GIF signature")
    packed = data[10]
    index = 13 + (3 * (1 << ((packed & 7) + 1)) if packed & 128 else 0)
    results = []

    def blocks(position: int) -> tuple[int, bytes]:
        pieces = []
        while True:
            if position >= len(data):
                raise ValueError("Truncated GIF extension data")
            count = data[position]
            position += 1
            if position + count > len(data):
                raise ValueError("Invalid GIF extension length")
            if count:
                pieces.append(data[position:position + count])
            position += count
            if count == 0:
                return position, b"".join(pieces)

    while index < len(data):
        marker = data[index]
        index += 1
        if marker == 0x3B:
            if index != len(data):
                results.append({"type": "trailing GIF bytes", "bytes": len(data) - index,
                                "text_like": False, "signals": ["unclassified"]})
            return results
        if marker == 0x21:
            if index + 2 > len(data):
                raise ValueError("Truncated GIF metadata extension")
            label = data[index]
            count = data[index + 1]
            index += 2
            if index + count > len(data):
                raise ValueError("Invalid GIF metadata extension")
            header = data[index:index + count]
            index += count
            index, tail = blocks(index)
            if label == 0xFF and header in (b"NETSCAPE2.0", b"ANIMEXTS1.0"):
                continue
            if label == 0xF9:
                continue
            if label == 0xFE:
                kind = "GIF Comment"
                payload = header + tail
            elif label == 0xFF and header == b"XMP DataXMP":
                kind = "GIF XMP application"
                payload = tail
            elif label == 0xFF and header == b"ICCRGBG1012":
                kind = "GIF ICC colour profile"
                payload = tail
            elif label == 0xFF:
                kind = "GIF other application (identifier withheld)"
                payload = header + tail
            elif label == 0x01:
                kind = "GIF Plain Text"
                payload = header + tail
            else:
                kind = "GIF unknown extension"
                payload = header + tail
            text_value = payload.decode("latin-1")
            signals = sorted({
                label for label, pattern in SENSITIVE_PUBLIC_MARKERS
                if pattern.search(text_value)
            })
            if re.search(r"(?i)(?:https?://|www\.)", text_value):
                signals.append("web address")
            printable = all(
                (32 <= value <= 126) or value in (9, 10, 13)
                for value in payload
            )
            results.append({
                "type": kind, "bytes": len(payload),
                "text_like": printable, "signals": sorted(set(signals)),
                # Compare duplicate application blocks without printing their
                # identifiers, hidden metadata, or raw private comment text.
                "payload_digest": hashlib.sha256(payload).digest(),
            })
            continue
        if marker == 0x2C:
            if index + 9 > len(data):
                raise ValueError("Truncated GIF frame descriptor")
            frame_flags = data[index + 8]
            index += 9
            if frame_flags & 128:
                index += 3 * (1 << ((frame_flags & 7) + 1))
            if index >= len(data):
                raise ValueError("Missing GIF frame LZW size")
            index += 1
            index, _ = blocks(index)
            continue
        raise ValueError("Unrecognised GIF block in privacy diagnostic")
    raise ValueError("GIF trailer missing")


def inspect_remaining_privacy(stage: Path, converted: Path) -> None:
    """Offline owner-only summary for remaining email-pattern and GIF alerts.

    Read only the private local generated gallery manifest and one GIF from
    the existing validated converted-files plan; do not touch R2, upload, or
    loosen the mandatory privacy preflight.
    """
    manifest = stage / "photo-gallery/albums.generated.json"
    private = json.loads(manifest.read_text(encoding="utf-8"))
    public = json.loads(public_projection(private))
    email_pattern = next(pat for label, pat in SENSITIVE_PUBLIC_MARKERS
                         if label == "email address")
    print("REMAINING PRIVACY REVIEW - LOCAL ONLY", flush=True)
    flagged = 0
    photo_indices = set()
    retina_photo_indices = set()
    for index, photo in enumerate(public["photos"]):
        for field in ("path", "thumbnail"):
            value = photo.get(field, "")
            if not isinstance(value, str):
                continue
            matches = list(email_pattern.finditer(value))
            if not matches:
                continue
            if is_retina_suffix_email_false_positive(value, email_pattern):
                retina_photo_indices.add(index)
                continue
            flagged += 1
            photo_indices.add(index)
            basename = value.rsplit("/", 1)[-1]
            masked = email_pattern.sub("[EMAIL-SHAPED-TEXT]", basename)
            ends_in_jxl = any(m.group(0).lower().endswith((".jxl", ".gif"))
                              for m in matches)
            print(
                f"  photos[{index}].{field}: basename={masked!r}; "
                f"match extends into file extension: {ends_in_jxl}; "
                "literal email-like string withheld",
                flush=True,
            )
    print(f"  Strict email-pattern flags: {flagged} fields across "
          f"{len(photo_indices)} photo(s).", flush=True)
    if retina_photo_indices:
        print(
            f"  Recognised @2x/@3x JPEG XL retina naming in "
            f"{len(retina_photo_indices)} photo(s); these suffix-only "
            "matches are not email addresses.", flush=True
        )
    if flagged:
        print("  Owner must inspect the actual filename locally and decide "
              "whether it is acceptable as a PUBLIC URL.", flush=True)
    report = stage / "reports/photos-upload-plan.csv"
    gif_key = "full/projects/project-yampad/animated.gif"
    with report.open(newline="", encoding="utf-8") as stream:
        matches = [row for row in csv.DictReader(stream)
                   if row.get("r2_key") == gif_key]
    if len(matches) != 1:
        raise ValueError("Missing/duplicate Project Yampad GIF in validated plan")
    gif_file = Path(matches[0]["local_path"])
    if (not gif_file.is_file() or gif_file.is_symlink() or
            not gif_file.resolve().is_relative_to(converted.resolve())):
        raise ValueError("Unsafe optimised GIF path")
    details = gif_extension_privacy_details(gif_file)
    labels = gif_metadata_extensions(gif_file)
    if not details or len(labels) != len(details):
        raise ValueError("GIF privacy diagnostics disagree; manual review required")
    print(f"  Project Yampad GIF: {len(details)} non-loop extension(s) "
          "requiring review.", flush=True)
    for i, entry in enumerate(details, 1):
        indicators = ", ".join(entry["signals"]) if entry["signals"] else "none detected"
        print(
            f"    {i}: {entry['type']}; {entry['bytes']} payload bytes; "
            f"printable text: {entry['text_like']}; "
            f"possible private-data patterns: {indicators}",
            flush=True,
        )
    applications = [
        entry for entry in details
        if entry["type"].startswith("GIF ICC") or
        entry["type"].startswith("GIF other application")
    ]
    if len(applications) > 1:
        unique = len({entry["payload_digest"] for entry in applications})
        print(
            f"  Application extension payload comparison: "
            f"{len(applications)} extension(s), {unique} distinct payload(s). "
            "Digests not printed.", flush=True
        )
    if any(entry["type"] == "GIF ICC colour profile" for entry in details):
        print(
            "  Recognised ICCRGBG1012 standard colour-profile extension. "
            "Profile contents still require appropriate tag review; "
            "not automatically cleared.", flush=True
        )
    print(
        "  Payload values, unrecognised application identifiers, and "
        "email-like strings were NOT printed.", flush=True
    )
    reasons: list[str] = []
    exact_ok = cleared_yampad_gif_extensions(gif_file, diagnostics=reasons)
    print(
        "  Strict Yampad GIF check: " +
        ("PASS" if exact_ok else "BLOCKED"), flush=True
    )
    if reasons:
        for reason in reasons:
            print("    Safe failure reason: " + reason, flush=True)
    print(
        "NOT A PRIVACY CLEARANCE. Existing images on R2 unchanged; "
        "website publication remains blocked.",
        flush=True,
    )


def describe_exif_tag_names(candidates: list[tuple[str, Path]]) -> None:
    """Diagnostic only: ExifTool tag NAMES, never field VALUES.

    Retains the conservative container-box upload gate. No decoded metadata
    is sent to GitHub, R2, web APIs, or local report files.
    """
    print("\nDECODED EXIF TAG DIAGNOSTIC (names only; no values):", flush=True)
    exe = shutil.which("exiftool")
    if not exe:
        print(
            "  ExifTool is not installed. The compressed Exif contents have "
            "NOT been inspected. Keep publication blocked; consider "
            "'brew install exiftool' after reviewing the package.",
            flush=True,
        )
        return
    command = [exe, "-j", "-G1", "-s", "-u", "-n"] + [
        str(p) for _, p in candidates
    ]
    try:
        result = subprocess.run(command, capture_output=True,
                                check=False, timeout=120)
    except (OSError, subprocess.TimeoutExpired):
        print("  ExifTool could not complete; manual metadata review required.",
              flush=True)
        return
    if result.returncode:
        print("  ExifTool returned an error; metadata is still UNREVIEWED.",
              flush=True)
        return
    try:
        records = json.loads(result.stdout)
    except (ValueError, UnicodeError):
        print("  ExifTool metadata output was unreadable; manual review required.",
              flush=True)
        return
    if not isinstance(records, list):
        print("  ExifTool result format unexpected; manual review required.",
              flush=True)
        return
    by_source = {
        str(record.get("SourceFile")): record for record in records
        if isinstance(record, dict) and isinstance(record.get("SourceFile"), str)
    }
    pattern = re.compile(
        r"(?i)(gps|latitude|longitude|location|address|serial|owner|"
        r"artist|person|face|usercomment|comment|description|copyright|"
        r"date.?time|create.?date|modify.?date|history|creator)"
    )
    files_with_suspect_tags = 0
    unparsed = 0
    tags_seen: set[str] = set()
    groups_seen: set[str] = set()
    warnings_seen = 0
    exif_groups_seen = 0
    for key, local in candidates:
        record = by_source.get(str(local))
        if not record:
            print(f"  {key}: not parsed; still requires review", flush=True)
            unparsed += 1
            continue
        names = sorted(
            str(k) for k in record
            if k != "SourceFile" and not k.startswith(("File:", "System:"))
        )
        tags_seen.update(names)
        groups_seen.update(k.split(":", 1)[0] for k in names if ":" in k)
        if any(k.lower().startswith(("exif:", "gps:", "ifd0:", "exififd:", "gpsifd:", "interopifd:")) for k in names):
            exif_groups_seen += 1
        if "Warning" in record or "Error" in record or any(
            k.endswith((":Warning", ":Error")) for k in record
        ):
            warnings_seen += 1
        suspects = [k for k in names if pattern.search(k)]
        if suspects:
            files_with_suspect_tags += 1
        print(
            f"  {key}: {len(names)} metadata tag name(s); "
            f"potentially sensitive categories: "
            f"{', '.join(suspects[:18]) if suspects else 'none identified'}"
            + (" (plus more)" if len(suspects) > 18 else ""),
            flush=True,
        )
    print(
        f"  SUMMARY: {len(candidates)} metadata-bearing objects, "
        f"{files_with_suspect_tags} with potentially sensitive tag names, "
        f"{unparsed} unparsed, {warnings_seen} with ExifTool warning/error tags. "
        "Values intentionally withheld.",
        flush=True,
    )
    print("  ALL UNIQUE TAG NAMES (no values): " +
          (", ".join(sorted(tags_seen)) if tags_seen else "none"), flush=True)
    print("  TAG GROUPS: " +
          (", ".join(sorted(groups_seen)) if groups_seen else "none"),
          flush=True)
    print(
        f"  EXIF/GPS GROUP PARSED IN: {exif_groups_seen}/{len(candidates)} "
        "files. If zero, the Brotli-compressed Exif payload may not have "
        "been decoded. This is not privacy clearance.",
        flush=True,
    )
    print(
        "  A lack of flagged tag names does NOT prove the Exif is safe. "
        "Metadata box concerns remain blocking pending content review.",
        flush=True,
    )


# Strictly scoped to the 40 owner's verified Nintendo DS JPEG XL objects.
# No GPS, owner, serial, date or descriptive fields are included. The
# metadata need not be stripped if ExifTool decodes precisely these fields.
SAFE_TECHNICAL_JXL_TAGS = frozenset({
    "Composite:ImageSize",
    "Composite:Megapixels",
    "ExifIFD:ColorSpace",
    "ExifIFD:ExifImageHeight",
    "ExifIFD:ExifImageWidth",
    "ExifTool:ExifToolVersion",
    "Jpeg2000:CompatibleBrands",
    "Jpeg2000:MajorBrand",
    "Jpeg2000:MinorVersion",
})


def cleared_technical_exif(candidates: list[tuple[str, Path]]) -> set[str]:
    """Clear compressed Exif *only* with an exact tag-name allowlist.

    ExifTool must parse every requested file, with no errors/unknown/extra
    tags, and all of the observed dimensions/colour-space keys. Its output
    is captured in memory; nothing sensitive is logged or written to disk.
    Failure or absent ExifTool leaves every candidate BLOCKING.
    """
    if not candidates:
        return set()
    exe = shutil.which("exiftool")
    if not exe:
        return set()
    try:
        result = subprocess.run(
            [exe, "-j", "-G1", "-s", "-u", "-n"] +
            [str(p) for _, p in candidates],
            capture_output=True, check=False, timeout=120,
        )
        if result.returncode:
            return set()
        records = json.loads(result.stdout)
    except (OSError, subprocess.TimeoutExpired, ValueError, UnicodeError):
        return set()
    if not isinstance(records, list) or len(records) != len(candidates):
        return set()
    by_path: dict[str, dict] = {}
    for record in records:
        if not isinstance(record, dict):
            return set()
        name = record.get("SourceFile")
        if not isinstance(name, str) or name in by_path:
            return set()
        by_path[name] = record
    cleared = set()
    required = {
        "ExifIFD:ColorSpace",
        "ExifIFD:ExifImageHeight",
        "ExifIFD:ExifImageWidth",
    }
    for key, local in candidates:
        item = by_path.get(str(local))
        if item is None:
            continue
        names = {
            name for name in item
            if name != "SourceFile" and
            not name.startswith(("File:", "System:"))
        }
        if not names or not required.issubset(names):
            continue
        if not names.issubset(SAFE_TECHNICAL_JXL_TAGS):
            continue
        if any(name in item for name in ("Warning", "Error")) or any(
            name.endswith((":Warning", ":Error")) for name in item
        ):
            continue
        if not all(isinstance(item.get(name), (int, str)) and
                   str(item[name]).strip().isdigit() and
                   int(item[name]) > 0
                   for name in ("ExifIFD:ExifImageHeight",
                                "ExifIFD:ExifImageWidth")):
            continue
        cleared.add(key)
    return cleared


SAFE_YAMPAD_ICC_TAGS = frozenset({
    "BlueMatrixColumn",
    "BlueTRC",
    "ChromaticAdaptation",
    "GreenMatrixColumn",
    "GreenTRC",
    "MediaWhitePoint",
    "ProfileCopyright",
    "ProfileDescription",
    "RedMatrixColumn",
    "RedTRC",
})
SAFE_YAMPAD_GIF_COMMENT = "Optimized using ezgif.com"


def cleared_yampad_gif_extensions(path: Path,
                                  diagnostics: list[str] | None = None) -> bool:
    """Strict, read-only clearance of the ONE observed Yampad GIF.

    Optional diagnostics are predetermined *reason codes*, never metadata
    values, local path strings, or raw profile/comment bytes. Any unexpected
    metadata remains blocking; no blanket bypass or R2 changes are possible.
    """
    def blocked(reason: str) -> bool:
        if diagnostics is not None:
            diagnostics.append(reason)
        return False

    try:
        details = gif_extension_privacy_details(path)
    except (OSError, ValueError):
        return blocked("GIF structure unreadable")
    expected = ["GIF ICC colour profile", "GIF Comment", "GIF ICC colour profile"]
    if [item["type"] for item in details] != expected:
        return blocked("Unexpected GIF extension types or order")
    if [item["bytes"] for item in details] != [548, 25, 548]:
        return blocked("GIF extension lengths differ from reviewed values")
    if any(item["signals"] for item in details):
        return blocked("Potential sensitive data detected in GIF extension")
    if details[0]["payload_digest"] != details[2]["payload_digest"]:
        return blocked("ICC profile payloads differ")
    if not details[1]["text_like"]:
        return blocked("GIF comment is not plain text")

    exe = shutil.which("exiftool")
    if not exe:
        return blocked("ExifTool not found")
    try:
        process = subprocess.run(
            [exe, "-j", "-a", "-G1", "-s", "-u", "-n", str(path)],
            capture_output=True, check=False, timeout=30,
        )
        if process.returncode:
            return blocked("ExifTool returned an error")
        records = json.loads(process.stdout)
    except (OSError, ValueError, UnicodeError, subprocess.TimeoutExpired):
        return blocked("ExifTool output unreadable or timed out")
    if not isinstance(records, list) or len(records) != 1:
        return blocked("Unexpected ExifTool record count")
    record = records[0]
    if not isinstance(record, dict) or record.get("SourceFile") != str(path):
        return blocked("ExifTool source identification mismatch")
    if any(
        key == "Warning" or key == "Error" or
        key.endswith((":Warning", ":Error"))
        for key in record
    ):
        return blocked("ExifTool warning or error tags found")
    comments = [
        value for key, value in record.items()
        if key == "Comment" or key.endswith(":Comment")
    ]
    if comments != [SAFE_YAMPAD_GIF_COMMENT]:
        return blocked(
            "GIF Comment does not match the exact owner-reviewed text "
            f"(matching comment fields: {sum(x == SAFE_YAMPAD_GIF_COMMENT for x in comments)}, "
            f"total comment fields: {len(comments)})"
        )
    for group in ("ICC_Profile", "ICC_Profile2"):
        prefix = group + ":"
        tags = {
            key[len(prefix):] for key in record
            if key.startswith(prefix)
        }
        if tags != SAFE_YAMPAD_ICC_TAGS:
            # Tag names are non-sensitive *schema* only; no tag values shown.
            missing = sorted(SAFE_YAMPAD_ICC_TAGS - tags)
            extra = sorted(tags - SAFE_YAMPAD_ICC_TAGS)
            return blocked(
                f"ICC tag set mismatch in {group}: "
                f"missing names={missing}, unexpected names={extra}"
            )
        if record.get(prefix + "ProfileDescription") != "Display P3":
            return blocked(f"{group} description differs from owner-reviewed value")
        if record.get(prefix + "ProfileCopyright") != "Copyright Apple Inc., 2017":
            return blocked(f"{group} copyright differs from owner-reviewed value")

    permitted = {"File", "System", "ExifTool", "Composite",
                 "GIF", "ICC_Profile", "ICC_Profile2"}
    extras = sorted({
        key.split(":", 1)[0] if ":" in key else "(ungrouped)"
        for key in record
        if key != "SourceFile" and
        (":" not in key or key.split(":", 1)[0] not in permitted)
    })
    if extras:
        return blocked(f"Unrecognised ExifTool metadata groups: {extras}")

    return True

def scan_public_privacy(stage: Path, converted: Path, site: dict,
                        catalogue: bytes, photo_keys: dict,
                        report_only: bool = False) -> None:
    """Fail closed on obvious data leaks; document limits of automated audit."""
    print(
        "PRIVACY PREFLIGHT: scanning public catalogue, generated pages, "
        "and optimised JXL metadata boxes ...", flush=True
    )
    issues = []
    metadata_candidates: list[tuple[str, Path]] = []
    candidate_flags: dict[str, list[str]] = {}

    def inspect_text(description: str, value: str) -> None:
        for label, pattern in SENSITIVE_PUBLIC_MARKERS:
            if not pattern.search(value):
                continue
            if (label == "email address" and description.startswith("photos[")
                    and description.endswith((".path", ".thumbnail"))
                    and is_retina_suffix_email_false_positive(value, pattern)):
                continue
            issues.append(f"{description}: possible {label}")

    public_data = json.loads(catalogue)
    if len(public_data["photos"]) != EXPECTED_PHOTOGRAPHS:
        # 8,412 photographs / 16,823 objects: one GIF shares its thumbnail.
        raise ValueError("Unexpected public catalogue photograph count")
    # Private original filenames are excluded. Visible public paths and titles
    # are nevertheless published by design and must be screened.
    for category in ("albums", "folders", "photos"):
        for index, item in enumerate(public_data[category]):
            for field, value in item.items():
                if isinstance(value, str):
                    inspect_text(f"{category}[{index}].{field}", value)
    for key in sorted(site):
        if key.endswith((".html", ".xml")):
            file = site[key]["local"]
            contents = file.read_text(encoding="utf-8")
            inspect_text("generated " + key, contents)
            if key.endswith(".html"):
                resource_scan = ExternalResourceScanner()
                resource_scan.feed(contents)
                if resource_scan.external:
                    issues.append(
                        f"generated {key}: unexpected external auto-loaded "
                        f"resource(s): {resource_scan.external[:3]}"
                    )
                if re.search(r"(?i)@import\s+(?:url\()?\s*['\"]?(?:https?:)?//", contents):
                    issues.append(f"generated {key}: remote CSS import detected")
                if re.search(r"(?i)url\(\s*['\"]?(?:https?:)?//", contents):
                    issues.append(f"generated {key}: remote CSS URL detected")
    # The existing validated photo plan can refer either to the final
    # key-matched path or a pre-rename legacy converted filename. Use the
    # *validated local_path*, never the 26 GB original source archive.
    photo_plan = stage / "reports/photos-upload-plan.csv"
    with photo_plan.open(newline="", encoding="utf-8") as handle:
        file_rows = list(csv.DictReader(handle))
    local_paths = {}
    for row in file_rows:
        key = row["r2_key"]
        if key in local_paths:
            raise ValueError("Duplicate converted plan key: " + key)
        local_paths[key] = Path(row["local_path"])
    if set(local_paths) != set(photo_keys):
        raise ValueError("Privacy scan local image paths differ from validated photo plan")
    root = converted.resolve()
    # The relevant optimised photos are already publicly stored in R2.
    # This check does not read or rewrite their historical originals.
    scanned = 0
    for key in sorted(photo_keys):
        file = local_paths[key]
        if (not file.is_file() or file.is_symlink() or
                file.resolve() != file.absolute() or
                not file.resolve().is_relative_to(root)):
            raise ValueError("Unsafe optimised image path: " + key)
        if key.endswith(".jxl"):
            flagged = jxl_private_boxes(file)
            if flagged:
                metadata_candidates.append((key, file))
                candidate_flags[key] = flagged
            scanned += 1
        elif key.endswith(".gif"):
            # Parse real extension blocks, never compressed-pixel byte matches.
            labels = gif_metadata_extensions(file)
            if labels and key == "full/projects/project-yampad/animated.gif":
                reasons: list[str] = []
                if cleared_yampad_gif_extensions(file, diagnostics=reasons):
                    print(
                        "TECHNICAL GIF REVIEW: Project Yampad has only two "
                        "identical Display P3 ICC profiles and the exact approved "
                        "ezgif optimisation comment; no changes needed.",
                        flush=True,
                    )
                else:
                    issues.append(
                        f"{key}: GIF extension(s) requiring privacy review "
                        f"({', '.join(sorted(set(labels)))})"
                    )
                    # Predetermined mismatch diagnostics contain no raw values.
                    # Keep the privacy gate blocking until the mismatch is fixed.
                    for reason in reasons:
                        issues.append("Project Yampad GIF validation: " + reason)
            elif labels:
                issues.append(
                    f"{key}: GIF extension(s) requiring privacy review "
                    f"({', '.join(sorted(set(labels)))})"
                )
    technical_only = [(key, path) for key, path in metadata_candidates
                      if candidate_flags[key] == ["compressed Exif"]]
    cleared = cleared_technical_exif(technical_only)
    if cleared:
        print(
            f"TECHNICAL EXIF REVIEW: {len(cleared)} optimised JPEG XL objects "
            "contain only strictly allowlisted Exif dimensions/colour-space "
            "metadata; no metadata alterations required.",
            flush=True,
        )
    for key, _path in metadata_candidates:
        if key not in cleared:
            issues.append(
                f"{key}: JPEG XL container boxes requiring privacy "
                f"review ({', '.join(candidate_flags[key])})"
            )
    if issues:
        print(f"PRIVACY REVIEW REQUIRED: {len(issues)} potential issue(s) detected.",
              file=sys.stderr)
        entries = issues if report_only else issues[:12]
        for item in entries:
            print("  - " + item, file=sys.stderr)
        if not report_only and len(issues) > 12:
            print(f"  ... and {len(issues) - 12} more", file=sys.stderr)
        if report_only:
            unresolved_metadata = [
                (key, path) for key, path in metadata_candidates
                if key not in cleared
            ]
            if unresolved_metadata:
                describe_exif_tag_names(unresolved_metadata)
            elif cleared:
                print(
                    f"All {len(cleared)} compressed-Exif JPEG XL objects "
                    "were checked against the exact benign technical "
                    "tag allowlist; no repeated 40-file listing.",
                    flush=True,
                )
            print(
                "\nREPORT ONLY: Findings remain BLOCKING. "
                "No local images modified; no remote access, "
                "R2 upload or website publication.",
                flush=True,
            )
            return
        raise ValueError(
            "Public website upload blocked by privacy preflight. "
            "Review the named source fields/optimised metadata locally, "
            "do not bypass the exact-key gate."
        )
    print(
        "PASS: no obvious private strings in generated HTML/public catalogue; "
        f"{scanned:,} optimised JPEG XL objects checked, with "
        f"{len(cleared)} strictly allowlisted technical Exif cases. "
        "Original source archive untouched.",
        flush=True,
    )
    print(
        "LIMITATION: filenames, folder labels, and image contents can still "
        "identify people, places or private details. Human visual review "
        "is not replaced by this automated scan.",
        flush=True,
    )


def rows_from_csv(stage: Path, catalogue_bytes: bytes) -> tuple[dict, dict]:
    """Return the exact release keys and verified photo-object size map."""
    site_dir = stage / SITE_ROOT
    if site_dir.is_symlink() or not site_dir.is_dir():
        raise ValueError("Unsafe or missing generated site directory")
    report = stage / "reports/gallery-pages-upload-plan.csv"
    with report.open(newline="", encoding="utf-8") as stream:
        static = list(csv.DictReader(stream))
    files = {}
    for row in static:
        key = row.get("r2_key", "")
        if (not key or key.startswith("/") or "\\" in key
                or any(piece in ("", ".", "..") for piece in key.split("/"))
                or key in files):
            raise ValueError("Unsafe/duplicate generated site key: " + repr(key))
        if row.get("approved_for_publication") != "NO":
            raise ValueError("Generated plan approval flags must not be changed: " + key)
        local = site_dir.joinpath(*key.split("/"))
        if row.get("local_path") != str(local):
            raise ValueError("Local site plan path differs: " + key)
        mime = MIME_BY_SUFFIX.get(local.suffix)
        if not mime or row.get("mime") != mime:
            raise ValueError("Unexpected site MIME: " + key)
        if not local.is_file() or local.is_symlink() or local.resolve() != local.absolute():
            raise ValueError("Missing or unsafe staged site file: " + key)
        if int(row["bytes"]) != local.stat().st_size:
            raise ValueError("Staged site differs from static upload plan: " + key)
        files[key] = {"source": site_dir, "local": local, "mime": mime,
                      "bytes": local.stat().st_size}
    if len(files) != EXPECTED_SITE or "index.html" not in files or "albums.json" not in files or "sitemap.xml" not in files:
        raise ValueError("Expected exactly 329 HTML pages plus albums.json and sitemap.xml")
    if sum(k.endswith(".html") for k in files) != EXPECTED_HTML:
        raise ValueError("Unexpected generated page count")
    # The plan's private albums.json is NOT the one we publish.
    files["albums.json"]["bytes"] = len(catalogue_bytes)
    files["albums.json"]["source"] = None
    files["albums.json"]["local"] = None

    manifest = stage / "photo-gallery/albums.generated.json"
    fonts, missing = local_theme_fonts(manifest)
    if missing or len(fonts) != EXPECTED_FONTS:
        raise ValueError("Missing or unsafe staged fonts: " + repr(missing))
    for key, local in fonts.items():
        if key in files or not key.startswith("assets/fonts/"):
            raise ValueError("Invalid/duplicate font upload key: " + key)
        files[key] = {"source": stage / "photo-gallery", "local": local,
                      "mime": "font/woff2", "bytes": local.stat().st_size}
    if len(files) != EXPECTED_PUBLIC:
        raise ValueError("Unexpected public site object count")

    photo_report = stage / "reports/photos-upload-plan.csv"
    with photo_report.open(newline="", encoding="utf-8") as stream:
        photo_rows = list(csv.DictReader(stream))
    photos = {}
    for row in photo_rows:
        key = row["r2_key"]
        if not key.startswith(("full/", "thumbs/")) or key in photos:
            raise ValueError("Unexpected photo key in private plan: " + key)
        if row.get("approved_for_publication") != "NO":
            raise ValueError("Image approval plan was modified: " + key)
        photos[key] = int(row["bytes"])
    if len(photos) != EXPECTED_PHOTOS or sum(photos.values()) != EXPECTED_IMAGE_BYTES:
        raise ValueError("Photo upload plan changed from the verified R2 completion")
    if set(photos).intersection(files):
        raise ValueError("Site key collides with a verified photo object")
    return files, photos


def check_local(stage: Path, converted: Path, html: Path,
                privacy_report: bool = False) -> tuple[dict, dict, bytes]:
    """Read local staging only. This never scans or opens historical originals."""
    review = audit(stage, converted, html)
    site = review["static_site"]
    if (not review["technical_staging_consistent"] or
            site["exact_html_pages_verified"] != EXPECTED_HTML or
            site["expected_static_objects"] != EXPECTED_SITE or
            review["staged_font_count"] != EXPECTED_FONTS or
            review["local_object_count"] != EXPECTED_PHOTOS or
            review["photo_count"] != EXPECTED_PHOTOGRAPHS):
        raise ValueError("Staged gallery failed the strict read-only readiness audit")
    private = json.loads((stage / "photo-gallery/albums.generated.json").read_text(
        encoding="utf-8"))
    # This release is of the current *unreviewed* design, not permission to
    # silently make newly filled accessibility/description fields public.
    reviewed = review["reviewed_metadata_counts"]
    if any(reviewed.values()):
        raise ValueError(
            "This first design release expects zero approved photo metadata "
            "fields; a separately reviewed revision is required."
        )
    catalogue = public_projection(private)
    release, photos = rows_from_csv(stage, catalogue)
    scan_public_privacy(stage, converted, release, catalogue, photos,
                        report_only=privacy_report)
    return release, photos, catalogue


def list_remote() -> dict[str, dict]:
    command = ["rclone", "lsjson", "--recursive", "--files-only",
               "--no-modtime", "--no-mimetype", "--s3-no-check-bucket",
               FINAL_DESTINATION]
    result = subprocess.run(command, capture_output=True, check=False, timeout=180)
    if result.returncode:
        raise ValueError("R2 list failed: " + result.stderr.decode("utf-8", "replace")[-700:])
    try:
        records = json.loads(result.stdout)
    except (ValueError, TypeError) as exc:
        raise ValueError("R2 returned an invalid object listing") from exc
    if not isinstance(records, list):
        raise ValueError("R2 listing is not an array")
    remote = {}
    for rec in records:
        if not isinstance(rec, dict) or not isinstance(rec.get("Path"), str):
            raise ValueError("Malformed remote object listing")
        if rec["Path"] in remote:
            raise ValueError("Duplicate remote key: " + rec["Path"])
        remote[rec["Path"]] = rec
    return remote


def compare_remote(site: dict, photos: dict, remote: dict) -> list[str]:
    expected = set(site) | set(photos)
    extra = sorted(set(remote) - expected)
    if extra:
        raise ValueError(f"Unplanned remote objects ({len(extra)}); first: {extra[:3]}")
    missing_photos = sorted(set(photos) - set(remote))
    if missing_photos:
        raise ValueError(
            f"{len(missing_photos)} gallery images are absent from R2. "
            "Do not publish the website until image inventory is complete."
        )
    for key in photos:
        if remote[key].get("Size") != photos[key]:
            raise ValueError("Existing R2 photo size differs: " + key)
    for key in set(site) & set(remote):
        if remote[key].get("Size") != site[key]["bytes"]:
            raise ValueError("Existing R2 website object has different size: " + key)
    return sorted(set(site) - set(remote))


def keys_input(keys: list[str]) -> bytes:
    return ("\0".join(keys) + "\0").encode("utf-8") if keys else b""


def run_copy(source: Path, keys: list[str], mime: str) -> None:
    if not keys:
        return
    command = [
        "rclone", "copy", "--files-from0", "-", "--ignore-existing",
        "--s3-no-check-bucket", "--metadata-set", "content-type=" + mime,
        "--transfers", "4", "--checkers", "8", "--stats", "10s", "-v",
        str(source), FINAL_DESTINATION,
    ]
    print(f"UPLOADING: {len(keys)} {mime} object(s); exact key allowlist.", flush=True)
    result = subprocess.run(command, input=keys_input(keys), check=False)
    if result.returncode:
        raise ValueError(
            f"R2 website transfer failed with exit {result.returncode}; "
            "never delete or overwrite to repair. Recheck and rerun to resume."
        )


def verify_existing_site_bytes(site: dict, keys: set[str],
                               stage: Path, temp_root: Path) -> None:
    """Fail before uploading if already-public website objects differ by bytes.

    Matching names and sizes alone do not prove existing site HTML or
    albums.json is the approved public-safe version.
    """
    if not keys:
        return
    print(f"Verifying {len(keys)} existing website objects byte-for-byte "
          "before any new publication...", flush=True)
    for source, selected in (
        (stage / SITE_ROOT, sorted(
            key for key in keys if key.endswith((".html", ".xml")))),
        (stage / "photo-gallery", sorted(
            key for key in keys if key.endswith(".woff2"))),
        (temp_root, sorted(key for key in keys if key == "albums.json")),
    ):
        if not selected:
            continue
        command = [
            "rclone", "check", "--download", "--one-way", "--files-from0",
            "-", "--s3-no-check-bucket", str(source), FINAL_DESTINATION,
        ]
        result = subprocess.run(command, input=keys_input(selected),
                                check=False)
        if result.returncode:
            raise ValueError(
                "Existing public gallery object differs from vetted release "
                f"({len(selected)} checked). No additional upload started."
            )


def verify_remote(site: dict, photos: dict, catalogue: bytes,
                  temp_root: Path) -> None:
    remote = list_remote()
    missing = compare_remote(site, photos, remote)
    if missing:
        raise ValueError(f"{len(missing)} website objects still missing: {missing[:3]}")
    # Actual byte comparisons, not just filenames/sizes. No delete or overwrite.
    site_root = next(item["source"] for key, item in site.items()
                     if key == "index.html")
    fonts_root = next(item["source"] for key, item in site.items()
                      if key.endswith(".woff2"))
    for source, keys in (
        (site_root, sorted(k for k in site if k.endswith((".html", ".xml")))),
        (fonts_root, sorted(k for k in site if k.endswith(".woff2"))),
        (temp_root, ["albums.json"]),
    ):
        command = ["rclone", "check", "--download", "--one-way",
                   "--files-from0", "-", "--s3-no-check-bucket",
                   str(source), FINAL_DESTINATION]
        result = subprocess.run(command, input=keys_input(keys), check=False)
        if result.returncode:
            raise ValueError(
                f"R2 website byte comparison failed ({len(keys)} entries). "
                "Do not overwrite: investigate first."
            )
    # MIME content types matter for browsers. Verify site entry points and fonts.
    sample = sorted([k for k in site if k.endswith(".woff2")] +
                    ["index.html", "albums.json", "sitemap.xml"] +
                    sorted(k for k in site if k.startswith("albums/"))[:4])
    command = ["rclone", "lsjson", "--files-only", "--recursive",
               "--no-modtime", "--files-from0", "-",
               "--s3-no-check-bucket", FINAL_DESTINATION]
    result = subprocess.run(command, input=keys_input(sample),
                            capture_output=True, check=False, timeout=120)
    if result.returncode:
        raise ValueError("Could not verify R2 website MIME: " +
                         result.stderr.decode("utf-8", "replace")[-400:])
    records = json.loads(result.stdout)
    typed = {item["Path"]: item for item in records}
    if set(typed) != set(sample):
        raise ValueError("Sampled website MIME records do not match exact allowed keys")
    for key in sample:
        actual = typed[key].get("MimeType", "")
        expected = site[key]["mime"]
        if actual.split(";", 1)[0].strip() != expected.split(";", 1)[0].strip():
            raise ValueError(f"R2 website Content-Type mismatch at {key}: {actual!r}")
    print(f"PASS: {len(site)} website keys/sizes and downloaded-byte comparisons "
          f"match, including {len(sample)} sampled MIME headers.", flush=True)


def publish(stage: Path, converted: Path, html: Path,
            mode: str = "preflight") -> int:
    if not shutil.which("rclone"):
        raise ValueError("rclone is unavailable")
    site, photos, catalogue = check_local(stage, converted, html)
    remote = list_remote()
    missing = compare_remote(site, photos, remote)
    print(
        f"Existing R2 photos: {len(photos):,} verified by name/size\n"
        f"Existing website objects: {len(site) - len(missing)} / {len(site)}\n"
        f"Website objects still to upload: {len(missing)} "
        "(329 HTML + JSON + sitemap + 5 fonts in full release)\n"
        f"Public catalogue: {len(catalogue):,} bytes, "
        "private source_path fields omitted\n"
        f"Target: {FINAL_DESTINATION} (PUBLIC custom domain)\n"
        "No private reports, source originals, File Server files, "
        "blog modifications, or Cloudflare rewrite.",
        flush=True,
    )
    if mode == "preflight":
        print("READ ONLY. Nothing uploaded. Use --upload to publish these website objects.")
        return 0
    # The public JSON is staged in a temporary *separate* folder. Never
    # upload the private site/albums.json or albums.generated.json by mistake.
    with tempfile.TemporaryDirectory(prefix="mcretro-gallery-publish-") as folder:
        temp_root = Path(folder)
        (temp_root / "albums.json").write_bytes(catalogue)
        if mode == "upload":
            # A pre-existing same-size object might be the private/stale
            # albums.json or unwanted HTML. Check its actual bytes first.
            verify_existing_site_bytes(
                site, set(site) - set(missing), stage, temp_root
            )
            site_root = stage / SITE_ROOT
            # Order matters: fonts/catalogue first, folder pages, sitemap,
            # homepage last. The root index is the explicit final website key.
            stages = (
                (stage / "photo-gallery",
                 sorted(k for k in missing if k.endswith(".woff2")), "font/woff2"),
                (temp_root, ["albums.json"] if "albums.json" in missing else [],
                 "application/json"),
                (site_root, sorted(k for k in missing if k.startswith("albums/")),
                 "text/html; charset=utf-8"),
                (site_root, ["sitemap.xml"] if "sitemap.xml" in missing else [],
                 "application/xml"),
                (site_root, ["index.html"] if "index.html" in missing else [],
                 "text/html; charset=utf-8"),
            )
            for source, keys, mime in stages:
                run_copy(source, keys, mime)
        verify_remote(site, photos, catalogue, temp_root)
    print(
        "\nGALLERY DESIGN OBJECTS VERIFIED IN R2. "
        "Cloudflare's hostname root '/' may still need a separate "
        "hostname-specific rewrite to '/index.html'. Public 403/WAF "
        "access is also a separate issue. "
        "No rewrite, File Server upload or GitHub merge was performed."
    )
    return 0


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--stage", type=Path, default=DEFAULT_STAGE)
    parser.add_argument("--converted", type=Path, default=DEFAULT_CONVERTED)
    parser.add_argument("--html", type=Path,
                        default=Path.home() / "Downloads/mcretro-gallery-index.html")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--upload", action="store_true",
                      help="Upload the existing 336 planned gallery website objects")
    mode.add_argument("--verify", action="store_true",
                      help="Read-only verify public website objects already on R2")
    mode.add_argument("--privacy-audit", action="store_true",
                      help="Local-only privacy preflight; NO R2 requests or uploads")
    mode.add_argument("--privacy-report", action="store_true",
                      help="Show all blocking findings and optional Exif tag names; "
                           "read-only, NO R2 access")
    mode.add_argument("--inspect-unresolved", action="store_true",
                      help="Fast local-only diagnostics for email-shaped image "
                           "path and Project Yampad GIF; NO R2 access")
    args = parser.parse_args(argv)
    if args.inspect_unresolved:
        inspect_remaining_privacy(args.stage.expanduser().absolute(),
                                  args.converted.expanduser().absolute())
        return 0
    if args.privacy_audit or args.privacy_report:
        check_local(args.stage.expanduser().absolute(),
                    args.converted.expanduser().absolute(),
                    args.html.expanduser().absolute(),
                    privacy_report=args.privacy_report)
        if args.privacy_audit:
            print("LOCAL PRIVACY PREFLIGHT PASSED. NO R2 REQUESTS OR UPLOADS.")
        else:
            print("PRIVACY REPORT COMPLETE. NOT PUBLICATION CLEARANCE.")
        return 0
    return publish(
        args.stage.expanduser().absolute(),
        args.converted.expanduser().absolute(),
        args.html.expanduser().absolute(),
        "upload" if args.upload else "verify" if args.verify else "preflight",
    )


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, TypeError, json.JSONDecodeError,
            subprocess.TimeoutExpired) as exc:
        print("STOPPED: " + str(exc), file=sys.stderr)
        sys.exit(2)
