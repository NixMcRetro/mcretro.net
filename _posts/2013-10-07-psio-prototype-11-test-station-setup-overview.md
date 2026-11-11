---
title: "PSIO Prototype 1.1 Test Station Setup Overview"
author: "Nix McRetro"
date: 2013-10-07T17:45:27.000+11:00
last_modified_at: 2026-10-18
categories: [gaming, sony, youtube]
share_description: >-
  A PAL SCPH-5502 without its CD drive becomes the PSIO 1.1 test station, complete with XRGB-mini and PC-based loading. Let the game compatibility chaos begin! 🎮
---

{% include youtube.html id="0XlxDn-m8eQ" %}

Here's a quick overview of my PSIO prototype test station before I start putting a collection of PlayStation games through their paces. I've got a PAL SCPH-5502 with the CD deck removed, and the PSIO hardware 1.1 connected to the parallel I/O port on the back. This should be interesting!

The PlayStation is connected through RGB to the good old XRGB-mini Framemeister, which then feeds the television over HDMI. The Framemeister is a fantastic little bit of hardware in its own right, and it also helps me avoid the missing-colour problem that can occur when playing NTSC games through composite video on PAL equipment.

RGB bypasses the PAL/NTSC composite colour encoding, so I don't need a separate composite colour correction modification for this arrangement. It's all gravy, really. RGB looks considerably better anyway!

I've also got the PSIO connected to the computer for loading games. This particular prototype still needs that connection for the loader, although there's talk of later hardware handling things more independently. I haven't got that version here, so we'll concentrate on what this one can actually do.

For the tests I've prepared a 16 GB card containing a selection of game images, mostly BIN files and associated image data. Some had already given me trouble in an emulator, so it will be interesting to see whether they behave any differently on the prototype. I've got quite a few games to work through!

Another interesting detail is that PSIO handles the PlayStation's disc-open or disc-closed state through software. The Systems Console gives me access to the game list, and from there I can select an image to try. Let's start with Tekken and see what happens.

Please remember that this is prototype hardware, so the game compatibility and behaviour may differ substantially from the final product. You can hit up [ps-io.com](https://ps-io.com/) if you have any questions, since I am but a mere tester. I don't understand all the technology behind this wonderful invention.

**Test hardware**

- PSIO hardware: 1.1
- PSIO software: 1.1A
- PlayStation: PAL SCPH-5502
- CD deck: removed
- video processing: Micomsoft XRGB-mini Framemeister

### Sources

- [PSX-SPX - Mods - PAL/NTSC Color Mods](https://psx-spx.consoledev.net/ps1/pinouts/mods-pal-ntsc-color-mods/)

### Related Posts

- [PSIO Prototype Hardware 1.1 Overview](/psio-prototype-hardware-11-overview/)
