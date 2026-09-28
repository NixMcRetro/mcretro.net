---
title: "Sega TeraDrive Model 2 with XTIDE Card Demo"
author: "Nix McRetro"
date: 2012-11-18T01:48:27.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="LG6YAiZeu3U" %}

This is a quick video wrapping up on all the other TeraDrive XTIDE videos so you don't have to sit through eight hours of videos. Mission accomplished!

![](/assets/images/2012/img_0356.jpg)

Above we have the XTIDE BIOS working in XT mode with nice menus under 2.0.0 Beta 1.

![](/assets/images/2012/img_0357.jpg)

The XTIDE card itself, this same / similar design is adapted for smaller form factors, less LEDs, more LEDs. This card just seems to work though - which is all I need it to do with the TopSSD DOM installed.

![](/assets/images/2012/img_0358.jpg)

Last, but not least, here we have the XTIDE software acting as an EEPROM programmer as it programs / flashes the chip with the latest and greatest - at the time of writing somewhere around 2.0.0 Beta 2. One important detail I did not know at the time: XTIDE Universal BIOS 2.0.0 Beta 2 changed the logical CHS handling used by earlier releases including Beta 1. Upgrading an already-partitioned drive between those versions can therefore change the geometry presented to DOS and risks data corruption. The XTIDE documentation recommends backing up and recreating partitions when moving from Beta 1 or older firmware if the reported geometry changes.


### Sources

- [XTIDE Universal BIOS Manual](https://www.xtideuniversalbios.org/browser/xtideuniversalbios/wiki/Manual_v2_0_0.wiki?rev=329) - documents BIOS builds for older CPUs and the logical CHS compatibility warning around Beta 2.
