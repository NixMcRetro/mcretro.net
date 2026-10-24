---
title: "Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 2)"
author: "Nix McRetro"
date: 2013-12-02T21:21:40.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, programming, sega]
---

{% include youtube.html id="-0Q-WPvYtwU" %}

Dumping carts through controller port 2 on the Mega Drive / Genesis, with the Mega-CD running the transfer software. Incredible, right? Aaaaand with success! This time I managed to dump my PAL copy of *Fatal Fury 2*. Everything appeared to be working nicely, although the resulting ROM turned out to be rather more interesting than I'd expected.

After the rather unsuccessful cable-making adventure in Part 1, I'd decided to use a properly made cable from Tototek. Sometimes buying the right thing is considerably easier than spending an afternoon working out which wire goes where.

The setup consisted of a PAL Mega Drive and Mega-CD connected to a Windows XP PC through its parallel port. The cartridge data travelled through controller port 2, with the Mega-CD handling the transfer software.

I'd also covered cartridge pin B32 so the Mega Drive would boot the Mega-CD software rather than trying to start *Fatal Fury 2* directly. Rather a clever little trick!

Thanks again to Mask of Destiny at RetroDev for the transfer software and pinout information. I didn't end up using the pinouts this time because I bought the cable. Lazy? Perhaps. But at least we're getting somewhere!

One important discovery from my earlier attempts was that the PC's parallel port needed to be configured for bidirectional operation rather than ECP/EPP. That had caused me a fair bit of confusion before I worked it out.

I'd been interested in dumping this particular cartridge because I hadn't seen much of the PAL release floating around. I also thought it might be a 32 Mbit cartridge, which would give us a 4 MB file. Thirty-two divided by eight. See, I can do mathematics when I put my mind to it... errr, except the transfer software had other plans.

Running `DUMP.EXE` identified the cartridge as 24 Mbit, which meant a 3 MB dump instead. The transfer completed and produced an `OUTPUT.BIN` file, so the first job was to find out whether it actually contained something useful.

The ROM booted in Fusion, which was encouraging. Unfortunately, the emulator also reported an incorrect checksum. Not quite what I'd hoped for after all that fiddling around.

Rather than assume everything was fine, I dumped the cartridge a second time and used HxD to compare the resulting files. They were identical, so at least the transfer was producing consistent data.

I also found a US ROM image of *Fatal Fury 2* to compare against my dump. One of the comparison files was in SMD format, so I converted it to BIN using SV Win before checking the contents. The result? Identical again!

So after all that excitement about dumping a PAL cartridge, I'd ended up with data matching the US version I compared it against. What a discovery! Or perhaps not quite the discovery I'd hoped for.

The checksum warning was still there, but the game ran, both dumps from my cartridge matched, and I couldn't find a difference between my dump and that US image. I suppose I could blame the original game developers for the checksum. That would certainly be more entertaining than blaming myself.

I gave *Fatal Fury 2* a bit of a play too, although I'm not particularly good at fighting games. Unless you count *Dead or Alive*, where I'm quite talented at repeatedly pressing the kick button.

So the Tototek cable and Mega-CD transfer setup had finally done what I'd been trying to achieve. I'd dumped a Mega Drive cartridge through the controller port and parallel connection, even if the PAL release hadn't turned out to be particularly different from the US ROM I'd found.

Who would have thought a humble Mega-CD could be so useful?

**Sources**

- [RetroDev - Sega CD Transfer Suite](https://www.retrodev.com/transfer.html)

**Related Posts**

- [Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 1)](/sega-mega-drive-genesis-cart-dumping-via-parallel-part-1/)
- [Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 3)](/sega-mega-drive-genesis-cart-dumping-via-parallel-part-3/)
