---
title: "Sega Mega Drive 32X Jittery Video: VA4 Service Bulletin Diagnosis"
author: "Nix McRetro"
date: 2013-01-20T11:06:24.000+11:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
---

{% include youtube.html id="Fz7UrdLMM1s" %}

This is another chapter in the ongoing saga of the Sega Mega Drive 32X on PAL hardware. For convenience, the original problem video is below as well.

I'd noticed that Doom on the 32X had developed a glitchy looking video problem. The game would start out looking normal, but after the system had been running for a few minutes, the picture would begin shifting around.

Sometimes it would get much worse as the machine warmed up. The backgrounds would jump about, colours would change unexpectedly, and poor Doomguy's face wasn't having a good time either.

The interesting thing was that the Mega Drive-generated portions of the picture could remain relatively stable while the 32X graphics went all over the place. That initially had me wondering whether I was dealing with a faulty 32X, a video encoder, or perhaps a grounding problem.

I thought I'd try the 32X's shielding clips and some of the other metalwork I'd neglected to fit properly. Would that help Of course not. That would have been far too easy!

Then came the cartridge-swapping extravaganza. Different 32X units, different Mega Drive Model 1 consoles, and several combinations of the two. Some combinations appeared fine, others developed the fault almost immediately, and a few waited a while before acting up.

I also noticed that my Mega Drive 2 didn't seem to exhibit the same behaviour. Very interesting. Every time I thought I'd narrowed it down, another combination behaved differently. At least Doom was getting a thorough workout.

{% include youtube.html id="xOgntz8Z0mk" %}

This is the initial demonstration of the fault. Notice how the game graphics shift while other parts of the display appear much steadier. The problem gets progressively worse as the system runs.

**Update:** I later found a documented explanation through [ASSEMbler Games](https://web.archive.org/web/20191111135932/https://assemblergames.com/threads/sega-mega-32x-video-flickering-distortion.41947/). Sega's service bulletins identify EDCLK and VCLK problems on Model 1 VA4 Mega Drives used with the 32X.

The PAL VA4 EDCLK bulletin describes screen shaking, slowing game sound, and lockups as the console warms up. That's an extremely good match for what I'd been seeing, although matching symptoms alone doesn't prove which specific fault was present on my board.

These VA4 service fixes modify the **Mega Drive motherboard**, not the 32X. That distinction is worth remembering before blaming every 32X in the house. So the simplest alternative remains: don't use an affected VA4 Mega Drive with the 32X. Entirely up to you!

For anyone who wants to investigate an affected motherboard properly, Sega's original bulletins and an illustrated explanation are linked below.

### Related Posts

- [Sega Mega Drive 32X Jittery Video: Initial Investigation](/sega-mega-drive-32x-jittery-video-initial-investigation/)
- [Sega Mega Drive 32X Distorted Video Part 2: Testing the Grounding Theory](/sega-mega-drive-32x-distorted-video-part-2-grounding-theory/)

### Sources

- [Sega - 32X Service Bulletins](https://consolemods.org/wiki/images/8/8b/Sega_32X_Service_Bulletins.pdf) - bulletin 008 covers the PAL VA4 EDCLK fault; bulletin 012 covers the VA4 VCLK lockup fault.
- [ConsoleMods - 32X Service Bulletin Fixes](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes) - illustrated guide to the documented service modifications.
