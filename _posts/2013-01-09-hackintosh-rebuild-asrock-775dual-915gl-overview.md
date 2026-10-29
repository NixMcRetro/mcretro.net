---
title: "Hackintosh Rebuild ASRock 775Dual-915GL Overview"
author: "Nix McRetro"
date: 2013-01-09T14:10:10.000+11:00
last_modified_at: 2026-10-18
categories: [apple, hacks, ibm-pc]
---

{% include youtube.html id="awMk6Oz3sI0" %}

We take a trip down memory lane to my first Hackintosh motherboard, the ASRock 775Dual-915GL. Powered by a wonderfully cheap single-core Celeron, it felt remarkably fast for what it cost and compared very favourably with some of the PowerPC Macs I was using around that period. It certainly cannot be generalised to every G4 and G5 system, especially the high-end dual and quad G5 machines Apple was shipping by late 2005.

For this rebuild I've found a new case, although calling it a magnificent piece of engineering might be stretching things a little. The steel is extraordinarily thin, but it was cheap and it'll do the job. Inside we're fitting an NEC DVD writer rescued from an external FireWire enclosure, a Panasonic floppy drive, a Samsung 500 GB SATA hard drive and a 420 W power supply.

The motherboard has both AGP and PCI Express slots, along with two conventional PCI slots. One of those is destined for a SCSI card. There's also a rather awkwardly placed power connector sitting towards the middle of the board. Lovely place for it, especially when you've got an enormous CPU heatsink taking up the surrounding space!

![](/assets/images/2013/img_0361.jpg)

The original I built was made back in late 2005 / early 2006. This was about six months after Apple announced the transition to Intel hardware. The motherboard was unusually close to Apple's 2005 Developer Transition Kit platform. The ASRock uses Intel's 915GL chipset with ICH6 and GMA 900 graphics, while the Apple development machine used the closely related 915G with ICH6 and GMA 900. Similar enough to be very interesting for early OSx86 experimentation, but not literally the same chipset. Sound, ethernet, graphics - all worked out of the box on my installation.

Mac OS X 10.4 Tiger was also the Mac OS X generation that bridged the PowerPC-to-Intel transition. Apple publicly demonstrated Intel Tiger and distributed developer-only Intel builds in 2005, while Mac OS X 10.4.4 shipped publicly with the first retail Intel Macs in January 2006.


I actually have a spare 775Dual-915GL board, but one of its capacitors has failed. That can be a repair project for another day. The board I'm using here is equipped with a Celeron running at approximately 2.66 GHz, and I eventually discovered that the installed RAM was 1.5 GB rather than the 1 GB I'd first thought.

The heatsink itself is a considerable improvement over the stock Intel arrangement. I've had more than enough encounters with those horrible push-pin mounting systems over the years. This one uses a backing plate, which feels considerably more substantial and doesn't leave me wondering whether only three of the four corners have actually locked into place.

By the end of New Year's Eve 2012, the machine was assembled and powering on. Naturally, that didn't mean Mac OS X was going to cooperate. The first installation attempt had trouble with the SATA hardware, and I started remembering why I'd used an IDE hard drive in the original machine. Apparently some things never change.

I tried a few different Tiger installation discs. Some didn't boot correctly, while another managed to get us all the way into the graphical installer. The spinning beach ball was looking rather lovely, even if the resolution wasn't quite right. PS/2 keyboard and mouse support worked, which was encouraging.

The installation was still underway when midnight arrived. Happy New Year, 2013! What better way to celebrate than persuading a computer from the mid-2000s to install an operating system from the same period? At least the computer wasn't on fire.

Eventually I got Mac OS X 10.4.9 running. The system booted surprisingly quickly, ethernet was working and System Profiler was showing the Intel GMA graphics. I also had Core Image and Quartz Extreme enabled, so naturally the first thing to inspect was the lovely Dashboard ripple effect. These were the important things back then!

There's still plenty to experiment with, particularly the SCSI and FireWire cards I've collected over the years. But for now, the old ASRock is back in action, and it's been a rather enjoyable trip down memory lane.

**Sources**

- [ASRock - 775Dual-915GL](https://www.asrock.com/mb/Intel/775Dual-915gl/) - documents the Intel 915GL, ICH6 and GMA 900 platform used by this motherboard.
- [Apple - Apple to Use Intel Microprocessors Beginning in 2006](https://www.apple.com/newsroom/2005/06/06Apple-to-Use-Intel-Microprocessors-Beginning-in-2006/) - Apple's June 2005 Intel transition announcement and Developer Transition Kit context.
- [Pierre Dandumont - Test et analyse du kit de transition Intel (DTK) de 2005](https://www.journaldulapin.com/2016/04/09/dtk-intel-apple/) - the 9th April 2016 firsthand examination identifies the 2005 DTK's 915G chipset and GMA 900 graphics.
- [Apple - Power Mac G5 Quad and Dual](https://www.apple.com/newsroom/2005/10/19Apple-Introduces-Power-Mac-G5-Quad-Power-Mac-G5-Dual/) - documents the high-end dual-core and quad G5 systems shipping in late 2005.
- [Apple - First Intel iMac](https://www.apple.com/au/newsroom/2006/01/10Apple-Unveils-New-iMac-with-Intel-Core-Duo-Processor/) - documents the January 2006 retail Intel Mac launch.
