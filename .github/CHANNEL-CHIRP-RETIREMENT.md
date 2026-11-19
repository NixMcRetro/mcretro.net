# Channel Chirp retirement and preservation checklist

**Status:** Draft PR #282. Do not merge or switch off the original website yet.

## Preservation layout

- `/chirp/`: McRetro-hosted, Bird-themed front door with restored/editable
  conure articles, site-wide Light/Dark/Bird control, and local navigation.
- `/chirp/archive/`: complete **historical snapshot** of the former
  Channel Chirp Jekyll site, built into the McRetro GitHub Pages artifact.
- `/chirp/archive/adventures/`: all 229 original articles, including content
  not already reworked on McRetro.
- `/chirp/archive/pudge/`, `tillie/`, `chip/`, `diet/`, and `timeline/`:
  original content and chronology.
- `/chirp/archive/soundborb/`: the complete original Soundborb v0.8 app,
  its 509 approved MP3 clips (15,330,556 bytes total) and 509-entry manifest.
- `/chirp/archive/images/`: the 16 original website images, preserving
  existing paths for the historical snapshot.
- Original Channel Chirp repo: `ChannelChirp/website`, immutable snapshot
  **4bb407a15f29cb75000d4ef636d441af009b2a48**, 19th November 2026.
- The source repo stays unchanged. The build checks it out **only after**
  the ordinary McRetro Jekyll site has been built and then builds under
  `_site/chirp/archive` so it cannot leak source files to the root site.

The original repo has 229 posts; 50 use exact filenames already present on
McRetro and 179 do not. The Nest's existing `parrots` filter intentionally
excludes the Little Corella article from its 54 restored-conure list, but
the original archive preserves **all** original Channel Chirp posts, even
non-conure ones. The historic snapshot and rewritten McRetro articles are
distinct, labelled experiences; do not silently overwrite edited posts.

## Safeguards implemented in this PR

1. Pin original source to a specific commit, not a mutable branch or site.
2. Run a second static Jekyll build into the nested archive directory.
3. Require exact counts of 229 posts, 509 playable MP3s, a matching
   509-entry Soundborb catalogue, and 16 original images.
4. Verify each source article's requested permalink exists in the output.
5. Compare 509 audio objects, 16 images, Soundborb JS/CSS and clip catalogue
   with the source checkout using SHA256. Reject missing or changed bytes.
6. Rewrite root-relative and old-domain HTML links to local archive routes,
   retaining the main `/pagefind/` UI assets.
7. Remove a copied old `CNAME` from the nested archive output.
8. Ensure the new Nest, main sidebar and links no longer depend on
   `channelchirp.com`; build checks run before any publication.
9. No Cloudflare uploads, DNS changes, edits to the source repository,
   or merges to `main` occur in this PR.

## Release blockers before owner approval

- **Image metadata and privacy.** The original site has 16 images, including
  DNA sexing documents/certificates and old personal photographs. These
  require deliberate human visual review and metadata examination before
  republishing at a new hostname. Merely being public on the old site does
  not establish approval to republish under McRetro.
- **Legacy post privacy.** Check all 229 original articles for historical
  addresses, phone numbers, full names, buyer/adoption details and other
  information that should not be preserved publicly. Rework or redact with
  owner approval as necessary.
- **JPEG XL policy.** The archive currently preserves the old site's JPEG
  and PNG images for faithful rendering. McRetro normally prefers JPEG XL
  only. Decide on and test the conversion and metadata-stripping policy
  before merging; update all referenced asset URLs if images change.
- **External dependencies and CSP.** Old layouts use Bootstrap/Font Awesome
  CDN, Google Fonts, and some inline JS. The legacy source may need to be
  adapted to the modern McRetro CSP and local-only asset standards. A green
  Jekyll build verifies structure, not every browser interaction.
- **Browser walkthrough.** Manually test profiles, the full timeline,
  pagination, mobile layout, keyboard navigation, YouTube embeds, Pagefind,
  Soundborb playback/queue/favourites/Party Parrot, and all deep links.
- **Search/canonical and SEO.** Decide whether to mark original duplicates
  as archival or point search-engine canonicals to rewritten McRetro posts.
  Check archived sitemaps and preserve historical URL mapping.
- **Build independence.** The generated site is independent of the
  `channelchirp.com` **domain**, but the build process still checks out
  pinned files from the **GitHub source repository**. Before deleting or
  privatizing that repository, mirror a reviewed immutable source snapshot
  within McRetro or a separately maintained owned archive and update CI.
- **Retirement transition.** Do not turn off the old site until the new
  `/chirp/` and `/chirp/archive/` pages are live, all migrated audio/images
  are confirmed accessible, content is reviewed, and any intended
  redirects from old public URLs are planned and tested.

This is a preservation project, not an instruction to merge, purge, or
remove the historical source. PR #282 remains a draft for review.
