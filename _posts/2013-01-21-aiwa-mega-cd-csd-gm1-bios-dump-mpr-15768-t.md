---
title: "Aiwa Mega-CD CSD-GM1 BIOS Dump: MPR-15768-T"
author: "Nix McRetro"
date: 2013-01-21T10:56:01.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, repairs, sega]
---

{% include youtube.html id="sBpigjWEE8M" %}

Someone on the ASSEMbler Games forums pointed out that the Aiwa Mega-CD CSD-GM1 BIOS didn't appear to have been dumped. Well, that's a good enough excuse to pull another machine apart! This became a three-part project involving disassembling the Game Unit, removing the BIOS ROM, and dumping its contents.

The first video follows me dismantling the Aiwa's detachable Game Unit. There are screws all over the place, including several underneath and around the upper casing. Naturally, I'd forgotten exactly how some of it came apart.

The front section contains the controller ports and cartridge doors, which need a little care when removing. I've had trouble with those doors before, usually because the metal frame behind them gets bent and prevents them from moving freely.

Once the mainboard was accessible, I located the BIOS chip. It's marked **MPR-15768-T**, with a date code indicating week 39 of 1994. Unfortunately, somebody had applied an enormous piece of double-sided foam tape around the area. After spending far too long removing the deteriorating material, I decided that my other Aiwa Game Unit might make a more cooperative patient.

{% include youtube.html id="ff4KOWv1g9I" %}

Part two is the rather lengthy business of removing the BIOS ROM. I started with desoldering braid, which normally works well enough, but forty pins and old solder made it an extraordinarily tedious job. I also experimented with a heat gun and a solder sucker, neither of which made the process especially pleasant.

The heat gun was particularly worrying because it warmed the surrounding board and the old foam material. Eventually I worked back through the pins carefully, clearing the solder and checking which legs were still attached. And would you believe it, the ROM finally came out!

I was concerned about possible damage to nearby traces, so it wasn't exactly the elegant procedure I'd imagined when I started. At least I now had the chip out and could move on to the interesting part.

{% include youtube.html id="YPQgP6K1KOw" %}

For the dump, I used my GQ-4X programmer with its 16-bit adapter. The Aiwa BIOS is a mask ROM rather than an erasable 27C1024 EPROM, but I could read it through a compatible programmer configuration.

My first attempt used a 27C4096 setting and produced a 512 KiB image. That seemed rather large for a Mega-CD BIOS, so I tried a 27C1024-compatible configuration instead. This gave me a 128 KiB image, which I then byte-swapped.

A 27C1024-class device stores 1 megabit as 64K x 16 bits, so that size made sense. I loaded the resulting BIOS through a Mega EverDrive and up came the Aiwa screen, reporting version 2.11c! After all the desoldering trouble, it was wonderful seeing the dump actually work.

![](/assets/images/2013/img_0362.jpg)

At the time, I believed this was the first public dump of the Aiwa BIOS. MAME now catalogues `mpr-15768-t.bin` at 128 KiB with CRC32 `8052c7a0`, although that doesn't tell us who made the first public release.

I later returned to the Game Unit to install a BIOS socket, repair damaged traces, and program replacement EPROMs. Those adventures are covered in the related posts below. More details about this original investigation are also preserved in the archived [ASSEMbler Games thread](https://web.archive.org/web/20191111212702/https://assemblergames.com/threads/aiwa-mega-cd-game-unit-bios-dump-mpr-15768-t-2-11c.43866/).

**Related Posts**

- [Aiwa Mega-CD Game Unit BIOS Socket Installation and Trace Repair](/aiwa-mega-cd-game-unit-bios-socket-installation-and-trace-repair/)
- [Aiwa Mega-CD CSD-GM1 Game Unit EPROM Programming and Repair Test](/aiwa-mega-cd-csd-gm1-game-unit-eprom-programming-and-repair-test/)

**Sources**

- [Atmel - AT27C1024 Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/doc0019.pdf) - documents the 1 Mbit, 64K x 16 organisation; this does not itself establish the Aiwa mask ROM's compatibility.
- [MAME - Aiwa Mega-CD ROM definition in mdconsole.cpp](https://github.com/mamedev/mame/blob/master/src/mame/sega/mdconsole.cpp) - lists `mpr-15768-t.bin`, a load size of `0x020000` bytes (128 KiB), and CRC32 `8052c7a0`.
