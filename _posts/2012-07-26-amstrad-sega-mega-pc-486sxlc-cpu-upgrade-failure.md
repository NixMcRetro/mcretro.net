---
title: "Amstrad Sega Mega PC 486SXLC CPU Upgrade Failure"
author: "Nix McRetro"
date: 2012-07-26T01:17:04.000+10:00
last_modified_at: 2026-10-03
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-03
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="oGvDwl04crs" %}

First up, some test desoldering on a RAM chip from a scrap memory board to see whether this heat-gun idea was even remotely workable.

This was very much a learning experiment. A general-purpose heat gun gives far less temperature and airflow control than proper hot-air rework equipment, so I would not recommend attacking valuable vintage multilayer hardware this way.

{% include youtube.html id="U6FR-Bq1GDQ" %}

Next we have part one: removing the QFP 386SX from the Amstrad Mega PC.

{% include youtube.html id="fX1gnqyfEj0" %}

And lastly, part two, where everything fell apart.

Twenty-nine minutes of hope and anticipation, crushed in the last minute.

Not the best result, but it shows that anything is (not) always possible if you put your mind to it.

The intended upgrade was a 486SXLC-class processor capable of a 50 MHz internal core while keeping a 25 MHz external bus. On paper that made the idea interesting for a 386SX-derived platform. Looking back, the replacement photographed below is marked TI486SXLC2-G50-PQ, and TI's documentation calls for a 3.3 V core supply for the SXLC2-G family despite its 5 V-tolerant I/O. But there is much more to a CPU upgrade than making the solder joints line up. Supply voltages, electrical compatibility, chipset support, BIOS behaviour and cache-control signals all matter. I also cannot separate those compatibility questions from the possibility that the board or pads were damaged during the rework itself. In other words, the failed boot does not neatly prove one single cause.

Overall the experiment wasn't a complete failure. It taught me a lot about removing and drag-soldering QFP packages, even if the Mega PC motherboard paid the tuition fee.

![](/assets/images/2012/img_0234.jpg)

Where the 386SX chip sat.

![](/assets/images/2012/img_0236.jpg)

The original chip.

![](/assets/images/2012/img_0235.jpg)

The replacement chip.

![](/assets/images/2012/img_0239.jpg)

![](/assets/images/2012/img_0238.jpg)

Some of the finest drag soldering this side of the 'verse.

![](/assets/images/2012/img_0237.jpg)

At least I now know the 486SLC board is permanently staying in the Mega PC, because there is no going back to this original motherboard. I stripped the failed board for useful components, but took detailed photographs of it and the major chips first.

Photos of both the 486SLC and 386SX boards are in the [photo gallery](/goodies/).

### Further Reading

- [Amstrad Sega Mega PC 386SX CPU Replacement Attempt](/amstrad-sega-mega-pc-386sx-cpu-replacement-attempt/) - the preceding experiment and the 50 MHz-class upgrade goal.

### Sources

- [Texas Instruments TI486SXLC and TI486SXL Microprocessors Reference Guide](https://www.bitsavers.org/components/ti/TI486/1994_TI486SXLC_and_TI486SXL_Microprocessors_Reference_Guide.pdf) - documents the 50 MHz SXLC2 variant, its 25 MHz bus and 100-pin QFP package.
- [Texas Instruments - Designing With the TI486SXL2-G: Converting Existing 486-Based Microprocessor Designs](https://www.bitsavers.org/components/ti/TI486/SRZA004_Designing_With_The_TI486SCL2-G_199502.pdf) - explains the SXLC2-G family's 3.3 V core supply, 5 V-tolerant I/O and required hardware changes.
