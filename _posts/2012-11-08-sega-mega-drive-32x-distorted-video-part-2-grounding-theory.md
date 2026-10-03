---
title: "Sega Mega Drive 32X Distorted Video Part 2: Testing the Grounding Theory"
author: "Nix McRetro"
date: 2012-11-08T19:54:26.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [repairs, sega, youtube]
---

{% include youtube.html id="ytwm3nfgSak" %}

Another clue in the ongoing 32X video mystery.

With the 32X installed, I can also see the distortion while using the Mega-CD, even though the Mega Drive by itself still looks normal. A YouTube commenter, specifically [patrikw25](https://www.youtube.com/user/patrikw25), suggested another possibility: the metal grounding plates supplied with the 32X.

Perhaps they really are required.

It is worth testing. If the plates solve the problem, they will save me from soldering approximately fifty billion capacitors.

At least temporarily.

In an update on 6 February 2018, I noted that the grounding plates had not been the underlying fault. Sega had already encountered this problem and issued service procedures for affected Mega Drive motherboards.

PAL and Asian Model 1 VA4 boards can have poor EDCLK and VCLK signal quality when paired with the 32X. In the EDCLK case, the signal can become increasingly unstable as the console warms up, causing the 32X-generated portion of the picture to jitter and eventually lock up. The important detail is that Sega's repair modifies the **Mega Drive motherboard**, not the 32X. That fits the pattern I had been seeing across several different 32X units far better than the grounding-plate theory.

### Related posts

- [Sega Mega Drive 32X Jittery Video: Initial Investigation](/sega-mega-drive-32x-jittery-video-initial-investigation/)
- [Sega Mega Drive 32X Jittery Video: VA4 Service Bulletin Diagnosis](/sega-mega-drive-32x-jittery-video-va4-service-bulletin-diagnosis/)

### Sources

- [Sega - 32X Service Bulletins](https://consolemods.org/wiki/images/8/8b/Sega_32X_Service_Bulletins.pdf) - includes the PAL VA4 EDCLK bulletin of 13 December 1994 and VA4 VCLK bulletin of 28 March 1995.
- [ConsoleMods - 32X Service Bulletin Fixes](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes) - summarises Sega service procedures for PAL and Asian VA4 Mega Drive clock-signal instability when used with 32X hardware.
