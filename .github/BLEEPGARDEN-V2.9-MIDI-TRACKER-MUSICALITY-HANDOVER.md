# BleepGarden Music Maker 2000 v2.9: MIDI, Tracker Corner and Musicality

Development branch: `bleepgarden-v2.9-midi-tracker-musicality`
Base: `op1-v2.8-bleepgarden-branding` at `ddd7f60da4af16a5e5d6f4c16d788154abfec70d`
Creator wording: **Created for SuperNick (Nick)**.
Destination and PWA identity are unchanged: `/homepages/op-1/`, manifest id/scope/start_url `./`.

## The user's concerns

1. **Export MIDI from Music Maker:** Previously the only tracker MIDI exporter sat inside Classic Studio and exported the tracker CHAIN, which can differ from the Music Maker SONG ARRANGEMENT. We add MIDI beside WAV/Project downloads on the beginner page.
2. **Tracker options:** The real Tracker Studio has eight patterns, a live launch grid, tracker step/effect editor, MIDI, mixer, automation, starter patterns, song arrangement and demos. Those were intentionally hidden by the beginner-first redesign, rather than removed. Keep Make Music / Play Keyboard as the only two main tabs; expose a collapsible Tracker Corner with pattern audition, swing and direct full-editor access.
3. **More musical generation:** The v2.8 generator picked largely independent pseudo-random melodic notes in each section. v2.9 shares a seeded melodic identity across Intro/Chorus, uses a response phrase in Verse, emphasises chord tones on strong beats, varies rhythmic energy by song section and resolves the Outro to the tonic. Every note remains a legal tracker v5 cell.

## MIDI fidelity and limitations

- Use source `compileArrangement(tracker, false)` to reflect current saved arrangement rather than tracker chain; never include an uncommitted keyboard take.
- Produce Standard MIDI File **format 1** with tempo/time signature and named section markers in conductor track, plus four musical tracks named Drums, Bass, Chords and Melody.
- Notes and note-offs preserve compiled pitches, lengths, velocities and swing timing. Drum events map to General MIDI percussion channel 10. The default 480 PPQ allows sixteenth-step quantisation.
- MIDI is **not audio** and does not carry BleepGarden's proprietary-free synth timbres, effects or sample waveforms. Sample triggers are represented as placeholder notes only; retaining actual sample audio requires the editable project.
- MIDI export is available for arrangements longer than the existing **three-minute WAV limit**.
- Keep Classic Tracker's original chain-based MIDI export untouched.
- Export uses no new API, server, external dependency or project schema; never mutates notes, tapes, undo history or independent Song Workspace.

## Tracker Corner

- Collapsed by default, so it does not overload beginner users.
- Pattern selector shows each existing tracker pattern and note count; Hear Pattern plays a live pattern via the original tracker engine and Stop Pattern stops it.
- Groove selector offers straight, light swing, laid-back and deep shuffle, 0/12/25/36; commits to the existing tracker Undo history.
- Open Full Tracker Editor reaches the original advanced tracker interface, with all existing step effects, pattern chaining, live performance controls and demos still intact.
- No third beginner tab.

## Test gate

The additional `.github/tests/bleepgarden-midi-musicality-v29.mjs` validates SMF header/chunk structure, four tracks, tempo, markers, all arranged notes including repetitions, balanced note-offs, GM drums, deterministic generated songs, final tonic, two-tab UI, pattern preview, swing Undo, and MIDI with long arrangements.
Retain all existing Chromium/Firefox/WebKit, project backup, offline/PWA, tape, MIDI interchange and original tracker tests.
No changes to unrelated blog content, photos, site-wide Pages workflow, recorded audio or old project keys.

## Unresolved broader opportunities

This version improves *coherence*, but still uses a four-channel tracker and two-bar pattern units. Future music-generation improvements should be informed by rendered-audio listening tests and may include user-selectable 8/16-bar phrases, more varied chord progressions, structured transition fills, accessible melodic editing, music theory assistance, and polyphonic chord voices. These should be separate validated features; do not imply all are implemented by v2.9.

**Do not merge to main without subsequent explicit user approval.** No force-push.
