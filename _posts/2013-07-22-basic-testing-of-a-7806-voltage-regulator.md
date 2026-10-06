---
title: "Basic Testing of a 7806 Voltage Regulator"
author: "Nix McRetro"
date: 2013-07-22T15:08:37.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, youtube]
---

{% include youtube.html id="w_6MRoIZQFY" %}

Here's just a quick test on some 7806 voltage regulators. The 78xx family contains fixed positive linear regulators; the last two digits conventionally indicate the nominal output voltage:

- 7805: 5 V
- 7806: 6 V
- 7808: 8 V
- 7809: 9 V
- 7812: 12 V
- 7815: 15 V

A 7806 should produce roughly 6 V with a suitable input supply and load. As a linear regulator, it dissipates the input-to-output voltage difference as heat and needs voltage headroom. For the ST L7806C, the datasheet gives a typical dropout of 2 V at 1 A and a junction temperature of 25 °C; that is not a guaranteed value for every 7806 or operating condition.

The ST L78 family includes current limiting, thermal shutdown and safe-area protection, and can deliver over 1 A with adequate heatsinking. Those protections do not make every part or test setup immune to damage.

Measuring the input and output is a useful basic check, but a sensible reading under light load does not prove that the regulator will behave properly under normal load or after it heats up. Check the actual part's pinout and ratings, its input supply and the surrounding connections and capacitors.

The same family includes the 5 V 7805 regulators used in Super Nintendo and Mega Drive / Genesis power circuits. Hope you enjoy! ;)

### Sources

- [STMicroelectronics - L78 Positive Voltage Regulator ICs](https://www.st.com/resource/en/datasheet/l78.pdf) - manufacturer datasheet, including the L7806C characteristics and test conditions.
- [SnesLab - 7805](https://sneslab.net/wiki/7805) - SNES-specific 5 V regulator context.
- [ConsoleMods Wiki - Comparison of Power Supplies](https://consolemods.org/wiki/Comparison_of_Power_Supplies) - retro-console power-supply context.
