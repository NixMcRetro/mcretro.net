---
title: "Aiwa Mega-CD CSD-GM1 Unit-02 Mic Amp Board Repairs"
author: "Nix McRetro"
date: 2013-08-06T22:37:13.000+10:00
last_modified_at: 2026-10-22
categories: [repairs, sega, youtube]
---

{% include youtube.html id="-zlB79E64Ns" %}

Found that one of the Mic Amp Boards (Board 02-09) does not amplify sound. In this video, we look at why that might be and work to resolve the problem as best we can. The Mic Amp Board (01-09) from the revision 1 unit has no issues and was a good part to compare results with.

One thing I've noticed is just how important these little microphone amplifier boards are to the Aiwa's audio arrangement. With the board disconnected, there's still some sound, but it's extremely quiet. That suggests the board is doing rather more than simply amplifying a microphone input.

With the working and faulty boards sitting side by side, I started comparing the transistor readings and looking for differences between the two revisions. The voltages were remarkably similar, although there were a few changes to the components. One board has additional resistors that aren't present on the other, which makes me wonder whether Aiwa revised the design along the way.

Then there was C959. On the working board, this electrolytic capacitor appeared to be installed backwards according to the PCB markings. Now that's confusing! Was it fitted incorrectly at the factory, had somebody repaired the board previously, or were the markings themselves wrong? I certainly wasn't going to assume the silkscreen had the final word.

Unfortunately, swapping things about also revealed another problem with the Unit-02 mainboard, which wasn't producing sound properly. That board had suffered quite a bit of physical damage, so there was already plenty to investigate. Meanwhile, the microphone amplifier was still refusing to cooperate.

During the same session I was also working through the other Aiwa boards. A forgotten 33 uF capacitor needed replacing on the revision 1 mainboard, and one of the transistor connections had a lifted track. Over on the second machine I was still waiting on another large capacitor. These Aiwas certainly aren't short of things for me to repair!

After a rather long session of poking around with the multimeter, I finally spotted two tiny breaks in the microphone amplifier's circuit traces. Two little jumper wires later and we had amplified audio again! Sometimes the smallest faults cause the biggest headaches, especially when you've been spending all evening testing perfectly innocent transistors.

Naturally, fixing that problem revealed another one. The Unit-02 volume board had very weak audio on its left channel, while the right channel was behaving itself. The second mainboard was also still giving me trouble, so we were hardly finished with the restoration.

Still, both microphone amplifier boards were now working, and that's another little victory in the ongoing Aiwa Mega-CD adventure. The next job is getting the remaining audio faults sorted out. We're getting there, baby steps!

**Related Posts**

- [Aiwa Mega-CD CSD-GM1 Unit-02 Volume Board Diagnosis](/aiwa-mega-cd-csd-gm1-unit-02-volume-board-diagnosis/)
- [Aiwa Mega-CD CSD-GM1 Volume Board Repair Attempt](/aiwa-mega-cd-csd-gm1-volume-board-repair-attempt/)
