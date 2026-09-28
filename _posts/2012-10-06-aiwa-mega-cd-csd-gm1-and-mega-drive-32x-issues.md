---
title: "Aiwa Mega-CD CSD-GM1 and Mega Drive 32X Issues"
author: "Nix McRetro"
date: 2012-10-06T02:57:30.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega, youtube]
---

![](/assets/images/2012/img_0280.jpg)

Picked up two of these for quite a pretty penny, I don't mind though as restoration and preservation of all things old is the goal. This one is the worse of the two units that were picked up, it had no power. Naturally I disassembled the unit and found some rather severe damage to the internal PCBs. There are two really big cracks in the PCB. No biggie right? The other boards in the unit also appear to be damaged though so the first task is to see if it can power on at all.

I have found the functional unit seems to have issues with the video flickering horizontally and the sound is terrible from the Aiwa and very quiet when running through the AV cable to my TVs. It reminds me of bad capacitors on my Game Gears. Perhaps that should be the first avenue I head down for the more functional of the two.

{% include youtube.html id="xOgntz8Z0mk" %}

Additionally I have found that 32X units seem to have issues with Model 1 Mega Drives causing the video to flicker. At the time I wondered whether this might be another bad-capacitor problem. One Mega Drive does not show the issue, and at first I thought it might have been a serial-range issue. Tested on a release-day PAL Mega Drive and the flickering happened nearly instantly on all the 32X units. Mega Drive Model 2 units do not seem to be affected. Testing several different 32X units against the same affected Mega Drive was an important clue: the common factor was increasingly looking like the host console rather than all of the 32X units independently having the same fault. Sega later documented PAL and Asian Mega Drive Model 1 VA4 clock-signal problems involving EDCLK and VCLK that can cause 32X video jitter and lockups, with the factory repair modifying the Mega Drive motherboard. I've also fired up a thread on [ASSEMblergames](https://web.archive.org/web/20191111135932/https://assemblergames.com/threads/sega-mega-32x-video-flickering-distortion.41947/) for those interested in discussing.


### Sources

- [ConsoleMods - 32X Service Bulletin Fixes](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes) - summarises Sega service bulletins for PAL and Asian VA4 Mega Drive clock-signal instability when used with 32X hardware.
