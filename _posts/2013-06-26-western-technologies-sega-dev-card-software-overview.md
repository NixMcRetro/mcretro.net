---
title: "Western Technologies Sega Dev Card Software Overview"
author: "Nix McRetro"
date: 2013-06-26T17:51:55.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [devkit, programming, sega]
---

{% include youtube.html id="ak-G2ouUytk" %}

This gives a peek at the software running behind the Western Technologies Development Card for uploading (they call it downloading) from the PC to the Mega Drive. `SEGALOAD` sends the game image through the PC's parallel port into SRAM on the development cartridge. Beats having to burn the EPROMs with the game code every time you update code!

It reminded me of a Mega EverDrive. The 2012 Mega EverDrive could load a ROM from SD or transfer one from a PC over USB into cartridge memory. Different hardware, but a similar way to get new code running on the Mega Drive.

### Related posts

- [Western Technologies Sega Dev Card Demo](/western-technologies-sega-dev-card-demo/)
- [Western Technologies Sega Dev Card SEGALOAD.EXE](/western-technologies-sega-dev-card-segaloadexe/)

### Sources

- [Genesis Programming FAQ - Western Technologies SegaDev Card and SEGALOAD.EXE](https://gamefaqs.gamespot.com/genesis/916377-genesis/faqs/9755)
- [Mega EverDrive User Manual, March 2012](https://stoneagegamer.com/content/flash/legacy/megaed/Mega_EverDrive_Manual_ENGLISH_PCBv1.00_FWv2_OSv1.pdf)
- [Charles MacDonald and Bock - SegaDev hardware inspection and original software](https://www.smspower.org/forums/12038-ZAXZ80HInCircuitEmulatorER308ERX308PWasWhatsInADevkitAnyway)
