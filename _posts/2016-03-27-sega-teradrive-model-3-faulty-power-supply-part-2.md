---
title: "Sega TeraDrive Model 3 - Faulty Power Supply (Part 2)"
author: "Nix McRetro"
date: 2016-03-27T09:41:21.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs, sega]
share_description: >-
  TeraDrive power-supply comparisons reveal a suspiciously low 12 V rail, but unloaded voltage readings aren't enough to diagnose the buzzing and boot failure. ⚡
---

{% include youtube.html id="fFq4bgz9L3Q" %}

Part two reveals an interesting bit of information. I think we've found the symptom. Now we have to find where the disease is originating from! Fortunately I've got two Sega TeraDrive power supplies here, one working and one faulty, so at least I've got something useful to compare.

The faulty supply came from the TeraDrive with a serial number ending in 629, while the working one came from the machine ending in 1135. I made a little chart to record the voltages from each unit, because otherwise I'd probably end up confusing myself halfway through the experiment. We're mainly interested in the nominal 5 V and 12 V outputs.

These are Japanese power supplies, so I've also got the appropriate voltage converter involved. I'm being careful around the mains connections while doing these tests, because getting zapped isn't my idea of a particularly enjoyable afternoon. I'd rather not leave a questionable supply running without a load for longer than necessary either.

First up was the faulty supply, with nothing connected to its output. I measured around 11.14 V on the nominal 12 V rail and 4.93 V on the 5 V rail. The 12 V reading looked a little low, although I wasn't certain whether that alone was enough to explain the problem.

Next I tried the known working power supply under the same conditions. That gave me approximately 11.46 V on the 12 V rail and a lovely 5.00 V on the 5 V output. So the two supplies weren't identical, but the no-load measurements didn't really tell me why one machine was working and the other wasn't.

The interesting part came when I connected them to the actual TeraDrive hardware. As soon as the faulty unit had something to power, it made that familiar unhappy noise and the voltages began falling. The 12 V rail dropped to around 10.65 V and continued downwards, while the 5 V output was only around 3.1 V.

Hmm, I think we might be getting somewhere! That's a rather significant drop, especially on the 5 V rail, and it certainly explains why the TeraDrive wasn't terribly interested in starting.

For comparison, the working supply was much happier with the machine connected. The 12 V rail measured approximately 12.16 V, and the nominal 5 V rail remained close to where it should be. No horrible noises either, which is always a bonus.

So now we've got something useful to investigate. The faulty supply simply isn't maintaining its output properly under load, particularly on that 5 V rail. Is it a capacitor? A FET? An *insert component here*? We still don't know, but at least the measurements are pointing us towards the power supply rather than leaving us guessing about the rest of the machine.

I was wondering whether I might be able to find another 5 V source with enough current to help with further testing. Unfortunately, this TeraDrive wants a fair amount of it, somewhere around 5 A, so it isn't just a matter of grabbing any old little power supply and joining a couple of wires together.

For now, that's only an idea. I haven't tried powering the machine from an alternative source, and I'd much rather work out why the original supply is collapsing before committing to anything more adventurous.

The next step is to investigate the faulty PSU itself and see whether I can find the component causing all this trouble. At least we've narrowed the problem down considerably, and that makes for a rather satisfying afternoon with the multimeter. We'll find out one day soon! ;)

**Related Posts**

- [Sega TeraDrive Model 3 Power Supply Failure](/sega-teradrive-model-3-power-supply-failure/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 1)](/sega-teradrive-model-3-faulty-power-supply-part-1/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 3)](/sega-teradrive-model-3-faulty-power-supply-part-3/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 4)](/sega-teradrive-model-3-faulty-power-supply-part-4/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 5)](/sega-teradrive-model-3-faulty-power-supply-part-5/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 6)](/sega-teradrive-model-3-faulty-power-supply-part-6/)
