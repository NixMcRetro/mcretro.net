---
title: "Sega Mega Drive 32X Jittery Video: VA4 Service Bulletin Diagnosis"
author: "Nix McRetro"
date: 2013-01-20T11:06:24.000+11:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
---

{% include youtube.html id="Fz7UrdLMM1s" %}

Another chapter in the ongoing saga of the Sega Mega Drive 32X on PAL hardware. I'd noticed that Doom was developing a glitchy video problem: it would start out looking normal, but after a few minutes the picture would begin shifting around. As the machine warmed up, the backgrounds would jump about, the colours would change unexpectedly, and poor Doomguy's face wasn't having a good time either.

The interesting thing was that the Mega Drive-generated parts of the picture could remain relatively stable while the 32X graphics went all over the place. That had me wondering whether I was dealing with a faulty 32X, a video encoder problem, or perhaps something to do with grounding.

{% include youtube.html id="xOgntz8Z0mk" %}

The original problem video above shows the graphics shifting while other parts of the display look much steadier. It also shows how the problem becomes more noticeable as the machine runs.

I tried fitting the 32X's shielding clips and some of the other metalwork I'd neglected to install properly. Would that help? Of course not. That would have been far too easy! So I started swapping cartridges, 32X units, and Mega Drive Model 1 consoles to see which combinations behaved.

Some worked perfectly, others developed the fault almost immediately, and a few waited until they'd been running for a while. My Mega Drive 2 didn't seem to have the same problem, which was interesting. Every time I thought I'd narrowed it down, another combination behaved differently. At least Doom was getting a thorough workout!

**Update:** I later came across Sega's original 32X service bulletins through [ASSEMbler Games](https://web.archive.org/web/20191111135932/https://assemblergames.com/threads/sega-mega-32x-video-flickering-distortion.41947/). They describe EDCLK and VCLK problems affecting Model 1 VA4 Mega Drives when used with the 32X. The PAL VA4 EDCLK bulletin even mentions screen shaking, slowing game sound, and lockups as the console warms up. Hmm, that sounds rather familiar!

The fixes are made to the **Mega Drive motherboard**, rather than the 32X itself, which certainly changes where I'd start looking. The symptoms are a good match, although I hadn't isolated the exact fault on my particular board during these tests.

For anyone investigating the same problem, I've linked Sega's service bulletins and an illustrated guide below. Otherwise, avoiding an affected VA4 Mega Drive when using the 32X might save quite a bit of trouble.

**Related Posts**

- [Sega Mega Drive 32X Jittery Video: Initial Investigation](/sega-mega-drive-32x-jittery-video-initial-investigation/)
- [Sega Mega Drive 32X Distorted Video Part 2: Testing the Grounding Theory](/sega-mega-drive-32x-distorted-video-part-2-grounding-theory/)

**Sources**

- [Sega - 32X Service Bulletins](https://consolemods.org/wiki/images/8/8b/Sega_32X_Service_Bulletins.pdf) - bulletin 008 covers the PAL VA4 EDCLK fault; bulletin 012 covers the VA4 VCLK lockup fault.
- [ConsoleMods - 32X Service Bulletin Fixes](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes) - illustrated guide to the documented service modifications.
