---
title: "Sega TeraDrive XTIDE EEPROM Upgrade: AT28C64B to AT28C256"
author: "Nix McRetro"
date: 2013-02-27T07:51:50.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, sega]
---

![](/assets/images/2013/img_0378.jpg)

Time for a little more room in the XTIDE BIOS department.

Both of my cards currently use Atmel AT28C64B EEPROMs.

The AT28C64B stores 64 Kbit as 8K x 8, which gives me 8 KiB of ROM space.

I'm replacing them with AT28C256 devices, which provide 32 KiB.

![](/assets/images/2012/img_0359.jpg)

Why the upgrade?

Partly because I discovered that the XTIDE BIOS image I had been using was not as stock-standard as I had assumed, and partly because the larger EEPROM gives me considerably more breathing room for different builds and configuration options.

Krille over at the Vintage Computer Forums helped enormously while I was sorting this out.

In that troubleshooting thread, the problem I had been fighting was traced to the particular XTIDE BIOS build I was using rather than simply another mistake in my configuration.

Krille supplied a compiled r505 build that got me moving again.

Thanks to Krille on the [Vintage Computer Forums](https://forum.vcfed.org/index.php?threads/sega-teradrive-286-with-xt-ide-v2-card.36040/) for the help.

![](/assets/images/2013/img_0379.jpg)

At the moment I am using `IDE_XTP.bin`.

It works, but I would really like the boot-menu overlay back.

Presentation is important, even when your storage controller lives inside a Sega 286 from 1991.

The XTIDE configuration also needs to match the actual EEPROM hardware.

With the larger chip installed, the EEPROM type is configured as `28256`.

So the physical upgrade is straightforward:

AT28C64B: 8 KiB

AT28C256: 32 KiB

Four times the space for future experiments.

### Sources

- [Microchip - Parallel EEPROM](https://www.microchip.com/en-us/products/memory/parallel-eeprom) - lists the AT28C64B as 64 Kbit, 8K x 8 and the AT28C256 as 256 Kbit, 32K x 8.
