---
title: "Fujitsu Hard Drive MPB3021AT - Attempted Data Recovery"
author: "Nix McRetro"
date: 2023-08-21T08:39:31.000+10:00
categories: [hacks, linux, repairs]
last_modified_at: 2026-10-18
---

{% include youtube.html id="cmRYAffEekE" %}

The Australian Ibis is the best bird wandering the streets. It overcame adversity and now excels at being a hunter on Sydney nature strips. Perhaps irrelevant to this post but cool nonetheless.

{% include youtube.html id="4WZrpyRWzD8" %}

Today we are looking at a broken hard drive: the Fujitsu MPB3021AT, a 2.16 GB drive.

![](/assets/images/2023/img_1118.gif)

We used GNU ddrescue 1.23 for the data-recovery attempt. The [GNU ddrescue manual](https://web.archive.org/web/20260511155236/https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html) explains its approach. The command below is preserved from my written notes; its device names must not be copied blindly.

```
sudo ddrescue -f -r3 /dev/sdb /dev/sdc logfile

```

The `-f` flag permits overwriting an output device or partition; it overrides ddrescue's protection against doing that by default. The `-r3` flag requests three retry passes over sectors still marked bad, reversing direction between retry passes. There is a mismatch in my records: the written command names `/dev/sdb` as the source, but the animated screenshot shows the 2 GB drive as `/dev/sda` and uses `fujitsu_2gb` as the mapfile name. Both show `/dev/sdc` as the destination. Those are records of particular runs, not reliable device names for anyone else's machine. The mapfile, formerly called a logfile, tracks the rescue state so the job can be resumed.

The destination was itself a failing SSD. A terrible recovery choice in hindsight: a write failure there gave the rescue another way to fall over. A healthy destination device or image file would have removed that extra failure point.

Another option worth considering for the first pass was `-n`, or `--no-scrape`. It skips scraping, so that run doesn't spend ages hammering away at the most difficult areas. Older examples can be confusing: ddrescue 1.19 replaced splitting with scraping and changed `-n` from `--no-split` to `--no-scrape`. The [ddrescue cloning guide](https://datarecovery.com/rd/how-to-clone-hard-disks-with-ddrescue/) and [Linux.com's GNU ddrescue article](https://www.linux.com/topic/desktop/gnu-ddrescue-best-damaged-drive-rescue/) give some background.

![](/assets/images/2023/img_1114.jpg)

The machine we were hooked into used a Gigabyte GA-945GCMX-S2 mainboard. I've found these boards handy for working with both PATA and SATA devices. I have fond memories of the 945 chipset and my old Hackintosh running 10.6 Snow Leopard. The 945 was [a nudge along from the 915 chipset](https://en.wikipedia.org/wiki/List_of_Intel_chipsets#9xx_chipsets_and_3/4_Series_chipsets).

![](/assets/images/2023/img_1115.jpg)

Here's the Fujitsu drive itself. It certainly looks like a 2 GB hard drive, and sounds like one too! Fujitsu's [MPB3xxxAT product manual](https://web.archive.org/web/20240613043402/https://www.fujitsu.com/downloads/COMP/fcpa/hdd/discontinued/mpb3xxxat_prod-manual.pdf) survives. Good guy Fujitsu. We also had to replace a missing crystal oscillator at X1 on the underside of the drive. [fpga4fun's oscillator guide](https://www.fpga4fun.com/oscillators.html) helped us identify the package and terminology.

![](/assets/images/2023/img_1116.jpg)

The [SMART](https://en.wikipedia.org/wiki/Self-Monitoring,_Analysis_and_Reporting_Technology) stats weren't too happy after running for 3-4 days of data recovery.

![](/assets/images/2023/img_1117.jpg)

[MHDD](https://hddguru.com/software/2005.10.02-MHDD/) was also used on the drive after the recovery attempt and we started getting warnings quite early on. Its erase operation is destructive, so anything examined after that point cannot tell us what recoverable data might have been present beforehand.

![](/assets/images/2023/img_1113.jpg)

Ultimately the data recovery was a bust. There either wasn't any useful data left to recover, or the drive was too far gone for us to get it. We did not recover anything usable before the destructive testing began. It cost nothing to try and was interesting to listen to it clunking away.

The takeaway? Make a backup today if you haven't already! 😎

### Sources

- [GNU ddrescue Manual](https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html)
- [Fujitsu MPB3xxxAT Product Manual](https://web.archive.org/web/20240613043402/https://www.fujitsu.com/downloads/COMP/fcpa/hdd/discontinued/mpb3xxxat_prod-manual.pdf)
- [GNU ddrescue 1.23 - release archive containing the versioned manual and ChangeLog](https://ftp.gnu.org/gnu/ddrescue/ddrescue-1.23.tar.lz)
