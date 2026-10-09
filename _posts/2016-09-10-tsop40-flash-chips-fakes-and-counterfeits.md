---
title: "TSOP40 Flash Chips - Fakes and Counterfeits"
author: "Nix McRetro"
date: 2016-09-10T07:04:09.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [programming]
---

![st-micro-m29f032d-tsop40](/assets/images/2016/img_0555.jpg)

Does the first chip look like an AMD AM29F032B? The top marking said it was, but the GQ-4X4 reported manufacturer / device identification consistent with an **ST M29F032D**, as the first screenshot shows. That is strong evidence that the device had been remarked, although I did not decap the chip or inspect the silicon to prove exactly what die was underneath.

![amd-am29f032b-tsop40](/assets/images/2016/img_0554.jpg)

The second screenshot shows my known-good AMD example. Both devices worked in my SNES flash-cart project using the TSOP-to-Willem adapter, so the useful conclusion is that the device I received did not identify electronically as the AMD part printed on top, but was functionally useful in this project. I still don't know why somebody decided ST Micro needed an AMD costume. ST isn't _that_ bad!

### Related posts

- [Introducing the GQ-4x4 / GQ-4X v4](/introducing-the-gq-4x4-gq-4x-v4/)
- [Programming AM29F032B on the MiniPro TL866](/programming-am29f032b-on-the-minipro-tl866/)
