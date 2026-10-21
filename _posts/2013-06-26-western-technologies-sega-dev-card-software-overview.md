---
title: "Western Technologies Sega Dev Card Software Overview"
author: "Nix McRetro"
date: 2013-06-26T17:51:55.000+10:00
last_modified_at: 2026-10-22
categories: [devkit, programming, sega]
---

{% include youtube.html id="ak-G2ouUytk" %}

Here's a look at the software running behind the Western Technologies Development Card. I've got the retro PC set up with DOS and Windows, although Windows for Workgroups 3.11 seems particularly appropriate for something of this vintage.

The program itself is called SegaDev, and rather surprisingly I managed to get the hardware communicating without too much trouble. Usually there's an IRQ conflict, a missing driver or something equally wonderful standing between me and a working development tool!

Once connected, the software offers access to the Mega Drive's VRAM, CRAM and VSRAM, along with various VDP registers. There are plenty of interesting options to explore, even if I don't entirely understand what half of them do just yet.

There's also a file transfer utility called SEGALOAD, which sends code from the PC through its parallel connection into SRAM on the development cartridge. The documentation calls this downloading, although from the PC's point of view it feels rather more like uploading. Potato, potato!

A gentleman on ASSEMbler Games kindly supplied the software, which made this little experiment possible. I haven't reached the stage of compiling my own programs yet, but getting the tools connected and seeing the interface working is an excellent start.

It reminded me a little of the Mega EverDrive, which could load game images from an SD card or transfer them from a PC over USB. Different hardware, of course, but a similarly convenient way to get new code running on a Mega Drive without burning another EPROM.

### Related posts

- [Western Technologies Sega Dev Card Demo](/western-technologies-sega-dev-card-demo/)
- [Western Technologies Sega Dev Card SEGALOAD.EXE](/western-technologies-sega-dev-card-segaloadexe/)

### Sources

- [Genesis Programming FAQ - Western Technologies SegaDev Card and SEGALOAD.EXE](https://gamefaqs.gamespot.com/genesis/916377-genesis/faqs/9755)
- [Mega EverDrive User Manual, March 2012](https://stoneagegamer.com/content/flash/legacy/megaed/Mega_EverDrive_Manual_ENGLISH_PCBv1.00_FWv2_OSv1.pdf)
- [Charles MacDonald and Bock - SegaDev hardware inspection and original software](https://www.smspower.org/forums/12038-ZAXZ80HInCircuitEmulatorER308ERX308PWasWhatsInADevkitAnyway)
