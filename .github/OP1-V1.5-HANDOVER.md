# SuperNick's OP-1 Browser Lab — v1.5 Performance Studio handover

Prepared 14 October 2026. This handover accompanies the v1.5 feature branch and is not evidence of a production deployment by itself.

## Canonical references

- Repository: https://github.com/NixMcRetro/mcretro.net
- Application: `homepages/op-1/index.html`
- Production website: https://mcretro.net/homepages/op-1/
- Feature branch: `op1-v1.5-performance-studio`
- Immutable v1.4 baseline: `df0bffb6bdc51bad56717f6ffc4ae4f8942fcd9c`
- Project format remains `op1-browser-lab-v05` and `version: 5`.
- Legacy localStorage key remains `op1-browser-lab-v01`.
- IndexedDB database remains `op1-browser-lab-audio` version 2.
- PWA cache is `op1-browser-lab-shell-v1.5` in both the service worker and the HTML readiness check.

## Implemented in v1.5

1. **Performance Studio** is an independently drawn four-track panel below the instrument, with level faders, pan controls, MUTE, SOLO, ARM/track selection and animated Web Audio track meters. It has a quick navigation shortcut. The original four mixer encoders use the very same persisted gain and pan fields.
2. **Shared track audio buses** route tape events and PCM clips through gain, pan and meter nodes. Smooth audio automation avoids abrupt level and mute changes. Muting/soloing and levels are also applied in the offline WAV and Tape Studio bounce renderers. The independent live synth monitor remains audible outside an armed tape recording; when tape recording is armed, live instrument notes are routed through the selected tape channel.
3. **Pattern A/B/C/D**: legacy `seqPattern` is Pattern A. Additional arrays are `patternSlots.B/C/D`, selected with `patternSlot`. A chain is an array of `{slot,repeat}` objects; e.g. `A×4, B×2, C×4`. At most sixteen sections, sixteen repeats per section and 64 repeats total. `patternChainEnabled` defaults false. Old projects continue playing the original Pattern A with the previous direction timing; Finger, Endless, Arpeggio and Tombola remain independent.
4. **Safe live performance capture**: CAPTURE MIX records the live stereo master using feature-detected MediaRecorder and Web Audio, including live sound, tape, effects, mute/solo and metronome, for a maximum of two minutes. STOP CAPTURE creates a uniquely named stereo WAV download. If decoding or WAV encoding fails, the original recorded stream is downloaded as an emergency file. A take does not overwrite or insert tape clips, and is not included in the project JSON: retain the downloaded WAV separately.
5. **Offline v1.5 shell** updates the locally scoped cache without caching user recordings or private project data.

Web MIDI was deliberately deferred. The application does not require MIDI.

## Files intentionally changed

- `homepages/op-1/index.html`
- `homepages/op-1/sw.js`
- `.github/tests/op1-browser-smoke.mjs`
- `.github/tests/op1-tape-studio.mjs`
- `.github/tests/op1-pwa-offline.mjs`
- `.github/tests/op1-performance-studio.mjs` (new)
- `.github/workflows/op1-browser-tests.yml`
- `.github/OP1-V1.5-HANDOVER.md` (this handover)

No other website files, blog posts, external libraries, source firmware, proprietary OP-1 artwork, or account services belong in this release.

## Verification and release process

Workflow: https://github.com/NixMcRetro/mcretro.net/actions/workflows/op1-browser-tests.yml

Run the existing Chromium, Firefox and WebKit smoke test, Chromium Tape Studio PCM/varispeed regression, the v1.5 performance test (all three engines; deterministic audio-clock transition in Chromium), and Chromium service-worker/offline reload regression. The workflow stores a source/test bundle artifact after all tests pass, named `supernicks-op1-v1.5-source-<tested SHA>`. Those artifacts have 90-day retention and are not a substitute for separately preserving the repository and project JSON backups.

**Release gate:** Do not merge if the final feature commit has not passed, or if `main` changed in overlapping files. Re-fetch main and compare. Prefer a normal GitHub pull-request merge with precise expected head SHA, preserving concurrent blog work and merge history. Verify the resulting Pages deployment and a workflow run for the production commit before claiming the site is updated.

## Known limits and manual iPhone checklist

The browser CI suite does not prove physical iPhone Safari home-screen installation, multitouch performance, microphone permissions, long capture reliability, interruption recovery or storage-eviction protection. Test those on a device using disposable audio. On iPhone, check the four faders and mute/solo hit targets, Pattern A/B/C/D edits, chain sequencing, a short capture WAV, Safari share/download behaviour, offline reload, a portable JSON backup and import.

Capture is a separate downloadable audio file, not a new persistent tape track. For future work, optional MIDI and longer arrangement/song management should be developed in separate stages. Never change the `op1-browser-lab-v05` schema without explicit migration tests.
