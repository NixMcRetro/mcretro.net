---
title: "Apple Macintosh LC 475 RAM Utilisation and 32-Bit Addressing"
author: "Nix McRetro"
date: 2012-09-26T12:17:56.000+10:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [apple, sega]
---

![](/assets/images/2012/img_0278.jpg)

Found out that this LC 475 was still running in 24-bit addressing mode.

That explains the rather ridiculous memory display.

System 7 in 24-bit mode can only make 8 MB of physical RAM available for normal use. Any installed RAM above that gets accounted for as though it belongs to the System heap, even though applications cannot actually use it.

With 36 MB installed, that made it look as though System 7 had developed an absolutely enormous appetite for RAM.

I turned on 32-bit addressing in the Memory control panel, restarted, and suddenly all that extra memory became usable normally. The reported System footprint dropped back to around 2 MB.

I knew System 7 wasn't **THAT** hungry for RAM.

Found out about this thanks to [MicroMac](https://www.micromac.com/FAQ/faq_lc475_upgrade.html).

In other news, my copy of Geist Force for the Dreamcast arrived today.

Thanks to the ASSEMblergames community and everyone who helped make that prototype release happen. Here's to many more preserved releases in the future!

### Related posts

- [The Apple Macintosh LC 475](/the-apple-macintosh-lc-475/)
- [Geist Force Prototype Reproduction for Sega Dreamcast](/geist-force-prototype-reproduction-for-sega-dreamcast/)

### Sources

- [Apple - Macintosh LC 475 Technical Specifications](https://support.apple.com/en-ca/112204) - documents support for both 24-bit and 32-bit addressing and a maximum of 36 MB RAM.
