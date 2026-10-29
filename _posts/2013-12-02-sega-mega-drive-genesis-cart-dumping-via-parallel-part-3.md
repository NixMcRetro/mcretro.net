---
title: "Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 3)"
author: "Nix McRetro"
date: 2013-12-02T22:22:41.000+11:00
last_modified_at: 2026-10-22
categories: [hacks, sega, youtube]
---

{% include youtube.html id="o-jvLz7hsoE" %}

The final test, dumping Sonic the Hedgehog through controller port 2 on a Mega Drive / Genesis, with the Mega-CD running the transfer software. Incredible, right?

Remember that rather questionable cable I made in the first video? Well, it turns out the wiring might not have been the problem after all. I eventually discovered that my PC's parallel port was configured incorrectly, which explains why the transfers were going nowhere.

I'd become rather suspicious of the original cable after the previous attempts, so I ordered a properly made one from Tototek. It's considerably tidier than having a collection of loose wires hanging out of everything. Unfortunately, I eventually discovered that my computer was still configured in a way that prevented the transfer software from working properly.

The BIOS had the port set to ECP/EPP mode. After changing it to bidirectional mode, things started behaving considerably better. I'd also bought a properly made cable from Tototek by this stage, which was certainly tidier than my collection of loose wires!

With the port configured correctly, I could finally get the PC and Mega-CD talking to each other more reliably. The software on the Mega-CD side was written by Mask of Destiny at RetroDev, and the PC receives the data through its parallel port. It's a rather clever way of getting cartridge data without removing any chips.

With the Mega-CD running the transfer software, I decided to dump Sonic the Hedgehog. It's a 4 Mbit cartridge, so we should end up with a 512 KB file. There's also the usual trick of covering pin B32 so the console boots the Mega-CD software rather than Sonic.

Unfortunately, the first attempt wasn't quite right. The software detected an incorrect cartridge size and produced an incomplete file of around 444 KB. Fusion recognised the game's title, but the checksum was wrong and the game wouldn't boot properly.

The progress counter had actually reached around 87% before the transfer stopped, which was rather encouraging until I looked at the resulting file. It was close enough for Fusion to recognise Sonic the Hedgehog, but not close enough to run the game properly. Almost!

This time I told the dumping software to read exactly 4 Mbit rather than relying on automatic detection. And there we go! A 512 KB file appeared, and Sonic started running in Fusion. Much more like it!

Having the correct file size and a booting game was a rather satisfying result after all the cable fiddling and computer configuration problems. I'd been expecting the wiring itself to be responsible, but in the end the parallel-port setting was a rather important part of the problem.

So at long last we've managed to dump a Mega Drive cartridge through controller port 2 and the PC's parallel port. It's certainly an entertaining way of doing things, and much nicer than having to remove ROM chips from perfectly good cartridges.

I think I may have recorded this before the Fatal Fury 2 demonstration, so the order of these videos might be a little muddled. Either way, it gives us a good look at how the whole arrangement works.

**Related Posts**

- [Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 1)](/sega-mega-drive-genesis-cart-dumping-via-parallel-part-1/)
- [Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 2)](/sega-mega-drive-genesis-cart-dumping-via-parallel-part-2/)

**Sources**

- [RetroDev - Sega CD Transfer Suite](https://www.retrodev.com/transfer.html)
