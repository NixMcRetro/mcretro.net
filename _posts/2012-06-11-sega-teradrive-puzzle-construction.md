---
title: "Sega TeraDrive Puzzle Construction"
author: "Nix McRetro"
date: 2012-06-11T22:07:32.000+10:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="KhHoHnwrTLI" %}

To kick things off here is a video of my faulty WDI-325Q. Listen to it grind! I'll need to be sending that back to the place I bought it from, not much use to me in that state!

{% include youtube.html id="C8uMyyIT58E" %}

Next up we have the mysterious Puzzle Construction software.

It definitely interacts with the Mega Drive hardware inside the TeraDrive. Sega's own hardware archive identifies Puzzle Construction as dedicated software for the machine, while later reverse-engineering work suggests that the program runs game logic on the 286 and accesses the Mega Drive VDP, YM3438 sound hardware and controller I/O through the TeraDrive's inter-system interface.

That explains why the sound and video effects seemed unusually advanced for an ordinary 286 PC.

I would still treat the exact internal division of work as a reverse-engineered finding rather than pretending Sega documented every detail for us.

The Sega licensing screen also makes considerably more sense in hindsight. This was software specifically designed to show off what the strange PC and Mega Drive hybrid could do.

{% include youtube.html id="X3XtOCb6LLE" %}

This last video shows the Background Music Edit Panel. There are others for layout, rules and so on as well. This was the main one I found enjoyable because there is lots of music to choose from, including my personal favourite, Game 1.

All this work was done on my Model 3 TeraDrive, although I did start tinkering with Puzzle Construction on my Model 2 with an IBM WDL-330P just sitting on top of the power supply.

As soon as it was packed away I dug out the Model 3.

It sure was a weekend to remember.

### Sources

- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's official TeraDrive page identifies Puzzle Construction as dedicated software for the system.
- [MAME - Sega TeraDrive driver](https://github.com/mamedev/mame/blob/master/src/mame/pc/teradrive.cpp) - documents the emulated communication path between the TeraDrive PC side and Mega Drive hardware used by dedicated software.
