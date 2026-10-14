# SuperNick's OP-1 Browser Lab v2.0: Unified Song Workspace

Prepared 14 October 2026 (Australia/Sydney). Status: feature branch candidate, NOT published to main.

## Immutable production baseline

- Repository: NixMcRetro/mcretro.net
- Last verified production main: 06a625cb5cbb5b155e75c4fadbd6d9f1287b7ed0
- Production release: v1.9 Piano Roll Studio
- Branch for this work: op1-v2.0-unified-song-workspace
- Application: homepages/op-1/
- Explicit separate user approval is required to publish to main. Never force push.

## Scope and implementation

The v2.0 workspace adds a visual, horizontally scrollable 64-bar grid with four lanes. Its clips are independent snapshots of existing material rather than replacements for the original editors. Sources:

- Piano Roll, preserving polyphony, MIDI pitches, velocities, note durations and timing, with the selected synth patch frozen at creation.
- Pianola, with monophonic score note/rest timing mapped to a clip without changing the original composer.
- Pattern A-D snapshots, including drum or sample voice and the selected mixer track.
- Legacy named Song Arrangement sections, imported explicitly as separate frozen Pattern clips.
- Existing PCM tape audio clips, referenced by stored sample ID, offset, duration and capture speed rather than copying or deleting source recordings.

The timeline provides clip selection, drag movement, keyboard Left/Right movement, numeric start/length/repeat/track inspectors, mute, duplicate, delete and 40-session-step clip undo. Simultaneous clips on separate tracks are supported.

Playback schedules all clips on a common, uniform-tempo beat clock and routes notes to the four existing mixer buses. Other song/pattern/Pianola/Piano Roll and tape transports are stopped before starting the new timeline. It supports 2/4, 3/4, 4/4 and 6/8, with BPM always in quarter-note beats. The legacy Song Arrangement's repeat control governs the new timeline as well. The legacy Song Arrangement remains available with its own existing section editor and playback.

Stereo WAV export renders the new timeline through OfflineAudioContext. PRINT TO TAPE TRACK uses the same offline render, then registers a new mono PCM waveform in IndexedDB and appends a tape clip to the selected four-track tape. Neither action edits source Piano Roll notes, Pianola, Pattern slots, Song sections or existing tape clips.

## Architectural choices and backward compatibility

The v05 portable format and numerical version 5 are unchanged. The only new state property is optional:

~~~json
"songWorkspace": {
  "meter": "4/4",
  "clips": []
}
~~~

The v1.9 project fields including pianoRoll, pianola, synthScore, songSections, seqPattern, patternSlots, all four tracks and sample references remain unchanged. Old projects with no songWorkspace field receive an empty timeline. Imported workspace clips are validated before replacing state. Invalid clip structure, overlapping IDs, out-of-range bar placements, invalid MIDI notes and excessive clip counts fail closed rather than silently truncating saved clips.

A distinct optional songWorkspace field is deliberate. The legacy songSections structure represents one sequential Pattern segment at a time and cannot express simultaneous, independently positioned polyphonic Piano Roll and audio clips. Keeping the original array intact is necessary to avoid destructive migration and changing old section-editor semantics. This feature branch uses one playback clock for the new timeline, not a second competing audio engine.

LocalStorage remains op1-browser-lab-v01; IndexedDB remains op1-browser-lab-audio version 2 with samples and checkpoints. Sample references inside timeline clips are included in portable backup, project import, and checkpoint completeness checks. The service worker cache is now op1-browser-lab-shell-v2.0 and includes workspace.js and workspace.css, with matching application readiness verification.

## Key limits

- 32 clips and 64 bars maximum, with no more than 12,000 scheduled events per rendering session.
- 16 bars maximum per source clip and 8 repetitions per clip; placement must fit in 64 bars.
- Original Piano Roll limit of 512 notes per score remains.
- Main application BPM governs timeline playback. No tempo maps, tempo stretching of tape references or sustain-controller automation.
- Stereo timeline WAV export: 180 seconds maximum.
- Print to tape: at most 59 seconds, on the selected track at tape start, as a new waveform. Original tape's 60-second format remains.
- Sources are snapshots. Subsequent source changes do not automatically update an existing clip.
- No physical Web MIDI keyboard capture or MusicXML export in this increment.

## Files touched (scoped to OP-1 only)

- homepages/op-1/index.html
- homepages/op-1/workspace.js (new)
- homepages/op-1/workspace.css (new)
- homepages/op-1/sw.js
- .github/workflows/op1-browser-tests.yml
- .github/tests/op1-test-html.mjs (new fixture for browser tests)
- .github/tests/op1-unified-song.mjs (new)
- Existing OP-1 browser, tape, performance, sampling, Pianola, score, Piano Roll and offline test scripts updated for the new static assets/version.

No edits to _posts, blog images, unrelated homepages, Jekyll or Pagefind workflows. The retired cat feature remains absent. Original sound slots, Pulse Paddle and interactive expanded display are retained.

## Test and release gate

The OP-1 workflow tests the existing browser smoke, tape PCM, performance, sampling, Pianola, notes JSON/MIDI, polyphonic Piano Roll, offline PWA and new workspace suite. Chromium, Firefox and WebKit are included where the individual suites support them. The added workspace suite tests desktop and phone widths, source preservation, clip edits and undo, portable project compatibility and malformed import rollback, non-silent WAV, print-to-tape audio recovery and 6/8 rendering.

The browser workflow uses Node 22 and Playwright 1.57.0 on Ubuntu 24.04. The workflow now includes missing Pianola / score-interchange test file path triggers and the v2.0 source/test files.

Test results: pending a successful final feature branch run. Do NOT claim publication or production verification. Physical iPhone Safari, touch drags, real microphone interruption, and hardware MIDI remain manual/unverified. Preserve independent exported backups of valuable user projects.

## Review and publication procedure

1. Confirm a successful Chromium/Firefox/WebKit plus audio, project and offline regression run on the exact candidate SHA.
2. Review the changed file list and verify that there are no unrelated repository diffs.
3. Collect the GitHub Actions source artifact and its SHA-256 digest when available.
4. Review UI and test results; conduct manual iPhone Safari checks with disposable audio.
5. Only when the user separately says to publish to main, re-fetch main, reconcile concurrent changes and merge safely without force pushing.
6. After publication, verify both Pages deployment and OP-1 production browser run against the published SHA. Until then, v1.9 remains the live release.
