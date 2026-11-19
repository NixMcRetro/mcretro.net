# McRetro File Server - private development draft

This is the **unpublished**, independent static File Server intended for
https://files.mcretro.net/. It is not the Photo Gallery. PR #281 must remain
in draft until the owner has separately approved a genuine release catalogue,
redistribution rights, privacy decisions, and guarded R2 publication.

## Current state

The HTML interface has search, folder filtering, sorting and incremental
loading without Jekyll or a backend. The checked-in catalogue.json is now
an **empty, embargoed placeholder**, not an approved archive. The interface
rejects owner-review catalogues and entries without valid sizes and hashes.
These browser checks are defensive; they do not authorise publication.

GitHub Actions tests this project with synthetic fixtures, read-only
permissions and no R2 credentials or deployment operations.

## Private file-only inventory

The independent utility at archive-sites/tools/file_server_inventory.py
requires Python 3.9+ only. It never calls the combined photo-and-file builder,
scans the Photo Gallery, uploads anything, or modifies original files.

From the repository checkout, supply the historical files directory and a
separate private staging directory **outside the Git checkout**:

    python3 archive-sites/tools/file_server_inventory.py scan \
      --source "/private/path/to/historical-files" \
      --stage "/private/path/to/new-file-server-review"

Choose a fresh staging directory per scan. The tool refuses to overwrite
review outputs and makes a private directory with restrictive permissions.
It computes size and SHA-256 for each regular candidate file, flags duplicates,
case/Unicode collisions, sensitive-looking names, and container formats, and
excludes links, unsafe keys, and selected private system sidecars.

Private output files:
- inventory.private.json: immutable candidate ID, relative path, bytes, hash,
  category, and filename risk flags.
- owner-review.csv: editable, human-reviewed decisions and evidence.
- excluded.private.csv: skipped filenames and reasons.

**Never commit these private reports to GitHub or place them in R2.** The scan
does not inspect archive members, file metadata, licences, or executables.
Its risk flags are triage only. Every item starts as HOLD, not approved.

## Owner decisions and review

For each item, set decision to APPROVE, HOLD, or EXCLUDE. An APPROVE requires:

1. content_inspected=YES after inspection of the file and any embedded
   material, archive members, and metadata.
2. privacy_approved=YES after checking the content and proposed public text.
3. rights_basis set to OWNED, PERMISSION, OPEN_LICENCE, or PUBLIC_DOMAIN,
   with non-empty rights_evidence documenting why public redistribution
   is authorised. Possession of a file is not proof of redistribution rights.
4. An explicitly reviewed public_key under downloads/, title, description,
   category, and optional year and hardware. Public names need not match
   original private filenames.

The ID, source-relative path, byte count, and SHA-256 fields are bound to
the scan snapshot and must not be changed. Never bulk-approve by extension
or folder alone. Leave uncertain files on HOLD or EXCLUDE.

After making the review decisions, produce private, approved-only previews:

    python3 archive-sites/tools/file_server_inventory.py prepare \
      --source "/private/path/to/historical-files" \
      --stage "/private/path/to/new-file-server-review"

The prepare operation checks review integrity, manual approval and rights
evidence, public metadata safety and key uniqueness, then rehashes each
approved source file. It refuses altered source bytes and previous preview
outputs. It emits only **private, non-deployable** files:

- approved-catalogue.preview.json: approved-only, public-field-only draft.
- approved-upload-plan.preview.csv: relative keys, sizes, SHA-256 and
  provisional extension-derived content types.
- approved-summary.private.json: totals and owner-review CSV hash.

These are never published by the tool. An approved-only preview is **not**
a separate owner publication decision.

## Release gates still to design

The project does not yet have R2 inventory comparison, file signature and
embedded-metadata verification, full content-type checks, exact-key guarded
uploads, remote byte/checksum verification, DNS/hosting validation, or a
separate owner-authorised deployment step. These are deliberately deferred.

No unrestricted bucket sync, delete, purge, automatic merge or publication
is permitted. Keep the archive-sites/ Jekyll exclusion in _config.yml.
PR #271 and the finished Photo Gallery remain out of scope.

## Synthetic tests

    python3 -m unittest discover -s archive-sites/tools -p 'test_file_server_inventory.py' -v
    node --test .github/tests/r2-file-server.test.mjs

Tests use only temporary synthetic files, without requiring access to a Mac
file archive or live Cloudflare R2.
