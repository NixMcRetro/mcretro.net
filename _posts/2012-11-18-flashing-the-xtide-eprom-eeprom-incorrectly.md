---
title: "Flashing the XTIDE EPROM / EEPROM Incorrectly"
author: "Nix McRetro"
date: 2012-11-18T01:23:03.000+11:00
categories: [ibm-pc, programming, youtube]
---

{% include youtube.html id="UbKzfdFUt30" %}

While I worked out how to flash the card, the XTIDE card itself is an EEPROM programmer, it's starting to look like I flashed it completely wrong. I even lost the ability of the card to detect the disk on module... How did I resolve this? Simple! Since I ordered two XTIDE cards I was able to remove the EEPROM from the card, dump the contents and flash the chip on the card I killed using my new GQ-4X Programmer.

The address I had to flash was not the default D000h but C800h, after this it would write to the chip with no issues. So the next step is moving on to getting the XTIDE card working properly now that I know the address to flash!
