---
title: "Sega TeraDrive Model 2: Installing Windows 3.1 with XTIDE"
author: "Nix McRetro"
date: 2012-11-18T01:33:10.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, microsoft, sega]
---

{% include youtube.html id="Lv1GlH_As1c" %}

Now that the TeraDrive Model 2 can boot from the XTIDE card, it is finally time to give the machine a proper Windows installation. Up until now I've been squeezing stripped-down Windows installations onto floppy disks and RAM disks.

This is considerably less ridiculous.

The PC side of the TeraDrive is a 10 MHz 80286. Windows 3.1 can run on a 286 in Standard Mode, so this is entirely legitimate period hardware for it. What the 286 cannot provide is Windows' 386 Enhanced Mode.

With XTIDE and the Disk on Module providing persistent storage, Windows suddenly becomes far more practical than the earlier floppy-based experiments.

If you're having trouble configuring your own XTIDE card, the [Vintage Computer XTIDE support thread](https://forum.vcfed.org/index.php?threads/xtide-tech-support-thread.19870/) and project documentation are extremely useful. I didn't actually need to ask them for direct help this time, but their existing documentation did most of the heavy lifting.

The little TeraDrive is finally starting to feel like a real PC rather than an elaborate floppy-disk endurance test.

### Related posts

- [Sega TeraDrive Model 2 XTIDE Boot Success](/sega-teradrive-model-2-xtide-boot-success/)
- [XTIDE Settings for the Sega TeraDrive](/xtide-settings-for-the-sega-teradrive/)
- [Sega TeraDrive Model 2 with Windows 3.11 in a RAM Disk](/sega-teradrive-model-2-with-windows-311-in-a-ram-disk/)

### Sources

- [Microsoft - Windows 3.1 Hardware Compatibility List, Q83210](https://jeffpar.github.io/kbarchive/kb/083/Q83210/) - the archived Microsoft article distinguishes Standard Mode on 80286 systems from Standard and 386 Enhanced Mode on 80386/80486 systems.
- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's specifications identify the PC CPU as a 10 MHz 80286.
- [XTIDE Universal BIOS](https://www.xtideuniversalbios.org/) - project documentation for XTIDE BIOS configuration and ATA storage support.
