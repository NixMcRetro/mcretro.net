---
title: "Apple Macintosh LC 475 Overclocking to 33 MHz"
author: "Nix McRetro"
date: 2013-01-01T13:45:33.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [apple, hacks, youtube]
---

{% include youtube.html id="GbJmgxy_Kb0" %}

The first video shows the actual motherboard modification.

The LC 475 normally runs at 25 MHz. This modification changes the board's clock configuration to 33 MHz by moving the relevant surface-mount resistors. That is roughly a 32% increase in clock frequency. Actual application performance does not automatically increase by exactly the same percentage because different workloads are limited by different parts of the machine.

{% include youtube.html id="YgzQLAsQmcg" %}

Benchmarks!

Everybody loves a good before-and-after benchmark.

In the tests I ran with the original 25 MHz-rated processor operating at 33 MHz, the performance improvement varied by benchmark, generally somewhere around 15 to 30%. So that old line about a "15 to 30% performance gain for free" was describing **my benchmark results**, not a universal guarantee for every LC 475 or every application.

Free is also perhaps generous when soldering is involved.

The processor upgrade is a separate part of this project. The LC 475 originally shipped with a 68LC040, which deliberately omits the integrated floating-point unit. I had specifically bought a full 68040 to replace that FPU-less CPU. In other words, I wasn't simply buying another processor for the sake of overclocking it. The goal was to gain the full 68040 feature set, including the FPU, while I was already modifying the machine.

{% include youtube.html id="4_t4jBz-Jts" %}

Which brings us to:

Dude, where's my FPU?

The replacement chip still appeared not to provide an FPU, which was obviously suspicious for something sold to me as a full 68040.

At the time my immediate reaction was:

Counterfeit processor... blighters!

I cannot prove that conclusion now. A functioning full MC68040 should provide its integrated FPU, but this particular result could have come from a remarked processor, a defective part or another compatibility or detection problem.

This replacement did not behave as the full 68040 I expected to receive.

Still, the LC 475 itself was now running happily at 33 MHz.

That part was a success.

### Related posts

- [Removing the Socketed CPU from an Apple Macintosh LC 475](/removing-the-socketed-cpu-from-an-apple-macintosh-lc-475/)
- [Apple Macintosh LC 475 Modifications Overview](/apple-macintosh-lc-475-modifications-overview/)

### Sources

- [Apple - Macintosh LC 475 Technical Specifications](https://support.apple.com/en-la/112204) - documents the stock 25 MHz 68LC040 configuration and lack of an FPU.
- [NXP - MC68040](https://www.nxp.com/products/MC68040) - documents the full MC68040 family and integrated floating-point unit.
