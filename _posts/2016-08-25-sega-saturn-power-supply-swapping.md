---
title: "Sega Saturn Power Supply Swapping"
author: "Nix McRetro"
date: 2016-08-25T19:52:49.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, repairs, sega]
---

![SS - 0801](/assets/images/2016/img_0544.jpg)

Sega Saturn power supplies generally fall into three broad form factors, commonly called Type A, Type B and Type C.

**Type B:** Used through roughly VA1 to VA5. This is the long five-pin supply pictured above. Typical pins: `GND, GND, 3.3 V, 5 V, 9 V`.

![SS - 0802](/assets/images/2016/img_0545.jpg)

**Type C:** Used on later boards. NTSC machines generally have four pins: `GND, GND, 5 V, 5 V`. PAL machines have an additional output, nominally 9 V or 12 V depending on the supply: `GND, GND, 5 V, 5 V, 9 V / 12 V`. Check the actual supply markings rather than assuming every PAL unit is the same.

**Type A:** Used on VA0 boards and mounted to the upper casing. Typical connector positions: `GND, GND, 3.3 V, 5 V, NC, 9 V`.

I originally described that extra PAL rail as being for "SCART RGB switching or something along those lines". Don't quote me on that though. On PAL Saturns, the extra rail appears at the AV connector for SCART automatic switching. It is not part of the RGB video signal itself. Composite or bust! ;)

Like-for-like physical format and pinout matter when swapping supplies. Do not assume that two Saturn PSUs are interchangeable simply because both fit somewhere inside a Saturn case. The replacement supply must also be rated for the local mains voltage.

**Treat these as mains-voltage power supplies, not ordinary low-voltage console boards.**

### Sources

- [Sega Saturn PSU swap discussion by Zyrobs](https://segasaturngroup.proboards.com/thread/8097/jpn-pal-psu-swap?page=1)
- [ConsoleMods - Saturn Video Output Notes](https://consolemods.org/wiki/Saturn%3AVideo_Output_Notes)
- [REXUS NEXUS - ReSaturn PSU: Install Guide](https://rexusnexus.com/installation-and-set-up/)
