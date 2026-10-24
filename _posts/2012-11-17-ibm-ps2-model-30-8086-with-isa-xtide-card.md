---
title: "IBM PS/2 Model 30 8086 with ISA XTIDE Card"
author: "Nix McRetro"
date: 2012-11-17T01:16:29.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="h6eXHUqOZZ0" %}

This was originally just a quick test to prove that the XTIDE card itself worked. I had been fighting with it in the Sega TeraDrive, so the IBM PS/2 Model 30 made a handy known-good 8086 test machine.

The Model 30 is a lovely old IBM computer, and I thought it would be a useful way of eliminating some of the variables. If the XTIDE card worked here, at least I'd know the card wasn't completely hopeless before going back to the TeraDrive.

The experiment involved an ISA XTIDE adaptor and a 4 GB Disk on Module. It's a rather ridiculous amount of storage for an 8086 computer, especially one that would normally have been dealing with much smaller hard drives. Still, why not?

The card was detected by the IBM, and the XTIDE Universal BIOS appeared during startup. That's exactly what I wanted to see. I could also access the drive from the DOS command prompt, although getting the partitioning and formatting sorted out took a little more effort.

I was using an old DOS 3.3 disk, which was producing some rather peculiar results when I tried creating a partition. At one point the disk appeared to have a directory even though it hadn't been properly formatted yet. That's an interesting feature. Perhaps not a particularly useful one!

Eventually I managed to run the format command and transfer the system files. The XTIDE card's activity LED was flashing away quite happily, and the DOS directory command showed the expected files. Success!

The XT-compatible XTIDE Universal BIOS build works here and I can access the 4 GB Disk on Module from the command prompt. XTIDE can handle storage far larger than an original 8086 PC would normally expect, although DOS filesystem and partition limits still determine how much space is practical in each volume.

Booting directly from the new storage was another matter. The machine wasn't quite cooperating with that part of the experiment, so I couldn't call the entire arrangement finished. At least I had proved that the card was being recognised and that the storage could be accessed.

Now I need to make the DOM bootable and move the experiment back into the TeraDrive. I also wondered whether the TeraDrive's two floppy drives might be contributing to the trouble, so there's another little test waiting for me there.

I had originally planned to return the IBM PS/2 to an original-style hard drive. I ordered two drives and a 5.25-inch floppy drive from a seller who seemed increasingly dubious.

**Edit:** The seller never shipped anything and by the time PayPal became involved, it was too late. Scammers... dammit!

**Related Posts**

- [IBM PS/2 Model 30 8086 Sound, Video and CPU Upgrades](/ibm-ps2-model-30-8086-sound-video-and-cpu-upgrades/)
- [Sega TeraDrive Model 2 XTIDE Boot Success](/sega-teradrive-model-2-xtide-boot-success/)

**Sources**

- [XTIDE Universal BIOS](https://www.xtideuniversalbios.org/) - documents XT builds for 8086 and 8088 systems and support for modern ATA storage.
