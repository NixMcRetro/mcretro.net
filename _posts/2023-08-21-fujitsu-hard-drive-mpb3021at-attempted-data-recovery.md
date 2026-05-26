---
title: "Fujitsu Hard Drive MPB3021AT - Attempted Data Recovery"
author: "Nix McRetro"
date: 2023-08-21T08:39:31.000+10:00
categories: [hacks, linux, repairs]
---

{% include youtube.html id="cmRYAffEekE" %}

The Australian Ibis is the best bird wandering the streets. It overcame adversity and now excels at being a hunter on Sydney nature strips. Perhaps irrelevant to this post but cool nonetheless.

{% include youtube.html id="4WZrpyRWzD8" %}

Today we are looking at a broken hard drive, the Fujitsu MPB3021AT 2.16GB.

![](/assets/images/2023/img_1118.gif)

We used GNU ddrescue 1.23 for the data recovery attempt. You can read the full manual [here](https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html). It describes how it goes about recovering data. For this recovery we used the following command.

```
sudo ddrescue -f -r3 /dev/sdb /dev/sdc logfile

```

The -f flag was for forcing to write to another device instead of a file. The -r3 flag gives us three retries of bad blocks - both reading forward and backwards each pass. /dev/sdb was our 2GB hard drive and /dev/sdc was a failing SSD to recover onto. The SSD was bad, but wasn't as bad as our Fujitsu. The mapfile, formerly known as a logfile, keeps track of what has been happening and allows for resuming.

Another option that probably should be considered is the -n flag. Also known as no-scrape it avoids spending a lot of time trying to rescue the most difficult parts (i.e. damaged parts). Apparently it is less stressful on the drive than no-split [which was changed to no-scrape](https://web.archive.org/web/20260511155236/https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html) in ddrescue 1.19. More information [here](https://datarecovery.com/rd/how-to-clone-hard-disks-with-ddrescue/) and [here](https://www.linux.com/topic/desktop/gnu-ddrescue-best-damaged-drive-rescue/).

![](/assets/images/2023/img_1114.jpg)

The machine we were hooked into was powered by a Gigabyte GA-945GCMX-S2 mainboard. These boards are pretty good when it comes to recovering data from PATA and SATA devices. I have fond memories of the 945 chipset and my old Hackintosh running 10.6 Snow Leopard. The 945 chipset [just being a nudge along](https://en.wikipedia.org/wiki/List_of_Intel_chipsets#9xx_chipsets_and_3/4_Series_chipsets) from the 915 chipset.

![](/assets/images/2023/img_1115.jpg)

Here's the Fujitsu drive itself, it certainly looks like a 2GB hard drive, and sounds like one too! Fujitsu have kindly left the [hard drive manual](https://web.archive.org/web/20240613043402/https://www.fujitsu.com/downloads/COMP/fcpa/hdd/discontinued/mpb3xxxat_prod-manual.pdf) online. Good guy Fujitsu. We had to install a missing crystal oscillator from the underside of the drive at X1. Thanks to [this guide](https://www.fpga4fun.com/oscillators.html) we were able to find the correct form factor and name.

![](/assets/images/2023/img_1116.jpg)

The [SMART](https://en.wikipedia.org/wiki/Self-Monitoring,_Analysis_and_Reporting_Technology) stats weren't too happy after running for 3-4 days of data recovery.

![](/assets/images/2023/img_1117.jpg)

[MHDD](https://hddguru.com/software/2005.10.02-MHDD/) was used to erase any data blocks that was somehow still on the drive. We started to get warnings quite early on.

![](/assets/images/2023/img_1113.jpg)

Ultimately the data recovery was a bust. There either wasn't any data to begin with or the drive was too far gone to recovery anything from. Analysis with data recovery pattern tools didn't pick up anything either from data that have been deleted but not zeroed on the drive. It cost nothing to try and was interesting to listen to it clunking away.

The take away? Make a backup today if you haven't already! 😎
