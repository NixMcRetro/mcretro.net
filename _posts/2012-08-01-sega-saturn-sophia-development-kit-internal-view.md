---
title: "Sega Saturn Sophia Development Kit: Internal View"
author: "Nix McRetro"
date: 2012-08-01T12:21:04.000+10:00
last_modified_at: 2026-10-18
categories: [devkit, repairs, sega]
---


{% include youtube.html id="bNcnMRaBAsM" %}

She's a bit dirty. I've got the Sega Saturn Sophia development kit open on the bench, so I thought I'd give everyone a proper look at what's inside before I start cleaning it. There's quite a collection of boards in here, and I'm interested to see what Sega managed to squeeze into this rather substantial machine.

The bigger problem is that this particular Sophia arrived without its SH-2 processor boards. The Sophia development hardware uses removable SH-2 processor cards rather than soldering both Saturn CPUs directly onto the mainboard like a retail console. At the moment I've got neither card, which limits how far I can test the machine.

Sega's original Programming Box description lists one SH-2 card as supplied and says an additional SH-2 card is required when the box is used without an in-circuit emulator. If anyone has compatible Sophia SH-2 boards lying around, I'd be more than happy to take them off your hands and see how far she gets.

![](/assets/images/2012/img_0240.jpg)

With the top removed, there's a large collection of interconnected boards, sockets and cables to examine. Some of the chips carry date codes from the early 1990s, while one of the boards is marked revision 0.7 and the mainboard itself is revision 1.0. There's certainly plenty to photograph and document.

I started removing the upper boards to see what was underneath. One socketed chip was sitting rather crookedly, which was worth discovering before attempting to apply power. Considering the missing processor cards, it's probably a good thing I wasn't in a position to try switching it on straight away.

![](/assets/images/2012/img_0241.jpg)

Underneath the next board is another collection of Sega, Motorola and Yamaha chips. The fan is a Mitsubishi unit and has collected an impressive amount of dirt over the years. The power supply also appears to live further down in the case, although I haven't stripped everything out to reach it yet.

The CD drive has its own board attached underneath, and I spotted some marks on one of the cables while looking around the assembly. There's also a smaller board mounted towards the side of the machine, so the whole thing is a little more involved than it first appears.

![](/assets/images/2012/img_0242.jpg)

One thing to watch if you ever take one of these apart is the little front-panel buttons. Several of them fell out while I was removing a board and promptly rolled underneath things. I managed to find them all, thankfully, but it was another reminder that this Sophia deserves a careful strip-down.

I'll give her the best clean I can and make her shine again. There are more photographs in the [photo gallery](/goodies). Once that's done, I'll get some better photographs of the boards, chip markings and connectors for the gallery. It's a bit of a beast, and I rather wish Sega had made the retail Saturn this big!

**Related Posts**

- [Sega Saturn Sophia SH-2 CPU Cards: 171-6692B vs 171-6692D](/sega-saturn-sophia-sh-2-cpu-cards-171-6692b-vs-171-6692d/)
- [Sophia Systems Sega Saturn Programming Box: Capacitor Restoration Complete](/sophia-systems-sega-saturn-programming-box-capacitor-restoration-complete/)

**Sources**

- [Sega DTS Archive - ST-4001 Saturn Programming Target Box](https://docs.exodusemulator.com/Archives/SegaDTSMirror/hardware/core/PBOX.HTM) - original Sega description listing the supplied SH-2 board and the additional board required without an in-circuit emulator.
- [Shane Battye - Sega Saturn Sophia SH-2 171-6692D Board Reproduction Project](https://assemblergames-archive.com/archive/index.php/thread-59865.html) - later firsthand reproduction and testing notes from 2018, preserved in the ASSEMbler Games Archive.
