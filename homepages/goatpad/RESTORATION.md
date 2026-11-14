# GOATPAD 1337 - fan recreation and Opus-only restoration

This is a restoration and optimisation of [insertusernamed's Goatpad-1337](https://github.com/insertusernamed/Goatpad-1337), a fan recreation of the Goat MMO Simulator music pad. The original developer's MIT licence (copyright notice: insertusername0, 2024) remains in [LICENSE](LICENSE). It applies to their licensed material; any third-party Goat Simulator music or artwork may have separate rights.

## Playback

- **Opus only:** 56 directly committed 24 kbps VBR Opus recordings, mapped to all 64 pads. There are no MP3, Vorbis or other fallback audio files.
- Eight byte-identical original recording pairs are mapped to one canonical sound each, so every pad remains playable without redundant downloads.
- Initial loading fetches the eight first-column sounds after an explicit Start click. Other sounds are downloaded and cached only when selected. Failed downloads can be retried by clicking the pad.
- **69 BPM:** the upstream developer's 27 June 2026 timing correction is incorporated, with a self-correcting audio-clock-based scheduler to reduce long-term drift. Unlike the upstream version, it stops completely when there are no selected pads and avoids a burst of catch-up beats after a suspended tab.
- The smaller PNG icon replaces the oversized favicon.
- An unobtrusive attribution link and MIT licence link are displayed beneath the soundboard.

## Historical assets and build

The **current repository tree contains only the optimised 56 Opus files** in homepages/goatpad/audio. The 64 historical Ogg recordings are *not* duplicated or retained as source files in the current tree. As is normal with Git, the original versions remain accessible in older commits; we have not rewritten published history. For the current version, Jekyll copies the Opus files directly and does not run FFmpeg or produce alternative formats.

To validate a local site build:

    bundle exec jekyll build --destination _site
    python3 .github/tests/verify-goatpad-opus.py --site _site
    node --test .github/tests/goatpad-audio.test.mjs

Browsers without Ogg Opus decoding are intentionally unsupported, per the owner's no-fallback instruction. Test the timing, appearance and sounds in a real browser before publication.
