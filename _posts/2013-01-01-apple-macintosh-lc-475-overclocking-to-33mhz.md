---
title: "Apple Macintosh LC 475 Overclocking to 33MHz"
author: "Nix McRetro"
date: 2013-01-01T13:45:33.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [apple, hacks, youtube]
---

{% include youtube.html id="GbJmgxy_Kb0" %}

The first video up is the mod itself, rejiggering some resistors around on the mainboard.

{% include youtube.html id="YgzQLAsQmcg" %}

Benchmarks, everyone loves a good way to compare systems before and after overclocking. Here's what to do to get your LC 475 up from a measly 25MHz to a beefed up 33MHz. It's a 15% - 30% performance gain for free! Based on benchmarks on my stock 25MHz chip running at 33MHz.

{% include youtube.html id="4_t4jBz-Jts" %}

For context, the LC 475 originally shipped with a 68LC040, which intentionally lacks the integrated floating-point unit. I had bought this replacement specifically as a full 68040 upgrade, which should include the FPU. So when the replacement still appeared to have no FPU, that was why I suspected the chip might not be what it was sold as.

Dude, where's my FPU? Missing FPU in my 68040 is definitely cause for alarm. Counterfeit processor... Blighters!

I cannot now prove exactly what was wrong with that replacement chip. It may have been remarked, defective, or affected by some other compatibility or detection issue, but a functioning full MC68040 should provide the integrated FPU that the 68LC040 lacks.


### Sources

- [Apple - Macintosh LC 475 Technical Specifications](https://support.apple.com/en-la/112204) - documents the LC 475's original 68LC040 configuration and lack of an FPU.
- [NXP - MC68040](https://www.nxp.com/products/MC68040) - documents the full MC68040 family and its integrated floating-point unit.
