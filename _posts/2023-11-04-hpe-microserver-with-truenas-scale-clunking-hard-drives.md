---
title: "HPE MicroServer with TrueNAS Scale - Clunking Hard Drives"
author: "Nix McRetro"
date: 2023-11-04T12:46:01.000+11:00
categories: [guides, news, youtube]
---

{% include youtube.html id="ph_s2SxldPE" %}

I have been listening to my three or four drives go clunk, clunk, clunk for the best part of a year. Initially I thought it must have been something in TrueNAS as these drives, WD Red Pro 16TB - Model WD161KFGX, were silent while running badblock scans on them. Someone said it could be a cache flushing, but I'd moved my system dataset to the mirrored SSDs with no change. So what was it?

![](/assets/images/2023/img_1189.jpg)

Well it turns out, WD put in a feature called "Preventative Wear Leveling" or PWL for short. Apparently it is a feature from 2021 that's sticking around. If the drive is asleep - it won't make the irritating noise every five seconds. If data is being written, it won't do it (duh). But if the drive is spun up and idle it will clunk away.

![](/assets/images/2023/img_1190.jpg)

On one hand I'm glad that I know what it is now. It's a feature, not a bug. Spinning rust. I might try spinning the drives down when I'm not using the NAS. It really is just storage at this point. Extra wear on the heads from sleeping the drives is acceptable. I have multiple backups, so there's no issue if all fail at the same time. Plus failure would let me test my backups too! 😅

 

> But, spinning up every hour, which is more likely- That is ~9,000 cycles per year, and you would take 33 years to exceed that threshold.

Honestly though, I have warranty for another four years. As long as I don't overuse the drives (load cycles) I can't see there being any issues with modifying the sleep settings. The question is, how to make it work best?

![](/assets/images/2023/img_1188.jpg)

There sure is a lot of voodoo when it comes to technology!

 

> Set the standby (spindown) timeout for the drive. The timeout specifies how long to wait in idle (with no disk activity) before turning off the motor to save power. The value of 0 disables spindown, the values from 1 to 240 specify multiples of 5 seconds and values from 241 to 251 specify multiples of 30 minutes.

Should be easy enough. That certainly makes the settings make more sense in TrueNAS. Cobia hasn't really shown any issues which has been nice. I was expecting going from Bluefin to Cobia to have something go wrong, but nothing. Blessed! 😇
