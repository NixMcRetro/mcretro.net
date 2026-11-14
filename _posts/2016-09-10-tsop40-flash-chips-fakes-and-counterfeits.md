---
title: "TSOP40 Flash Chips - Fakes and Counterfeits"
author: "Nix McRetro"
date: 2016-09-10T07:04:09.000+10:00
last_modified_at: 2026-11-04
categories: [programming]
share_description: >-
  An AMD-labelled TSOP40 flash chip identifies as an ST M29F032D in the GQ-4X4. Remarked? Quite possibly, although both chips work for SNES carts. 💾
---

![GQ-4X4 Universal Programmer screenshot showing a device ID of 20AC identifying ST Micro M29F032D-TSOP40 rather than the AMD chip label described in the article.](/assets/images/2016/img_0555.jpg)

*The suspicious AMD-labelled TSOP40 chip identified electronically as an ST Micro M29F032D. Someone may have been playing dress-ups with the markings!*
{: .media-caption }

Does the first chip look like an AMD AM29F032B? According to the markings on top, that's exactly what it is. My GQ-4X4 programmer had other ideas, though!

The manufacturer and device identification it reported was consistent with an ST M29F032D, as you can see in the first screenshot. That strongly suggests somebody remarked the chip, although I haven't decapped it or inspected the silicon to prove exactly what's hiding underneath.

![GQ-4X4 Universal Programmer screenshot reporting device ID 0141 and AMD AM29F032B-TSOP40 for the comparison flash chip.](/assets/images/2016/img_0554.jpg)

*The known-good AMD chip's identification, showing AM29F032B this time. At least the programmer knew which one was which!*
{: .media-caption }

For comparison, the second screenshot shows my known-good AMD example. Both devices worked in my SNES flash-cart project using the TSOP-to-Willem adapter, so at least the suspicious one was still useful.

What I can say is that the first chip didn't identify electronically as the AMD part printed on top. I still don't know why somebody decided ST Micro needed an AMD costume. ST isn't *that* bad!

### Related Posts

- [Introducing the GQ-4x4 / GQ-4X v4](/introducing-the-gq-4x4-gq-4x-v4/)
- [Programming AM29F032B on the MiniPro TL866](/programming-am29f032b-on-the-minipro-tl866/)
