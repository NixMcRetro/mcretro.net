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
import json
from pathlib import Path
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
EXPECTED_IMAGE_BYTES = 4276856102
EXPECTED_PUBLIC = EXPECTED_SITE + EXPECTED_FONTS

PHOTO_FIELDS = ("path", "thumbnail", "title", "filename", "album")
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


def rows_from_csv(stage: Path, catalogue_bytes: bytes) -> tuple[dict, dict]:
    """Return the exact release keys and verified photo-object size map."""
    site_dir = stage / SITE_ROOT
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


def check_local(stage: Path, converted: Path, html: Path) -> tuple[dict, dict, bytes]:
    """Read local staging only. This never scans or opens historical originals."""
    review = audit(stage, converted, html)
    site = review["static_site"]
    if (not review["technical_staging_consistent"] or
            site["exact_html_pages_verified"] != EXPECTED_HTML or
            site["expected_static_objects"] != EXPECTED_SITE or
            review["staged_font_count"] != EXPECTED_FONTS or
            review["local_object_count"] != EXPECTED_PHOTOS):
        raise ValueError("Staged gallery failed the strict read-only readiness audit")
    private = json.loads((stage / "photo-gallery/albums.generated.json").read_text(
        encoding="utf-8"))
    catalogue = public_projection(private)
    release, photos = rows_from_csv(stage, catalogue)
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


def verify_remote(site: dict, photos: dict, catalogue: bytes,
                  temp_root: Path) -> None:
    remote = list_remote()
    missing = compare_remote(site, photos, remote)
    if missing:
        raise ValueError(f"{len(missing)} website objects still missing: {missing[:3]}")
    # Actual byte comparisons, not just filenames/sizes. No delete or overwrite.
    groups = (
        (next(iter(site.values()))["source"], None),  # unused placeholder
    )
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
    print("PASS: 336 website keys/sizes, 336 downloaded-byte comparisons "
          "and sampled MIME headers match.", flush=True)


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
    args = parser.parse_args(argv)
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
