---
title: "Sega Saturn External PSU DC-DC Converter Test"
author: "Nix McRetro"
date: 2012-04-23T21:08:18.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, repairs, sega]
---

{% include youtube.html id="rkyVIng0x90" %}

The DC-DC step-down converters for my Sega Saturn external power supply project have finally arrived. I've bought three of them, along with a 12 V, 4 A power adapter and a DC socket, all from eBay. Apparently eBay is supplying most of the parts for this particular adventure!

The plan is to use the 12 V input to generate the 9 V, 5 V, and 3.3 V rails required by my early Saturn. That should let me replace its original internal PSU with an externally powered arrangement, assuming everything behaves properly once connected.

For this first test I've wired an LED to one of the converter outputs just to check whether there's power. The LED lights up, which is encouraging, although I haven't measured or adjusted the exact output voltage in this recording. There's a little adjustment control on the converter, so setting each rail correctly will be part of the next stage.

This is only a quick bench test. I still need to establish how the converters behave with a proper load, particularly their voltage regulation and current capacity. Once I've got those details sorted out, I'll be able to try them with the Saturn rather than relying on the collection of temporary supplies from my earlier experiment.

**Related Posts**

- [Sega Saturn Model 1 Power Supply Issues](/sega-saturn-model-1-power-supply-issues/)
- [Sega Saturn External PSU Proof of Concept](/sega-saturn-external-psu-proof-of-concept/)

**Sources**

- [Keysight - Performing DC-DC Converter Test Using DC Power Analyzers](https://www.keysight.com/au/en/assets/7018-05723/application-notes/5992-2278.pdf) - discusses additional testing needed to characterise converter performance beyond a simple power-on check.
