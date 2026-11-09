---
title: "Sega Saturn Model 2 Modchip Installation: 0014 Configuration"
author: "Nix McRetro"
date: 2013-05-05T03:58:05.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, repairs, sega]
---

{% include youtube.html id="iveyeLJkNAg" %}

Here's a Japanese Model 2 Saturn that needed a modchip, so I went ahead and installed one. After spending so much time playing around with my Sophia development hardware, something nice and straightforward sounded pretty good! This particular Saturn uses the 0014 CD-drive configuration.

I picked up the modchip from Rob Webb at ConsoleGoods in the UK. Nothing particularly fancy about it, just a nice solid PCB with some chips, an oscillator, passive components and connectors. Five screws later, the Saturn was open and we were ready to go.

The first thing was getting the ribbon cables connected correctly. The blue reinforcing strips needed to face outwards from the centre, and I also had to borrow a 5 V supply from the CD-drive connector. I used the second pin along on the connector for the power feed, then routed that to the modchip's power connection.

There's not a great deal of room inside a Saturn, so I also wanted something underneath the modchip to keep it away from the metalwork. A bit of suitable insulation would do the trick. I certainly didn't want to finish the installation by shorting the new board against the shielding!

Because this machine had the 0014 CD-drive arrangement, I needed to alter the modchip PCB accordingly. That involved cutting the indicated trace and joining the fourth and fifth solder pads shown in the video, making sure I didn't accidentally bridge the neighbouring connection. Naturally, the soldering ended up looking like a couple of enormous blobs, but the important thing was getting everything connected.

This is where it's worth looking at the actual Saturn hardware rather than assuming every Model 2 machine is the same. Different CD-drive boards and controller arrangements can need different connections, and 0014 isn't some magic setting that applies to every 21-pin Saturn.

With everything installed, I hooked the console up through the XRGB and popped in a backup disc. Naturally I had to go hunting for the controller first, and this Saturn didn't have its date-and-time battery fitted either. There's always something!

But then the disc booted and the game was running. Excellent! One more Saturn with a working modchip, and a considerably less troublesome afternoon than some of my recent Sophia adventures.

Sorry about the missing footage and sound in places. I don't think I was originally planning to upload this one, but I figured it might still be useful to somebody with the same Saturn configuration. At least you get to see the important bits, including the rather satisfying result!

**Sources**

- [SegaXtreme: 21-Pin Saturn Modchip Installation (0014 Configuration)](https://segaxtreme.net/threads/how-to-mod-a-21-pin-saturn.2939/)

**Related Posts**

- [Sega Saturn Modchip Installation Guides](/sega-saturn-modchip-installation-guides/)
