---
title: "Sony PlayStation Modchip Programming Failure with a PIC12C508A"
author: "Nix McRetro"
date: 2013-09-24T23:23:15.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [programming, sony, youtube]
---

{% include youtube.html id="8LhzuYNXMhs" %}

This wasn't much of a success.

At the time I suspected that differences between the PIC12C508 and PIC12C508A might be responsible.

That suspicion was not completely invented.

Microchip's own documentation shows differences between the two devices, including the oscillator-calibration implementation.

But I never established that those differences caused this particular failure.

I later discovered a much more immediate problem:

my GQ-4X programmer was becoming unreliable and would fail randomly.

So this video should not be read as evidence that a PIC12C508A fundamentally cannot be used for PlayStation modchip code.

I eventually moved to reflashable PIC12F629 devices, which were much more forgiving when I made mistakes, and successfully returned to the PlayStation modchip project.

Calibration IDs, oscillator settings, all that razzamatazz...

but the dying programmer was not exactly helping!

### Related posts

- [Sony PlayStation 1 Modchip Installation Success on SCPH-9002](/sony-playstation-1-modchip-installation-success-on-scph-9002/)
- [Mayumi 4 PIC12F629 SCPH-7502 PU-22](/mayumi-4-pic12f629-scph-7502-pu-22/)

### Sources

- [Microchip - PIC12C5XX/CE5XX Datasheet](https://ww1.microchip.com/downloads/en/devicedoc/40139e.pdf)
