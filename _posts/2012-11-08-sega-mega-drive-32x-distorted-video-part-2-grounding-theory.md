---
title: "Sega Mega Drive 32X Distorted Video Part 2: Testing the Grounding Theory"
author: "Nix McRetro"
date: 2012-11-08T19:54:26.000+11:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
---


{% include youtube.html id="ytwm3nfgSak" %}

Another clue in the ongoing Mega Drive 32X video mystery! I was enjoying a little Mega-CD karaoke with some Shonen Knife when I noticed black flickering lines coming in from the side of the picture. Hang on a minute. That looks suspiciously familiar!

The interesting thing is that the Mega-CD is producing the picture, but the signal is still passing through the attached 32X. I switched over to *Doom* and, sure enough, the graphics were behaving like a hunk of junk again. This got me wondering whether something in the Mega Drive itself might be contributing to the problem, even though the picture looks normal when I'm not using the 32X.

Time for another experiment. I disconnected the 32X, which naturally involved removing approximately fifteen cables, and ran the Mega-CD without it. The picture was steady again, with none of the flickering I'd been seeing through the 32X. Interesting! That doesn't tell me exactly which component is at fault, but it does give me another useful comparison.

A YouTube commenter, [patrikw25](https://www.youtube.com/user/patrikw25), also suggested the metal grounding plates supplied with the 32X might be important. Perhaps they really are required, and it's certainly worth investigating. If they solve the problem, I'll be spared the delightful task of soldering approximately fifty billion capacitors. At least for now!

I've noticed that some Mega Drives seem to develop the problem faster than others, so there's more testing to do. The machine in this video had been running for roughly an hour before I noticed the interference. Why do you cause me so much trouble, 32X?

**Update 6th February 2018:** The grounding plates weren't the underlying fault. I later discovered Sega's original service bulletins covering PAL and Asian Model 1 VA4 Mega Drives with unstable EDCLK and VCLK signals when used with the 32X.

The EDCLK issue can become more noticeable as the machine warms up, making 32X-generated graphics jitter and eventually causing lockups. The important discovery was that Sega's repair modifies the **Mega Drive motherboard**, not the 32X itself. That explains the behaviour I was seeing across different 32X units far better than my earlier grounding-plate theory.

### Sources

- [Sega: 32X Service Bulletins (VA4 EDCLK 1994, VCLK 1995)](https://consolemods.org/wiki/images/8/8b/Sega_32X_Service_Bulletins.pdf)
- [ConsoleMods: 32X Service Bulletin Fixes (PAL/Asian VA4)](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes)

### Related Posts

- [Sega Mega Drive 32X Jittery Video: Initial Investigation](/sega-mega-drive-32x-jittery-video-initial-investigation/)
- [Sega Mega Drive 32X Jittery Video: VA4 Service Bulletin Diagnosis](/sega-mega-drive-32x-jittery-video-va4-service-bulletin-diagnosis/)
