---
title: "Leaking NiCad Batteries and Motherboards"
author: "Nix McRetro"
date: 2012-10-28T06:58:02.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs]
---

{% include youtube.html id="VTKAVvqteMM" %}

I hate NiCad batteries. I hate them so much. The rechargeable barrel-style NiCd batteries used on a lot of vintage computer motherboards are notorious for leaking corrosive alkaline electrolyte and damaging nearby tracks and components. The machines in my collection use a mixture of backup arrangements, including rechargeable NiCd packs, Dallas-style RTC modules with an encapsulated lithium cell, and replaceable primary lithium coin cells such as CR2032 or BR2032 depending on the machine and any repairs or modifications made over the years. The sealed lithium and coin-cell arrangements avoid the classic barrel-NiCd leakage problem, although no old battery should simply be assumed harmless forever.

{% include youtube.html id="2en2GsA_70Q" %}

Good news was that one of the two boards worked and could be used in the future if it is required. At the moment I do not have much use for a 486DX running at 33MHz, but who knows what the future holds. If you ever come across a NiCad battery on anything, deal with it before it leaks onto your precious vintage goods! If you remove a rechargeable NiCd backup battery, make sure any replacement matches the intended charging arrangement. Do not simply install a non-rechargeable CR2032 or BR2032 into a circuit that applies charging current.


### Sources

- [Analog Devices - DS12887 Real-Time Clock](https://www.analog.com/en/products/ds12887.html) - documents the Dallas-style RTC module architecture with an encapsulated lithium energy source.
