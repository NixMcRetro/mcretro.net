---
title: "Sega Mega Drive 32X Bad Video"
author: "Nix McRetro"
date: 2012-09-12T11:46:32.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega]
---

{% include youtube.html id="xOgntz8Z0mk" %}

Picked up three 32X units off the internet that were sold as-is. Found that three of them all work to some degree. However, the jittering/distortion in the video above might be common to all four of the 32X units I own at the moment. I'm looking forward to testing this out more extensively when I find the time. One of the 32X units would not show any video at all. Gave it a clean out and it now works well. I have a video to upload with the details on what I did for that also - stay tuned!

In the past week, I have also received a Mega Drive 2 with Mega CD 2 unit - both were dead. The Mega CD is an easy fix. The pico fuse is broken, just like the Mega CD 1 unit I had. The Mega-CD 2's F301 fuse is rated at 2.5A, the same nominal current rating as the replacement I used in my earlier PAL Mega-CD 1 repair. The exact fuse type and board revision should still be checked rather than assuming the parts are identical. The CD deck seems to be working a charm.

The Mega Drive 2 that was coupled with it seemed to be dead at first. I noticed just today that it appeared that the unit did have some life left in it. Sure enough a dry broken joint on the DC-in power socket. Not the first time I've come across that! Gave it a quick resolder, looks like it might have been repaired in the past, and it roared to life with some Aleste. I managed to complete the first level before realising I had left the soldering iron on in the other room - whoops!

Stay tuned, we should have some more exciting things coming up in the next week as I try to repair the Mega Drive with video problems that I previously reported. Also, I need to upload some video of other things I was trying with those Saturns. Until next time, keep powering on everyone!

**Edit 2018-02-06:** Sega issued service bulletins covering 32X instability on PAL and Asian Mega Drive Model 1 VA4 boards. The documented problem is clock-signal quality on the host Mega Drive, particularly EDCLK and VCLK, rather than a generic fault in the PAL 32X itself. Sega's repair procedure modifies the Mega Drive motherboard. That provides a much better explanation for the jittering and distortion I was investigating here.


### Sources

- [ConsoleMods - 32X Service Bulletin Fixes](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes) - summarises Sega service bulletins for PAL and Asian VA4 Mega Drive clock-signal instability with 32X hardware.
