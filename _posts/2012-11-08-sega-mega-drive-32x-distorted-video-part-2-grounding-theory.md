---
title: "Sega Mega Drive 32X Distorted Video Part 2: Testing the Grounding Theory"
author: "Nix McRetro"
date: 2012-11-08T19:54:26.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega, youtube]
---

{% include youtube.html id="ytwm3nfgSak" %}

Another clue in the ongoing 32X video mystery.

With the 32X installed, I can also see the distortion while using the Mega-CD, even though the Mega Drive by itself still looks normal.

A YouTube commenter, specifically [patrikw25](https://www.youtube.com/user/patrikw25), suggested another possibility: the metal grounding plates supplied with the 32X.

Perhaps they really are required.

It is worth testing. If the plates solve the problem, they will save me from soldering approximately fifty billion capacitors.

At least temporarily.

The grounding plates ultimately turned out not to be the underlying fault.

Sega had already encountered this problem and issued service procedures for affected Mega Drive motherboards.

PAL and Asian Model 1 VA4 boards can have poor EDCLK and VCLK signal quality when paired with the 32X. In the EDCLK case, the signal can become increasingly unstable as the console warms up, causing the 32X-generated portion of the picture to jitter and eventually lock up.

The important detail is that Sega's repair modifies the **Mega Drive motherboard**, not the 32X.

That fits the pattern I had been seeing across several different 32X units far better than the grounding-plate theory.

### Related posts

- [Sega Mega Drive 32X Jittery Video: Initial Investigation](/sega-mega-drive-32x-jittery-video-initial-investigation/)
- [Sega Mega Drive 32X with Jittery Distorted Video](/sega-mega-drive-32x-with-jittery-distorted-video/)

### Sources

- [ConsoleMods - 32X Service Bulletin Fixes](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes) - summarises Sega service procedures for PAL and Asian VA4 Mega Drive clock-signal instability when used with 32X hardware.
