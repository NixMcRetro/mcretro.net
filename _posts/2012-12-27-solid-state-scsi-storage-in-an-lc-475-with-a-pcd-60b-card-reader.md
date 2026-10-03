---
title: "Solid-State SCSI Storage in an LC 475 with a PCD-60B Card Reader"
author: "Nix McRetro"
date: 2012-12-27T12:14:00.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [apple, hacks, youtube]
---

{% include youtube.html id="05efwlfmVnk" %}

The Macintosh LC 475.

Now with solid-state storage.

Reliable, check.

Quiet, check.

Awesome, heck yes!

Strictly speaking, the CompactFlash card is not a SCSI device. The Envoy Data PCD-60B is the SCSI device seen by the Macintosh. I am then using its PCMCIA slot with a PCMCIA-to-CompactFlash adapter and a CF card installed behind that.

Inspired by a thread over at the [68K Macintosh Liberation Army](https://68kmla.org/bb/threads/se-30-booting-off-cf-success.24191/), I decided to see whether this setup could replace the LC 475's mechanical SCSI hard drive.

Removing the old hard drive makes the machine dramatically quieter. Of course, that means the remaining fan noise suddenly sounds much louder.

At the time I considered slowing the fan with a resistor. Reducing the fan voltage also reduces airflow, though, so a quieter compatible fan or any speed reduction backed by actual temperature testing is the more sensible approach.

The whole storage conversion went surprisingly smoothly. I started around Christmas Eve or Christmas Day, I can't remember which, and had it working a few days later. The PCD-60B worked beautifully. [FWB Hard Disk Toolkit](https://macintoshgarden.org/apps/fwb-toolkits-hard-disk-toolkit-v17-v206-raid-toolkit-18) from Macintosh Garden let me initialise and partition the CompactFlash card for the Mac.

Two gigabytes of silent storage in an LC 475.

I now have it all.

As always there are plenty of photos in the [photo gallery](/goodies/) for an idea of how well it fits in.

### Sources

- [Apple - Macintosh LC 475 Technical Specifications](https://support.apple.com/en-ug/112204) - documents the LC 475's internal SCSI storage interface.
