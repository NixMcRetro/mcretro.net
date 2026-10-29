---
title: "Apple Macintosh LC 475: Modifications Overview"
author: "Nix McRetro"
date: 2013-01-05T14:00:57.000+11:00
last_modified_at: 2026-10-18
categories: [apple, youtube]
---

{% include youtube.html id="_FUteJfR-zo" %}

Here's an overview of where the LC 475 project has ended up after the last few weeks of modifications. This started as a fairly ordinary 25 MHz 68LC040 pizza-box Macintosh.

It is not particularly ordinary anymore.

I've been working on this machine for a few days now, and although I haven't achieved absolutely everything I wanted, it's looking pretty good inside. There are a few crooked capacitors here and there, which I suppose gives the motherboard a little personality!

By this point I've:

- Overclocked the motherboard from 25 MHz to 33 MHz
- Experimented with replacing the FPU-less 68LC040 with a full 68040
- Expanded and experimented with the VRAM
- Installed 36 MB of system RAM
- Replaced the mechanical SCSI hard drive with solid-state storage through the PCD-60B
- Added PDS Ethernet
- Reduced the fan speed and noise
- Replaced the logic-board capacitors with tantalums

The PCD-60B card reader is particularly handy. I've got a 2 GB CompactFlash card installed, which is acting as the machine's hard drive. I even trimmed one of the connector tabs so the power connector would sit a little more neatly. That's one less mechanical drive to worry about!

The 36 MB RAM consists of 32 MB added memory and the 4 MB already onboard. I've also got 1 MB VRAM fitted, using two 512 KB chips, so the video side has received some attention too.

The PDS ethernet card is showing up on my network at 10 Mbps. Not exactly breathtaking by today's standards, but more than enough for this little machine. There's something particularly satisfying about seeing an old Macintosh appear on a modern router.

As for the overclock, I'm still running the original 25 MHz 68LC040 at 33 MHz. It runs a little warmer, so I've fitted a heatsink to help keep things under control. I've also slowed the fan down with a resistor in its power wiring. More speed from the processor and less noise from the fan. A reasonably good trade!

Not bad for the little Macintosh I originally bought just to play around with.

There are still a few loose ends, particularly the questionable full 68040 replacement, but as a usable retro Mac this thing is coming together very nicely. One day I'll give it a proper software demonstration beyond the odd game of Maniac Mansion.

Now I just need to load it full of games and we'll be away.

Go team AppleTalk!

### Related Posts

- [Apple Macintosh LC 475: Overclocking to 33 MHz](/apple-macintosh-lc-475-overclocking-to-33-mhz/)
- [Apple Macintosh LC 475: RAM Utilisation and 32-Bit Addressing](/apple-macintosh-lc-475-ram-utilisation-and-32-bit-addressing/)
- [Apple Macintosh LC 475: Mismatched VRAM Test](/apple-macintosh-lc-475-mismatched-vram-test/)
- [Apple Macintosh LC 475: Solid-State SCSI Storage with a PCD-60B Card Reader](/apple-macintosh-lc-475-solid-state-scsi-storage-with-a-pcd-60b-card-reader/)
- [Apple Macintosh LC 475: Online with PDS Ethernet](/apple-macintosh-lc-475-online-with-pds-ethernet/)
- [Apple Macintosh LC 475: Slowing the Fan with a Resistor](/apple-macintosh-lc-475-slowing-the-fan-with-a-resistor/)
- [Apple Macintosh LC 475: Tantalum Capacitor Replacement](/apple-macintosh-lc-475-tantalum-capacitor-replacement/)
