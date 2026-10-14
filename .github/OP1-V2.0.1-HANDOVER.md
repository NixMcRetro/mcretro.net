# SuperNick's OP-1 Browser Lab v2.0.1 Studio Comfort

Prepared 14 October 2026 (Australia/Sydney). Feature-branch development, not approved for main.

## Production baseline and safe release gate

- Repo: NixMcRetro/mcretro.net, application: homepages/op-1/
- Verified v2.0 production main: 16cbc3d32890ae79f3287cb62a8cc8f8d09681f3
- v2.0 Jekyll deployment succeeded, and the production branch OP-1 regression passed on retry. The first attempt encountered a closed WebKit page; no application regression was reproduced.
- This work branch: op1-v2.0.1-studio-comfort, created from the above v2.0 SHA.
- Do not merge or publish without separate explicit user instruction. Never force push. Keep unrelated blog, images, Jekyll and Pagefind assets untouched.

## User requirements and implementation

- Import .mid/.midi from the app's own MIDI exports and other supported constant-tempo Standard MIDI Files. Existing Piano Roll MIDI import is retained. New choices: Pianola (monophonic with explicit rests and lossless quantized note values; refuses chords), Synth Note Player (monophonic), Unified Song Workspace (polyphonic clip), one-bar Drum Sequencer Pattern (16-step quantization; rejects collisions rather than discarding notes), and selected Tape Track (frozen note events with MIDI timing). The global MIDI destination chooser and individual panel import buttons share one existing MIDI parser. Reject excessive durations, out-of-range notes and unsupported tempo changes without changing existing projects.
- Obvious central octave controls located above the keyboard with ±2 range limits, live musical note range, plus existing keyboard arrow keys and mobile octave controls.
- Ten entirely original, asset-free synth, drum and four-track demo compositions. Expanded DEMOS browser offers category filters, non-destructive audio preview, load as new Unified Song Workspace clips, and explicit PCM render-to-tape for tape demos. Audio previews use a disposable Web Audio graph, independent of saved tracks. No official artwork, audio samples or firmware.
- Retina-expanded OP-1 display redrawn from vector Canvas2D operations at the target device pixel density instead of stretching a 680x325 bitmap. Tap coordinates continue to use original 680x325 logical units. Physical display stays original-sized.
- Graphite/light theme switch, saved in a separate local UI preference rather than portable song state. The OP-1 instrument body stays light.
- Six tabbed workspaces: Play, Drums, Tape, Compose, Song, Tools. Physical keyboard remains mounted above workspace tabs; mobile features are retained and touch keyboard stays available. Tabs only hide non-active panels; they never destroy controls or restart audio.

## Compatibility and architecture

- Portable projects remain format op1-browser-lab-v05 and version 5. No new required project properties, no migration. Existing user sample IDs and checkpoint storage unchanged.
- New static files: homepages/op-1/comfort.js and comfort.css.
- Wiring and logical canvas render update in index.html; shell cache bump to op1-browser-lab-shell-v2.0.1 in sw.js and index.html, includes both new assets.
- Existing v2.0 workspace.js and workspace.css are deliberately unchanged.
- Legacy automated regression fixture allows all old panels visible to continue non-destructive regression coverage; new Studio Comfort tests use real production tab behavior.
- No third-party libraries, proprietary OP-1 visuals, copyrighted music or sample assets added.
- Additional GitHub Actions cross-browser test covers tab behavior, MIDI import, demo project preservation, octave, themes, Retina; offline tests check static asset caching and persisted theme.

## Limitations to disclose

- Piano Roll MIDI parser is deliberately constant tempo. A variable-tempo MIDI or unsupported format is rejected with an explanatory notice.
- Pianola and Synth Note Player are monophonic; overlapping notes or chords should be imported to Piano Roll or Song Workspace instead. Drum Pattern editor holds a single 16-step bar; longer drum MIDI belongs in Song or Tape.
- Tape note events still obey 60-second track / 12-second per-event recording limitations.
- Demo render and previews depend on Web Audio and browser limits. Demo names and musical material are independently designed. No external sample downloads.
- Physical iPhone Safari, external hardware MIDI controllers and real microphone interruption are not verified by Playwright.

## Release checklist

1. Exact candidate SHA passes all OP-1 suites in Chromium, Firefox and WebKit, plus WAV, project backup/reload, IndexedDB and offline checks.
2. Audit diff from current main, especially against concurrent McRetro.net work. No user content or personal dedications.
3. Verify OP-1-only source ZIP artifact and SHA-256 digest.
4. Review by user, with manual Mac Retina and iPhone Safari checks where practical.
5. Publish only on separate explicit approval. Then verify GitHub Pages and production regression against published SHA.
