---
title: "GQ-4X Flashing EarthBound onto TSOP40 AM29F032B Flash Memory"
author: "Nix McRetro"
date: 2013-09-22T18:12:02.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="vET3hOFtoq0" %}

A quick look at the actual programming stage of the EarthBound cartridge project.

The memory device here is an AMD AM29F032B.

It is a 32 Mbit, or 4 MiB, 5 V flash-memory device in a TSOP40 package.

So my old description of it as an EEPROM was not the right terminology.

The GQ-4X programmer, together with the appropriate TSOP40 adapter, lets me program the game image onto the flash device before it goes into the converted donor cartridge.

The physical cartridge conversion and adapter construction are covered in the related SNES donor-cart post.

This video is simply the bit where the bits actually become bits.

### Related posts

- [Creating SNES Cartridges with TSOP40 Flash Memory and Donor PCBs](/creating-snes-cartridges-with-tsop40-flash-memory-and-donor-pcbs/)

### Sources

- [AMD AM29F032B Datasheet](https://datasheet4u.com/pdf-down/A/M/2/AM29F032B-AMD.pdf)
- [NesDev Forums - AM29F032B programming discussion](https://web.archive.org/web/20231014212550/https://forums.nesdev.org/viewtopic.php?f=12&t=13705)
