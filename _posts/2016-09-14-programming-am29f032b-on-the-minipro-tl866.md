---
title: "Programming AM29F032B on the MiniPro TL866"
author: "Nix McRetro"
date: 2016-09-14T20:57:11.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, nintendo, programming]
---

![type-ii](/assets/images/2016/img_0560.jpg)

I found an interesting workaround on the NESdev forums for programming an AM29F032B with the MiniPro TL866 software.

The MiniPro software at the time did not officially list the AM29F032B.

Other users reported successfully selecting **Fujitsu MBM29F033**, disabling the device-ID check and then programming the AM29F032B through the appropriate TSOP adapter.

I had **not tested this myself** when I wrote the post, so this should remain a community-reported workaround rather than something I personally verified.

I also originally extended the claim to ST M29F032D chips simply because those devices worked in my GQ-4X4 setup.

That's another leap.

Success with one programmer algorithm does not automatically prove that a different programmer's MBM29F033 workaround will also handle the ST device correctly.

So:

- AM29F032B via MBM29F033 selection: reported working by other TL866 users
- M29F032D through the same TL866 workaround: not established by this post

Theory is fun.

Verification is better.

### Related posts

- [TSOP40 Flash Chips - Fakes and Counterfeits](/tsop40-flash-chips-fakes-and-counterfeits/)

### Sources

- [NESdev - AM29F032B / TL866 discussion](https://forums.nesdev.org/viewtopic.php?t=13705)
