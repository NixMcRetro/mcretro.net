---
title: "Sega Dreamcast Broadband Adapter (BBA) Dumping"
author: "Nix McRetro"
date: 2016-08-26T10:19:25.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, sega]
---

![crazy_taxi1](/assets/images/2016/img_0546.jpg)

The Dreamcast Broadband Adapter is one of the most awesome pieces of technology you can bolt onto a Dreamcast. Software such as **httpd-ack** can transfer GD-ROM tracks over the network and dump the console's BIOS. GD-R development media can also be dumped through suitable System Disc 2 / disc-swap workflows.

I had four unlabeled pressed Sega discs, or "silvers", all NTSC-U:

- ChuChu Rocket!
- Space Channel 5
- Crazy Taxi
- Virtua Striker 2 Ver. 2000.1

![crazy_taxi2](/assets/images/2016/img_0547.jpg)

I originally described an unlabeled pressed Sega disc as "a very late beta if you will". That was me getting excited. An unlabeled pressed disc tells me that the physical media is unusual, but it does not establish whether the software is a beta, review build, final mastering copy or something else. For ChuChu Rocket!, Space Channel 5 and Crazy Taxi, I compared CRC32 values from my dumps with the retail data represented in Redump and found matches. So apparently I had nothing special. Mighty boring. It never hurts to check though!

![virtua_striker](/assets/images/2016/img_0549.jpg)

Virtua Striker 2 Ver. 2000.1 was not represented in the database I was checking at the time, so I went hunting through a contemporary scene image and searched for `SEGAKATANA` in a hex editor to locate the Dreamcast header inside the CDI file. That suggested I was looking at the retail build, but it is weaker evidence than a full verified byte-for-byte retail dump comparison.

![system_disc](/assets/images/2016/img_0548.jpg)

I also compared two System Disc 2 copies, S-2XXX and S-3XXX, and the data I dumped from those two copies matched each other. XDP Browser was useful for setting a static BBA IP address before using httpd-ack.

### Sources

- [dreamcast.wiki - Dumping GD-ROMs](https://dreamcast.wiki/Dumping_GD-ROMs)
- [Redump.org - Disc Preservation Database](http://redump.org)
- [ackmed - httpd-ack README](https://github.com/sega-dreamcast/httpd-ack)
