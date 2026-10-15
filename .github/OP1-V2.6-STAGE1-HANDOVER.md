# OP-1 Browser Lab v2.6 Song Builder: Stage 1 Handover

Date: 2026-10-15
Repository: NixMcRetro/mcretro.net
Feature branch: op1-v2.6-song-builder
Baseline release: v2.5 main at 73418b38267305b787228b7a87e7af5b4b7479c3

## User goal and authorisation
The user wants to make their own music through an easy-to-understand interface. The original OP-1 physical layout is no longer a visual constraint. The user authorised new v2.6 development, NOT a production push. Each future update to main requires fresh explicit approval.

## First milestone: a simple Make a Song home screen
- Replace the v2.5 four-link welcome panel with three descriptive, prominent entry points:
  1. Make a Beat opens the existing drum sequencer.
  2. Write a Melody opens the existing Piano Roll.
  3. Try a Song opens the existing tracker with its 18-piece library expanded.
- Add unobtrusive Open Project, Go to Tape and Save Backup controls that forward to established safe handlers, instead of creating parallel project storage.
- Show a contextual, accessible next-step hint for the active tool. Preserve the current focused editor and the current project's musical data whenever the user switches.
- Keep Focus/All Tools, all original instruments, MIDI, tape, tracker, Song Workspace and existing project format.
- Responsive layouts at desktop and phone widths, keyboard focus indicators, dark-mode support and reduced-motion support.
- No automatic project reset and no accidental replacement of existing music.

## Testing
- New .github/tests/op1-song-builder-start.mjs exercises screen visibility and actions in Chromium, Firefox and WebKit, 390px mobile width, Focus to All Tools round-trip, persisted original song/tracker/tape data, and version 5 JSON export.
- The established cross-browser OP-1 regression suite also runs.
- A passing test on the exact branch SHA is required before marking milestone ready.

## Deliberate stage boundaries
This is NOT the complete v2.6 release. Editable live arrangement capture, simplified Song Builder arrangement screen, beginner-friendly chord/drum templates and polished final-song export are still future milestones.
The actual website's release version remains v2.5 until a full v2.6 is tested and separately approved for production.

## Next suggested milestone
Record live tracker pattern launches into a non-destructive, editable arrangement representation. Validate data boundaries, history, tempo and project compatibility before connecting the new Song Builder user interface. Do not change the entire global audio transport in one edit.

## Publication gates
Production main stays at the existing approved release. Commit to the feature branch only. Compare to main and seek independent approval before the eventual v2.6 main push.
