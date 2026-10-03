---
title: "Amstrad Sega Mega PC 486SLC Upgrade Experiment"
author: "Nix McRetro"
date: 2012-03-21T02:56:26.000+11:00
last_modified_at: 2026-10-02
ai_assistance:
  model: "GPT-6 Astra Max"
  date: 2026-10-02
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0033.jpg)

Browsing the internet, I came across an Amstrad PC7486SLC motherboard. I couldn't help noticing how similar it looked to the Mega PC motherboard. Since my Mega PC was already giving me grief with its hard-drive controller, having another related Amstrad motherboard around for spare parts seemed like a pretty good idea.

![](/assets/images/2012/img_0034.jpg)

#### Why the 486SLC?

My Mega PC is fitted with an AMD-compatible 386SX running at 25 MHz. Amstrad's published Mega PC specification calls for a 25 MHz 80386SX, so the AMD chip is simply what happens to be fitted in my particular machine.

The PC7486SLC-33 uses a Texas Instruments TI486SLC running at 33 MHz. It's an interesting bridge between generations: the processor keeps a 386SX-compatible external interface while adding a 486-compatible instruction set and 1 KB of on-chip cache.

In other words, exactly the sort of strange transitional CPU I find interesting.

![](/assets/images/2012/img_0039.jpg)

![](/assets/images/2012/img_0040.jpg)

![](/assets/images/2012/img_0038.jpg)

#### The Mega Plus question

The PC7486SLC-33 board I bought appears to have come from a beige Amstrad PC rather than a Mega PC, but it looks extremely similar to the sort of 486SLC platform associated with the elusive Mega Plus.

At the time, the Mega Plus felt almost like an urban legend because I could find very little information about it. Period listings do show an Amstrad Mega Plus 486SLC-33 being advertised, so there was clearly more to the story than internet folklore.

My PC7486SLC conversion should still be treated as an experiment inspired by the Mega Plus, not proof that this exact motherboard was factory Mega Plus hardware.

![](/assets/images/2012/img_0037.jpg)

![](/assets/images/2012/img_0036.jpg)

#### Video passthrough

Video normally passes through the Mega Drive card when the front switch moves between PC and Mega Drive mode. Without the Mega Drive card installed there is no video because nothing is bridging the relevant passthrough pins on the motherboard.

We copied the jumper settings from the PC7486SLC board onto my PC7386SX Mega PC motherboard and got internal video without the Mega Drive card attached. That suggests removing those jumpers and installing the Mega Drive card into the PC7486SLC board may let it work the way I want. Time to experiment.

![](/assets/images/2012/img_0035.jpg)

#### Memory

The board has four SIMM positions and I couldn't get it beyond 16 MB. That limit makes considerably more sense now: the TI486SLC itself can directly address up to 16 MB of physical memory. That doesn't prove every PC7486SLC motherboard supports every possible 16 MB configuration, but it does explain why there is no point looking for 32 MB from this CPU.

The two biggest attractions of the replacement board are simple: it doesn't appear to have NiCad leakage all over it, and it gives me a 33 MHz 486SLC instead of the 25 MHz 386SX.

Let's see whether the Mega Drive card agrees.

### Sources

- [Amstrad Mega PC instruction manual](https://manualzz.com/doc/68157046/amstrad-megapc-instruction-manual) - documents the PC7386SX platform and memory expansion up to 16 MB.
- [Texas Instruments TI486 Microprocessor Reference Guide](https://studylib.net/doc/25873245/1993-ti486-microprocessor-reference-guide) - documents the TI486SLC architecture, 1 KB cache, 386SX-compatible interface and 16 MB physical address space.
- [DOS Days - Typical PCs in 1993](https://www.dosdays.co.uk/topics/1993.php) - reproduces a period listing for an Amstrad Mega Plus 486SLC-33 configuration.
- [Retro Isle - Amstrad PC](https://www.retroisle.com/amstrad/pcs/general.php) - later historical summary of the Mega PC and Mega Plus.
