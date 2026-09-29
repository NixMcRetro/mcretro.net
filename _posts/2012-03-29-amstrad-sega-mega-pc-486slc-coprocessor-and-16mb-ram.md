---
title: "Amstrad Sega Mega PC 486SLC: Coprocessor and 16 MB RAM"
author: "Nix McRetro"
date: 2012-03-29T10:21:03.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0041.jpg)

![](/assets/images/2012/img_0057.jpg)

![](/assets/images/2012/img_0056.jpg)

The PC7486SLC-based Mega PC upgrade really is running at 33 MHz.

Great news: the math coprocessor for the 486SLC has arrived and is recognised perfectly. It is a ULSI Advanced Math Coprocessor SX/SLC rated at 33 MHz, part US83S87. The diagnostic software also identifies it as a ULSI 84x87.

![](/assets/images/2012/img_0059.jpg)

![](/assets/images/2012/img_0054.jpg)

![](/assets/images/2012/img_0058.jpg)

I've also been able to run MEMTEST 4.10 across the full 16 MB of RAM I installed, and it passed with no errors.

Sixteen megabytes also makes sense as the ceiling here. Texas Instruments documents the TI486SLC as directly addressing 16 MB of physical memory through its 24-bit address bus. That does not tell us every detail of the PC7486SLC motherboard's memory implementation, but it does explain why there is no point expecting this CPU to directly address 32 MB.

MEMTEST 4.20 does not run though. It simply restarts when I try to boot it from the floppy.

For now I am still waiting on the replacement RTC module to arrive from Hong Kong. A couple more weeks to go.

I've also ordered a 4 GB Disk on Module using SLC flash rather than MLC. Hopefully the BIOS will recognise it and I can boot DOS and Windows from it without too much drama.

Time will tell! :D

### Related posts

- [Amstrad Sega Mega PC Boot Failure (DOM HD Issues)](/amstrad-sega-mega-pc-boot-failure-dom-hd-issues/)

### Sources

- [Texas Instruments TI486 Microprocessor Reference Guide](https://studylib.net/doc/25873245/1993-ti486-microprocessor-reference-guide) - documents the TI486SLC architecture and 16 MB physical address space.
- [Epson ActionTower 2000 user manual](https://files.support.epson.com/pdf/at2k__/at2k__u1.pdf) - period documentation showing the 83S87-33 coprocessor used with a 486SLC-33 system.
