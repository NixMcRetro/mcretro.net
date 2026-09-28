---
title: "Amstrad Sega Mega PC Upgrades"
author: "Nix McRetro"
date: 2012-03-21T02:56:26.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0033.jpg)

Browsing the internet I came across an Amstrad PC7486SLC motherboard. I couldn't help but notice the striking similarity with the Amstrad Mega PC motherboard. And with all my issues with hard drive controllers on the Mega PC, I figured it wouldn't be a bad idea to have another motherboard for spare parts.

![](/assets/images/2012/img_0034.jpg)

My Mega PC is fitted with an AMD 386SX running at 25MHz. Amstrad's documentation specifies the PC7386SX platform around an 80386SX, so the AMD part refers to the CPU actually fitted to this machine. The PC7486SLC-33 is powered by a Texas Instruments 486SLC. The TI486SLC is an interesting bridge between generations. It retains a 386SX-compatible external interface, adds a 486-compatible instruction set and a small on-chip cache, and this version runs at 33MHz. At 33MHz it also has a 32 percent clock-speed advantage over the 25MHz 386SX, with the cache and architectural improvements potentially widening the performance gap further.

![](/assets/images/2012/img_0039.jpg)

![](/assets/images/2012/img_0040.jpg)

![](/assets/images/2012/img_0038.jpg)

Now while the Amstrad PC7486SLC-33 motherboard I have purchased appears to have been used in a beige Amstrad box with no Mega Drive card, it looks extremely similar to the sort of 486SLC platform associated with the Mega PC Plus, and I wanted to find out whether it could accept the Mega Drive card.

At the time the Amstrad Mega PC Plus felt like an urban legend because I could find almost nothing online about it. Period listings show a Mega Plus 486SLC-33 configuration being offered for sale, and later histories describe a 33MHz 486SLC-class system with upgraded memory, but surviving documentation is sparse. My PC7486SLC conversion should therefore be treated as an experiment inspired by the Mega PC Plus specification, not proof that this exact motherboard shipped in a factory Mega PC Plus.

![](/assets/images/2012/img_0037.jpg)

![](/assets/images/2012/img_0036.jpg)

Anyway, video is passed through the Mega Drive card when the switch at the front of the unit is flipped back and forth. Without the Mega Drive card installed there is no video as there is nothing to short the video passthrough pins on the motherboard. So we copied the jumper settings (see above) from the PC7486SLC onto my PC7386SX (That's the Mega PC motherboard model) and we had internal video. Normally the Mega Drive card has the ribbon cable plugged into the motherboard.

![](/assets/images/2012/img_0035.jpg)

This indicates that by removing the jumpers and installing the Mega Drive card it may work as intended with this board. I would not treat that as proof that the PC7486SLC-33 is definitely the exact factory motherboard used in every Mega PC Plus. The board provides four SIMM positions and I could not take it beyond 16MB. The original PC7386SX Mega PC is officially documented as supporting up to 16MB, but I have not found enough primary documentation to say whether 16MB is a hard chipset limit on this PC7486SLC board.

The things I find most attractive about this replacement board are: 1. It does not appear to have battery acid all over it. 2. It is faster - 25MHz vs 33MHz.


### Sources

- [Amstrad Mega PC instruction manual](https://manualzz.com/doc/68157046/amstrad-megapc-instruction-manual) - documents the PC7386SX platform and memory expansion up to 16MB.
- [Texas Instruments TI486 Microprocessor Reference Guide](https://www.bitsavers.org/components/ti/TI486/1993_TI486_Microprocessor_Reference_Guide.pdf) - documents TI486SLC architecture, cache, instruction-set compatibility and operating frequencies.
- [DOS Days - Typical PCs in 1993](https://www.dosdays.co.uk/topics/1993.php) - reproduces a period listing for an Amstrad Mega Plus 486SLC-33 configuration.
- [Retro Isle - Amstrad PC](https://www.retroisle.com/amstrad/pcs/general.php) - later historical summary of the Mega PC and Mega Plus.
