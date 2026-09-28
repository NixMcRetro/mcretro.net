---
title: "Sega Saturn Rolling Horizontal Lines - Discovery"
author: "Nix McRetro"
date: 2012-08-26T00:45:37.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, repairs, sega]
---

![](/assets/images/2012/img_0247.jpg)

Two Sega Saturns, two identical games, two power supplies that show rolling horizontal lines. The best solutions always seem to come about from accidents.

I was testing my Japanese Saturn on my 240V -> 120V transformer last night, that project failed by the way - more on that later, and I then figured I'd go and start testing all my other Saturns for issues and document their CD decks and power supplies. After I'd finished testing I was a little confused that the Saturns with the bad PSUs did not show any issues even though I had left them on for extended testing.

So I packed up everything and went to bed with an uneasy feeling. Turned off the light and then a giant light bulb activated inside my big fat head - I didn't unplug the stepdown transformer...

I could have only assumed that would be a bad thing to do. 100-120V should not like 220-240V, I assumed it would have been the same for 220-240V -> 100-120V, well apparently not. It got me thinking and I connected a power usage meter up and confirmed the following while the Saturns were running.

`**PAL 50Hz 120V** Voltage: 124V Power Factor: 0.68PF Frequency: 50Hz Volt-Ampere: 17VA Watts: 12W Ampere: 0.14A`

`**PAL 50Hz 240V** Voltage: 251V Power Factor: 0.67PF Frequency: 50Hz Volt-Ampere: 21VA Watts: 14W Ampere: 0.08A`

It actually ran, which surprised me, but running is not the same thing as operating within specification. A PAL Saturn power supply is designed for 220-240V input, so feeding it roughly 120V is substantial undervoltage and is not a valid repair or recommended operating condition. The fact that the rolling interference changed under severe undervoltage instead points back toward a fault or regulation or filtering problem in the power supply itself. I was still attempting to reproduce the behaviour in both configurations to understand what was happening.


### Sources

- [ConsoleMods - Comparison of Power Supplies](https://consolemods.org/wiki/Comparison_of_Power_Supplies) - documents regional Sega Saturn mains-input ranges and PSU differences.
