# McRetro Photo Gallery and File Server - reconciled checkpoint

**17th November 2026, 15:28 AEDT** | Source: user-supplied Mac commands and readback logs, plus draft PR #271. This is a project record, **not** a publication approval.

## Established decisions

- Keep `/Users/nix/Desktop/R2 FILES/photos` (approximately 26 GB of historical originals) untouched. The completed conversion, extra BMP recovery and in-place renaming are already done; do not scan or reconvert the original set again as part of the next steps.
- Use the approximately 4.277 GB **optimised** set at `~/Desktop/McRetro-PhotoGallery-Optimised-v2` for gallery image delivery. Its `full/` and `thumbs/` folders now have the final public names such as `IMG_0835.jxl`, with the original relative directory structure intact. No duplicate upload-ready tree.
- The recovered collection comprises **8,412 photographs**: 8,391 previously supported images, 20 Nintendo DS BMP screenshots converted to JXL, and one original animated GIF preserved unchanged. They correspond to **16,823 distinct objects**, since the GIF shares its full-image key as its thumbnail. The historical folder audit discovered **212 albums**.
- The Photo Gallery is an independent static site intended for `photos.mcretro.net`, preserving nested folders, breadcrumbs, real `/albums/<slug>-<hash>.html` URLs, static HTML and sitemap for preservation, global search, 60-item image batches, accessible viewer controls and responsive mobile layouts.
- Match McRetro.net's Korataki logo, Montserrat and Merriweather fonts, current light/dark theme tokens, compact image-first layout and manual theme toggle. Display-only folder-name rules and explicit exact-path overrides do not rename folder paths.
- Keep captions, actual visual alt text, verified scene descriptions, chip/component identifiers, searchable keywords and recovered dates **separate**, each with its own owner-approval flag. Unreviewed AI guesses and generic filename captions do not appear as public facts. Private sidecar `reviews/photo-descriptions.json` is local-only; reports and private audit metadata are never public assets.
- The File Server is separate: `mcretro-files` / `files.mcretro.net`; **987 candidate files (~0.999 GB)** remain unapproved pending provenance, licensing, redistribution, content and privacy review. Do not conflate their review with the Photo Gallery pilot.
- Do not change the main Jekyll website's Goodies page, `/photos/` or `/files/` placeholders, current blog images, or historical articles without a separate explicit owner approval. PR #271 remains **draft and unmerged**.

## Completed, with evidence

| Item | Status | Evidence / limitation |
| --- | --- | --- |
| Local 8,412-photo and 16,823-object plan | **PASS** | User pasted validator result: 4.277 GB, all paths, signatures, sizes, MIME and `NO` upload-approval fields consistent |
| Optimised names, not 26 GB originals | **DONE** | In-place rename followed by validator and 20-key dry run showing clean `IMG_XXXX.jxl` source keys |
| First live R2 test | **COMPLETE ONLY FOR 20** | User explicitly authorised ten full JXL photos and ten matching thumbnails; dedicated `upload_r2_test20.py` used |
| Remote object list, size and type | **PASS FOR 20** | User's 15:26:29 AEDT `--verify`: exactly 20 keys, expected sizes and `image/jxl` |
| Byte-for-byte data check | **PASS FOR 20** | rclone: `0 differences found`, `20 matching files`, downloaded-byte comparison passed |
| Public delivery | **PASS FOR TWO TEST URLS** | User `curl -sSI`: HTTP/2 200, `image/jxl` and correct Content-Length for `IMG_0835.jxl` full and thumbnail |
| Old root PNG | **REMOVED** | User explicitly deleted `Cozy Retro-Tech Hammock with Parrots.png` and confirmed a temporarily empty bucket before the 20-object test |
| Draft branch CI | **PASS at checkpoint** | GitHub CodeQL, Python/JS/Actions/Ruby analyses and archive validation succeeded; rerun after further changes |
| Remaining R2 gallery assets | **NOT UPLOADED / NOT AUTHORISED** | Exactly **16,803** other gallery objects remain; no further transfer approval has been given |
| Gallery page, manifests, fonts, sitemap | **DRAFT ONLY / NOT PUBLISHED** | Generated local staging expected; no readback from the owner's *current* Mac since optimised-name changes |
| Text descriptions and file-server approvals | **NOT COMPLETE** | Publication gating still required; no blanket owner approval |

The 20 pilot objects are already publicly accessible at their exact URLs on the public R2 custom domain. **Unlisted URL is not private.** The owner previously authorised this narrow public pilot. Do not assume the remainder is also approved.

## Read-only Mac staging audit: owner readback (17th November 2026)

The owner ran the new `audit_gallery_staging.py` against the local optimised collection and provided the complete JSON result. This audit **did not access the 26 GB original archive, contact R2, or modify staging files**.

| Check | Observed result |
| --- | --- |
| Photographs | **8,412** |
| Albums containing photographs | **212** |
| Generated folder routes expected | **329** |
| Image objects verified locally | **16,823** |
| Image bytes | **4,276,856,102** |
| GIF objects | **1** |
| Required staged fonts | **5** |
| Approved per-photo metadata | **0** for alt, caption, scene description, components, search terms, and capture date |
| Pending visual alt review | **8,412** |
| File Server inventory | **987**, owner review still required |
| Live/public upload authorisation | **None beyond previously uploaded 20-object pilot** |

**Three local staging discrepancies were reported, not image-conversion failures:**

1. `photo-gallery/site/albums.json` is **stale** against `photo-gallery/albums.generated.json`.
2. **0 of 329** static HTML pages exactly match the current template and manifest; every page needs a refresh or is missing.
3. `photo-gallery/site/.DS_Store` is the sole extraneous staging file; do not accidentally upload it.

**Proposed remediation:** preserve the existing *generated site folder* as a local backup outside `site/`, then run **only** `render_gallery_pages.py --html <current-template>` to rebuild the 329 HTML pages, the site `albums.json`, sitemap, and all-`NO` HTML upload plan using the existing manifest. Do not rerun `build_mcretro_r2_catalogues.py`, since that would traverse the historical original photos unnecessarily. Do not run an R2 command. Moving the old `site/` aside also isolates its `.DS_Store` without deleting it. Afterwards rerun the read-only readiness audit, expecting 329 exactly matching HTML pages, 331 planned static site objects and no extra site files.

**This remediation has been proposed, not yet shown as completed by the owner.** A technically clean result does not authorise the remaining 16,803 image objects, site HTML, captions/alt text, fonts, redirects, or the File Server.

## Local static gallery refreshed: owner readback (17th November 2026)

The owner moved the previous generated site into a local backup and reran
`render_gallery_pages.py` using the existing optimised image manifest, not
the 26 GB originals. Subsequent read-only audit results:

- **329 / 329** exact, up-to-date HTML pages; **331** expected static objects
- `site/albums.json` no longer stale; all **16,823** local optimised objects pass
- All five self-hosted fonts available, 212 albums, 987 File Server candidates
- **Only remaining technical warning:** `site/.DS_Store` recreated by Finder.
  No other unexpected static site objects or stale pages were reported.
- Photo descriptions, captions, accessibility alt text, scene/component tags,
  dates and search terms remain entirely **unapproved (0/8,412)**.

The initial audit considered any extra site file fatal, including routine Finder
metadata. The draft audit now **separately reports genuine non-symlinked
`.DS_Store` files as ignored Finder metadata**, without marking the gallery
technically inconsistent. Every other unexpected file and any symlink still
fails validation. **This does not authorise recursive directory uploads**:
future transfers must use an exact allowlist of the 331 planned static keys
and a separate owner publication approval.

Next action is to rerun the read-only audit using the updated script, then
inspect the gallery in a **localhost-only** browser session. No further cloud
upload, publication or GitHub merge is authorised.

## Owner request: put the optimised photo objects onto R2 before gallery publication

The owner asked to complete **photo uploads first** rather than continue with
the local interface and description review. This is a **sequence decision**:
the existing 20-object test is complete and a guarded, resumable script
(`tools/upload_r2_remaining_photos.py`) has been prepared for the remaining
**16,803 image objects**. As of this checkpoint, **the script has not been
executed on the Mac**, so those 16,803 objects remain *unuploaded*.

The script's default action is read-only preflight. The owner must separately
run its explicit `--upload` switch for a real public transfer. It checks the
entire optimised local catalogue's 8,412 photos, 16,823 object keys and exact
4,276,856,102 bytes, inspects R2's existing 20 verified pilot objects,
rejects extras/mismatches, and passes **only remote-missing image keys** through
a NUL-delimited rclone allowlist with `--ignore-existing`. It can resume after
an interruption without overwriting or deleting anything. It does not open or
scan the 26 GB originals. A completed transfer is verified for all remote
keys, sizes and MIME types, with 40 actual downloaded-byte samples;
`--deep-verify` is an optional exhaustive read-only check of ~4.277 GB.

**Public-access consequence:** every image uploaded to the existing public
R2 bucket can be fetched directly before any gallery homepage exists. The
gallery is NOT indexed or published by this operation. Neither HTML, JSON
catalogues, sitemap, fonts, private alt/caption approvals nor File Server files
are included. These still require their own review and authorisation.

## Further interrupted photo upload: authenticated R2 audit separated from Cloudflare public access

Owner's Mac reported that the accelerated photo-only uploader passed LOCAL
ARCHIVE and R2 INVENTORY but stopped during SAFETY INTERLOCKS at:

```
Checking public Content-Type and Length for 60 dispersed photos ...
STOPPED: Public delivery header audit failed for
full/accessories/eeprom-programmers/gq-4x/IMG_2475.jxl:
HTTP Error 403: Forbidden
```

The original pilot object had previously returned HTTP 200 with `image/jxl`.
**This HTTP 403 came from public `photos.mcretro.net`, not authenticated
R2 storage.** It could be due to Cloudflare WAF/bot controls or other
custom-domain conditions, so its actual cause remains unconfirmed.
No new upload began in this failed attempt. The last owner-supplied bucket
count was **8,768 objects**, but it must be recalculated at the next preflight.

The uploader was corrected to check all remote names and sizes through fast
`rclone lsjson --no-mimetype`, plus **authenticated R2 metadata samples**
for the original 20 pilot objects and up to 40 other existing objects. It no
longer requires the public custom domain to accept programmatic HEADs before
resuming. Public delivery is now diagnosed independently through
`--check-public`, which makes no R2 changes. Any genuine mismatched R2
object key, size, or sampled MIME still aborts before an upload. The
exact-file allowlist, no-overwrite/resume behaviour and prohibition on
touching originals/site files are unchanged.

**Outstanding:** establish whether ordinary browsers and `curl` also get 403
on the affected JPEG XL URL and inspect any `cf-mitigated`/WAF details.
Do this before publishing the gallery HTML. The photo-only transfer is
separately owner-requested and does not constitute website publication.

## Work to do next - no R2 upload or publication

1. **Recheck the current, private local staging only**, without reading the historical originals: `python3 "$HOME/Downloads/validate_r2_upload.py"`; then `python3 "$HOME/Downloads/preview_mcretro_gallery.py" --check-only` using the current gallery template and scripts. Ensure the manifest, upload-plan CSV and optimised filenames still agree.
2. **Confirm static page freshness** after the filename and metadata rules changed. Inspect `~/Desktop/McRetro-R2-Staging/photo-gallery/site/albums.json`, `site/index.html`, folder `.html` pages and `site/sitemap.xml` against the latest `albums.generated.json`. If stale, rerun the **local-only** `render_gallery_pages.py` with the current template; verify the new `reports/gallery-pages-upload-plan.csv` still marks every entry `NO`. Regeneration creates local staging files only.
3. **Review the local gallery at `127.0.0.1:8766`.** Exercise all 212 album folders, ancestor folders, direct/subtree counts, technical display names, nested breadcrumbs and Back/Forward links, global search, 60-image batches, lightbox keys, mobile layout, light/dark contrast, real deep-link routes, GIF playback and 20 Nintendo DS screenshot fidelity. Test actual JPEG XL support in target browsers. This human review has **not** been signed off.
4. **Make a private editorial review plan** for the 8,000+ generic-named images: prioritise accurate per-photo alt text, and separately review useful captions, verified hardware/components, searchable scene descriptions, and optional dates. Keep `reviews/photo-descriptions.json` private, and require independent approval flags. Neither scene descriptions nor captions may be inferred as approved from their presence.
5. **File Server remains separate and blocked** pending review of all 987 candidates, rights, filenames, potentially sensitive data, and purpose. Any historical redirects and Goodies navigation changes require their own review and owner authorisation.
6. **Only after the owner authorises a defined future batch**, prepare an exact-allowlist, no-overwrite upload plan for that specified batch. The 20 pilot entries must be excluded from any remaining-upload list except for verification. Never use `rclone sync`, blind recursive copy, deletion or overwrite.
7. **Site publication is its own explicit gate**: review and separately approve public `albums.json`, generated HTML, sitemap, fonts, any rewrite for `/` to `/index.html`, and finally any changes to McRetro.net's navigation. No implicit approval follows from a successful image test.

## Source-of-truth clarification

- `archive-sites/photo-gallery/albums.json` and `archive-sites/file-server/catalogue.json` in GitHub are **old demonstration connectivity records**, **not** the complete generated galleries or approved deployable manifests. They must not be pushed to R2 as-is.
- The full private manifest lives only at `~/Desktop/McRetro-R2-Staging/photo-gallery/albums.generated.json` and its corresponding upload plan at `reports/photos-upload-plan.csv`. The full content has not been committed to this PR. Generated local static pages and `gallery-pages-upload-plan.csv` also remain local.
- The README is workflow/design documentation; this checkpoint supersedes earlier **status** statements that predate the 20-object pilot. Historical instructions for the test upload remain as a record; they are **not** permission to rerun it.
- GitHub connector access cannot inspect the owner's local Mac staging or private Cloudflare R2 contents. The pilot's remote state is verified from user-shared terminal readback, not independently rechecked by the connector.

## Explicit protections

**This checkpoint does not authorise:** any upload beyond the original 20 objects, changing R2 access, deleting/replacing any object, publishing HTML/manifest/fonts/sitemap, amending Goodies/blog navigation, touching the 26 GB source originals, or merging PR #271.
