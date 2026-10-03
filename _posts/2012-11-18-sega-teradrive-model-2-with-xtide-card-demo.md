---
title: "Sega TeraDrive Model 2 with XTIDE Card Demo"
author: "Nix McRetro"
date: 2012-11-18T01:48:27.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="LG6YAiZeu3U" %}

This is the quick wrap-up of all the other TeraDrive XTIDE videos, so you don't have to sit through eight hours of me discovering the same thing the slow way.

Mission accomplished!

![](/assets/images/2012/img_0356.jpg)

Above is XTIDE Universal BIOS 2.0.0 Beta 1 running the XT build and giving me the boot menu on the TeraDrive Model 2.

![](/assets/images/2012/img_0357.jpg)

And here is the XTIDE card itself with the TopSSD Disk on Module installed.

There are plenty of variations on the basic XTIDE idea, with different board sizes, connector arrangements and quantities of blinking LEDs.

This one works.

That is presently my favourite feature.

![](/assets/images/2012/img_0358.jpg)

Finally, XTIDECFG programming the onboard EEPROM. The screen shows `ide_at.bin`, version 2.0.0 Beta 2, dated 19 September 2012.

One important detail I did not know at the time: XTIDE Universal BIOS 2.0.0 Beta 2 changed the logical CHS behaviour used by Beta 1 and older releases. Upgrading an already partitioned drive can change the geometry presented to DOS and risk data corruption. The later project documentation calls for recreating and formatting the affected partitions after upgrading.

### Related posts

- [XTIDE Settings for the Sega TeraDrive](/xtide-settings-for-the-sega-teradrive/)
- [Sega TeraDrive Model 2 XTIDE Boot Success](/sega-teradrive-model-2-xtide-boot-success/)

### Sources

- [XTIDE Universal BIOS - project documentation](https://www.xtideuniversalbios.org/) - documents the BIOS builds and the later logical CHS compatibility warning when upgrading from Beta 1 or older releases to Beta 2 or later.
