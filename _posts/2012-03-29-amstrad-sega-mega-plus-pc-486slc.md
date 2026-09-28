---
title: "Amstrad Sega Mega Plus PC 486SLC"
author: "Nix McRetro"
date: 2012-03-29T10:21:03.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0041.jpg)

![](/assets/images/2012/img_0057.jpg)

![](/assets/images/2012/img_0056.jpg)

The PC7486SLC-based Mega PC upgrade CPU speed (actually 33MHz)

Great news, the co-processor for the 486SLC CPU has arrived and is recognised perfectly. It is a ULSI Advanced Math Coprocessor SX/SLC rated at 33MHz. Code US83S87. Also detected as a ULSI 84x87.

![](/assets/images/2012/img_0059.jpg)

![](/assets/images/2012/img_0054.jpg)

![](/assets/images/2012/img_0058.jpg)

I've been able to run MEMTEST 4.10 on the full 16MB of RAM I installed, and it passed with no issues. Sixteen megabytes appears to be the practical maximum for this configuration, although I have not found primary PC7486SLC documentation that conclusively establishes the board limit. MEMTEST 4.20 doesn't run though - it restarts when trying to boot off the floppy.

For now though, I am waiting on the battery for the RTC to arrive from Hong Kong - still a couple of weeks to go. I have also ordered a Disk on Module (DOM) that is 4GB in size and based on SLC instead of MLC. Hopefully it will be recognised OK in the BIOS and be able to boot DOS and Windows with no issues. Time will tell! :D


### Sources

- [Amstrad Mega PC instruction manual](https://manualzz.com/doc/68157046/amstrad-megapc-instruction-manual) - documents the original PC7386SX Mega PC memory expansion limit of 16MB.
- [DOS Days - Typical PCs in 1993](https://www.dosdays.co.uk/topics/1993.php) - reproduces a period listing for an Amstrad Mega Plus 486SLC-33 configuration.
