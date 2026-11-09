---
title: "27C801 EPROM SNES Donor Cartridge Demo: Super Bomberman 2"
author: "Nix McRetro"
date: 2013-09-22T21:14:57.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="alj9g9DjjsE" %}

This was a quick video to support the previous video on AM29F032 TSOP40 flashing, but it got cut because I forgot about it! Here we're running *Super Bomberman 2* using a 27C801 EPROM on an *NHL 96* or perhaps *World Cup Striker* donor cartridge. They look the same, so I can't tell the difference!

I'd been experimenting with making my own SNES cartridges using old game boards and replacement memory chips. Before going anywhere near the more complicated TSOP40 flash chip, I wanted to make sure the donor cartridge and its wiring worked with something a little easier to handle.

For this test I'd programmed a 27C801 EPROM with the PAL version of *Super Bomberman 2*. It's an 8 Mbit device, giving us 1 MiB of storage, which was just what I needed for a straightforward test.

The cartridge already had a socket fitted, and I'd rearranged the connections involving pins 24 and 31 to suit the EPROM. Because the socket got in the way, the blue and yellow wires had to run underneath the board instead. Not the prettiest arrangement, perhaps, but it did the job.

There was also a red wire on the back of the cartridge where I'd previously managed to lift a PCB trace near one of the capacitors. Rather than abandon the donor board, I'd bridged the damaged connection and carried on. These cartridges are certainly getting their fair share of soldering practice!

With the EPROM installed, it was time to try the cartridge in the Super Nintendo. Remember to have the chips facing towards the back of the console, otherwise, as I rather helpfully pointed out in the video, it'll catch fire! Well, that's one way of making sure I remember which way around it goes.

And would you believe it? *Super Bomberman 2* started successfully! There it was, running on the SNES from my modified donor cartridge. After all that fiddling with sockets, wires and replacement ROMs, it was rather nice to see an actual game on the screen.

This was exactly the test I wanted before moving on to the AMD flash chip. The EPROM arrangement was working on this donor board, so I could get back to the TSOP40 experiment with a little more confidence.

Next up is fitting that tiny flash chip to its adapter PCB and seeing whether I can get the same sort of result. One working homemade cartridge is a good start. Let's see whether I can manage another without breaking anything!

**Sources**

- [STMicroelectronics - M27C801: 8 Mbit UV EPROM and OTP EPROM](https://media.digikey.com/pdf/Data%20Sheets/ST%20Microelectronics%20PDFS/M27C801.pdf)
- [NesDev Forums - SNES Cartmodding Information Overview and Questions](https://web.archive.org/web/20231014212226/https://forums.nesdev.org/viewtopic.php?t=8289)
- [NesDev Forums - cartmod questions swapbin related](https://web.archive.org/web/20231014212232/https://forums.nesdev.org/viewtopic.php?t=7778)
- [Xtronics - How EPROMs Work](https://xtronics.com/wiki/How_EPROMS_Work.html)

**Related Posts**

- [GQ-4X Flashing EarthBound onto TSOP40 AM29F032B Flash Memory](/gq-4x-flashing-earthbound-onto-tsop40-am29f032b-flash-memory/)
- [Creating SNES Cartridges with TSOP40 Flash Memory and Donor PCBs](/creating-snes-cartridges-with-tsop40-flash-memory-and-donor-pcbs/)
