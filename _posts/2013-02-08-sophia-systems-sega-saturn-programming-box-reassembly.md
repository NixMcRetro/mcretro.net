---
title: "Sophia Systems Sega Saturn Programming Box Reassembly"
author: "Nix McRetro"
date: 2013-02-08T10:16:00.000+11:00
last_modified_at: 2026-10-18
categories: [devkit, repairs, sega]
---

{% include youtube.html id="f2DiGI8_7so" %}

Here's a brief video of Sophia going back together. Well, halfway. The mainboard is back in, but the RAM board is still out because I need to photograph it properly first. Sophia has been sitting in pieces for months while I've been documenting the internals, cleaning the boards, and working out what makes this development system different from an ordinary Saturn.

The previous owner appears to have smoked around the machine. A lot. There was a thick layer of grime across the metalwork and fan grille, so I've been giving everything a proper clean. The grille is looking rather shiny now, although a few of the capacitors are another matter.

Several surface-mount electrolytics look suspicious, particularly C69, which has residue around it. That's something I'll need to investigate before treating the machine as restored. The missing processor cards are still the bigger problem, though. My Sophia arrived without its removable SH-2 CPU boards, so I can't simply put it back together and expect it to boot.

A normal dual-SH-2 configuration needs processor hardware in both positions, although specialised ICE or pod hardware could be used in some development arrangements. For now, I can at least finish the photographs, reassemble the case, and reclaim some desk space. The Cross Products Mega-CD development unit is waiting for its turn, and I'd rather not have two enormous devkits scattered around the room simultaneously!

{% include youtube.html id="3E4Gvue9Im8" %}

And finally, after somewhere between six and eight months, I've finished photographing the internals of the Sophia Systems Sega Saturn Programming Box. Nearly 300 photographs later, I can finally get everything back inside.

The CPU-board area, RAM board, SH-1 board, and SCSI board are back in place. The CD drive is the last major part to reinstall after I've finished photographing it. A few board revisions caught my attention too, including an assembly marked revision 0.7 while the mainboard is revision 1.0.

![](/assets/images/2013/img_0363.jpg)

With the CD drive back inside and the panels fitted, I can finally switch Sophia on without staring at the exposed internals. The fan spins, the lights respond, and the power switch has a wonderfully solid feel. It's satisfying to press even if the machine still needs its processor hardware for a proper boot.

The rear connections are worth another look, with serial, SCSI, AV output, controller ports, and some substantial expansion arrangements. Sophia also uses a 110 V supply, so I'm running it through an appropriate transformer here in Australia. One more enormous piece of equipment to accompany the enormous devkit!

![](/assets/images/2013/img_0363a.jpg)

For the moment, Sophia is heading back to the bookshelf while I start investigating the Sega Mega-CD development hardware. If anyone comes across compatible SH-2 boards, please let me know. There are nearly 300 photographs of Sophia in the [photo gallery](/goodies/) for anyone who wants a closer look.

![](/assets/images/2013/img_0363b.jpg)

Look at that! 171-6692B SH7095 SH-2 CPUs. Those are exactly the sort of processor cards I'm trying to track down.

**Update:** Someone has since sold me some SH-2 CPUs! What a wonderful person. That should give me something new to investigate when I return to Sophia.

**Related Posts**

- [Sega Saturn Sophia SH-2 CPU Cards: 171-6692B vs 171-6692D](/sega-saturn-sophia-sh-2-cpu-cards-171-6692b-vs-171-6692d/)
- [Sophia Systems Sega Saturn Programming Box: Capacitor Restoration Complete](/sophia-systems-sega-saturn-programming-box-capacitor-restoration-complete/)

**Sources**

- [ASSEMbler Games Archive - Sophia Saturn setup](https://assemblergames-archive.com/archive/index.php/thread-18172.html) - surviving discussion of Sophia processor-board and development-hardware configurations.
