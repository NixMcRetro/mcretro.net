---
title: "Sega Master System II in 8-bit Mayhem"
author: "Nix McRetro"
date: 2013-11-14T18:35:56.000+11:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
share_description: >-
  A rescued Sega Master System II stubbornly shows a black screen instead of Alex Kidd. Corrosion, composite video and a spare encoder offer no easy answer. 🔧
---

{% include youtube.html id="FspdE2O2lng" %}

I must say I prefer the 16-bit lifestyle, but this Master System II came up and I couldn't resist grabbing it before it was kicked to the gutter.

There's a bit where I get composite AV out, but this is part of the investigation rather than a finished composite-modification guide. Either stay tuned until I hopefully get this beast behaving properly, or use the power of Google! :)

This particular Master System II was sold as non-functional, and the first power-on test certainly isn't encouraging. I've connected it through RF, but instead of the built-in Alex Kidd game we're greeted by a black screen. Moving the connectors around produces some rather unpleasant video distortion too.

Time to take it apart and see what we've got. The board looks fairly ordinary at first glance, although there's some suspicious corrosion around the cartridge slot. There are also a few marks that make me wonder whether somebody has been working on this thing before me.

Inside we've got the good old Z80 processor, the Sega custom chips and a Sony CXA1145P video encoder. The BIOS is marked MPR-12808, which should contain Alex Kidd in Miracle World. That makes the black screen particularly annoying because we don't even need a cartridge to get something useful on the television.

The board carries a date stamp from January 1992, so it's had plenty of time to develop a few problems. The cartridge slot is looking particularly unpleasant, with some green corrosion around the contacts. Perhaps the console thinks a cartridge is inserted and isn't starting the built-in game?

A bit of cleaning seems like the obvious first step. Unfortunately, that doesn't get us anywhere. Still a black screen. Oh well, on to the next idea!

Rather than relying on the RF output, I thought it might be useful to see whether the video encoder is producing anything directly. With the CXA1145P datasheet handy, I can identify composite-video output on pin 20 and a nearby ground connection on pin 24. That should give me somewhere to attach a temporary test lead.

A little soldering later and we've got a makeshift composite connection. I wouldn't call this a finished AV modification, but it should at least help establish whether the RF circuitry is responsible for the problem.

Unfortunately the result is still much the same. No useful picture. That rather suggests we've got more investigating to do, doesn't it?

I've also got a spare CXA1145P from an earlier Mega Drive repair, so that's another possibility. I even try temporarily piggybacking the spare chip over the existing one to see whether anything changes. No luck there either.

At this stage we still don't know exactly what's wrong with the Master System. Cleaning the cartridge slot, trying composite output directly and piggybacking another encoder haven't got Alex Kidd onto the screen. There's more investigating to do before I can work out what's actually wrong with this one.

I suppose that's what happens when you rescue a broken console from the gutter. Sometimes you get a bargain, and sometimes you get an entirely new troubleshooting adventure!

### Related Posts

- [Sega Master System Reassembly in High Speed](/sega-master-system-reassembly-in-high-speed/)
