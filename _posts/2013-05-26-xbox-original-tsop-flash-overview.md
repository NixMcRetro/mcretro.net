---
title: "Original Xbox TSOP Flash Overview"
author: "Nix McRetro"
date: 2013-05-26T04:10:00.000+10:00
last_modified_at: 2026-10-18
categories: [microsoft, repairs, youtube]
---

{% include youtube.html id="ODRL3Em4s2o" %}

Here's what I soldered to flash the BIOS on my revision 1.2 or 1.3 original Xbox. We have a Winbond 256 KB TSOP flash ROM on this. Bridging the write-enable connections disables the write protection, leaving us the opportunity to install a much better BIOS. The standard EvolutionX flasher does not support Winbond TSOPs, so the flashing tool matters too.

Unfortunately, I managed to make rather a mess of some of the solder pads while preparing the board. The connections are tiny, and a couple of them didn't appreciate my attempts to work on them. I ended up running small wires from nearby vias to restore the connections. Not exactly the tidy modification I had in mind!

The wires were a little longer than I would have liked, but they weren't touching any neighbouring connections. I also used insulating tape to keep things from accidentally shorting against other parts of the board. With that sorted, it was finally time to see whether I could flash the Winbond chip.

![](/assets/images/2013/img_0400.jpg)

It's essentially a modchip, without a modchip. That also leaves you without a backup if something goes wrong. A work of genius! This Xbox has a 256 KB TSOP flash ROM. Older Xbox models (1.0 and 1.1) used a 1 MB TSOP, but the retail BIOS image itself is 256 KB and is mirrored four times on the 1 MB flash.

The flash was successful, and the Xbox ended up running an Xecuter2 BIOS. From there I could get on with the much more entertaining job of setting up a dashboard and installing a larger hard drive. The original storage was only 10 GB, while the replacement Seagate drive offered a whopping 160 GB.

The Xbox optical drive was also giving me trouble, so I temporarily connected another DVD drive while getting the software installed. That involved some rather creative cabling and an external power supply. Not especially pretty, but it was useful for getting the installation media read.

![](/assets/images/2013/img_0401.jpg)

Once the dashboard was sorted, I had UnleashX 0.39 running and the larger hard drive available. I even started copying Burnout 3 from a backup disc, although the original optical drive was painfully slow. At times it was managing less than 1 MB per second. Good grief!

The machine had come a long way from refusing to boot past error messages. It was now running a replacement BIOS, a useful dashboard and a much larger hard drive. A very satisfying result considering how much trouble I'd managed to create with a few little solder pads.

I'll get around to putting a guide up eventually, there's still a lot to be done on this website...

**Sources**

- [XboxDevWiki - Flash ROM](https://xboxdevwiki.net/Flash_ROM)
- [XboxDevWiki - BIOS](https://xboxdevwiki.net/BIOS)
- [ConsoleMods Wiki - Xbox: TSOP Flashing](https://consolemods.org/wiki/Xbox%3ATSOP_Flashing)
