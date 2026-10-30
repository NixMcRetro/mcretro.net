---
title: "Amstrad Sega Mega PC 486SXLC CPU Upgrade Failure"
author: "Nix McRetro"
date: 2012-07-26T01:17:04.000+10:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="oGvDwl04crs" %}

Before attempting anything particularly ambitious with the Amstrad Mega PC, I thought I'd practice removing a few chips from an old RAM board. I've been experimenting with a heat gun at around 320 degrees Celsius, and the first attempts were surprisingly successful. Once the solder softened, the little chips came away without obvious damage to the tracks.

That was encouraging, although a scrap memory board is a rather different proposition from the Mega PC motherboard. A general-purpose heat gun isn't exactly ideal for delicate electronics work, but I wanted to see what I could manage with the equipment I had available.

{% include youtube.html id="U6FR-Bq1GDQ" %}

The plan was to remove the original 25 MHz AMD 386SX processor and replace it with a Texas Instruments 486SXLC2-G50. The idea of getting a 50 MHz-class processor into this old Mega PC was rather appealing, especially with the possibility of some cache memory helping things along.

I've never removed one of these four-sided QFP processors before, so the whole operation was a learning experience. There are 25 pins on each side, and after a fair bit of heating and carefully working around the package, the original processor finally came free. Unfortunately, one track appeared to have lifted during the process.

Here's the area where the original 386SX had been sitting. I went over the pads with desoldering braid to remove the remaining solder, although even that took some experimentation before I got the technique working properly.

The original AMD processor survived the removal, which was good news. At least I had one small victory before attempting the considerably more difficult business of installing its replacement.

And here's the Texas Instruments processor intended to take its place. The markings identify it as a TI486SXLC2-G50-PQ. On paper, its 25 MHz external bus and faster internal core made it an interesting upgrade candidate, although there were some important electrical differences I hadn't fully accounted for.

{% include youtube.html id="fX1gnqyfEj0" %}

Part two follows the soldering itself. I cleaned the pads, added flux and tried positioning the new processor. Naturally, I discovered rather late in the process that pressing the tip of my flux pen was necessary to make the thing dispense properly. Apparently reading the instructions would have been a good idea!

![](/assets/images/2012/img_0234.jpg)

Drag soldering turned out to be quite effective once I got the hang of it, although several pins were troublesome. I ended up checking continuity around the package and cleaning up bridges and bent legs as best I could.

![](/assets/images/2012/img_0236.jpg)

Some of the finest drag soldering this side of the 'verse. Well, perhaps not, but I'd certainly learned quite a bit by this stage.

![](/assets/images/2012/img_0235.jpg)

With the new chip finally in place, it was time for the moment of truth. I connected the motherboard to a power supply and display, switched it on and waited. No video. Wonderful. Twenty-nine minutes of hope and anticipation, crushed in the last minute!

![](/assets/images/2012/img_0239.jpg)

![](/assets/images/2012/img_0238.jpg)

Looking back, the TI486SXLC2-G family requires a 3.3 V core supply despite having 5 V-tolerant I/O. Proper support also depends on the surrounding chipset, BIOS and other signals, not simply whether the processor fits the footprint. The rework may have damaged the board as well, so I can't pin the failed boot on one specific cause.

![](/assets/images/2012/img_0237.jpg)

The experiment wasn't a complete waste. I learned a great deal about removing and soldering QFP packages, even if the Mega PC motherboard paid the tuition fee. That board was subsequently stripped for useful components, with plenty of photographs taken before I finished. The working 486SLC board will be staying in the Mega PC instead.

There are more photographs of both motherboards in the [photo gallery](/goodies/).

**Further Reading**

- [Amstrad Sega Mega PC 386SX CPU Replacement Attempt](/amstrad-sega-mega-pc-386sx-cpu-replacement-attempt/) - the earlier investigation and upgrade plans.

**Sources**

- [Texas Instruments TI486SXLC and TI486SXL Microprocessors Reference Guide](https://www.bitsavers.org/components/ti/TI486/1994_TI486SXLC_and_TI486SXL_Microprocessors_Reference_Guide.pdf) - documents the SXLC2 family and 100-pin QFP package.
- [Texas Instruments - Designing With the TI486SXL2-G](https://www.bitsavers.org/components/ti/TI486/SRZA004_Designing_With_The_TI486SCL2-G_199502.pdf) - covers power requirements and hardware compatibility considerations.
