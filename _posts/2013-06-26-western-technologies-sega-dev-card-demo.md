---
title: "Western Technologies Sega Dev Card Demo"
author: "Nix McRetro"
date: 2013-06-26T19:04:06.000+10:00
last_modified_at: 2026-10-22
categories: [devkit, hacks, sega]
---

{% include youtube.html id="A9zQueGP4iI" %}

Let us have a look at the Western Technologies Development Card functioning with a simple Sonic binary file. Uploaded (they call it downloading) from the PC to the Mega Drive through the PC's parallel port, with the image held in SRAM on the development cartridge.

I've got the Mega Drive connected to the retro PC and the television sitting off to one side. From the DOS prompt, it's simply a matter of running SEGALOAD.EXE with the Sonic binary file. The screen flashes, the software does its thing, and there we have it. Sonic the Hedgehog is running!

Of course, playing Sonic while holding a camera isn't particularly easy. Still, the important thing is that the development card actually works, which is more than I was expecting after some of my other adventures with unusual Sega hardware.

There's also SEGADEV.EXE itself, which gives us access to a collection of debugging functions. I had a little poke around with the controls, including what appeared to be breakpoints and stepping through code. Most of this is still rather unfamiliar territory for me!

The comparison to a Mega EverDrive is about loading game code without constantly burning EPROMs. The 2012 Mega EverDrive could load ROMs from SD or transfer them from a PC over USB. Different hardware, but a similarly convenient idea.

So there you go, a working Western Technologies Genesis Development Card, revision D. There's certainly more to explore here, and I'm rather pleased we've managed to get something running on it.

### Related posts

- [Western Technologies Sega Dev Card Software Overview](/western-technologies-sega-dev-card-software-overview/)
- [Western Technologies Sega Dev Card SEGALOAD.EXE](/western-technologies-sega-dev-card-segaloadexe/)
- [Western Technologies Sega Dev Card Demo Code](/western-technologies-sega-dev-card-demo-code/)

### Sources

- [Genesis Programming FAQ - Western Technologies SegaDev Card and SEGALOAD.EXE](https://gamefaqs.gamespot.com/genesis/916377-genesis/faqs/9755)
- [Mega EverDrive User Manual, March 2012](https://stoneagegamer.com/content/flash/legacy/megaed/Mega_EverDrive_Manual_ENGLISH_PCBv1.00_FWv2_OSv1.pdf)
- [Charles MacDonald and Bock - SegaDev hardware inspection and original software](https://www.smspower.org/forums/12038-ZAXZ80HInCircuitEmulatorER308ERX308PWasWhatsInADevkitAnyway)
