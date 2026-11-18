# McRetro Photo Gallery and File Server - reconciled checkpoint

## 19th November 2026 - Verified EXIF technical-only result

The owner supplied the expanded, local-only ExifTool report for all 40
optimised Nintendo DS IS-NITRO JPEG XL images (20 full and 20 thumbnails).
All 40 ExifIFD sections were decoded. Exactly nine tag names were reported
globally: Composite image dimensions/megapixels; ExifIFD ColorSpace,
ExifImageHeight, ExifImageWidth; ExifTool version; and three JPEG XL
compatibility/brand indicators. **No GPS, owner, serial number, or
timestamp fields were identified.** This supports treating the 40 cases
as benign **technical-only metadata**, without recompression.

The privacy auditor now checks this exact nine-name allowlist dynamically
through ExifTool for each of the 40 local optimised JXL files, refusing
unexpected tags, missing ExifTool, or errors. It neither strips metadata
nor accesses original 26 GB files or R2. This is a narrow clearance, not
blanket metadata approval.

**Remaining prepublication findings:** the email-shaped path/thumbnail
for one photograph at public catalogue index 8283 (two warnings, one
photo) and the Project Yampad GIF's Comment and other Application
extensions (one warning). The 336-object gallery website publication
remains BLOCKED. No gallery web objects have been uploaded, PR #271 is
still draft and unmerged.

## 19th November 2026 - Latest local readback, only GIF extensions unresolved

Owner ran the targeted offline `--inspect-unresolved` on their Mac.
Results:

- **0 strict email-pattern hits**; one `@2x/@3x` JPEG XL retina-name
  false positive was recognised without revealing the value.
- **Project Yampad `animated.gif`: 3 non-loop metadata extensions**:
  two non-text Application extensions with **559 payload bytes each**,
  and one printable **25-byte Comment extension**. No sensitive-data
  regular-expression patterns were detected in any of the three blocks.
- **Previously-cleared 40 Nintendo DS JXLs remain cleared** under the
  exact allowlist for technical Exif dimensions/colour space.

Two 559-byte application blocks **may** be ICC colour profiles; byte
length alone is not proof. The GIF89a format supports embedded ICC
profiles as application extensions. The draft's local-only diagnostic was
extended to recognise standard `ICCRGBG1012` identifiers if present and
compare opaque application payload fingerprints for duplicates. The
25-byte comment contents are never printed by this diagnostic.

**Do not mark the GIF privacy-cleared yet.** The test/report has not
confirmed the application types or the comment contents. All uploaded
photos remain untouched, and no gallery site HTML, JSON, fonts or sitemap
has been uploaded. User's prior authorisation to upload the existing
design remains in scope, subject to the privacy gate passing. Do not
silently waive GIF findings, replace any R2 image, or publish partially.

## 19th November 2026 - 43 privacy flags reduced to 3, website still not uploaded

**Subsequent review of the previously supplied 8,412-photo manifest:**
photo 8283 has the display name `yampad on@3x`. The scanner's broad
email regex mistakes the standard `@3x.jxl` retina-image suffix for an
email domain. The draft publisher now exempts **only** `@2x.jxl` or
`@3x.jxl` matches occurring at the very end of photo-path/thumb
filenames, with no other email-like matches in the path. Actual email
addresses elsewhere still fail the privacy gate. Regression tests added.
**After the owner reruns the local check against current staging, the
expected remaining issue is only the Project Yampad animated GIF's
Comment and non-loop Application extensions.** No cloud or local image
objects have been changed or waived. Do not mark the public site ready
until the strict privacy preflight reports PASS.

The owner's second read-only privacy report (script commit
`3971ccca2c630c8ce129cf5dd1afcd1322fdc6d5`) confirms that 40
optimised Nintendo DS IS-NITRO JPEG XL objects contain only strictly
allowlisted Exif dimensions and colour-space fields. They **pass the
technical Exif check** without modifying original or optimised files.

Three scanner flags remain, representing two separate questions:

- `photos[8283].path` and `photos[8283].thumbnail`: the **same
  photograph** has an email-shaped substring in two public URLs.
  Its actual text has not yet been owner-reviewed.
- `full/projects/project-yampad/animated.gif`: one GIF has a true
  **Comment extension** and another **non-loop Application extension**.
  The extension payloads have not yet been shown or classified as harmless.

A new read-only local option, `publish_photo_gallery_site.py
--inspect-unresolved`, prints only **masked** filename hints and GIF
extension types, byte lengths, text/binary classification, and suspicious
data-pattern categories. It does not print email strings, comment text,
or application identifiers, and does not contact R2. The existing strict
preflight remains unchanged: this option is diagnostic and **cannot approve
publication or clear unresolved findings**.

**No gallery HTML, sitemap, fonts or public catalogue has been uploaded.
The 16,823 R2 photograph objects remain present from the earlier completed
transfer.** Existing cloud photos are not renamed, deleted or modified.
Next: inspect the safe diagnostic, get the owner's decisions on the two
remaining questions, and only then modify the public-release allowlist or
individual optimised copies as separately approved.

## Gallery publication privacy review (17th November 2026)

**Subsequent Mac audit readback:** The owner ran the local-only
`--privacy-audit` and received **43 potential issues**. The first two
were an email-shaped string in both `photos[8283].path` and
`photos[8283].thumbnail` (the same underlying photo). Other flags
included Brotli-compressed Exif boxes on optimised Nintendo DS IS-NITRO
capture JPEG XL files. Metadata box existence does **not** identify the
actual embedded tags or establish that GPS details are present. The
script prevented gallery website publication; no website objects
were uploaded in that attempt.

A diagnostic-only `--privacy-report` has now been added. It lists the
complete scanner findings and, if ExifTool is already installed, reads
the optimised files to list metadata **tag names only**, never values.
The result is **not a waiver or a passing privacy audit**, and no original
26 GB photos or R2 objects are changed. Inspect the findings before
considering whether image metadata remediation or public filenames
require a separate owner-approved plan.

The owner requested a separate privacy check before the already-approved
gallery website upload. The initial publisher was held back pending this
review. The revised draft now omits the separate original filename from
public albums.json, screens public HTML and the projected JSON for potential
personal/contact/credential strings, rejects third-party auto-loaded web
resources, and checks optimised JPEG XL container headers for Exif/XMP and
other metadata boxes. It does not read the historical originals. Any
suspicious findings stop the website upload. Already-present website objects
must also match expected downloaded bytes before any new website transfer.

The additional read-only command is
`publish_photo_gallery_site.py --privacy-audit`. It does not connect to R2.
The gallery upload has not happened. The generated folder names and public
image paths remain discoverable in the design, and visually sensitive content
cannot be cleared through automated pattern checks alone. The previously
issued upload command was for an older script; use the revised version after
running its local privacy audit. The earlier public HTTP 403 remains unresolved.

## NEW OWNER AUTHORISATION - Upload the existing gallery design

The owner has explicitly authorised uploading the existing Photo Gallery
website design to the **existing public** `mcretro-photos` bucket,
after the complete 16,823-object photo transfer was verified.

**Status at this checkpoint: upload script prepared and tested in GitHub,
but the website upload has NOT yet been executed on the Mac.**

The new guarded tool is
`archive-sites/tools/publish_photo_gallery_site.py`. Publication scope:

- **329** current generated static HTML pages, including `index.html`
- **1** public-projected `albums.json` (NOT the private generated manifest)
- **1** generated `sitemap.xml`
- **5** approved-by-allowlist staged WOFF2 fonts
- **Total: 336 distinct website keys**, excluding `.DS_Store`.

The private staged `site/albums.json` is currently a byte-for-byte copy
of `albums.generated.json`, and includes private original `source_path`
fields. The upload tool **omits** that source field and all arbitrary,
unapproved review metadata, while keeping visible gallery functionality.
It does not modify the local private catalogue or existing HTML pages.

Before uploading, the tool runs the full local staging audit and confirms
all 16,823 image keys and byte sizes on R2. It refuses extra remote keys,
missing photos or mismatched existing site sizes. It uses an exact-key
allowlist, never recursive blind copies, sets explicit MIME types, never
overwrites existing objects and uploads the homepage last. After transfer
it compares the downloaded bytes of all 336 site objects and checks MIME
samples including all fonts and entry points.

**Unauthorised / not included:** Cloudflare root URL rewrite, relaxing WAF
or public 403 handling, navigation changes on the main McRetro site,
File Server upload, private review sidecars, editing original 26 GB
photos, GitHub PR merge, or approving the 8,412 pending alt texts.

The user's Mac must still run the explicit `--upload` command. A verified
upload is needed before updating this checkpoint to "published".
An existing unresolved public JPEG XL HEAD 403 may prevent some public
requests even if authenticated R2 object verification succeeds; check
that separately before declaring the design visitor-accessible.

## LATEST VERIFIED STATUS - 17th November 2026, 17:19 AEDT

**Owner-provided Mac terminal readback confirms the PHOTO OBJECT UPLOAD IS COMPLETE.**
This section supersedes earlier incremental statuses in this checkpoint
(including references to 20 or 8,768 uploaded objects, outstanding photo
uploads, and preflight-only scripts).

- **8,412 photographs** represented by **16,823 R2 photo objects** are now
  present in the public `mcretro-photos` bucket.
- Exact total: **4,276,856,102 bytes**. Every remote photo key and size
  matched the validated optimised local catalogue.
- On the final resumed transfer, **8,055 objects / 3,780,851,355 bytes**
  were uploaded after 8,768 objects / 496,004,747 bytes were already present.
  The dashboard reported **32m 54s** for the resumed copy.
- Authenticated R2 sample: **60 of 60** stored object MIME types and byte
  sizes matched, including the 20 original pilot objects.
- Read-only downloaded-byte validation: **40 matching files, 0 differences**
  (`rclone check --download --one-way`).
- **0 objects remain to upload**. This is a complete names/sizes inventory
  and **sampled** MIME/byte verification, *not* a complete byte-for-byte
  check of all 16,823 files. Optional read-only `--deep-verify` checks
  all object bytes if the owner wants exhaustive verification.
- No further touch/rescan of the original 26 GB collection; File Server
  files, private metadata/review sidecars, generated HTML, public
  `albums.json`, sitemap, and fonts were **not uploaded**.
- All 329 generated local gallery HTML pages were previously verified,
  but **website publication is NOT authorised**.
- **Unresolved:** an earlier public HTTP HEAD returned 403 on a pilot JPEG XL
  URL. The authenticated R2 readback now succeeds. Investigate public
  delivery and Cloudflare security rules *before* publishing gallery pages.
- PR #271 remains **draft**, without merge. Owner has not authorised File
  Server uploads, site/catalogue/fonts/sitemap publication, root rewrite,
  Goodies navigation, or blog changes.
- User's terminal output is the source of this remote-state checkpoint;
  the GitHub connector cannot directly inspect the local Mac or private
  R2 account.

**Next recommended work:** inspect public object access (403) and review
the **local** gallery in a browser, then separately review and approve any
website publication. Do not rerun `--upload`: there are no missing photo
objects.

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

## Remaining work - photo R2 transfer complete; website not published

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
