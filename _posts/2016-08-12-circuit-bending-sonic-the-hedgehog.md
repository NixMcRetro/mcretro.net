---
title: "Circuit Bending - Sonic the Hedgehog"
author: "Nix McRetro"
date: 2016-08-12T07:44:45.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, hacks, sega]
---

{% include youtube.html id="_cXIrhNazys" %}

I finally got around to doing some soldering on a somewhat faulty Mega Drive 2 I had lying about. I started from the old [gieskes.nl](https://web.archive.org/web/20160219222212/http://www.gieskes.nl/) circuit-bending diagram, but after checking the VRAM pinout properly I deliberately stayed away from the VCC and VSS power pins.

![VRAM_pinout_Circuit Bending](/assets/images/2016/img_0470.jpg)

On the VRAM I concentrated on address inputs, grounding them to get results. The pinout above labels them **A0 through A7**; my original A0-to-A8 description went one address line too far. Interfering with those signals can produce wonderfully broken graphics. This is deliberately abusive experimentation, not a repair technique, and neighbouring pins should not be assumed safe just because they are close together.

Then I started experimenting with the Z80 RAM, particularly address lines A8 through A11 and control signals such as `/OE` and `/CE1`.

![Z80 RAM](/assets/images/2016/img_0532.jpg)

Messing with the data lines tended to hang the console and require a power cycle. I've decided to put the circuit-bending videos over on McRetro Gaming since technically this is some sort of gaming. If people enjoy staring at the pretty patterns and strange sounds, maybe I'll remember to do one every week.

![Sonic1_Glitch](/assets/images/2016/img_0531.jpg)

Big thanks to [Console5](https://console5.com/store/) for the pinout reference.

### Sources

- [Gijs Gieskes - Personal Home-Page (archived)](https://web.archive.org/web/20160219222212/http://www.gieskes.nl/)
- [Sega - Genesis II / Mega Drive II Service Manual, 1993 supplements](https://consolemods.org/wiki/images/9/9e/Sega_Genesis_Model_2_VA1_Service_Manual.pdf)

### Related posts

- [Circuit Bending a Sega Mega Drive 2](/circuit-bending-a-sega-mega-drive-2/)
- [Circuit Bending VRAM on a Sega Mega Drive / Genesis 2](/circuit-bending-vram-on-a-sega-mega-drive-genesis-2/)
