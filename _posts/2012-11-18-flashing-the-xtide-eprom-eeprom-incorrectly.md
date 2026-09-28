---
title: "Flashing the XTIDE EPROM / EEPROM Incorrectly"
author: "Nix McRetro"
date: 2012-11-18T01:23:03.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, programming, youtube]
---

{% include youtube.html id="UbKzfdFUt30" %}

While I worked out how to flash the card, XTIDECFG can program the EEPROM while it is installed on supported XTIDE hardware, and it's starting to look like I flashed it completely wrong. I even lost the ability of the card to detect the disk on module... How did I resolve this? Simple! Since I ordered two XTIDE cards I was able to remove the EEPROM from the card, dump the contents and flash the chip on the card I killed using my new GQ-4X Programmer.

The EEPROM segment address for this particular card was C800h rather than XTIDECFG's default D000h. The address is not universal: it has to match the ROM address selected by the card's hardware configuration. After setting it correctly, it would write to the chip with no issues. So the next step is moving on to getting the XTIDE card working properly now that I know the address to flash!


### Sources

- [XTIDE Universal BIOS](https://xtideuniversalbios.org/) - documents XTIDECFG EEPROM programming and the configurable EEPROM segment address.
