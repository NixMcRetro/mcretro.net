---
title: "Reducing the Vertical Bar / Band on the SNES"
author: "Nix McRetro"
date: 2013-10-24T18:08:23.000+11:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="TGVn9sRoV-g" %}

The vertical bar on this SNES did not bother me too much while I was playing as Ness in EarthBound. Then I discovered how much it could be reduced. Two 220 uF capacitors rated at 16 V and we were cooking with gas! I fitted one between the 7805 voltage regulator's output and ground, and the other between the S-ENC A video encoder's supply and ground. That gave a very noticeable improvement on this console.

Regrettably, I also found the consequences of inserting a SNES cart backward... and what it meant for over 15 hours of battles and saving... Thanks to MaxWar for the help!

### Sources

- [MaxWar - SNES vertical bar: Quick and easy fix.](https://web.archive.org/web/20191111103253/https://assemblergames.com/threads/snes-vertical-bar-quick-and-easy-fix.48413/)
