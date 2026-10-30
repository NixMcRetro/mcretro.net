---
title: "Sega TeraDrive Model 2 XTIDE Boot Success"
author: "Nix McRetro"
date: 2012-11-18T01:29:16.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, sega, youtube]
---


{% include youtube.html id="JbVqMpC_vAo" %}

Victory! The Sega TeraDrive Model 2 can now boot from the XTIDE setup all the way to a DOS command prompt. It took a bit more fiddling than I'd hoped, but this is a fairly important little milestone.

Sega sold the Model 2 with two 3.5-inch floppy drives and no internal hard drive, so persistent mass storage has been one of the big limitations of this machine from the beginning. The XTIDE card gives the old 286 an 8-bit ISA route to modern ATA storage, and the TopSSD Disk on Module is finally behaving like a real boot drive.

Initially I could access the drive after booting DOS from a floppy, but the TeraDrive wouldn't start directly from it. I'd formatted the drive and transferred the system files, yet something still wasn't quite right. The version of DOS I was using didn't seem to have the tools I needed to repair the boot setup either.

I had a look through FDISK, then decided to start again with an MS-DOS 6.22 boot disk. After repartitioning the drive and creating a 2 GB partition, I formatted it and transferred the system files again. That's more than enough storage for a humble 286 TeraDrive.

The next step was running `FDISK /MBR` to rebuild the master boot record. With that done, I removed the floppy and rebooted the machine to see whether the XTIDE BIOS could finally start DOS from the drive. And there it was! A proper boot from the XTIDE setup, followed by DOS appearing on the screen. Fantastic!

There is still one little quirk. When the machine starts from cold, it first checks the floppy drives and drops into the Sega startup menu rather than going straight to the XTIDE boot process. I tried several setup and configuration options without finding a way around it.

It isn't really a disaster, because the Sega menu looks rather nice. From there I can select the hard drive or one of the floppy drives, and the XTIDE menu eventually appears with the option to boot from the new storage. Would I remove the Sega screen if I could? Probably, but then I'd want to put it back again.

Next stop: MS-DOS 6.22 and Windows 3.1. Ever notice that 6.22 is DOUBLE that of 3.11? Never mind that I'm actually installing 3.1... Accident? Conspiracy theorists, book your flights. The forum starts in six hours.

The XTIDE card really is an amazing piece of hardware. Thanks to the Vintage Computer community and the XTIDE developers for giving old machines like this a practical way to use modern storage. Considering how many failed controller experiments came before this one, I'm rather pleased to have it working.

**Related Posts**

- [Sega TeraDrive Model 2 and Model 3 Storage Tests](/sega-teradrive-model-2-and-model-3-storage-tests/)
- [XTIDE Settings for the Sega TeraDrive](/xtide-settings-for-the-sega-teradrive/)
- [Sega TeraDrive Model 2: Installing Windows 3.1 with XTIDE](/sega-teradrive-model-2-installing-windows-31-with-xtide/)

**Sources**

- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's official specifications show the Model 2 with two floppy drives and no hard drive.
- [XTIDE Universal BIOS](https://www.xtideuniversalbios.org/) - documents the XTIDE BIOS and support for ATA storage on older PCs.
