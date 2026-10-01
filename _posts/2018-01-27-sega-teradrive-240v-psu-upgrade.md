---
title: "Sega TeraDrive 240V PSU Upgrade"
author: "Nix McRetro"
date: 2018-01-27T14:50:26.000+11:00
categories: [hacks, repairs, sega]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="FAY_UUh2dNI" %}

Previously, way back in August 2016, I [posted](/sega-teradrive-power-supply-problems/) about having power supply problems on my Sega TeraDrives.

I had considered falling back onto a PSU replacement if replacing parts blindly failed. As it turned out, this was the plan I ended up following. Instead of the PicoPSU, I went with the [Mean Well RD-65A](https://www.meanwell.co.uk/power-supplies/enclosed-power-supplies/rd-65-series), which provides +5V and +12V outputs. Ronnie of ASSEMblergames used the [Mean Well PT-65B](https://www.meanwell.com/Upload/PDF/PT-65/PT-65-SPEC.PDF) for his own TeraDrive, which also provides a -12V rail and can therefore suit hardware that actually needs that negative supply.

![](/assets/images/2018/img_0608.jpg)

Leading up to this, I had replaced a whole heap of components on the PSU. I finally received the last components I was waiting on, C3331 and M5237L, and threw them into the pile of bits to fit alongside B1274. The bad news: it didn't work. The useful part was that the behaviour changed enough to give me more to observe, but it still wasn't enough to identify a single root cause.

![](/assets/images/2018/img_0609.jpg)

The non-functional unit, 0629, showed the readings below. At first I thought I had a no-power situation. Leaving it connected for around a minute eventually produced output, but the machine still would not operate. With no load, the 12V rail also wandered between roughly 10.3V and 10.9V every few seconds while the 5V rail stayed steadier. Those readings describe what this PSU was doing; they do not by themselves establish why it was doing it.

**1135 - Working (Reference)** 12V rail (yellow cable) - no load 11.46V 5V rail (red cables) - no load 5.00V 12V rail (yellow cable) - under load 12.16V 5V rail (red cables) - under load 5.17V

**0629 - Non-functional** 12V rail (yellow cable) - no load 10.93V 5V rail (red cables) - no load 4.93V 12V rail (yellow cable) - under load 12.12V 5V rail (red cables) - under load 4.75 - 4.84V

The component list below is what I recorded from this particular TeraDrive PSU board. It is not a universal recap or repair list for every TeraDrive revision.

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

That was enough tinkering for me, especially with mains voltage, so I decided to terminate the Sega TeraDrive PSU repair and pass the units on to other folk. Not with a bang but a whimper. Mains-powered supplies can remain hazardous after disconnection, and an open-frame replacement also needs proper mounting, insulation and earthing in its final installation. Above is a listing of the major capacitors and some other components on this particular PSU mainboard.

![](/assets/images/2018/img_0607.jpg)

For more information, check out [ASSEMBlergames](https://web.archive.org/web/20191113051221/https://assemblergames.com/threads/sega-teradrive-psu-repair-trinity-help.62709/).


For the earlier retrofit work, see [Sega TeraDrive Retrofitting a Mean Well PT-65B PSU](/sega-teradrive-retrofitting-a-mean-well-pt-65b-psu/).

### Sources

- [MEAN WELL - RD-65 series](https://www.meanwell.co.uk/power-supplies/enclosed-power-supplies/rd-65-series)
- [MEAN WELL - PT-65 series datasheet](https://www.meanwell.com/Upload/PDF/PT-65/PT-65-SPEC.PDF)
- [Archived ASSEMblergames TeraDrive PSU discussion](https://web.archive.org/web/20191113051221/https://assemblergames.com/threads/sega-teradrive-psu-repair-trinity-help.62709/)
