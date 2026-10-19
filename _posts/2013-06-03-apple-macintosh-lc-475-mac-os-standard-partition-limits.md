---
title: "Apple Macintosh LC 475: Mac OS Standard Partition Limits!"
author: "Nix McRetro"
date: 2013-06-03
last_modified_at: 2026-10-20
categories: [apple, reconstructed, youtube]
---

{% include youtube.html id="6qrE_3GwjMs" %}

I think we've finally got it worked out! After all the messing around with CompactFlash cards and Microdrives, I've discovered that the size of the partitions is rather important when trying to use larger storage devices on the LC 475. That 8 GB CompactFlash card might be overkill, but I'm determined to make it useful!

I've prepared the card on another computer using FAT32 and an MBR partition scheme. Back on the Macintosh, I'm booting from a floppy containing a very stripped-down Mac OS 8.0 system folder and FWB HDT Primer PE. There's just enough room on the floppy to run the partitioning software, which is really all I need for this experiment.

The software will happily let me create Mac OS Standard partitions approaching 4 GB, but that's where things start getting interesting. Although the partitions can be created and formatted, copying files onto them isn't working properly. Sometimes the software freezes, and sometimes the files simply refuse to copy. Not much use having several gigabytes of storage if you can't actually put anything on it!

After experimenting with much smaller partitions and working my way back up, it appears that keeping them to around 2 GB is the answer. Files copy successfully, and after a reboot the setup is working! At least with this particular combination of hardware and software, 2 GB partitions seem to be where it's at. The partitioning utility might allow larger ones, but that doesn't make them particularly useful.

So there we have it! An 8 GB CompactFlash card can still be used by dividing the space into smaller partitions. Two gigabytes per partition is an enormous amount of storage for a machine like this anyway. Even the 2 GB cards I've been using already offer more than enough room for a healthy collection of old Macintosh games.

Fantastic! I'm glad we've finally got that one sorted!

### Related posts

- [Apple Macintosh LC 475: 4 GB Hitachi Microdrive Testing](/apple-macintosh-lc-475-4gb-hitachi-microdrive-testing/)
- [Solid-State SCSI Storage in an LC 475 with a PCD-60B Card Reader](/solid-state-scsi-storage-in-an-lc-475-with-a-pcd-60b-card-reader/)
- [Apple Macintosh LC 475 Game Demo - Hangman Plus](/apple-macintosh-lc-475-game-demo-hangman-plus/)
