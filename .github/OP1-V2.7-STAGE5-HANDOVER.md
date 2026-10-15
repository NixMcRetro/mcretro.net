# OP-1 Browser Lab v2.7: Stage 5 Beginner Finishing

Date: 15 October 2026
Repository: NixMcRetro/mcretro.net
Development branch: op1-v2.7-stage4-sound-shaping
Published baseline: 84c44537c226c1feb87be91ab5e0a9b3dd5f17e0

## Purpose

Complete Batch 2 of v2.7. Make the existing Music Maker accessible and comprehensible to a complete beginner through Generate, Remix or Shape, Play, and Finish. Do not add another independent sound engine or duplicate backup/project storage.

## Features

1. Show a concise song summary with the number of song sections, approximate duration and BPM directly inside Music Maker. The interface labels the next actions in everyday terms.
2. Make the primary Play Song button show Stop Song while the tracker arrangement is playing. The Stop button remains available; both synchronize their state with Tracker Studio.
3. Make finished-song WAV progress and result visible in Music Maker itself, rather than only inside the hidden expert Tracker Studio. The existing successful v2.6 stereo rendering and three-minute limit remain unchanged.
4. Enable Play and Finish from a portable version 5 project opened into the application, even when that page has not generated a new song in the current session.
5. Keep Save Editable Project separate from WAV export, and provide beginner-appropriate status messages.
6. Retain the offline app shell, Advanced Studio, original instrument, MIDI imports, tracker, sampling, tape, independent Song Workspace, all sounds, backwards compatibility and complete historical regressions.

## Boundaries

This is finishing and navigation polish, not true unified whole-project mixing of independent tracker, tape and Song Workspace audio. Do not imply that independent recordings are already included in finished-song WAV.

## Verification

The new .github/tests/op1-song-finishing-v27.mjs checks Play/Stop state, arrangement description, generated song export, portable project reopening, tape/workspace preservation and mobile layout. Run this with Stage 4 A/B regression and every prior OP-1 browser test across Chromium, Firefox and WebKit. Check PWA offline reload and capture the exact successful Actions run SHA.

## Publication gate

No push to main without separate explicit user approval. No force-push. Only OP-1 files and relevant regression tests/workflow may change; no unrelated blog posts, images or GitHub Pages deployment changes.
