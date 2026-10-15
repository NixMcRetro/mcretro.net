# OP-1 Browser Lab v2.6: Stage 4, Finish Your Song

Date: 15 October 2026
Repository: NixMcRetro/mcretro.net
Feature branch: op1-v2.6-song-builder
Baseline: v2.6 Stage 3 at 95ddf3173fe32f0e0fe84b3f813a828b5ef0d0ed
Published main at baseline: 069baec40cf9539c44c1164cceec57c015a6e0a7

## Purpose
Make it easy for the user to finish and share original music they created. The primary experience is no longer constrained by the original OP-1 hardware interface. All historical tools, arrangements and project files are preserved.

## What this milestone adds
1. "Finish Your Song" panel within the simple Tracker Song Builder. Clearly distinct actions: Export Finished Song WAV and Save Editable Project.
2. A direct Finish Song / WAV shortcut from the v2.6 start screen, alongside Make a Beat, Write a Melody, Try a Song and Build a Song.
3. Real stereo WAV export of the complete current EDITED arrangement in order. Audio is rendered via OfflineAudioContext using the existing independent tracker voice mixer, channels, filters, effects and safe audio engine. This is not the old tracker pattern-chain WAV exporter.
4. Finished song export encodes uncompressed PCM at 32,000 Hz, stereo, 16-bit, with a short tail. A descriptive downloaded filename distinguishes it from the older tracker chain.
5. The finishing panel shows the number of sections, approximate song duration and BPM, and reports rendering, WAV preparation, success or export failure. It limits exports to three minutes to bound memory/runtime on mobile browsers. Empty arrangements or recordings with no notes cannot be exported.
6. Missing samples, unsupported OfflineAudioContext and simultaneous playback/recording/export produce a clear, non-destructive error instead of exporting a misleading empty project.
7. Save Editable Project reuses the established "saveProject" handler and portable v5 JSON/audio-embedded format, including existing tape, samples and Song Workspace. No duplicate storage or project format migration.
8. Tracker edits, undo and redo are guarded against modifications while offline WAV rendering is active.
9. Visible website heading and title are v2.6, the service worker caches the v2.6 shell, and existing browser regression assertions are updated. This is a release candidate only, not authorisation to publish.

## Compatibility, test and operational requirements
- The new `.github/tests/op1-song-finish-v26.mjs` validates actual downloaded RIFF/WAVE PCM audio (two channels, 32 kHz, 16-bit, expected duration and nonzero sample data), editable project backup, original tracker/song/tape data preservation, and mobile layout.
- The tests include Chromium, Firefox and WebKit. Keep the full existing OP-1 regression suite, including Studio Comfort, offline/PWA, v2.3 tracker, v2.4 performance, v2.5 sound design and v2.6 Stage 1-3 checks.
- Legacy pattern-chain WAV and MIDI exporters remain as independent expert tools.
- The export follows the edited tracker arrangement, not other independent Song Workspace and tape content. It does not promise capture of live-to-tape mixer automation as part of its finished WAV. Project backups do preserve independent tape/Song Workspace state.
- Musical quality, iPhone Safari playback, touch usability and real speaker/headphone output still merit manual testing.
- No McRetro blog posts, images, general GitHub Pages workflow, unrelated site assets or underlying copyrighted firmware/artwork have been modified.

## Publication gate
Development is authorised, not publication. Do not update main until user explicitly says to publish/push. Review all branch changes, check exact SHA and successful GitHub Actions run first, fast-forward without force, then report deployment status honestly.

## Beyond v2.6
Future possible work: unified cross-studio transport and whole-project mixdown, project-level export naming, optional longer offline renders and integrated arrangement/tape workflows. These are not claimed in v2.6.
