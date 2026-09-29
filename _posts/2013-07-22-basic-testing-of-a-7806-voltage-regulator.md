---
title: "Basic Testing of a 7806 Voltage Regulator"
author: "Nix McRetro"
date: 2013-07-22T15:08:37.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, youtube]
---

Here's a quick basic test on some 7806 voltage regulators.

The 78xx family is a very common series of fixed positive linear voltage regulators.

The last two digits conventionally identify the nominal output voltage:

- 7805: 5 V
- 7806: 6 V
- 7808: 8 V
- 7809: 9 V
- 7812: 12 V
- 7815: 15 V

So the 7806 devices I'm testing here should produce roughly 6 V when they have a suitable input supply and are operating normally.

{% include youtube.html id="w_6MRoIZQFY" %}

A common three-terminal 7806 has an input, ground and regulated output connection.

It is a **linear** regulator, which means the excess voltage is dissipated as heat rather than converted with the higher efficiency of a switching regulator.

It also needs some voltage headroom above its nominal 6 V output.

For the ST L7806, the datasheet specifies a typical dropout voltage of about 2 V at a 1 A load. In other words, feeding a 7806 exactly 6 V does not give it enough input voltage to regulate properly.

The ST L78 family also includes internal current limiting, thermal shutdown and safe-area protection. With appropriate heatsinking, the larger devices in the family can supply more than 1 A.

For a very basic bench check, I can measure the input voltage and then see whether the output is sitting somewhere around the expected 6 V.

That tells me the regulator is at least doing something sensible under those particular conditions.

It does **not** prove that the regulator is healthy under every load.

A part can appear fine with little or no current being drawn and then behave badly once it has to supply real load current or once it heats up.

So for actual troubleshooting I would also want to know:

- what voltage is reaching the input;
- whether the output remains close to 6 V under the circuit's normal load;
- whether the regulator is overheating;
- whether the surrounding capacitors and wiring are healthy.

The same general 78xx family includes the familiar 7805 regulators used throughout plenty of retro hardware, including Super Nintendo and Mega Drive / Genesis power circuits.

Simple little components, but very handy things to understand.

Hope you enjoy! ;)

### Sources

- [STMicroelectronics - L78 Positive Voltage Regulator ICs](https://www.st.com/en/power-management/l78.html) - official family specifications for fixed positive regulators including the L7806.
- [SnesLab - 7805](https://sneslab.net/wiki/7805) - SNES-specific 5 V regulator context.
- [ConsoleMods Wiki - Comparison of Power Supplies](https://consolemods.org/wiki/Comparison_of_Power_Supplies) - retro-console power-supply context.
