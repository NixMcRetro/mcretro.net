---
title: "picoPSU-80 on a Pentium III 800 MHz"
author: "Nix McRetro"
date: 2012-11-05T19:32:48.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs, sega]
---


{% include youtube.html id="svhVakdRmKI" %}


Here's an idea of what the picoPSU-80 setup draws from the wall when connected to a Pentium III 800 MHz machine with 512 MB RAM, a hard drive and a floppy drive. It performs surprisingly well. The power meter showed around 5 W before boot, climbed into the 30 W range during startup, then settled around 37 to 38 W once the machine was running. That's wall power, including the external brick, with no proper stress test yet. I should really repeat this test with the machine under a meaningful CPU and disk load to see how high the power consumption actually gets.


The picoPSU was first tested on the Amstrad Mega PC a few months ago with an adapter to suit AT-style power supplies. It worked well then, but I did not have access to a power usage meter. Now I can check the juice that is being eaten by whatever device is attached. The brick feeding the picoPSU was labelled 12 V at 7 A, which gives it an 84 W nominal output rating. The floppy drive was also making quite enough noise to remind me this was a very old PC!


Load monitoring is quite important. The picoPSU-80 has an 80 W overall rating, but individual rail limits and the capacity of the external 12 V supply also matter. An overloaded setup may become unstable, shut down, overheat or potentially damage components depending on which limit is being exceeded. The wall-power meter also includes losses in the external AC-to-12 V power brick, so its reading is not the same as the DC output load on the picoPSU itself.


The hard drive wasn't booting properly during the demonstration either. A quick `FDISK /MBR` got it going again, and I finally had a working DOS prompt. Not a full benchmark by any means, but a useful little experiment.


### Related posts


- [Amstrad Sega Mega PC with picoPSU and a Dual-Screen Setup](/amstrad-sega-mega-pc-with-picopsu-and-a-dual-screen-setup/)


### Sources


- [Mini-Box - picoPSU-80](https://www.mini-box.com/picoPSU-80) - manufacturer specifications for the 80 W DC-DC ATX supply and 12 V input.
- [Mini-Box - picoPSU-80 Quick Installation Guide, version 1.0d](https://resources.mini-box.com/online/PWR-PICOPSU-80/PWR-PICOPSU-80-manual.pdf) - lists the individual rail limits, regulated 12 V input and ventilation requirements.
