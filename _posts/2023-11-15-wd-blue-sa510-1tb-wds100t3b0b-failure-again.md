---
title: "WD Blue SA510 1TB WDS100T3B0B Failure... Again"
author: "Nix McRetro"
date: 2023-11-15T13:36:30.000+11:00
categories: [raspberry-pi]
---

![](/assets/images/2023/img_1208.jpg)

Oh my sweet WD Blue SA510 M.2 SATA 2280 blade drives. [You are such trash](/geocities-downtime-wd-blue-sa510-1tb-wds100t3b0b-failure/). I had two of these for GeoCities, one master and one backup. However, since [I took GeoCities offline](/geocities-archive-retired-dockerisation-abandoned/) I thought I'd erase and sell the drives. But look at what I found when looking at the drive stats with [DriveDX](https://binaryfruit.com/drivedx).

![](/assets/images/2023/img_1204.jpg)

Yeahhh 824 TB of NAND writing (TLC and SLC). That doesn't sound right. Those retired blocks are usually not a good sign either. Digging a little deeper we find...

![](/assets/images/2023/img_1205.jpg)

A massive 1.8 TB of host writes, GeoCities dataset copied twice. 400 TBW is where WD expected the drive to fail [according to the data sheet](https://web.archive.org/web/20240331045530/https://documents.westerndigital.com/content/dam/doc-library/en_us/assets/public/western-digital/product/internal-drives/pc-sa510-ssd/product-brief-pc-sa510-sata-ssd.pdf). Guess I better hook it into the old WD Dashboard and see what it says.

![](/assets/images/2023/img_1207.jpg)

Oh, a [new critical firmware update](https://support-en.wd.com/app/answers/detailweb/a_id/50208) has appeared.

 

> October 27, 2022 – Firmware v52020100 Addresses an issue in which a drive may not be recognized by the computer.

So firmware 52020100 should solve a pretty big issue, not being able to see the drive at all - this is what was installed on both my SA510s. Then there's this new update:

 

> May 25, 2023 – Firmware v52046100 Addresses an issue in which a drive may enter a read-only state.

Hmmm right, are you still trying to work out how your own tech works WD? I mean read-only is better and possibly explained by the excessive writes going on. Good thing there's a five year warranty and I have consumer rights against dud hardware.

![](/assets/images/2023/img_1209.jpg)

Through the motions we go. Updated firmware OK, but the drive health is still only 40%.

![](/assets/images/2023/img_1210.jpg)

I guess you can't bring back the drive from the brink. They've improved on the uptime before failure at least. Instead of 600 hours before failure it is now ten times that at 6586 hours. Still only 59 power cycles as the drive was just being used as to host GeoCities - lots of reading.

![](/assets/images/2023/img_1206.jpg)

Tech support was less than useful directing me to India who may not be aware of consumer rights. But you've gotta feel bad for the [people buying lots of these](https://www.reddit.com/r/pcmasterrace/comments/wk6myd/wd_blue_sa510_vs_3d_nand_sata_3/) based on the success of previous revision WDS100T2XXX working as expected. For now I'll just use the other working drive as a throw about spare and wait for it to fail in a new quirky way. If anyone can do it WD flash division can! 💁‍♀️
