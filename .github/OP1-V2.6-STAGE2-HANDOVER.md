# OP-1 Browser Lab v2.6 Song Builder: Stage 2 Handover

Date: 15 October 2026
Repository: NixMcRetro/mcretro.net
Feature branch: op1-v2.6-song-builder
Base: v2.6 Stage 1 published at 069baec40cf9539c44c1164cceec57c015a6e0a7

## User goal
Make original music simply, with an approachable default interface. User authorised the next development milestone but did not authorise another main publication. No unrelated blog, images, website deployment workflow or legacy sound assets should be altered.

## Stage 2 deliverables
- A Song Builder section in Tracker Studio visible from the normal Focus layout.
- "Record Arrangement" starts a quantised live performance and captures the actual committed pattern transitions from the existing v2.4 live scheduler. Stops or the Finish Song button complete a recorded sequence without overwriting original tracker notes.
- "Add Current Pattern" lets someone build an arrangement manually without needing to perform it live.
- Edit saved sections through accessible pattern and length dropdowns, plus move up/down, duplicate and remove buttons.
- "Play Song" schedules the edited arrangement on the existing tracker audio graph, with transport status and automatic stop at the end.
- Save as the optional tracker.arrangement array in existing version 5 portable project structure, with validation and backwards compatibility for older projects.
- Tracker Undo/Redo history captures arrangement edits. If an existing recorded arrangement is about to be replaced, request confirmation. Deleting a source pattern removes or renumbers its arrangement references.
- Bounded input: maximum 64 sections, 4-256 sixteenth-note rows per section in steps of four, and 4096 rows in total. Live recorded longer segments are split safely.
- Original tracker patterns, samples, sounds, tape recordings, Song Workspace, MIDI and projects are retained.

## Engineering caveats
- This milestone does NOT claim a unified transport across all studio engines, automatic Song Workspace handoff, full effects/mixer automation preservation in any export, or a separate DAW timeline. It is an editable non-destructive tracker song structure with playback.
- Recorded transitions are measured on the AudioContext timeline in quantised sixteenth-note rows, using the live scheduler's actual switch events. Capture closes on the nearest beat after Stop; headless Firefox may suspend its audio clock without a real output device.
- Live-to-tape remains independent; using it while an arrangement is playing has not been made a universal recording workflow.
- Music quality needs human listening. Browser automation tests functionality, not taste.

## Verification
Run .github/tests/op1-song-arrangement-v26.mjs and the complete OP-1 browser regression suite on the exact feature branch SHA. Test valid and invalid saved project structures, recording switch boundaries, section editing and undo, playback transport, desktop/mobile layouts and backwards compatibility. Verify diff scope against main.

## Next planned milestone
Stage 3: streamline arranging recorded songs in a beginner-friendly visual Song Builder, offer simple drum/melody starting templates, then stage 4: finishing and exporting complete songs. Keep projects in v5 unless an explicit schema migration is necessary and approved.

## Publication
Do not push to main without a new explicit user instruction, even after successful tests.
