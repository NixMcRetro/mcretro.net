---
title: "IBM PS/2 Model 30 8086 with ISA XTIDE Card"
author: "Nix McRetro"
date: 2012-11-17T01:16:29.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="h6eXHUqOZZ0" %}

This was originally just a quick test to prove that the XTIDE card itself worked. I had been fighting with it in the Sega TeraDrive, so the IBM PS/2 Model 30 made a handy known-good 8086 test machine.

Success.

The XT-compatible XTIDE Universal BIOS build works here and I can access the 4 GB Disk on Module from the command prompt. XTIDE can handle storage far larger than an original 8086 PC would normally expect, although DOS filesystem and partition limits still determine how much space is practical in each volume.

Now I need to make the DOM bootable and move the experiment back into the TeraDrive. That part eventually worked too.

I had originally planned to return the IBM PS/2 to an original-style hard drive. I ordered two drives and a 5.25-inch floppy drive from a seller who seemed increasingly dubious.

In a later update, I recorded that the seller never shipped anything and by the time PayPal became involved, it was too late.

Scammers... dammit!

### Related posts

- [IBM PS/2 Model 30 8086 Sound, Video and CPU Upgrades](/ibm-ps2-model-30-8086-sound-video-and-cpu-upgrades/)
- [Sega TeraDrive Model 2 XTIDE Boot Success](/sega-teradrive-model-2-xtide-boot-success/)

### Sources

- [XTIDE Universal BIOS](https://www.xtideuniversalbios.org/) - documents XT builds for 8086 and 8088 systems and support for modern ATA storage.
