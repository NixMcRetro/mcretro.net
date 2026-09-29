---
title: "Sega Mega Drive 32X Jittery Video: Initial Investigation"
author: "Nix McRetro"
date: 2012-09-12T11:46:32.000+10:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega]
---

{% include youtube.html id="xOgntz8Z0mk" %}

I picked up three 32X units from the internet, all sold as-is.

Surprisingly, all three work to some degree.

The bad news is the jittering and distorted video shown above. At this point it looked as though the same problem might be affecting every 32X I owned, which made me wonder whether the fault was somewhere else in the setup rather than inside each individual 32X.

One of the units originally produced no video at all. A good clean restored that one, and I'll upload a separate repair video showing what I did.

The distorted-video problem turned out to be much more interesting.

Sega later documented a compatibility fault affecting PAL and Asian Model 1 VA4 Mega Drives used with the 32X. Poor EDCLK and VCLK signal quality on the host Mega Drive can cause 32X-rendered graphics to jitter, slow down or eventually lock up as the hardware warms.

In other words, the 32X itself was not necessarily the problem.

Sega's service procedure modifies the Mega Drive motherboard.

That fits the warm-up behaviour I was seeing considerably better than the theories I was working through at the time.

In other repair news, I also received a Mega Drive 2 and Mega-CD 2 combination, both sold as dead.

The Mega-CD looks like an easy repair. Its F301 fuse has failed, much like the fuse problem I encountered in one of my Mega-CD Model 1 units.

The nominal current rating is also 2.5 A, although the exact fuse type and board revision should still be checked rather than assuming both machines use an identical part.

The CD mechanism itself seems to be working beautifully.

The Mega Drive 2 appeared completely dead at first, but I eventually noticed signs of life.

Sure enough, another cracked solder joint on the DC-in socket.

Not the first time I've seen that!

A quick resolder and it roared back to life with some Aleste.

I managed to finish the first level before realising I'd left the soldering iron switched on in the other room.

Whoops!

More 32X testing to come.

### Related posts

- [Sega Mega Drive 32X Repair: No Display, No Sound](/sega-mega-drive-32x-repair-no-display-no-sound/)
- [Sega Mega Drive 32X with Jittery Distorted Video](/sega-mega-drive-32x-with-jittery-distorted-video/)

### Sources

- [ConsoleMods - 32X Service Bulletin Fixes](https://consolemods.org/wiki/Genesis:32X_Service_Bulletin_Fixes) - summarises Sega service bulletins for PAL and Asian VA4 Mega Drive clock-signal instability with 32X hardware.
