---
title: "Amstrad Sega Mega PC 386SX CPU Replacement Attempt"
author: "Nix McRetro"
date: 2012-07-20T19:01:55.000+10:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0013.jpg)

The time has come.

We wish you a safe journey, AMD 386SX CPU. You have served us well.

Armed with a heat gun and flux, work begins on my attempt to create a 50 MHz Amstrad Mega PC.

That 50 MHz target needs a little explanation.

The original Am386SX does not run its core at the full CLK2 input frequency. A 50 MHz CLK2 signal corresponds to a 25 MHz 386SX core.

The upgrade part I was interested in was a Texas Instruments TX486SXLC2-050-PJF. That processor runs a 50 MHz internal core from a 25 MHz external bus and comes in a 100-pin QFP package.

So the idea was not to force the entire Mega PC motherboard to run at a 50 MHz external bus speed.

Unfortunately, similar clocks and packaging do not automatically make a CPU a drop-in replacement. The motherboard chipset, BIOS, cache-control signals, pin compatibility and surrounding circuitry all have to cooperate as well.

This was very much an experiment.

I was also using a general-purpose heat gun for the removal. Having now spent more time doing this sort of work, controlled hot-air rework equipment with proper temperature and airflow control is a much better tool for removing a soldered QFP CPU from a vintage multilayer board.

**Edit:** Everything is on fire! What have I done! Flames everywhere!

### Related posts

- [286, 386SX and 486SLC Overclocking and Upgrade Ideas](/286-386sx-and-486slc-overclocking-and-upgrade-ideas/)
- [Amstrad Sega Mega PC 486SXLC CPU Upgrade Failure](/amstrad-sega-mega-pc-486sxlc-cpu-upgrade-failure/)

### Sources

- [AMD Am386SX/SXL/SXLV datasheet](https://www.amd.com/content/dam/amd/en/documents/archived-tech-docs/datasheets/21020.pdf) - documents the Am386SX operating frequency as half the CLK2 input frequency.
- [Texas Instruments TI486SXLC and TI486SXL Microprocessors Reference Guide](https://www.bitsavers.org/components/ti/TI486/1994_TI486SXLC_and_TI486SXL_Microprocessors_Reference_Guide.pdf) - lists the TX486SXLC2-050-PJF as a 5 V, 100-pin QFP part with a 50 MHz core and 25 MHz bus.
