# OP-1 Browser Lab: v1.6 Display Foundation Preview

Status: feature branch preview, NOT approved or deployed to main.
Base: published v1.5.1 at 8689cc35feef90e3822a6e98609ccd55bb82c827.

## What changes
- Correct expanded-display aspect ratio (680 by 325) at desktop and phone widths. Remove the CSS max-height rules that independently compressed screen height. Keep scrolling within the dialog rather than stretching the canvas.
- Connect the expanded canvas to original tape selection and ruler seeking. Wire pointer scrubbing in normal and reel views and touchscreen paddle movement in Pulse Paddle.
- Add an expanded display workbench: modes, sequencer/tape/FX/reels/game launchers, four dynamic soft keys, four adjustable encoders, and tape transport. Expanded menu actions delegate to the existing functions, rather than implementing a second instrument state.
- Keep focus trapping, Escape dismissal, and focus restoration. Project file schema, recorded audio and state storage are unchanged.
- Add browser regression checks for aspect ratio, live tape seeking, display action controls and portrait widths.

## Testing
Chromium local screen and interaction checks were performed at 1440x900 and 390x844; GitHub Actions Chromium, Firefox and WebKit regression should be run on this branch before merging.
Physical iPhone Safari remains manual verification.

## Proposed larger v1.6 scope, NOT implemented in this preview
Sampling Workshop: non-destructive source-preserving sample start/end editing, slice audition and waveform interaction, followed by loops, sample reverse, and pitch mapping with project compatibility tests.
Do not describe this preview as Sampling Workshop until these features are actually delivered.

## Publication
No deployment to main without user review and approval. The standard full-site GitHub Pages build continues to run on main. Keep OP-1 releases on a dedicated branch until ready.
