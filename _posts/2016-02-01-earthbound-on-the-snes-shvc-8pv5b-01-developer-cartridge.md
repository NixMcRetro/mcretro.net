---
title: "EarthBound on the SNES SHVC-8PV5B-01 Developer Cartridge"
author: "Nix McRetro"
date: 2016-02-01
last_modified_at: 2026-10-21
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="L_1cBbgMgG4" %}

I've received a whole bunch of 27C040 EPROMs for my Super Nintendo development cartridge, and that means it's time for another attempt at getting EarthBound running. Each chip holds 512 KB, so six of them should be enough for the game's 3 MB ROM.

The development board is an SHVC-8PV5B-01, complete with DIP switches and enough sockets to make things interesting. I've programmed the EPROMs and fitted them to the board, so now comes the fun part: working out which combination of switches will actually make everything behave.

Someone had kindly uploaded photographs of a similar cartridge configured for *Boogerman*, which gave me somewhere to start. Unfortunately, *Boogerman* doesn't use SRAM, while EarthBound requires 64 kbit of SRAM. Looks like we've got a bit more experimenting to do!

The first attempt gave us a familiar-looking screen, although not quite the one I was hoping for. At least the machine was doing something! I also managed to upset the SuperCIC modification, which decided it wanted to switch the console into PAL mode. No, don't do that!

After some more fiddling with the DIP switches, EarthBound finally started getting through its startup checks. And there we have it, we're actually playing EarthBound on a development cartridge. Fantastic!

There are still a few things I'd like to try, since EarthBound has some rather unpleasant copy-protection tricks if it doesn't like the hardware. One of those involves throwing far more enemies at you than usual, which doesn't sound particularly enjoyable.

I've also picked up some flash-memory chips that might make a nice alternative to UV-erasable EPROMs. They should be suitable for 5 V operation, although a few connections will need to be rearranged before I can try them.

For now, though, we've got EarthBound running on this rather lovely development board. All those EPROMs and DIP switches have finally done something useful. Beautiful!

**Related Posts**

- [Creating SNES Cartridges with TSOP40 Flash Memory and Donor PCBs](/creating-snes-cartridges-with-tsop40-flash-memory-and-donor-pcbs/)
- [GQ-4X Flashing EarthBound onto TSOP40 AM29F032B Flash Memory](/gq-4x-flashing-earthbound-onto-tsop40-am29f032b-flash-memory/)
- [EarthBound Cartridge (SHVC-1J3M-20) SuperCIC Key](/earthbound-cartridge-shvc-1j3m-20-supercic-key/)
