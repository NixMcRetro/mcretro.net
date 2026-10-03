---
title: "Amstrad Sega Mega PC Repair"
author: "Nix McRetro"
date: 2012-03-18T09:33:45.000+11:00
last_modified_at: 2026-10-02
ai_assistance:
  model: "GPT-6 Astra Max"
  date: 2026-10-02
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0017.jpg)

![](/assets/images/2012/img_0018.jpg)

![](/assets/images/2012/img_0019.jpg)

![](/assets/images/2012/img_0020.jpg)

Such a wonderful shade of blue. Unfortunately it has eaten the tracks on the motherboard. That's the damage a leaking NiCad battery can do. The electrolyte is alkaline potassium hydroxide rather than acid, but it can still make an impressive mess of a motherboard.

![](/assets/images/2012/img_0022.jpg)

![](/assets/images/2012/img_0021.jpg)

![](/assets/images/2012/img_0023.jpg)

I cleaned everything up as best I could with some isopropyl alcohol, then mapped out the damage. The alcohol cleaned the surface, although it wasn't chemically neutralising the alkaline electrolyte. Multimeter time.

![](/assets/images/2012/img_0015.jpg)

![](/assets/images/2012/img_0016.jpg)

From the maps above it looked as though most of the damage affected at least one of the serial ports. Serial? Pffft, I have PS/2 connectors.

Unfortunately, one of the main power tracks from the power connector was damaged as well. I handed the board over to boss and he did some soldering while I stood around eating candy.

![](/assets/images/2012/img_0025.jpg)

![](/assets/images/2012/img_0026.jpg)

![](/assets/images/2012/img_0027.jpg)

Shiny new wires on the underside of the board. We added a generous amount of Kapton tape to insulate the repairs from the case.

![](/assets/images/2012/img_0024.jpg)

![](/assets/images/2012/img_0028.jpg)

![](/assets/images/2012/img_0029.jpg)

After reassembling everything, I found that the PC side wouldn't recognise either of the hard drives I tried. I started with a roomy 106MB Seagate, then moved on to a beefy 365MB IBM drive. Both worked fine in another machine.

Either I'm really bad at entering drive geometry or something hard-drive-controller-like on the motherboard is fried.

![](/assets/images/2012/img_0030.jpg)

![](/assets/images/2012/img_0032.jpg)

![](/assets/images/2012/img_0031.jpg)

I thought I was close with that FDISK result above, but partitioning still failed and the system kept throwing errors. There is only one hard-drive connector on the motherboard, so I'll have to wait for the other motherboard I ordered to arrive and start comparing.

Overall, though, a good result. The Sega side works perfectly and the PC side works somewhat. I'm very much looking forward to receiving the other Amstrad motherboard so I can finally work out what is going on with the hard drive.

### Related posts

- [Amstrad Sega Mega PC 386SX Arrival](/amstrad-sega-mega-pc-386sx-arrival/)
- [Amstrad Sega Mega PC 386SX Overview](/amstrad-sega-mega-pc-386sx-overview/)

### Sources

- [Energizer - Nickel Cadmium Application Manual](https://data.energizer.com/pdfs/nickelcadmium_appman.pdf) - documents the alkaline potassium hydroxide electrolyte used in nickel-cadmium cells.
