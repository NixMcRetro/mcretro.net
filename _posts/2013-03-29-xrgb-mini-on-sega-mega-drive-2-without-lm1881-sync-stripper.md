---
title: "XRGB-mini on Sega Mega Drive 2 Without an LM1881 Sync Stripper"
author: "Nix McRetro"
date: 2013-03-29T00:52:36.000+11:00
last_modified_at: 2026-10-05
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-05
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, sega]
---

{% include youtube.html id="9_ALl1W0Mbg" %}

Interesting result from the Mega Drive 2 and Framemeister experiments. With this particular cable setup, everything works beautifully once the LM1881N sync stripper is removed. Leave the LM1881 in place and the XRGB-mini really does not seem happy.

That does **not** mean the Framemeister universally dislikes sync strippers. The Mega Drive 2 can provide a native composite-sync signal with a correctly wired cable. An LM1881 is normally useful when you need to separate sync from composite video, so adding another sync-separation stage where one is not required can simply make the signal path more complicated. Different consoles, cable wiring and sync sources can behave differently.

The useful result here is much narrower: **this Mega Drive 2, with this cable and this Framemeister setup, works better without the LM1881.**

This particular cable came from [Retro Gaming Cables](https://www.retrogamingcables.co.uk/). There will be more to come on this. I still have SCART cables lying around in pieces everywhere!

### Related posts

- [Micomsoft XRGB-mini Framemeister Arrival](/micomsoft-xrgb-mini-framemeister-arrival/)
- [Converting XRGB-mini Adapter to EuroSCART](/converting-xrgb-mini-adapter-to-euroscart/)

### Sources

- [Texas Instruments - LM1881 Video Sync Separator](https://www.ti.com/product/LM1881) - manufacturer description of extracting sync signals from composite video.
- [Retro Gaming Cables - CSYNC RGB SCART cables](https://www.retrogamingcables.co.uk/CSYNC-RGB-SCART-CABLES) - specialist reference explaining native composite sync and sync separation in retro-console RGB cabling.
- [Classic Console Upscaler Wiki - XRGB-mini Framemeister](https://www.junkerhq.net/xrgb/index.php/XRGB-mini_FRAMEMEISTER) - specialist Framemeister setup and compatibility reference.
