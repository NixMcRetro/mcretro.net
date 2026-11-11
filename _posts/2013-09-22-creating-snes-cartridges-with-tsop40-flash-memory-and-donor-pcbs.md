---
title: "Creating SNES Cartridges with TSOP40 Flash Memory and Donor PCBs"
author: "Nix McRetro"
date: 2013-09-22T21:13:37.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, nintendo, youtube]
share_description: >-
  Two sacrificial sports-game cartridges become SNES flash-memory experiments, with TSOP40 adapters, sockets and a lot of fine-pitch soldering ahead. 🎮
---

{% include youtube.html id="dV6J6cpVUfg" %}

Here we create a SNES cart using a donor cart, either *NHL 96* or *World Cup Striker*. The plan is to flash *EarthBound* and *Donkey Kong Country 3*, although *EarthBound* is the one that gets most of the attention in this video. I've got two perfectly good sports games ready to sacrifice for the cause, so this should be entertaining!

I'd already desoldered the original mask ROMs from the donor boards, and the next step was fitting sockets so I could experiment without having to solder and desolder the chips every time. I only had 40-pin sockets available, so I had to shorten them to suit the 36-pin arrangement. Beautifully professional so far!

After fitting the sockets, I tried an original game ROM in one of the modified donor boards. I even managed to put the *NHL 96* chip into the *World Cup Striker* arrangement during testing, and it worked. That's a good sign, although I was already discovering that stacking sockets and adapters inside a SNES cartridge wasn't going to leave much room.

The main project involved mounting a TSOP40 flash chip onto an adapter PCB, then using my GQ-4X programmer to write a game to it. I'd ordered some lovely purple PCBs from OSH Park, using a design shared through the RetroHacker forums. They looked fantastic, although the amount of soldering involved was beginning to look rather less fantastic.

I assembled the programmer adapter using the socket and the necessary wire connections, taking care to keep everything aligned. Some of the wiring was awkward to get at once the socket was fitted, so it was becoming quite obvious that the order of assembly mattered.

Before soldering the flash chip, I wanted to make sure the programmer adapter was working. Rather than risk a brand-new TSOP40 device straight away, I used the original *World Cup Striker* mask ROM as a test. The GQ-4X managed to read it, and I saved the resulting image as a BIN file.

Better still, the image was identified as the PAL 8 Mbit *World Cup Striker*, and it loaded in ZSNES. Excellent! That meant the homemade adapter could read a known original cartridge ROM before I moved on to programming the flash memory. At least one part of the experiment was going exactly to plan.

Next came the wonderful world of fine-pitch soldering. The AM29F032 flash chip has some ridiculously small legs, and getting them aligned with the adapter pads was a challenge. I used plenty of flux, a bit of drag soldering and some desoldering braid to clean up the excess. The sound of the flux evaporating was lovely, even if the final result wasn't quite as beautiful as I'd hoped.

I even used Blu Tack to help hold the chip in position, although somehow it still ended up sitting a little crooked. Naturally I'd also soldered some of the adapter legs before I really should have, making the job harder than necessary. Still, the GQ-4X recognised the chip, so perhaps my soldering wasn't entirely terrible after all!

Once the AM29F032 was programmed with *EarthBound*, I put the cartridge into the PAL Super Nintendo for a test. Unfortunately, up came the familiar warning that the game wasn't designed for this Super Famicom or Super NES. The original NTSC ROM wasn't going to cooperate with the unmodified PAL console, but at least the cartridge had been recognised.

I then tried a PAL-converted version of *EarthBound*. This time we got into the game, although the picture didn't fill the entire screen, and eventually progress stopped with an error. I found some discussion suggesting that sort of error could involve incorrect SRAM size, but because I'd modified the ROM for PAL operation, I suspected the conversion might be the more likely problem.

My plan was to go back to the original NTSC ROM and install a SuperCIC modification in the console rather than continue wrestling with the converted version. The donor cartridge had a useful combination of HiROM and FastROM support, with the required memory arrangement for the *EarthBound* experiment, including 64 KB of SRAM. That made it suitable for what I was trying to build, although not every SNES donor board is wired the same way.

I'd also been doing some work on the plastic cartridges themselves. The socketed arrangement sat so high that it was going to be difficult to fit everything inside the shell, and the replacement battery holder wasn't helping matters. Eventually I removed the socket on one cartridge, soldered the arrangement more directly and went back to the original battery setup for the moment.

Even then, a little work with the Dremel was required to make room inside the cartridge case. Lovely! The idea was to end up with something I could actually close and use, rather than a tower of circuit boards hanging out of the back of the Super Nintendo.

I also managed to demonstrate one of the modified cartridges running in a newly painted Super Nintendo. That was another rather satisfying moment in a weekend full of fiddly soldering, unusual colours and small victories. The casework and the cartridge experiments were both coming together.

Unfortunately, the second flash chip wasn't so lucky. I managed to solder that one onto its adapter upside down, and removing it without a hot-air station proved extremely difficult. By the time I was done, a corner of the chip had been damaged. Running out of flux probably didn't help either!

Still, we've managed to build and test the programmer adapter, read an original SNES ROM, program the flash memory and get *EarthBound* running far enough to investigate the remaining compatibility problem. The second chip might have suffered, but the first one worked! That's the opposite of how these things usually go for me.

*Donkey Kong Country 3* will have to wait its turn. I've got more boards to order, more chips to solder and a SuperCIC modification to get through before I can finish this little adventure. Not bad for a weekend spent turning unwanted sports games into something considerably more interesting!

**Sources**

- [NesDev Forums - What kind of eproms do snes games use?](https://web.archive.org/web/20231014212322/https://forums.nesdev.org/viewtopic.php?t=5605)
- [RetroHacker - Mounting 29F032 on TSOP adapter](https://web.archive.org/web/20160313064923/http://retrohacker.info/viewtopic.php?f=13&t=6)
- [RetroHacker - Swapbin EPROM Method](https://web.archive.org/web/20140921210156/http://retrohacker.info/viewtopic.php?f=13&t=18)

**Related Posts**

- [GQ-4X Flashing EarthBound onto TSOP40 AM29F032B Flash Memory](/gq-4x-flashing-earthbound-onto-tsop40-am29f032b-flash-memory/)
- [27C801 EPROM SNES Donor Cartridge Demo: Super Bomberman 2](/27c801-eprom-snes-donor-cartridge-demo-super-bomberman-2/)
