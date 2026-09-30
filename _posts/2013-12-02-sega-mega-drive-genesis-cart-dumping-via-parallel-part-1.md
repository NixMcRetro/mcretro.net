---
title: "Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 1)"
author: "Nix McRetro"
date: 2013-12-02T20:19:08.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, sega, youtube]
---

{% include youtube.html id="ON2eUAP6yz4" %}

Dumping Mega Drive / Genesis cartridges through controller port 2, with a Mega-CD providing the boot environment. Incredible, right?

This setup came from Mask of Destiny's Sega CD Transfer Suite at RetroDev. A cable connects the PC's DB-25 parallel port to controller port 2 on the Mega Drive / Genesis. The Sega/Mega-CD runs the dumping software, which reads the cartridge and sends the data back to the PC.

For cartridge dumping, the Transfer Suite instructions also isolate cartridge pin B32 so the cartridge does not boot instead of the Sega/Mega-CD software.

Watch me go through the ummms and ahhhs of getting it working properly. Thanks, Mask of Destiny!

### Related posts

- [Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 2)](/sega-mega-drive-genesis-cart-dumping-via-parallel-part-2/)
- [Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 3)](/sega-mega-drive-genesis-cart-dumping-via-parallel-part-3/)

### Sources

- [RetroDev - Sega CD Transfer Suite](https://www.retrodev.com/transfer.html)
