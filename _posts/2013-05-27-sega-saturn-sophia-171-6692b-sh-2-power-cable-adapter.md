---
title: "Sega Saturn Sophia 171-6692B SH-2 Power Cable Adapter"
author: "Nix McRetro"
date: 2013-05-27T04:44:44.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, repairs, sega]
---

Any other console, I probably wouldn't bother mentioning this, but since it is Sophia, she gets a mention. My 171-6692B SH-2 CPU cards are not quite the same as the better-documented 171-6692D boards. Most importantly for this particular problem, they are missing the second power header used by the usual Sophia Programming Box arrangement.

![](/assets/images/2013/img_0403.jpg)

The 171-6692B boards do have another header available, but its pin pitch is 2.0 mm rather than the 2.54 mm pitch commonly found on PC-style connectors. So I made a short adapter cable to connect the Sophia's power lead to the available headers on these CPU boards. A little heatshrink around my fantastic solder job and she works a charm.

![](/assets/images/2013/img_0404.jpg)

![](/assets/images/2013/img_0405.jpg)

Visually, the differences between the 171-6692B and 171-6692D are easy to spot. The B revision lacks the second power header and the two jumper blocks normally seen beside the processors on the D revision.

In my 2 July 2013 Sophia notes, I described the branched EVA-board power cable on my unit. Since these 171-6692B boards do not provide the expected D-revision connector arrangement, this adapter became the practical solution for my particular hardware.

![](/assets/images/2013/img_0406.jpg)

More Sophia devkit photos can be found in the [Photo Gallery](/goodies).

### Related posts

- [Sega Saturn Sophia SH-2 CPU Cards: 171-6692B vs 171-6692D](/sega-saturn-sophia-sh-2-cpu-cards-171-6692b-vs-171-6692d/)
- [Sega Sophia Target Box PAL Switch Settings and Hardware Notes](/sega-sophia-target-box-pal-switch-settings-and-hardware-notes/)
