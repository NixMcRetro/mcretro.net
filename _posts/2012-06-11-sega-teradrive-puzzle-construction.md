---
title: "Sega TeraDrive Puzzle Construction"
author: "Nix McRetro"
date: 2012-06-11T22:07:32.000+10:00
last_modified_at: 2026-10-02
ai_assistance:
  model: "GPT-6 Astra Max"
  date: 2026-10-02
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="KhHoHnwrTLI" %}

To kick things off here is a video of my faulty WDI-325Q. Listen to it grind! I'll need to be sending that back to the place I bought it from, not much use to me in that state!

{% include youtube.html id="C8uMyyIT58E" %}

Next up we have the mysterious Puzzle Construction software. It definitely interacts with the Mega Drive hardware inside the TeraDrive, which helps explain why the sound and video effects seemed unusually advanced for an ordinary 286 PC. Sega's own hardware archive identifies it as dedicated software for the machine.

Later reverse-engineering work documents how the PC side can access the Mega Drive hardware through the TeraDrive's inter-system interface. That gives useful context, but does not by itself establish exactly how Puzzle Construction divides the work between the two sides. The Sega licensing screen makes considerably more sense in hindsight.

{% include youtube.html id="X3XtOCb6LLE" %}

This last video shows the Background Music Edit Panel. There are others for layout, rules and so on as well. This was the main one I found enjoyable because there is lots of music to choose from, including my personal favourite, Game 1.

All this work was done on my Model 3 TeraDrive, although I did start tinkering with Puzzle Construction on my Model 2 with an IBM WDL-330P just sitting on top of the power supply. As soon as it was packed away I dug out the Model 3.

It sure was a weekend to remember.

### Sources

- [BlastEm - Teradrive Hardware Notes](https://www.retrodev.com/blastem/trac/wiki/TeradriveHardwareNotes) - later reverse-engineering notes documenting the bus-switch interface and PC-side access to Mega Drive hardware.
- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's official TeraDrive page identifies Puzzle Construction as dedicated software for the system.
- [MAME - Sega TeraDrive driver](https://github.com/mamedev/mame/blob/master/src/mame/pc/teradrive.cpp) - documents the emulated communication path between the TeraDrive PC side and Mega Drive hardware used by dedicated software.
