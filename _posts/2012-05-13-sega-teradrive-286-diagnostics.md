---
title: "Sega TeraDrive 286 Diagnostics"
author: "Nix McRetro"
date: 2012-05-13T05:14:14.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, sega]
---

![](/assets/images/2012/img_0089.jpg)

Figured I should hit the Sega TeraDrive up with some diagnostics and found out some things I didn't know.

![](/assets/images/2012/img_0100.jpg)

![](/assets/images/2012/img_0098.jpg)

1\. The SEGA menu on startup is based on IBM PC-DOS 3.30. This version of PC-DOS brought support for high density 3.5-inch 1.44MB floppy disk drives. My TeraDrive is equipped with two of these. IBM PC-DOS 3.30 was released on 2 April 1987.

![](/assets/images/2012/img_0093.jpg)

![](/assets/images/2012/img_0088.jpg)

![](/assets/images/2012/img_0087.jpg)

2\. My TeraDrive documentation has a date of May 1991 inside the cover of both books. The chips inside the TeraDrive are timestamped week 09 1991, week 48 1990, week 06 1991 and week 08 1991. The IBM-branded BIOS is dated 22 March 1991. These component date codes place the machine firmly in the TeraDrive's launch period, but they cannot establish its exact final assembly date.

![](/assets/images/2012/img_0099.jpg)

![](/assets/images/2012/img_0095.jpg)

3\. The SEGA startup environment exposes a small RAM disk or virtual drive that is 242,176 bytes large. There is even 87,552 bytes free on this drive. The label is LOADER 1.0. It reports 1 head, 16 sectors and 130 cylinders. Pretty neat. Read speed seems to be around 1300KB-1400KB/sec.

![](/assets/images/2012/img_0097.jpg)

![](/assets/images/2012/img_0096.jpg)

4\. The diagnostic reference I was using associated one beep with a DRAM refresh failure and nine beeps with a ROM BIOS checksum failure. Those mappings are standard AMI BIOS codes, however, and I have not found model-specific documentation confirming that the TeraDrive's IBM-branded BIOS uses the same POST beep scheme.

![](/assets/images/2012/img_0094.jpg)

5\. The video controller is a Paradise/Western Digital WD90C22, with the TeraDrive officially specified as having 256KB of VGA VRAM. The WD90C22 itself supports both Micro Channel and AT-compatible interfaces and includes a PS/2-compatible RAMDAC, so its presence alone does not prove that the TeraDrive is directly derived from a particular IBM PS/2 model.

The full set of Sega TeraDrive (Model 2 and 3) photos can be found in the [photo gallery](/goodies/).


### Sources

- [PCjs - IBM PC DOS 3.30](https://www.pcjs.org/software/pcx86/sys/dos/ibm/3.30/) - documents the 2 April 1987 release and 1.44MB 3.5-inch floppy support.
- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's official TeraDrive specifications, including the 31 May 1991 release and 256KB VGA memory.
- [Microsoft Knowledge Base Archive - BIOS beep codes](https://www.betaarchive.com/wiki/index.php/Microsoft_KB_Archive/85636) - documents common AMI BIOS beep-code meanings, including one beep for DRAM refresh failure and nine for ROM BIOS checksum failure.
- [Western Digital WD90C22 datasheet](https://ftpmirror.your.org/pub/misc/bitsavers/components/westernDigital/_dataSheets/WD90C22_199111.pdf) - documents the controller's AT-compatible and Micro Channel support and PS/2-compatible RAMDAC.
