---
title: "Circuit Bending - Sonic the Hedgehog"
author: "Nix McRetro"
date: 2016-08-12T07:44:45.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, hacks, sega]
---

{% include youtube.html id="_cXIrhNazys" %}

I finally got around to doing some soldering on a somewhat faulty Mega Drive 2 I had lying about.

I started from the old [gieskes.nl](https://web.archive.org/web/20160219222212/http://www.gieskes.nl/) circuit-bending diagram, but after checking the VRAM pinout properly I deliberately stayed away from the VCC and VSS power pins.

![VRAM_pinout_Circuit Bending](/assets/images/2016/img_0470.jpg)

On the VRAM I concentrated on identified signal pins, particularly address inputs A0 through A8.

Interfering with those signals can produce wonderfully broken graphics.

It is also deliberately abusive experimentation, not a repair technique, and random neighbouring pins should not be assumed safe just because they are close together.

Then I started experimenting with the Z80 RAM, particularly address lines A8 through A11 and control signals such as `/OE` and `/CE`.

![Z80 RAM](/assets/images/2016/img_0532.jpg)

Messing with the data lines tended to hang the console and require a power cycle.

I've decided to put the circuit-bending videos over on McRetro Gaming since technically this is some sort of gaming.

If people enjoy staring at the pretty patterns and strange sounds, maybe I'll remember to do one every week.

![Sonic1_Glitch](/assets/images/2016/img_0531.jpg)

Big thanks to [Console5](https://console5.com/store/) for the pinout reference.

### Related posts

- [Circuit Bending a Sega Mega Drive 2](/circuit-bending-a-sega-mega-drive-2/)
- [Circuit Bending VRAM on a Sega Mega Drive / Genesis 2](/circuit-bending-vram-on-a-sega-mega-drive-genesis-2/)

### Sources

- [Gieskes.nl - circuit-bending reference (archived)](https://web.archive.org/web/20160219222212/http://www.gieskes.nl/)
- [Console5](https://console5.com/store/)
