---
title: "Apple Macintosh LC 475: 4 GB Hitachi Microdrive Testing"
author: "Nix McRetro"
date: 2013-01-02T13:49:57.000+11:00
last_modified_at: 2026-10-18
categories: [apple, hacks, youtube]
---

{% include youtube.html id="GVqcfOrbSKA" %}

A friend loaned me some 4 GB Hitachi Microdrives to try in the LC 475. I've got two of them, one with Apple branding that appears to have come from an iPod mini, and another fairly ordinary-looking one. Let's see if either of them will work with my SCSI card reader.

So far, things have not gone particularly well. First, I had to recreate my Macintosh boot floppy because I'd managed to get rid of the one containing FWB Hard Disk Toolkit 1.6. I tried updating to version 1.6.3, only to discover that it had grown so much it wouldn't fit on the floppy anymore. Excellent!

With a suitable boot disc finally prepared, I tried the first Microdrive. It fitted perfectly into the adapter, but Hard Disk Toolkit couldn't identify its capacity and reported a medium error when I attempted to format it. The second Microdrive wasn't any more cooperative.

Interestingly, my existing 2 GB CompactFlash card worked through the same reader. The Macintosh recognised its capacity and mounted it without any trouble, so perhaps the problem was something peculiar to these Microdrives rather than the SCSI reader itself.

Out came my trusty 800 MHz Pentium III running Windows XP. I tried the drives with two different SCSI cards, both of which were working, but Windows couldn't format either Microdrive. There was also something strange going on with the drive geometry, with different numbers of heads and sectors being reported.

After a little research, I discovered the HP USB Formatter Tool. That sounded promising until I realised I didn't actually have a suitable USB card reader. Naturally! I also tried changing the SCSI termination settings and experimenting with Partition Magic, but neither got me anywhere.

I later got hold of a USB enclosure and confirmed that these particular Microdrives had a roughly 39 MB partition sitting at the beginning of the disk. That appears to be something left behind by whatever device previously used them rather than a built-in characteristic of Hitachi's 4 GB Microdrive itself.

After repartitioning and formatting one of the drives with the HP USB Formatter Tool, I should have a much cleaner test platform for the LC 475. I've also found a Seagate Microdrive to throw into the experiment.

So this is definitely not over yet. Revenge of the Microdrives will follow!

### Related posts

- [MicroDrives: Revenge of the MicroDrives](/apple-macintosh-lc-475-revenge-of-the-microdrives/)

### Sources

- [Hitachi Global Storage Technologies - Microdrive product information](https://www.hitachigst.com/portal/site/en/products/microdrive/) - historical product information for Hitachi Microdrive storage devices.
