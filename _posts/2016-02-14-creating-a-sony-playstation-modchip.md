---
title: "Creating a Sony PlayStation Modchip"
author: "Nix McRetro"
date: 2016-02-14T23:10:18.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, sony, youtube]
---

{% include youtube.html id="2rLbI1Ltbso" %}

A quick look at programming PIC microcontrollers with Mayumi 4 or MultiMode3 modchip code.

The important distinction I was trying to explain in the original video is the clock source.

Mayumi V4 uses the PlayStation mechacon clock on supported motherboard revisions, while MultiMode3 uses the PIC's internal clock.

I originally went further and repeated claims about temperature sensitivity and particular batches of PIC12C508A chips having bad clocks. I do not have enough surviving evidence to support those claims properly, so I am removing them rather than turning old forum lore into fact.

The documented difference is enough: Mayumi gets its timing from the console on supported boards, while MM3's internal clock arrangement gives it broader compatibility with early boards.

This particular programmed chip eventually went to Dale, who successfully installed it in his PlayStation. Kudos to Dale! :)

This was also my first 4K-ready video.

Probably the last one for a while too. I did not have the CPU power to encode these things quickly or the bandwidth to upload them!

### Related posts

- [Sony PlayStation Modchip Overview](/sony-playstation-modchip-overview/)
- [Mayumi 4 | PIC12F629 | SCPH-7502 | PU-22](/mayumi-4-pic12f629-scph-7502-pu-22/)
- [Mayumi 4 | PIC12C508A | SCPH-7502 | PU-22](/mayumi-4-pic12c508a-scph-7502-pu-22/)
- [Mayumi 4 | PIC12C508A | SCPH-5502 | PU-18](/mayumi-4-pic12c508a-scph-5502-pu-18/)

### Sources

- [ConsoleMods - PS1 Modchips](https://consolemods.org/wiki/PS1:Modchips)
