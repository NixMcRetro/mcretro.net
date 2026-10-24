---
title: "Sega Dreamcast Controller Function Checker Overview"
author: "Nix McRetro"
date: 2018-09-07T09:07:57.000+10:00
categories: [devkit, sega]
last_modified_at: 2026-10-18
---

{% include youtube.html id="bGCq5aMfNZo" %}

This is one interesting piece of hardware. The ROM from the cartridge was dumped a couple of days ago in [Dreamcast Arcade Stick Checker Version 2.00 ROM](/dreamcast-arcade-stick-checker-version-2-00-rom/), and indicated that even at version 2.00 it was from August 1998. The 27th November 1998 was the launch date of the Japanese Dreamcast with the rest of the world not receiving it until almost a year later.

I picked this rather unusual Sega testing unit up a few years ago, and it's been sitting around waiting for me to find an excuse to investigate it. The Dreamcast Controller Function Checker appears to have been intended for testing Dreamcast arcade-stick hardware, although it's rather more substantial than you'd expect from something with that job description.

The front has the various connections for testing controllers, along with a power switch and the controls needed to operate the unit. Around the back are the video and audio connections, a fuse and a standard mains input. Not bad for what is essentially a dedicated test machine.

Once the cover was off, I found a collection of circuit boards inside. There are boards carrying the Dreamcast testing electronics, a power supply and some rather interesting Sega hardware that I wasn't expecting. The whole thing is constructed more like a small console than a simple controller tester.

And here's the surprise. Underneath the Dreamcast checking hardware is a later model Sega Mega Drive! The board has the familiar Sega layout, although its connections have been adapted for use inside this particular testing unit. Apparently Sega decided to build a Dreamcast controller tester around an older console.

There are date markings on the hardware from early 1997, while the ROM itself points to August 1998. That puts the equipment in an interesting period before the Dreamcast reached shops in Japan, which makes it rather more fascinating than an ordinary retail accessory.

The ROM sits in a cartridge arrangement connected to the Mega Drive board. I was curious to find out what would happen if I removed it, so naturally I tried that too. The machine didn't produce a useful display without the testing cartridge installed.

I even wondered whether I could insert an ordinary Mega Drive game and persuade the board to do something more entertaining. Sonic seemed like an appropriate candidate. Unfortunately, nothing happened, which suggests this arrangement depends on more than simply having an ordinary cartridge installed.

The cartridge also appears to be involved in supplying or switching power to part of the system, which makes the internal arrangement a little more complicated than I'd first imagined. I'd rather investigate those connections properly before assuming this can be turned back into an ordinary Mega Drive.

Anyway, as you can see there's quite a surprise inside with there being a later model Mega Drive / Genesis hiding away under the hood. I picked this up a few years back now and it's just sat around collecting dust. Sadly it is a little too big to fit in my console collection cabinet as there's a hard limit of 20 cm depth and this baby is almost 30 cm in depth.

I've also been [informed](https://web.archive.org/web/20191113062008/https://assemblergames.com/threads/dreamcast-arcade-stick-checker-version-2-00-bios.69805/) by Durandal of ASSEMbler Games that there is at least one other in existence. Perhaps it has the 1.00 firmware or maybe even a 0.xx firmware... ;)

Quite a remarkable bit of Sega development hardware, even if it's not something I can easily find a place for in the cabinet!
