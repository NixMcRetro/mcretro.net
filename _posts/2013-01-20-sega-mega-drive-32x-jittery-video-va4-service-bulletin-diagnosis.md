---
title: "Sega Mega Drive 32X Jittery Video: VA4 Service Bulletin Diagnosis"
author: "Nix McRetro"
date: 2013-01-20T11:06:24.000+11:00
last_modified_at: 2026-10-05
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-05
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [repairs, sega, youtube]
---

{% include youtube.html id="Fz7UrdLMM1s" %}

This is another chapter in the ongoing saga of the Sega Mega Drive 32X on PAL hardware. For convenience, the original problem video is below as well.

{% include youtube.html id="xOgntz8Z0mk" %}

I had tested multiple 32X units and investigated grounding and other possibilities. Later, I found a documented explanation through [Assembler Games](https://web.archive.org/web/20191111135932/https://assemblergames.com/threads/sega-mega-32x-video-flickering-distortion.41947/). Sega's service bulletins identify EDCLK and VCLK problems on Model 1 VA4 Mega Drives used with the 32X.

The PAL VA4 EDCLK bulletin describes screen shaking, slowing game sound and lockups as the console warms up. That is an extremely good match for what I had been seeing, although the symptom match alone does not prove which fault was present on my board.

These VA4 service fixes modify the **Mega Drive motherboard**, not the 32X.

So the simplest alternative remains: don't use an affected VA4 Mega Drive with the 32X.

Entirely up to you!

For anyone who wants to repair an affected board, Sega's service bulletins and the illustrated guide are linked below.

### Related posts

- [Sega Mega Drive 32X Jittery Video: Initial Investigation](/sega-mega-drive-32x-jittery-video-initial-investigation/)
- [Sega Mega Drive 32X Distorted Video Part 2: Testing the Grounding Theory](/sega-mega-drive-32x-distorted-video-part-2-grounding-theory/)

### Sources

- [Sega - 32X Service Bulletins](https://consolemods.org/wiki/images/8/8b/Sega_32X_Service_Bulletins.pdf) - bulletin 008 covers the PAL VA4 EDCLK fault; bulletin 012 covers the VA4 VCLK lockup fault.
- [ConsoleMods - 32X Service Bulletin Fixes](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes) - illustrated guide to the documented service modifications.
