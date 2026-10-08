---
title: "Circuit Bending a Sega Mega Drive 2"
author: "Nix McRetro"
date: 2016-02-20T15:16:46.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, hacks, sega]
---

![Circuit Bent Sega Mega Drive 2](/assets/images/2016/img_0456.jpg)

Here's a little infographic on circuit bending the Mega Drive / Genesis Model 2, originally from Gijs at [gieskes.nl](https://web.archive.org/web/20160219222212/http://www.gieskes.nl/).

You can get some wonderfully broken graphics out of the VRAM. Maybe I should do another video - if only it also broke the audio... actually, I did mess around with address / data lines around the audio hardware on a Mega Drive Model 1, but it froze every so often.

One important correction to the original diagram: it excludes only pins 20 and 40, but the VRAM has multiple **VCC and VSS power pins**. Those are not circuit-bending targets. Do not blindly bridge pins together. Verify the pinout of the actual RAM fitted and keep experiments away from power and ground unless you particularly enjoy converting vintage hardware into smoke.

We'll come back to this with a more careful VRAM-specific experiment later.

### Sources

- [Console5 - 512 Kbit VRAM pinout](https://console5.com/techwiki/index.php?title=File:VRAM_512Kb_64K_x_8-bit_DIP_SOJ-pinout.jpg)

### Related posts

- [Circuit Bending VRAM on a Sega Mega Drive / Genesis 2](/circuit-bending-vram-on-a-sega-mega-drive-genesis-2/)
