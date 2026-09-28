---
title: "Sega TeraDrive Model 2 and Model 3"
author: "Nix McRetro"
date: 2012-06-11T01:15:08.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega, youtube]
---

{% include youtube.html id="mDXXutfmcyI" %}

That's right it is video time, starting off here is the TeraDrive Model 3 getting a hard drive up and running. Very happy with this.

{% include youtube.html id="oQBVd5si7jY" %}

And above is the TeraDrive Model 3 back together complete with working hard drive LED. I did find that the floppy drive rail / guide for the Model 2 has screw holes that physically accommodate the hard-drive mounting arrangement. That suggests there is space to fit a drive in a Model 2. I had not yet verified the same arrangement in a Model 1, or whether either model provided all of the required electrical support. Sure it would be a little ugly on the Model 2, while the Model 1 would hide the missing LED more neatly.

{% include youtube.html id="rny3ks95yG4" %}

Next we have some Promise EIDEMAX action where it detected a 40MB IDE drive with the onboard BIOS disabled. Yet I still could not get the thing to configure to show up as a hard drive. I suspect the issue is somewhere with the chip on the IBM motherboard conflicting. Although I did try every jumper setting I could think of switching IRQs and BIOS addresses. I did find that having it set as primary on any BIOS address with the IRQ set to 14 allowed it to initialise the drive and set it up as Drive C: , however it would hang somewhat, and not progress past that screen. Numlock was still responsive so I am at a bit of a loss. Even still it was a fun exercise and let me look into connecting an IDE drive into this beast.

{% include youtube.html id="iCXQ-E6Oyms" %}

And what day would be complete without some retro gaming! Too bad the little Sega TeraDrive couldn't keep up!


### Sources

- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's official specifications show Models 1 and 2 without hard drives and Model 3 with a 30MB hard drive.
