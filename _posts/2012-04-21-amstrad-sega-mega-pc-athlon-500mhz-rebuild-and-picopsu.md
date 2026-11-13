---
title: "Amstrad Sega Mega PC, Athlon 500 MHz Rebuild and picoPSU"
author: "Nix McRetro"
date: 2012-04-21T11:39:33.000+10:00
last_modified_at: 2026-10-18
categories: [computing, repairs, sega]
share_description: >-
  An Amstrad Mega PC gets another rethink while a treasured Slot A Athlon 500 MHz system returns to life. There's also a tiny picoPSU and lots of storage drama. 💾
---

![Small composite picture of a beige Amstrad Mega PC, its monitor divided between Sega game imagery and a PC display, with keyboard, mouse and controllers.](/assets/images/2012/04/amstrad-sega-mega-pc-athlon-500mhz-rebuild-and-picopsu/img_0067a-wide-1800.jxl)

*A Mega Drive and a PC in the one beige machine. Still an absolutely wonderful idea!*
{: .media-caption }

After loading Windows 95 onto the Amstrad Mega PC, it became quite clear that leaving it running like a broken-down horse-drawn buggy was not the best idea. Poking around the internet, Windows 3.11 looks like a much better fit. Lightweight, but still capable of being dressed up to behave more like a modern Windows environment. Enter [Calmira](http://www.calmira.de/).

I also found Counterpoint while hunting around for the original Amstrad software. Counterpoint is not really an operating system of its own. It is Amstrad's graphical DOS front end, and the Mega PC originally shipped with MS-DOS 5.0 underneath it.

Have a look at this [Internet Archive capture](https://web.archive.org/web/20080630223212/http://web.ukonline.co.uk/joe.gentile/Text/amstradCP.htm). Interestingly, the download links were archived too. Looks like I'll be running Counterpoint 2.5 soon with MS-DOS 5.0 underneath it.

![ASUS K7V BIOS startup screen identifying an AMD Athlon 750 MHz processor and 131,072 KB of memory.](/assets/images/2012/img_0067.jpg)

*The ASUS K7V fires up with the bonus 750 MHz Athlon. My old 500 MHz chip is still in storage.*
{: .media-caption }

#### The Athlon 500 MHz project

In other news, my side project, the Athlon 500 MHz Project, came to life today. It can be seen here with a bonus 750 MHz CPU included with the motherboard running. I managed to get the Athlon coupled with an ASUS K7V Rev 1.01 and install Windows XP. Very happy with that result. Now I just need a rockin' case for it, with some horns if possible.

This 500 MHz Athlon CPU has significant sentimental value. The 750 MHz, not so much. It was used in the first PC I put together as a teenager back in 2000. According to the warranty sticker, February 2000. I remember that day well. We were looking for a faster CPU but the entry-level 500 MHz was all they had. I was not leaving empty handed.

Years ago I removed the casing and markings inside this particular 500 MHz Athlon identified a 650 MHz-rated core! There were reports of some early Slot A 500 MHz Athlons containing higher-marked cores, no guarantee they'd run at those speeds, but maybe the market was in the entry-level - especially against Intel in the early days!

![Samsung OnTrack Disk Manager screen for an SP1644N drive showing 33.82 GB translated CHS capacity and 137.4 GB LBA size.](/assets/images/2012/img_0068.jpg)

*OnTrack spots 137.4 GB by LBA, while the older CHS geometry leaves me with just 33.82 GB. Progress, sort of.*
{: .media-caption }

#### Hard-drive limits

I ran into some trouble with the BIOS and one of the many old-PC hard-drive size barriers. I ended up using a drive-overlay program, much like I had on the Mega PC, and managed to recover most of the 160 GB drive.

There is still the familiar 28-bit LBA ceiling at roughly 128 GiB, or 137 GB in decimal terms. Creating another partition does not get around that limit. Access beyond it requires 48-bit LBA support somewhere through the relevant hardware, BIOS or driver path and operating system. That is still well beyond the roughly 33 GB limit I was hitting through the BIOS itself.

![Samsung Dynamic Drive Overlay v9.61 boot screen listing an SP1644N as drive 80 and reporting 'Setting Dynamic Mode = 63 *OK*'.](/assets/images/2012/img_0069.jpg)

*Starting OnTrack's drive overlay to get around the old BIOS limit. At least the hard drive has some room to breathe now.*
{: .media-caption }

![Samsung SP2514N/CE hard-drive label stating 250.0 GB, with barcode and jumper configuration diagram.](/assets/images/2012/img_0070.jpg)

*The label says 250 GB. The PC said 160 GB. I never did get to the bottom of that one, but it was wonderfully quiet!*
{: .media-caption }

Another oddity was a Samsung 250 GB drive pulled from an el cheapo PVR. It only identified as 160 GB instead of the 250 GB printed on the label. I never established why. It could have involved firmware, capacity limiting or configuration, but I didn't investigate it far enough to know. Who cares! It works, and it runs much quieter than my other PATA drives.

#### picoPSU

I also tested the [picoPSU-80](https://www.mini-box.com/picoPSU-80) that arrived from the US a few days ago, and it seems to work a charm. I'm not sure what I'll ultimately use it for, although I'm toying with the idea of getting the old Mega PC 386SX motherboard powered up and functional as a spare old PC.

I'd just need a small Disk on Module, a replacement for the original rechargeable NiCad backup battery and the picoPSU... perhaps! The battery side needs a bit of thought, though. If I use an ordinary non-rechargeable AA or AAA cell, I'll have to isolate it from the charging circuit so the motherboard doesn't try to charge it, or use a suitable rechargeable arrangement instead.

### Sources

- [Amstrad Mega PC Manual (MS-DOS and Counterpoint)](https://acpc.me/ACME/AMSTRAD_PRO/AMSTRAD_PC/LITTERATURE/MANUELS/MEGA_PC_Manual%5BENG%5D.pdf)
- [ASUS: K7V Motherboard Manual (Slot A Athlon up to 1 GHz)](https://dlcdnet.asus.com/pub/ASUS/mb/slota/k7v/k7v-101.pdf)
- [Seagate: 137 GB Capacity Barrier (28-bit/48-bit LBA)](https://www.seagate.com/support/kb/disc/tp/137gb.pdf)
- [Mini-Box: picoPSU-80 (12 V Input)](https://www.mini-box.com/picoPSU-80)
- [Duracell: Battery FAQ (Non-rechargeable Battery Safety)](https://duracell.com/faq)

### Related Posts

- [Amstrad Sega Mega PC with picoPSU and a Dual-Screen Setup](/amstrad-sega-mega-pc-with-picopsu-and-a-dual-screen-setup/)
