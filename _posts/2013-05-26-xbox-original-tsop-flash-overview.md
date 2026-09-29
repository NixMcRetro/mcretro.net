---
title: "Original Xbox TSOP Flash Overview"
author: "Nix McRetro"
date: 2013-05-26T04:10:00.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [microsoft, repairs, youtube]
---

{% include youtube.html id="ODRL3Em4s2o" %}

Here's what I soldered to flash the BIOS on my revision 1.2 or 1.3 original XBOX. We have a Winbond 256KB TSOP flash ROM on this. Soldering the two points disables the write protection, leaving us the opportunity to install a much better BIOS.

![](/assets/images/2013/img_0400.jpg)

It's essentially a modchip, without a modchip. That also leaves you without a backup if something goes wrong. A work of genius! This XBOX has a 256KB TSOP flash ROM. Older XBOX models (1.0 and 1.1) used a 1MB TSOP, but the retail BIOS image itself is 256KB and is mirrored four times on the 1MB flash.

![](/assets/images/2013/img_0401.jpg)

I'll get around to putting a guide up on eventually, there's still a lot to be done on this website...

### Sources

- [XboxDevWiki - Flash ROM](https://xboxdevwiki.net/Flash_ROM)
- [XboxDevWiki - BIOS](https://xboxdevwiki.net/BIOS)
- [ConsoleMods Wiki - Xbox: TSOP Flashing](https://consolemods.org/wiki/Xbox%3ATSOP_Flashing)
