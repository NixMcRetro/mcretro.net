---
title: "Pioneer LaserActive PAC-S1 EPROM BIOS Dump"
author: "Nix McRetro"
date: 2014-05-04T19:45:19.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [programming, sega, youtube]
---

{% include youtube.html id="TdQUt0x3RHw" %}

A quick attempt at dumping the BIOS EPROM from the Pioneer LaserActive PAC-S1.

The dump itself exposed some odd behaviour from my GQ-4X programmer, so the programmer needed more investigation before I could fully trust the result.

The chip has a sticker over the erase window marked `PIONEER PD6126E`. Underneath is a Fujitsu `MBM27C1024A-12Z`, dated to week 28 of 1993.

The MBM27C1024A is a 1 Mbit UV-erasable EPROM in a 40-pin package.

### Related posts

- [Pioneer LaserActive Sega PAC-S1 Disassembly](/pioneer-laseractive-sega-pac-s1-disassembly/)
- [Pioneer LaserActive Sega PAC-S1 Mainboard Capacitor Removal](/pioneer-laseractive-sega-pac-s1-mainboard-capacitor-removal/)
- [Pioneer LaserActive Sega PAC-S1 Subboard Capacitor Removal](/pioneer-laseractive-sega-pac-s1-subboard-capacitor-removal/)

### Sources

- [Fujitsu MBM27C1024A datasheet archive](https://www.datasheetarchive.com/?q=MBM27C1024A)
