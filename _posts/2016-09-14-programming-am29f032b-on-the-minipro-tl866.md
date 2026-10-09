---
title: "Programming AM29F032B on the MiniPro TL866"
author: "Nix McRetro"
date: 2016-09-14T20:57:11.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, nintendo, programming]
---

![type-ii](/assets/images/2016/img_0560.jpg)

I found an interesting workaround on the NESdev forums for programming an AM29F032B with the MiniPro TL866 software. The MiniPro software at the time did not officially list the AM29F032B, but other users reported successfully selecting **Fujitsu MBM29F033C**, disabling the device-ID check and then programming the AM29F032B through the appropriate TSOP adapter.

I had **not tested this myself** when I wrote the post, so this remains a community-reported workaround rather than something I personally verified. I tend to use the Type II boards rather than the Type III boards discussed in the original thread. The GQ-4X4 hasn't exploded yet, but that doesn't establish how my adapter setup will behave on the MiniPro.

I also originally extended the claim to ST M29F032D chips simply because those devices worked in my GQ-4X4 setup. Success with one programmer algorithm does not automatically prove that the TL866's MBM29F033C workaround will also handle the ST device correctly. Theory is fun. Verification is better.

### Sources

- [NESdev - A question about programming AM29F032B chips (archived)](https://web.archive.org/web/20231014225637/https://forums.nesdev.org/viewtopic.php?t=8913)
- [ElOtroLado - Programar diferentes memorias en un TL866CS (2014 community report)](https://www.elotrolado.net/hilo_aporte-programar-diferentes-memorias-en-un-tl866cs_2022489)

### Related posts

- [TSOP40 Flash Chips - Fakes and Counterfeits](/tsop40-flash-chips-fakes-and-counterfeits/)
