---
title: "Sega TeraDrive Model 2 with XTIDE Card Demo"
author: "Nix McRetro"
date: 2012-11-18T01:48:27.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
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

Finally, XTIDECFG programming the onboard EEPROM.

At the time I was looking at moving from Beta 1 to Beta 2 because newer obviously means better, right?

There is an important catch.

XTIDE Universal BIOS 2.0.0 Beta 2 changed the logical CHS geometry behaviour used by Beta 1 and older releases.

Upgrading an already partitioned drive can therefore change the disk geometry presented to DOS and potentially corrupt the existing filesystem.

The XTIDE documentation recommends recreating the partitions after moving from Beta 1 or an older release where the reported geometry changes.

So, somewhat accidentally, sticking with the configuration that already worked was a very sensible choice.

### Related posts

- [XTIDE Settings for the Sega TeraDrive](/xtide-settings-for-the-sega-teradrive/)
- [Sega TeraDrive Model 2 XTIDE Boot Success](/sega-teradrive-model-2-xtide-boot-success/)

### Sources

- [XTIDE Universal BIOS Manual](https://www.xtideuniversalbios.org/browser/xtideuniversalbios/wiki/Manual_v2_0_0.wiki?rev=329) - documents BIOS builds for older CPUs and the logical CHS compatibility warning around Beta 2.
