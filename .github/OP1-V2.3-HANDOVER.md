# OP-1 Browser Lab v2.3 Music-Making Update handover

Repository: NixMcRetro/mcretro.net
Feature branch: op1-v2.3-music-making
Starting main: c3d7b3e3a18540ae16ef2fe1ae2e5fc4ccb91038
Publication: NOT authorised. Do not move main without a new explicit instruction.

## New behaviour
- Four-channel tracker row/bar editing: step, beat, bar and two-bar copy/cut/paste, duplicate-after, transpose synth notes with range validation. Undo and redo both work.
- Optional low-volume audition of entered steps and an explicit preview control.
- Four independent tracker channel mixer strips with level (0-150%), pan, mute and solo, adjustable during playback. Audio routes through the existing master effects and compressor but does not alter tape-track mixer controls.
- Mobile one-channel grid view with full-grid switcher. Responsive mixer and touch targets.
- Original musical compositions: Midnight Windows (104 BPM), Subway Breaks (92 BPM), Pixel Arcade (126 BPM). Load as replaceable, undoable tracker examples without changing tape or Song Workspace.
- Tracker-to-Song Workspace conversion can now append compatible sample-slice pattern clips, in addition to synth and drum clips, when audio is present. Timing and Song Workspace limits still apply.
- Portable format remains op1-browser-lab-v05 version 5; optional channels normalize to neutral mixer settings in old projects; snapshots and backups still carry sample audio references.
- v2.3 title, header and offline cache version. Updated browser regression assertions.

## Known limitations
- Track mix and effects are independent of the Song Workspace mixer. Song handoff does not preserve all tracker mixer settings, transient effects, retriggers or sample velocities.
- Hardware MIDI, real iPhone Safari audio, speaker/device latency, and long live sessions require hands-on verification.
- No proprietary artwork, firmware, samples, or native tracker-format importer (.MOD/.XM/.IT).
- WAV export maximum three minutes, Song Workspace maximum 32 clips and 64 bars, individual clip limit 16 bars.
- One browser regression is not equivalent to musical listening review.

## Gate
Run and verify complete browser regression and package creation for the exact v2.3 release branch SHA. Inspect the final branch diff against current main. Never publish to main without explicit, separate user approval.
