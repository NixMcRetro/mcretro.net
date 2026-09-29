---
title: "Sega Saturn Sophia SH-2 CPU Cards: 171-6692B vs 171-6692D"
author: "Nix McRetro"
date: 2013-03-30T00:57:06.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, repairs, sega]
---

{% include youtube.html id="JZEb9LceRBs" %}

You heard correctly.

These are **171-6692B** SH-2 CPU boards, not the better-documented 171-6692D.

![](/assets/images/2013/img_0382.jpg)

The boards use SH7095 SH-2 processors, but there are some obvious physical differences compared with the 171-6692D boards I had been expecting.

Most noticeably, these 171-6692B boards lack the second power header and the two jumper blocks normally visible beside the processors on the 171-6692D.

Sega's surviving Saturn development documentation specifically identifies the 171-6692D as an SH-2 CPU board for the Programming Target Box.

It does not, unfortunately, explain the exact relationship between the B and D revisions.

Initial testing with these boards was not particularly successful.

That did not necessarily mean the CPU boards themselves were faulty, because the Sophia still had unresolved mainboard problems at this point. I later found that replacing capacitors on the Sophia mainboard dramatically improved the system's health.

So I am not going to claim that the 171-6692B and 171-6692D are electrically identical simply because they look closely related and fit the same system.

Another interesting little Sophia mystery for the list.

### Related posts

- [Sega Saturn Sophia Programming Box Mainboard Repairs](/sega-saturn-sophia-programming-box-mainboard-repairs/)
- [Sophia Systems Sega Saturn Programming Box: Final Repairs](/sophia-systems-sega-saturn-programming-box-final-repairs/)
- [Sega Sophia Target Box - Factory Settings for PAL](/sega-sophia-target-box-factory-settings-for-pal/)

### Sources

- [Sega DTS Archive - Saturn Programming Box](https://docs.exodusemulator.com/Archives/SegaDTSMirror/hardware/core/PBOX.HTM) - surviving Sega development documentation identifying the 171-6692D SH-2 CPU board and target-box processor configuration.
