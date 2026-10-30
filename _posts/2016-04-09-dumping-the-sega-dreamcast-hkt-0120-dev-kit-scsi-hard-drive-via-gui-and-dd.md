---
title: "Dumping the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive via GUI and dd"
author: "Nix McRetro"
date: 2016-04-09T13:03:38.000+10:00
last_modified_at: 2026-10-18
categories: [sega, youtube]
---


{% include youtube.html id="ynXxOYtCZYY" %}

Everyone loves WSB2K2! World Series Baseball 2K2! I've been trying to recover the contents of the SCSI hard drive from my Sega Dreamcast HKT-0120 development unit, and this time I'm giving R-Studio for Linux and ordinary `dd` a go. Getting the software and hardware to cooperate has been an adventure in itself.

My attempts to get a suitable Linux installation running weren't going particularly well, so I turned to a live environment instead. Before I could do much with the software, though, I needed to get the drive out of the development unit. That meant removing the front panel and opening up the case.

The HKT-0120 is quite an interesting machine once you start pulling it apart. The CD drive occupies a considerable amount of space, and there's a PC-like arrangement of hardware behind it. I also found rather more surface-mount capacitors than I'd first expected, so that's something to keep in mind for future maintenance.

The internal SCSI cable connects to the hard drive and the development hardware, including the GD writer board. The machine also has a switching power supply with a voltage selector, and I checked that it was set for Australian mains before working with it. There was plenty of dust inside, along with a rather unusual smell that reminded me of talcum powder.

The hard drive itself is a Seagate unit with approximately 4.5 GB of capacity. Its date markings suggest it came from around the original development period, which makes whatever might still be stored on it rather interesting. I was keen to get an image before doing too much more experimenting.

I connected the drive to my SCSI controller and booted the Linux live environment. It detected the Seagate, which was an encouraging start, and I could access some of the filesystem contents. One of the visible folders was named `WSB2K2`, and the files inside appeared to be associated with World Series Baseball 2K2.

There was also another partition that I couldn't get mounted at that point. The visible files weren't necessarily everything on the drive either, particularly if deleted data was still present. That was why I wanted a complete disk image rather than simply copying the files I could browse.

I tried the graphical recovery approach with R-Studio and then a raw copy using `dd`. The copying process produced data from the drive, and a quick examination suggested that at least some of the expected files were there. There also appeared to be a small amount of unreadable data, so I wasn't ready to call the recovery complete.

A raw copy with `dd` is useful when a disk is healthy enough, but it isn't specialised recovery software. When a drive starts returning read errors, repeatedly hammering the bad areas isn't ideal. That's why the next part turns to recovery tools, including GNU ddrescue, which can recover readable areas first and keep track of what still needs attention.

For now, I've got an image to work with and some rather interesting Dreamcast development files to investigate. I'll leave the detailed analysis to people who know more about WSB2K2. I just like playing with old hardware!

And yes, at the time I was still trying to remember whether the program was called `ddrescue` or `dd_rescue`. :)

**Sources**

- [ASSEMBler Games - World Series Baseball 2K2 Dumping Thread](https://web.archive.org/web/20160708220702/http://assemblergames.com/l/threads/world-series-baseball-2k2-wsb2k2-dumping-from-hkt-0120.60534/)
- [R-Studio for Linux](https://www.r-studio.com/data_recovery_linux/Download.shtml)
- [GNU Project - GNU ddrescue](https://www.gnu.org/software/ddrescue/)

**Related Posts**

- [Preparing to Dump the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive](/preparing-to-dump-the-sega-dreamcast-hkt-0120-dev-kit-scsi-hard-drive/)
- [Dumping the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive with GNU ddrescue](/dumping-the-sega-dreamcast-hkt-0120-dev-kit-scsi-hard-drive-with-gnu-ddrescue/)
