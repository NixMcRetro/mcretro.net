---
title: "Sega TeraDrive Power Supply Problems"
author: "Nix McRetro"
date: 2016-08-08T19:07:41.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, repairs, sega]
---

![IMG_0645](/assets/images/2016/img_0516.jpg)

The faulty supply pictured above is an **SPS-356JU**, part **400-5142**. Its label lists **+5 VDC at 5 A** and **+12 VDC at 1 A**. The TeraDrive's serial number is **102000629**.

One of the reasons I originally ended up with two TeraDrives was for exactly this kind of troubleshooting. Unfortunately, swapping parts only narrows things down to a module, not the failed component inside it. I have a Model 2 with dual floppy drives and a Model 3 with its original 30 MB WDL-330P hard drive, hilarious edge connector and one floppy drive. Both also have XTIDE cards installed with at least 2 GB of storage.

![IMG_0648](/assets/images/2016/img_0518.jpg)

One machine produced a buzzing / clicking hum through the internal speaker and would not complete POST. After stripping it back to a minimal configuration without any change, I swapped the power supply. Sure enough, it roared back to life. The fault followed the original supply.

![IMG_0649](/assets/images/2016/img_0519.jpg)

That gives me a faulty supply identified here as **0629** and a working reference supply as **1135**. I can't see any obvious physical anomalies, such as blown caps, with the naked eye. Have a look at the photos below and see if you can spot anything peculiar.

**1135 - working reference PSU**

- 12 V rail, no load: 11.46 V
- 5 V rail, no load: 5.00 V
- 12 V rail, powered on: 12.16 V
- 5 V rail, powered on: 5.17 V

**0629 - faulty PSU**

- 12 V rail, no load: 11.14 V
- 5 V rail, no load: 4.93 V
- 12 V rail, powered on: 10.73 V
- 5 V rail, powered on: 3.10 V

The important result is that the faulty supply collapses badly under load, especially on the 5 V rail. Bad capacitor? Transformer? Transistor? Search me! At this point that establishes the symptom, not the culprit.

Plan B was paying somebody who actually enjoys mains power supplies to repair it. Frankly, that still seems sensible. I'm not terribly fond of working on mains power devices.

**Mains-voltage warning:** this is not a low-voltage console repair. Power supplies can contain lethal voltages and can retain charge after being unplugged.

![IMG_0646](/assets/images/2016/img_0517.jpg)

Actually there was a Plan C as well: somehow adapting a PicoPSU. At the time I was worried about getting the -5 V and -12 V rails I thought I needed from an ATX-derived supply. That concern alone did not establish whether a particular PicoPSU would work; any replacement needs to be checked against the actual TeraDrive wiring and expansion requirements. Hopefully my knight in shining armour answers the call.

![IMG_0650](/assets/images/2016/img_0520.jpg)

![IMG_0651](/assets/images/2016/img_0521.jpg)

![IMG_0652](/assets/images/2016/img_0522.jpg)

If you want to follow the original discussion, see the archived [Sega TeraDrive PSU Repair - Trinity! Help!](https://web.archive.org/web/20191113051221/https://assemblergames.com/threads/sega-teradrive-psu-repair-trinity-help.62709/) thread on ASSEMblerGames.

### Related posts

- [Sega TeraDrive Model 3 Power Supply Failure](/sega-teradrive-model-3-power-supply-failure/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 1)](/sega-teradrive-model-3-faulty-power-supply-part-1/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 2)](/sega-teradrive-model-3-faulty-power-supply-part-2/)
- [Sega TeraDrive - Retrofitting a Mean Well PT-65B PSU](/sega-teradrive-retrofitting-a-mean-well-pt-65b-psu/)
