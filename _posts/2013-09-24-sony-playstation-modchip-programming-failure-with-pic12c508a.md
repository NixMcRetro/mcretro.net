---
title: "Sony PlayStation Modchip Programming Failure with a PIC12C508A"
author: "Nix McRetro"
date: 2013-09-24T23:23:15.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [programming, sony, youtube]
---

{% include youtube.html id="8LhzuYNXMhs" %}

This wasn't much of a success. I suspected differences between the PIC12C508 and PIC12C508A. If anyone could point out what would be different, that would be swell - I'm not a datasheet wizard and if it doesn't just zap, I try again a few different ways. Sadly all resulted in failure on this occasion... Calibration IDs, all that razzamatazz but no luck!

Microchip's datasheet does show differences between the devices, including the oscillator-calibration implementation, but I did not establish that those differences caused this failure.

I promise to upload a video where I do successfully flash the... I think they are PIC12F629 or something along those lines anyway. Reflashable... none of this one-time programming (OTP).

By January 2015, it had turned out that my GQ-4X was dying slowly and randomly. I had purchased another model with no issues. That gives this failed attempt another possible explanation, rather than proving the PIC12C508A was incompatible.

### Related posts

- [Sony PlayStation 1 Modchip Installation Success on SCPH-9002](/sony-playstation-1-modchip-installation-success-on-scph-9002/)
- [Mayumi 4 | PIC12F629 | SCPH-7502 | PU-22](/mayumi-4-pic12f629-scph-7502-pu-22/)

### Sources

- [Microchip - PIC12C5XX: 8-Pin, 8-Bit CMOS Microcontrollers](https://ww1.microchip.com/downloads/en/devicedoc/40139e.pdf)
- [Microchip - PIC12F629/675 Data Sheet](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/DataSheets/41190G.pdf)
