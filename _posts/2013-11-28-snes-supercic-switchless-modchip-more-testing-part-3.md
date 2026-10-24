---
title: "SNES SuperCIC Switchless Modchip - More Testing (Part 3)"
author: "Nix McRetro"
date: 2013-11-28T19:31:02.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="Nt16y4l6Hcg" %}

They always say you can never have enough testing, so I've been playing around with the SuperCIC modification and one of my homemade SNES cartridges. A few weeks ago, or perhaps months by now, I started building these things. Time certainly disappears when you've got too many projects on the go!

This particular cartridge was an interesting experiment because I'd removed its original CIC chip. My suspicion was that the PAL donor cartridge's region information might have been interfering with the game I'd programmed into its replacement ROM.

The SuperCIC can operate in automatic mode, where the cartridge CIC helps determine the region, or in forced modes for 50 Hz and 60 Hz operation. Removing the CIC isn't a general requirement for every game, but I wanted to see how my particular modified cartridge would behave without it.

And would you believe it, the game was running! The SuperCIC indicator was showing its orange setting, and the console seemed perfectly happy to continue playing. A promising result, even if it didn't answer every possible question about cartridge compatibility.

The game in question was *EarthBound*, one of those wonderfully strange Super Nintendo RPGs where ordinary suburban life gradually turns into something completely ridiculous. Ness and his friends encounter bizarre enemies, visit some unusual towns and generally discover that saving the world is rather more complicated than it first appears.

I'd already been spending quite a bit of time playing it. In fact, by the time of this recording I was approaching fourteen hours of gameplay in a single day. I had started early in the morning and apparently decided that eating and sleeping were optional extras. Probably not my finest scheduling decision!

I'd made it through Happy Happy Village and reached Saturn Valley, where those little Mr. Saturn characters were as entertaining as ever. Then came the journey through Dusty Dunes Desert towards Fourside, which I vaguely remembered being rather troublesome from earlier playthroughs.

My party consisted of Ness, Paula and Jeff, although the desert wasn't treating them particularly kindly. Poison, difficult enemies and those horrible mushrooms that interfere with your controls were making the journey considerably more entertaining than I'd hoped.

The mushroom effect is particularly amusing. Suddenly the directions on the controller don't behave the way you expect, and you find yourself turning the controller sideways or upside down to compensate. Just what you need when you're already half asleep!

I'd also bought one of those very cheap replacement SNES controllers for around two dollars delivered. The D-pad was absolutely dreadful, so that certainly wasn't helping. There's a difference between a bargain and something that merely costs very little, apparently.

Eventually I reached Fourside, although I managed to get Paula and Jeff knocked out along the way. A visit to the hospital sorted that out, and by then everybody had gained quite a few levels. Not bad for a day that had started with me wanting to test a modification!

The important hardware result was that my modified cartridge was running *EarthBound* on the SuperCIC-equipped console. That doesn't mean I've proved every cartridge and every region combination works, but it's another successful test of this particular setup.

And now, perhaps, I should get some sleep. Fourteen hours of *EarthBound* is a reasonable amount of quality assurance for one day!

**Sources**

- [SuperCIC - ikari's project page](https://sd2snes.de/blog/cool-stuff/supercic)
- [SuperCIC lock firmware source and operating modes](https://github.com/mrehkopf/sd2snes/blob/master/cic/supercic/supercic-lock.asm)

**Related Posts**

- [SNES SuperCIC Switchless Modchip - Installation (Part 1)](/snes-supercic-switchless-modchip-installation-part-1/)
- [SNES SuperCIC Switchless Modchip - The Test (Part 2)](/snes-supercic-switchless-modchip-the-test-part-2/)
- [EarthBound Cartridge (SHVC-1J3M-20) SuperCIC Key](/earthbound-cartridge-shvc-1j3m-20-supercic-key/)
