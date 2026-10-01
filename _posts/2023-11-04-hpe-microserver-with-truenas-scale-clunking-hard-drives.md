---
title: "HPE MicroServer with TrueNAS Scale - Clunking Hard Drives"
author: "Nix McRetro"
date: 2023-11-04T12:46:01.000+11:00
categories: [guides, news, youtube]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="ph_s2SxldPE" %}

I have been listening to my three or four drives go clunk, clunk, clunk for the best part of a year. Initially I thought it must have been something in TrueNAS as these drives, WD Red Pro 16TB - Model WD161KFGX, were silent while running badblock scans on them. Someone said it could be a cache flushing, but I'd moved my system dataset to the mirrored SSDs with no change. So what was it?

![](/assets/images/2023/img_1189.jpg)

Well it turns out I found a very plausible answer. Western Digital users have described a behaviour called "Preventive Wear Leveling", or PWL, involving periodic head movement that can produce a regular clicking noise while some drives are spun up and idle. That matches what I was hearing almost perfectly. I have not found a WD specification for the WD161KFGX that explicitly documents PWL itself, so I would call it the best-supported explanation rather than proof from the model specification.

![](/assets/images/2023/img_1190.jpg)

On one hand I'm glad that I know what the likely noise is now. Spinning rust. I might try spinning the drives down when I'm not using the NAS. It really is just storage at this point. Spindown trades noise and power use for extra start, stop and head-loading activity, so I don't want to churn cycles for no reason. I have multiple backups though, and a drive failure would at least let me test whether I actually know how to restore them! 😅

 

> But, spinning up every hour, which is more likely- That is ~9,000 cycles per year, and you would take 33 years to exceed that threshold.

That's rough arithmetic rather than a drive-life calculation. One event every hour is 8,760 events per year, so "about 9,000" is close enough, but I was also mixing different counters together. A load/unload cycle is not simply identical to one standby timeout firing, so dividing a rated cycle count by 9,000 does not tell me how many years the drives will last.

Honestly though, I have warranty for another four years. As long as I don't churn unnecessary start, stop and load cycles I can't see there being any issues with experimenting with the sleep settings. The question is, how to make it work best?

![](/assets/images/2023/img_1188.jpg)

There sure is a lot of voodoo when it comes to technology!

 

> Set the standby (spindown) timeout for the drive. The timeout specifies how long to wait in idle (with no disk activity) before turning off the motor to save power. The value of 0 disables spindown, the values from 1 to 240 specify multiples of 5 seconds and values from 241 to 251 specify multiples of 30 minutes.

That raw ATA description made the setting easier to understand. TrueNAS itself exposes the usual standby choices as minute intervals, and one practical catch is that its documentation notes temperature monitoring is disabled while a disk is in standby. Cobia hasn't really shown any issues which has been nice. I was expecting going from Bluefin to Cobia to have something go wrong, but nothing. Blessed! 😇

### Sources

- [TrueNAS Community - New WD Red Pros clicking every 5 seconds, described as Preventive Wear Leveling](https://www.truenas.com/community/threads/new-wd-red-pros-clicking-every-5-seconds-preventive-wear-leveling-firmware-feature.105866/)
- [TrueNAS Documentation - Disks](https://www.truenas.com/docs/scale/storage/disks/disksscreen/)
