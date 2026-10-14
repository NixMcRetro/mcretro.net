# OP-1 Browser Lab v2.1 Studio Simplified: feature-branch handover

Prepared 15 October 2026 (Sydney). Do not publish before separate approval.

## Repository and publication boundary

- Repository: NixMcRetro/mcretro.net
- Feature branch: op1-v2.1-studio-simplified
- Base production commit: 66b0eddbf50ee0657d219eccd4fbb099109b3837, v2.0.2
- Do not merge, rebase or force-push to main without a fresh user instruction.
- Do not edit unrelated posts, homepages, Jekyll or Pagefind content.
- New behavior is UI-only. Projects remain \`op1-browser-lab-v05\`, version 5. Existing audio samples, tape clips, MIDI imports, demo compositions, presets, notes, drum sequences and song workspace clips remain untouched.

## Changes

1. A **SIMPLE / ADVANCED** layout toggle stored separately from the portable project in \`localStorage['op1-lab-layout-v21']\`. Simple is the default for a fresh browser. Advanced retains the previous six workspace tabs and their panels.
2. A four-stage simple studio: Sounds, Compose, Record & Mix, Tools. Each stage offers named editor choices and displays one underlying existing editor at a time. All old DOM controls, state and event listeners stay mounted, including physical and mobile keyboards.
3. Clearer composition path: Sound Library -> Piano Roll or Pianola -> Unified Song Workspace -> Tape/Track Mixer -> Save Project/Recovery. Cross-links never replace user music or automatically create an empty project.
4. Unified shortcuts: original demos, MIDI destination picker, Song Workspace, Mixer, portable backup, keyboard shortcuts. Simple mode hides the redundant original quick strip, but it stays intact in Advanced mode. Physical instrument menus still work in both modes.
5. Graphite-compatible chrome and mobile-friendly 2-column stage buttons, larger touch targets and contextual notes. Compact sticky desktop keyboard and existing mobile octave controls remain functional.
6. Isolated \`simplified.js\` and \`simplified.css\`. Only a small integration hook in the existing \`comfort.js\` and \`index.html\`, plus PWA cache update. The underlying \`workspace.js\` and \`workspace.css\` are unchanged.

## Automated testing

- New \`.github/tests/op1-studio-simplified.mjs\` tests Chromium, Firefox and WebKit, including a 390px mobile viewport: default Simple layout; one visible editor; all four navigation groups; demo and MIDI shortcuts; Pianola-to-Song arrangement; SAVE PROJECT round-trip; no changes to tracks/notes/clips across mode switches; return to the full Advanced workspace.
- Legacy testing fixture shows all old panels so existing instrument/sampling/browser regressions retain their original assertions. \`op1-studio-comfort.mjs\` enters Advanced at the start, validating its original six-tab experience.
- \`op1-pwa-offline.mjs\` checks both new JS/CSS cache entries, v2.1 scoped cache version, offline project restoration, and independent layout/theme preferences.
- All pre-existing tests remain required, including MIDI round-trips, multi-track PCM audio, browser recording, demo graph safety, old project compatibility, Retina expanded display, and offline recovery.
- Verify the exact feature commit's full GitHub Actions run before approval. If a test fails, fix the underlying issue without weakening assertions.

## Limitations

- This release is a navigational simplification rather than a new tracker or mixing engine. All prior monophonic/polyphonic MIDI limits remain.
- The full Advanced layout is retained, so familiar tools can still appear dense when users explicitly select it.
- Automated WebKit tests do not replace real physical iPhone Safari, external audio interface or hardware MIDI validation.
- The layout preference is local to the current browser and not included in portable music projects. A new browser defaults to Simple.

## Review/release gate

1. Confirm exact feature SHA and complete green GitHub Action run.
2. Compare against current main; verify no unrelated changed files and unchanged project serialization.
3. Review interface on a desktop and narrow viewport, keyboard, and actual audio.
4. Prepare review source artifact and handover.
5. Await explicit separate approval to update main; verify post-publication Pages and OP-1 regressions.
