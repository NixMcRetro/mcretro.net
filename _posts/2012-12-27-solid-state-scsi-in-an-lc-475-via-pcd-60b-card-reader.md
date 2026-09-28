---
title: "Solid State SCSI in an LC 475 via PCD-60B Card Reader"
author: "Nix McRetro"
date: 2012-12-27T12:14:00.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [apple, hacks, youtube]
---

{% include youtube.html id="05efwlfmVnk" %}

The Macintosh LC 475. Now with solid state components for the hard drive. Reliable, check. Dependable, check. Awesome, heck yes! Strictly speaking, the CompactFlash card itself is not a SCSI device. The PCD-60B is the SCSI device and presents the flash card, installed through a PCMCIA-to-CF adapter, to the Macintosh as storage. Inspired by a forum post over at the [68K Mac Liberation Army](https://68kmla.org/bb/threads/se-30-booting-off-cf-success.24191/) I decided to make my LC 475 silent(er). The LC 475 is a solid machine and I love to talk about it. With the old SCSI hard drive removed, it is much quieter, although the remaining fan noise is now much more noticeable. I considered slowing it with a resistor at the time, but reducing fan voltage also reduces cooling. A quieter compatible fan, or any speed reduction backed by temperature testing, would be a better approach.

Overall the process was rather smooth, started work on Christmas day (or eve, I can't remember) and finished up a few days later. The Envoy Data PCD-60B worked a charm. I could not have done it without [The Macintosh Garden](https://macintoshgarden.org/apps/fwb-toolkits-hard-disk-toolkit-v17-v206-raid-toolkit-18) which had the FWB Hard Disk Toolkit utility. This is great for partitioning the compact flash card I used via the PCMCIA -> Compact Flash adapter. 2GB of storage on a 1994 LC? I now have it all.

As always there plenty of photos in the [photo gallery](/photos) for an idea of how well it fits in.


### Sources

- [Apple - Macintosh LC 475 Technical Specifications](https://support.apple.com/en-ug/112204) - documents the LC 475's internal SCSI storage interface.
