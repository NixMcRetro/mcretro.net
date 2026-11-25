# Lunchbeat Web

A playable browser adaptation of Jan Cumpelik's Lunchbeat PCB v1.31, featuring four original 1-bit sound generators, an eight-step sequencer, groove presets and virtual synchronisation between multiple Lunchbeats. Built with HTML, CSS and JavaScript. No installation required.

[Play Lunchbeat on McRetro.net](https://mcretro.net/homepages/lunchbeat/)

## Getting started

Open index.html in a browser, or use the live page. Enable audio, select a groove and press PLAY. Drag the knobs to change sound and tempo. The four sound buttons can be played manually or used to edit an eight-step pattern. On a computer, add up to four Lunchbeats and connect them with virtual trigger cables. Mobile mode supports one board. On desktop, select Tabs after adding a second Lunchbeat to display one board at a time, or turn Tabs off to return to the stacked layout. All connected boards continue playing regardless of the selected tab.

Keyboard: 1-4 play or edit the four sounds; Space starts or stops playback; E advances the edit step; Shift+E toggles setup mode. Hold the physical-style EDIT button for setup.

## Origins and changes

Original Lunchbeat PCB firmware v1.31: Copyright (c) 2013 Jan Cumpelik (Buran Electrix). [Original firmware and hardware](https://github.com/NixMcRetro/Lunchbeat-PCB).

Browser adaptation by McRetro in 2026: the C sound algorithms and sequencer were adapted to JavaScript/Web Audio, with a simulated control surface, preset patterns, virtual synchronisation and responsive layout. The browser implementation is not a cycle-accurate AVR or analogue circuit simulation. The artwork is not manufacturing-ready PCB artwork.

## Licensing

Browser application code: **GNU GPL v3.0 only (GPL-3.0-only)**. See [LICENSE.txt](LICENSE.txt). The readable application source is [index.html](index.html), including the complete GPL text in a source comment for standalone copies.

Original PCB layout and schematics, and the adapted board illustration apart from separate third-party artwork: **CC BY-SA 3.0**.

The mascot is separate third-party artwork of unknown provenance, not included in either licence grant. See [LICENSING.md](LICENSING.md) for scope and outstanding permission questions. The software is provided without warranty, as stated in the GPL.

These notices apply to this project only, not McRetro.net as a whole.
