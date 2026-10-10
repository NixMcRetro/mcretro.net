---
title: "Gigabyte Xpress Recovery and the Host Protected Area"
author: "Nix McRetro"
date: 2019-12-31T15:14:21.000+11:00
categories: [ibm-pc]
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
---

![](/assets/images/2019/img_0637.jpg)

Some Gigabyte boards with an Xpress Recovery BIOS were apparently affected by a rather nasty capacity-reporting bug! The explanation below comes from Franc Zabkar's HDD Capacity FAQ.

"When the drive is first in the boot order, Gigabyte's BIOS will write a backup copy of itself to a small Host Protected Area (HPA) at the end of the user area. It then hides this image by reducing the capacity of the drive by a corresponding amount. Unfortunately a bug in the BIOS incorrectly adjusts the drive's capacity after creating the HPA. 1TB drives are reduced to 31/32/33MB, 1.5TB become 500GB, 2TB become 1TB, and 3TB become 2TB (not 2TiB)."

This concerns the affected BIOS implementations, not every Gigabyte DualBIOS board. A big thank you to Franc Zabkar and [HDAT2](https://www.hdat2.com/hdat2_faq.html). Before changing HPA or capacity settings, back up what you can and check the disk layout.

### Sources

- [Franc Zabkar - HDD Capacity FAQ](https://web.archive.org/web/20181216211558/http://www.users.on.net/~fzabkar/HDD/HDD_Capacity_FAQ.html)
- [Gigabyte - Why is my HDD size is around 2MB~6MB less when using with GIGABYTE m/bs?](https://www.gigabyte.com/bz/Support/FAQ/597)
- [HDAT2 - FAQ](https://www.hdat2.com/hdat2_faq.html)
