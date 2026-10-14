# SuperNick's OP-1 Browser Lab v1.8: Pianola Composer

Release date: 14 October 2026

## Scope

This release removes the v1.7 split Meow Drum / Meow Keyboard, associated synthesized cat audio, cat graphics, cat animation, and cat menu/state controls. The eight pre-existing sound slots remain in their original arrangement. The Song Arrangement Studio from v1.7, four-track tape, Pattern A-D, Sampling Workshop and earlier synthesizer/drum voices are retained.

## Pianola Composer

A dedicated, accessible note-writing panel below Song Arrangement. Write individual pitched notes or rests with whole (4 quarter beats), half (2), quarter (1), eighth (0.5) or sixteenth (0.25) lengths. Choose 2/4, 3/4, 4/4 or 6/8 time. Bars show proportional note lengths and wrap at measure boundaries; notes held across a bar appear in both bars but are stored as one event. Click a note to select it for deletion, editing or audition during score playback. The scrolling piano-roll score indicates the active event.

The composer uses the existing synthesizer patch, effect chain, master volume, current mix track and BPM. The BPM always counts quarter-note beats, including in 6/8, which therefore has three quarter-note beats per bar. Playback can repeat. The demo melody is independent of earlier project data. The score can be exported as real, non-silent stereo WAV, up to 3 minutes. The composer is intentionally monophonic, written as successive notes and rests, not chord notation.

Score data persist in the existing portable-project JSON and autosave checkpoints under a new optional `pianola` field. No change to project format `op1-browser-lab-v05`, numeric version 5, audio IndexedDB layout, or tape data. The score supports up to 256 events and 128 quarter-note beats. Time signatures affect bar grouping, not tape duration or sequencer timing.

## Cat-era project migration

Older v1.7 portable files and autosave data with cat modes do not lose their recorded note timing or pitches: obsolete `catKeyboard` tape events become normal `synth` events, `catDrum` events become normal `drum` events, and song-section cat voices map to their corresponding standard synth or drum instruments. The obsolete cat-mode flag is discarded. Their old cat timbre is deliberately not preserved, as requested. This is a compatibility migration, not a continuing cat implementation.

## Tests

The new `op1-pianola-composer.mjs` covers original sound buttons, absence of cat controls, meter counts, note lengths and rests, editing, save/reload, older v1.7/v1.6 migration, song arrangement survival, active score playhead and non-silent WAV export. Existing Chromium, Firefox and WebKit regression, Tape Studio, Performance Studio, Sampling Workshop and offline/PWA tests must also pass.

## Publication safeguards

Develop on branch `op1-v1.8-pianola-composer`. Verify successful candidate GitHub Actions browser regression before a guarded, non-force, fast-forward update to `main`. Keep all unrelated blog posts, images and website files unchanged. One full Pages build on final publication only. Confirm both Pages and production regression workflows finish successfully. Real Safari touch/mobile audio testing remains recommended and separate portable project backups remain essential.

## Next ideas

The v1.8 original Creative Playground roadmap suggested generative music and effects. This release consciously prioritizes accessible authored musical notes and meter over another novelty mode. Further optional improvements: staff notation, note velocity, ties/slurs, chord writing, editing by keyboard shortcuts, MIDI input where supported, and integrating written scores with named song sections. These are future ideas, not included functionality.
