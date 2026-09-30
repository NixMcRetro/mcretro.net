---
title: "Sega TeraDrive - Retrofitting a Mean Well PT-65B PSU"
author: "Nix McRetro"
date: 2016-10-10T17:31:52.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, ibm-pc, sega]
---

![td_header](/assets/images/2016/img_0575.jpg)

Lately I'd noticed people replacing failed TeraDrive power supplies or looking for an alternative to running a Japanese supply through a large external transformer.

These photographs, courtesy of **DeChief on ASSEMblerGames**, show one approach using a Mean Well PT-65B open-frame power supply inside the original TeraDrive PSU housing.

This is **not my own installation shown here**, so I want to keep the attribution clear.

The PT-65B is a triple-output supply providing:

- +5 V
- +12 V
- -12 V

It also accepts a universal 90 to 264 VAC input, which makes it interesting for replacing region-specific mains hardware.

![photo1](/assets/images/2016/img_0566.jpg)

The board fits remarkably well inside the original enclosure.

![photo2](/assets/images/2016/img_0567.jpg)

![photo3](/assets/images/2016/img_0568.jpg)

![photo4](/assets/images/2016/img_0569.jpg)

![photo5](/assets/images/2016/img_0570.jpg)

![photo6](/assets/images/2016/img_0571.jpg)

![photo7](/assets/images/2016/img_0572.jpg)

![photo8](/assets/images/2016/img_0573.jpg)

![photo9](/assets/images/2016/img_0574.jpg)

I originally described the -12 V output as something that could simply be wired into the TeraDrive ISA slots.

Better wording is that the PT-65B provides a negative rail that the stock TeraDrive power arrangement does not normally provide. Whether to route that anywhere in the machine depends on the specific expansion hardware and wiring design rather than "more rails must be better".

Most importantly:

**this is an open-frame mains power supply.**

The photographs show the physical retrofit, not a complete electrical-safety guide.

Correct earthing, fusing, insulation, clearances, mains wiring and enclosure safety all matter.

Enjoy the photos.

And thanks again to DeChief for documenting the installation.

### Related posts

- [Sega TeraDrive Model 3 Power Supply Failure](/sega-teradrive-model-3-power-supply-failure/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 1)](/sega-teradrive-model-3-faulty-power-supply-part-1/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 2)](/sega-teradrive-model-3-faulty-power-supply-part-2/)
- [Sega TeraDrive Power Supply Problems](/sega-teradrive-power-supply-problems/)

### Sources

- [Mean Well - PT-65 Series](https://www.meanwellaustralia.com.au/products/PT-65)
