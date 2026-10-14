# OP-1 Browser Lab v2.2 Tracker Studio handover

Repository: NixMcRetro/mcretro.net
Feature branch: op1-v2.2-tracker-studio
Base production commit: 48cf5fdea8dbb4282a02b9d7808fdcf180a00dd8
Publication: NOT authorised. Do not update main without separate explicit approval.

## Features
- Original independent four-channel tracker embedded in Compose.
- 16/32/64-row patterns, 8 pattern slots, hexadecimal row labels and up to 16 chain entries.
- Synth, drum and loaded sample-slice steps; 8 instrument choices per bank; per-step velocity.
- Step effects: basic pitch up/down, vibrato, retrigger; musical note entry from keyboard.
- Playback with rolling cursor, safe Web Audio effect graph, offline stereo WAV export, standard MIDI export.
- Copy tracker patterns into Unified Song Workspace as compatible note/drum clips, with honest limitations on effects and unsupported sample embedding.
- Portable project format remains 'op1-browser-lab-v05', version 5. Optional tracker property is normalized on load; legacy files receive empty defaults. Tracker sample IDs are included in portable audio backups and validation.
- Simple / Advanced workspace remains. No copyrighted firmware, samples or artwork.
- New assets: tracker.js and tracker.css. Offline service-worker shell version bumped to v2.2.
- Preserves old tape, sample, Pianola, song workspace, sound presets and projects.

## Safety and release
- All edits confined to the OP-1 application and its GitHub browser tests / workflow.
- Full browser regression includes dedicated cross-browser tracker test, legacy projects, WAV/MIDI exports, clip handoff, iPhone-sized viewport, offline cache, synth, drum, MIDI, tape and sampling checks.
- Check exact branch head and complete successful GitHub Actions run before publication. Don't assume earlier runs apply to later commits.
- Hardware MIDI, real device Safari audio and long recordings are not covered by automated testing.
- No .MOD/.XM/.IT format parser. Standard MIDI only; original project files remain JSON.
- WAV/arrangement export has explicit time and clip limits.
- User approval is required independently for publishing to main.
