---
title: "Sony PlayStation 1 Modchip Installation Failure on SCPH-9002"
author: "Nix McRetro"
date: 2013-09-25T00:25:12.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, sony, youtube]
---

{% include youtube.html id="bA2Xc0uRxZY" %}

Oh geez! Another video of a guide I was attempting to do only to have many things go wrong and write it off. Rather than throw it away I thought I might let the internet feast on this beauty of a video - see my attempt at stop motion in Final Cut Pro X at the end of the video...

{% include youtube.html id="V6QhAZckY8w" %}

...things can only get better! ;)

![Small surface-mount component beside an Australian one-dollar coin](/assets/images/2013/img_0419.jpg)

As with the previous video, without the modchip, we weren't going to get too far anyway even if all the wires had gone in properly. I've since purchased a pair of wire strippers - how did I not have these before now? And some nice PIC flash chips so I can make mistakes and reflash - that's the power of Flash!

I returned to this SCPH-9002 project in November 2013, using a reflashable PIC12F629 and successfully loading MultiMode3. I also found that the CD burner used for test games was faulty, with "verify burn" switched off or ignored. That meant a failed disc boot was not a clean test of the modchip wiring.

### Related posts

- [Sony PlayStation Modchip Programming Failure with a PIC12C508A](/sony-playstation-modchip-programming-failure-with-pic12c508a/)
- [Sony PlayStation 1 Modchip Installation on SCPH-9002 Update](/sony-playstation-1-modchip-installation-on-scph-9002-update/)
- [Sony PlayStation 1 Modchip Installation Success on SCPH-9002](/sony-playstation-1-modchip-installation-success-on-scph-9002/)

### Sources

- [Microchip - PIC12F629/675 Data Sheet](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/DataSheets/41190G.pdf)
