---
title: "Reducing the Vertical Bar / Band on the SNES"
author: "Nix McRetro"
date: 2013-10-24T18:08:23.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="TGVn9sRoV-g" %}

The vertical bar on my Super Nintendo didn't bother me too much while I was playing as Ness in *EarthBound*. Then I discovered how much it could actually be reduced. Two 220 uF capacitors rated at 16 V, and we were cooking with gas!

I'd been noticing a fairly prominent vertical band running down the picture, particularly against certain background colours. It's one of those things that you can ignore for a while, but once somebody points it out, your eyes keep finding it.

Thanks to MaxWar over at ASSEMbler Games for the information that sent me down this particular path. The idea was to improve filtering around the console's 5 V supply, including the power feeding the video encoder.

The Super Nintendo I was working on had a PAL CPU-02 motherboard, which had already seen a few repairs. I'd also replaced the fuse previously, so the board wasn't exactly unfamiliar territory.

Rather than immediately fit the largest capacitors I had available, I decided to experiment with a few different values and see whether there was a noticeable change.

I started with a 10 uF, 16 V capacitor between the output and ground of the 7805 voltage regulator. I promptly discovered that I'd connected it with the polarity reversed. Fortunately, I spotted the mistake before continuing and corrected it. Apparently I should get more sleep before playing with electronics!

The small capacitor didn't make much difference to the visible band, so I moved up to 47 uF. That gave me a more encouraging result. The interference seemed less prominent, although it certainly hadn't disappeared.

Next I turned my attention to the S-ENC A video encoder. I added another capacitor between its supply and ground connections, checking the relevant pins before testing the machine again. The picture was beginning to look considerably better.

I kept experimenting, including trying a 100 uF capacitor, before settling on two 220 uF, 16 V capacitors. One was fitted at the regulator output and the other at the video encoder supply. On this particular console, that arrangement gave a very noticeable improvement.

I also had to think about where the capacitors would physically sit once the console was reassembled. There's not much point fitting something that improves the picture if it gets crushed against a plastic support or shorts against another part of the board.

With everything positioned and insulated appropriately, the vertical band was much less distracting. It wasn't a guarantee that the same modification would produce identical results on every SNES revision, but it was a successful improvement on this machine.

Unfortunately, the day's excitement didn't end there. While testing my homemade *EarthBound* cartridge, I managed to insert it backwards. The power LED came on rather dimly, and I quickly realised something was wrong and switched the machine off.

The console survived, but my *EarthBound* save data wasn't so fortunate. Over fifteen hours of battles and progress disappeared, including the backup save I'd copied into a second slot. Both gone! I really wasn't expecting to lose all that progress because I'd inserted a cartridge the wrong way around.

So there we go. One Super Nintendo with a significantly better picture and one rather devastated *EarthBound* player. Hardware modifications can be wonderfully satisfying, but sometimes the smallest mistake has the most annoying consequences.

Now I've got to play through all those levels again. Oh well, at least the picture will look nicer this time!

**Sources**

- [MaxWar - SNES vertical bar: Quick and easy fix](https://web.archive.org/web/20191111103253/https://assemblergames.com/threads/snes-vertical-bar-quick-and-easy-fix.48413/)
