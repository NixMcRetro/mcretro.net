---
title: "GQ-4X Flashing EarthBound onto TSOP40 AM29F032B Flash Memory"
author: "Nix McRetro"
date: 2013-09-22T18:12:02.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="vET3hOFtoq0" %}

A lazy Sunday afternoon with RetroJunkie, and what better way to spend it than programming some flash memory for an EarthBound cartridge? I've got the GQ-4X programmer ready and an AMD AM29F032B to deal with. It's a 32 Mbit, or 4 MiB, flash-memory device in a 40-pin TSOP package, so there's plenty of room for the game.

First I'm using the SNES ROM utility to look over the game image and make sure everything is arranged the way I want it. This is the American EarthBound ROM prepared for the PAL cartridge project, and I also need to make sure the unwanted header has been removed before programming.

Back in the GQ-4X software, I selected the AM29F032B device and started preparing the chip. Naturally, the first attempt wasn't particularly encouraging. The programmer reported a chip-ID problem, which had me wondering what I'd managed to do wrong this time.

After reseating the chip in the programmer, everything looked much happier. It's amazing how fussy these things can be about making proper contact! With the device recognised, I could erase it and get it ready for the new image.

The programming itself takes a little while, which is why the video is running at 20 times the normal speed. You could probably go and play some SNES while you're waiting, although perhaps not the game you're currently burning. That would take all the excitement out of the result!

Once the write completed, I ran the verification step to check the programmed contents. That's the important part of this particular demonstration: getting the image onto the flash chip and verifying it through the programmer. The physical adapters and donor cartridge construction are covered in the related article below.

So there you have it. One more step towards an EarthBound cartridge, and another reminder to check that the chip is seated properly before deciding the programmer has gone completely mad!

### Sources

- [AMD / Spansion - Am29F032B Data Sheet](https://www.farnell.com/datasheets/492274.pdf)
- [NesDev Forums - GQ-4X4 Rewriting 29F032B does not work (2016)](https://forums.nesdev.org/viewtopic.php?t=13705)

### Related Posts

- [Creating SNES Cartridges with TSOP40 Flash Memory and Donor PCBs](/creating-snes-cartridges-with-tsop40-flash-memory-and-donor-pcbs/)
