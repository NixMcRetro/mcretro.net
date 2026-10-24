---
title: "Sony PlayStation Modchip Programming Failure with a PIC12C508A"
author: "Nix McRetro"
date: 2013-09-24T23:23:15.000+10:00
last_modified_at: 2026-10-22
categories: [programming, sony, youtube]
---

{% include youtube.html id="8LhzuYNXMhs" %}

This wasn't much of a success. I suspected differences between the PIC12C508 and PIC12C508A. If anyone could point out what would be different, that would be swell. I'm not a datasheet wizard, and if something doesn't just zap, I tend to try again a few different ways. Sadly, all resulted in failure on this occasion!

I'd been putting together a modchip for a Sony PlayStation SCPH-9002, one of the later original PlayStation revisions without the parallel port. I had the console, a collection of PIC microcontrollers from element14, some 30 AWG wire and my trusty GQ-4X programmer.

The idea was to program one of the PIC12C508A chips with MultiMode3 firmware, then install it inside the PlayStation. I'd chosen MultiMode3 from the various modchip options available, figuring it would be a reasonably good starting point.

The programming software recognised the Microchip device and showed where to position it in the programmer's socket. That part was relatively straightforward, although I did manage to spend a little while working out exactly which position it belonged in.

After loading the appropriate HEX file, I was left staring at the configuration settings. Oscillator calibration, configuration words, user IDs and all that razzamatazz. I couldn't find an explanation that made everything obvious, so I initially left the available settings at their defaults.

Unfortunately, the result wasn't what I'd hoped for. The programming process reported a configuration verification failure, leaving me with a PIC that I couldn't confidently use for the modchip installation.

That was particularly annoying because the PIC12C508A is a one-time-programmable part. At least with the reprogrammable PIC12F629 chips I was considering, I could make a mistake and try again without sacrificing another chip to the electronics gods.

I initially suspected there might be something important about the differences between the PIC12C508 and PIC12C508A. Microchip's datasheet does describe differences in their oscillator-calibration arrangements, but I hadn't established whether that had anything to do with this particular failure.

For the moment, the modchip programming experiment had been unsuccessful. I'd need to look further into the configuration requirements, try different hardware or move onto the reprogrammable PICs before attempting a proper installation.

I promise to upload a video where I do successfully flash the... I think they are PIC12F629 or something along those lines anyway. Reflashable... none of this one-time programming!

**Update January 2015:** It turned out my GQ-4X was dying slowly and randomly. I bought another model with no issues! That gives this failed attempt another possible explanation, rather than proving the PIC12C508A was incompatible.

**Related Posts**

- [Sony PlayStation 1 Modchip Installation Success on SCPH-9002](/sony-playstation-1-modchip-installation-success-on-scph-9002/)
- [Mayumi 4: PIC12F629, SCPH-7502 (PU-22)](/mayumi-4-pic12f629-scph-7502-pu-22/)

**Sources**

- [Microchip - PIC12C5XX: 8-Pin, 8-Bit CMOS Microcontrollers](https://ww1.microchip.com/downloads/en/devicedoc/40139e.pdf)
- [Microchip - PIC12F629/675 Data Sheet](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/DataSheets/41190G.pdf)
