---
title: "Apple Macintosh LC 475: 256 MB PCMCIA Flash Card Test"
author: "Nix McRetro"
date: 2013-01-17T10:49:35.000+11:00
last_modified_at: 2026-10-18
categories: [apple, hacks, youtube]
---

{% include youtube.html id="bHaYgYzdaOI" %}

Another round of experiments with the PCD-60B SCSI card reader in the LC 475. The SD-card adapter still isn't cooperating, and the Microdrives have not exactly covered themselves in glory either. Today I've got a few more things to try, including a 256 MB PCMCIA flash card. Surely something is going to work!

First up was a standard SD card in an adapter, not the newer SDHC variety. It fitted nicely, but the formatting software wasn't particularly interested in doing anything useful with it. I tried another utility and found myself staring at errors and progress indicators that didn't seem to be progressing.

So I switched over to the 256 MB PCMCIA card and fired up FWB Hard Disk Toolkit. This seemed a little more promising, although the initial attempts to format and partition it weren't terribly successful. The utility would start testing the media, get partway through and then apparently give up.

Back to the SD cards for another attempt! I tried both a 2 GB card and a smaller 128 MB card, but neither was recognised properly. The volume and capacity were still showing as unavailable, which was becoming a rather familiar sight.

The 256 MB card was at least getting further than the others, so I decided to give it another go. After a few restarts and some fiddling with the partitioning options, I found that interrupting the lengthy media test with Command-period appeared to let the initialisation proceed. Interesting!

This time Hard Disk Toolkit managed to create a usable partition, and the Macintosh could see the card properly. I copied a System Folder across and gave it the ultimate test. One restart later, the LC 475 booted from the PCMCIA flash card!

Finally! Something works!

The CompactFlash solution is still rather attractive because I can swap cards around and hopefully make backup images of them. But having a working 256 MB PCMCIA card gives me another option, and it's nice to know the PCD-60B can handle more than just my existing CompactFlash setup.

As for the SD cards and those troublesome 4 GB Microdrives, well, there's still some investigating to do. Compatibility seems to depend on the particular card, adapter and formatting software, so I'm not giving up on them just yet.

There is still hope. A glimmer of hope, anyway!

### Related posts

- [Solid-State SCSI Storage in an LC 475 with a PCD-60B Card Reader](/solid-state-scsi-storage-in-an-lc-475-with-a-pcd-60b-card-reader/)
- [Apple Macintosh LC 475: 4 GB Hitachi Microdrive Testing](/apple-macintosh-lc-475-4gb-hitachi-microdrive-testing/)

### Sources

- [MPC Forums - SCSI problem](https://www.mpc-forums.com/viewtopic.php?p=1669532) - December 2014 discussion of PCD-60B card-reader use with MPC samplers; later compatibility context, not evidence of this Macintosh test.
