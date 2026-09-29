---
title: "Creating SNES Cartridges with TSOP40 Flash Memory and Donor PCBs"
author: "Nix McRetro"
date: 2013-09-22T21:13:37.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="dV6J6cpVUfg" %}

Here we convert SNES donor cartridges to use programmable TSOP40 flash memory.

The donor boards I was working with came from games such as NHL 96 and World Cup Striker.

The two target games are:

- EarthBound
- Donkey Kong Country 3

This is not a modern menu-driven flash cart.

The idea is to reuse a suitable original cartridge PCB and supporting circuitry while replacing the original mask ROM with programmable flash memory containing the target game.

That means donor-board compatibility still matters.

The donor has to provide the wiring and supporting hardware expected by the target cartridge design.

The next videos cover the actual AM29F032B programming process and some of the earlier EPROM experiments.

### Related posts

- [GQ-4X Flashing EarthBound onto TSOP40 AM29F032B Flash Memory](/gq-4x-flashing-earthbound-onto-tsop40-am29f032b-flash-memory/)
- [27C801 EPROM SNES Donor Cartridge Demo: Super Bomberman 2](/27c801-eprom-snes-donor-cartridge-demo-super-bomberman-2/)

### Sources

- [NesDev Forums - SNES donor cartridge discussion](https://web.archive.org/web/20231014212322/https://forums.nesdev.org/viewtopic.php?t=5605)
- [RetroHacker - SNES cartridge conversion discussion](https://web.archive.org/web/20160313064923/http://retrohacker.info/viewtopic.php?f=13&t=6)
- [RetroHacker - TSOP cartridge discussion](https://web.archive.org/web/20140921210156/http://retrohacker.info/viewtopic.php?f=13&t=18)
