---
title: "Sega TeraDrive 286 Diagnostics"
author: "Nix McRetro"
date: 2012-05-13T05:14:14.000+10:00
last_modified_at: 2026-10-18
categories: [computing, sega]
share_description: >-
  Diagnostics on a Sega TeraDrive Model 2 reveal PC DOS 3.30, a curious RAM disk, 1991 component dates and a Western Digital video controller. Even its BIOS has mysteries. 💾
---

![Photograph of the SEGA TeraDrive startup menu showing six blue icons and a date display reading 01.03.1980.](/assets/images/2012/img_0089.jpg)

*The TeraDrive's SEGA menu thinks it's 1980. Time travel was apparently included!*
{: .media-caption }

Figured I should hit the Sega TeraDrive up with some diagnostics and found out some things I didn't know.

![Close-up of Snooper system information listing an 80286-10 CPU, IBM BIOS dated 03/22/91, and PC/MS-DOS 3.30.](/assets/images/2012/img_0100.jpg)

*The diagnostics spot a 10 MHz 286, an IBM BIOS dated 22nd March 1991, and PC/MS-DOS 3.30. Now we're getting somewhere.*
{: .media-caption }

![Snooper 3.30 diagnostic screen showing an 80286-10 CPU, PC/MS-DOS 3.30, and a LOADER 1.0 RAM disk.](/assets/images/2012/img_0098.jpg)

*Snooper's overview shows PC/MS-DOS 3.30 and the LOADER 1.0 RAM disk. No physical hard drive required to make things interesting.*
{: .media-caption }

**1.** The embedded SEGA startup environment appears to be based on PC DOS 3.x, and this one reports PC DOS 3.30. That's separate from the IBM DOS J4.0/V software Sega supplied with the TeraDrive.

PC DOS 3.30 dates back to 2 April 1987 and added support for 1.44 MB 3.5-inch floppy disks. My TeraDrive Model 2 has two of those drives, so that all fits rather nicely.

![Close-up of Snooper diagnostics showing IBM BIOS dated 03/22/91 and PC/MS-DOS 3.30.](/assets/images/2012/img_0093.jpg)

*That IBM BIOS date is right there: 22nd March 1991, alongside the PC/MS-DOS 3.30 identification.*
{: .media-caption }

![Close-up of a Western Digital WD76C20-JU chip on the TeraDrive motherboard marked 9109.](/assets/images/2012/img_0088.jpg)

*One of the board's Western Digital chips is marked 9109, which fits week 09 of 1991.*
{: .media-caption }

![Toshiba TMP68HC000N-10 chip marked 9108EAZ on a green TeraDrive circuit board.](/assets/images/2012/img_0087.jpg)

*A Toshiba TMP68HC000N-10 marked 9108EAZ. Another little clue to this machine's age.*
{: .media-caption }

**2.** There's a May 1991 date inside the cover of both TeraDrive manuals. The chips I've checked are marked week 09 1991, week 48 1990, week 06 1991 and week 08 1991, while the IBM-branded BIOS is dated 22 March 1991. Everything points towards a machine built around the TeraDrive's launch period, although I can't pin down its exact assembly date from those markings.

![Snooper disk panel listing LOADER 1.0 as a RAM disk with 242,176 bytes total and 87,552 bytes free.](/assets/images/2012/img_0099.jpg)

*The mystery drive is labelled LOADER 1.0, and Snooper reports 242,176 bytes in total with 87,552 bytes free.*
{: .media-caption }

![SysChk benchmark display showing 10 MHz CPU speed, 12.32 MHz throughput, and disk transfers of 1457.34 and 1309.48 KB/s.](/assets/images/2012/img_0095.jpg)

*A 10 MHz CPU and two suspiciously instant-seeking 'hard disks'. I suspect the RAM disk is having fun with this benchmark.*
{: .media-caption }

**3.** Here's something rather neat. The SEGA startup environment exposes a small RAM disk or virtual drive labelled LOADER 1.0. It's 242,176 bytes in size, with 87,552 bytes still free, and reports 1 head, 16 sectors and 130 cylinders. Read speed seems to be somewhere around 1300 KB to 1400 KB/sec.

![POST CODE MASTER 1.40 reference screen showing AMI BIOS code 0b, one beep, and DRAM Refresh Failure.](/assets/images/2012/img_0097.jpg)

*According to this AMI reference, code 0b and one beep point to a DRAM refresh failure. Whether the TeraDrive agrees is another matter.*
{: .media-caption }

![POST CODE MASTER 1.40 reference screen showing AMI BIOS code 02, nine beeps, and a ROM BIOS checksum failure.](/assets/images/2012/img_0096.jpg)

*The same reference associates nine beeps with a ROM BIOS checksum failure. I'm not declaring the TeraDrive faulty just because a utility says so.*
{: .media-caption }

**4.** The diagnostic reference I was looking at associates one beep with a DRAM refresh failure and nine beeps with a ROM BIOS checksum failure. Those are familiar AMI BIOS beep codes, but whether the IBM-branded TeraDrive BIOS uses the same meanings is another question. I'll need something more specific to this machine before trusting that list.

![SysChk Video Information screen identifying a Paradise WD90C22 VGA chipset and at least 256 KB of video memory.](/assets/images/2012/img_0094.jpg)

*SysChk recognises the VGA chipset as Paradise WD90C22 and reports at least 256 KB of video memory. Another clue, if not necessarily the exact chip model.*
{: .media-caption }

**5.** The diagnostics identify the VGA controller as a Paradise/Western Digital WD90C22, which is interesting because the TeraDrive hardware is documented as using a Western Digital WD90C10-LR. Perhaps the software is recognising the general graphics-controller family rather than the exact chip.

Sega specifies 256 KB of VGA VRAM for the TeraDrive. That's another useful detail to keep in mind while I'm poking around in there. The full set of Sega TeraDrive Model 2 and Model 3 photos can be found in the [photo gallery](/goodies/).

### Sources

- [PCjs: IBM PC DOS 3.30 (2 April 1987; 1.44 MB Floppies)](https://www.pcjs.org/software/pcx86/sys/dos/ibm/3.30/)
- [Sega Hardware Archive: TeraDrive (31 May 1991; IBM DOS J4.0/V)](https://www.sega.jp/fb/segahard/md/tera.html)
- [MAME: Sega TeraDrive Driver (Western Digital WD90C10)](https://github.com/mamedev/mame/blob/master/src/mame/pc/teradrive.cpp)
- [Microsoft KB Archive: AMI BIOS Beep Codes](https://www.betaarchive.com/wiki/index.php/Microsoft_KB_Archive/85636)

### Related Posts

- [Sega TeraDrive Demo: Sonic 1 and Sega Menu](/sega-teradrive-demo-sonic-1-and-sega-menu/)
