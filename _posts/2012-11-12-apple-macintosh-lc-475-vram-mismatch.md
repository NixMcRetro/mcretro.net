---
title: "Apple Macintosh LC 475 VRAM Mismatch"
author: "Nix McRetro"
date: 2012-11-12T21:09:50.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [apple, hacks, repairs]
---

{% include youtube.html id="0mDyQ1gm8MU" %}

Ever wonder what happens when you pair a 256KB VRAM chip with a 512KB VRAM chip? They say it should never be done... and they have a good reason for it not to be done. It makes the display look like junk! Lines running everywhere, the display doesn't update well and remove the mouse cursor trails. Interestingly it was not a complete failure as it did actually function - which I wasn't expecting. Apple's specification confirms why this went so badly. The LC 475 uses its VRAM SIMMs as a matched pair: either two 256KB modules for 512KB total or two 512KB modules for 1MB total. Mixing one 256KB and one 512KB SIMM is outside the supported configuration.

Also swapped in the replacement power supply I ordered from the US a few weeks back. TDK makes a great power supply. The switch feels very solid and this particular power supply, going off the date code of 1993, likely came out of an LC III. Kudos to the LC III who donated this PSU to me as it works fantastic and has no rust all over it.


### Sources

- [Apple - Macintosh LC 475 Technical Specifications](https://support.apple.com/en-ca/112204) - documents the supported matched VRAM configurations for the LC 475.
