---
title: "Creating a Sony PlayStation Modchip"
author: "Nix McRetro"
date: 2016-02-14T23:10:18.000+11:00
last_modified_at: 2026-10-22
categories: [hacks, sony, youtube]
---

{% include youtube.html id="2rLbI1Ltbso" %}

A quick look at programming PIC microcontrollers with Mayumi 4 or MultiMode3 modchip code. I was experimenting with PIC12C508, PIC12C508A and PIC12F629 devices, with the intention of making a modchip for a PAL Sony PlayStation using a PU-22 motherboard.

I've somehow accumulated quite a collection of programmers, although getting any of them to cooperate with these little PIC chips has been another matter entirely. The K150 kept dropping out, the GQ-4X wasn't behaving as expected, and my home-built PICkit 2 was sitting nearby looking rather neglected. That left the MiniPro TL866CS.

The TL866CS was giving me the best results, although I was still having some trouble. I'd load the HEX file, select the correct PIC and program it, only to find that reading the contents back didn't appear to show all the code. Not exactly what you want when some of these chips can only be programmed once.

I started with Mayumi 4, which uses the PlayStation's mechacon clock on supported motherboard revisions. MultiMode3 is a little different because it uses the PIC's internal clock. Both have their uses, although the internal-clock arrangement offers broader compatibility with some earlier PlayStation boards.

The MultiMode3 code appeared to program and read back quite happily. Mayumi, on the other hand, seemed determined to leave me with a collection of useless chips. I even tried a rewritable PIC12F508 so I could experiment without continually throwing away one-time-programmable devices.

The PIC12F629 was interesting too, with a different memory arrangement and considerably more space than the older devices. I managed to get code written and verified, but there was one small problem. I didn't actually have a PlayStation available to test the chips at the time. Typical!

Then came the breakthrough. With some help from the wonderful people at ASSEMbler Games, I discovered that the apparent Mayumi readback failure was related to the PIC's code-protection configuration. Disabling that setting allowed the programmed contents to be read back correctly. All that trouble over one little configuration bit!

That was rather satisfying, particularly after spending so much time questioning the programmer, the chips and probably my own sanity. It also reminded me that a successful programming message and a confusing readback don't necessarily mean the chip has been written incorrectly.

This particular programmed chip eventually went to Dale, who successfully installed it in his PlayStation. Kudos to Dale! :)

**Update:** This was also my first 4K-ready video, and probably the last one for a while too. I did not have the CPU power to encode these things quickly or the bandwidth to upload them!

**Sources**

- [ConsoleMods - PS1 Modchips](https://consolemods.org/wiki/PS1:Modchips)
- [Microchip - PIC12C5XX Data Sheet](https://ww1.microchip.com/downloads/en/DeviceDoc/40139E.pdf)

**Related Posts**

- [Sony PlayStation Modchip Overview](/sony-playstation-modchip-overview/)
- [Mayumi 4: PIC12F629, SCPH-7502 (PU-22)](/mayumi-4-pic12f629-scph-7502-pu-22/)
- [Mayumi 4: PIC12C508A, SCPH-7502 (PU-22)](/mayumi-4-pic12c508a-scph-7502-pu-22/)
- [Mayumi 4: PIC12C508A, SCPH-5502 (PU-18)](/mayumi-4-pic12c508a-scph-5502-pu-18/)
