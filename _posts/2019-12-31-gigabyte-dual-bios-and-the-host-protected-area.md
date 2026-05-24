---
title: "Gigabyte Dual BIOS and the Host Protected Area"
author: "Nix McRetro"
date: 2019-12-31T15:14:21.000+11:00
categories: [ibm-pc]
---

![](/assets/images/2019/img_0637.jpg)

Gigabyte motherboards with an Xpress Recovery BIOS are apparently affected by a bug! The following is taken from [here](http://www.users.on.net/~fzabkar/HDD/HDD_Capacity_FAQ.html).

"When the drive is first in the boot order, Gigabyte's BIOS will write a backup copy of itself to a small Host Protected Area (HPA) at the end of the user area. It then hides this image by reducing the capacity of the drive by a corresponding amount. Unfortunately a bug in the BIOS incorrectly adjusts the drive's capacity after creating the HPA. 1TB drives are reduced to 31/32/33MB, 1.5TB become 500GB, 2TB become 1TB, and 3TB become 2TB (not 2TiB)."

So a big thank you to [these folks](http://www.users.on.net/~fzabkar/HDD/HDD_Capacity_FAQ.html) and [HDAT2](https://www.hdat2.com/).
