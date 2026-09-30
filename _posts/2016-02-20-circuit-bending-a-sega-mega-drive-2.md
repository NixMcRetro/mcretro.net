---
title: "Circuit Bending a Sega Mega Drive 2"
author: "Nix McRetro"
date: 2016-02-20T15:16:46.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, hacks, sega]
---

![Circuit Bent Sega Mega Drive 2](/assets/images/2016/img_0456.jpg)

Here's a little infographic on circuit bending the Mega Drive / Genesis Model 2, originally from Gijs at [gieskes.nl](https://web.archive.org/web/20160219222212/http://www.gieskes.nl/).

You can get some wonderfully broken graphics out of the VRAM.

I also experimented with address and data signals elsewhere in Mega Drive hardware, although the results could be unstable enough to freeze the machine.

One important correction to the original diagram: the VRAM has multiple **VCC and VSS power pins**.

Those are not circuit-bending targets.

Do not blindly bridge pins together. Verify the RAM pinout first and keep experiments away from power and ground unless you particularly enjoy converting vintage hardware into smoke.

We'll come back to this with a more careful VRAM-specific experiment later.

### Related posts

- [Circuit Bending VRAM on a Sega Mega Drive / Genesis 2](/circuit-bending-vram-on-a-sega-mega-drive-genesis-2/)

### Sources

- [Console5 - 512 Kbit VRAM pinout](https://console5.com/techwiki/index.php?title=File:VRAM_512Kb_64K_x_8-bit_DIP_SOJ-pinout.jpg)
