# McRetro R2 archive sites - staged restoration

Two separate static website starters are in this **draft, unmerged PR**. Neither site has been published by this branch.

| Source | Intended R2 bucket | Domain |
| --- | --- | --- |
| archive-sites/file-server/ | mcretro-files | https://files.mcretro.net/ |
| archive-sites/photo-gallery/ | mcretro-photos | https://photos.mcretro.net/ |

The committed sample catalogues contain ONLY the two previously tested connectivity objects: mcretro-r2-check.txt and mcretro-r2-check.png. No source archives, generated photo catalogue, original photographs, private metadata or R2 credentials are committed.

## Local source material and current conversion

The restored collection lives on the owner's Mac; the paths below are *local*, not accessible to GitHub Actions.

- Original photos: /Users/nix/Desktop/R2 FILES/photos
- Converted JXL photos and thumbnails: ~/Desktop/McRetro-PhotoGallery-Optimised-v2
- Likely original File Server folder: /Users/nix/Desktop/R2 FILES/files (override with --files if elsewhere)
- Existing conversion summary: 8,391 of 8,391 supported images processed, 0 failures, 271 unsupported/skipped, 4,275,129,262 bytes of JXL gallery images plus thumbnails.

The photo viewer now offers collection/album selectors and **60-image batches** rather than inserting thousands of thumbnail elements at once. The gallery uses an external JSON catalogue and is still a static site with no backend.

## Step 1 - Build local inventories and draft catalogues (read-only)

Run this on the Mac that contains the archives:

    python3 archive-sites/tools/build_mcretro_r2_catalogues.py

Or download the tool from this PR's branch and run it separately:

    curl -fL https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites/tools/build_mcretro_r2_catalogues.py -o ~/Downloads/build_mcretro_r2_catalogues.py
    python3 ~/Downloads/build_mcretro_r2_catalogues.py

Only Python's standard library is required. Custom paths:

    python3 archive-sites/tools/build_mcretro_r2_catalogues.py \
      --photos '/Users/nix/Desktop/R2 FILES/photos' \
      --converted "$HOME/Desktop/McRetro-PhotoGallery-Optimised-v2" \
      --files '/Users/nix/Desktop/R2 FILES/files' \
      --stage "$HOME/Desktop/McRetro-R2-Staging"

The tool **does not upload anything**. It never edits the photo originals, converted JPEG XL images or File Server objects. It creates only local staging and review files outside those directories.

Generated files in ~/Desktop/McRetro-R2-Staging:

| Path | Meaning |
| --- | --- |
| photo-gallery/albums.generated.json | DRAFT photo catalogue with 1 entry per verified JXL pair, organised into folders/collections |
| reports/audit-summary.json | Source counts, album count, sizes, skipped extensions and conversion gaps |
| reports/skipped-photo-files.csv | Unsupported image-folder items (including possible videos, documents and other resources) |
| reports/missing-photo-conversions.csv | Any supported source photos missing a valid full/thumbnail JXL pair |
| reports/photo-alt-review.csv | Generic, non-descriptive camera filenames requiring editorial alt-text work |
| reports/photos-upload-plan.csv | Absolute local paths, exact intended R2 keys, byte counts and image/jxl MIME; **all rows default to NO for publication approval** |
| reports/file-server-owner-review.csv | File Server candidate inventory; **all rows default to NOT_REVIEWED** |
| reports/file-server-skipped.csv | Skipped symlinks/nonregular file entries |

The builder checks for an actual JXL signature, but does not re-decode or visually validate every file; do separate spot checks. It does not automatically identify private photos, licensing restrictions, malware, personal details or sensitive content. Review these before any public upload. Generated alt text is based on the source pathname, not an AI understanding of image contents; the generic descriptions are NOT accessibility-complete.

**Do not put the local staging directory, original images, or review CSVs in GitHub.** They can include names and paths not intended for publication. A private review process must approve the eventual public catalogue. Photo thumbnails and original file downloads are public the moment they're uploaded into these public R2 buckets.

## Object keys and JXL delivery

The converter produces the same directory hierarchy twice:

    full/<source-relative-path>.<original-extension>.jxl
    thumbs/<source-relative-path>.<original-extension>.jxl

Example: original photos/computers/mac/img_0100.jpg becomes R2 object key full/computers/mac/img_0100.jpg.jxl and its thumbnail becomes thumbs/computers/mac/img_0100.jpg.jxl.

For R2, assign **Content-Type: image/jxl** to JPEG XL objects. Upload the manifest as **application/json** and the homepage as **text/html**. The stable photo keys must match those inside albums.json. Do not upload JPG originals unless specifically approved.

JPEG XL-only delivery has browser compatibility limitations. Validate with the actual target browsers and provide clear feedback or a suitable fallback plan if required, before publication.

## Local preview (without any Cloudflare upload)

From a checkout of this branch, the committed demo sites can be served with:

    python3 -m http.server 8765 --bind 127.0.0.1

- http://127.0.0.1:8765/archive-sites/file-server/
- http://127.0.0.1:8765/archive-sites/photo-gallery/

These test-page references point to R2 connectivity objects, so their image links will not work in this local demo without those objects being available.

For an actual *local generated gallery* preview, construct a separate temporary folder (do NOT upload this preview folder):

    PREVIEW="$HOME/Desktop/McRetro-R2-LocalPreview"
    mkdir -p "$PREVIEW"
    cp archive-sites/photo-gallery/index.html "$PREVIEW/index.html"
    cp "$HOME/Desktop/McRetro-R2-Staging/photo-gallery/albums.generated.json" "$PREVIEW/albums.json"
    ln -s "$HOME/Desktop/McRetro-PhotoGallery-Optimised-v2/full" "$PREVIEW/full"
    ln -s "$HOME/Desktop/McRetro-PhotoGallery-Optimised-v2/thumbs" "$PREVIEW/thumbs"
    cd "$PREVIEW"
    python3 -m http.server 8766 --bind 127.0.0.1

Open http://127.0.0.1:8766/ . This preview serves only your **converted** copies via local symlinks, not originals. Keep it bound to localhost and never recursively upload that folder to R2. The generated manifest remains a draft.

## Validation

In the repository root:

    node --test .github/tests/r2-archive-sites.test.mjs
    python3 -m unittest discover -s archive-sites/tools -p 'test_*.py' -v

GitHub Actions runs both test suites on changes in this area. Tests cover known sample catalogues, HTML controls, JavaScript syntax, collision-safe image filenames, missing conversion pairs and explicit non-approval defaults.

## Later: publish only after explicit owner approval

No Cloudflare access is required or stored by this PR. Publication is **not** automatic.

1. Review the 271 skipped photo-folder files and the File Server inventory. Decide which are public, redistributable and relevant.
2. Review source pathnames, generated album names, alt text and JXL browser behaviour; edit the local draft catalogue.
3. Validate that every catalogue key has a corresponding verified source JXL and that the final download list contains only expressly approved files.
4. Prepare a resumable **dry-run** R2 upload process with exact object keys, sizes and MIME values. Do not upload until authorised.
5. Once separately authorised, upload image objects to mcretro-photos and only approved files to mcretro-files. Upload the final reviewed albums.json/catalogue.json and the HTML index pages *last*, after the files exist.
6. At that point, to route each bare hostname to its index.html, use a hostname-specific Cloudflare Transform Rule URL rewrite from / to /index.html. Do not rewrite all paths.
7. Verify the live pages and object access before editing the blog's Goodies or placeholder pages in a separate owner-approved change.

For initial connectivity testing only, the previously documented bucket-root test objects may remain. R2 public buckets do not automatically offer root directory listing. Reference: https://developers.cloudflare.com/r2/buckets/public-buckets/

## Rollback

If publication is later authorised, remove the relevant R2 index.html objects or disable the two hostname-specific URL rewrite rules. These changes would not require changing the GitHub Pages blog.
