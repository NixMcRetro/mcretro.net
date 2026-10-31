---
title: "Sega Mega Drive 32X Jittery Video: Initial Investigation"
author: "Nix McRetro"
date: 2012-09-12T11:46:32.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega]
---

{% include youtube.html id="xOgntz8Z0mk" %}

I picked up three Sega Mega Drive 32X units from the internet, all sold as-is. Surprisingly, all three work to some degree, although I've been getting some rather unpleasant video problems. One of them originally produced no picture at all, but a good clean managed to bring it back to life. I'll upload a separate repair video covering that one.

The problem in the video above is a little more interesting. *Doom* starts up with a perfectly steady menu, but once the game begins, the graphics start shifting backwards and forwards across the screen. It doesn't happen immediately either. Things get worse after the hardware has been running for a while, and occasionally the colour drops out on the CRT.

At first I wondered whether something inside the 32X itself was failing. Then again, with several units showing trouble, perhaps I ought to be looking somewhere else in the setup. VDP, VDU, whatever it wants to call itself, something isn't having a very good time. How am I supposed to shoot anything when the entire screen is jumping around? I even miss that terrible *Doom* music when the machine isn't behaving.

In other repair news, I've received a Mega Drive 2 and Mega-CD 2 combination, both sold as dead. The Mega-CD looks like a relatively easy repair because its F301 fuse has failed, much like the problem I encountered on a Mega-CD Model 1. The nominal rating is 2.5 A, although the correct fuse type still depends on the actual board revision. Happily, the CD mechanism itself seems to be in excellent shape.

The Mega Drive 2 appeared completely dead at first, but eventually I noticed signs of life. Sure enough, another cracked solder joint on the DC-in socket! A quick resolder and it roared back into action with some Aleste. I even managed to finish the first level before remembering I'd left the soldering iron switched on in the other room. Whoops!

There's still plenty to investigate with these 32X units. If anyone has an idea about the jittering graphics, particularly why they get worse as the machine warms up, I'd be interested to hear it. Until next time, keep powering on everyone!

**Update 6th February 2018:** I later learned that Sega had already documented a compatibility fault affecting PAL and Asian Model 1 VA4 Mega Drives used with the 32X in its 1994 and 1995 service bulletins. Poor EDCLK and VCLK signal quality on the host Mega Drive can cause 32X-rendered graphics to jitter, sound to slow down or the game to lock up as the hardware warms. In other words, the 32X itself was not necessarily the problem. Sega's service procedure modifies the Mega Drive motherboard. That fits the warm-up behaviour I was seeing considerably better than the theories I was working through at the time.

### Related posts

- [Sega Mega Drive 32X Repair: No Display, No Sound](/sega-mega-drive-32x-repair-no-display-no-sound/)
- [Sega Mega Drive 32X Jittery Video: VA4 Service Bulletin Diagnosis](/sega-mega-drive-32x-jittery-video-va4-service-bulletin-diagnosis/)

### Sources

- [ConsoleMods - 32X Service Bulletin Fixes](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes) - summarises Sega service bulletins for PAL and Asian VA4 Mega Drive clock-signal instability with 32X hardware.

- [Sega - Service Bulletin 008: Mega Drive 1 VA4 PAL, 13th December 1994](https://drive.google.com/file/d/1gUPVeXch-TWNjwld4bYFWFZG23_RJ9Be/view) - documents the EDCLK modification for screen shake, slowing sound and lockups as the hardware warms.
- [Sega - Service Bulletin 012: MD 32X / MD 1 (VA4), 28th March 1995](https://drive.google.com/file/d/1sOElKt5W6S89mjgpqdoGD3c4R3beXH_q/view) - documents the VCLK modification on the Mega Drive motherboard.