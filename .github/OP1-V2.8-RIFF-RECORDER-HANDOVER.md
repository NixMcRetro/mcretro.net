# OP-1 Browser Lab v2.8: Play It, Keep It

Development branch: `op1-v2.8-play-it-keep-it`
Baseline: `main` at `13adef2b2689af234824b167f0561118c272ffc2`
Scope: Stages 1 and 2. No publication approval assumed.

## Objective

A novice should be able to generate a song, play a two-bar riff on the simple keyboard, listen to the proposed result, and either Keep, Retry, Discard or Undo without visiting Tracker Studio. Then they should be able to simplify, fill out, shift an octave or regenerate one section of one instrument using plain language.

## Implementation

- **Play Keyboard** tab contains **Record your own riff** with Bass, Chords (single-note arpeggios) and Melody destinations and section selector. Drums remain generated; mapping keyboard notes to drum pads is outside this stage.
- A four-beat audible count-in precedes two bars of accompaniment from the selected tracker pattern (the recorded channel is excluded from the backing). Events are captured from the existing synth and QWERTY/pointer keyboard, quantised to a sixteenth-note grid, clipped to MIDI 36–95 and encoded as legal v5 tracker notes with lengths 0.5, 1, 2, 4.
- Recording is temporary until Keep. Listen overlays a proposed take only during song preview; Keep commits a single tracker Undo history snapshot. Discard and Retry preserve the original project. Blur, hidden tabs and switching out of the keyboard cannot silently continue capturing.
- Shared patterns are cloned to a spare slot when recording/editing one section, preserving other song sections. A full eight-pattern project with a shared target fails safely rather than damaging data.
- Music Maker's **Fix a part without editing notes** adjusts one selected section and one unlocked part. Options: Simpler, Busier, Higher, Lower, New Idea, Undo Latest Edit. Saved projects can use these edits without first generating a song in the current session.
- Version 5 portable backups, legacy tracker, tape, Song Workspace, original samples, export audio, MIDI editors, the Casio-style keyboard and Classic Studio remain unchanged. The PWA caches the new script and styles under a new shell version.
- New files: `riff-recorder.js`, `riff-recorder.css`, and `.github/tests/op1-riff-recorder-v28.mjs`. Updated OP-1-only scripts and tests are covered by the dedicated regression workflow.

## Known limitations

- This release records **one monophonic two-bar riff**, not polyphonic chords or unlimited live MIDI performances. Simultaneous notes quantised to the same step occupy one tracker cell, because the existing tracker is four-channel and monophonic per channel.
- Keyboard preset sound and recorded part instrument may differ: saved notes intentionally retain the song part's instrument/bank rather than silently changing every channel's sound bank.
- Playback uses the selected section's backing. Listen-to-take previews the whole current song; the user may need to listen through preceding sections.
- If a section repeats more than two bars, its two-bar riff loops as usual. Recording does not alter the independent tape and Song Workspace.
- No cloud service, proprietary firmware, external library or image conversion.

## Validation and publishing

- New Playwright tests exercise quick transformations and their Undo, locked parts, shared-pattern isolation, quantisation, actual keyboard capture, Keep/Undo, preview non-persistence and portable save preservation.
- Existing Chromium/Firefox/WebKit studio regressions and offline/PWA regression must pass at the exact branch head. Manual instrument listening is still worthwhile.
- Do not modify unrelated blog posts, images or the site's GitHub Pages deployment workflow.
- Do not push to `main` without a separate explicit user instruction; never force-push.
