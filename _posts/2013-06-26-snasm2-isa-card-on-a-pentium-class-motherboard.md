---
title: "SNASM2 ISA Card on a Pentium-class Motherboard"
author: "Nix McRetro"
date: 2013-06-26T15:50:33.000+10:00
last_modified_at: 2026-10-23
categories: [devkit, programming, sega]
---

{% include youtube.html id="zb2928JnKEg" %}

Another weekend frittered away getting the SNASM2 development card working! I've dragged out the Pentium system again, mostly because I was getting rather tired of swapping expansion cards around in the 486. There never seem to be enough suitable slots when you need them.

Well, after going through what felt like a million BIOS settings, I've finally found something that makes the SNASM2 card behave. You're not going to believe this one!

Internal CPU cache.

That's it! With the Pentium's internal cache enabled, the development card fails its tests. Disable the cache in the BIOS, restart the machine, and suddenly everything works. I tried changing the external cache setting as well, but that didn't appear to make any difference. It's specifically the internal cache that's causing trouble on this particular motherboard.

Why? I have absolutely no idea!

I'm using a Pentium-class motherboard with a TX Pro chipset, along with an S3 Trio32 PCI video card. With the internal cache enabled, this machine is actually rather nice for DOS gaming. *Doom* runs beautifully, especially compared with some of the older graphics cards I've been experimenting with.

Turn the internal cache off, though, and the performance takes an enormous hit. The SNASM2 card is happy, but *Doom* becomes painfully slow. Brilliant! The one setting that makes the machine useful for Sega development also makes it considerably less useful as an ordinary gaming PC.

I demonstrated the difference by switching between the two BIOS configurations. With the cache enabled, the development card's error indicators appear during testing. Disable it and the card passes, but the rest of the computer slows down dramatically.

Looks like I'll need to stick a note on the front of the case reminding myself which setting to use. Internal cache on for gaming, off when I want the SNASM2 card to cooperate. That's not particularly elegant, but at least it's a solution!

This is only something I've observed with this particular motherboard and card combination. I haven't established why the cache affects the development hardware, so I certainly wouldn't treat it as a universal requirement for running SNASM2.

The 486DX4-100 system still works much more happily without this nonsense, although it's nice to know that the Pentium isn't completely incompatible after all.

Who would have thought a CPU cache setting could cause so much trouble? Any and all speculation is welcome in the comments!

### Related posts

- [Sega SNASM2 and CD Emulation Cards with Gravis UltraSound](/sega-snasm2-and-cd-emulation-cards-with-gravis-ultrasound/)
- [SNASM2 Sega Mega-CD Emulation Card on a 486DX4-100](/snasm2-mega-cd-emulation-card-on-a-486dx4-100mhz/)
