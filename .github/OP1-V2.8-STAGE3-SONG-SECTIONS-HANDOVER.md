# OP-1 Browser Lab v2.8 Stage 3: Visual Song Sections

Date: 16 October 2026
Repository: NixMcRetro/mcretro.net
Development branch: op1-v2.8-stage3-song-sections
Base: v2.8 Stages 1–2 `b6d504499df892251a3491edfbe6c155f9b96ab1`

## Scope

Make arranging a song approachable from the everyday **Make Music** tab. Retain the two main tabs, Make Music and Play Keyboard. Do not expose tracker pattern IDs as necessary music-making controls.

## Delivered interaction

- A colourful but restrained strip of section cards showing Intro, Verse, Chorus, Outro, Break or Part, numbered in their current playback order.
- Select a section, move it earlier or later using accessible arrow buttons, or drag a card into another position on desktop.
- Change section type and length (1, 2, 4 or 8 bars; unusual existing lengths are preserved until explicitly changed).
- Copy a section immediately after the selected card, remove it after explicit user confirmation, or add a new section based on the selected section's current music.
- Undo the latest tracker/song edit through existing tracker history.
- A shortcut sends the current section to the v2.8 Keyboard riff recorder; another focuses the Stage 2 Simpler/Busier/Higher/Lower/New Idea controls with that section selected.
- During playback, highlight the current section. Show the approximate full song duration and warn when the three-minute WAV export limit is exceeded.
- New arrangements and edits remain standard portable version 5 tracker structures and do not alter any tape, sample or independent Song Workspace data.
- Copying a section shares its existing pattern initially. When its Bass, Chords or Melody notes are later changed or recorded, the existing v2.8 copy-on-write path creates a distinct pattern (subject to eight-pattern limit), protecting the other section.

## Deliberate boundaries

- Moving sections changes the order of existing music, not the timing of other independent tape/Workspace recordings.
- Section labels have no automatic loudness or orchestration changes. Make a chorus more energetic by remixing its notes and sound settings separately.
- The beginner arranger does not add another sound engine, change the portable project version, or enable combined independent-studio WAV export.
- Drag is an optional pointer convenience; arrows provide an accessible alternative for keyboard and touch use.
- The underlying tracker section count is limited to 64 and total arrangement rows to 4096; source pattern limit remains eight.
- Keep unrelated blog posts, historical images and GitHub Pages workflows untouched.

## Verification and publication

New .github/tests/op1-song-sections-v28.mjs covers core edits, Undo, copies, copy-on-write isolation, mobile width, playback layout, recorder shortcuts, three-minute safety and saved version 5 backup/reload.
Also run the entire established Chromium/Firefox/WebKit OP-1 browser regression and PWA offline regression at the exact Stage 3 release commit.

Do not publish to main without separate explicit approval, and never force-push. Main may advance due to unrelated website changes and must be compared again before publication.
