---
title: "Apple Macintosh LC 475: 4 GB Hitachi Microdrive Testing"
author: "Nix McRetro"
date: 2013-01-02T13:49:57.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [apple, hacks, youtube]
---

A friend loaned me some 4 GB Hitachi Microdrives to try in the LC 475.

So far, things have not gone particularly well.

The first problem is that I cannot properly inspect or repartition the drives outside the Macintosh because I don't currently have a suitable USB reader. Something strange also appears to be going on with the partition layout.

{% include youtube.html id="GVqcfOrbSKA" %}

I later got hold of a USB enclosure and confirmed that these particular Microdrives have a roughly 39 MB partition sitting at the beginning of the disk. That appears to be something left behind by whatever device previously used them rather than a built-in characteristic of Hitachi's 4 GB Microdrive itself.

After repartitioning and formatting one of the drives with the HP USB Formatter Tool, I should have a much cleaner test platform for the LC 475. I've also found a Seagate Microdrive to throw into the experiment.

So this is definitely not over yet.

Revenge of the Microdrives will follow.

### Related posts

- [MicroDrives: Revenge of the MicroDrives](/microdrives-revenge-of-the-microdrives/)

### Sources

- [Hitachi Global Storage Technologies - Microdrive product information](https://www.hitachigst.com/portal/site/en/products/microdrive/) - historical product information for Hitachi Microdrive storage devices.
