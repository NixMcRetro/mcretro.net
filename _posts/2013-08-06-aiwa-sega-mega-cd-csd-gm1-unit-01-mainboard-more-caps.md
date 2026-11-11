---
title: "Aiwa Sega Mega-CD CSD-GM1 Unit-01 Mainboard: More Capacitors"
author: "Nix McRetro"
date: 2013-08-06T15:29:07.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
share_description: >-
  Another recap of the Aiwa CSD-GM1 revision 1 board reveals a mislabeled replacement capacitor. Always read the markings, even when the parts look identical. 🔧
---

{% include youtube.html id="9pupCizxXtE" %}

Another weekend, another chance to work on the Aiwa Mega-CD CSD-GM1. This time I'm back on the revision 1 mainboard, marked 01-01, replacing a few more capacitors. I've decided to use 16 V-rated replacements for some of the original 10 V parts, since there are several different supply voltages running around this thing and I'd rather give myself a little more room to breathe.

I've got a mixture of 470 uF, 220 uF and 100 uF capacitors to change, and most of the work has been going fairly smoothly. Then I noticed something rather odd while comparing the replacement parts with my reference board and spreadsheet.

One capacitor looked just like the others from above, but it was marked 47 uF at 50 V. That's a bit different from the 220 uF capacitor that was supposed to be there! It looks like Element14 shipped me the wrong value, and I hadn't noticed because the physical size was so similar. Lesson learned: check the actual markings, even when the parts come from a major supplier!

Fortunately, I had the correct 220 uF replacement available, so that went in instead. Whether the incorrectly supplied component had caused any problems during my earlier testing, I don't know. The board had appeared to be working reasonably well, but I'll certainly be checking my capacitor orders a bit more carefully from now on.

The mainboard is now recapped apart from one small capacitor I forgot to order. I've also got some transistor and voltage-regulator work coming up once the remaining parts arrive. There's still plenty to do before I can call either of these Aiwas properly repaired!

### Sources

- [Nichicon - Aluminum Electrolytic Capacitor Technical Notes](https://www.nichicon.co.jp/english/products/pdf/aluminum-e.pdf)

### Related Posts

- [Aiwa Sega Mega-CD CSD-GM1 01-01 Mainboard (Part 1: Capacitor Replacement)](/aiwa-sega-mega-cd-csd-gm1-01-01-mainboard-part-1-capacitor-replacement/)
- [Aiwa Mega-CD CSD-GM1 Capacitor Values](/aiwa-mega-cd-csd-gm1-capacitor-values/)
