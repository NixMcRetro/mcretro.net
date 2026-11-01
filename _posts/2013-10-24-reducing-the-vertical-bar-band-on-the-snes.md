---
title: "Reducing the Vertical Bar / Band on the SNES"
author: "Nix McRetro"
date: 2013-10-24T18:08:23.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="TGVn9sRoV-g" %}

The vertical bar on my Super Nintendo didn't bother me too much while I was playing as Ness in *EarthBound*. Then I discovered how much it could actually be reduced. Two 220 uF capacitors rated at 16 V, and we were cooking with gas!

I'd been noticing a rather prominent vertical band running down the picture, particularly against certain background colours. It's one of those things you can ignore for a while, but once somebody points it out, your eyes seem determined to find it every time you switch the machine on.

Thanks to MaxWar over at ASSEMbler Games for the information that sent me down this particular path. The idea was to improve filtering on the Super Nintendo's 5 V supply, including the power going to the video encoder, and see whether that would make the picture any cleaner.

The machine on the bench was a PAL CPU-02 Super Nintendo, which had already seen a few repairs. I'd replaced the fuse previously too, so there was no shortage of reasons to be poking around inside it again.

Rather than jump straight to some enormous capacitors, I thought I'd try a few different values and watch what happened to the vertical band. I started with a little 10 uF, 16 V capacitor between the output and ground of the 7805 voltage regulator.

Naturally, I immediately soldered it in backwards. Whoops! Apparently a little more sleep before working on electronics might be a good idea. Fortunately I checked what I'd done, spotted the reversed polarity and corrected it before carrying on.

The 10 uF capacitor didn't make much difference to the picture, so I stepped up to a 47 uF, 16 V Rubycon. Now we were getting somewhere! The band was still there, but it had started becoming noticeably less prominent.

Next I turned my attention to the S-ENC A video encoder. I checked the relevant connections, with pin 2 going to ground and pin 5 providing the supply connection in the arrangement I was testing, before adding a capacitor across them. That helped too, although the line was still visible.

I tried a 100 uF capacitor as part of the experiment, then moved on to the 220 uF values. By the end I had two 220 uF, 16 V Panasonic capacitors fitted, one at the regulator and the other at the encoder supply. Those gave me the best result I'd seen on this particular board.

I'd deliberately left the television brightness turned right up while comparing the picture, since that made the band easier to see. Even at 100% brightness it was now much fainter, and when I dropped the brightness back towards 50%, the improvement was lovely. My eyes were rather grateful too!

There was also the small matter of making everything fit back together. One capacitor needed to be routed around a large plastic support beneath the case, and I wanted to be certain it wouldn't short against anything. A beautiful picture isn't much consolation if the machine goes up in smoke the moment you put the lid back on.

With the capacitors positioned properly, I was very happy with the result. The vertical band wasn't completely gone under every possible picture setting, but it was considerably less distracting than before. Not a bad outcome for a bit of experimenting!

Unfortunately, the day's excitement didn't end there. I decided to give my homemade *EarthBound* cartridge another test and somehow managed to put it into the Super Nintendo backwards. The power LED came on very dimly, which was a pretty good indication that something wasn't right, so I switched the machine off immediately.

The console survived, thankfully, but my *EarthBound* save games weren't so lucky. Over fifteen hours of progress had disappeared! I'd even copied the original save into a second slot as a backup, and both were gone. Damn it!

So there we have it. One Super Nintendo with a much nicer picture, and one rather devastated *EarthBound* player. Now I've got to make my way through all those levels again, although at least I'll have a better picture to look at while I'm doing it!

**Sources**

- [MaxWar - SNES vertical bar: Quick and easy fix](https://web.archive.org/web/20191111103253/https://assemblergames.com/threads/snes-vertical-bar-quick-and-easy-fix.48413/)
