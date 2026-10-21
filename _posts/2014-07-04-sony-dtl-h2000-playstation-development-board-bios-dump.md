---
title: "Sony DTL-H2000 PlayStation Development Board BIOS Dump"
author: "Nix McRetro"
date: 2014-07-04T20:20:24.000+10:00
last_modified_at: 2026-10-22
categories: [devkit, sony, youtube]
---

{% include youtube.html id="fp75Ondsu4M" %}

One of the admins over at [PSXDEV](http://www.psxdev.net/) sent me a BIOS chip from some old Sony PlayStation development hardware to dump. It's from a DTL-H2000, one of Sony's early ISA-bus development boards designed to live inside a PC.

To be honest, I didn't know an awful lot about the DTL-H2000 when the chip arrived. Still, it's an EPROM, I've got a programmer, and that sounds like a perfectly good excuse to spend some time fiddling with old hardware! The sticker on top is dated **27th July 1994**, which makes this a rather interesting little piece of PlayStation history. The chip itself appears to have been manufactured in week 12 of 1995, so the EPROM is somewhat newer than the BIOS it contains.

### Getting the GQ-4X Ready

Out comes the good old GQ-4X programmer, along with my ADP-054 adapter for these larger 16-bit EPROMs. I'm running the programming software under Windows XP in a virtual machine, which naturally means the programmer isn't immediately detected. A little fiddling later and we're back in business, complete with version 6.29 of the software. Exciting times!

The chip is a Hitachi HN27C4000-series EPROM, and there are a couple of different device selections and socket arrangements available in the programmer software. I'll start with the first one and see what happens. The initial attempt produces some data, but subsequent reads aren't giving me consistent checksums. Hmm, that's not quite what we're after.

I try another device selection, only to end up with a whole bunch of nothing. Wonderful! Perhaps it's time to move the chip into the other socket arrangement and see if that makes a difference.

### That's More Like It!

Well, what do you know? Suddenly we've got something that looks considerably more promising, including recognisable text mentioning **Sony Computer Entertainment** and **DTL-H2000**. That's exactly the sort of thing I was hoping to find!

The checksum comes back as `EF7C`, so I read the chip again to see whether we get the same result. `EF7C` again! Much better. The data is consistent between those reads, the expected Sony text is present, and I can finally save the BIOS image.

I haven't attempted to program or erase the original EPROM. It belongs to somebody else, and I suspect they wouldn't appreciate me peeling the label off and experimenting with its contents. Reading it is quite enough excitement for one afternoon!

The resulting BIOS was shared through this [archived PSXDEV discussion](https://web.archive.org/web/20150405104355/http://www.psxdev.net/forum/viewtopic.php?f=54&t=570). Now I suppose I should find out a little more about the hardware it came from, and perhaps see whether there's an emulator capable of doing something interesting with the image.

### Sources

- [PlayStation Specifications - BIOS Versions](https://psx-spx.consoledev.net/ps1/kernelbios/versions/)
- [PlayStation Specifications - PSX Development Board Protocol](https://psx-spx.consoledev.net/dtl/psxdevboardprotocol/)
- [PSXDEV - Original BIOS Discussion (Archived)](https://web.archive.org/web/20150405104355/http://www.psxdev.net/forum/viewtopic.php?f=54&t=570)

### Related Posts

- [GQ-4X EEPROM and EPROM Programmer Test](/gq-4x-eeprom-and-eprom-programmer-test/)
