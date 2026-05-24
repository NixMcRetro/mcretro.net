---
title: "Sega TeraDrive 286 Diagnostics"
author: "Nix McRetro"
date: 2012-05-13T05:14:14.000+10:00
categories: [ibm-pc, sega]
---

![](/assets/images/2012/img_0089.jpg)

Figured I should hit the Sega TeraDrive up with some diagnostics and found out some things I didn't know.

![](/assets/images/2012/img_0100.jpg)

![](/assets/images/2012/img_0098.jpg)

1\. The SEGA menu on startup is based on IBM PC-DOS 3.30. This version of PC-DOS brought support for high density 3½-inch 1.44 MB floppy disk drives - My TeraDrive is equipped with two of these. IBM PC-DOS 3.30 was released on 2nd of April 1987.

![](/assets/images/2012/img_0093.jpg)

![](/assets/images/2012/img_0088.jpg)

![](/assets/images/2012/img_0087.jpg)

2\. My TeraDrive documentation has a date of May 1991 inside the cover of both books. The chips inside the TeraDrive are timestamped week 09 1991, week 48 1990, week 06 1991, week 08 1991. Early April would have been when the machine was complete going off these. The BIOS date stamp is 22nd of March 1991 and is branded IBM.

![](/assets/images/2012/img_0099.jpg)

![](/assets/images/2012/img_0095.jpg)

3\. The IBM DOS partition is hidden away as a RAM disk and is 242,176 bytes large. There is even 87,552 bytes free on this drive. The label on the partition is LOADER 1.0. 1 head, 16 sectors, 130 cylinders. Pretty neat. Read speed seems to be around 1300KB-1400KB/sec.

![](/assets/images/2012/img_0097.jpg)

![](/assets/images/2012/img_0096.jpg)

4\. 1 beep / 1 tone means there has been a DRAM refresh failure. 9 beeps / 9 tones indicate that the ROM BIOS checksum has failed.

![](/assets/images/2012/img_0094.jpg)

5\. The video chip is a Paradise WD90C22 chip with around 256K of VRAM. From this it is likely that the TeraDrive has a close relative in the 286-based IBM Personal System/2 series.

The full set of Sega TeraDrive (Model 2 and 3) photos can be found in the [photo gallery](/goodies/).
