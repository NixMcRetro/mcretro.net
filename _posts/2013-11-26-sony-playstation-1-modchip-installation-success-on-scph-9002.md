---
title: "Sony PlayStation 1 Modchip Installation Success on SCPH-9002"
author: "Nix McRetro"
date: 2013-11-26T00:23:47.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, sony, youtube]
---

{% include youtube.html id="cCzbp0DwzGY" %}

What a mess! But I guess that's just the way I like it. :) After all those earlier attempts at programming and installing a PlayStation modchip, I've finally got MultiMode3 (MM3) running in the SCPH-9002. Hooray!

I'd originally been trying to use a PIC12C508A, but eventually switched to a PIC12F629. It's a flash-based, reprogrammable device, which means I can erase it and try again when something goes wrong. Given the number of mistakes I've made during this project, that seemed like a rather sensible choice.

The chips were also around the same price at the time, so there wasn't much incentive to keep sacrificing one-time-programmable devices. I'd much rather have something I could experiment with without worrying about ruining another PIC.

Programming the MM3 firmware was successful enough to produce a functioning modchip, although the GQ-4X still reported a configuration verification error at the end of the process. That was rather concerning, but the subsequent tests showed that the installed chip was doing its job.

The installation itself wasn't exactly going to win any awards. Some of the wires were a little shorter than I'd planned, so I couldn't position the chip where I'd originally intended. It ended up sitting on top of another Sony component, with a little Blu Tack temporarily helping to keep everything in place.

Very classy. Very professional. Fortunately, none of the soldered connections had come loose while I'd been moving everything around. Considering how this project started, that was something worth celebrating!

I also added some Kapton tape for insulation and checked that the modchip wouldn't contact the metal shielding when the PlayStation was reassembled. Functionality was the priority, but I didn't particularly want an unexpected short circuit to spoil the occasion.

With everything back together, it was time to try some games. First up was *Crash Bandicoot*, or at least a PAL-compatible version of it. The familiar Sony Computer Entertainment Europe screen appeared, followed by the game running successfully. Beautiful!

Of course, the next challenge was testing imports and other discs. Unfortunately, I was using a CD burner that had been producing rather questionable results, and a few of the discs hadn't been verified properly after burning.

Some would display the Sony Computer Entertainment America screen before refusing to proceed. Others would get a little further, depending on the disc and the video mode involved. At first I wasn't certain whether I was dealing with bad media, an issue with the modification or the PAL console's video output.

There were also complications around NTSC games running through a PAL PlayStation's composite video connection. A disc could get through its initial boot screens before the television stopped displaying a usable picture, which didn't necessarily mean the modchip had failed.

Eventually I managed to get a patched version of *Final Fantasy VIII* running, which was a rather satisfying way to celebrate. I might not have been entirely sure what I was doing in the game, but that certainly didn't stop me from playing it!

I also repaired the little surface-mount component I'd knocked off during the earlier installation attempt. I believe it was a 10 kOhm resistor, although I wasn't absolutely certain of the value when recording. At least the machine was behaving itself again.

So after a collection of failed programming attempts, questionable soldering, missing components and a whole pile of troublesome discs, the PlayStation finally had a functioning MultiMode3 installation.

**Update:** The CD burner I was using for the test games turned out to be faulty. In the excitement of getting everything working, **Verify burn** had either been switched off or ignored. Whoops! The follow-up explains that discovery, but it means those earlier disc failures weren't reliable evidence of a faulty modchip.

**Sources**

- [Microchip - PIC12F629/675 Data Sheet](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/DataSheets/41190G.pdf)
- [MCUmall Forum - Update the PIC chip OSCCAL value](http://www.mcumall.com/forum/topic.asp?TOPIC_ID=4858)

**Related Posts**

- [Sony PlayStation 1 Modchip Installation Failure on SCPH-9002](/sony-playstation-1-modchip-installation-failure-on-scph-9002/)
- [PIC12F629 Blinking LED Test and McCain Pizza Pockets](/pic12f629-blinking-led-test-and-mccain-pizza-pockets/)
- [Sony PlayStation 1 Modchip Installation on SCPH-9002 Update](/sony-playstation-1-modchip-installation-on-scph-9002-update/)
