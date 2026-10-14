# SuperNick's OP-1 Browser Lab v2.5: Sound Design & Focus

Repository: NixMcRetro/mcretro.net
Staging branch: op1-v2.5-sound-design-simplification
Production starting SHA: e8b32df0d563b965515180f24de4146a873d1bfd
Publication permission: not granted. Do not update main without a separate explicit instruction.

## Purpose
Restore the original OP-1's approachable musical sketchbook workflow: play sounds, compose a pattern, record to tape, and keep your work. Do not remove the advanced workstation capabilities users already rely on. Use only independently designed audio and interface assets; no proprietary firmware or OP-1 artwork.

## Work in this release
- Focus mode has a four-step orientation: PLAY, CREATE, TAPE, KEEP. Existing Sounds, Compose, Record & Mix and Tools groups remain addressable, with All Tools retaining every original editor.
- Prominent quick links to a tracker song, drum sequencer, tape and project backup. Focus mode retains exactly one active studio panel.
- New compact tracker Music Library with 18 original compositions, live search and style filtering; preview is non-destructive, loading requires an explicit action and offers undo.
- Eight added original songs: Copper Circuit (108 BPM), Starlight Sequence (118), Glitch Garden (138), Night Bus (86), Neon Coast (100), Sunrise Rush (128), Tiny Satellites (116), Soft Signal (78). The ten original v2.4 tracks remain.
- Tracker advanced sections (live performance, mixer, musical feel and instructions) are collapsed by default for Focus mode, accessible by a single tap. All Tools opens the more detailed controls by default.
- Tracker expression: optional swing (0, 12, 25, 40%), per-step note length (50%, 100%, 200%, 400%) and deterministic note chance (25%, 50%, 75%, 100%), plus preset/soft/plucky synth envelopes.
- Four tracker channel tone low-pass controls and independent global-effects send amounts, running within the isolated tracker submix and the existing master compressor/limiter. Defaults preserve previous settings.
- Portable project schema remains op1-browser-lab-v05, version 5. Missing tracker/channel/step fields are normalized to original settings.
- The existing v2.4 live pattern launcher, automation and live-to-tape capture are retained. v2.5 does not add a shared global transport or exact non-destructive capture of performed pattern transitions into a new editable timeline.

## Regression expectations
- Confirm all 18 demo scores have playable arrangements, old sample/synth/tape projects round-trip, and preview does not change the project.
- Verify Focus/All Tools navigation including mobile 390px layout and accessible expanded advanced controls.
- Run existing cross-browser tracker, mixer, tape, sequencer, WAV/MIDI and PWA/offline suites.
- Listen to all new compositions on real speakers/headphones; automated tests do not assess their musical quality.
- Physical Safari iOS MIDI, Web Audio output, MediaRecorder codecs and long sessions require additional hands-on checks.
- Inspect branch diff against current main; only OP-1 files, regression workflow/tests and this handover should change.

## Release gate
Wait for a complete successful browser suite on the final feature branch SHA and optional human listening review. Never push to main until the user explicitly approves that publication.
