---
title: "Sega TeraDrive Model 2 and Model 3 Storage Tests"
author: "Nix McRetro"
date: 2012-06-11T01:15:08.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
---

{% include youtube.html id="mDXXutfmcyI" %}

That's right, it's video time! I've finally got a hard drive installed and working in my Sega TeraDrive Model 3. It's a Western Digital WDL-330P with a capacity of 30 MB, which matches the original storage specification rather nicely.

I picked up several of these old drives, although not all of them worked. Three were usable, with surface scans reporting different numbers of bad blocks. Naturally, I ended up installing the one with the most bad blocks, twelve of them, while the others had fewer. Perhaps that wasn't the most sensible choice, but the drive was already in its original packaging and seemed worth trying!

Windows is considerably more pleasant to use when it doesn't have to load everything from a floppy disk. I've got Windows 3.1 running on the Model 3, and even Solitaire feels wonderfully quick compared with my earlier TeraDrive floppy experiments.

The machine still tends to open the Sega startup menu before I enter DOS, rather than booting straight from the drive. I haven't worked out the correct configuration for that yet, but at least the hard drive is accessible and the software is running.

{% include youtube.html id="oQBVd5si7jY" %}

Here's the Model 3 back together. The hard drive is surprisingly quiet, and the little amber activity light looks fantastic. After all the trouble I've had with TeraDrive storage, it's particularly satisfying seeing that light blinking away while Windows loads.

I also noticed that the floppy-drive mounting rail in my Model 2 has holes that could accommodate a hard-drive bracket. That suggests there may be enough physical space to fit a drive, although I hadn't established whether the necessary electrical connections were available. The Model 2 would also be missing the rather lovely front-panel hard-drive light.

{% include youtube.html id="rny3ks95yG4" %}

Next came an experiment with my Model 2 and a Promise EIDEMAX controller. I've connected a Conner Peripherals 40 MB drive and disabled the card's onboard BIOS to see whether the TeraDrive can make any use of it.

To my surprise, the controller managed to detect the drive and even begin a surface scan. That's encouraging, especially since I'd been having so much trouble getting an ordinary hard drive to work with this model.

Unfortunately, detecting a drive isn't the same as booting from it. I tried different controller settings, including IRQs and BIOS addresses. Setting the card as primary with IRQ 14 allowed it to initialise the drive as C:, but the boot process stalled. Num Lock still responded, so the entire computer hadn't completely frozen.

Close, but no cigar. I suspected a conflict with the TeraDrive motherboard, although I hadn't established exactly what was causing it. I later managed to get an XTIDE card working in the Model 2, which finally gave me another way to boot from storage.

{% include youtube.html id="iCXQ-E6Oyms" %}

And what day would be complete without a little retro gaming? Unfortunately, the little TeraDrive wasn't quite keeping up with everything I wanted to throw at it. Still, I'm rather pleased to have the Model 3 running from a hard drive and the Model 2 showing at least some promise with its storage experiments.

**Related Posts**

- [Sega TeraDrive Model 3 Hard Drive Replacement](/sega-teradrive-model-3-hard-drive-replacement/)
- [Sega TeraDrive Model 2 XTIDE Boot Success](/sega-teradrive-model-2-xtide-boot-success/)

**Sources**

- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's original specifications for the Model 1, Model 2 and hard-drive-equipped Model 3.
