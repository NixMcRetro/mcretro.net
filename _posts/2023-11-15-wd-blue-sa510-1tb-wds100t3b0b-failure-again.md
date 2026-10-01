---
title: "WD Blue SA510 1TB WDS100T3B0B Failure... Again"
author: "Nix McRetro"
date: 2023-11-15T13:36:30.000+11:00
categories: [raspberry-pi]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2023/img_1208.jpg)

Oh my sweet WD Blue SA510 M.2 SATA 2280 blade drives. [You are such trash](/geocities-downtime-wd-blue-sa510-1tb-wds100t3b0b-failure/). I had two of these for GeoCities, one master and one backup. However, since [I took GeoCities offline](/geocities-archive-retired-dockerisation-abandoned/) I thought I'd erase and sell the drives. But look at what I found when looking at the drive stats with [DriveDX](https://binaryfruit.com/drivedx).

![](/assets/images/2023/img_1204.jpg)

Yeahhh, DriveDX was reporting 824TB of NAND writing across TLC and SLC. That is internal NAND activity rather than host writes, so it is not directly comparable with the 1.8TB written by the computer. SSD firmware does its own internal garbage collection, caching and data movement, so NAND writes can exceed host writes. Even so, that number looked absolutely wild. Those retired blocks weren't exactly filling me with confidence either. Digging a little deeper we find...

![](/assets/images/2023/img_1205.jpg)

A massive 1.8TB of host writes, basically the GeoCities dataset copied twice. The drive is rated for 400TBW, but that does **not** mean WD expected it to fail at 400TB. TBW is an endurance and warranty specification, not a predicted death date. Either way, 1.8TB of host writes was nowhere remotely close to that figure. Guess I better hook it into the old WD Dashboard and see what it says.

![](/assets/images/2023/img_1207.jpg)

Oh, a [new critical firmware update](https://web.archive.org/web/20231015000448/https://support-en.wd.com/app/answers/detailweb/a_id/50208) has appeared.

> **October 27, 2022 - Firmware v52020100 Addresses an issue in which a drive may not be recognized by the computer.**

So firmware 52020100 should solve a pretty big issue, not being able to see the drive at all - this is what was installed on both my SA510s. Then there's this new update:

> **May 25, 2023 - Firmware v52046100 Addresses an issue in which a drive may enter a read-only state.**

Hmmm right. Read-only is at least a safer failure mode than silently eating writes. More importantly, my host-write count was nowhere near the drive's 400TBW endurance rating, so I can't explain what I was seeing as simple write-endurance exhaustion. The later firmware fix makes firmware a very relevant suspect, just as it was with the first failed SA510, but it still doesn't prove every weird SMART value here came from firmware. Good thing there's a five year warranty and I have consumer rights against dud hardware.

![](/assets/images/2023/img_1209.jpg)

Through the motions we go. Updated firmware OK, but DriveDX was still reporting only 40% health. Updating the firmware was never going to magically reset the underlying SMART history or replace worn or retired flash blocks.

![](/assets/images/2023/img_1210.jpg)

At least this second drive had accumulated 6586 power-on hours before I noticed trouble, compared with only 606 hours on the first failed drive. That's more than ten times the runtime, but two dodgy SSDs are not exactly an endurance study. It still only had 59 power cycles because its main job was hosting GeoCities - lots of reading.

![](/assets/images/2023/img_1206.jpg)

Tech support was less than useful directing me to India who may not be aware of consumer rights. But you've gotta feel bad for the [people buying lots of these](https://www.reddit.com/r/pcmasterrace/comments/wk6myd/wd_blue_sa510_vs_3d_nand_sata_3/) based on the success of previous revision WDS100T2XXX working as expected. For now I'll just use the other working drive as a throw about spare and wait for it to fail in a new quirky way. If anyone can do it WD flash division can! 💁‍♀️


### Sources

- [SanDisk / Western Digital - WD Blue SA510 SATA SSD critical firmware updates](https://support-en.sandisk.com/app/answers/detailweb/a_id/50208)
- [Western Digital - Internal SSD endurance and warranty periods](https://support-eu.sandisk.com/app/answers/detailweb/a_id/30797/~/wd-internal-ssd-endurance-and-warranty-periods)
- [Western Digital - S.M.A.R.T. attributes](https://support-en.wd.com/app/answers/detail/a_id/12163)
