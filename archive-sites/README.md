# McRetro R2 archive sites - staged restoration

## 19th November 2026: nested URL migration (draft, NOT executed)

The owner has since reported accessing live flat URLs for The Collection
and Retired. Those old URLs hide their parent folder path. This draft
generates nested pages such as:

    /albums/the-collection.html
    /albums/the-collection/retired.html

Every old hashed link is retained as an exact same-origin, non-indexed
HTML redirect to its canonical location. No photo key, byte, album ID,
private review metadata, Cloudflare routing rule, or main McRetro site changes.

**This is a controlled website migration, not another image transfer.**
The original publisher belongs to the PRE-migration release. After
regeneration the website contains **329 canonical HTML pages, 328 legacy
redirect pages, public-projected JSON, sitemap and five fonts = 664 keys**.
All 336 original website keys remain present as redirects or updated files.

**IMPORTANT: do not rerun the old publisher --upload with new staging.**
Use the separate migration tool below. Neither committing this PR nor
running --prepare uploads anything. Older "website unpublished" assertions
later in this file refer to the prior checkpoint, not necessarily the live
current state.

### Mac-local migration sequence

Fetch a matching set of draft branch scripts into Downloads. Keep the
gallery HTML template and the other existing helpers in the same directory.
Do not rerun the catalogue builder: it traverses the protected original
archive, which this migration does not need.

    BASE="https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites"
    for tool in gallery_routes.py render_gallery_pages.py audit_gallery_staging.py publish_photo_gallery_site.py migrate_gallery_routes.py; do
      curl -fLsS "$BASE/tools/$tool" -o "$HOME/Downloads/$tool" || exit 1
    done

1. **Local preparation only:** run --prepare once, before re-rendering by
   any other means. This snapshots the ORIGINAL staged 336 website keys
   as exact PUBLIC-SAFE bytes under the private staging reports folder:
   ~/Desktop/McRetro-R2-Staging/reports/gallery-route-migration/old-site/
   The snapshot has sanitised public albums.json, never the private staged
   albums.json. An original PRIVATE manifest snapshot is held OUTSIDE that
   old-site folder. The script changes only staged folder URL fields and
   re-renders nested HTML, legacy redirects and sitemap. Never upload a
   snapshot folder.

       "$HOME/Downloads/mcretro-r2-venv/bin/python" "$HOME/Downloads/migrate_gallery_routes.py" --prepare

2. **Read-only R2 preflight:** run --preflight. It performs the existing
   strict local privacy audit, confirms all 16,823 photo keys and sizes,
   and downloads each existing website object to verify exact old/new
   allowed bytes. Unknown keys, missing originals, altered bytes or
   metadata still block migration.

       "$HOME/Downloads/mcretro-r2-venv/bin/python" "$HOME/Downloads/migrate_gallery_routes.py" --preflight

3. **Separate owner release decision required:** only after review and
   clean preflight, --upload replaces precisely those website keys that
   have been verified. New canonical pages are written first, legacy
   redirect pages next, then public JSON/sitemap and homepage last.
   It does not delete any R2 objects, alter images, touch GitHub main,
   or add Cloudflare rewrite rules. Partial uploads may be safely resumed
   only if existing remote bytes remain the reviewed old or new versions.

       "$HOME/Downloads/mcretro-r2-venv/bin/python" "$HOME/Downloads/migrate_gallery_routes.py" --upload

4. **Read-only verification:** run --verify to compare every new website
   object byte-for-byte and sample MIME headers. Test old and new links
   in a browser. Edge caching and the root "/" rewrite are separate.

       "$HOME/Downloads/mcretro-r2-venv/bin/python" "$HOME/Downloads/migrate_gallery_routes.py" --verify

No GitHub Action runs these real Mac-local commands. CI uses synthetic
local fixtures and mocked R2 responses only. Never upload the private
albums.generated.json or site/albums.json instead of the projected public
catalogue.

---

**Latest verified project state:** [17th November 2026 checkpoint](CHECKPOINT-2026-11-17.md). **All 16,823 image objects (4,276,856,102 bytes) have now been uploaded to `mcretro-photos`**, with all remote keys and sizes matched, 60 authenticated MIME/size samples passed, and 40 downloaded-byte comparisons matching. The **Photo Gallery website, HTML, sitemap, fonts, and private metadata remain unpublished**. This is a **draft, unmerged PR**, not a gallery website release. The checkpoint supersedes any earlier status statements below.

Two separate static website starters are in this **draft, unmerged PR**. Neither site has been published by this branch.

| Source | Intended R2 bucket | Domain |
| --- | --- | --- |
| archive-sites/file-server/ | mcretro-files | https://files.mcretro.net/ |
| archive-sites/photo-gallery/ | mcretro-photos | https://photos.mcretro.net/ |

The committed sample catalogues still contain **obsolete connectivity-test entries** (`mcretro-r2-check.txt` and `mcretro-r2-check.png`), **not** the full gallery or the verified 20-image pilot. They are examples only and **must not be uploaded as public catalogues**. No original photo archive, full generated photo catalogue, private review metadata or R2 credentials are committed.

**Latest owner readback:** 329/329 HTML pages now match, with current
`albums.json` and all 5 fonts present. Finder recreated a single
`site/.DS_Store` file. The draft audit now reports this ordinary Finder
metadata separately rather than making it a technical failure; all other
unexpected files or symlinks remain errors. This is **not** permission to
upload a folder recursively; only an explicitly approved, exact-key manifest
could be used for any future transfer. The next milestone is a local browser
review, not another image upload.

## Next action: read-only audit of the existing Mac staging (no source rescan)

The 20-object R2 pilot was fully verified. Before considering any wider release,
check whether the **existing local gallery catalogue, static folder pages,
sitemap, HTML and fonts still match** the 4.277 GB renamed optimised collection.

**Do not rerun `build_mcretro_r2_catalogues.py` at this stage.** Its historical
build operation walks the original ~26 GB collection, which the owner now
wants to leave completely untouched. The new `audit_gallery_staging.py` does
not open, list, or traverse the originals. It is also read-only with respect
to local staging, and never contacts R2.

Download one consistent set of current **draft branch** scripts and the gallery
template to `~/Downloads` (the exact commit can be pinned after CI passes):

    BASE="https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites"
    for f in gallery_keys.py gallery_routes.py gallery_naming.py gallery_descriptions.py validate_r2_upload.py preview_mcretro_gallery.py render_gallery_pages.py audit_gallery_staging.py; do
      curl -fLsS "$BASE/tools/$f" -o "$HOME/Downloads/$f" || break
    done
    curl -fLsS "$BASE/photo-gallery/index.html" -o "$HOME/Downloads/mcretro-gallery-index.html"

Then run:

    python3 "$HOME/Downloads/audit_gallery_staging.py" --html "$HOME/Downloads/mcretro-gallery-index.html"

The script performs local image/catalogue consistency checks, compares **all
generated static HTML pages** with the current template and manifest, checks
the staged `site/albums.json`, sitemap, HTML upload plan and five required
theme fonts, and counts independently approved photo metadata fields. It
also checks for stray files under `photo-gallery/site/` that should not be
uploaded indiscriminately. Its JSON result remains in Terminal; it does not
write a report by default.

A technical `PASS` is **not** a privacy, accessibility, copyright or public
release approval. If it reports stale pages, the **local-only**
`render_gallery_pages.py` can regenerate from the existing manifest without
reading the original 26 GB collection:

    python3 "$HOME/Downloads/render_gallery_pages.py" --html "$HOME/Downloads/mcretro-gallery-index.html"

Review each reported discrepancy before changing the staged files. If fonts
are missing, `stage_gallery_theme.py` can retrieve verified copies of
McRetro's current public fonts **into local staging only**; font use in R2
still requires separate publication approval. Do not run any real image
upload, HTML upload, site rewrite, or PR merge on the strength of this audit.

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

Source paths, folder names on disk and album identifiers stay unmodified. Public R2 JXL keys use **uppercase basenames and lowercase `.jxl` extensions**, with deterministic uppercase hash suffixes only where original file stems collide. Folder paths remain case-preserved. A new display-only formatter in \`tools/gallery_naming.py\` applies ordinary title casing, known brand/acronym conventions, and owner-editable exact-path exceptions from \`config/folder-names.json\`.

The reported example becomes **All photographs › Accessories › HP L1706 17-inch LCD Colour Monitor PX849A › Serial CNK7040Y04**. Serial/model/part identifiers that cannot safely be inferred are flagged in \`reports/folder-name-review.csv\`, with original path, proposed label, review reason, approval and owner replacement columns. These **draft** labels may be refined without moving or reconverting any photograph. The gallery uses generated folder names on cards and breadcrumbs, as well as improved album titles and search terms.

To run the builder from only downloaded files (not a repository checkout), fetch these three files into Downloads together:

    BASE="https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites"
    curl -fLsS "$BASE/tools/build_mcretro_r2_catalogues.py" -o "$HOME/Downloads/build_mcretro_r2_catalogues.py"
    curl -fLsS "$BASE/tools/gallery_naming.py" -o "$HOME/Downloads/gallery_naming.py"
    curl -fLsS "$BASE/tools/gallery_keys.py" -o "$HOME/Downloads/gallery_keys.py"
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

The R2 gallery preserves the original folder hierarchy with **single-extension JXL filenames**:

    full/<original-directory>/IMG_0100.jxl
    thumbs/<original-directory>/IMG_0100.jxl

For example, original `photos/computers/mac/img_0100.jpg` becomes R2 objects `full/computers/mac/IMG_0100.jxl` and `thumbs/computers/mac/IMG_0100.jxl`. The existing Mac converted files can remain `img_0100.jpg.jxl`; catalogue and upload plan map those local paths to the clean R2 keys without reconversion. If `scan.jpg` and `scan.png` are in the same original folder, their proposed `SCAN.jxl` keys would collide. The generator therefore adds a deterministic uppercase source-path hash suffix **to both colliding public names** and refuses to overwrite either source. Other filename stems are capitalised, but the format extension remains lowercase `.jxl` (not `.JXL`). GIF animation remains an unchanged `.gif` file and shares its thumbnail key.

For R2, assign **Content-Type: image/jxl** to JPEG XL objects. Upload the manifest as **application/json** and the homepage as **text/html**. The stable photo keys must match those inside albums.json. Do not upload JPG originals unless specifically approved.

JPEG XL-only delivery has browser compatibility limitations. Validate with the actual target browsers and provide clear feedback or a suitable fallback plan if required, before publication.

## Compact image-first gallery and McRetro theme

The independent gallery no longer wastes the top of an album on a duplicate **McRetro Photo Gallery** heading, long explanation or oversized notice. Its top content is now the folder breadcrumbs, an optional slim Folders section (only if child folders exist), a compact search field and the photographs. The semantic page heading is still available to assistive technology. Both static HTML and JavaScript navigation collapse empty child-folder lists.

The previous beige notice was caused by using the generic \`--panel\` colour. Any future gallery notice now uses McRetro.net's light/dark archive-blue palette, and the **Parent folder** and **Show more** controls use the matching archive colours (\`#EAF2FF\`, \`#064584\` in light mode, and \`#293A55\`, \`#BFDBFE\` in dark mode).

Photo thumbnails remain image-first: no generic filename labels, no repeated album name and no guessed AI captions. The optional photo viewer details still disclose the original source filename, album and a date if explicitly approved. The grid uses 60-image batches for performance; static generated pages preserve real links and image URLs for archive crawlers.

## Reviewed, searchable microchip and scene descriptions

Three kinds of text deliberately remain distinct:

- **Caption**: optional short visible title, displayed beneath the image only if \`caption_approved: true\`.
- **Scene description and components**: verified description of the photograph and exact chip/model identifiers, exposed in the optional **Photograph details** panel, searchable across the gallery **only if each field is approved**. An additional approved \`search_terms\` list can include hardware synonyms. This is ideal for searching \`315-XXXX\`, \`68000\`, \`power supply\`, \`motherboard\`, \`workbench\`, etc., when actually verified.
- **Alt text**: independently approved visual description for screen readers, not blindly copied from the folder, filename or a guessed chip ID.

No model identification is performed by the site or the generator. AI suggestions can be collected separately in a private review workflow, but **nothing is published, added to search or shown as fact until approved**.

To preserve editorial decisions across catalogue regeneration, maintain a **private JSON sidecar** keyed by original source-relative photo path. The default path is:

    ~/Desktop/McRetro-R2-Staging/reviews/photo-descriptions.json

The new source module \`tools/gallery_descriptions.py\` loads this file when present. An example format is included as \`config/photo-descriptions.example.json\` (its sample key is intentionally fictitious and all flags default to false). The file can start simply as:

    {
      "schema_version": 1,
      "photos": {}
    }

For a real photo, create an entry under \`photos\` using the exact original relative pathname, with fields such as \`caption\`, \`scene_description\`, \`components\`, \`search_terms\`, \`alt\` and \`date_taken\`. Give each an independent \`<field>_approved: true\` only after checking the original photograph, part markings and privacy. All false/unapproved values remain in the **private source file** and are excluded from public catalogue JSON even when they contain plausible text. Do not upload the sidecar or review reports to R2 or public GitHub.

Example entry (NOT a claim about any archive image):

    "consoles/sega/EXAMPLE/IMG_0001.jpg": {
      "scene_description": "Rear AV connections on a console",
      "scene_description_approved": false,
      "components": ["EXAMPLE-CHIP-123"],
      "components_approved": false
    }

When a description has actually been visually verified, change only the appropriate flags to true.

The catalogue builder reads the private file automatically if it exists, or use \`--descriptions /path/to/photo-descriptions.json\` to select another file. The generator emits \`reports/photo-description-status.csv\` and \`reports/photo-description-unmatched.csv\` to help monitor approved entries and mismatched paths. Original JPEG XL objects never need to be reconverted. The separate static page renderer and the client search read only approved fields from the generated JSON.

The accessible default thumbnail link announces its position and album, such as *View photograph 5 of 128 in Retired*. The thumbnail image has empty alt text because the control is already named. The lightbox can later display the independently approved alt text and verified scene or components.

## Original photograph metadata and title recovery (local-only)

Do **not** treat camera-generated filenames such as HNTN7023 or IMG_0005 as useful public captions. The gallery generator currently uses names derived from source filenames. A **read-only local EXIF audit has been performed** on the historical archive (48 images with a date, 42 with a camera model, no embedded captions or titles found), but **no EXIF-derived descriptions or dates are approved for publication by default**. Do not rescan the 26 GB originals as part of the current phase. The cropped browser screenshot cannot show the originals' EXIF metadata, and the optimised JPEG XL copies may not retain it.

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

The generated HTML includes ordinary hyperlinks and real initial folder listings, breadcrumbs and image thumbnails. It does not render camera filenames as card titles and includes optional verified captions only. Even without JavaScript, archivists can follow links through the original folder tree. The builder also creates an XML sitemap. Internet Archive capture is not guaranteed, especially for JPEG XL image files, but this eliminates JavaScript-only navigation as a barrier.

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

## Final-bucket photo upload preflight (read-only)

**After a change to public naming rules, regenerate your local photo catalogue and upload plan before validating or running any dry run.** Download `gallery_keys.py` alongside the catalogue builder and validator, then rerun the builder. Old `.jpg.jxl` public keys and earlier lowercase `.jxl` public keys must not be uploaded.

**Owner decision (17th November 2026): use the final `mcretro-photos` bucket.
Only the narrowly approved 20-object pilot has been uploaded and verified. No further uploads are authorised.** The existing working rclone remote is
`r2:`; a new Cloudflare bucket, API token, or remote is **not** needed.

**Public-access risk accepted by owner:** `mcretro-photos` is already connected
to `photos.mcretro.net`. After any future approved real upload, anyone with an
object URL could access that object immediately, even if the gallery homepage
is not published. The `full/` and `thumbs/` prefixes are not private areas.
No files will be transferred during the steps below.

### Local validation, no cloud access

Run the checks on the Mac with the staged catalogue and converted images:

    BASE="https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites"
    curl -fLsS "$BASE/tools/gallery_keys.py" -o "$HOME/Downloads/gallery_keys.py"
    curl -fLsS "$BASE/tools/validate_r2_upload.py" -o "$HOME/Downloads/validate_r2_upload.py"
    python3 "$HOME/Downloads/validate_r2_upload.py"

This script reads `~/Desktop/McRetro-R2-Staging/photo-gallery/albums.generated.json`,
`~/Desktop/McRetro-R2-Staging/reports/photos-upload-plan.csv`,
and `~/Desktop/McRetro-PhotoGallery-Optimised-v2/`. If the local audit
summary exists, its photo and missing-pair counts must also match.

The checks enforce: exact correspondence between catalogue keys and upload
plan keys; unique full image paths; expected thumbnail paths and shared GIF
keys; safe key names; actual converted files with correct sizes and JXL/GIF
signatures; correct planned MIME values; and every publication approval still
set to `NO`. The optional `--deep-hash` reads the converted files and
calculates SHA-256 locally, without storing hashes or modifying bytes.

### Optional rclone dry run against final bucket

After the local validation passes:

    python3 "$HOME/Downloads/validate_r2_upload.py" --rclone-dry-run

For the **already-renamed** local images, this performs a single allowlisted
`rclone copy --dry-run` for ten catalogue photographs and their associated
thumbnails, using matching local and public filenames such as `IMG_0100.jxl`.
The earlier `copyto` mode remains a compatibility fallback if the local
converted collection still has legacy names. It targets
`r2:mcretro-photos` (the final existing bucket), never creates buckets,
and cannot upload or delete an object. To **simulate** all objects rather than
a ten-photograph sample:

    python3 "$HOME/Downloads/validate_r2_upload.py" --rclone-dry-run --all

The dry run checks how rclone would behave, but **does not verify the
destination object count, decode image pixels, inspect photo contents, or
guarantee successful real uploads**. For renamed local JXL files, `--all` can use the bulk, exact-allowlist dry run.
Never use a blind recursive `rclone copy` that could include unplanned files,
and never assume that a dry run grants publication approval. Direct checks
against R2 and separate owner authorisation remain required for any future transfer.

The owner **already removed** the old root-level setup image
`Cozy Retro-Tech Hammock with Parrots.png` using an interactive, exact-key
`rclone deletefile` and verified that the bucket was empty before the first
20-object upload. Do not repeat that deletion or remove any other objects.
Never use `sync`, `delete` or `purge` against the bucket root as a cleanup shortcut.

## Correct final workflow: rename the 4.28 GB optimised images in place

**Owner decision:** The original 26 GB photograph collection is off limits. It
is never renamed, deleted, moved or reconverted. For the final public filenames,
work directly on `~/Desktop/McRetro-PhotoGallery-Optimised-v2/full/` and
`thumbs/`, which already contain approximately 4.28 GB of optimised images.
**Do not create a duplicate 4 GB `upload-ready` directory.**

The tool reads only the existing local JSON catalogue, upload-plan CSV and the
converted images. It renames the converted images **in the same directories**:
`img_0835.jpg.jxl` becomes `IMG_0835.jxl`. It preserves the folder tree
and the lone animated GIF. Colliding source stems already have deterministic,
unique clean public names in the catalogue. The script enforces those names,
does not recompress or copy images and does not access the originals.

The default invocation performs a **read-only preview**. `--apply` performs
the in-place renames, then atomically rewrites the *local staging*
`reports/photos-upload-plan.csv` to point to the new local filenames. A
rerun resumes safely after an interruption. The preflight rejects unknown
paths, symlinks, duplicate or conflicting targets, missing files, wrong MIME
types, and mismatches with the catalogue. **Neither mode contains any R2
upload or deletion operation.** After renaming, `--verify` checks names
and the updated upload plan.

From the owner's Mac with the latest draft scripts in Downloads:

    BASE="https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites"
    curl -fLsS "$BASE/tools/gallery_keys.py" -o "$HOME/Downloads/gallery_keys.py"
    curl -fLsS "$BASE/tools/validate_r2_upload.py" -o "$HOME/Downloads/validate_r2_upload.py"
    curl -fLsS "$BASE/tools/rename_optimised_jxl_in_place.py" -o "$HOME/Downloads/rename_optimised_jxl_in_place.py"

Preview, inspect, then apply locally:

    python3 "$HOME/Downloads/rename_optimised_jxl_in_place.py"
    python3 "$HOME/Downloads/rename_optimised_jxl_in_place.py" --apply
    python3 "$HOME/Downloads/rename_optimised_jxl_in_place.py" --verify
    python3 "$HOME/Downloads/validate_r2_upload.py"

Only after these checks pass should we prepare a bulk `rclone copy --dry-run`
from the converted directory to the final `r2:mcretro-photos` bucket. Always
use an explicit allowlist derived from `photos-upload-plan.csv`; ordinary
directory copies might accidentally include unplanned hidden files. The first **20-object test batch only** was
subsequently authorised; see below.

**Why did the old dry run show `img_0835.jpg.jxl`?** The earlier tool used
`rclone copyto --dry-run LOCALFILE R2:BUCKET/IMG_0835.jxl`. rclone's notice
labelled the *source basename* in its output, not the explicit destination
argument. No renaming or cloud transfer happened during that dry run. After
renaming the optimised files in place, the local and eventual R2 filenames
will match.


## Owner-authorised 20-object test upload (17th November 2026)

The owner explicitly authorised **only** the exact 20 JPEG XL objects from
the successful 15:16 AEDT dry run: ten full-resolution images and their ten
matching thumbnails. This does not authorise any of the remaining 16,803
objects, HTML pages, site publication, overwrites, or other R2 changes.

The dedicated script `tools/upload_r2_test20.py` **freezes the exact 20 keys
in source**, instead of silently reselecting the first ten catalogue photos.
It revalidates the full converted collection and upload plan, requires the
local basenames to match the final uppercase JXL names, and refuses to upload
if the destination bucket is no longer empty. Transfer uses `rclone copy`
with a NUL-separated, exact 20-key allowlist from stdin, `--ignore-existing`
to prevent overwrites, and `--s3-no-check-bucket` to avoid bucket creation.
Neither the original photo archive nor the other optimised files are changed.

From Downloads, retrieve the current draft scripts:

    BASE="https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites/tools"
    curl -fLsS "$BASE/gallery_keys.py" -o "$HOME/Downloads/gallery_keys.py"
    curl -fLsS "$BASE/validate_r2_upload.py" -o "$HOME/Downloads/validate_r2_upload.py"
    curl -fLsS "$BASE/upload_r2_test20.py" -o "$HOME/Downloads/upload_r2_test20.py"

Always start with a read-only preflight:

    python3 "$HOME/Downloads/upload_r2_test20.py"

Only because the owner expressly authorised these twenty exact objects,
the next command may be run on the Mac to transfer that batch:

    python3 "$HOME/Downloads/upload_r2_test20.py" --upload

The script immediately reads back the R2 bucket, confirming exactly the
twenty permitted keys, sizes and `image/jxl` MIME values. It then uses
`rclone check --download --one-way` against the same strict key allowlist
to verify all downloaded remote bytes against the local converted files.
The check reads data but does not delete or modify either side.

If the upload is interrupted, do **not** run `--upload` again blindly.
Instead inspect the R2 listing and use the read-only command:

    python3 "$HOME/Downloads/upload_r2_test20.py" --verify

A partial batch reports which keys are missing. Any mismatch or extra object
stops verification, rather than triggering a repair or an overwrite. The
owner's previously uploaded test PNG was separately deleted before this
authorization; the initial remote bucket was confirmed empty.

After readback, inspect browser headers for one full and one thumbnail URL
using `curl -I` or `curl -sSI`. Public URL availability depends on
Cloudflare custom-domain configuration, independent of R2 object metadata.
The static Photo Gallery site remains unpublished.


## Fast inventory and authenticated MIME check after Cloudflare 403

**Owner's Mac evidence (17th November 2026):** An earlier bulk upload
was interrupted after **8,768** R2 objects were present; a filename listing
took **3.590 seconds**. Original `rclone lsjson` required MIME lookups on
every object, which was too slow. The first acceleration used
`--no-mimetype` plus **60 concurrent public Cloudflare HEAD requests**.
That public check returned **HTTP 403 Forbidden** on the already-verified
pilot image `full/accessories/eeprom-programmers/gq-4x/IMG_2475.jxl`,
stopping the second bulk-upload attempt **before transferring anything**.

A **public-domain 403 is not evidence that R2 lost an object or changed its
bytes**. Cloudflare's custom domain may have WAF/bot protection or another
public access condition. This requires **separate investigation before gallery
website publication**; it does not justify re-uploading existing photos.

The corrected uploader now separates the checks:

1. `rclone lsjson --recursive --no-modtime --no-mimetype` quickly
   inventories **all** remote object names and byte lengths, rejecting
   unknown keys, missing original 20 pilot keys, or mismatched sizes.
2. A **second authenticated R2 `lsjson` call** uses an exact,
   NUL-delimited `--files-from0 -` allowlist to check the stored MIME and
   size for **all 20 original pilot objects plus up to 40 other distributed
   existing objects**. This avoids the public domain entirely and still
   refuses bad stored `image/jxl` or `image/gif` metadata in samples.
3. After a real transfer, repeat the strict full-name/size audit,
   authenticated sample, and downloadable-byte check for 40 dispersed
   photographs. The optional `--deep-verify` tests all object bytes.

**Only a sample of stored MIME types is checked**. The full list of
keys/sizes is checked. The sample-based approach preserves the fast listing
without pretending that every remote Content-Type was verified.

The public-domain check remains an **explicitly separate, read-only**
diagnostic:

    "$HOME/Downloads/mcretro-r2-venv/bin/python" "$HOME/Downloads/upload_r2_remaining_photos.py" --check-public

It performs the public HTTP HEAD checks and may still return 403. Do not
interpret that as a storage-integrity failure, and do not run
`--check-public` to resume a transfer.

The default preflight and `--upload` no longer require public HEAD requests.
The actual photo-only transfer still requires an explicit `--upload` and
uses the same exact keys, `--ignore-existing`, no deletions, and no access
to the original 26 GB archive.

## PHOTON UPLINK - animated Rich terminal telemetry for the photo-only transfer

The uploader's **default read-only preflight now has an animated Rich status
screen too**. It immediately shows `LOCAL ARCHIVE` while validating the 16,823
optimised objects, then `R2 INVENTORY` while rclone enumerates the public bucket,
then `SAFETY INTERLOCKS` while checking the existing pilot objects and exact
allowlist. These are truthful **phases**, not simulated transfer percentages:
during a long local scan or remote inventory, the spinner keeps moving and
the stage does not advance until its operation actually completes.
On a non-interactive terminal, or when Rich is unavailable, printed phase
messages appear instead. No upload is performed without `--upload`.

The uploader now supports an optional **Rich** live display: neon cyan/violet
panels, transferred bytes and file counts, real rclone-reported transfer
speed and ETA, active/recent file paths, warnings, and a transfer-stage label.
The 80-column layout is more compact; a wider Terminal window displays more
status panels. rclone emits structured JSON log lines (`--use-json-log`,
`--stats 1s`), parsed rather than guessed. A zero in any live counter is
never treated as proof of remote integrity. The existing post-transfer
remote key/size checks, authenticated MIME samples and downloaded-byte
checks remain authoritative for their respective scopes.

Use a small isolated Python environment rather than modifying macOS-managed
Python or globally installing dependencies:

    python3 -m venv "$HOME/Downloads/mcretro-r2-venv"
    "$HOME/Downloads/mcretro-r2-venv/bin/python" -m pip install 'rich>=13.9,<15'

Download `r2_neon_dashboard.py` **alongside** the existing uploader and its
helpers, using the same branch or pinned commit.

Preview the interface **without any filesystem scan, rclone invocation,
Cloudflare request or image upload**:

    "$HOME/Downloads/mcretro-r2-venv/bin/python" "$HOME/Downloads/upload_r2_remaining_photos.py" --demo

The banner says **SIMULATION // NO NETWORK** and never represents demo
bytes as actual transfer progress. Running the default command (no flags)
remains a real **read-only preflight**. The transfer only begins when the
owner runs `--upload`; it uses the *same* strict allowlist, existing-key
protection and resumable transfer mechanism. For a live dashboard during that
real transfer, invoke the uploader through the venv Python:

    "$HOME/Downloads/mcretro-r2-venv/bin/python" "$HOME/Downloads/upload_r2_remaining_photos.py" --upload

**Do not** run the real command merely to preview the appearance.
The dashboard adds no photo uploads of its own, never contacts the original
26 GB source archive, never downloads unapproved packages automatically, and
never publishes site HTML, private metadata or File Server files.

## Owner-requested photo-only R2 upload after the successful 20-object pilot

**STATUS UPDATE - COMPLETE (17th November 2026, 17:19 AEDT):** The owner ran the resumed photo-only upload successfully. Exactly **16,823 of 16,823** planned image objects, **4,276,856,102 bytes**, were matched in R2, with 60 authenticated MIME/size samples and 40 downloaded-byte samples passing. **0 photo objects remain.** The instructions below document the already-completed procedure and must **not** be treated as an invitation to repeat it. The remaining work is public HTTP access investigation (a previous HEAD returned 403), local gallery interface review, accessibility metadata review, and separately authorised HTML/site publication.

The owner has asked to **put the optimised photographs onto R2 first**, before
reviewing or publishing the gallery HTML. This is a change of **sequence**, not
an authorisation to upload the File Server, private metadata, static gallery
pages, fonts, or blog changes. Unlike the first 20-image test, the bulk
photo-only transfer has **not yet run**, and must be triggered explicitly
from the owner's Mac.

The local 17th November audit confirmed **8,412 photos**, **16,823 distinct
image objects**, **4,276,856,102 bytes**, and **329/329 current local static
pages**. All five fonts are staged but must not be uploaded alongside photos.
The single unexpected `.DS_Store` is ignored by the staging auditor, never
included in the strict image allowlist.

`tools/upload_r2_remaining_photos.py` accepts only paths from the validated
`photos-upload-plan.csv`, exactly matching converted image filenames in
`~/Desktop/McRetro-PhotoGallery-Optimised-v2`. It freezes those counts and
bytes, requires the 20 successful pilot objects to exist unchanged on R2,
checks every already-present image key, size, and MIME, and refuses any remote
object not in the photo plan. It does **not read the 26 GB original tree**.
It never alters staging approval fields or publishes any site files.

From Downloads, fetch a mutually compatible set of tools:

    BASE="https://raw.githubusercontent.com/NixMcRetro/mcretro.net/feat/r2-archive-sites-starter/archive-sites/tools"
    for f in gallery_keys.py validate_r2_upload.py upload_r2_test20.py upload_r2_remaining_photos.py; do
      curl -fLsS "$BASE/$f" -o "$HOME/Downloads/$f" || break
    done

Run the default **read-only preflight**:

    python3 "$HOME/Downloads/upload_r2_remaining_photos.py"

It should report 20 existing and **16,803 missing** objects, totalling the
remaining ~4.27 GB, with no extra R2 keys. The public custom domain means
uploaded photographs are accessible to anyone who knows or guesses their
direct URL **even while the gallery index is not published**. Review any
privacy-sensitive material before executing the upload.

Once the owner decides to run the public photo-only transfer on their Mac:

    python3 "$HOME/Downloads/upload_r2_remaining_photos.py" --upload

This invokes a NUL-delimited, exact-key `rclone copy --files-from0 -` with
`--ignore-existing`, copying **only objects missing at the time of the
preflight**. Existing 20-object pilot keys are not passed for upload. No
deletions, overwrites, recursive unfiltered copies, generated catalogues,
HTML or `/assets/fonts/` are selected. A transfer interrupted partway
through can be resumed with the same explicit `--upload` invocation:
the script relists R2, rejects any unexpected or mismatched objects, and
copies only still-missing keys.

After uploading, it confirms the **exact 16,823 remote keys and sizes**, checks browser-facing `image/jxl` or `image/gif` MIME types for 20 pilot objects and up to 40 dispersed samples, and uses
`rclone check --download --one-way` for **40 dispersed, deterministic
non-pilot object samples**. This byte sample is stronger than remote
metadata checks, but it **does not** establish that all 16,823 objects match
byte-for-byte. For optional exhaustive validation, the owner can run the
following **read-only** command, which downloads approximately 4.277 GB of
R2 object data and may take significantly longer:

    python3 "$HOME/Downloads/upload_r2_remaining_photos.py" --deep-verify

Or, to repeat the exact remote key/size/type checks and 40-byte sample
without uploading:

    python3 "$HOME/Downloads/upload_r2_remaining_photos.py" --verify

A successful photo-only upload does **not** approve captions, accessibility
alt text, search metadata, albums.json, generated HTML, sitemap, the
File Server, Goodies navigation, or merging this draft PR. Keep those
reviews and publication gates separate.

## Validation

In the repository root:

    node --test .github/tests/r2-archive-sites.test.mjs
    python3 -m unittest discover -s archive-sites/tools -p 'test_*.py' -v

GitHub Actions runs both test suites on changes in this area. Tests cover known sample catalogues, HTML controls, JavaScript syntax, collision-safe image filenames, missing conversion pairs and explicit non-approval defaults.

## Owner-approved gallery design upload: existing site artefacts only

On **17th November 2026**, after the owner verified the complete **16,823**
photo objects on R2, the owner explicitly requested: **"Let's upload the
existing design we have."** This authorises the **existing Photo Gallery
design** only, not changes to McRetro.net, the File Server, private review
sidecars, or unrelated content.

New tool: `archive-sites/tools/publish_photo_gallery_site.py`.

It will check the local gallery audit first, including exact matching of
**329 generated HTML pages**, the saved `site/albums.json`, sitemap, five
WOFF2 fonts, the image plan and source-free review flags, without opening the
26 GB historical originals. It checks that **all 16,823 images** are still
on R2 with their expected keys and sizes before publishing the HTML.

**Critical data minimisation:** the local staged `site/albums.json` is
literally a copy of the **private** `albums.generated.json` manifest. It
contains `source_path` fields that the browser does not need. The tool
**never uploads that private file**. Instead, it generates an equivalent
public-facing `albums.json` with a minimal set of display/navigation
fields. It omits the private original `source_path` **and the separate original
`filename` attribute**. The browser derives a display name from the public
image URL if required. Unreviewed guesses, arbitrary fields, review sidecars
and local filesystem paths are excluded. This first design release also
**refuses any newly approved descriptive fields** until a separate editorial
review; the current metadata approval count is zero. The release does **not**
invent alt text or captions.

### Privacy hardening before the first public gallery release

**Latest owner-reviewed metadata (19th November 2026):** The initial
43 privacy scanner findings were resolved individually without changing
any optimised photos. Forty Nintendo DS JPEG XL objects contained only
strictly allowlisted dimensions and colour-space tags. The two apparent
email warnings were one `@3x.jxl` retina-image filename and were fixed
with a narrowly constrained filename-pattern exception. The remaining
Project Yampad GIF was found to contain **two identical Display P3
colour profiles** and the exact benign 25-byte comment
`Optimized using ezgif.com`, with both profile copyright tags reading
`Copyright Apple Inc., 2017`.

The draft publication script now performs an **exact, fail-closed** check
for these GIF values on each privacy preflight, including all ten approved
ICC tag names for both profiles, their exact descriptions and copyright
values, identical ICC payloads and no additional extensions. The
specific GIF may pass without stripping metadata if the owner's
Mac confirms the same values. This does **not** allow arbitrary comments,
unknown profiles, or other GIFs. The owner has **not yet rerun**
`--privacy-audit` against this newest script; the gallery website
remains **unpublished** pending that live readback and the previously
authorised `--upload`.

The publication script now runs a **fail-closed local privacy check** before
any upload. It checks the public-projected catalogue and every generated
HTML/sitemap file for high-risk exposed strings such as absolute user
directory paths, email addresses, credential-like text and sensitive
location/identity labels. It rejects external **auto-loaded** scripts,
frames, remote CSS and image resources. It does not reject passive
navigation links back to McRetro or File Server.

It also examines **only the already-optimised JPEG XL and GIF files** from
the validated local photo plan. For every JPEG XL it parses container box
headers without decoding the pixels, looking for Exif, XMP, JUMBF, JPEG
reconstruction metadata, Brotli-compressed metadata and unknown custom boxes.
These can retain personally identifying details or GPS information, and are
blocked for human review. Raw JXL codestreams cannot carry these container
boxes. This check **does not read the 26 GB original photo archive**, alter
the uploaded photos, or guarantee that the visible picture itself contains
no sensitive information.

For a completely offline privacy preflight:

    "$HOME/Downloads/mcretro-r2-venv/bin/python" "$HOME/Downloads/publish_photo_gallery_site.py" --privacy-audit

The default preflight and `--upload` run the *same privacy checks*.
Detected concerns prevent upload; do not bypass them. If any web objects
already exist on R2, their **downloaded bytes are checked before new files
are uploaded**, because a matching byte count alone would not rule out a
stale or private `albums.json`.

**Real owner readback (November 2026):** the local-only privacy audit stopped
with **43 potential issues**, including two flags on the same public
photo[8283] path/thumbnail, plus Brotli-compressed Exif boxes within the
optimised Nintendo DS IS-NITRO capture collection. This means metadata
**exists**, not that any particular GPS/personal tags are confirmed.
No website objects were published by that audit. The existing images
were previously uploaded to R2, and that is a separate public exposure.

The follow-up diagnostic is local-only and intentionally **does not clear**
the publication gate:

    "$HOME/Downloads/mcretro-r2-venv/bin/python" "$HOME/Downloads/publish_photo_gallery_site.py" --privacy-report

It prints **all** scanner findings, not merely the first 12. If an existing
`exiftool` is found, it additionally reads the flagged optimised JPEG XL
images and prints **metadata tag names and counts only**, never tag values
(GPS coordinates, names, or device identifiers are not printed). The report
also prints all unique tag names and groups, with an explicit indication
when no Exif/GPS group was decoded. A structurally parsed GIF extension
check now distinguishes actual comments/XMP from normal NETSCAPE looping
extensions or accidental byte matches inside compressed image data. This is
useful for deciding whether to review/remove metadata. It does not
automatically determine whether a tag is harmless. The report does not
write an output file, contact R2 or run an upload. If ExifTool is missing
or unable to decode Brotli-compressed Exif, the report explicitly says
the content remains uninspected. Avoid posting any potentially
identifying raw paths or metadata values when sharing diagnostics.

**Human review remains essential.** The gallery publicly exposes folder
names, archive image URLs, title text and visually recognisable people,
addresses, serial numbers or background details. It also publishes a sitemap
that makes the full folder structure easy to discover. The 16,823 image
objects are *already* in a public R2 bucket; approving the website will make
them much easier to find. Automated pattern checks cannot certify that all
8,412 photographs and folder names are appropriate for public distribution.
Metadata scans on the local optimised files do not independently re-download
and inspect every remote object. Public HTTP 403 rules must be investigated
separately.

The uploader has a fixed **336-key allowlist** and ordered publication:

1. Five self-hosted `assets/fonts/*.woff2` objects
2. The public-projected `albums.json`
3. All 328 nested `/albums/*.html` pages
4. The static `sitemap.xml`
5. The root `index.html` **last**

It uses `rclone copy --files-from0 - --ignore-existing`, per-group explicit
`content-type` metadata, and no delete/sync/overwrite command. Unexpected
objects, missing photos or conflicting existing website sizes stop the
transfer. A partial attempt can be resumed by checking the same keys, with
unchanged site objects skipped.

After publication, a read-only audit checks all remote keys/sizes, performs
**downloaded-byte comparisons for all 336 website files**, and verifies
sampled Content-Type including all fonts and entry-point files. The original
16,823 photo objects are not retransferred.

From the owner's Mac, first fetch matching `tools/` helpers from the
draft branch or a pinned commit. The local source template is
`~/Downloads/mcretro-gallery-index.html` and the staging folder is
`~/Desktop/McRetro-R2-Staging`.

Read-only validation:

    python3 "$HOME/Downloads/publish_photo_gallery_site.py"

Owner-approved upload:

    python3 "$HOME/Downloads/publish_photo_gallery_site.py" --upload

Read-only post-upload check:

    python3 "$HOME/Downloads/publish_photo_gallery_site.py" --verify

**No Cloudflare hostname rewrite is performed.** R2 does not automatically
treat `/` as `/index.html`. The existing design may be directly viewable at
`https://photos.mcretro.net/index.html`, while the bare hostname may require
a separate hostname-specific `/` to `/index.html` URL Rewrite Rule.
The previously observed public JPEG XL **HTTP 403** is an independent
delivery/security issue; authenticated R2 transfer success alone does
not demonstrate that visitor requests work. Check public GET responses,
Cloudflare security logs and browser rendering before declaring the site live.

This publishes the design in its **current editorial state**. All 8,412
photos still need individual accessibility alt review and possibly useful
captions; no AI text is silently approved. PR #271 stays draft and must
not be merged as part of R2 publication.

**Owner's next report:** The all-findings report confirmed the original
43 alerts comprise 40 JXL metadata-box warnings (20 full-size
Nintendo DS IS-NITRO capture images and 20 thumbnails), two path/thumbnail
email-pattern hits on the same photo, and one Project Yampad animated GIF.
ExifTool reported nine tag names for each of the 40 JXLs, with zero
**identified** sensitive tag-name patterns and zero unparsed files.
This is NOT yet proof that their compressed Exif contents were
decoded. The improved next diagnostic prints the tag names/group names
so the owner can distinguish Exif from generic JXL/file metadata.
Do not modify the already-public R2 photos or weaken the site upload gate
until the relevant metadata and URL have been reviewed.

### Verified technical-only Nintendo DS Exif follow-up

The owner's expanded read-only metadata diagnostic confirmed that all
**40** flagged Nintendo DS IS-NITRO JPEG XL files actually expose exactly
the following **nine** ExifTool tag names (full-size images and thumbnails):
`Composite:ImageSize`, `Composite:Megapixels`, `ExifIFD:ColorSpace`,
`ExifIFD:ExifImageHeight`, `ExifIFD:ExifImageWidth`,
`ExifTool:ExifToolVersion`, `Jpeg2000:CompatibleBrands`,
`Jpeg2000:MajorBrand`, `Jpeg2000:MinorVersion`. ExifTool identified
**no GPS, camera owner, serial, timestamp or other potentially private
metadata tag names**, and parsed ExifIFD content in all 40 files.

The privacy preflight now **automatically clears compressed Exif only when
the exact technical-tag allowlist is verified on the local optimised JXL**
using ExifTool, with no parser errors, unrecognised tags or malformed image
dimensions. Any extra tag, missing ExifTool or failed read remains blocking.
This does **not** remove metadata, change image bytes or relax the public
filename/GIF privacy requirements.

**Still unresolved:** the email-shaped public image name for
`photos[8283]` (two path/thumbnail warnings referring to one photograph),
and the Project Yampad animated GIF's actual **Comment** and **other
application** extensions. A full privacy diagnostic or content review
is needed for those, before running the public site uploader. The existing
R2 photo collection remains unchanged.

## Later: publish only after explicit owner approval

No Cloudflare access is required or stored by this PR. Publication is **not** automatic.

1. The 271 skipped photo-folder items were already classified: 249 Finder metadata files excluded, 20 BMP screenshots recovered, one animated GIF preserved, and one original sitemap.xml excluded pending separate review. Focus remaining checks on fidelity, privacy, rights and the File Server inventory rather than reprocessing the originals.
2. Review source pathnames, generated album names, alt text and JXL browser behaviour; edit the local draft catalogue.
3. Validate that every catalogue key has a corresponding verified source JXL and that the final download list contains only expressly approved files.
4. Prepare a resumable **dry-run** R2 upload process with exact object keys, sizes and MIME values. Do not upload until authorised.
5. Once separately authorised, upload image objects to mcretro-photos and only approved files to mcretro-files. Upload the final reviewed albums.json/catalogue.json and the HTML index pages *last*, after the files exist.
6. At that point, to route each bare hostname to its index.html, use a hostname-specific Cloudflare Transform Rule URL rewrite from / to /index.html. Do not rewrite all paths.
7. Verify the live pages and object access before editing the blog's Goodies or placeholder pages in a separate owner-approved change.

The old root test PNG in `mcretro-photos` is gone; the first 20 image objects are the only currently confirmed uploaded Photo Gallery objects. The draft **sample** catalogues are still not suitable for deployment. R2 public buckets do not automatically offer root directory listing. Reference: https://developers.cloudflare.com/r2/buckets/public-buckets/

## Rollback

If publication is later authorised, remove the relevant R2 index.html objects or disable the two hostname-specific URL rewrite rules. These changes would not require changing the GitHub Pages blog.
