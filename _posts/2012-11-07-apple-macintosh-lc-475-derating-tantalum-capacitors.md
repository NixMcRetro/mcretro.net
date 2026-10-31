---
title: "Apple Macintosh LC 475: Derating Tantalum Capacitors"
author: "Nix McRetro"
date: 2012-11-07T06:32:07.000+11:00
last_modified_at: 2026-10-18
categories: [apple, repairs, youtube]
---

{% include youtube.html id="zOi3xcUsYgc" %}

Voltage derating is particularly important when substituting traditional solid tantalum capacitors into older equipment. A long-standing rule of thumb for conventional solid tantalums has been to operate them at no more than about 50% of their rated voltage.

That rule should not simply be transferred to aluminium electrolytics, and modern tantalum technologies can have different manufacturer recommendations. Applied voltage, surge current, temperature, series resistance and capacitor construction can all affect tantalum reliability. Voltage derating is one important way of reducing stress.

The LC 475 gave me a practical reason to think about all this. I counted nine 47 uF, 16 V electrolytics and two 100 uF, 6 V parts on the board, then held sample tantalums against the originals to compare the smaller case C with case D. The larger package looked as though it would fit, which mattered if I was going to choose higher voltage ratings.

So how do we do it? Look at the table below for which voltage would be best for you. For the conventional solid tantalums I was considering here, 50% was a conservative traditional rule of thumb. The correct derating should ultimately follow the datasheet for the exact capacitor series.

I've been looking at capacitors and choosing a higher rated voltage to give the part plenty of headroom. Polymer tantalums weren't really viable for me at this point due to their even higher cost than regular tantalum caps.

![](/assets/images/2012/img_0354.jpg)

In the video I also measured a position using a 6 V capacitor on a 5 V rail. That was rather close to the part's rated voltage, and exactly the sort of thing I wanted to think through before ordering replacements. This was the planning and measuring stage, not a demonstration of a completed LC 475 recap.

The table I was using came from KEMET's 2011 training module, hosted by Digi-Key. Manufacturer guidance from KYOCERA AVX also explains the historical 50% derating rule for conventional solid tantalums and notes that the correct recommendation depends on the capacitor technology and series.

### Sources

- [KEMET - Derating Guidelines for Surface Mount Tantalum Capacitors](https://www.digikey.com/en/ptm/k/kemet/derating-guidelines-for-surface-mount-tantalum-capacitors) - the 2011 training module hosted by Digi-Key; slide 19 contains the application-voltage table reproduced above.
- [AVX - Voltage Derating Rules for Solid Tantalum and Niobium Capacitors](https://www.kyocera-avx.com/docs/techinfo/Tantalum-NiobiumCapacitors/voltaged.pdf) - the 2003 technical paper explains the traditional 50% derating rule and why the application, capacitor construction and series matter.
- [MacDat - Macintosh LC 475 capacitor reference](https://www.macdat.net/repair/cap_reference/apple/lc/lc475.php) - documents original LC 475 logic-board capacitor values and ratings.
