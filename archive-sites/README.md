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

The Photo Gallery now follows the **original nested directory structure** using folder cards, breadcrumbs, an up-one-level button, and real static folder URLs. A global search still finds images across the entire collection; image grids load in **60-image batches**. The catalogue builder adds a generated `folders` tree (parent and descendant/direct counts), while the browser also supports older manifests by reading the existing album folder paths. No images need reconverting or moving for navigation. This remains a static, backend-free site.

## McRetro layout and light/dark-mode compatibility

The separate Photo Gallery retains its responsive image viewer and window styling, but now uses the **actual McRetro.net wordmark font (Korataki)**, the main site's header proportions, matching Montserrat and Merriweather typefaces, one slim archive utility bar, and the same sun/moon theme-toggle icon treatment. Nested folder cards, breadcrumbs, global search, and 60-photo batches remain. Only the standalone gallery template changes; no Jekyll theme rebuild is required.

Colours and typography are matched to the existing **main-branch** \`assets/css/style.css\` theme tokens (including cream light background #FFF8DC, dark background #191D27, light links #0009B5, dark links #93C5FD, Montserrat-style headings and Merriweather-style body fallback). The gallery uses the main site's \`mcretro-theme\` preference key and a manual light/dark button, with system preference when unset; because subdomains have separate browser storage, choices made on mcretro.net are not automatically shared with photos.mcretro.net. The button on the gallery remembers that subdomain's choice.

The gallery's CSS remains self-contained rather than loading the entire Jekyll blog stylesheets. Its font URLs point to same-origin `/assets/fonts/...` in the independent R2 gallery bucket, **not** to cross-origin blog assets. Run the font staging script below for local preview, and only upload those verified font assets later with separate owner approval. The main blog CSS, assets, JS, and navigation have **not been changed**.

## Folder names and technical title-case rules

Source paths, folder names on disk, R2 object keys and album identifiers stay unmodified. A new display-only formatter in \`tools/gallery_naming.py\` applies ordinary title casing, known brand/acronym conventions, and owner-editable exact-path exceptions from \`config/folder-names.json\`.

The reported example becomes **All photographs › Accessories › HP L1706 17-inch LCD Colour Monitor PX849A › Serial CNK7040Y04**. Serial/model/part identifiers that cannot safely be inferred are flagged in \`reports/folder-name-review.csv\`, with original path, proposed label, review reason, approval and owner replacement columns. These **draft** labels may be refined without moving or reconverting any photograph. The gallery uses generated folder names on cards and breadcrumbs, as well as improved album titles and search terms.

To run the builder from only downloaded files (not a repository checkout), fetch these three files into Downloads together:

    BASE="https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites"
    curl -fLsS "$BASE/tools/build_mcretro_r2_catalogues.py" -o "$HOME/Downloads/build_mcretro_r2_catalogues.py"
    curl -fLsS "$BASE/tools/gallery_naming.py" -o "$HOME/Downloads/gallery_naming.py"
    curl -fLsS "$BASE/config/folder-names.json" -o "$HOME/Downloads/folder-names.json"
    python3 "$HOME/Downloads/build_mcretro_r2_catalogues.py" --names "$HOME/Downloads/folder-names.json"

Keep edited owner decisions in the source naming rules and regenerate the manifest. Do not manually rewrite URLs in image catalogue JSON.

## Owner archive audit (17th November 2026)

The owner-supplied Mac audit confirmed:

- 8,391 / 8,391 supported photographs converted successfully, **0 failed**, 212 album folders, 4.275 GB of gallery plus thumbnails.
- The 271 skipped entries were **249 .DS_Store Finder files (ignore), 20 BMP capture images (keep), 1 animated GIF (keep animation), 1 sitemap.xml (review separately, not part of the photos)**. All skipped objects together occupy only 7,640,751 bytes.
- 8,075 photographs have generic filenames and require descriptive accessibility text review. Generated filename-based alt text is a placeholder.
- The File Server contains 987 candidate files totalling 0.999 GB. These are **not approved for publication**.

The 20 BMPs are all in `consoles/nintendo/nintendo-ds-is-nitro-capture/serial-08062654/`. The GIF is `projects/project-yampad/animated.gif`.

### Step 0 - Optional local recovery of 20 BMP screenshots and one animated GIF

Use the companion local script **before regenerating** the catalogues, if these historical images should be included in the local preview:

    python3 archive-sites/tools/prepare_gallery_extras.py

That first invocation is a dry run. To explicitly create separate copies:

    python3 archive-sites/tools/prepare_gallery_extras.py --apply

The 20 Nintendo DS BMP source images become lossless JXL gallery and thumbnail copies in the existing converted tree, with no change to the original screenshots. The animated GIF is copied byte-for-byte into the converted `full/` tree, preserving its animation. Nothing is uploaded. The script verifies generated JXL images decode and checks the GIF copy checksum. Inspect the resulting DS screenshots for palette and pixel fidelity before approving publication. Any existing incomplete or mismatched output is reported rather than overwritten.

Then run the catalogue builder below again. With this optional recovery completed, the archive may list **8,412 images**, comprising the 8,391 existing converted photographs, 20 recovered BMP screenshots and one GIF, provided all outputs validate. `sitemap.xml` and Finder metadata remain excluded.

## Step 1 - Build local inventories and draft catalogues (read-only)

Run this on the Mac that contains the archives:

    python3 archive-sites/tools/build_mcretro_r2_catalogues.py

Or download the tool from this PR's branch and run it separately:

    curl -fL https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites/tools/build_mcretro_r2_catalogues.py -o ~/Downloads/build_mcretro_r2_catalogues.py
    curl -fL https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites/tools/gallery_naming.py -o ~/Downloads/gallery_naming.py
    curl -fL https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites/config/folder-names.json -o ~/Downloads/folder-names.json
    python3 ~/Downloads/build_mcretro_r2_catalogues.py --names ~/Downloads/folder-names.json

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
| photo-gallery/albums.generated.json | DRAFT photo catalogue, album paths, nested folder tree and folder counts, and 1 entry per verified image |
| reports/audit-summary.json | Source counts, album count, sizes, skipped extensions and conversion gaps |
| reports/skipped-photo-files.csv | Unsupported image-folder items (including possible videos, documents and other resources) |
| reports/folder-name-review.csv | All inferred folder display names, with technical/model flags and editorial approval columns; never published |
| reports/missing-photo-conversions.csv | Any supported source photos missing a valid full/thumbnail JXL pair |
| reports/photo-alt-review.csv | Generic, non-descriptive camera filenames requiring editorial alt-text work |
| reports/photos-upload-plan.csv | Absolute local paths, exact intended R2 keys, byte counts and image/jxl MIME; **all rows default to NO for publication approval** |
| reports/file-server-owner-review.csv | File Server candidate inventory; **all rows default to NOT_REVIEWED** |
| file-server/catalogue.generated.json | Draft File Server catalogue with **owner_review_required: true** and **NOT_REVIEWED** status for every file; never upload without review |
| reports/file-server-skipped.csv | Skipped symlinks/nonregular file entries |

The builder also accepts the recovered BMP-JXL pairs and the unchanged GIF copy; GIFs use their same full image as the thumbnail. The builder checks for an actual JXL signature, but does not re-decode or visually validate every file; do separate spot checks. It does not automatically identify private photos, licensing restrictions, malware, personal details or sensitive content. Review these before any public upload. Generated alt text is based on the source pathname, not an AI understanding of image contents; the generic descriptions are NOT accessibility-complete.

**Do not put the local staging directory, original images, or review CSVs in GitHub.** They can include names and paths not intended for publication. A private review process must approve the eventual public catalogue. Photo thumbnails and original file downloads are public the moment they're uploaded into these public R2 buckets.

## Object keys and JXL delivery

The converter produces the same directory hierarchy twice:

    full/<source-relative-path>.<original-extension>.jxl
    thumbs/<source-relative-path>.<original-extension>.jxl

Example: original photos/computers/mac/img_0100.jpg becomes R2 object key full/computers/mac/img_0100.jpg.jxl and its thumbnail becomes thumbs/computers/mac/img_0100.jpg.jxl.

For R2, assign **Content-Type: image/jxl** to JPEG XL objects. Upload the manifest as **application/json** and the homepage as **text/html**. The stable photo keys must match those inside albums.json. Do not upload JPG originals unless specifically approved.

JPEG XL-only delivery has browser compatibility limitations. Validate with the actual target browsers and provide clear feedback or a suitable fallback plan if required, before publication.

## Original photograph metadata and title recovery (local-only)

Do **not** treat camera-generated filenames such as HNTN7023 or IMG_0005 as useful public captions. The gallery generator currently uses names derived from source filenames; **no EXIF content has been inspected or approved**. The cropped browser screenshot cannot show the originals' EXIF metadata, and the optimised JPEG XL copies may not retain it.

A read-only ExifTool audit now scans **the original photo directory on the owner's Mac** and writes private reports:

    brew install exiftool
    python3 archive-sites/tools/audit_photo_exif.py

When using downloaded scripts:

    BASE="https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites"
    curl -fLsS "$BASE/tools/audit_photo_exif.py" -o "$HOME/Downloads/audit_photo_exif.py"
    python3 "$HOME/Downloads/audit_photo_exif.py"

Reports are created only in \`~/Desktop/McRetro-R2-Staging/reports/\`:

| Private report | Contains |
| --- | --- |
| photo-exif-summary.json | Counts of EXIF capture dates, camera models, embedded captions, generic filenames, GPS-present images, and error records |
| photo-exif-audit.csv | One row per source image, with available dates, make/model, existing title/description/keywords, and explicit owner-approval columns |
| photo-exif-screenshot-examples.csv | Matching records for HNTN7023 and IMG_0005 (when present under supported original filenames) |

**Important privacy guard:** The script records only whether GPS metadata exists, never actual GPS coordinates. Embedded titles, notes, keywords, and pathnames may nevertheless contain sensitive or personally identifying information. Keep both CSVs local and share only intentionally reviewed extracts. **Do not upload these reports to public GitHub, R2, Google Drive or third-party services by default.**

A date or camera model helps identify the photo, but does not explain its contents. Distinguish date metadata from actual descriptive text and visual descriptions. An EXIF caption should be treated as a suggested public title, never as owner-approved by default; descriptive accessibility alt text requires a separate review.

The audit leaves original image bytes, converted images, existing gallery titles, upload plans, and public website unchanged.

## Short, archive-friendly folder URLs

The old \`#folder=accessories%2F...\` addresses were JavaScript fragments, not real server-side pages. This PR now generates a directly fetchable HTML object for **every folder**, for example:

    https://photos.mcretro.net/albums/serial-cnk7040y04-XXXXXXXXXX.html

The ten hexadecimal characters are a stable digest of the full source folder path, preventing collisions with other identically named serial folders. These are normal \`.html\` URLs, not fragments or query parameters. They are short enough to share and easier for preservation tools to discover. The original photo folder names, image keys and file contents never change.

The generated HTML includes ordinary hyperlinks and real initial folder listings, breadcrumbs and image thumbnails. Even without JavaScript, archivists can follow links through the original folder tree. The builder also creates an XML sitemap. Internet Archive capture is not guaranteed, especially for JPEG XL image files, but this eliminates JavaScript-only navigation as a barrier.

Unlike extensionless paths, \`/albums/<slug>-<hash>.html\` directly maps to an exact R2 object key; no Worker or deep-route rewrite is necessary. The gallery homepage at \`/\` will still require the existing planned Cloudflare rewrite to \`/index.html\` when publication is separately authorised.

### Regenerate the manifest and static HTML locally

The existing catalogue builder generates \`folder.url\` for every folder. It now imports \`gallery_routes.py\` as well as \`gallery_naming.py\`. Regenerate the catalogue as usual, then render the actual HTML pages:

    python3 archive-sites/tools/build_mcretro_r2_catalogues.py
    python3 archive-sites/tools/render_gallery_pages.py

For the Downloads workflow, retrieve the current versions of \`build_mcretro_r2_catalogues.py\`, \`gallery_naming.py\`, \`gallery_routes.py\`, \`render_gallery_pages.py\`, the owner naming configuration \`folder-names.json\`, and the gallery HTML template. Then run:

    python3 "$HOME/Downloads/build_mcretro_r2_catalogues.py" --names "$HOME/Downloads/folder-names.json"
    python3 "$HOME/Downloads/render_gallery_pages.py" --html "$HOME/Downloads/mcretro-gallery-index.html"

The generator writes \`~/Desktop/McRetro-R2-Staging/photo-gallery/site/index.html\`, \`site/albums/*.html\`, \`site/albums.json\`, and \`site/sitemap.xml\`. The new \`reports/gallery-pages-upload-plan.csv\` contains only **NO** publication approvals. Nothing is uploaded or pushed to the public blog.

### Preview the working static folder URLs

The gallery retains Korataki branding and McRetro light/dark colours but has **one slim utility bar** under the wordmark, not the full site menu or an additional window-title bar.

Run \`stage_gallery_theme.py\` to prepare verified font copies locally, then \`preview_mcretro_gallery.py\` as before:

    python3 archive-sites/tools/stage_gallery_theme.py
    python3 archive-sites/tools/preview_mcretro_gallery.py --check-only
    python3 archive-sites/tools/preview_mcretro_gallery.py

The preview serves the exact pre-generated \`/albums/*.html\` routes on \`http://127.0.0.1:8766/\`, along with only verified converted image objects, approved test font paths and catalogue JSON. It binds to localhost, never serves the original archive, and never uploads to Cloudflare.

Legacy \`#folder=\` links are still recognised in JavaScript for compatibility and rewritten to the new URL when possible. Test a deep folder URL by copying it into a new tab, and verify browser Back/Forward navigation.

### Human gallery review checklist

- Browse representative photographs from **each of the 212 discovered album folders**, particularly small or large images, portrait orientation, high-detail circuit boards, serial labels and photographs with text.
- Compare the 20 Nintendo DS BMP capture conversions against the source BMPs for pixel detail and palette. If not yet recovered, run prepare_gallery_extras.py --apply on the Mac first and regenerate the manifest.
- Verify the Project Yampad GIF still animates, has the expected frame sequence and doesn't show private material.
- Review nested folder tiles, parent/child paths, breadcrumbs, browser back/forward navigation, photo counts, searches across all folders, empty results, previous/next viewer controls, and mobile layouts.
- Compare light and dark modes against mcretro.net's current theme, including the gallery's manual theme toggle and keyboard focus contrast.
- Review real visual descriptions for generic filename images before using the draft alt text for public accessibility.
- Keep the File Server's 987 candidate files unapproved until their contents, provenance and redistribution rights are reviewed.

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
