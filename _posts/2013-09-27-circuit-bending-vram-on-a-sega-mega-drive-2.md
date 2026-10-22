---
title: "Circuit Bending VRAM on a Sega Mega Drive 2"
author: "Nix McRetro"
date: 2013-09-27T20:32:40.000+10:00
last_modified_at: 2026-10-22
categories: [hacks, sega, youtube]
---

{% include youtube.html id="Prp6OLZkeD4" %}

A few people have been asking about circuit bending, so I thought I'd give it a go on one of my Sega Mega Drive 2 consoles. The idea is to interfere with the video RAM signals and see what sort of strange graphical effects we can produce. Completely unnecessary, of course, but that's half the fun!

I'm using a Mega Drive 2 that's already been giving me some trouble, so it's not exactly the most reliable machine to begin with. In fact, the console was having problems before I'd even started fiddling with anything. That should make for an interesting demonstration!

With *Zero Wing* running, I began experimenting around the VRAM connections using a length of wire. The resulting glitches were certainly interesting, although the console wasn't always particularly happy about my interference. At one point the picture went black and white, and there were plenty of other oddities appearing on the screen.

I also gave *Sonic the Hedgehog* a go to see what happened with a different game. Between the graphical corruption, unexpected resets and the Mega Drive's existing problems, there was no shortage of strange behaviour to watch.

For this experiment I was avoiding pins 11, 20, 30 and 40, but that was simply how I approached the particular chip I was working with. It isn't a verified pinout or a list of connections that are safe to bridge on another board. Randomly shorting pins together can damage the VRAM or other parts of the console, and I certainly wouldn't recommend treating this as a universal modification guide.

In the end, circuit bending produced some pretty amusing visual effects, even if there wasn't much practical use for them. The Mega Drive was already rather temperamental, and I was beginning to wonder whether the VRAM itself might have something to do with its normal faults.

Sometimes there's nothing better to do on a Sunday than poke around with an old game console and see what happens. Preferably one that's already broken!

### Related posts

- [Circuit Bending a Sega Mega Drive 2](/circuit-bending-a-sega-mega-drive-2/)
