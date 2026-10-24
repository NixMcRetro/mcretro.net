---
title: "Preparing to Dump the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive"
author: "Nix McRetro"
date: 2016-04-08T12:54:25.000+10:00
last_modified_at: 2026-10-18
categories: [devkit, sega, youtube]
---

{% include youtube.html id="pJwbkRcOp7s" %}

This is the preliminary setup for preserving the SCSI hard drive from the Sega Dreamcast HKT-0120 development box. Before making any changes to the development kit, I wanted a raw copy of the existing disk in case there was anything cool hiding on it. Or, to use slightly more archival terminology, anything historically interesting!

Fortunately, I'd picked up a Pentium 4 during a rubbish collection not long before this. It was looking for a purpose, and I needed a computer that could talk to an old SCSI hard drive. Perfect! Sometimes bringing home another unwanted PC actually pays off.

The plan was to fit an Adaptec 2940U2 SCSI controller and use the machine to make a copy of the Dreamcast development kit's drive. I also had a large 2 TB SATA drive available for storing the image, which was rather more space than the old SCSI disk was ever likely to need.

First, the Pentium 4 needed some attention. The thermal paste under its heatsink had dried out so badly that it was practically falling apart. I cleaned everything up, applied fresh paste and attempted to reinstall the original Intel cooler. Those plastic retaining clips really are dreadful.

Naturally, the computer wasn't particularly cooperative. It started producing an alarming collection of beeps, and I spent a while removing components to work out what had upset it. Pressing down on the heatsink eventually helped it boot, which wasn't exactly reassuring. Perhaps that's why somebody threw it away!

I also installed a CompactFlash-to-IDE adaptor with the intention of running Linux from a card. That would let me use the SATA drive as the destination for the Dreamcast data while avoiding another mechanical system disk. Debian 8 Jessie seemed like a suitable choice for the job.

With the machine finally starting up, I could see the SCSI controller appearing during startup and the SATA disk being detected by the BIOS. The CPU temperature was also considerably better than before, although there were still a few questionable things happening with the old cooling system.

Getting Debian installed meant dealing with another collection of boot settings, optical-drive noises and hardware that didn't particularly want to cooperate. I had to remind myself how much fun these old PCs can be when you're trying to make them do something useful.

The important thing was establishing a workstation that could access the development kit's SCSI hardware. The drive itself hadn't been dumped yet, so this was very much the preparation stage rather than a successful recovery.

The next two videos cover a GUI (Graphical User Interface) tool and CLI (Command Line Interface) approaches under Linux: ordinary `dd`, then a more recovery-oriented tool if the disk showed read errors. Those are just the methods I happened to try here, not the only ways data recovery can be performed under Linux.

At least the Pentium 4 now had something more interesting to do than sit in a pile of rubbish. Hopefully it'll behave long enough to get the job done!

**Related Posts**

- [The Sega Dreamcast HKT-0120 Development Box Teaser](/the-sega-dreamcast-hkt-0120-development-box-teaser/)
- [Dumping the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive via GUI and dd](/dumping-the-sega-dreamcast-hkt-0120-dev-kit-scsi-hard-drive-via-gui-and-dd/)
- [Dumping the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive with GNU ddrescue](/dumping-the-sega-dreamcast-hkt-0120-dev-kit-scsi-hard-drive-with-gnu-ddrescue/)
