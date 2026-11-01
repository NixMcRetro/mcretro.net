---
title: "Sega TeraDrive Model 2: Installing Windows 3.1 with XTIDE"
author: "Nix McRetro"
date: 2012-11-18T01:33:10.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, microsoft, sega]
---


{% include youtube.html id="Lv1GlH_As1c" %}

Now that the Sega TeraDrive Model 2 can boot from my XTIDE card, it's finally time to install Windows properly. I've spent far too much time squeezing stripped-down copies of Windows onto floppy disks and RAM drives, so having something resembling a real hard drive is a rather exciting development. The new Disk on Module gives me 2 GB of storage, which is almost absurd for a 286!

I've already installed MS-DOS 6.22, and now I'm putting Windows 3.1 on the machine. The TeraDrive's PC side is a 10 MHz 80286, which can run Windows 3.1 in Standard Mode. It won't support the 386 Enhanced Mode features, but that's hardly a surprise. We're talking about a machine that was never intended to be particularly quick, even when it was new.

The Disk on Module is attached to the XTIDE card and provides persistent storage without needing to load everything into a RAM disk first. I also rather like that the module runs from 5 V, avoiding the need to arrange a separate 12 V supply for a conventional hard drive. I'd been investigating the TeraDrive's unusual internal hard-drive connector and wasn't particularly keen to start rewiring things unless I had to.

Installing DOS and Windows still takes a fair while, of course. There's plenty of disk activity, plenty of waiting and the occasional opportunity to wonder why I keep doing this to myself. But the installation eventually finishes, Windows boots and we're actually in business!

Naturally, no TeraDrive Windows demonstration would be complete without a quick game of Solitaire. It isn't exactly blisteringly fast, and I'm beginning to think I've become a little too accustomed to 386 machines, but seeing Windows running from proper storage on the Model 2 is rather satisfying.

If you're trying something similar, the [Vintage Computer XTIDE support thread](https://forum.vcfed.org/index.php?threads/xtide-tech-support-thread.19870/) and the project documentation are worth reading. I didn't need to ask for direct assistance on this installation, but the information already available saved me a fair bit of work.

The little TeraDrive is finally starting to feel like a real PC rather than an elaborate floppy-disk endurance test. Now perhaps I can start using the thing instead of watching it load!

### Related posts

- [Sega TeraDrive Model 2 XTIDE Boot Success](/sega-teradrive-model-2-xtide-boot-success/)
- [XTIDE Settings for the Sega TeraDrive](/xtide-settings-for-the-sega-teradrive/)
- [Sega TeraDrive Model 2 with Windows 3.11 in a RAM Disk](/sega-teradrive-model-2-with-windows-311-in-a-ram-disk/)

### Sources

- [Microsoft - Windows 3.1 Hardware Compatibility List, Q83210](https://jeffpar.github.io/kbarchive/kb/083/Q83210/) - the archived Microsoft article distinguishes Standard Mode on 80286 systems from Standard and 386 Enhanced Mode on 80386/80486 systems.
- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's specifications identify the PC CPU as a 10 MHz 80286.
- [XTIDE Universal BIOS](https://www.xtideuniversalbios.org/) - project documentation for XTIDE BIOS configuration and ATA storage support.
