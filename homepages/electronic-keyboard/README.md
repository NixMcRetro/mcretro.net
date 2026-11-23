# Electronic Keyboard (Model EK-1)

A small, standalone, 1990s home-keyboard-inspired instrument for the browser.

**Current version:** `0.1.0` (development, not a stable release).

Open `homepages/electronic-keyboard/index.html` in a browser or serve this directory as a static site. Nothing is downloaded by the app after the three local source files have loaded. No server-side services or account are required.

## v0.1.0 functions

- 49-key on-screen piano (C3 to C7) with computer-keyboard and pointer input
- 12 selectable oscillator-based tones
- 6 drum rhythm patterns with tempo control
- Auto chord mode for the bottom octave when playing with a rhythm
- 5 original, hard-coded sixteen-bar demo song arrangements, including melody, bass, chords and percussion
- Melody-off play-along and illuminated melody keys
- Record and replay up to two minutes of played keyboard notes

**Recording limitation:** Takes are held in memory, not saved. Refreshing or closing the page clears the recording. Recording captures played notes only, not the rhythm track or live microphone audio. Persistent export is deferred to a future minor release.

**Sound limitation:** The 12 tones are procedural Web Audio approximations, not copyrighted or sampled Casio patches. This is an original instrument and is not affiliated with Casio.

### Shortcuts

The two central octaves use `Z S X D C V G B H N J M` and `Q 2 W 3 E R 5 T 6 Y 7 U`. Mouse and touch input can play the full four-octave keyboard. On narrow screens, the piano scrolls horizontally.

## Versioning policy

EK-1 uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) with `MAJOR.MINOR.PATCH`.

- `0.1.0`: first playable prototype (development API and controls may change)
- `0.x.1`: compatible bug fix on the corresponding `0.x` development line
- `0.(x+1).0`: newly playable features or intentionally changed behaviours during initial development
- `1.0.0`: first stable public instrument after acceptance and browser testing
- After 1.0.0: patch for backwards-compatible fixes, minor for compatible features, major for breaking changes

The historical OP-1/BleepGarden v2.9 application remains in Git history and in the `archive/op1-v2.9-before-ek1` branch. The EK-1 application is independent and does not import the legacy codebase. No existing local OP-1 projects are migrated or modified by EK-1.

## Tests

```sh
node --check homepages/electronic-keyboard/app.js
npm install --no-save playwright@1.57.0
npx playwright install chromium firefox webkit
node .github/tests/ek1-browser-smoke.mjs
```

Do not delete the old published site until its historical URLs, bookmarks, and browser-stored projects have a safe retirement plan.
