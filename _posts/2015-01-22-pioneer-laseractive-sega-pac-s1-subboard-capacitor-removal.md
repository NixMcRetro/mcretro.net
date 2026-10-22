---
title: "Pioneer LaserActive Sega PAC-S1 Subboard Capacitor Removal"
author: "Nix McRetro"
date: 2015-01-22T21:58:41.000+11:00
last_modified_at: 2026-10-22
categories: [repairs, sega, youtube]
---

{% include youtube.html id="N4OYQTUKXaU" %}

Time for the other board in the Pioneer LaserActive PAC-S1. This is the smaller subboard, and despite its size it has roughly forty surface-mounted electrolytic capacitors scattered across it. Forty! That's a fair few little metal cans for one circuit board.

Most of them appear to be 10 uF capacitors, although there are also some 47 uF and 100 uF parts, a 1 uF capacitor and a couple of bipolar ones. As with the mainboard, the plan is to remove the ageing capacitors, clean everything up and eventually install fresh replacements.

I'm using the same gripping and wiggling method that worked rather well on the mainboard. The idea is to loosen the metal legs while leaving the solder pads attached to the circuit board. It worked nicely on the first few. What could possibly go wrong?

Well, almost immediately, one of the solder pads lifted off the board. Oh dear. That was \`C21\`, and fortunately it looked as though the connection might be to ground, which should make the repair a little easier. I'll need to trace it properly before deciding exactly how to reconnect it.

A little further along, another pad came away at \`C104\`. Then there were more. Much more! This board is certainly a different beast from the mainboard. Some capacitors were lifting cleanly, while others were bringing their pads along for the ride, even when I thought I'd been rather careful.

There was also plenty of suspicious residue beneath the capacitors. Some of it initially looked like it might have been glue, but after removing a few more components it became rather obvious that at least some had leaked. The larger 47 uF and 100 uF parts were particularly unappealing.

By the end, all the old surface-mounted capacitors were off the subboard. Unfortunately, I've also got a collection of damaged solder pads to deal with. One or two were still hanging onto their traces, while others will need replacement connections using fine wire.

The good news is that there are plenty of vias and accessible traces around the board, so I'm hopeful the damaged connections can be reconstructed. I'll still need to check each one individually and make sure there are no accidental shorts before this board ever goes near the LaserActive again.

Next up is cleaning the exposed pads and removing the remaining bits of capacitor legs. Then we can start working out where the replacement capacitors and repair wires need to go.

Not quite as excellent as I'd hoped, but I'll work it out. This little board has certainly made the job more interesting!

### Related posts

- [Pioneer LaserActive PAC-S1 EPROM BIOS Dump](/pioneer-laseractive-pac-s1-eprom-bios-dump/)
- [Pioneer LaserActive Sega PAC-S1 Disassembly](/pioneer-laseractive-sega-pac-s1-disassembly/)
- [Pioneer LaserActive Sega PAC-S1 Mainboard Capacitor Removal](/pioneer-laseractive-sega-pac-s1-mainboard-capacitor-removal/)
