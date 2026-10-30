---
title: "Sharp PC-4521 Internal View"
author: "Nix McRetro"
date: 2012-10-08T21:54:15.000+11:00
last_modified_at: 2026-10-21
categories: [ibm-pc, repairs, youtube]
---

{% include youtube.html id="dv3meSTSrdc" %}

Here's something a little different: a Sharp PC-4521 from the PC-4500 portable-computer family. This one isn't mine. I just managed to have a poke around inside it while the owner was absent!

The PC-4521 was the hard-drive-equipped version of the series. It uses a NEC V40 processor running at 7.16 MHz, has 640 KB of RAM, a 720 KB floppy drive and a 20 MB hard drive. The display is a backlit monochrome LCD with a rather unusual resolution of 640 x 200 pixels. What an aspect ratio!

Inside, there's a collection of boards and connectors packed around the keyboard and storage hardware. The hard drive is particularly interesting because it uses a proprietary connection to an upright controller board. The original drive in this machine was made by JVC, and unfortunately it wasn't working properly.

I managed to get a closer look at the drive's behaviour during the recording. The spindle would start, but the head mechanism appeared to become stuck around its locking arrangement. I experimented with preventing the mechanism from locking again, but the drive still wasn't behaving reliably.

The floppy drive was also rather temperamental, although it worked well enough for occasional testing. The machine uses a sealed lead-acid battery, and there's plenty of other interesting hardware hidden beneath that wonderfully large keyboard.

{% include youtube.html id="sibrJ_1otvs" %}

The second video shows the Sharp mostly back together, with a look at the outside and a demonstration of it running. The first thing that catches my attention is the enormous backlit screen. It has separate brightness and contrast controls, and the unusual dimensions make ordinary software look rather stretched.

There's also a low-battery warning during startup, which isn't particularly surprising for a machine of this age. I was experimenting with an external power adapter, but it didn't appear to provide the current the computer needed. Anyone restoring one of these should check the original electrical specifications rather than copying my improvised test arrangement.

The hard-drive problem shows up as a `1701-C` error, after which the machine attempts to continue with its floppy drive. There's even a dedicated setup key above Escape, and the configuration screen offers a slower operating mode for compatibility with older software.

Around the case are a collection of ports, including a large connector hidden behind a metal plate. I haven't worked out exactly what that's for, but it certainly adds to the interesting collection of unusual features on this machine.

Despite the storage trouble, it's a lovely old portable computer. The screen, keyboard and internal construction are all worth a closer look. It's just a shame that the hard drive has decided not to cooperate!

**Sources**

- [Sharp - PC-4521 Portable Personal Computer brochure](https://bitsavers.trailing-edge.com/pdf/sharp/brochures/SharpPC-4521PortablePC.pdf) - manufacturer specifications for the processor, memory, storage and display.
- [IT History Society - Sharp PC-4500](https://ithistory.org/hardware/sharp-pc-4500) - historical reference for the PC-4500 family.
