---
title: "Dumping the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive via dd_rescue"
author: "Nix McRetro"
date: 2016-04-16T13:12:53.000+10:00
categories: [hacks, sega, youtube]
---

{% include youtube.html id="QHFQhVVaCm8" %}

At least I think it was dd_rescue, might have been ddrescue at the start. Either way, a successful dump. Below is the directory structure of the last main folder.

![directory_structure](/assets/images/2016/img_0471.jpg)

If you are just here for the disk image it can be found [here](/files). It is around 1GB compressed and 4.5GB decompressed. Enjoy World Series Baseball 2k2! Or WSB2K2 as it was known amongst the cool kids? Originally posted on [ASSEMBlergames.com](https://web.archive.org/web/20191109235322/https://assemblergames.com/threads/world-series-baseball-2k2-wsb2k2-dumping-from-hkt-0120.60534/). I've got a solid state solution for the SCSI hard drive coming in the mail for the HKT-0120 to bring it back to the best state it has ever been in, not before we tear it down and put it back together though. Might be a while off yet, stay tuned! :D

**Update 2022-10-09**
This is why sleep is important. You can see that I had sd2 instead of sda2 when using ddrescue. ddrescue is the preferred version. dd_rescue is not as good apparently, or rather isn't maintained. ddrescue can be installed on Ubuntu via sudo apt install gddrescue if it isn't already present. It's amazing what you learn as time goes forward.
