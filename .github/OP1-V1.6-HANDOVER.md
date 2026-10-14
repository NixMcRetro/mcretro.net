# SuperNick's OP-1 Browser Lab v1.6: Sampling Workshop

Release date: 14 October 2026

## Scope

This release includes the previously tested v1.6 expanded-display foundation plus Sampling Workshop.

**Expanded display:** maintains a true 680:325 ratio on desktop and mobile. The enlarged screen accepts tape seeking, scrubbing, clip selection and Pulse Paddle input, alongside mode buttons, sequencer tools, four dynamic soft keys, four encoders and transport controls. The Sampling Workshop launcher closes the expanded view and focuses the accessible waveform editor. Main display behaviour remains unchanged.

**Sampling Workshop:** load a WAV or other browser-supported audio file with `+ SAMPLE`. The existing sampler now provides a large waveform, selectable 4, 8 or 16 slices, draggable region and slice markers, slider adjustment, accessible arrow-key adjustment, single-slice audition, playback rate, pitch in semitones, reverse and finite looping. No destructive modifications are made to audio buffers, cached PCM, or recorded tape clips. Newly edited sampler boundaries are stored as metadata in `sampleSettings` and copied into recorded sample note events.

**Legacy compatibility:** the public project format stays `op1-browser-lab-v05`, version 5. The legacy `sampleSettings.start` (skip start of each slice) and uniform slice playback remain in use for projects with no explicit `regionStart` and `regionEnd` settings. Current `sampleSettings` and recorded `sliceSettings` gain optional metadata fields only after editing; old files load with their original playback semantics. Imported tape clips and media storage retain their existing IndexedDB format and 22,050 Hz mono PCM. Portable JSON backs up the source audio, not destructive edits.

**Offline:** service-worker app-shell cache changes to `op1-browser-lab-shell-v1.6`. Projects and audio are not cached by the service worker.

## Regression and verification

Run GitHub Actions `OP-1 Browser Regression` for Chromium, Firefox, WebKit keyboard and expanded-display controls, the new Sampling Workshop audio import and project round-trip checks, Tape Studio, Performance Studio, offline installation and reload. Ensure all pass on feature branch and again on main. Verify published Pages workflow completes successfully before announcing live release. Optional physical iPhone Safari tests remain outstanding.

## Known limitations

Sample audio imports are bounded to 30 MB and downsampled to at most 60 seconds mono at 22.05 kHz. Looping preview is capped to two seconds; a held live note loops for up to fifteen seconds and is stopped when released. The browser's audio decoding, microphone availability and offline recovery depend on permissions and storage. The sample editor is not a multitrack DAW. These limitations are deliberate to preserve responsiveness and compatibility.

## Deployment and recovery

Repository: `NixMcRetro/mcretro.net`.
Target: `https://mcretro.net/homepages/op-1/`.
Feature development: `op1-v1.6-sampling-workshop` based on `op1-v1.6-display-foundation`.
Do not modify historical blog images, blog posts, other website files or Pages deployment workflow. Final release should include source, test scripts, workflow, service worker, icons, manifest, and this handover with SHA-256 manifest.
