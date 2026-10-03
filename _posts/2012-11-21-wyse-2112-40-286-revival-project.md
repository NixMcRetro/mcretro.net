---
title: "Wyse 2112-40 286 Revival Project"
author: "Nix McRetro"
date: 2012-11-21T21:43:56.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, ibm-pc, repairs]
---

{% include youtube.html id="pNFAPLzcT74" %}

This machine was originally earmarked to be stripped for parts.

Then curiosity got the better of me.

Instead, I spent the last couple of days getting the thing back into a workable state.

The Wyse 2112 is built around a 12.5 MHz 80286. This particular machine has a 40 MB hard drive and originally used a 720 KB 3.5-inch floppy drive.

I also noticed that the case and internal arrangement look remarkably similar to the Amdek 286. I still haven't found enough surviving documentation to say exactly how closely related the two systems actually were.

{% include youtube.html id="-2QCB8n6xn8" %}

### Getting into setup

Configuration turned out to be another adventure.

The machine does not have the sort of built-in setup utility I have become accustomed to, so I used a bootable setup program instead. GSETUP is another possible option, although compatibility with the machine's BIOS needs to be checked.

I temporarily connected a 1.44 MB floppy mechanism from another PC and the Wyse was happy enough to operate the drive hardware. That does **not** prove the machine can natively format or correctly use 1.44 MB high-density media. All I established was that the replacement mechanism itself functioned in the system.

### Convincing it to use the 40 MB hard drive

The hard drive was more troublesome.

Its geometry is 820 cylinders, 17 sectors and 5 heads, but there was no exact match in the BIOS drive table and the user-defined option was not cooperating. I therefore selected a predefined drive type with the same heads and sectors but a slightly smaller cylinder count. Type 8 was the closest usable match I found. That sacrifices some capacity, but it got the machine booting and made the drive useful.

### The VGA card was making everything worse

A lot of the trouble turned out to come from the VGA card, which also contains floppy and hard-drive controller circuitry. If I'd simply installed my Trident 9000 VGA card first, I probably would have saved myself quite a few hours.

With no documentation for the controller-equipped card, I experimented with the mid-board jumpers and found that moving them from positions 1-2 to 2-3 disabled the unwanted controller functions.

Trial and error, but it worked.

I later identified the card as a Pine Technology PT-604.

Somehow the machine I was going to strip for parts has become another functioning 286.

Funny how that keeps happening.

[Here is the thread](https://forum.vcfed.org/index.php?threads/wyse-technology-286-model-2112-40.34628/) I created on the Vintage Computer Forums dedicated to this powerhouse of a machine.

The [GSETUP boot disk guide](https://www.minuszerodegrees.net/5170/setup/5170_gsetup_720.htm) is written for the IBM 5170 and warns that compatibility depends on the BIOS.

### Sources

- [Stason - Wyse PC 286 Model 2112](https://www.stason.org/TULARC/pc/motherboards/W/WYSE-TECHNOLOGY-INC-286-WYSE-PC-286-MODEL-2112.html) - documents the 12.5 MHz 80286 system configuration.
