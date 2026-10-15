# OP-1 Browser Lab v2.7.1: Beginner Keyboard and Classic Engine

Date: 15 October 2026
Repository: NixMcRetro/mcretro.net
Branch: op1-v2.7.1-beginner-keyboard
Starting main SHA: c0568c62ee254592709710d3a1158ee7806b4e04

## Goal

Make SuperNick's OP-1 Browser Lab immediately comprehensible to a teenager with no music-production experience. Replace the visible hardware-style workstation and its confusing fixed mini keyboard with a friendly two-tab landing surface, while preserving all prior engines and project compatibility.

## User-facing flow

- Everyday default: **Make Music** and **Play Keyboard** tabs in one unified Music Maker surface.
- Make Music retains generated songs, separate track regeneration, locking, sound-shaping A/B, Undo, Save and WAV.
- Play Keyboard provides a two-octave white/black piano keyboard, 24 note inputs, instrument bank/preset selectors and lower/higher octave controls, with note labels and matching computer-key shortcuts.
- Sound comes from the existing synthesizer through the normal live-note engine; there is no new incompatible audio or project format.
- The original OP-1 instrument, mini fixed keyboard, extra focus navigation, tape/studio panels and miscellaneous shortcuts remain mounted in the DOM but not shown in beginner mode.
- Legacy editors can still be recovered under **Need the original studio tools? → Open Classic Studio**, with an obvious header button to return to the simplified view. They are not part of the everyday workflow.
- Classic Studio includes all original synthesizer settings, MIDI imports, music demos, tape and advanced editors, and is fully functional.
- Browser audio may require user activation; mouse, pointer and touch keys hold and release notes, with blur and visibility cleanup.
- Generated songs, old portable v5 projects, recordings, samples and PWA offline cache are preserved.

## Technical boundaries

- No proprietary Casio or Teenage Engineering sounds, layouts, firmware, graphics or samples.
- No separate synthesis engine or new save format; live keyboard wrapper forwards directly to existing liveNoteOn/Off, octave and sound-bank functions.
- No changes to unrelated blog posts, imagery or GitHub Pages deployment workflow.
- The v2.7.1 PWA version caches only static keyboard source/styles alongside the existing application, not user audio or project files.

## Validation and publication

Run the new .github/tests/op1-casio-keyboard-v271.mjs in Chromium, Firefox and WebKit, including 390px mobile, real note-on/off, preset selection, octave changes, hidden old hardware, Classic Studio fallback, and exact project preservation.
Keep all old browser tests operating against an explicit classic-layout test fixture so they still verify actual original workspaces.
Run complete OP-1 regression including old tracker, old tape/sampling, Song Workspace and offline/PWA on the exact feature SHA.
Do not push this branch to main until the user separately approves. No force push.
