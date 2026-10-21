---
title: "Western Technologies Sega Dev Card SEGALOAD.EXE"
author: "Nix McRetro"
date: 2013-06-26T19:45:22.000+10:00
last_modified_at: 2026-10-22
categories: [devkit, hacks, sega]
---

{% include youtube.html id="dHOHttUf32E" %}

More on the Western Technologies Sega Development Card and the software used to run it. `SEGALOAD.EXE` is the PC-side object-code downloader for the SegaDev hardware, sending a compiled image from the development PC into SRAM on the cartridge attached to the Mega Drive.

After trying out the SegaDev RAM test, I thought I'd have a go at loading Zero Wing. Unfortunately, that wasn't particularly successful. The file was in Super Magic Drive format, and simply renaming it didn't get us anywhere.

After a little more experimenting, I found a way to convert the SMD file into a BIN image. Back to SEGALOAD, another attempt, and suddenly we had the familiar opening to Zero Wing. War was beginning!

Unfortunately, the game eventually froze. Whether that was caused by the development card, its connection, the software or something else entirely wasn't clear. Still, getting the game to start was a promising sign.

There's obviously more investigating to do, but at least we've made some progress with loading games onto this unusual piece of Mega Drive development hardware.

### Related posts

- [Western Technologies Sega Dev Card Software Overview](/western-technologies-sega-dev-card-software-overview/)
- [Western Technologies Sega Dev Card Demo Code](/western-technologies-sega-dev-card-demo-code/)
- [Glitching on Western Technologies Sega Dev Card](/glitching-on-western-technologies-sega-dev-card/)

### Sources

- [Charles MacDonald and Bock - SegaDev hardware inspection and original software](https://www.smspower.org/forums/12038-ZAXZ80HInCircuitEmulatorER308ERX308PWasWhatsInADevkitAnyway)
- [Genesis Programming FAQ - Western Technologies SegaDev Card and SEGALOAD.EXE](https://gamefaqs.gamespot.com/genesis/916377-genesis/faqs/9755)
