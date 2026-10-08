---
title: "Circuit Bending VRAM on a Sega Mega Drive / Genesis 2"
author: "Nix McRetro"
date: 2016-03-27T10:49:02.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, hacks, sega]
---

![VRAM pinout for circuit bending](/assets/images/2016/img_0470.jpg)

After actually reading the RAM datasheet properly, I realised that disturbing the power pins might explain some of my earlier random resets. On the 40-pin SOJ pinout shown here, VCC is on pins 11 and 20, and VSS on pins 30 and 40. Those are not pins I want to be casually shorting or disturbing during circuit-bending experiments.

The useful lesson is simple: identify the signal pins from the datasheet first and keep the power and ground pins out of the experiment. Blindly poking neighbouring IC legs is an excellent way to turn entertaining video corruption into dead RAM.

I've updated the earlier Mega Drive circuit-bending post to make that distinction clear too. Next I'd like to make a video, or maybe several, on getting the best visual artefacts the Mega Drive can offer without sacrificing perfectly good hardware.

### Sources

- [Console5 - 512 Kbit VRAM pinout](https://console5.com/techwiki/index.php?title=File:VRAM_512Kb_64K_x_8-bit_DIP_SOJ-pinout.jpg)

### Related posts

- [Circuit Bending a Sega Mega Drive 2](/circuit-bending-a-sega-mega-drive-2/)
