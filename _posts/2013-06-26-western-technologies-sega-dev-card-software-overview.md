---
title: "Western Technologies Sega Dev Card Software Overview"
author: "Nix McRetro"
date: 2013-06-26T17:51:55.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [devkit, programming, sega]
---

{% include youtube.html id="ak-G2ouUytk" %}

This gives a peek at the software running behind the Western Technologies Development Card for uploading (they call it downloading) from the PC to the Mega Drive. The workflow is surprisingly modern: build your binary on the PC, fire it through SEGALOAD over the PC link, and it lands in SRAM on the development cartridge ready for the Mega Drive to run. No UV eraser, no fresh EPROM burn, no chip swapping, just edit, assemble, download and see what breaks.

In that sense my Mega EverDrive comparison was actually pretty reasonable. The 2012 Mega EverDrive could load a ROM from SD, or send one directly from a PC over USB into cartridge memory, so both devices were solving much the same basic problem decades apart: get new code onto real Mega Drive hardware quickly. Different hardware and different purpose, but the same lovely idea of turning a painfully slow ROM-burning cycle into something much closer to edit, load, test, repeat.

For an early-1990s development setup, that's pretty damn cool.

### Sources

- [Genesis Programming FAQ - Western Technologies SegaDev Card and SEGALOAD.EXE](https://gamefaqs.gamespot.com/genesis/916377-genesis/faqs/9755)
- [Mega EverDrive User Manual, March 2012](https://stoneagegamer.com/content/flash/legacy/megaed/Mega_EverDrive_Manual_ENGLISH_PCBv1.00_FWv2_OSv1.pdf)
- [RetroReversing - Sega Mega Drive Development Kit Hardware](https://frds.github.io/sega-mega-drive-genesis-development-kit/)
