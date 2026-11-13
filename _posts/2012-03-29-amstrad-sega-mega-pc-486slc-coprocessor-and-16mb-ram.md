---
title: "Amstrad Sega Mega PC 486SLC: Coprocessor and 16 MB RAM"
author: "Nix McRetro"
date: 2012-03-29T10:21:03.000+11:00
last_modified_at: 2026-10-18
categories: [computing, repairs, sega]
share_description: >-
  The Amstrad Mega PC's 33 MHz 486SLC upgrade gets a working ULSI maths coprocessor and 16 MB of tested RAM. Now for that elusive replacement clock module! 🖥️
---

![ULSI US83S87 Advanced Math Coprocessor marked SX/SLC installed in a square socket on the Mega PC 486SLC motherboard.](/assets/images/2012/img_0041.jpg)

*Finally, the empty coprocessor socket has company. And it's even recognised correctly!*
{: .media-caption }

![Diagnostic CPU information screen identifying a 33 MHz Cyrix/TI/SGS 486-class processor and ULSI 84x87 floating-point unit.](/assets/images/2012/img_0057.jpg)

*Diagnostic software picks up the ULSI as an 84x87. Good enough for me!*
{: .media-caption }

![MAXUM Processor Clock Speed Test result showing 34 MHz in large white digits on a black screen.](/assets/images/2012/img_0056.jpg)

*MAXUM reckons 34 MHz. Close enough to the 33 MHz it is supposed to be running at!*
{: .media-caption }

The PC7486SLC-based Amstrad Mega PC Plus upgrade really is running at 33 MHz. Great news: the math coprocessor for the 486SLC has arrived and is recognised perfectly. It is a ULSI Advanced Math Coprocessor SX/SLC rated at 33 MHz, part US83S87. The diagnostic software also identifies it as a ULSI 84x87.

![Memtest86 v2.00 screen testing 16 MB of RAM and showing zero errors while a test is in progress.](/assets/images/2012/img_0059.jpg)

*Sixteen whole megabytes! Memtest has plenty to chew through, and I eventually got a clean pass.*
{: .media-caption }

![Four installed SIMM modules beside an empty square coprocessor socket on the 486SLC motherboard.](/assets/images/2012/img_0054.jpg)

*Four SIMM modules in their slots, and the coprocessor socket still empty in this earlier photo. The full 16 MB upgrade is now working.*
{: .media-caption }

![AMIBIOS system information showing 640 KB base memory and 15,232 KB extended memory.](/assets/images/2012/img_0058.jpg)

*AMIBIOS reports 640 KB base memory and 15,232 KB extended. Not a bad amount of RAM for this little machine!*
{: .media-caption }

I've also been able to run MEMTEST 4.10 across the full 16 MB of RAM I installed, and it passed with no errors. MEMTEST 4.20 does not run though. It simply restarts when I try to boot it from the floppy.

The 16 MB ceiling makes sense, too. The TI486SLC has a 24-bit address bus and can directly address 16 MB of physical memory. No point expecting to squeeze 32 MB out of that CPU!

For now I am still waiting on the replacement RTC module to arrive from Hong Kong. A couple more weeks to go. I've also ordered a 4 GB Disk on Module using SLC flash rather than MLC. Hopefully the BIOS will recognise it and I can boot DOS and Windows from it without too much drama. Time will tell! :D

### Sources

- [Texas Instruments: TI486 Microprocessor Reference Guide](https://studylib.net/doc/25873245/1993-ti486-microprocessor-reference-guide)
- [Epson: ActionTower 2000 User Manual (83S87-33 and 486SLC-33)](https://files.support.epson.com/pdf/at2k__/at2k__u1.pdf)

### Related Posts

- [Amstrad Sega Mega PC Boot Failure: DOM and Hard Drive Troubleshooting](/amstrad-sega-mega-pc-boot-failure-dom-and-hard-drive-troubleshooting/)
