# OP-1 Browser Lab v2.7: Stage 4 Sound Shaping

Date: 15 October 2026
Repository: NixMcRetro/mcretro.net
Stage branch: op1-v2.7-stage4-sound-shaping
Published base: 84c44537c226c1feb87be91ab5e0a9b3dd5f17e0

## Objective

Let a complete beginner adjust any existing tracker part toward a familiar sound description, or select a bounded random alternative, and listen before saving it. No proprietary firmware, samples, cloud service or music theory is required.

## Features

- Add Shape Your Sound directly to the v2.7 beginner Music Maker interface. Select Drums, Bass, Chords or Melody, then Warmer, Brighter, Punchier, Softer, Spacier, Darker or Surprise Me.
- Adjust intensity from 0–100%. Try Sound previews settings without changing saved project data. A Original and B Changed audition both settings; Keep This Sound commits one Undo-able mixer edit; Cancel discards it.
- Mixer changes are tracker-channel-local: gentle harmonic warmth, high-shelf brightness, punch-sensitive synth envelope / drum dynamics, low-pass tone and short, bounded delay ambience. FX send, level and pan remain within the existing safe ranges. The established safe master chain and limiter are reused.
- Offline stereo finished-song export renders saved sound shaping. A/B preview is intentionally excluded from backup and WAV until kept. The Music Maker prompts the user to keep/cancel before exporting or saving via its controls.
- Old projects without Stage 4 mixer fields use default 0 values and remain portable version 5. All instruments, samples, tape recordings, independent Song Workspace audio and existing tracker compositions remain supported. Sound shaping never regenerates notes.
- Bump the PWA application-shell cache identifier so Stage 4 source is available after offline installation; cache contains no user recordings.
- Music Maker remains a simpler, optional interface. Advanced Studio and all its historical controls remain.

## Constraints

- Stage 4 is not whole-project mixing and does not mix independent tape plus tracker plus Song Workspace into a single WAV.
- Stage 4 is not automated intelligent mastering. Descriptive words map to deliberately bounded audio controls and still warrant hands-on listening.
- Stage 5 will address further beginner simplification and finishing polish.
- Do not change unrelated blog posts, images, third-party assets or the GitHub Pages deployment workflow.

## Test and publication gate

The new .github/tests/op1-sound-shaping-v27.mjs must check preview does not persist, A/B, safe parameter limits, Keep and Undo, old version 5 mixer normalization, preservation of notes/arrangements/tape/workspace and stereo WAV output across supported browsers. Run the full established OP-1 browser regression workflow at the exact feature commit, including offline/PWA. Real speaker and iPhone Safari listening remain manual checks.

Development on the feature branch does not authorise publication. Obtain separate explicit approval before fast-forwarding main. Never force-push.
