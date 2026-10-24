---
title: "27C801 EPROM SNES Donor Cartridge Demo: Super Bomberman 2"
author: "Nix McRetro"
date: 2013-09-22T21:14:57.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="alj9g9DjjsE" %}

This was a quick video to support the previous video on AM29F032 TSOP40 flashing, but it got cut because I forgot about it! We run *Super Bomberman 2* using a 27C801 EPROM on an *NHL 96* or perhaps *World Cup Striker* donor cartridge. They look the same, so I can't tell the difference!

I'd been experimenting with creating my own SNES cartridges, using old game boards and replacement memory chips. Before fitting the more complicated TSOP40 flash memory, I wanted to make sure the donor cartridge and its wiring would actually work.

For this test I'd programmed a 27C801 EPROM with the PAL version of *Super Bomberman 2*. The 27C801 is an 8 Mbit device, equivalent to 1 MiB of storage. It was a convenient way to prove that the board could read my replacement ROM before I went any further.

The cartridge had already been fitted with a socket, and I'd rearranged the connections involving pins 24 and 31 for the particular memory setup. Some of that wiring had to run underneath the board because the socket made the top side rather awkward.

There was also a red wire on the back of the cartridge where I'd previously damaged a PCB trace. The original track had lifted near one of the capacitors, so I'd bridged the connection rather than abandon the donor board.

Fortunately, the game started successfully! *Super Bomberman 2* was running on the SNES from my modified cartridge, which was exactly what I'd hoped to see.

For anyone who hasn't played it, *Super Bomberman 2* is one of those wonderfully chaotic maze games where you run around dropping bombs, clearing obstacles and trying not to blow yourself up. It's even better when you've got other people playing, although occasionally it feels like everybody has decided to target you specifically.

Getting the game running confirmed that this particular EPROM and donor-board arrangement was functioning. It didn't establish that every replacement ROM would work without further changes, but it was a useful starting point for the more complicated flash-memory experiment.

The next step was to fit the AMD TSOP40 flash chip and find out whether the project would still cooperate. At least I'd managed to get a proper game running before making everything unnecessarily complicated again.

One working homemade SNES cartridge! That's a rather satisfying result after all the soldering and wiring.

**Related Posts**

- [GQ-4X Flashing EarthBound onto TSOP40 AM29F032B Flash Memory](/gq-4x-flashing-earthbound-onto-tsop40-am29f032b-flash-memory/)
- [Creating SNES Cartridges with TSOP40 Flash Memory and Donor PCBs](/creating-snes-cartridges-with-tsop40-flash-memory-and-donor-pcbs/)

**Sources**

- [STMicroelectronics - M27C801: 8 Mbit UV EPROM and OTP EPROM](https://media.digikey.com/pdf/Data%20Sheets/ST%20Microelectronics%20PDFS/M27C801.pdf)
- [NesDev Forums - SNES Cartmodding Information Overview and Questions](https://web.archive.org/web/20231014212226/https://forums.nesdev.org/viewtopic.php?t=8289)
- [NesDev Forums - cartmod questions swapbin related](https://web.archive.org/web/20231014212232/https://forums.nesdev.org/viewtopic.php?t=7778)
- [Xtronics - How EPROMs Work](https://xtronics.com/wiki/How_EPROMS_Work.html)
