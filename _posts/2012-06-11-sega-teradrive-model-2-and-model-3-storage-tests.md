---
title: "Sega TeraDrive Model 2 and Model 3 Storage Tests"
author: "Nix McRetro"
date: 2012-06-11T01:15:08.000+10:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega, youtube]
---

{% include youtube.html id="mDXXutfmcyI" %}

First up, the TeraDrive Model 3 getting a hard drive installed and running.

Very happy with this.

{% include youtube.html id="oQBVd5si7jY" %}

#### Model 3 back together

Above is the Model 3 reassembled, complete with a working hard-drive activity LED.

I also noticed that the floppy-drive rail in the Model 2 has screw holes that physically accommodate the hard-drive mounting arrangement.

That suggests there is room to install a drive in a Model 2. At this stage I had not verified whether the Model 1 used the same mounting arrangement, or whether either machine provided all of the electrical support needed.

It would be a little ugly in the Model 2 because of the missing front-panel hard-drive LED, while the Model 1 would hide that more neatly.

{% include youtube.html id="rny3ks95yG4" %}

#### Trying an IDE controller in the Model 2

Next came some Promise EIDEMAX action.

With the controller's onboard BIOS disabled it detected a 40 MB IDE drive, but I still couldn't get the TeraDrive to configure it as a usable hard disk.

I suspected some sort of conflict with the TeraDrive motherboard, but that was only a theory. I tried every jumper combination I could think of, including different IRQs and BIOS addresses.

Setting the card as primary with IRQ 14 allowed it to initialise the drive as C:, but the boot process then stalled.

Num Lock still responded, so the machine was not completely frozen.

Close, but no cigar.

This did at least prove worth pursuing. Later in 2012 I got an XTIDE card working in the Model 2 and finally booted it from modern storage.

{% include youtube.html id="iCXQ-E6Oyms" %}

And what day would be complete without some retro gaming?

Too bad the little TeraDrive couldn't keep up!

### Related posts

- [Sega TeraDrive Model 3 Hard Drive Replacement](/sega-teradrive-model-3-hard-drive-replacement/)
- [Sega TeraDrive Model 2 XTIDE Boot Success](/sega-teradrive-model-2-xtide-boot-success/)

### Sources

- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's official specifications show Models 1 and 2 without hard drives and Model 3 with a 30 MB hard drive.
