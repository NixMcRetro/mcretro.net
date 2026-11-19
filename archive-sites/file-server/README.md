# McRetro R2 File Server (unpublished draft)

This directory contains a **starter interface only** for a separate File Server at
`files.mcretro.net`. It has not been approved for publication or connected
to any completed redistribution/rights review.

- `index.html` is a static browser UI intended to consume a public-safe catalogue.
- `catalogue.json` contains only a **historical connectivity-test example**, not
  a verified production file inventory. The `mcretro-r2-check.txt` entry
  **must not be uploaded as a real catalogue**.
- File rights, descriptions, source metadata, and any R2 upload authorisation
  require independent owner review.
- There is deliberately **no deployment workflow** in this draft branch.
- This project is kept separate from the fully published Photo Gallery.
- No R2 buckets, original files, or Cloudflare configuration are changed by
  this repository-only draft.

The original combined prototype was discussed in PR #271. This branch
preserves the unfinished File Server UI without blocking Photo Gallery
source code from being merged into `main`.
