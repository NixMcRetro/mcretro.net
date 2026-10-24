---
title: "Sega Saturn Model 2 Modchip Installation: 0014 Configuration"
author: "Nix McRetro"
date: 2013-05-05T03:58:05.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, repairs, sega]
---

{% include youtube.html id="iveyeLJkNAg" %}

Here's a Japanese Model 2 Saturn that needed a modchip, so I went ahead and installed one. This particular console and modchip combination uses the `0014` configuration. After spending so much time playing around with my Sophia development hardware, something nice and straightforward sounded pretty good!

I picked up the modchip from Rob Webb at ConsoleGoods in the UK. Nothing particularly exciting to look at, just a solid little PCB with a collection of chips, an oscillator, some passive components and connectors. Five screws later, the Saturn was open and ready for its new addition.

The ribbon cables needed to be connected in the correct orientation, with the blue reinforcing strips facing outwards from the centre. I also borrowed a 5 V supply from the CD-drive connector and connected it to the modchip. There isn't much room inside these machines, so insulating the little board from the metalwork underneath seemed like a particularly good idea.

This CD-drive board needed the `0014` configuration. That involved cutting a particular trace on the modchip PCB and joining the appropriate solder pads, along with the power connection. The soldering wasn't especially beautiful, but everything was connected and it was time to find out whether the Saturn agreed with my handiwork.

With everything hooked up through the XRGB, I popped in a backup disc and powered on. Naturally, I had to find the controller first, and this Saturn didn't have its date and time battery installed either. Still, the disc booted and the game was running, so that's one more Saturn with a working modchip!

The important word here is **particular**. Model 2 Saturns were produced with different CD-drive boards and controller arrangements, and modchip installation details vary between them. `0014` is a setting used by this style of modchip, not a universal configuration for every 21-pin Saturn. Have a look at the actual CD hardware before assuming another machine needs the same wiring.

Sorry about the missing footage and missing sound in places. I apparently wasn't planning to upload this video originally, but figured it might still help somebody one day. In that spirit, here it is.

**Related Posts**

- [Sega Saturn Modchip Installation Guides](/sega-saturn-modchip-installation-guides/)

**Sources**

- [SegaXtreme - How to mod a 21 pin Saturn](https://segaxtreme.net/threads/how-to-mod-a-21-pin-saturn.2939/) - contemporary discussion of 21-pin Saturn modchip installations and the 0014 configuration.
