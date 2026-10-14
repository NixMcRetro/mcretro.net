# SuperNick's OP-1 Browser Lab v1.7: Cat Modes & Song Arrangement

Date: 14 October 2026. Repository: NixMcRetro/mcretro.net. Deployment path: /homepages/op-1/.

## Features

- One physically split MEOW key follows Sound Slot 8. Upper half: **Meow Drum** (eight original kitty-percussion voices, repeated over keys). Lower half: **Meow Keyboard** (24 note-dependent pitched meows, respecting octave controls). Hover titles, keyboard focus and accessible labels identify each half. Press the active half again to return to ordinary synthesis.
- Both use original Web Audio synthesis, no external cat samples, downloads, copyrighted artwork or firmware.
- The instrument canvas renders a friendly original cat with ears, cheeks, whiskers and animated note reactions. After inactivity it sometimes curls up for a nap. The existing expanded display receives the same live drawing. Motion respects reduced-motion preferences.
- Cat performances can be recorded as note events: `catDrum` and `catKeyboard`. Tape playback, offline WAV export, bounce and per-track WAV stems recreate their sound. Loading old projects continues to recognise `synth`, `drum` and `sample` as before.
- Song Arrangement Studio: up to 16 named sections and 64 total bars, each choosing Pattern A/B/C/D, 1–16 bars, Synth/Drum/Sample/Meow Drum/Meow Keyboard voice and 1 of 4 mixer destinations. Sections can be reordered and removed. Play, stop, optionally repeat, and export the arranged song to stereo WAV (maximum three minutes per rendering).
- Separate tape-stem WAV export for T1–T4, one stem at a time. Honors tape speed/reverse and per-track gain/pan; isolates the chosen track even when the interactive mixer has mutes/solos engaged. Tape and original audio remain unchanged.

## Preservation & compatibility

- Portable JSON still uses **`op1-browser-lab-v05` and numeric version 5**. Old project files get catMode `null` and one safe default song section. New state keys: `catMode`, `songSections`, `songRepeat`. Existing `patternSlots` and `seqPattern` are reused. No database version migration.
- Existing four-track tape remains **60 seconds**. Song Arrangement plays the independent sequencer patterns and is not merged into tape; song export renders only the arrangement. Tape stems export individual recorded tape tracks. No auto-embedding of song performance into tape.
- Stems are exported individually because automatically triggering four large sequential downloads is often blocked by browsers.
- Song WAV max three minutes to avoid excessive memory in OfflineAudioContext; 16 sections / 64 bars upper bound. Re-exporting after tempo changes uses the current project tempo and effect settings.
- No changes to blog posts, user photos, archives or historical website files.
- PWA shell cache bumped to v1.7.

## Testing

- `op1-cat-song-arrangement.mjs` browser UI/state/migration tests in Chromium, Firefox, WebKit and mobile-size Chromium. Also tests actual non-silent song and recorded cat tape stems in Chromium, including saved-note roundtrip.
- All prior browser, Tape Studio, Performance Studio, Sampling Workshop and offline tests must pass.
- Manual physical iPhone Safari check remains recommended for touchscreen split-key targeting, Web Audio start restrictions and memory limits on longer song exports.

## Future considerations

- Optional named-song section duplication, project artwork-free visual arranger timeline, tempo changes per section, more drum sound variants, enhanced accessible cat animation controls. These are not implemented here.
