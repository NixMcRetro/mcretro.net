---
title: "Amstrad Sega Mega PC Boot Failure: DOM and Hard Drive Troubleshooting"
author: "Nix McRetro"
date: 2012-11-03T14:28:42.000+11:00
last_modified_at: 2026-10-03
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-03
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, repairs, youtube]
---

{% include youtube.html id="jtELwBEe-Ek" %}

Sometimes it is good that things break.

[CityEscaper](https://www.youtube.com/user/CityEscaper) asked whether I could pull the Mega PC out and test it on some different displays around the house. The video output works on my Samsung LCD TV and on my ViewSonic computer LCD from around 2004 to 2005. My newer Toshiba LCD TV wants nothing to do with it.

Fair enough.

![](/assets/images/2012/img_0345.jpg)

### Boot failure

More importantly, pulling the machine out uncovered a storage problem. The SSD or Disk on Module setup was clearly involved in the boot failure. Returning the original 107 MB hard drive restored normal booting immediately. That told me the Mega PC itself was still capable of booting, but it did **not** isolate whether the problem was the DOM hardware, partitioning, BIOS geometry, boot configuration or some other compatibility issue.

So we wind the clock back and join 1992 with a 107 MB hard drive.

I've installed MS-DOS 6.22 alongside Windows for Workgroups 3.11 with a touch of Calmira.

I also forgot to enable the CPU cache in the BIOS. Must remember that tomorrow. It makes an enormous difference on this 486SLC.

### Power supply

I also got a chance to open the Mega PC power supply and document the internals. It is a Seasonic SSA-4065K, revision B1, rated at 65 W. Nothing immediately looks catastrophic.

![](/assets/images/2012/img_0350.jpg)

Opening a mains power supply exposes hazardous circuitry, and capacitors can retain charge after disconnection.

I also took down the fan details because it is far too noisy. The fan is a 60 mm, 12 V unit wired directly into the PSU and carries a 1992 date stamp. That should make replacement fairly straightforward one day, provided the replacement fan's electrical and airflow characteristics are suitable.

One day!

![](/assets/images/2012/img_0349.jpg)

![](/assets/images/2012/img_0348.jpg)

![](/assets/images/2012/img_0347.jpg)

![](/assets/images/2012/img_0346.jpg)

### Related posts

- [Amstrad Sega Mega PC 486SLC Upgrade Experiment](/amstrad-sega-mega-pc-486slc-upgrade-experiment/)
- [Amstrad Sega Mega PC 486SLC: Coprocessor and 16 MB RAM](/amstrad-sega-mega-pc-486slc-coprocessor-and-16mb-ram/)

### Sources

- [HSE - Electrical safety: Frequently asked questions](https://www.hse.gov.uk/electricity/faq.htm) - explains safe isolation and the need to release stored energy before electrical work.
