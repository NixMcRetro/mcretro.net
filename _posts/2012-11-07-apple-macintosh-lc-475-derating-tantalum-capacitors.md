---
title: "Apple Macintosh LC 475 - Derating Tantalum Capacitors"
author: "Nix McRetro"
date: 2012-11-07T06:32:07.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [apple, repairs, youtube]
---

{% include youtube.html id="zOi3xcUsYgc" %}

Voltage derating is particularly important when substituting traditional solid tantalum capacitors into older equipment. A long-standing rule of thumb for conventional solid tantalums has been to operate them at no more than about 50% of their rated voltage. That rule should not simply be transferred to aluminium electrolytics, and modern tantalum technologies can have different manufacturer recommendations. Applied voltage, surge current, temperature, series resistance and capacitor construction can all affect tantalum reliability. Voltage derating is one important way of reducing stress.

So how do we do it? Look at the graph below for which voltage would be best for you. For the conventional solid tantalums I was considering here, 50% was a conservative traditional rule of thumb. The correct derating should ultimately follow the datasheet for the exact capacitor series. I've been looking at capacitors and choosing a higher rated voltage to give the part plenty of headroom. Polymer tantalums weren't really viable for me at this point due to their even higher cost than regular tantalum caps.

![](/assets/images/2012/img_0354.jpg)

The graph I was using came via Digi-Key, but Digi-Key is the distributor rather than the capacitor manufacturer. Manufacturer guidance from KYOCERA AVX explains the historical 50% derating rule for conventional solid tantalums and also notes that the correct recommendation depends on the capacitor technology and series.


### Sources

- [KYOCERA AVX - Voltage Derating Rules for Solid Tantalum and Niobium Capacitors](https://www.kyocera-avx.com/news/voltage-derating-rules-for-solid-tantalum-and-niobium-capacitors/) - explains the traditional 50% derating rule and why modern recommendations depend on capacitor construction and series.
- [MacDat - Macintosh LC 475 capacitor reference](https://www.macdat.net/repair/cap_reference/apple/lc/lc475.php) - documents original LC 475 logic-board capacitor values and ratings.
