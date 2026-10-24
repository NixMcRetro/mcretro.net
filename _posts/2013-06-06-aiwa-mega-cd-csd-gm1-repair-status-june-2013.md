---
title: "Aiwa Mega-CD CSD-GM1 Repair Status: June 2013"
author: "Nix McRetro"
date: 2013-06-06T21:08:37.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
---

{% include youtube.html id="0JPgm7M9QfM" %}

Two units, no properly working transformers, cracked circuit boards, a sea of likely bad capacitors and one relatively determined repairer. Much more to come on this one. I picked up both Aiwa Mega-CD CSD-GM1 units in faulty condition, which is generally how I prefer to acquire things, but these have been a particularly interesting challenge.

Normally, when I've got two examples of the same hardware, I can use one to help diagnose the other. That's certainly been useful with the Sega TeraDrive. Unfortunately, neither of these Aiwas is working properly, which rather defeats the whole idea of having a reference machine!

The first major headache is the power supply arrangement. Both transformers have problems, with one apparently producing incorrect voltages and the other delivering far too little. I've been investigating DC-to-DC converters as a possible alternative, but there's still a fair bit of work to do before I have a reliable supply of the correct voltages.

Then there's the physical damage. One mainboard is covered in broken tracks and has already needed a substantial collection of jumper wires. Thankfully the board isn't a complicated multilayer affair, so it's possible to trace connections with a multimeter and work out which bits have stopped talking to each other. The second mainboard is in better condition, although it's hardly fault-free.

The boards aren't even quite identical. There are revision differences, including a larger heatsink on one of them, and some of the voltage regulators need investigating. I've also noticed problems with missing or very faint audio, which makes me suspicious of the ageing electrolytic capacitors. There are certainly enough of them to keep me entertained for a while.

By this point I had already managed to extract and preserve the MPR-15768-T BIOS from one of the Game Units, but neither complete CSD-GM1 was anywhere near what I would call repaired.

The CD units present another collection of problems. I've replaced a laser in one of them, and I did manage to get one reading CDs during earlier testing. The other has a chunk of PCB missing, although I've still got the broken piece, so repairing the damaged tracks might be possible. Never say never!

Having two machines at least gives me something extremely useful: comparison hardware. I can compare board revisions, inspect differences and, where appropriate, cross-test assemblies instead of trying to diagnose everything in isolation. Unfortunately, it also means I have roughly twice as many faults.

My first priority is to get one of the boombox sections powered and functioning properly, preferably the one with less physical damage. From there I can work through the audio faults, capacitor replacements and eventually the Game Unit and CD sections. There are also problems with at least one tape deck, but that's another adventure entirely.

Later posts cover the July BIOS socket and trace repairs and the August mainboard recap. Those stages were still ahead of this June 2013 checkpoint. For now I've got plenty of components to inspect, quite a few repairs to attempt and an excellent excuse to bring out the mighty Hakko 808 desoldering gun.

So this video is less of a conclusion and more of a checkpoint. The Aiwa saga continues.

**Related Posts**

- [Aiwa Mega-CD CSD-GM1 BIOS Dump: MPR-15768-T](/aiwa-mega-cd-csd-gm1-bios-dump-mpr-15768-t/)
- [Aiwa Mega-CD Game Unit BIOS Socket Installation and Trace Repair](/aiwa-mega-cd-game-unit-bios-socket-installation-and-trace-repair/)
- [Aiwa Mega-CD CSD-GM1 02-01 Rev 2 Mainboard Recap](/aiwa-mega-cd-csd-gm1-02-01-rev-2-mainboard-recap/)
