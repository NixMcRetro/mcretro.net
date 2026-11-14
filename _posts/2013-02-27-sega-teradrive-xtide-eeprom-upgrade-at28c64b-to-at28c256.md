---
title: "Sega TeraDrive XTIDE EEPROM Upgrade: AT28C64B to AT28C256"
author: "Nix McRetro"
date: 2013-02-27T07:51:50.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, sega]
share_description: >-
  Upgrading XTIDE EEPROMs from AT28C64B to AT28C256 gives the Sega TeraDrive cards four times the ROM space. A new BIOS build gets things moving again. 💾
---

![Monitor showing XTIDE Universal BIOS reporting both master and slave drives 'not found', a 'Booting C>C Error 1h!' message and a DOS date prompt.](/assets/images/2013/img_0378.jpg)

*This is not how I wanted the XTIDE experiment to go. No drives found, an error, and straight back to the DOS date prompt!*
{: .media-caption }

Time for a little more room in the XTIDE BIOS department. Both of my cards currently use Atmel AT28C64B EEPROMs. The AT28C64B stores 64 Kbit as 8K x 8, which gives me 8 KiB of ROM space. I'm replacing them with AT28C256 devices, which provide 32 KiB.

![ViewSonic monitor showing the earlier XTIDE Beta 1 boot menu listing a 29.6 MiB foreign hard disk and a TOPSSD drive.](/assets/images/2012/img_0359.jpg)

*The earlier XTIDE boot menu, with both the original hard drive and TopSSD available. A useful reference while changing EEPROMs.*
{: .media-caption }

Why the upgrade? Partly because I discovered that the XTIDE BIOS image I had been using was not as stock-standard as I had assumed, and partly because the larger EEPROM gives me considerably more breathing room for different builds and configuration options.

Thanks to Krille on the [Vintage Computer Forums](https://forum.vcfed.org/index.php?threads/sega-teradrive-286-with-xt-ide-v2-card.36040/) for the help on getting it to work. And there I was thinking I was doing something wrong! The problem was traced to the particular XTIDE BIOS build I was using, and Krille supplied a compiled r505 build that got me moving again.

![Samsung monitor showing XTIDE Universal BIOS flashing configuration for ide_atl.bin version 2.0.0 Beta 3, with EEPROM type 28256 selected.](/assets/images/2013/img_0379.jpg)

*The larger 28256 EEPROM is selected in XTIDECFG. Finally, more room for the XTIDE BIOS experiments!*
{: .media-caption }

At the moment I am using `IDE_XTP.bin`. It works, but I would really like the boot-menu overlay back. Presentation is important, even when your storage controller lives inside a Sega 286 from 1991.

The XTIDE configuration also needs to match the actual EEPROM hardware. With the larger chip installed, the EEPROM type is configured as `28256`.

So the physical upgrade is straightforward:

| EEPROM | Capacity |
| --- | --- |
| AT28C64B | 8 KiB |
| AT28C256 | 32 KiB |

Four times the space for future experiments.

### Sources

- [Microchip: AT28C64B EEPROM (64 Kbit, 8K x 8, 8 KiB)](https://www.microchip.com/en-us/product/AT28C64B)
- [Microchip: AT28C256 EEPROM (256 Kbit, 32K x 8, 32 KiB)](https://www.microchip.com/en-us/product/AT28C256)
