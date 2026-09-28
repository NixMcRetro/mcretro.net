---
title: "Sega Mega Drive 32X / Mega-CD Distorted Video (Part 2)"
author: "Nix McRetro"
date: 2012-11-08T19:54:26.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega, youtube]
---

{% include youtube.html id="ytwm3nfgSak" %}

Noted that the video distortion also happens on the Mega-CD side of things, but still not on the actual Mega Drive itself. A YouTuber, specifically [patrikw25](https://www.youtube.com/user/patrikw25), gave me an idea. The grounding plates for the Mega Drive 32X... Perhaps they are actually required... It will be an interesting test and if it works, will definitely save me soldering 50-billion capacitors - if only for the short term.

**Edit 2018-02-06:** Turns out the grounding plates were not the underlying issue. Sega issued service bulletins for PAL and Asian Mega Drive Model 1 VA4 boards documenting unstable EDCLK and VCLK signals when used with a 32X. As affected consoles warm up, the clock signal can become unstable and cause 32X-rendered video to jitter or eventually lock up. Sega's repair modifies the host Mega Drive motherboard rather than the 32X.


### Sources

- [ConsoleMods - 32X Service Bulletin Fixes](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes) - summarises Sega service bulletins for PAL and Asian VA4 Mega Drive clock-signal instability with 32X hardware.
