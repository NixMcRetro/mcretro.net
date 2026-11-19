# Channel Chirp: staged migration to McRetro

**Status:** Draft PR #282. Not merged, not published, and not authorised to
turn off either the original Channel Chirp website or YouTube channel.

## The intended experience

**One root:** `https://mcretro.net/chirp/`. There must be **no separate,
public historical-post archive**. All Channel Chirp sections and tools will
live directly beneath `/chirp/`, with coherent navigation and sidebars.

**Bird mode is a content filter, not simply an additional colour palette.**
- Light and Dark preserve the ordinary McRetro navigation, recent posts,
  blog archives, search, and post-to-post navigation.
- Bird changes the header/logo, six-item nav, sidebar, recent posts, search
  and previous/next articles to a **Channel Chirp-only experience**.
- Only released McRetro posts in `site.categories.parrots` are included,
  except those explicitly marked `channel_chirp: false`. The Little
  Corella article (three unrelated videos) is the current exception.
- The bird sidebar lists **four random published conure posts**, refreshed on page load and with a Shuffle again button
  and its search filters the released bird index; it does not search
  unrelated McRetro articles.
- Clicking the theme button can switch Light -> Dark -> Bird -> Light.
  Entering `/chirp/` activates Bird. Selecting Light from the Nest
  returns to the ordinary blog. Previously selected themes persist.
- Bird filters **existing McRetro posts only**. Changing to Bird while
  browsing the general blog, archives, or an unrelated post takes the
  visitor to the curated `/chirp/` feed instead of mixing other articles.
- On published conure posts the Bird-only navigation/sidebar apply only
  while Bird mode is selected. Light and Dark can display the ordinary
  McRetro post navigation and sidebar.

## Release cadence

The owner is **gradually re-releasing historical Channel Chirp YouTube
videos on the main McRetro YouTube channel** and adding updated blog
articles as each is ready. The original Channel Chirp YouTube channel will
eventually be retired. Do **not** bulk-publish the original 229 historical
posts or embed links to old videos that are scheduled to disappear.

- Existing released articles stay at their established McRetro permalinks.
- New posts are added as usual, normally with the `parrots` category,
  and automatically become eligible for the random-bird widget.
- Use `channel_chirp: false` for unrelated Parrots category entries.
- The original `ChannelChirp/website` repository is a reference and
  private staging/migration source, not an extra public set of blog posts.
- Record original-to-McRetro article/video IDs in a private migration
  checklist when necessary. Do not expose unpublished video URLs.
- The released-post timeline grows as each new article appears.

## Features that will move into /chirp/

- Flock profiles and images for Pudge, Tillie, and Chip, following a
  metadata and privacy review.
- The Soundborb app, its catalogue, and all **509 approved individual MP3
  clips** (15,330,556 source bytes). Preserve its queue, favourites,
  Party Parrot, and responsive layouts in a dedicated direct child URL,
  `/chirp/soundborb/`.
- Diet and flock timeline pages under the same root.
- Original channel branding adapted to McRetro's three modes and
  JPEG XL image policies.

**The Soundborb landing section on /chirp/ is a migration notice, not a
claim that the old audio has already been moved.** Do not link the new
public site to audio or a player hosted by the original domain.

## Required checks before merging or retiring the original services

1. Source review of the 229 historical articles to identify what has
   actually been re-released and what remains deliberately unpublished.
2. Publish *only* approved reworked posts, not the original bulk archive.
3. Review legacy source images for privacy, consent, embedded personal
   documents, metadata, and conversion to JPEG XL.
4. Migrate Soundborb's **approved** audio and assets under `/chirp/`
   without external domain runtime dependencies. Check hashes and real
   playback in browsers before changing the original site.
5. Test Bird content isolation, recent-posts counts, back-to-McRetro
   controls, keyboard navigation, mobile sizes, and each theme's
   header/sidebar changes.
6. Replace references to the retiring original YouTube channel in
   newly published articles with verified McRetro video URLs at the
   time of each re-release.
7. Do not remove the original site, source repository, or YouTube
   channel until all desired content and features have been approved,
   migrated, and tested.

This draft never uploads media, changes DNS, removes original assets,
or merges to `main` without explicit owner approval.
