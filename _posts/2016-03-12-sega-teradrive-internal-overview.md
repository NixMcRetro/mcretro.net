---
title: "Sega TeraDrive Internal Overview"
author: "Nix McRetro"
date: 2016-03-12T09:18:02.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, sega, youtube]
---

{% include youtube.html id="Z4efR-a4p7E" %}

This is a refresher on the Sega TeraDrive. I figure while I have them out for the XT-IDE card I might as well share a new video of them in their natural habitat. I've got both the Model 2 and Model 3 around, and there are some interesting little differences between the machines.

The TeraDrive is one of those wonderful combinations of IBM PC and Sega Mega Drive hardware that probably made a lot more sense to somebody designing computers in the early 1990s. Unlike the Amstrad Mega PC, which uses a separate ISA card for its Mega Drive hardware, the TeraDrive has the Sega components integrated into the mainboard.

Taking the case apart is relatively straightforward, with eight screws holding the outer assembly together. It's a nicely constructed machine, and I've always liked the way IBM built these older systems. Even the Model M keyboard is a lovely piece of engineering. Buckling springs! None of that rubber-dome nonsense.

Inside, there's the usual assortment of PC hardware alongside the Mega Drive circuitry. These machines use a 286 processor, with the floppy drive mounted at the front and an expansion arrangement for the PC side. There's also room for the hard drive in the appropriate models, although that isn't what I'm concentrating on today.

The motherboard has some interesting date codes, with several chips pointing towards early 1991. I've also noticed differences in the wiring between the two TeraDrive models, including some factory-looking jumper wires. Without spending more time tracing everything out, I'm not entirely sure what each one is doing.

One of the other things worth mentioning is the backup battery. I've fitted a BR2032 in this machine, which is a rather more pleasant arrangement to deal with than some of the old rechargeable batteries found in other computers. It's also nice not to see a motherboard covered in leaking surface-mount electrolytics!

The XT-IDE card is my own little addition. I had some purple PCBs made by OSH Park, complete with a McRetro.net logo and various settings printed on the board. The TeraDrive uses the C800 address for this arrangement, and I've got a 28C64 EEPROM fitted. I originally intended to use something larger, but apparently that didn't happen. Typical.

There are a few limitations with the expansion slot too, so not every ISA card will necessarily behave as expected. Still, having a CompactFlash-based storage option makes experimenting with these old computers rather more convenient than relying entirely on their original hard drives.

Next up I'll be getting back into the XT-IDE setup and seeing what else I can persuade these machines to do. They're lovely bits of IBM and Sega history, and I'm glad to have them out of storage again.

**Related Posts**

- [Sega TeraDrive Model 2 External Overview](/sega-teradrive-model-2-external-overview/)
- [Configuring an XTIDE / XT-CF-Lite for the Sega TeraDrive](/configuring-an-xtide-xt-cf-lite-for-the-sega-teradrive/)
- [Sega TeraDrive Model 3 Power Supply Failure](/sega-teradrive-model-3-power-supply-failure/)
