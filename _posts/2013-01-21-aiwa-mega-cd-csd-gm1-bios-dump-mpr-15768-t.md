---
title: "Aiwa Mega-CD CSD-GM1 BIOS Dump: MPR-15768-T"
author: "Nix McRetro"
date: 2013-01-21T10:56:01.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, repairs, sega]
---

{% include youtube.html id="sBpigjWEE8M" %}

Someone on the ASSEMbler Games forums pointed out that the Aiwa Mega-CD CSD-GM1 BIOS didn't appear to have been dumped. Well, that's a good enough excuse to pull another machine apart!

This one became a three-part project: disassemble the Game Unit, desolder the BIOS ROM, and dump the contents. How difficult could it possibly be?

The first video follows me dismantling the Aiwa's detachable Game Unit. There are screws all over the place, including several underneath and a couple around the upper casing. Naturally, I'd forgotten exactly how some of it came apart.

The front section has the controller ports and cartridge doors, which need a little care when removing. I've had trouble with the cartridge doors on these units before, usually because the metal frame behind them gets bent and stops them moving freely.

Once the mainboard was accessible, I located the BIOS chip. It's marked **MPR-15768-T**, with a date code indicating week 39 of 1994.

Unfortunately, somebody had applied an enormous piece of double-sided foam tape around the area. After spending far too much time trying to remove the deteriorating material, I decided the other Aiwa Game Unit I owned might make a more cooperative patient.

{% include youtube.html id="ff4KOWv1g9I" %}

Part two is the rather lengthy business of removing the BIOS ROM.

I started with desoldering braid, which normally works well enough, but forty pins and old solder made this an extraordinarily tedious job. I also experimented with a heat gun and a solder sucker. Neither made the whole process especially pleasant.

The heat gun was particularly worrying because it warmed up the surrounding board and the old foam material. I certainly wouldn't recommend treating that as a carefree way of removing a chip!

Eventually I worked back through the pins carefully, clearing as much solder as possible and checking which legs were still attached. And would you believe it, the ROM finally came out!

There was some concern about possible damage to nearby traces and the board itself, so this wasn't exactly the elegant procedure I'd imagined when I started. At least the chip was out, and I could move onto the interesting part.

{% include youtube.html id="YPQgP6K1KOw" %}

Now for the actual dump. I used my GQ-4X programmer with its 16-bit adapter. The Aiwa ROM is a mask ROM rather than an erasable 27C1024 EPROM, but the programmer could read it through a compatible configuration.

My first attempt used a 27C4096 setting and produced a 512 KiB image. That seemed a little excessive compared with other Mega-CD BIOS dumps, which were usually 128 KiB. After some experimenting, I selected a 27C1024-compatible configuration, read the chip again, and byte-swapped the resulting data.

A 27C1024-class device stores 1 megabit as 64K x 16 bits, which works out to 128 KiB. That's also the size of the final image. I then loaded the dump through a Mega EverDrive, which supports Mega-CD BIOS images. Up came the Aiwa BIOS, reporting version 2.11c!

Beautiful. After all that effort, the thing actually worked.

![](/assets/images/2013/img_0362.jpg)

At the time, I believed this was the first public dump of the Aiwa BIOS. MAME now catalogues `mpr-15768-t.bin` for the Aiwa with a size of 128 KiB and CRC32 `8052c7a0`. That confirms the catalogue entry, although it doesn't establish who released the first public dump.

I later returned to the Game Unit to install a BIOS socket, repair damaged traces, and program replacement EPROMs. Those adventures are covered in the related posts below. For now, though, the important bit is done: BIOS preserved!

More details from the original investigation can be found in the archived [ASSEMbler Games thread](https://web.archive.org/web/20191111212702/https://assemblergames.com/threads/aiwa-mega-cd-game-unit-bios-dump-mpr-15768-t-2-11c.43866/).

### Related Posts

- [Aiwa Mega-CD Game Unit BIOS Socket Installation and Trace Repair](/aiwa-mega-cd-game-unit-bios-socket-installation-and-trace-repair/)
- [Aiwa Mega-CD CSD-GM1 Game Unit EPROM Programming and Repair Test](/aiwa-mega-cd-csd-gm1-game-unit-eprom-programming-and-repair-test/)

### Sources

- [Atmel - AT27C1024 Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/doc0019.pdf) - documents the 1 Mbit, 64K x 16 organisation; this does not itself establish the Aiwa mask ROM's compatibility.
- [MAME - Aiwa Mega-CD ROM definition in mdconsole.cpp](https://github.com/mamedev/mame/blob/master/src/mame/sega/mdconsole.cpp) - lists `mpr-15768-t.bin`, a load size of `0x020000` bytes (128 KiB), and CRC32 `8052c7a0`.
