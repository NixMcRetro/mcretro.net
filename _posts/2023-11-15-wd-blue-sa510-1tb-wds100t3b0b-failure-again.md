---
title: "WD Blue SA510 1TB WDS100T3B0B Failure... Again"
author: "Nix McRetro"
date: 2023-11-15T13:36:30.000+11:00
categories: [raspberry-pi]
last_modified_at: 2026-10-18
share_description: >-
  Another WD Blue SA510 SSD acts suspiciously, with baffling SMART counters and a new critical firmware update. The GeoCities drives strike again. 💾
---

![Opened grey UGREEN M.2 SSD enclosure showing a green circuit board and chips inside, with its USB-C connector lying beside it.](/assets/images/2023/img_1208.jpg)

*One of the WD Blue SA510 drives back in the UGREEN enclosure, ready for another round of investigating. Oh joy.*
{: .media-caption }

Oh my sweet WD Blue SA510 M.2 SATA 2280 blade drives. [You are such trash](/geocities-downtime-wd-blue-sa510-1tb-wds100t3b0b-failure/). I had two of these for GeoCities, one master and one backup. However, since [I took GeoCities offline](/geocities-archive-retired-dockerisation-abandoned/) I thought I'd erase and sell the drives. But look at what I found when looking at the drive stats with [DriveDx](https://binaryfruit.com/drivedx).

![DriveDx summary for a 1 TB WD Blue SA510 SSD showing 100% health, one warning, retired block count 20 and NAND write counters around 824 TB each.](/assets/images/2023/img_1204.jpg)

*DriveDx reckoned the drive was at 100% health, while also flagging a warning and some absolutely ridiculous NAND-write figures. Righto.*
{: .media-caption }

Yeahhh, DriveDx was displaying 824.6 TB under NAND Writes TLC and 824.9 TB under NAND Writes SLC. Two separate counters, not something I was going to add together and call total writes. I also wasn't sure how accurately DriveDx was decoding those particular WD values. NAND writes aren't the same as host writes either, thanks to things like caching and garbage collection. Still, those numbers looked absolutely wild compared with the 1.8 TB of host writes reported below. And retired blocks? Not exactly filling me with confidence. Digging a little deeper we find...

![DriveDx SMART indicator list for a WD Blue SA510, including NAND Writes TLC at 824.6 TB, NAND Writes SLC at 824.9 TB and Host Writes at 1.8 TB.](/assets/images/2023/img_1205.jpg)

*There are those absurd NAND counters again, sitting above a much more modest 1.8 TB of host writes. Something about those numbers looked off.*
{: .media-caption }

A massive 1.8 TB of host writes, basically the GeoCities dataset copied twice. The drive is rated for 400 TBW, but that isn't some magical number where WD expects it to drop dead. It's an endurance and warranty specification, and 1.8 TB isn't even remotely close. Guess I better hook it into the old WD Dashboard and see what it says.

![Western Digital Dashboard tools screen offering firmware version 52046100 for a drive currently running 52020100, with SMART test controls below.](/assets/images/2023/img_1207.jpg)

*Western Digital had another firmware update waiting, this one for a reported read-only issue. Not exactly the release notes I wanted to see.*
{: .media-caption }

Oh, a [new critical firmware update](https://web.archive.org/web/20231015000448/https://support-en.wd.com/app/answers/detailweb/a_id/50208) has appeared.

> **October 27, 2022 - Firmware v52020100 Addresses an issue in which a drive may not be recognized by the computer.**

So firmware 52020100 should solve a pretty big issue, not being able to see the drive at all - this is what was installed on both my SA510s. Then there's this new update:

> **May 25, 2023 - Firmware v52046100 Addresses an issue in which a drive may enter a read-only state.**

Hmmm right. Read-only is at least a safer failure mode than silently eating writes. With just 1.8 TB of host writes, I certainly wasn't blaming this on wearing out the drive through normal use. Firmware was looking like a pretty good suspect, especially after what happened with my first SA510. Whether it also explained the strange SMART values was another question. Good thing there's a five-year warranty and I have consumer rights against dud hardware.

![Western Digital Dashboard overview of a WD Blue SA510 SSD running firmware 52046100, with drive health at 40% and temperature at 32°C.](/assets/images/2023/img_1209.jpg)

*Firmware updated, and WD Dashboard now decided the drive had 40% health. DriveDx had given it 100%. Wonderful consistency.*
{: .media-caption }

Through the motions we go. Updating firmware doesn't replace the flash memory, and without knowing how either tool was calculating its figures I wasn't going to pretend the screenshots explained everything.

![Western Digital Dashboard SMART data window listing media wear-out indicator 60.83%, spare blocks at 100%, and total reported writes and reads.](/assets/images/2023/img_1210.jpg)

*The Dashboard's SMART table raised even more questions, including its 60.83% media wear-out indicator. At least the numbers were staying interesting.*
{: .media-caption }

At least this second drive had accumulated 6,586 power-on hours before I noticed trouble, compared with only 606 hours on the first failed drive. That's more than ten times the runtime, but two dodgy SSDs are hardly an endurance study. It still only had 59 power cycles because its main job was hosting GeoCities - lots of reading.

![Western Digital warranty page confirming a WD Blue SA510 is under limited warranty, with a support chat directing the user to Australian support.](/assets/images/2023/img_1206.jpg)

*The drive was still under warranty, but apparently I needed to speak to the Australian support team instead. Another exciting chapter in the never-ending saga of this SSD!*
{: .media-caption }

Tech support was less than useful, directing me to India when I was trying to discuss Australian consumer rights. But you've gotta feel bad for the [people buying lots of these](https://www.reddit.com/r/pcmasterrace/comments/wk6myd/wd_blue_sa510_vs_3d_nand_sata_3/) based on the success of the earlier WD Blue 3D NAND drives. For now I'll just use the other working drive as a throw about spare and wait for it to fail in a new quirky way. If anyone can do it WD flash division can! 💁‍♀️


### Sources

- [Western Digital - WD Blue SA510 SATA SSD critical firmware update](https://web.archive.org/web/20231015000448/https://support-en.wd.com/app/answers/detailweb/a_id/50208)
- [Western Digital - WD Blue SA510 SATA SSD product brief, October 2023](https://documents.sandisk.com/content/dam/asset-library/en_us/assets/public/western-digital/product/internal-drives/wd-blue-ssd/product-brief-wd-blue-sa510-sata-ssd.pdf)
- [Western Digital: S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology)](https://support-en.wd.com/app/answers/detailweb/a_id/12163)

### Related Posts

- [GeoCities Downtime - WD Blue SA510 1TB WDS100T3B0B Failure](/geocities-downtime-wd-blue-sa510-1tb-wds100t3b0b-failure/)
- [GeoCities Archive Retired, Dockerisation Abandoned](/geocities-archive-retired-dockerisation-abandoned/)
