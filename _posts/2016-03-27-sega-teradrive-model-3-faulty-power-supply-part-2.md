---
title: "Sega TeraDrive Model 3 - Faulty Power Supply (Part 2)"
author: "Nix McRetro"
date: 2016-03-27T09:41:21.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="fFq4bgz9L3Q" %}

Part two reveals an interesting bit of information. I think we've found the symptom. Now we have to find where the disease is originating from. Fortunately, I've got two Sega TeraDrive power supplies available, one working and one faulty, so at least we've got something useful to compare!

The faulty supply is from the machine with a serial number ending in 629, while the working one ends in 1135. I made a little chart to record the voltages from each unit, because otherwise I'd probably end up confusing myself halfway through the experiment. We've got nominal 5 V and 12 V rails to investigate.

With no load connected, the faulty supply was giving me approximately 4.93 V on the 5 V rail and 11.14 V on the 12 V rail. The working supply measured about 5.00 V and 11.46 V under the same conditions. Not exactly identical, but nothing immediately explained why one machine was behaving and the other wasn't.

The interesting part came when I connected the supplies to the TeraDrive hardware. The faulty unit made its familiar unhappy noise, and the 12 V rail fell to around 10.65 V and continued dropping. Even more interestingly, the nominal 5 V rail was down around 3.1 V. Hmm, I think we might be getting somewhere!

For comparison, the working supply behaved considerably better with the machine connected. I measured approximately 12.16 V on the 12 V rail, while the 5 V rail remained close to its expected value. So the really important difference wasn't the small variation I'd seen with no load, but what happened when the supply actually had some work to do.

That gives me something useful to investigate. The faulty power supply isn't maintaining its output properly under load, particularly on the 5 V rail. Unfortunately, that still doesn't tell me which component inside is responsible. Is it a capacitor? Is it a FET? Is it an *insert component here*? We still don't know.

I was considering whether an alternative 5 V source might help with further diagnosis, although the TeraDrive requires a fair amount of current and there's more to consider than simply matching a voltage. For now, I'd rather understand the original power supply's failure before making any assumptions about how to replace or bypass it.

These supplies involve mains electricity, and the comparison was made during a historical bench experiment rather than as a general repair procedure. The measurements are useful evidence, but poking around a live power supply certainly isn't something to attempt casually.

So we've narrowed the problem down rather nicely. The next step is to investigate the faulty PSU itself and try to discover why its outputs collapse when the TeraDrive is connected. We'll find out one day soon! ;)

**Related Posts**

- [Sega TeraDrive Model 3 Power Supply Failure](/sega-teradrive-model-3-power-supply-failure/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 1)](/sega-teradrive-model-3-faulty-power-supply-part-1/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 3)](/sega-teradrive-model-3-faulty-power-supply-part-3/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 4)](/sega-teradrive-model-3-faulty-power-supply-part-4/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 5)](/sega-teradrive-model-3-faulty-power-supply-part-5/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 6)](/sega-teradrive-model-3-faulty-power-supply-part-6/)
