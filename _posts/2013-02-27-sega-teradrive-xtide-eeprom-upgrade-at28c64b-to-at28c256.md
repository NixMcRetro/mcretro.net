---
title: "Sega TeraDrive XTIDE EEPROM Upgrade: AT28C64B to AT28C256"
author: "Nix McRetro"
date: 2013-02-27T07:51:50.000+11:00
last_modified_at: 2026-10-05
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-05
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, sega]
---

![](/assets/images/2013/img_0378.jpg)

Time for a little more room in the XTIDE BIOS department. Both of my cards currently use Atmel AT28C64B EEPROMs. The AT28C64B stores 64 Kbit as 8K x 8, which gives me 8 KiB of ROM space. I'm replacing them with AT28C256 devices, which provide 32 KiB.

![](/assets/images/2012/img_0359.jpg)

Why the upgrade? Partly because I discovered that the XTIDE BIOS image I had been using was not as stock-standard as I had assumed, and partly because the larger EEPROM gives me considerably more breathing room for different builds and configuration options.

Thanks to Krille on the [Vintage Computer Forums](https://forum.vcfed.org/index.php?threads/sega-teradrive-286-with-xt-ide-v2-card.36040/) for the help on getting it to work. And there I was thinking I was doing something wrong! The problem was traced to the particular XTIDE BIOS build I was using, and Krille supplied a compiled r505 build that got me moving again.

![](/assets/images/2013/img_0379.jpg)

At the moment I am using `IDE_XTP.bin`. It works, but I would really like the boot-menu overlay back. Presentation is important, even when your storage controller lives inside a Sega 286 from 1991.

The XTIDE configuration also needs to match the actual EEPROM hardware. With the larger chip installed, the EEPROM type is configured as `28256`.

So the physical upgrade is straightforward:

| EEPROM | Capacity |
| --- | --- |
| AT28C64B | 8 KiB |
| AT28C256 | 32 KiB |

Four times the space for future experiments.

### Sources

- [Microchip - AT28C64B](https://www.microchip.com/en-us/product/AT28C64B) - 64 Kbit EEPROM organised as 8K x 8, giving 8 KiB.
- [Microchip - AT28C256](https://www.microchip.com/en-us/product/AT28C256) - 256 Kbit EEPROM organised as 32K x 8, giving 32 KiB.
