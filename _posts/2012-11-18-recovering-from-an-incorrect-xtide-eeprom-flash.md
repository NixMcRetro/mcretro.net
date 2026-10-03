---
title: "Recovering from an Incorrect XTIDE EEPROM Flash"
author: "Nix McRetro"
date: 2012-11-18T01:23:03.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, programming, youtube]
---

{% include youtube.html id="UbKzfdFUt30" %}

Well, I worked out how to flash the XTIDE card.

I also worked out how to flash it incorrectly.

XTIDECFG can program the EEPROM while it is installed on supported XTIDE hardware, but after my first attempt the card stopped detecting the Disk on Module entirely.

Conveniently, I had ordered two XTIDE cards. That gave me a known-good EEPROM to work from. I removed the chip from the working card, dumped it with the GQ-4X and used that image to recover the EEPROM from the card I had just murdered.

Useful programmer already!

One configuration problem I found was the option-ROM address. This particular XTIDE card was configured for `C800h`, while I had been working from `D000h`. The correct address is not universal. The BIOS configuration has to match the ROM address selected by the actual XTIDE hardware. Once I corrected that, EEPROM programming behaved normally again.

Now that I can recover from my own mistakes, it is time to get the XTIDE working properly in the TeraDrive.

### Related posts

- [GQ-4X EEPROM and EPROM Programmer Test](/gq-4x-eeprom-and-eprom-programmer-test/)
- [XTIDE Settings for the Sega TeraDrive](/xtide-settings-for-the-sega-teradrive/)

### Sources

- [XTIDE Universal BIOS](https://xtideuniversalbios.org/) - documents XTIDECFG EEPROM programming and configurable option-ROM segment addresses.
