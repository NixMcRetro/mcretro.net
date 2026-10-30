---
title: "Sophia Systems Sega Saturn Programming Box Reassembly"
author: "Nix McRetro"
date: 2013-02-08T10:16:00.000+11:00
last_modified_at: 2026-10-18
categories: [devkit, repairs, sega]
---

{% include youtube.html id="f2DiGI8_7so" %}

Above is a brief video of the Sophia going back together. Well, halfway. The mainboard is back in, but the RAM board is still out because I need to photograph it properly first.

Sophia has been sitting in pieces for months. I've spent an extraordinary amount of time photographing the internals, cleaning the boards, and trying to document all the things that make this development system different from an ordinary Sega Saturn.

The previous owner appears to have smoked around the machine. A lot. There was a thick layer of grime across the metalwork and fan grille, so I started giving everything a proper clean. The fan grille is looking rather shiny now! Unfortunately, the capacitors are another matter.

A few surface-mount electrolytics have started looking suspicious, particularly C69, which has residue around it. There are several other electrolytics scattered around the boards too. This is clearly something I'll need to investigate before treating the machine as fully restored.

The missing processor cards remain the biggest problem. My Sophia arrived without its removable SH-2 CPU boards, so although I can reassemble the system and test the power, I can't simply expect it to run like a complete Saturn development kit.

A normal dual-SH-2 configuration needs processor hardware in both positions, although development setups could also use specialised ICE or pod hardware instead of a second ordinary SH-2 board.

At least once the case is closed I can reclaim some precious desk space. The Cross Products Mega-CD development unit is sitting there waiting for its turn, and I'd rather not have the remains of two enormous devkits scattered around the room simultaneously.

{% include youtube.html id="3E4Gvue9Im8" %}

And finally, after somewhere between six and eight months, I've finished photographing the internals of the Sophia Systems Sega Saturn Programming Box. Nearly 300 photos later, I can finally put the thing back together 

In the second video, the CPU-board area, RAM board, SH-1 board, and SCSI board are back inside. The CD drive is the last major part to reinstall after its own photographs are finished.

A few of the board revisions are particularly interesting. One of the assemblies is marked revision 0.7 while the mainboard is revision 1.0, suggesting that at least some of the hardware layout was settled before the rest of the system reached that revision.

The CD drive goes back in, the panels are fitted, and finally I can switch Sophia on without staring at its exposed internals.

The fan spins, the lights respond, and the power switch has a wonderfully solid feel. It's a very satisfying thing to press, even if the machine is still missing the processor hardware needed for a proper boot.

I also took a quick look around the ports and controls. There's serial, SCSI, AV output, controller connections, and the rather substantial expansion arrangements around the back.

The unit runs from a 110 V supply, so I'm using an appropriate transformer here in Australia. One more enormous piece of equipment to go with the enormous devkit!

So, as we retire Sophia to the bookshelf for the moment, we embark on a new journey with the Sega Mega-CD.

![](/assets/images/2013/img_0363.jpg)

If anyone comes across compatible SH-2 boards, please let me know. Lots more photos, nearly 300 of them, are in the [photo gallery](/goodies/).

![](/assets/images/2013/img_0363a.jpg)

![](/assets/images/2013/img_0363b.jpg)

Look at that! 171-6692B SH7095 SH-2 CPUs!

**Update:** Someone had some SH-2 CPUs and has since sold them to me! What a wonderful person! Stay tuned!

### Related Posts

- [Sega Saturn Sophia SH-2 CPU Cards: 171-6692B vs 171-6692D](/sega-saturn-sophia-sh-2-cpu-cards-171-6692b-vs-171-6692d/)
- [Sophia Systems Sega Saturn Programming Box: Capacitor Restoration Complete](/sophia-systems-sega-saturn-programming-box-capacitor-restoration-complete/)

### Sources

- [ASSEMbler Games Archive - Sophia Saturn setup](https://assemblergames-archive.com/archive/index.php/thread-18172.html) - surviving discussion of Sophia processor-board and development-hardware configurations.
