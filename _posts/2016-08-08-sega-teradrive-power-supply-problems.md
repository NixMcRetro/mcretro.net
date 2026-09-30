---
title: "Sega TeraDrive Power Supply Problems"
author: "Nix McRetro"
date: 2016-08-08T19:07:41.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

![IMG_0645](/assets/images/2016/img_0516.jpg)

One of the reasons I originally ended up with two TeraDrives was for exactly this kind of troubleshooting.

I have a Model 2 with dual floppy drives and a Model 3 with its original 30 MB WDL-330P hard drive and one floppy drive. Both also have XTIDE cards installed.

![IMG_0648](/assets/images/2016/img_0518.jpg)

One machine produced a buzzing / clicking hum through the internal speaker and would not complete POST.

After stripping it back to a minimal configuration and then swapping major modules, the fault followed the power supply.

![IMG_0649](/assets/images/2016/img_0519.jpg)

That gives me:

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

The important result is that the faulty supply collapses badly under load, especially on the 5 V rail.

That establishes the symptom.

It does **not** tell me whether the actual culprit is a capacitor, transformer, transistor or something else.

I originally worried that replacing the supply with something ATX-derived would automatically create a problem because of missing -5 V and -12 V PC rails.

The TeraDrive itself has an unusual power arrangement and does not simply reproduce every conventional PC supply rail at the ISA slots, so that needs to be considered from the actual TeraDrive wiring rather than from a generic "AT versus ATX" assumption.

Plan B was paying somebody who actually enjoys mains power supplies to repair it.

Frankly, that still seems sensible.

**Mains-voltage warning:** this is not a low-voltage console repair. Power supplies can contain lethal voltages and can retain charge after being unplugged.

![IMG_0646](/assets/images/2016/img_0517.jpg)

![IMG_0650](/assets/images/2016/img_0520.jpg)

![IMG_0651](/assets/images/2016/img_0521.jpg)

![IMG_0652](/assets/images/2016/img_0522.jpg)

If you want to follow the original discussion, see the archived [ASSEMblerGames thread](https://web.archive.org/web/20191113051221/https://assemblergames.com/threads/sega-teradrive-psu-repair-trinity-help.62709/).

### Related posts

- [Sega TeraDrive Model 3 Power Supply Failure](/sega-teradrive-model-3-power-supply-failure/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 1)](/sega-teradrive-model-3-faulty-power-supply-part-1/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 2)](/sega-teradrive-model-3-faulty-power-supply-part-2/)
- [Sega TeraDrive - Retrofitting a Mean Well PT-65B PSU](/sega-teradrive-retrofitting-a-mean-well-pt-65b-psu/)
