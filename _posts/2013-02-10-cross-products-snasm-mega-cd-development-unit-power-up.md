---
title: "Cross Products SNASM Mega-CD Development Unit Power-Up"
author: "Nix McRetro"
date: 2013-02-10T07:55:55.000+11:00
last_modified_at: 2026-10-18
categories: [devkit, sega, youtube]
---

{% include youtube.html id="STpdeioICpk" %}

I finally found enough bench space to power up the Cross Products SNASM Mega-CD development unit. Success, at least at the most basic level.

It's not like I have a degree for programming games or the time at the moment to learn. I'd mostly like to see whether all this hardware I've acquired can actually communicate with a PC.

The development unit uses a pair of ISA cards, including the SNASM2 interface and a rather enormous CD-emulation card. That second board is particularly impressive. It's one of the longest cards I've seen in a long time!

I've been experimenting with the DIP switches on the development unit, trying to determine the configuration needed for the PC interface. There are several banks of them, and naturally not every setting is particularly well explained by looking at the machine.

At first the software didn't seem terribly interested in cooperating. SNASM utilities would start, but I was getting errors and unexpected results when trying to select the target device.

I was running DOS 6.22 and had installed the Mega-CD SNASM2 software along with some 32X-related tools. There was quite a bit of trial and error involved, which shouldn't be particularly surprising given that this is unfamiliar development hardware.

I also had a 32X attached to the console, partly out of curiosity. Because why stop at one unusual piece of Sega hardware when we can connect several together?

![](/assets/images/2013/img_0367.jpg)

The video above shows the setup running from a Pentium III 800 MHz machine. Powered by an Intel Pentium III processor clocked at 800 MHz, we conquered the world together.

![](/assets/images/2013/img_0365.jpg)

The first machine I used during the power-up experiments was actually this Pentium 600 MHz system. Why do I have so many bits of old hardware hanging around anyway? Somewhere along the way I also tried the wonderfully anonymous 133 MHz machine below.

![](/assets/images/2013/img_0366.jpg)

This was a 133 MHz something or other, not sure if it was Cyrix, AMD or Pentium. It was sufficient though and stacked well into the case. Eventually the development hardware began responding differently, and I managed to get video output after experimenting with the software and settings. That was quite exciting!

It wasn't a complete development demonstration, though. I still had configuration problems and wasn't consistently getting the expected results. A little communication is a good start, but it doesn't prove the entire system is fully operational.

At this point, all I really wanted to know was whether the development hardware would wake up and give me something to work with. It did, at least enough to justify continuing the investigation.

![](/assets/images/2013/img_0368.jpg)

Doesn't that silkscreen look attractive on the back of the SNASM2 card?

Next steps: disassembly, chip dumping, and a lot more photography. I've only just got the machine running, and already I want to pull it apart again!

### Related Posts

- [Cross Products SNASM Mega-CD Development Unit Disassembly](/cross-products-snasm-mega-cd-development-unit-disassembly/)
- [SNASM2 Sega Mega-CD Emulation Card on a 486DX4 100MHz](/snasm2-mega-cd-emulation-card-on-a-486dx4-100mhz/)
- [SNASM2 ISA Card on a Pentium-class Motherboard](/snasm2-isa-card-on-a-pentium-class-motherboard/)

### Sources

- [Exodus Emulator TechDocs - Sega Mega Drive Development Hardware](https://techdocs.exodusemulator.com/Console/SegaMegaDrive/Hardware.html) - documents the SNASM Mega-CD and SNASM2 PC-interface architecture.
