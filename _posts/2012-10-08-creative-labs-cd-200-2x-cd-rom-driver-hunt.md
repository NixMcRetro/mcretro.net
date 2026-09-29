---
title: "Creative Labs CD-200 2x CD-ROM Driver Hunt"
author: "Nix McRetro"
date: 2012-10-08T21:59:31.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs]
---

{% include youtube.html id="VepV0tWWzyU" %}

So little information seems to exist about this particular Creative Labs CD-200 that I figured I'd better document the struggle.

At this point I had a desktop absolutely covered in driver files and still hadn't found the magic combination.

The first video shows where the investigation had reached.

{% include youtube.html id="gLqXzP_-q38" %}

And the search continues...

I did eventually get the beast working.

The driver I needed was Creative's `CCD.SYS`, with `CRCCD.SYS` also belonging to the same CD-200 driver family. MSCDEX then provides the DOS drive letter once the hardware driver has loaded.

I documented the exact `CONFIG.SYS` and `AUTOEXEC.BAT` setup in the follow-up post.

Once I get this beast working, we'll have a BBQ party, I said.

Looks like I owe everyone a BBQ.

![](/assets/images/2012/img_0281.jpg)

![](/assets/images/2012/img_0282.jpg)

![](/assets/images/2012/img_0283.jpg)

### Related posts

- [Creative Labs CD-200 2x CD-ROM Success](/creative-labs-cd-200-2x-cd-rom-success/)

### Sources

- [Creative CD-ROM driver archive](https://driverzone.com/drivers/creative/cdrom/crccd.htm) - preserves Creative documentation identifying CCD.SYS and CRCCD.SYS as drivers for the CD-200 family.
