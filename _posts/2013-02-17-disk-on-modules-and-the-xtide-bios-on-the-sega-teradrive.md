---
title: "Disk on Modules and the XTIDE BIOS on the Sega TeraDrive"
author: "Nix McRetro"
date: 2013-02-17T19:11:53.000+11:00
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2013/img_0377.jpg)

So many types of disk on modules, so little time. Found this [here](https://code.google.com/archive/p/xtideuniversalbios/wikis/Manual_v2_0_0.wiki#Problems_with_Compact_Flash_cards_and_microdrives) while searching.

> Some CF cards and microdrives do not work properly with IBM 5150/5160 when using XTIDE rev 1 or rev 2. Some of the symptoms are improperly displayed drive name on boot menu or the drive appears to work on some occasions and sometimes not. This is a hardware related problem and cannot be fixed by software.

So far I've gone through three types / brands of disk on modules. I was after one that was powered on pin 20 for 5V and preferably 2GB in size since FAT16 happens to like tidy 2GB sized partitions. It's plenty of room for a 286-class machine as well.

**Transcend 4GB** 5V on Pin 20: YES Recognised with XTIDE: NO

**KingSpec 2GB** 5V on Pin 20: NO Recognised with XTIDE: YES

**TopSSD 4GB** 5V on Pin 20: YES Recognised with XTIDE: YES

Unfortunately, I can't track down these TopSSD drives anywhere. I was hoping the Transcend ones world work best, but they didn't. They had voltage, but weren't recognised correctly with the XTIDE software. Limitations or issues with the Transcends sure is harsh. But at least I have now seen all three possible scenarios these DOMs provide. There can't be any more ways to fail, right? RIGHT?!?!?! :D

![](/assets/images/2013/img_0375.jpg)

![](/assets/images/2013/img_0376.jpg)
