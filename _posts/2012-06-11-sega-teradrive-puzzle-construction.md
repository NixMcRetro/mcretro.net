---
title: "Sega TeraDrive Puzzle Construction"
author: "Nix McRetro"
date: 2012-06-11T22:07:32.000+10:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs, sega]
---


{% include youtube.html id="KhHoHnwrTLI" %}

To kick things off here is a video of my faulty WDI-325Q. Listen to it grind! I'll need to be sending that back to the place I bought it from, not much use to me in that state!

{% include youtube.html id="C8uMyyIT58E" %}

Next up we have the mysterious Puzzle Construction software running on the Sega TeraDrive. This was one of the more interesting things I found while experimenting with the Model 3, mainly because it doesn't behave like ordinary PC software. The machine keeps switching between its PC and Mega Drive video output, and some of the graphics and sound are rather impressive for a humble 286.

The software includes several different games and editing tools. One of the games reminds me of Columns, although the aim is a little different and the levels have their own rules. It also requires a Mega Drive controller plugged into the TeraDrive, which I seem to forget about every time I want to play something.

The sound is another interesting part of the experience. Through the TeraDrive's audio output, Puzzle Construction produces music and effects that are rather more exciting than the usual PC speaker noises. I wasn't entirely sure how it was accessing the Mega Drive hardware at the time, but it certainly sounded like something more than an ordinary DOS game.

{% include youtube.html id="X3XtOCb6LLE" %}

This last video takes a closer look at the Background Music Edit Panel, which was probably my favourite part of Puzzle Construction. You can select existing tunes, listen to the different sections and even put together your own music using a PS/2 mouse. There are little musical phrases and sound effects to choose from, with quite a few combinations to experiment with.

There's also a Sound Effect Editor, along with other panels for things such as layout and rules. The interface itself is curious because it switches between composite and VGA output while the TeraDrive is still operating in PC mode. I also noticed that the main Puzzle Construction menu looks remarkably similar to the TeraDrive's normal startup menu, right down to its arrangement of six squares.

One of the games includes some particularly catchy music, with Game 1 being my personal favourite. To demonstrate the difference, I also fired up Crystal Caves outside Puzzle Construction. Its ordinary PC speaker sounds are considerably less impressive, although the game itself is still good fun.

All this work was done on my Model 3 TeraDrive, although I did start tinkering with Puzzle Construction on my Model 2 with an IBM WDL-330P just sitting on top of the power supply. As soon as it was packed away I dug out the Model 3.

Later reverse-engineering work documents how the PC side can access the Mega Drive hardware through the TeraDrive's inter-system interface. That gives useful context for what I was seeing, although I still couldn't say exactly how Puzzle Construction divided the work between the two sides. Sega's own hardware archive identifies it as dedicated software for the machine, so those unusual graphics and sound effects make considerably more sense in hindsight.

**Sources**

- [BlastEm - TeraDrive Hardware Notes](https://www.retrodev.com/blastem/trac/wiki/TeradriveHardwareNotes) - later reverse-engineering notes documenting the bus-switch interface and PC-side access to Mega Drive hardware.
- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's official TeraDrive page identifies Puzzle Construction as dedicated software for the system.
- [MAME - Sega TeraDrive Driver](https://github.com/mamedev/mame/blob/master/src/mame/pc/teradrive.cpp) - documents the emulated communication path between the TeraDrive PC side and Mega Drive hardware used by dedicated software.
