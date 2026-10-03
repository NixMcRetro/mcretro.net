---
title: "Hackintosh Rebuild ASRock 775Dual-915GL Overview"
author: "Nix McRetro"
date: 2013-01-09T14:10:10.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [apple, hacks, ibm-pc]
---

{% include youtube.html id="awMk6Oz3sI0" %}

We take a trip down memory lane to my first Hackintosh motherboard, the ASRock 775Dual-915GL. Powered by a wonderfully cheap single-core Celeron, it felt remarkably fast for what it cost and compared very favourably with some of the PowerPC Macs I was using around that period. It certainly cannot be generalised to every G4 and G5 system, especially the high-end dual and quad G5 machines Apple was shipping by late 2005.

![](/assets/images/2013/img_0361.jpg)

The original I built was made back in late 2005 / early 2006. This was about six months after Apple announced the transition to Intel hardware. The motherboard was unusually close to Apple's 2005 Developer Transition Kit platform. The ASRock uses Intel's 915GL chipset with ICH6 and GMA 900 graphics, while the Apple development machine used the closely related 915G with ICH6 and GMA 900. Similar enough to be very interesting for early OSx86 experimentation, but not literally the same chipset. Sound, ethernet, graphics - all worked out of the box on my installation.

Mac OS X 10.4 Tiger was also the Mac OS X generation that bridged the PowerPC-to-Intel transition. Apple publicly demonstrated Intel Tiger and distributed developer-only Intel builds in 2005, while Mac OS X 10.4.4 shipped publicly with the first retail Intel Macs in January 2006.


### Sources

- [ASRock - 775Dual-915GL](https://www.asrock.com/mb/Intel/775Dual-915gl/) - documents the Intel 915GL, ICH6 and GMA 900 platform used by this motherboard.
- [Apple - Apple to Use Intel Microprocessors Beginning in 2006](https://www.apple.com/newsroom/2005/06/06Apple-to-Use-Intel-Microprocessors-Beginning-in-2006/) - Apple's June 2005 Intel transition announcement and Developer Transition Kit context.
- [Pierre Dandumont - Test et analyse du kit de transition Intel (DTK) de 2005](https://www.journaldulapin.com/2016/04/09/dtk-intel-apple/) - the 9 April 2016 firsthand examination identifies the 2005 DTK's 915G chipset and GMA 900 graphics.
- [Apple - Power Mac G5 Quad and Dual](https://www.apple.com/newsroom/2005/10/19Apple-Introduces-Power-Mac-G5-Quad-Power-Mac-G5-Dual/) - documents the high-end dual-core and quad G5 systems shipping in late 2005.
- [Apple - First Intel iMac](https://www.apple.com/au/newsroom/2006/01/10Apple-Unveils-New-iMac-with-Intel-Core-Duo-Processor/) - documents the January 2006 retail Intel Mac launch.
