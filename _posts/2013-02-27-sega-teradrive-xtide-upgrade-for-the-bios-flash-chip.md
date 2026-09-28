---
title: "Sega TeraDrive XTIDE Upgrade for the BIOS Flash Chip"
author: "Nix McRetro"
date: 2013-02-27T07:51:50.000+11:00
categories: [hacks, sega]
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2013/img_0378.jpg)

Well I'll be moving up from a 28C64 to a roomy 28C256. Currently I have an Atmel AT28C64B installed. I'll be bumping both cards from the 8KiB up to the larger 32KiB chips. Why the change? I discovered my XTIDE BIOS may have been custom configured at some point and was not as stock standard as I would have believed.

![](/assets/images/2012/img_0359.jpg)

Thanks to Krille on the Vintage-Computer for the help on getting it to work. See [this thread](https://forum.vcfed.org/index.php?threads/sega-teradrive-286-with-xt-ide-v2-card.36040/) for the details. And there I was thinking I was doing something wrong! Turns out there was a bug in the XTIDE BIOS itself. I guess that's why it is still (and probably always will be) considered beta software. Kudos for the help Krille and for the compiled copy of r505.

![](/assets/images/2013/img_0379.jpg)

But I found that the BIOS I am using is IDE\_XTP.bin at the moment, but would really like that menu overlay back. It just makes it so much more presentable.

**2026 note:** The original post called the installed EEPROM an "Amtel AT28C648". The part is the Atmel AT28C64B. Its 8K x 8 organisation is 8KiB, while the AT28C256 is 32K x 8, or 32KiB, so the capacity change described here is correct.

### Sources

- [Microchip - AT28C64B](https://www.microchip.com/en-us/product/at28c64b)
- [Microchip - AT28C256](https://www.microchip.com/en-us/product/at28c256)
