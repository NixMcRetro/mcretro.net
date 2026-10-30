---
title: "Cross Products SNASM Mega-CD Development Unit Disassembly"
author: "Nix McRetro"
date: 2013-02-11T08:00:55.000+11:00
last_modified_at: 2026-10-18
categories: [devkit, sega]
---

![](/assets/images/2013/img_0369.jpg)

The Cross Products SNASM Mega-CD development unit, serial MCD01/0174, is our next target for disassembly and photography. This is one beefy devkit.

{% include youtube.html id="NzrBAAvLpB0" %}

I've spent a bit of time playing with the software side of the SNASM development system. Now it's time to see what's actually inside the thing. The SNASM Mega-CD was built around modified Mega Drive and Mega-CD hardware with additional development electronics packed inside. That explains the wonderfully dense construction.

At first glance, the upper part of the machine looks like an ordinary Genesis case that's been modified for development use. There are extra brackets, screws, connectors, and bits of metalwork everywhere. And underneath that, there's a PAL Mega Drive board. They really have modified a perfectly good console to make this thing!

The case has several mounting brackets around the sides, along with screws that aren't where I'd normally expect them. It quickly became apparent that taking the top off wasn't going to be as straightforward as removing a few screws from a retail Mega Drive.

There are date markings from 1992 on some of the components, which is interesting to see on this early development hardware.

After removing the upper assembly, I could finally start investigating the additional circuit boards and ribbon connections. Cross Products managed to sandwich another development board into the system without increasing the height anywhere near as much as I would have expected.

The Mega Drive's 68000 processor is present in a quad flat package, and there are extra connections running between the modified console hardware and the development circuitry.

Then there's the Mega-CD side, which is an entirely different adventure. One of the interesting things is the way the Mega-CD CPU area connects into the rest of the development system. There are ribbon cables and an adapter arrangement that wouldn't be present in an ordinary retail unit.

The system could also interface with dedicated CD-emulation hardware, allowing development data to be supplied without relying entirely on physical discs. There are some rather improvised-looking details in here, too. Extra wiring, tape, and various modifications that make the inside look considerably less tidy than the outside.

I even found a fuse where I'd become accustomed to seeing a soldered connection in some of the other Mega-CD hardware I've examined. It's always interesting seeing the little differences between these machines.

The deeper I went, the more complicated it became. Screws, bolts, boards, and cables everywhere. At this point I'm beginning to wonder whether I'll ever get it back together!

I'll probably finish photographing everything later this month or early next. Keep an eye on the [photo gallery](/goodies/) for the inevitable mountain of photographs. I hope you enjoy poking around inside this one as much as I'll enjoy trying to remember where all the screws went. Errr... just kidding?

### Related Posts

- [Cross Products SNASM Mega-CD Development Unit](/cross-products-snasm-mega-cd-development-unit/)
- [Cross Products SNASM Mega-CD Development Unit Power-Up](/cross-products-snasm-mega-cd-development-unit-power-up/)

### Sources

- [Exodus Emulator TechDocs - Sega Mega Drive Development Hardware](https://techdocs.exodusemulator.com/Console/SegaMegaDrive/Hardware.html) - documents the SNASM Mega-CD as modified retail Mega Drive and Mega-CD hardware with additional development circuitry and CD-emulation support.
