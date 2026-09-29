---
title: "Aiwa Mega-CD CSD-GM1 and Mega Drive 32X Issues"
author: "Nix McRetro"
date: 2012-10-06T02:57:30.000+10:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega, youtube]
---

![](/assets/images/2012/img_0280.jpg)

### Aiwa Mega-CD CSD-GM1

I picked up two Aiwa CSD-GM1 units for quite a pretty penny.

I don't mind though. Restoration and preservation of all things old is the goal.

The machine pictured above is the worse of the two. It had no power at all, so naturally I pulled it apart.

The damage inside is fairly spectacular. There are two large cracks through one PCB, and several other boards also appear to have suffered damage.

The first job is simply finding out whether I can make the thing power on again.

The other CSD-GM1 is considerably more functional, but it has horizontal video flicker and awful sound from the Aiwa itself. Audio through the AV connection is also very quiet.

Those symptoms reminded me of the capacitor problems I'd already encountered in Game Gears, so capacitors seemed like an obvious avenue to investigate.

They were only a suspect at this stage though.

This ended up becoming a much larger repair project involving multiple boards, power problems, the CD mechanism and audio circuitry rather than one simple "replace the capacitors" fix.

### Mega Drive 32X video problems

{% include youtube.html id="xOgntz8Z0mk" %}

I was also still chasing the strange 32X flickering problem on my Model 1 Mega Drives.

At the time I wondered whether this was another capacitor problem or perhaps something related to a particular production range.

Testing several completely different 32X units against the same affected Mega Drive was the important clue: the common factor was increasingly looking like the host console.

Sega later documented exactly this type of problem on PAL and Asian Model 1 VA4 boards.

The factory service bulletins identify poor EDCLK and VCLK signal quality in the Mega Drive itself. As affected hardware warms up, the 32X-generated part of the picture can begin to jitter and the system may eventually lock up.

Sega's repair modifies the Mega Drive motherboard, not the 32X.

That fits what I was seeing considerably better than my original capacitor theory.

I've also started a thread on the archived [ASSEMblergames forum](https://web.archive.org/web/20191111135932/https://assemblergames.com/threads/sega-mega-32x-video-flickering-distortion.41947/) for anyone interested in the investigation.

### Related posts

- [Aiwa Sega Mega-CD CSD-GM1 Initial Damage Report](/aiwa-sega-mega-cd-csd-gm1-initial-damage-report/)
- [Sega Mega Drive 32X Jittery Video: Initial Investigation](/sega-mega-drive-32x-jittery-video-initial-investigation/)

### Sources

- [ConsoleMods - 32X Service Bulletin Fixes](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes) - summarises Sega service bulletins for PAL and Asian VA4 Mega Drive clock-signal instability when used with 32X hardware.
