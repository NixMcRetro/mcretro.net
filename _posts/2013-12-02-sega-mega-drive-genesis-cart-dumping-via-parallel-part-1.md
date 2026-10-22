---
title: "Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 1)"
author: "Nix McRetro"
date: 2013-12-02T20:19:08.000+11:00
last_modified_at: 2026-10-22
categories: [hacks, sega, youtube]
---

{% include youtube.html id="ON2eUAP6yz4" %}

Dumping Mega Drive / Genesis cartridges through controller port 2, with a Mega-CD providing the boot environment. Incredible, right?

I've dragged out my old Athlon 500 PC for this experiment, mainly because it has something rather important on the back. A parallel port! The idea is to connect that to controller port 2 on the Mega Drive and use the Sega CD Transfer Suite from Mask of Destiny at RetroDev to read a cartridge without removing any chips.

Today's candidate is a PAL copy of Fatal Fury 2. Before we can get anywhere near dumping it, however, there's a cable to make. Out comes the multimeter so I can work out which coloured wire connects to which pin. Unfortunately, I wasn't having much luck with the wiring, and one of the wires managed to break while I was stripping it. Wonderful!

The Sega/Mega-CD runs the transfer software, while the PC receives the data over its parallel connection. There's also a little trick involving cartridge pin B32, which needs to be covered so the machine boots the Mega-CD software rather than the cartridge itself.

After a considerable amount of fiddling, I'd wired everything together and was ready to try a transfer. Unfortunately, the PC wasn't receiving anything useful. Eventually I discovered that I'd misunderstood the numbering on the parallel connector and wired the second row incorrectly.

Fixing that got us a little further, although I still wasn't convinced everything was communicating properly. At one point the software even appeared to start dumping Fatal Fury 2, but the transfer stopped before completing.

So we're not quite there yet. At least the basic hardware and software are running, and I've got a better idea of where things might be going wrong. Thanks to Mask of Destiny for making this rather interesting experiment possible!

### Related posts

- [Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 2)](/sega-mega-drive-genesis-cart-dumping-via-parallel-part-2/)
- [Sega Mega Drive / Genesis Cart Dumping via Parallel (Part 3)](/sega-mega-drive-genesis-cart-dumping-via-parallel-part-3/)

### Sources

- [RetroDev - Sega CD Transfer Suite](https://www.retrodev.com/transfer.html)
