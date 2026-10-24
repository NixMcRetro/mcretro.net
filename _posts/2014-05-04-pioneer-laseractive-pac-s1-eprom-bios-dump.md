---
title: "Pioneer LaserActive PAC-S1 EPROM BIOS Dump"
author: "Nix McRetro"
date: 2014-05-04T19:45:19.000+10:00
last_modified_at: 2026-10-18
categories: [programming, sega, youtube]
---

{% include youtube.html id="TdQUt0x3RHw" %}

A quick dump of the old BIOS from the Pioneer LaserActive PAC-S1 revealed some issues with the dumping process... I need to inspect my GQ-4X as it seems to have some strange issues going on!

I'd pulled the Japanese PAC-S1 apart to have a look at its capacitors and general condition. These units are getting to the age where the old electrolytics can become troublesome, and I wanted to see what I was dealing with before doing any more work. While I was inside, I spotted a nice, big, socketed EPROM. Well, that's not something I'm going to ignore, is it?

The chip has a sticker over the erase window marked `PIONEER PD6126E`. Underneath is a Fujitsu `MBM27C1024A-12Z`, dated to week 28 of 1993. The MBM27C1024A is a 1 Mbit UV-erasable EPROM in a 40-pin package.

The PAC-S1 provides Mega Drive and Mega-CD functionality for the Pioneer LaserActive, including the rather wonderful Mega LD games. I was curious to see what was inside its boot ROM and whether I could get a useful image out of it.

Removing the EPROM was fairly straightforward, although I managed to bend one of the pins slightly. Nothing too exciting. The next challenge was convincing my GQ-4X programmer to read the thing.

Unfortunately, there wasn't an exact device entry available for the chip, so I selected a generic 27C1024 and fitted the appropriate 16-bit adapter. Naturally, I also managed to insert something the wrong way around during my first attempt. A reboot later, we were back in business.

The first read produced something rather interesting. After swapping the byte order, I could see recognisable text, including a reference to a Mega LD boot ROM from April 1993. Excellent! At least it looked like I was reading something meaningful.

I saved the file using the label from the original EPROM and started experimenting with it in an emulator. That's when the fun really began. The first results weren't particularly encouraging, with checksum problems and some thoroughly strange screens, including lovely shades of pink and blue. Not exactly what I'd expected from a clean BIOS dump.

After a little more investigation, I started wondering whether the problem was with the GQ-4X rather than the LaserActive firmware itself. I'd encountered strange programming results with another device before, and now a Fujitsu EPROM was giving me trouble too.

I ended up experimenting with the programmer's device definitions and voltage settings, which produced more useful results. I also made additional reads rather than relying on the first file I'd saved. Probably something I should have done at the beginning, but where's the fun in getting everything right the first time?

The later result was promising enough to get further in the emulator, but there were still limitations to what I could test without the rest of the LaserActive hardware. The PAC-S1 contains more than just the EPROM, and an emulator isn't necessarily going to reproduce everything the complete machine does.

Still, I'd managed to extract recognisable firmware from a rather interesting Sega-related piece of hardware and discovered another reason to keep an eye on the GQ-4X. One of these days I'll have an EPROM-dumping session where absolutely everything works on the first attempt. Haha! Who am I kidding?

**Sources**

- [Fujitsu - MBM27C1024A-10/-12/-15 CMOS 1M-BIT UV EPROM Datasheet (August 1993, Edition 2.0)](https://datasheet.datasheetarchive.com/originals/scans/Scans-052/DSAIH00044256.pdf)

**Related Posts**

- [Pioneer LaserActive Sega PAC-S1 Disassembly](/pioneer-laseractive-sega-pac-s1-disassembly/)
- [Pioneer LaserActive Sega PAC-S1 Mainboard Capacitor Removal](/pioneer-laseractive-sega-pac-s1-mainboard-capacitor-removal/)
- [Pioneer LaserActive Sega PAC-S1 Subboard Capacitor Removal](/pioneer-laseractive-sega-pac-s1-subboard-capacitor-removal/)
