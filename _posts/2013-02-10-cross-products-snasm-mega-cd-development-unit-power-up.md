---
title: "Cross Products SNASM Mega-CD Development Unit Power-Up"
author: "Nix McRetro"
date: 2013-02-10T07:55:55.000+11:00
last_modified_at: 2026-10-18
categories: [devkit, sega, youtube]
---

{% include youtube.html id="STpdeioICpk" %}

I finally found enough bench space to power up the Cross Products SNASM Mega-CD development unit. It's not like I have a degree in programming games or the time at the moment to learn, but I'd certainly like to see whether all this hardware I've acquired can communicate with a PC.

The development system uses a pair of ISA cards, including the SNASM2 interface and a rather enormous CD-emulation card. That second board is one of the longest cards I've seen in a long time! I've been experimenting with the DIP switches on the unit, trying to work out which configuration is needed for the PC interface.

I installed DOS 6.22 and the Mega-CD SNASM2 software, along with some 32X-related tools. At first the software didn't seem particularly interested in cooperating. The utilities would start, but I was getting errors when selecting the target device and generally not getting very far.

I also had a 32X attached to the console out of curiosity. Because why stop at one unusual piece of Sega hardware when we can connect several together?

![](/assets/images/2013/img_0367.jpg)

The setup in the video is running from a Pentium III 800 MHz machine, but that wasn't the first computer I tried. I'd started with a Pentium 600 MHz system and then experimented with some considerably older hardware.

![](/assets/images/2013/img_0365.jpg)

Here's that first Pentium 600 MHz machine. I really do seem to have an impressive collection of old PCs hanging around the place, which comes in handy when you're trying to get ISA development cards working.

![](/assets/images/2013/img_0366.jpg)

The next machine was a 133 MHz something-or-other. I'm not sure whether it was a Cyrix, AMD, or Pentium, but it was sufficient for the experiment and fitted nicely into the case. Between the different PCs, software configurations, and DIP-switch settings, there was quite a bit of trial and error.

Eventually I managed to get some video output and signs of communication from the development hardware. The SNASM2 PC interface initialised correctly and reported that it was ready to connect, which was certainly encouraging! I still wasn't consistently getting the expected results, but at least the unit was responding well enough to give me something to investigate further.

![](/assets/images/2013/img_0368.jpg)

Doesn't that silkscreen look attractive on the back of the SNASM2 card? I've barely started getting the hardware running, and already I'm planning to pull it apart again. Next on the list are disassembly, chip dumping, and a lot more photography.

**Related Posts**

- [Cross Products SNASM Mega-CD Development Unit Disassembly](/cross-products-snasm-mega-cd-development-unit-disassembly/)
- [SNASM2 Sega Mega-CD Emulation Card on a 486DX4 100MHz](/snasm2-mega-cd-emulation-card-on-a-486dx4-100mhz/)
- [SNASM2 ISA Card on a Pentium-class Motherboard](/snasm2-isa-card-on-a-pentium-class-motherboard/)

**Sources**

- [Exodus Emulator TechDocs - Sega Mega Drive Development Hardware](https://techdocs.exodusemulator.com/Console/SegaMegaDrive/Hardware.html) - documents the SNASM Mega-CD and SNASM2 PC-interface architecture.
