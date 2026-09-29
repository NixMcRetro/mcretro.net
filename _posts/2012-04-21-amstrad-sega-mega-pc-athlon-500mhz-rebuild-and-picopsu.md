---
title: "Amstrad Sega Mega PC, Athlon 500 MHz Rebuild and picoPSU"
author: "Nix McRetro"
date: 2012-04-21T11:39:33.000+10:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

![The Amstrad Mega PC](/assets/images/2012/img_0067a.jpg)

After loading Windows 95 onto the Amstrad Mega PC, it became quite clear that leaving it running like a broken-down horse-drawn buggy was not the best idea.

Poking around the internet, Windows 3.11 looks like a much better fit. Lightweight, but still capable of being dressed up to behave more like a modern Windows environment. Enter [Calmira](http://www.calmira.de/).

I also found Counterpoint while hunting around for the original Amstrad software. Counterpoint is not really an operating system of its own. It is Amstrad's graphical DOS front end, and the Mega PC originally shipped with MS-DOS 5.0 underneath it.

Have a look at this [Internet Archive capture](https://web.archive.org/web/20080630223212/http://web.ukonline.co.uk/joe.gentile/Text/amstradCP.htm). Interestingly, the download links were archived too. Looks like I'll be running Counterpoint 2.5 soon with MS-DOS 5.0 underneath it.

![](/assets/images/2012/img_0067.jpg)

#### The Athlon 500 MHz project

In other news, my side project, the Athlon 500 MHz Project, came to life today. I managed to get the Athlon coupled with an ASUS K7V Rev 1.01 and install Windows XP. Very happy with that result.

Now I just need a rockin' case for it, with some horns if possible.

This particular CPU has significant sentimental value. It was used in the first PC I put together as a teenager back in 2000. According to the warranty sticker, February 2000.

I remember that day well. We were looking for a faster CPU but the entry-level 500 MHz was all they had. I was not leaving empty handed.

The markings on this particular 500 MHz Athlon appeared to identify a 650 MHz-rated core. There were contemporary reports of some early Slot A 500 MHz Athlons containing higher-marked cores, but that does not mean AMD guaranteed those processors to operate at the higher speed.

![](/assets/images/2012/img_0068.jpg)

#### Hard-drive limits

I ran into some trouble with the BIOS and one of the many old-PC hard-drive size barriers. I ended up using a drive-overlay program, much like I had on the Mega PC, and managed to recover most of the 160 GB drive.

There is still the familiar 28-bit LBA ceiling at roughly 128 GiB, or 137 GB in decimal terms. Creating another partition does not get around that limit. Access beyond it requires 48-bit LBA support somewhere through the relevant hardware, BIOS or driver path and operating system.

That is still well beyond the roughly 33 GB limit I was hitting through the BIOS itself.

![](/assets/images/2012/img_0069.jpg)

![](/assets/images/2012/img_0070.jpg)

Another oddity was a Samsung 250 GB drive pulled from an el cheapo PVR. It only identified as 160 GB instead of the 250 GB printed on the label.

I never established why. It could have involved firmware, capacity limiting or configuration, but I didn't investigate it far enough to know.

Who cares! It works, and it runs much quieter than my other PATA drives.

#### picoPSU

I also tested the [picoPSU-80](https://www.mini-box.com/picoPSU-80) that arrived from the US a few days ago, and it seems to work a charm.

I'm not sure what I'll ultimately use it for. I'm toying with the idea of getting the old Mega PC 386SX motherboard powered up and functional as a spare old PC.

I'd just need a small Disk on Module, a safe replacement for the original rechargeable NiCad backup battery and the picoPSU... perhaps!

An ordinary non-rechargeable AA or AAA battery must not be connected directly to a charging circuit, so any external battery holder would need appropriate isolation or a compatible rechargeable arrangement.

### Related posts

- [Amstrad Sega Mega PC with PicoPSU on a Dual Screen Setup](/amstrad-sega-mega-pc-with-picopsu-on-a-dual-screen-setup/)

### Sources

- [Amstrad Mega PC manual](https://acpc.me/ACME/AMSTRAD_PRO/AMSTRAD_PC/LITTERATURE/MANUELS/MEGA_PC_Manual%5BENG%5D.pdf) - documents MS-DOS and Counterpoint as separate parts of the Mega PC software environment.
- [ASUS K7V motherboard manual](https://dlcdnet.asus.com/pub/ASUS/mb/slota/k7v/k7v-101.pdf) - documents support for Slot A AMD Athlon processors, including models up to 1 GHz.
- [Seagate - Windows 137GB Capacity Barrier](https://www.seagate.com/support/kb/disc/tp/137gb.pdf) - explains the 28-bit LBA limit and the need for 48-bit addressing to access capacity beyond 137 GB decimal.
- [Mini-Box - picoPSU-80](https://www.mini-box.com/picoPSU-80) - manufacturer specifications for the regulated 12 V-input DC-DC ATX supply.
- [Duracell - Battery FAQ](https://duracell.com/faq) - warns that non-rechargeable batteries must not be recharged because they can leak or rupture.
