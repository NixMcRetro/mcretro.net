---
title: "Sega Dreamcast Broadband Adapter (BBA) Dumping"
author: "Nix McRetro"
date: 2016-08-26T10:19:25.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, sega]
---

![crazy_taxi1](/assets/images/2016/img_0546.jpg)

The Dreamcast Broadband Adapter is one of the most awesome pieces of technology you can bolt onto a Dreamcast.

Among other things, software such as **httpd-ack** can use the BBA to transfer GD-ROM tracks over the network.

GD-R development media can also be dumped through suitable System Disc 2 / disc-swap workflows.

I had four unlabeled pressed Sega discs, or "silvers":

- ChuChu Rocket!
- Space Channel 5
- Crazy Taxi
- Virtua Striker

![crazy_taxi2](/assets/images/2016/img_0547.jpg)

I originally described an unlabeled pressed Sega disc as "a very late beta if you will".

That was me getting excited.

An unlabeled pressed disc tells me that the physical media is unusual. It does not tell me by itself whether the software is a beta, review build, final mastering copy or something else.

For ChuChu Rocket!, Space Channel 5 and Crazy Taxi, my dumps matched the retail data represented in Redump.

So apparently I had nothing special.

Mighty boring.

It never hurts to check though!

![virtua_striker](/assets/images/2016/img_0549.jpg)

Virtua Striker was not represented in the database I was checking at the time, so I went hunting through a contemporary scene image and inspected the Dreamcast header data.

That suggested I was looking at the retail build, but that is weaker evidence than a full verified byte-for-byte retail dump comparison.

![system_disc](/assets/images/2016/img_0548.jpg)

I also compared two System Disc 2 copies, S-2XXX and S-3XXX, and the data I dumped from those two copies matched each other.

XDP Browser was useful for setting a static BBA IP address before using httpd-ack.

### Sources

- [dreamcast.wiki - Dumping GD-ROMs](https://dreamcast.wiki/Dumping_GD-ROMs)
- [Redump.org](http://redump.org)
