---
title: "Leaking NiCad Batteries and Motherboards"
author: "Nix McRetro"
date: 2012-10-28T06:58:02.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs]
---

{% include youtube.html id="VTKAVvqteMM" %}

I hate NiCad batteries.

I hate them so much.

The rechargeable barrel-style NiCd batteries used on many vintage computer motherboards are notorious for leaking and destroying nearby tracks and components.

The electrolyte inside a NiCd cell is alkaline, primarily a potassium-hydroxide solution, rather than an acid. That distinction matters chemically, but either way it is something I do not want spreading across a motherboard.

{% include youtube.html id="2en2GsA_70Q" %}

The machines in my collection use several different backup-power arrangements.

Some have rechargeable NiCd packs. Others use Dallas-style RTC modules with an encapsulated lithium source. Some machines use replaceable primary lithium cells such as CR2032 or BR2032, either from the factory or after later modifications.

The sealed RTC and coin-cell arrangements avoid the classic barrel-NiCd leakage pattern, but no decades-old battery should automatically be assumed harmless forever.

Good news: one of these two boards still works and can become a spare if I ever need it.

At the moment I don't have much use for another 486DX running at 33 MHz.

Who knows what the future holds though.

If you find an old rechargeable NiCd pack on a motherboard, inspect it before it gets the opportunity to redecorate the PCB.

If you replace it, remember that the original circuit may charge the battery.

Do not simply install a non-rechargeable CR2032 or BR2032 into a circuit that applies charging current.

### Sources

- [Saft - Nickel-Cadmium Battery Technical Manual](https://saft4u.saft.com/en/download_file/1a86081d-f49b-4d43-b3ce-b82f412ef33a/English) - documents potassium hydroxide as the alkaline electrolyte used in nickel-cadmium cells.
- [Analog Devices - DS12887 Real-Time Clock](https://www.analog.com/en/products/ds12887.html) - documents the Dallas-style RTC module architecture with an encapsulated lithium energy source.
