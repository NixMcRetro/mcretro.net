# SuperNick's OP-1 Browser Lab v1.8.1: Pianola Note Interchange

Date: 14 October 2026

## Scope

A small compatibility-first feature release. It keeps v1.8's Pianola, Song Arrangement, Sampling Workshop, eight original sound slots, four-track tape, and offline app. No cat-mode functionality is reintroduced.

## Added

- **Export MIDI**: generate Standard MIDI File format 0 (`.mid`), 480 ticks per quarter note, with tempo and time-signature meta events. Note-on and note-off positions preserve written durations and rests. The 6/8 time signature is encoded as 6/8, while the UI BPM continues to count quarter notes (as in v1.8).
- **Export Notes JSON**: small independent, editable note-score backup. Format `supernick-pianola-score-v1`, version 1, containing `{meter,bpm,repeat,notes}`. Separate from the portable v05 project JSON.
- **Import Notes JSON** into Pianola, with strict validation (allowed 2/4, 3/4, 4/4, 6/8; BPM 40-240; 256 events; 128 quarter-note beats; MIDI pitches C2–B6 or rests; note values 4/2/1/0.5/0.25). Non-empty Pianola scores require confirmation before replacement. Invalid files do not modify existing scores.
- **Send to Synth**: copy the *whole* score including durations, meter, BPM and rests to the Synth Note Player without replacing the editable Pianola original or discarding notes after step 16. This is a true independent copy, not a 16-step quantization.
- **Import Notes JSON in Synth**: load an exported score file directly into the Synth Note Player, switch to Synth mode, and play using the currently selected synthesizer sound and saved score BPM. The loaded synth score is stored in the existing version-5 project format as an optional `synthScore` property.
- **Synth note player controls**: PLAY/STOP, IMPORT SCORE JSON, CLEAR LOADED SCORE. Playback is mutually exclusive with the Pianola player and existing song/sequence transport, and uses the same audio engine. Editing the Pianola afterwards does not change the loaded synth copy.

## Not supported yet

- MIDI **import** (MIDI export is implemented). External MIDI files may have polyphony, multitracks, running status and channel controllers that the current monophonic Pianola data model cannot reproduce safely. The existing notes JSON roundtrips instead.
- Importing a whole score as a 16-step Pattern. That would truncate durations and notes; the dedicated Synth Note Player retains all events.
- Chords, ties, stave notation and automatic arrangement into multiple A-D patterns.

## Existing compatibility

- `format:'op1-browser-lab-v05'` and `version:5` stay unchanged. Older projects with no `synthScore` load with `synthScore:null`.
- Existing Pianola projects, tape note events, sample references and recorded audio persist unchanged.
- Service-worker shell version bumps to `op1-browser-lab-shell-v1.8.1`, without caching projects.

## Testing

Run `.github/tests/op1-score-interchange.mjs` under Chromium, Firefox and WebKit alongside all existing OP-1 regressions. Verify: 6/8 tempo metadata and MIDI events on the correct ticks, JSON score exact round-trip, lossless note transfer to synth, independent subsequent Pianola edits, invalid-import rejection, portable project persistence and actual synth playback. Manual physical-device verification remains recommended for iPhone Safari and file downloads.

## Release discipline

Develop on `op1-v1.8.1-note-interchange`. Preserve blog content and media. Publishing the tested version to `main` triggers the full Jekyll/Pagefind Pages build. Do not publish without new explicit approval.
