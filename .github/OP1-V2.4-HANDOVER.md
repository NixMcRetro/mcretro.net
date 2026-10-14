# SuperNick's OP-1 Browser Lab v2.4 Performance & Arrangement

Repository: NixMcRetro/mcretro.net
Feature branch: op1-v2.4-performance-arrangement
Production baseline: 5c30b02b77c7723278b9a4f64b3d4f855ac82b2c
Release gate: no updates to main without separate user approval.

## Core improvements
- Quantised live tracker pattern launch pads for all existing pattern slots. Choose the next beat (four sixteenth-rows) or bar (16 rows); the independent tracker scheduler maintains tempo and changes patterns at the quantisation boundary.
- Explicit live and chain playback status and stop controls, with queue highlighting and visible tempo.
- Record the live master mix straight to a selected Tape Studio track. Uses the established Web Audio output, native MediaRecorder, the site's existing audio asset registry and tape edit undo history. Capped at 55 seconds; browser support and audio decoding are prerequisites. Mono sample asset format matches existing tape import, while audible stereo pan can be changed on the tape track.
- Simple mixer movement automation with a 256-point cap, record arm, clear, project persistence, and row-indexed playback of gain/pan changes. Playback engines and other studio mixers remain independent.
- Expanded royalty-free ORIGINAL tracker demo library: Midnight Windows (104), Subway Breaks (92), Pixel Arcade (126), Harbour Lights (84), Comet Runner (140), Analog Bloom (112), Tidal Echoes (72), Chiptune Drift (132), Horizon Breaks (96), Velvet Orbit (110). Four patterns, 8 bars per demo with original chord progressions, rhythms and variations.
- More responsive performance/launch-pad controls including mobile two-column layout.
- Visible browser version and PWA offline static cache bumped to v2.4.

## Compatibility
- Existing portable project format op1-browser-lab-v05 version 5 unchanged.
- The tracker adds an optional validated automation field; legacy projects receive an empty array.
- Old synths, drums, imported samples, tape recordings, Song Workspace, Piano Roll, Pianola and saved projects must continue working.
- All changes restricted to homepages/op-1, OP-1 browser regression workflow/tests and this handover.

## Limitations / caveats
- Full global shared transport across unrelated studios is NOT implemented; live/chain transport is unified within Tracker Studio, with existing stopOthers cross-studio handoff. Avoid exposing unreliable cross-engine sync controls.
- Browser MediaRecorder availability/codec and hardware audio input/output vary. Real Safari iPhone, physical MIDI and long performance recordings require device testing.
- Recorded tape clip uses existing monophonic audio asset pipeline. A full mix WAV can still be exported through the workstation's existing performance mix capture.
- Row-indexed mixer automation is simple and limited (256 points). Song Workspace handoff may simplify tracker effects, mixes and automation.
- Live continuous session automatically stops after 4096 sixteenth rows as a runaway protection.
- Current audio WAV export and Song Workspace limits remain in force.

## Release checklist
1. Verify full OP-1 browser regression workflow succeeds on exact branch SHA.
2. Review song aesthetics and transitions by listening on desktop/phone.
3. Validate portable project save/reload, tracker mixing and WAV/MIDI export.
4. Compare the branch to current main for unrelated changes.
5. Release/publish only on explicit new user approval, using a non-force update.
