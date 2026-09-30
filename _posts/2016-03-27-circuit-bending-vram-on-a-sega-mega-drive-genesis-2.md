---
title: "Circuit Bending VRAM on a Sega Mega Drive / Genesis 2"
author: "Nix McRetro"
date: 2016-03-27T10:49:02.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, hacks, sega]
---

![VRAM pinout for circuit bending](/assets/images/2016/img_0470.jpg)

After actually reading the RAM datasheet properly, I discovered why some of my earlier experiments caused random resets.

This particular VRAM pinout has multiple VCC and VSS power pins.

Those are not pins I want to be casually shorting or disturbing during circuit-bending experiments.

The useful lesson is simple: identify the signal pins from the datasheet first and keep the power and ground pins out of the experiment.

Blindly poking neighbouring IC legs is an excellent way to turn entertaining video corruption into dead RAM.

I've updated the earlier Mega Drive circuit-bending post to make that distinction clear too.

Future experiments can concentrate on getting the best visual artefacts without sacrificing perfectly good hardware.

### Related posts

- [Circuit Bending a Sega Mega Drive 2](/circuit-bending-a-sega-mega-drive-2/)

### Sources

- [Console5 - 512 Kbit VRAM pinout](https://console5.com/techwiki/index.php?title=File:VRAM_512Kb_64K_x_8-bit_DIP_SOJ-pinout.jpg)
