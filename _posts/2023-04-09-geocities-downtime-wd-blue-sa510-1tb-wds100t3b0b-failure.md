---
title: "GeoCities Downtime - WD Blue SA510 1TB WDS100T3B0B Failure"
author: "Nix McRetro"
date: 2023-04-09T13:15:37.000+10:00
categories: [raspberry-pi]
---

![](/assets/images/2023/img_1002.jpg)

Back in late-December, and I'm talking right on 31st December 2022, GeoCities crashed hard. All thanks to poorly written firmware by Western Digital. Firmwares 52008100 and 52015100, I'm looking at you!

![](/assets/images/2023/img_1003.jpg)

The hardware failure of the the WD Blue SATA blade hard drive powering GeoCities was enough to take it offline. It was a WD Blue SA510 1TB model WDS100T3B0B.

![](/assets/images/2023/img_1007.jpg)

After 606 hours and 43 power cycles it was in read-only mode (GeoCities data is still there when read with [iBored](https://apps.tempel.org/iBored/)) in Ubuntu and Mac OS but doesn't show anything in Windows. Being overly cautious, I had another drive ready to go. The bad news is, that other drive was of the same vintage. It should be noted that the 606 power-on hours is probably a result of being on since the [RetroChallenge 2022/10](https://www.retrochallenge.org/2022/11/finish-line.html).

![](/assets/images/2023/img_1006.jpg)

The above is my secondary drive (offline backup) for GeoCities. Interestingly it updated without any issues. It had 2 hours of uptime and 26 power cycles, somehow. The firmware was also 52008100 (bad) but updated to 52020100 (good) without any issues.

![](/assets/images/2023/img_1004.jpg)

[I was not alone](https://community.wd.com/t/wd-blue-250-gb-sa510-issues/279814). Both drives were running some [bad firmware from Western Digital](https://web.archive.org/web/20230519165540/https://support-en.wd.com/app/answers/detailweb/a_id/50208). The good news is, [there was an update](https://web.archive.org/web/20231015000448/https://support-en.wd.com/app/answers/detailweb/a_id/50208/kw/SA510).

![](/assets/images/2023/img_1005.jpg)

The main GeoCities drive couldn't even update from the bad firmware to the new fixed firmware. Firmware 52008100 (bad) to 52020100 (good) via WD Dashboard in Windows. After a quick warranty check and message to the initial seller, it was sent back for repair or replacement.

![](/assets/images/2023/img_1008.jpg)

Not too long later I received a replacement and copied GeoCities back across, completely forgot the mount point and nearly set fire to my Raspberry Pi 4. Mission accomplished! 🤷‍♀️
