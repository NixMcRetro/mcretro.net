---
title: "Sega TeraDrive Model 3 - Faulty Power Supply (Part 3)"
author: "Nix McRetro"
date: 2019-12-22T09:18:56.000+11:00
last_modified_at: 2026-10-22
categories: [ibm-pc, repairs, sega]
---


{% include youtube.html id="LldRVzrKp10" %}

We're back inside the Sega TeraDrive Model 3! After leaving the power-supply investigation sitting around for rather a long time, I thought it was about time to finish what we started in March 2016. Before ordering parts, I wanted to make sure the original fault was still there.

The problem had been incorrect voltages under load, accompanied by an unpleasant buzzing noise from the internal speaker. Sometimes the machine would fail to start properly, so I connected everything for another test and watched to see what happened. Initially it seemed rather uncooperative, and I had to check the setup before getting the fault to appear again.

There it is! The incorrect voltage returned, and I shut the machine down rather than leave it running like that. The problem was still present, including when testing the Mega Drive side of the hardware. Not exactly wonderful news for the TeraDrive, but at least I wasn't chasing a fault that had mysteriously disappeared.

I've also been discussing this with Ronnie and some of the knowledgeable people over on ASSEMbler Games. Ronnie has done some rather impressive work with the TeraDrive hardware, including modifications that are well beyond what I'm attempting here. His suggestions helped narrow down a few places to investigate in the power supply.

With the supply removed, I started identifying the components that might need attention. There are approximately nine electrolytic capacitors, along with several transistors, diodes and other semiconductors. One Nichicon capacitor on the low-voltage side looked particularly suspicious, although that doesn't establish it as the faulty component.

The board contains a mixture of Sanyo, Nichicon and Rubycon capacitors. There is also a 2.5 A, 250 V fuse marking and a collection of rather substantial components on the mains side. It's an interesting little power supply, even if I would much rather be looking at it while the TeraDrive was working.

I'd certainly prefer to discover a failing capacitor or another replaceable component than find out the transformer itself has gone bad. Some of these parts would be rather difficult to replace, especially if they were custom-made for the original power supply.

The current plan is to gather the remaining components, starting with the electrolytics on the low-voltage side, and continue checking the other parts as necessary. I've ordered a few more bits and pieces, so I'll probably put the machine back together while I wait. Otherwise I'll forget where everything goes!

There are also alternative power-supply arrangements worth investigating if the original turns out to be beyond economical repair. For now, though, I'd still like to see whether the original unit can be saved.

**Mains-voltage warning:** This is an open power supply containing potentially dangerous voltages, including stored charge after disconnection. Internal repairs require appropriate electrical expertise and safety equipment.

**Related Posts**

- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 1)](/sega-teradrive-model-3-faulty-power-supply-part-1/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 2)](/sega-teradrive-model-3-faulty-power-supply-part-2/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 4)](/sega-teradrive-model-3-faulty-power-supply-part-4/)

**Sources**

- [iFixit - Device Safety](https://www.ifixit.com/Info/Device_Safety)
