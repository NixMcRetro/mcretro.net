---
title: "eMachines E732 Laptop Disassembly"
author: "Nix McRetro"
date: 2016-04-23T12:50:13.000+10:00
last_modified_at: 2026-10-18
categories: [guides, repairs, youtube]
---

{% include youtube.html id="kotGMiHalws" %}

As I was pulling apart an eMachines E732 for a friend, I realised I should make a video for anybody else unfortunate enough to be doing the same thing. These machines are reasonably straightforward to disassemble, with accessible RAM, hard drive and wireless card.

The main jobs were replacing the storage drive and swapping the wireless card. I'd previously fitted an SSD, but this time the original 500 GB Seagate hard drive was going back in. The wireless adapter also needed some attention because the previous configuration hadn't been playing nicely with Debian.

Getting into the machine means removing the battery and rather a lot of screws. There are four smaller ones inside the battery compartment and another collection around the underside of the case. I started with a Phillips size 0 screwdriver, then switched to a size 1 for the larger screws. Keep track of them all!

With the lower cover removed, the RAM, hard drive and wireless card are easy enough to reach. The memory modules pop up when you release their retaining clips, and the hard drive slides out after disconnecting its little ribbon cable. You do have to transfer the mounting bracket to the replacement drive, preferably without installing it backwards.

The right-hand USB ports also rely on a cable that needs reconnecting before reassembly. Forget that and you'll find yourself with a rather familiar one-port situation. I've owned MacBooks, so perhaps I shouldn't complain!

The wireless card is held in by a small screw and has its antenna connections clipped onto the top. Those tiny connectors can be surprisingly easy to damage, so I took my time removing and refitting them. Once the replacement was installed, it was time to put all the plastic and screws back where they belonged.

I originally said the CPU might be replaceable "if it is socketed" because I hadn't checked. :P The service guide confirms that documented E732-family models use an rPGA processor package and includes a CPU replacement procedure. That doesn't mean every possible CPU upgrade will work, but at least the processor isn't permanently soldered down.

The guide also distinguishes E732 and E732Z models with integrated Intel graphics from E732G and E732ZG variants with discrete ATI graphics. Mine was one of the more basic configurations, which explains why there wasn't much additional graphics hardware taking up space inside.

After reassembly, the machine booted Debian 8 Jessie from the replacement hard drive. It worked, although watching a mechanical disk chug away was a good reminder of why I prefer SSDs these days. Still, another machine back together without losing too many screws!

**Sources**

- [eMachines E732 / E732G / E732Z / E732ZG Service Guide](https://www.manualslib.com/manual/509875/Emachines-E732.html)
