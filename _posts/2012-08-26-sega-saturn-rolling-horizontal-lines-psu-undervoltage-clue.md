---
title: "Sega Saturn Rolling Horizontal Lines: PSU Undervoltage Clue"
author: "Nix McRetro"
date: 2012-08-26T00:45:37.000+10:00
last_modified_at: 2026-10-03
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-03
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, repairs, sega]
---

![](/assets/images/2012/img_0247.jpg)

Two Sega Saturns. Two copies of the same game. Two power supplies that produce rolling horizontal lines.

The best clues always seem to arrive by accident.

I had been testing my Japanese Saturn through a 240 V to 120 V step-down transformer. That particular project failed, more on that later, so afterwards I started going through my other Saturns to document their CD decks and power supplies.

Something did not make sense.

The Saturns with the supposedly bad PSUs were no longer showing the rolling-line problem, even after being left running for quite a while.

I packed everything away, went to bed and then had the giant light-bulb moment.

I had forgotten to unplug the step-down transformer. In other words, I had accidentally been feeding my PAL Saturn power supplies roughly half their intended mains voltage.

That is **not** a safe repair or recommended operating condition. PAL Saturn PSUs are designed for roughly 220 to 240 V AC input. Running one at around 120 V is severe undervoltage.

Still, the fact that the interference changed was a useful diagnostic clue.

I connected a power meter and recorded the following:

```text
PAL Saturn through step-down transformer
Voltage:      124 V
Power factor: 0.68
Frequency:    50 Hz
Apparent:     17 VA
Power:        12 W
Current:      0.14 A

PAL Saturn on normal mains
Voltage:      251 V
Power factor: 0.67
Frequency:    50 Hz
Apparent:     21 VA
Power:        14 W
Current:      0.08 A
```

The Saturn actually ran at the lower input voltage, which surprised me.

Running is not the same as operating correctly though.

I would not use 120 V as a "fix". What this experiment suggests is that the interference is sensitive to the behaviour of the power supply under different input conditions. That makes regulation, filtering or another PSU-related fault worth investigating, but it does not identify the failed component by itself.

More testing required.

### Related posts

- [Sega Saturn Model 1 Power Supply Issues](/sega-saturn-model-1-power-supply-issues/)

### Sources

- [ConsoleMods - Comparison of Power Supplies](https://consolemods.org/wiki/Comparison_of_Power_Supplies) - documents regional Sega Saturn mains-input ranges and PSU differences.
