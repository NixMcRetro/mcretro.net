#!/usr/bin/env python3
"""Review-only, historically conservative 2x AI upscale of five 2012 photographs.

No article is modified. Creates review PNGs and lossless JPEG XL candidates.
The JPEG XL is lossless relative to the processed pixels, not a restoration
of photographic information that the small original JPG does not contain.
"""
import json
import hashlib
import subprocess
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw

cv2.setNumThreads(2)
ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/images/2012"
REVIEW = ROOT / "_review/upscale-previews"
MODEL = ROOT / "_review/FSRCNN_x2.pb"
ITEMS = {
    "img_0039": ("03", "amstrad-sega-mega-pc-486slc-upgrade-experiment", "Closed beige Amstrad PC"),
    "img_0040": ("03", "amstrad-sega-mega-pc-486slc-upgrade-experiment", "Amstrad PC with cover removed"),
    "img_0038": ("03", "amstrad-sega-mega-pc-486slc-upgrade-experiment", "Amstrad PC internals"),
    "img_0067a": ("04", "amstrad-sega-mega-pc-athlon-500mhz-rebuild-and-picopsu", "Amstrad Mega PC, screen and peripherals"),
    "img_0071": ("04", "new-camera-canon-eos-600d", "Canon EOS 600D product photograph"),
}

def make_alpha(rgb):
    """Keep internal white logos opaque; remove only white connected to the border."""
    rgb = np.asarray(rgb, dtype=np.uint8)
    high = np.all(rgb >= 236, axis=2).astype(np.uint8)
    n, labels, stats, _ = cv2.connectedComponentsWithStats(high, connectivity=8)
    borders = set(np.unique(np.concatenate((labels[0], labels[-1], labels[:, 0], labels[:, -1]))).tolist())
    bg = np.isin(labels, list(borders - {0})).astype(np.uint8)
    # Only soften a 2px contour, rather than making white camera lettering transparent.
    eroded = cv2.erode(bg, np.ones((3, 3), np.uint8), iterations=1)
    a = np.where(bg == 1, 0, 255).astype(np.uint8)
    a = cv2.GaussianBlur(a, (3, 3), 0.55)
    a[eroded == 1] = 0
    return Image.fromarray(a, "L")

def checkerboard(width, height, size=16):
    yy, xx = np.indices((height, width))
    shade = np.where(((yy // size) + (xx // size)) % 2 == 0, 240, 202)
    return Image.fromarray(np.uint8(np.stack([shade] * 3, axis=-1)), "RGB")

def encode_lossless(img, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    png = REVIEW / (target.stem + "_source-for-jxl.png")
    img.save(png, optimize=True)
    subprocess.run(["cjxl", str(png), str(target), "--distance=0", "--effort=7"], check=True)
    # Perform a pixel-perfect decode check.
    check = REVIEW / (target.stem + "_roundtrip.png")
    subprocess.run(["djxl", str(target), str(check)], check=True)
    decoded = Image.open(check).convert(img.mode)
    if decoded.size != img.size or decoded.tobytes() != img.tobytes():
        raise RuntimeError(f"JPEG XL round-trip mismatch: {target}")
    png.unlink()
    check.unlink()

def main():
    REVIEW.mkdir(parents=True, exist_ok=True)
    if not MODEL.exists():
        raise RuntimeError("AI model is missing: refusing to silently substitute a non-AI resize")
    sr = cv2.dnn_superres.DnnSuperResImpl_create()
    sr.readModel(str(MODEL))
    sr.setModel("fsrcnn", 2)
    report = []
    for name, (month, slug, label) in ITEMS.items():
        src = SOURCE / f"{name}.jpg"
        raw = src.read_bytes()
        with Image.open(src) as im:
            original = im.convert("RGB")
        width, height = original.size
        if width >= 700:
            raise RuntimeError(f"Unexpectedly large input {name} ({width}x{height}); review scope changed")
        bgr = cv2.cvtColor(np.array(original), cv2.COLOR_RGB2BGR)
        neural = cv2.cvtColor(sr.upsample(bgr), cv2.COLOR_BGR2RGB)
        lanczos = np.asarray(original.resize((width * 2, height * 2), Image.Resampling.LANCZOS))
        # Small amount of traditional reconstruction stabilises oversharpened neural edges.
        final_rgb = Image.fromarray(
            np.uint8(np.clip(0.85 * neural.astype(np.float32) +
                             0.15 * lanczos.astype(np.float32), 0, 255)), "RGB"
        )
        output = ROOT / "assets/images/2012" / month / slug / f"{name}-upscaled-2x.jxl"
        encode_lossless(final_rgb, output)
        preview = REVIEW / f"{name}-upscaled-preview.png"
        final_rgb.save(preview, optimize=True)
        variants = [str(output.relative_to(ROOT))]
        if name == "img_0071":
            alpha = make_alpha(original).resize(final_rgb.size, Image.Resampling.LANCZOS)
            rgba = final_rgb.convert("RGBA")
            rgba.putalpha(alpha)
            transparent = output.with_name(f"{name}-upscaled-2x-transparent.jxl")
            encode_lossless(rgba, transparent)
            variants.append(str(transparent.relative_to(ROOT)))
            comp = checkerboard(*rgba.size)
            comp.paste(rgba, (0, 0), rgba)
            comp.save(REVIEW / "img_0071-transparent-checkerboard-preview.png", optimize=True)
        report.append({
            "original": str(src.relative_to(ROOT)),
            "sha256": hashlib.sha256(raw).hexdigest(),
            "original_size": [width, height],
            "upscaled_size": list(final_rgb.size),
            "preview": str(preview.relative_to(ROOT)),
            "candidates": variants,
            "ai_method": "OpenCV FSRCNN x2, 85%; Lanczos x2, 15%",
            "jxl_encoding": "lossless distance=0, decoded pixel exact"
        })
    (REVIEW / "manifest.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))

if __name__ == "__main__":
    main()
