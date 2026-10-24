---
title: "Creating SNES Cartridges with TSOP40 Flash Memory and Donor PCBs"
author: "Nix McRetro"
date: 2013-09-22T21:13:37.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="dV6J6cpVUfg" %}

Here we create a SNES cart using a donor cart, either NHL 96 or World Cup Striker. The plan is to flash EarthBound and Donkey Kong Country 3, although EarthBound is the one that gets most of the attention in this video. I've got two perfectly good sports games ready to sacrifice for the cause, so this should be entertaining!

I'd already desoldered the original mask ROMs from the donor boards. The next job was fitting sockets so I could experiment without soldering and desoldering the chips every time. I only had 40-pin sockets available, so a little modification was needed to make them fit the 36-pin arrangement I was using.

After fitting the sockets, I gave one of the donor boards a test using an original game ROM. It worked, which was a rather encouraging start given the amount of soldering still ahead. I was also beginning to realise that there wasn't going to be much spare room once all these adapters and chips were stacked inside a cartridge case.

The flash-memory arrangement uses a TSOP40 chip mounted on an adapter PCB, with the donor cartridge providing the supporting hardware. I'd ordered some lovely purple circuit boards manufactured by OSH Park, using a design shared through the RetroHacker forums. The idea was to connect the TSOP40 flash memory to the GQ-4X programmer, which would let me write a game image to the chip.

Before attempting anything too adventurous, I finished assembling the programmer adapter and tested it using the original World Cup Striker mask ROM. I managed to read the ROM, save it as a `.bin` file and identify it as the PAL 8 Mbit game. Better still, the image loaded in ZSNES. Excellent! At least that part of the homemade adapter was doing exactly what it should.

Next came the wonderful world of fine-pitch soldering. The AM29F032 flash chip has some ridiculously small legs, and getting everything lined up was not particularly enjoyable. Lots of flux, a bit of drag soldering and some desoldering braid eventually got the job done, although I managed to make the chip sit slightly crooked on its adapter. Beautiful workmanship, obviously!

The GQ-4X recognised the flash chip and I successfully wrote EarthBound to it. Unfortunately, the first test in the PAL Super Nintendo produced the familiar warning that the game wasn't designed for this Super Famicom or Super NES. That's what happens when you try to run the original NTSC game on a console that isn't expecting it.

I then tried a PAL-converted version of the ROM. This got us into the game, although the picture didn't fill the entire screen and progress eventually stopped with an error. I suspected the ROM conversion was involved, but there was also discussion of save-memory size around that particular problem. Either way, it wasn't a completely working EarthBound cartridge just yet.

My plan was to return to the original NTSC ROM and install a SuperCIC modification in the console, rather than continue fiddling with the converted version. The donor PCB had the sort of hardware I needed for EarthBound, but that doesn't make every SNES donor interchangeable. HiROM and LoROM cartridges can have different arrangements, and the memory and supporting circuitry still need to suit the intended game.

There was also the minor problem of getting the whole thing back into its plastic case. The socketed arrangement took up too much room, so I eventually abandoned the socket on one cartridge and made some adjustments to the shell. I also went back to the original battery arrangement for the moment, since the replacement holder was still causing clearance problems.

One flash-cartridge experiment had made some very real progress. The second wasn't so fortunate! I accidentally soldered a TSOP40 chip on upside down, and trying to remove it without suitable hot-air equipment ended with a damaged corner on the chip. Running out of flux probably didn't help either. Fine-pitch soldering can be an absolute monster.

Still, we've managed to build and test the programmer adapter, read an original SNES ROM, program flash memory and get EarthBound running far enough to investigate the remaining compatibility problems. Donkey Kong Country 3 will have to wait its turn. Not bad for a weekend spent turning unwanted sports games into something considerably more interesting!

**Related Posts**

- [GQ-4X Flashing EarthBound onto TSOP40 AM29F032B Flash Memory](/gq-4x-flashing-earthbound-onto-tsop40-am29f032b-flash-memory/)
- [27C801 EPROM SNES Donor Cartridge Demo: Super Bomberman 2](/27c801-eprom-snes-donor-cartridge-demo-super-bomberman-2/)

**Sources**

- [NesDev Forums - What kind of eproms do snes games use?](https://web.archive.org/web/20231014212322/https://forums.nesdev.org/viewtopic.php?t=5605)
- [RetroHacker - Mounting 29F032 on TSOP adapter](https://web.archive.org/web/20160313064923/http://retrohacker.info/viewtopic.php?f=13&t=6)
- [RetroHacker - Swapbin EPROM Method](https://web.archive.org/web/20140921210156/http://retrohacker.info/viewtopic.php?f=13&t=18)
