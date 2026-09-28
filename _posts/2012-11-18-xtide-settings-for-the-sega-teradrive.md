---
title: "XTIDE Settings for the Sega TeraDrive"
author: "Nix McRetro"
date: 2012-11-18T01:38:18.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="6UJEjvZq9a0" %}

Here is a video of the XTIDE settings that seem to be best for the Sega TeraDrive. Please note I have used a slightly less than current version 2.0.0b1 instead of 2.0.0b2. As long as it works I do not feel the urge to upgrade just yet... Maybe once it is not a beta I will. The EEPROM BIOS dump for the TeraDrive can be found on the [File Server](/goodies/).

A terminology trap worth clearing up: the modern XTIDE project used here is not the same thing as the historical XTA, or XT Attachment, disk interface. XTIDE provides an 8-bit ISA route to ATA devices, while XTA was an older and incompatible storage interface that happened to acquire the nickname "XT-IDE" in some historical documentation. Sticking with the working Beta 1 configuration also avoided changing disk geometry underneath an already-working installation. Later XTIDE releases changed logical CHS handling, so firmware upgrades on an existing disk need to be approached carefully.


### Sources

- [XTIDE Universal BIOS Manual](https://www.xtideuniversalbios.org/browser/xtideuniversalbios/wiki/Manual_v2_0_0.wiki?rev=329) - documents XTIDE BIOS configuration and logical CHS compatibility considerations.
- [Nerdly Pleasures - The Original 8-bit IDE Interface](https://nerdlypleasures.blogspot.com/2014/04/the-original-8-bit-ide-interface.html) - distinguishes the historical XTA interface from the modern XTIDE project.
