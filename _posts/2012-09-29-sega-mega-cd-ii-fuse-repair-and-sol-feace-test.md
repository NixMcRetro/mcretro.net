---
title: "Sega Mega-CD II Fuse Repair and Sol-Feace Test"
author: "Nix McRetro"
date: 2012-09-29T23:04:23.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
---

{% include youtube.html id="CA13Nyxmz-0" %}

Here's *Sol-Feace* running on one of my repaired Mega-CD setups. My skills at the game are a little rusty, although I'd never actually played it before this recording. That certainly explains a few things!

I've also been working on a Mega-CD II that arrived as part of a rather inexpensive eBay purchase. For around $60 Australian, I ended up with a broken Mega-CD II and a Mega Drive 2 that wasn't powering on either. The Mega Drive had a troublesome DC-in socket, which was a fairly familiar problem by this point.

The Mega-CD II had its own electrical problem. It was completely dead, and I eventually traced the trouble to the little F301 fuse on the motherboard. Sega's service documentation identifies this as a 2.5 A PICO II fuse, which gave me something useful to work with.

I'd previously managed to get the machine running with a temporary wire bridging the failed fuse, but that was never going to be a proper repair. A fuse is there for a reason, after all. I certainly didn't want to leave a piece of wire in its place!

Fortunately, I had some replacement fuses available. The parts I used were 2.5 A fast-acting axial fuses from Littelfuse. They were a little larger than the original component, but there was enough room to fit one properly without resorting to any more questionable bits of wiring.

The repair recording is below. As usual, the first challenge was getting the Mega-CD apart without scattering screws and bits of EMI shielding across the room.

{% include youtube.html id="dGwo-Tchehs" %}

There were six screws holding the bottom casing together, followed by another collection securing the internal shielding. One of those screws also held a grounding lead, which was worth remembering when the time came to put everything back together.

With the motherboard removed, the old fuse was accessible from underneath. A quick check with the multimeter confirmed that it wasn't conducting, so I removed it and fitted the replacement. A little soldering, a little cleaning up and we had a proper fuse in place again.

The replacement also needed enough clearance from the metal shielding when everything was reassembled. Given that I'd already gone to the trouble of replacing a piece of wire with a fuse, having the new component touch something it shouldn't would be rather defeating the purpose!

Reassembly went reasonably well, apart from the usual business of remembering which screws belonged where. I also had to reconnect the cables and that grounding lead before fitting the shielding and closing everything up.

With the Mega-CD II connected to its Mega Drive, I eventually managed to get *Sonic CD* running. Beautiful! That's a considerably better result than a machine that wouldn't power on at all.

The *Sol-Feace* footage at the top is a separate gameplay recording from another repaired Mega-CD, but it seemed a suitable way to celebrate having these lovely old machines back in action.

And as for *Sol-Feace*, I think I'll need considerably more practice. Apparently owning an enormous collection of Sega hardware doesn't automatically make you good at the games.

**Related Posts**

- [Fuse Replacement on the Sega Mega-CD Model 1](/fuse-replacement-on-the-sega-mega-cd-model-1/)

**Sources**

- [Sega Mega-CD II service manual](https://manualzz.com/doc/23428729/sega-ii-cd-ii-cd--ii-mega-cd-ii-mega-cd-service-manual)
