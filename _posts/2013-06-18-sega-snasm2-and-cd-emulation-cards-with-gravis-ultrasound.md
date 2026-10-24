---
title: "Sega SNASM2 and CD Emulation Cards with Gravis UltraSound"
author: "Nix McRetro"
date: 2013-06-18T09:15:04.000+10:00
last_modified_at: 2026-10-18
categories: [devkit, programming, sega]
---

{% include youtube.html id="SzAiboKontg" %}

This video was more or less put together for my own reference while trying to get the Sega Mega-CD development cards working on a Pentium III 800 MHz system. Electrically, the setup appeared compatible as far as I could tell. Physically, I simply did not have a PC case large enough for all that development-card absurdity.

The first machine was built around a Gigabyte GA-6VXC7-4X motherboard I'd picked up from the roadside some time earlier. It had the ISA slots I needed, along with PCI, AGP, USB and the usual assortment of connections you'd expect from a late Pentium III system. On paper it looked rather promising.

Then I tried fitting the SNASM2 cards into the case. Oh dear. One of the cards was so long that it ran straight into the power supply, which was not quite what I'd planned. I even compared it with my Gravis UltraSound, another famously oversized ISA card, and the Sega hardware managed to make that look almost reasonable.

![](/assets/images/2013/img_0366.jpg)

So we worked our way down the food chain to a Pentium 100 MHz. This machine had a rather more accommodating case, three ISA slots and a motherboard tray that reminded me just how differently computers used to be assembled. I also fitted a disk-on-module for storage, along with floppy and CD-ROM drives.

The plan was to use this as a dedicated DOS workstation for the Sega Mega-CD development hardware. Having a machine that could communicate with the old ISA cards while still supporting somewhat newer storage and peripherals seemed like a good compromise. I was getting rather tired of keeping every piece of hardware in a separate box.

Unfortunately, the Pentium wasn't entirely cooperative. With the Sega cards installed, the SCSI link configuration test reported a failure. Removing the Gravis UltraSound didn't resolve it either. What's that? Now it doesn't work properly at all? Bah!

Moving down the chain even further brought us to the humble 486DX4-100. With the development hardware properly seated, the card was recognised and I was able to make more progress with the test software. It certainly seemed happier with this older machine than it had been with the Pentium.

![](/assets/images/2013/img_0408.jpg)

I also discovered that the cards are rather particular about being seated correctly. Given the size of these things, that's not especially surprising. There were still some odd results while working through the SCSI link tests, so I wouldn't call the whole development arrangement completely sorted just yet.

The Gravis UltraSound was part of the grand plan for this workstation too. It's a beautiful card, although combining it with these enormous Sega boards certainly makes the inside of a PC interesting. I'll need to keep experimenting with the arrangement rather than assume all the hardware will cooperate at once.

At least we're getting somewhere. A humble 486, a collection of oversized ISA cards and the Sega Mega-CD development hardware. Quite a workstation, even if finding a suitable PC has turned into a project of its own!

**Related Posts**

- [SNASM2 Sega Mega-CD Emulation Card on a 486DX4-100](/snasm2-mega-cd-emulation-card-on-a-486dx4-100mhz/)
- [SNASM2 ISA Card on a Pentium-class Motherboard](/snasm2-isa-card-on-a-pentium-class-motherboard/)
