---
title: "Sega TeraDrive IBM WDL-330P 30 MB Hard Drive Overview"
author: "Nix McRetro"
date: 2013-07-18T02:13:57.000+10:00
last_modified_at: 2026-10-18
categories: [sega, youtube]
---

{% include youtube.html id="pEyJgkUdXFo" %}

Just some poking around at how these hard drives were put together, nothing terribly exciting but figured the internet should have more on these WDL-330P drives. I've managed to accumulate three of them, and they're rather interesting little pieces of IBM hardware.

The drives are 30 MB models that can be used with the Sega TeraDrive. They're closely related to the hard drives found in certain early IBM PS/2 machines, although compatibility isn't quite as straightforward as the connectors might suggest. These aren't ordinary 44-pin laptop IDE drives that you can simply plug into anything.

The particular drive I'm examining has a date stamp from 20th May 1991. That's quite an age for a mechanical hard drive, and naturally I've decided to take one apart to see what's hiding inside. There are also a few components that I want to replace before attempting any more serious use.

I've got one WDL-330P opened up, with another still installed in the TeraDrive Model 3. Looking over the PCB reveals several surface-mount tantalum capacitors, along with some radial electrolytics. The tantalums are rather less convenient to replace, but at least I've photographed their markings for future reference.

The three electrolytics at the rear of the board are much easier to reach. There are two 47 uF capacitors rated at 16 V and one 100 uF capacitor originally rated at 6 V. For the latter I've chosen a 10 V replacement, simply because that's what I had available.

As usual, I've opted for radial replacements rather than the original style of some of the components. They're easier for me to work with, and there's enough space in this particular arrangement. I'll save the actual replacement work for the appropriate repair session.

One thing I found rather interesting was the motor arrangement. The spindle motor is visible in a way you don't often see on later hard drives, and the whole mechanism has that lovely early-1990s engineering look about it. All for a mighty 30 MB of storage!

The connector also deserves a mention. The WDL-330P belongs to IBM's unusual early hard-drive arrangements and uses a proprietary interface rather than standard laptop IDE. My earlier tests showed the WDL-330P working in the TeraDrive, but a similarly connected 30 MB drive wasn't accepted by my original 8086 PS/2 Model 30, which expected a different configuration.

These drives are also old enough that a few bad blocks aren't particularly surprising. They're not what I'd want to rely on for everyday storage, but they're part of the original hardware experience. Keeping them available and documenting how they work is worthwhile.

Just another little trip through early IBM and Sega computer history. The past is where we all came from. The future is doomed!

**Related Posts**

- [Sega TeraDrive Hard Drive Interface Investigation](/sega-teradrive-hard-drive-interface-investigation/)
- [Sega TeraDrive WDL-330P Hard Drive Capacitor Replacement](/sega-teradrive-wdl-330p-hard-drive-capacitor-replacement/)
- [Current State of the WDL-330P 30MB Hard Drives](/current-state-of-the-wdl-330p-30mb-hard-drives/)
- [Sega TeraDrive WDL-330P Comparison](/sega-teradrive-wdl-330p-comparison/)

**Sources**

- [IBM Files - Personal System/2 Model 25 and 30](https://www.ibmfiles.com/pages/ps2model25.htm)
