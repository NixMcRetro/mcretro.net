---
title: "Gigabyte Xpress Recovery and the Host Protected Area"
author: "Nix McRetro"
date: 2019-12-31T15:14:21.000+11:00
categories: [ibm-pc]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2019/img_0637.jpg)

Some Gigabyte boards using Xpress Recovery were reported to create a Host Protected Area (HPA) at the end of the boot drive for recovery data, and affected BIOS implementations could leave a drive reporting the wrong capacity. The following explanation comes from Franc Zabkar's HDD Capacity FAQ.

"When the drive is first in the boot order, Gigabyte's BIOS will write a backup copy of itself to a small Host Protected Area (HPA) at the end of the user area. It then hides this image by reducing the capacity of the drive by a corresponding amount. Unfortunately a bug in the BIOS incorrectly adjusts the drive's capacity after creating the HPA. 1TB drives are reduced to 31/32/33MB, 1.5TB become 500GB, 2TB become 1TB, and 3TB become 2TB (not 2TiB)."

So this is about affected Gigabyte/Xpress Recovery implementations, not every motherboard carrying Gigabyte's DualBIOS branding. HDAT2 can inspect and modify HPA settings, but changing HPA or drive-capacity settings without understanding the existing disk layout is not something to do casually.

### Sources

- [Franc Zabkar - HDD Capacity FAQ (archived)](https://web.archive.org/web/20181216211558/http://www.users.on.net/~fzabkar/HDD/HDD_Capacity_FAQ.html)
- [Gigabyte - Xpress Recovery and HPA support](https://www.gigabyte.com/bz/Support/FAQ/597)
- [HDAT2](https://web.archive.org/web/20260511194612/https://www.hdat2.com/)