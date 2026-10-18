---
title: "WD Blue SA510 1TB WDS100T3B0B Failure... Again"
author: "Nix McRetro"
date: 2023-11-15T13:36:30.000+11:00
categories: [raspberry-pi]
last_modified_at: 2026-10-18
---

![](/assets/images/2023/img_1208.jpg)

Oh my sweet WD Blue SA510 M.2 SATA 2280 blade drives. [You are such trash](/geocities-downtime-wd-blue-sa510-1tb-wds100t3b0b-failure/). I had two of these for GeoCities, one master and one backup. However, since [I took GeoCities offline](/geocities-archive-retired-dockerisation-abandoned/) I thought I'd erase and sell the drives. But look at what I found when looking at the drive stats with [DriveDx](https://binaryfruit.com/drivedx).

![](/assets/images/2023/img_1204.jpg)

Yeahhh, DriveDx was displaying 824.6TB under NAND Writes TLC and 824.9TB under NAND Writes SLC. Those are two separate displayed counters, not a combined total, and I haven't independently verified their vendor-specific decoding. NAND activity is also different from the 1.8TB of host writes reported below: firmware can move data internally for caching and garbage collection. Even so, those numbers looked absolutely wild. Those retired blocks weren't exactly filling me with confidence either. Digging a little deeper we find...

![](/assets/images/2023/img_1205.jpg)

A massive 1.8TB of host writes, basically the GeoCities dataset copied twice. The drive is rated for 400TBW, but that does **not** mean WD expected it to fail at 400TB. TBW is an endurance and warranty specification, not a predicted death date. Either way, 1.8TB of host writes was nowhere remotely close to that figure. Guess I better hook it into the old WD Dashboard and see what it says.

![](/assets/images/2023/img_1207.jpg)

Oh, a [new critical firmware update](https://web.archive.org/web/20231015000448/https://support-en.wd.com/app/answers/detailweb/a_id/50208) has appeared.

> **October 27, 2022 - Firmware v52020100 Addresses an issue in which a drive may not be recognized by the computer.**

So firmware 52020100 should solve a pretty big issue, not being able to see the drive at all - this is what was installed on both my SA510s. Then there's this new update:

> **May 25, 2023 - Firmware v52046100 Addresses an issue in which a drive may enter a read-only state.**

Hmmm right. Read-only is at least a safer failure mode than silently eating writes. More importantly, my host-write count was nowhere near the drive's 400TBW endurance rating, so I can't explain what I was seeing as simple write-endurance exhaustion. The later firmware fix makes firmware a very relevant suspect, just as it was with the first failed SA510, but it still doesn't prove every weird SMART value here came from firmware. Good thing there's a five year warranty and I have consumer rights against dud hardware.

![](/assets/images/2023/img_1209.jpg)

Through the motions we go. Updated firmware OK, but WD Dashboard reported only 40% health. The earlier DriveDx screenshot had shown 100%, so the two tools weren't agreeing. A firmware update doesn't replace flash hardware, but these screenshots don't establish how either tool calculated its health figure or whether the NAND-write figures were decoded correctly.

![](/assets/images/2023/img_1210.jpg)

At least this second drive had accumulated 6586 power-on hours before I noticed trouble, compared with only 606 hours on the first failed drive. That's more than ten times the runtime, but two dodgy SSDs are not exactly an endurance study. It still only had 59 power cycles because its main job was hosting GeoCities - lots of reading.

![](/assets/images/2023/img_1206.jpg)

Tech support was less than useful, directing me to India when I was trying to discuss Australian consumer rights. But you've gotta feel bad for the [people buying lots of these](https://www.reddit.com/r/pcmasterrace/comments/wk6myd/wd_blue_sa510_vs_3d_nand_sata_3/) based on the success of the earlier WD Blue 3D NAND drives. For now I'll just use the other working drive as a throw about spare and wait for it to fail in a new quirky way. If anyone can do it WD flash division can! 💁‍♀️


### Sources

- [Western Digital - WD Blue SA510 SATA SSD critical firmware update](https://web.archive.org/web/20231015000448/https://support-en.wd.com/app/answers/detailweb/a_id/50208)
- [Western Digital - WD Blue SA510 SATA SSD product brief, October 2023](https://documents.sandisk.com/content/dam/asset-library/en_us/assets/public/western-digital/product/internal-drives/wd-blue-ssd/product-brief-wd-blue-sa510-sata-ssd.pdf)
- [Western Digital - S.M.A.R.T. Self-Monitoring Analysis and Reporting Technology](https://support-en.wd.com/app/answers/detailweb/a_id/12163)

### Related posts

- [GeoCities Downtime - WD Blue SA510 1TB WDS100T3B0B Failure](/geocities-downtime-wd-blue-sa510-1tb-wds100t3b0b-failure/)
- [GeoCities Archive Retired, Dockerisation Abandoned](/geocities-archive-retired-dockerisation-abandoned/)
