# OP-1 Browser Lab v2.6, Stage 3: Visual Song Timeline and Starter Ideas

Date: 15 October 2026
Repository: NixMcRetro/mcretro.net
Development branch: op1-v2.6-song-builder
Base: v2.6 Stage 2, commit 719872fa26929e8209035a0915c6be8ee2e75c56
Published main at start: 069baec40cf9539c44c1164cceec57c015a6e0a7

## Objective
Make creating an original song straightforward. User explicitly permitted visual redesign and ongoing v2.6 development, but has NOT authorised Stage 3 publication to main.

## Features in Stage 3
- Fourth home-screen route: Build a Song, directly opening the Tracker Song Builder.
- A compact, horizontally scrollable arrangement timeline with visually distinct sections of proportional musical length, selected and currently playing indicators, accessible labels and keyboard-focus support.
- Sections may be called Part, Intro, Verse, Chorus, Break, or Outro. Labels are optional on disk and do not affect playback, preserving Stage 2 projects.
- Timeline blocks select a corresponding section in the editor; existing move, duplicate, delete, pattern and length controls remain.
- Four original, editable beginner templates: Drum Groove, Bassline, Melody and Chords. Every starter adds a new 32-row, two-bar tracker pattern and adds it to the end of the arrangement, rather than overwriting notes in existing patterns.
- A brief description of each starter and status explaining how to personalise its notes.
- All edits use existing tracker Undo/Redo and portable version 5 projects. Original tracks, instruments, tape, Song Workspace, audio samples and modes remain intact.
- Still within eight tracker patterns, 64 song sections and 4096 rows; template creation blocks when capacity is reached instead of silently replacing user material.
- Responsive 390px mobile layout, dark theme, focus indicators and reduced-motion care.

## Testing
New .github/tests/op1-song-timeline-v26.mjs validates starter pattern data, older unlabeled section compatibility, invalid labels, per-browser UI, layout, undo, edit persistence, export JSON format 5, and unchanged tape/Song Workspace/pattern notes.
The Stage 2 live performance regression and the complete existing browser regression suite must pass on the exact final feature SHA. Physical mobile Safari audio, appearance and musical quality still warrant listening and hands-on review.

## Scope boundaries
Stage 3 does not introduce destructive song auto-generation. Existing patterns are retained. The optional section label is a display hint and not a new file-format version.
The interface remains a tracker-based Song Builder; integration with the older Song Workspace, unified cross-studio transport and complete-song stereo render/export remain separate work.

## Next work: Stage 4
Provide a clear final-song audio export from the edited arrangement, ensure a backup pathway, validate stereo rendering and audio output across browsers, then polish the whole beginner-to-finished-song path. Do not promise exact live mixer/tape automation export without verified implementation.

## Release gate
No push to main without a fresh explicit user instruction. Only commit to op1-v2.6-song-builder. Never force-push or edit blog posts, images or unrelated website deployment workflow.
