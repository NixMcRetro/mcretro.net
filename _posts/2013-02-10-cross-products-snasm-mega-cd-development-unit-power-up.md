---
title: "Cross Products SNASM Mega-CD Development Unit Power-Up"
author: "Nix McRetro"
date: 2013-02-10T07:55:55.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [devkit, sega, youtube]
---

{% include youtube.html id="STpdeioICpk" %}

I finally found enough bench space to power up the Cross Products SNASM Mega-CD development unit.

Success, at least at the most basic level.

The hardware powers up and the SNASM2 PC interface initialises correctly and reports that it is ready to connect.

That does not prove every part of the development system is functional, but it is considerably better than an expensive box full of silence.

![](/assets/images/2013/img_0367.jpg)

The video above shows the setup running from a Pentium III 800 MHz machine.

Powered by an Intel Pentium III processor clocked at 800 MHz, we conquered the world together.

![](/assets/images/2013/img_0365.jpg)

The first machine I used during the power-up experiments was actually this Pentium 600 MHz system.

Somewhere along the way I also tried the wonderfully anonymous 133 MHz machine below.

![](/assets/images/2013/img_0366.jpg)

This was a 133 MHz something or other, not sure if it was Cyrix, AMD or Pentium.

It was sufficient though and stacked well into the case.

Later testing showed that the SNASM hardware could be unusually sensitive to the host PC.

A 486DX4-100 worked beautifully, while some Pentium-class setups needed considerably more persuasion.

At this point, though, all I wanted to know was whether the development hardware would wake up.

It did.

![](/assets/images/2013/img_0368.jpg)

Does that silkscreen look attractive on the back of the SNASM2 card?

Next step: disassembly, chip dumping and a lot more photography.

### Related posts

- [Cross Products SNASM Mega-CD Development Unit Disassembly](/cross-products-snasm-mega-cd-development-unit-disassembly/)
- [SNASM2 Sega Mega-CD Emulation Card on a 486DX4 100MHz](/snasm2-mega-cd-emulation-card-on-a-486dx4-100mhz/)
- [SNASM2 ISA Card on a Pentium-class Motherboard](/snasm2-isa-card-on-a-pentium-class-motherboard/)

### Sources

- [Exodus Emulator TechDocs - Sega Mega Drive Development Hardware](https://techdocs.exodusemulator.com/Console/SegaMegaDrive/Hardware.html) - documents the SNASM Mega-CD and SNASM2 PC-interface architecture.
