---
title: "Sony PlayStation Modchip Overview"
author: "Nix McRetro"
date: 2016-01-29T19:39:47.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, sony]
---

First up, a little information on the PlayStation modchips and programmers I was experimenting with around 2016. A lot of this came from educated guesses, forum posts, things I read on the *internet* of all places, and my own trial and error.

Probably shouldn't be taken as gospel! ;)

**Programmers**

My GQ-4X gave me trouble programming some of these PIC devices, particularly around configuration data. That's what happened in my setup, not proof that every GQ-4X behaves the same way.

The MiniPro TL866CS became my weapon of choice for these chips.

My K150 kept "exploding", by which I mean repeatedly losing communication while I tried to program things. Why? Who knows!

I originally wrote that PICkit 2 supported the PIC12F508 but not the PIC12F629. That was wrong: Microchip's PICkit 2 Programmer Application v2.61 device list includes both. The older PIC12C508 does not appear in that list.

**MultiMode3**

MM3 uses the PIC's internal clock source. One advantage is that it works across earlier PlayStation motherboard revisions where Mayumi V4 cannot use the same mechacon-clock arrangement.

**Mayumi 4**

Mayumi V4 uses the PlayStation's mechacon clock on supported motherboards, giving it highly consistent timing. On PU-22 and later boards it also uses the XLAT signal as part of its stealth behaviour.

**OneChip**

OneChip is specifically aimed at the PAL PS one and includes the additional boot-ROM patch needed for that machine.

![TL866CS](/assets/images/2016/img_0450.jpg)

**Later discovery, 5 February 2016:** I worked out why the Mayumi-programmed PIC12C508A and PIC12F508 chips would not read back normally: the original Mayumi v4 code had code protection enabled. That was why the readback differed from some of the MultiMode3 chips I had programmed. The protected readback did not, by itself, mean programming had failed.

It's amazing what you learn after going back to what you were already supposed to know.

Thanks again to Master991 and Bad_Ad84 for helping me work out what was happening.

### Sources

- [ConsoleMods - PS1 Modchips](https://consolemods.org/wiki/PS1:Modchips)
- [Microchip - PICkit 2 v2.61 release notes and device support list](https://ww1.microchip.com/downloads/aemDocuments/documents/OTH/ProductDocuments/SoftwareLibraries/Firmware/PICkit2Readmev2-61-00%28a%29.txt)
- [FatCat - PSone Information](http://www.fatcat.co.nz/psx/ps1.html)
- [Assembler Games - Mayumi v4 on PIC12C508A / PIC12F508](https://web.archive.org/web/20170701144345/https://www.assemblergames.com/threads/mayumi-v4-on-the-pic12c508a-pic12f508.59924/)

### Related posts

- [Mayumi 4 | PIC12F629 | SCPH-7502 | PU-22](/mayumi-4-pic12f629-scph-7502-pu-22/)
- [Mayumi 4 | PIC12C508A | SCPH-7502 | PU-22](/mayumi-4-pic12c508a-scph-7502-pu-22/)
- [Mayumi 4 | PIC12C508A | SCPH-5502 | PU-18](/mayumi-4-pic12c508a-scph-5502-pu-18/)
- [Creating a Sony PlayStation Modchip](/creating-a-sony-playstation-modchip/)
