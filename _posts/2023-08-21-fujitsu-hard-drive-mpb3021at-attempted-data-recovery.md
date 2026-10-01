---
title: "Fujitsu Hard Drive MPB3021AT - Attempted Data Recovery"
author: "Nix McRetro"
date: 2023-08-21T08:39:31.000+10:00
categories: [hacks, linux, repairs]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="cmRYAffEekE" %}

The Australian Ibis is the best bird wandering the streets. It overcame adversity and now excels at being a hunter on Sydney nature strips. Perhaps irrelevant to this post but cool nonetheless.

{% include youtube.html id="4WZrpyRWzD8" %}

Today we are looking at a broken hard drive, the Fujitsu MPB3021AT 2.16GB.

![](/assets/images/2023/img_1118.gif)

We used GNU ddrescue 1.23 for the data recovery attempt. You can read the full manual [here](https://web.archive.org/web/20260511155236/https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html) if you're curious. It describes how it goes about recovering data. For this recovery we used the following command.

```
sudo ddrescue -f -r3 /dev/sdb /dev/sdc logfile

```

The `-f` flag allows ddrescue to overwrite an output device or partition; it is basically a safeguard against accidentally destroying the wrong thing. The `-r3` flag adds three retry passes for sectors still marked bad, reversing direction between retry passes. `/dev/sdb` was our 2.16GB Fujitsu and `/dev/sdc` was the destination. The destination was itself a failing SSD, which was a terrible recovery choice in hindsight because a write failure on the destination gives us another way for the rescue to fall over. A healthy destination device or image file would have removed that extra failure point. The mapfile, formerly called a logfile, keeps track of the rescue state so the job can be resumed.

Another option that probably should have been considered for the first pass is `-n`, also known as `--no-scrape`. It skips the scraping phase so that run does not spend ages hammering away at the most difficult areas. In ddrescue 1.19 the older splitting phase was replaced by scraping, and the `-n` long option changed from `--no-split` to `--no-scrape`. More information [here](https://datarecovery.com/rd/how-to-clone-hard-disks-with-ddrescue/) and [here](https://www.linux.com/topic/desktop/gnu-ddrescue-best-damaged-drive-rescue/).

![](/assets/images/2023/img_1114.jpg)

The machine we were hooked into was powered by a Gigabyte GA-945GCMX-S2 mainboard. These boards are pretty good when it comes to recovering data from PATA and SATA devices. I have fond memories of the 945 chipset and my old Hackintosh running 10.6 Snow Leopard. The 945 chipset [just being a nudge along](https://en.wikipedia.org/wiki/List_of_Intel_chipsets#9xx_chipsets_and_3/4_Series_chipsets) from the 915 chipset.

![](/assets/images/2023/img_1115.jpg)

Here's the Fujitsu drive itself, it certainly looks like a 2GB hard drive, and sounds like one too! Fujitsu have kindly left the [hard drive manual](https://web.archive.org/web/20240613043402/https://www.fujitsu.com/downloads/COMP/fcpa/hdd/discontinued/mpb3xxxat_prod-manual.pdf) online. Good guy Fujitsu. We had to install a missing crystal oscillator from the underside of the drive at X1. Thanks to [this guide](https://www.fpga4fun.com/oscillators.html) we were able to find the correct form factor and name.

![](/assets/images/2023/img_1116.jpg)

The [SMART](https://en.wikipedia.org/wiki/Self-Monitoring,_Analysis_and_Reporting_Technology) stats weren't too happy after running for 3-4 days of data recovery.

![](/assets/images/2023/img_1117.jpg)

[MHDD](https://hddguru.com/software/2005.10.02-MHDD/) was also used on the drive after the recovery attempt and we started getting warnings quite early on. Its erase operation is destructive, so anything examined after that point cannot tell us what recoverable data might have been present beforehand.

![](/assets/images/2023/img_1113.jpg)

Ultimately the data recovery was a bust. There either wasn't any useful data left to recover, or the drive was too far gone for us to get it. We did not recover anything usable before the destructive testing began. It cost nothing to try and was interesting to listen to it clunking away.

The take away? Make a backup today if you haven't already! 😎

### Sources

- [GNU ddrescue Manual](https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html)
- [Fujitsu MPB3xxxAT Product Manual](https://web.archive.org/web/20240613043402/https://www.fujitsu.com/downloads/COMP/fcpa/hdd/discontinued/mpb3xxxat_prod-manual.pdf)
