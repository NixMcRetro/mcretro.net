---
title: "Sega Saturn Power Supply Swapping"
author: "Nix McRetro"
date: 2016-08-25T19:52:49.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, repairs, sega]
---

![SS - 0801](/assets/images/2016/img_0544.jpg)

Sega Saturn power supplies generally fall into three broad service-manual form factors.

**Type A**

Used on VA0 boards and mounted to the upper casing.

Typical pins:

`GND, GND, 3.3 V, 5 V, NC, 9 V`

**Type B**

Used through roughly VA1 to VA5.

This is the long five-pin supply.

Typical pins:

`GND, GND, 3.3 V, 5 V, 9 V`

![SS - 0802](/assets/images/2016/img_0545.jpg)

**Type C**

Used on later boards.

NTSC machines generally have four pins:

`GND, GND, 5 V, 5 V`

PAL machines generally have an additional 9 V / 12 V output.

I originally described that extra PAL rail as being for "SCART RGB switching or something".

More precisely, it is used for SCART automatic input / aspect switching. It is not the RGB video signal itself.

Like-for-like physical format and pinout matter when swapping supplies.

Do not assume that two Saturn PSUs are interchangeable simply because both fit somewhere inside a Saturn case.

And because these boards connect directly to mains electricity:

**Treat them as mains-voltage power supplies, not ordinary low-voltage console boards.**

### Sources

- [Sega Saturn PSU swap discussion by Zyrobs](https://segasaturngroup.proboards.com/thread/8097/jpn-pal-psu-swap?page=1)
