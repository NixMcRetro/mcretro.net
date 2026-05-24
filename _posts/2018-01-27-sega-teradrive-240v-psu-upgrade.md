---
title: "Sega TeraDrive 240V PSU Upgrade"
author: "Nix McRetro"
date: 2018-01-27T14:50:26.000+11:00
categories: [hacks, repairs, sega]
---

{% include youtube.html id="FAY_UUh2dNI" %}

Previously, way back in August 2016, I [posted](/sega-teradrive-power-supply-problems/) about having power supply problems on my Sega TeraDrives.

I had considered falling back onto a PSU replacement if replacing parts blindly failed. As it turned out this was the plan I ended up following. However, instead of the PicoPSU, I ended up going with the [Mean Well RD-65A](http://www.meanwelljapan.com/upload/pdf/RD-65/RD-65-SPEC.PDF) power supply. Ronnie of ASSEMblergames went with the [Mean Well PT-65B](https://www.meanwellaustralia.com.au/sites/default/files/2025-01/MEAN%20WELL%20PT-65%20DATA%20SHEET.pdf) for his own TeraDrive, which is great for certain old ISA cards as they require a negative voltage rail.

![](/assets/images/2018/img_0608.jpg)

Leading up to this though, I had replaced a whole heap of components on the PSU. I finally received the last components I was waiting on (C3331 and M5237L) and threw them into the pile of bits to fit alongside B1274. The bad news, it didn't work. The good news, even more fault was detected. It seems as though the power supply was having issues getting enough juice through quick enough.

![](/assets/images/2018/img_0609.jpg)

The non-funcitonal unit was showing the values below (under 0629). At first I thought I had a no-power situation - it was close. Leaving the PSU connected for around a minute allowed it to charge up and then push through insufficient power... to do nothing. I did notice that the 12V rail with no load was jumping between 10.9x and 10.3x every few seconds, while the 5V rail remained steady.

**1135 - Working (Reference)** 12V rail (yellow cable) - no load 11.46V 5V rail (red cables) - no load 5.00V 12V rail (yellow cable) - under load 12.16V 5V rail (red cables) - under load 5.17V

**0629 - Non-functional** 12V rail (yellow cable) - no load 10.93V 5V rail (red cables) - no load 4.93V 12V rail (yellow cable) - under load 12.12V 5V rail (red cables) - under load 4.75 - 4.84V

```
===========================================================================
C6     330uF    200V    105°C    H=31mm    W=22mm    "Rubycon"
C7     4.7uF    350V    105°C    H=16mm    W=10mm
C9     47uF      50V    105°C    H=11mm    W=6mm
C12    1000uF    35V    105°C    H=22mm    W=12mm
C14    1000uF    16V    105°C    H=16mm    W=10mm
C16    6800uF    10V    105°C    H=37mm    W=12mm    "Nichicon VZ(M)"
C17    3300uF    10V    105°C    H=22mm    W=12mm    "Sanyo"
C19    10uF      50V    105°C    H=11mm    W=5mm
C21    10uF      50V    105°C    H=11mm    W=5mm

IC2   M5237L    TO-92L
Q1    2SK723
Q2    B1274
Q3    C3331
===========================================================================
```

That was enough tinkering for me though, especially with mains voltage, so I decided to terminate the Sega TeraDrive PSU repair and pass the units on to other folk. Not with a bang but a whimper. Above is a listing of the major capacitors and some other components on the PSU mainboard.

![](/assets/images/2018/img_0607.jpg)

For more information, check out [ASSEMBlergames](https://web.archive.org/web/20191113051221/https://assemblergames.com/threads/sega-teradrive-psu-repair-trinity-help.62709/).
