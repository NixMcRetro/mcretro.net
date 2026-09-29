---
title: "SuperCIC Planning Notes for SNSP-CPU-1CHIP-01 with F413B"
author: "Nix McRetro"
date: 2013-07-08T19:06:30.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, hacks, nintendo]
---

![](/assets/images/2013/img_0410.jpg)

This post was originally supposed to become a full guide to installing SuperCIC on an SNSP-CPU-1CHIP-01 board using the later F413B lockout chip.

It never got finished.

Rather than leave a one-photo placeholder looking like an installation guide, it is worth recording the important distinction.

The PAL F413B is a later CIC revision and its disable procedure is not identical to the earlier F413 and F413A chips.

In particular, the revision-B arrangement also involves the clock circuitry around U18.

So do **not** treat an F413A guide as a pin-for-pin installation guide for an F413B board without checking the revision-specific procedure.

I later completed and documented SuperCIC installations on other SNES hardware, but this particular article never became the full 1CHIP-01 guide I had planned.

### Related posts

- [SNES SuperCIC Switchless Modchip - Installation (Part 1)](/snes-supercic-switchless-modchip-installation-part-1/)

### Sources

- [Wolfsoft - SuperCIC installation guide](http://wolfsoft.de/wordpress/?p=603)
- [ConsoleMods Wiki - SNES: Disabling CIC](https://consolemods.org/wiki/SNES:Disabling_CIC)
