# OP-1 Browser Lab v2.8 Stage 4: Beginner Finish and Graphite Polish

Date: 16 October 2026
Repository: NixMcRetro/mcretro.net
Development branch: op1-v2.8-stage4-finish-darkmode
Starting verified Stage 3 commit: 85e65834851a475701d1382a6a22a000bcd26857

## Goal

Complete the simplified beginner journey: Generate, Arrange, Play and Finish, while adding genuine persisted light/graphite themes across BOTH beginner tabs. Retain the complete audio/tracker/tape/Workspace engines beneath the beginner interface, but keep technical workflows out of the everyday experience.

## Delivered

- **One visible Play Song / Stop Song control.** A redundant separate Stop button is hidden from the beginner surface. The same primary control changes its text, state and behaviour when playback starts/stops. All original advanced controls remain in Classic Studio.
- **Finish Your Song panel** makes Download My Song (stereo WAV) the primary action and Save Editable Project a distinct, equally available action. Export shows rendering/completion/failure feedback directly where the action occurred. Playback is stopped safely before rendering; concurrent recording or a keyboard take is never silently overwritten.
- A visible **Dark mode / Light mode** switch sits above the two beginner tabs. It uses the existing persistent OP-1 theme preference and carries through Classic Studio, reload, and offline use. Real dark colours are applied to Music Maker, sound preview, parts list, section cards, the riff recorder and finish panel. Piano keys remain legibly black and white.
- WAV is explicitly identified as the **Music Maker / Tracker arrangement**. The independent Tape Studio and Song Workspace are preserved in editable project JSON but are NOT yet unified into the stereo song render.
- The 3-minute WAV limit is shown and enforced. Long arrangements can still be saved as portable editable projects. Version 5 project format, samples, metadata, historic tracker notes and all other engines are unchanged.
- Saved projects can be reopened with the same simple Play, Arrange and Finish workflow; beginner interface remains Make Music and Play Keyboard, not another studio.

## Tests

New `.github/tests/op1-finish-darkmode-v28.mjs` checks cross-browser dark/light styles, two-tab navigation, single Play/Stop, real stereo WAV, project preservation, the 3-minute export limit, mobile viewport and visible finish feedback.

Updated offline/PWA regression checks the new stylesheet is cached and verifies that selecting graphite from the beginner interface survives switching into Classic Studio and offline reload.

Run full OP-1 Chromium/Firefox/WebKit historical regression at the precise final feature commit; preserve archived regression artifacts and this handover.

## Publication gate

The user requested Stage 4 and more cosmetic polish **before** publishing. No push or merge to `main` without later explicit approval. Do not force-push; recheck main for unrelated website changes when approval arrives. Keep non-OP-1 images, posts and GitHub Pages workflow untouched.

## Deferred

Independent Tape Studio / Song Workspace plus Tracker stereo mixing is a separate engineering project. This Stage 4 does not claim unified export.
