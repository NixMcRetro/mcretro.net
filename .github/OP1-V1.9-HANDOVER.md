# SuperNick's OP-1 Browser Lab v1.9: Piano Roll Studio

Date: 14 October 2026

## Scope

A polyphonic MIDI writing and playback workspace separate from the older monophonic Pianola. The existing four-track tape, Song Arrangement, Sampling Workshop, Pattern A-D and Synth Note Player continue to function. No firmware, external cat sounds or proprietary artwork. No blog assets modified.

## New interface

- Piano-roll grid from MIDI C2 to B6 (60 semitones), fixed pitch rows, bar guides for 2/4, 3/4, 4/4 and 6/8, horizontally and vertically scrollable on phone.
- Tap empty grid space to draw a note of a chosen duration (whole, half, quarter, eighth or sixteenth). Notes may overlap to produce chords.
- Select a note, drag to move pitch/time or drag its right edge to resize. Keyboard-accessible selected-note inspector edits pitch, start, duration and velocity.
- Grid snap (sixteenth/eighth/quarter), quantisation, subtle timing/velocity humanisation and up to 40 in-session undo states.
- Record played computer/on-screen keyboard notes into the roll with a dedicated RECORD KEYS button; recording is independent of tape REC.
- Copy the older Pianola's monophonic notes into the roll without changing the Pianola.
- Polyphonic synth playback with per-note velocity, and stereo WAV export via OfflineAudioContext.

## MIDI handling

- Import Standard MIDI File format 0 or 1, up to 16 tracks and 2 MiB, using bounded parsing with running status, note on/off, tempo and time-signature metadata.
- Supports simultaneous notes and velocity. Times quantise to sixteenth notes on import. Controllers, pitch bend and program changes do not affect the imported notes; the user selects the Browser Lab synth patch for playback.
- Reject variable tempos, changing time signatures, SMPTE timestamps, truncated data, hanging note-ons, scores outside 128 quarter-note beats, more than 512 notes, out-of-range C2-B6 pitches and note lengths beyond 16 quarter beats. Reject rather than silently truncating incompatible parts.
- Export standard MIDI format 0 with original imported/contemporary roll note timing and velocities, time signature and tempo.

## Compatibility

- Project save format remains `op1-browser-lab-v05`, `version:5`, adding only optional `pianoRoll:{meter,bpm,notes}`.
- v1.8.1 projects load with an empty pianoRoll. Existing Pianola, synthScore, song Sections, sound slots and tape content are not migrated or altered.
- Play mode stops competing song/pattern/Pianola transport to avoid two schedulers overlapping.
- PWA shell version updated to `op1-browser-lab-shell-v1.9`; local audio samples and project storage remain uncached by the service worker.

## Limits

- 512 roll notes maximum; 128 quarter-note beats; visible MIDI C2–B6; a single BPM and time signature in the imported piece; max 3-minute stereo WAV export.
- No tempo automation, arbitrary multi-timbre sound banks, sustain pedal replay, automation lanes, notation staff, MIDI controller connection or built-in cloud syncing.
- Physical iPhone Safari, touch drag and microphone/MIDI hardware require separate manual verification. Automated browser tests are not a substitute for physical device testing.

## Release procedure

Develop only on `op1-v1.9-piano-roll-studio`. Run `.github/tests/op1-piano-roll-studio.mjs` and the entire previous regression suite on Chromium, Firefox and WebKit. Preserve all unrelated repository files. Do not fast-forward main, trigger the full Jekyll/Pagefind deployment or claim release publication without explicit approval.

## Follow-up v2.0 ideas

Visual song timeline combining Pianola, Piano Roll and A-D Patterns, dedicated clip duplication/looping, instrument automation, optional Web MIDI device input, improved responsive navigation, and optional MusicXML export. These are proposals, not implemented v1.9 features.
