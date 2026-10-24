---
title: "Sony PlayStation 3 YLOD Repair Attempt"
author: "Nix McRetro"
date: 2013-07-11T02:08:12.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sony, youtube]
---

{% include youtube.html id="4ttfqPNa-Ks" %}

Sadly, this repair did not have any success. The serial number of this unit was `02-27430367-2452398-CECHG02`. However, stay tuned... we have some mighty successes coming up!

I'd been working on an Xbox 360 with the dreaded red ring of death around the same time, so I thought I'd have a go at a PlayStation 3 suffering from the yellow light of death. Apparently I wasn't content with having just one broken seventh-generation console to worry about.

One thing I did enjoy was pulling the PlayStation apart. Compared with the Xbox 360, I thought Sony had done a magnificent job with the internal design. Everything seemed rather well organised, even if there were an enormous number of screws.

The fan was absolutely massive! There were also plenty of interesting bits and pieces to inspect, including the Cell Broadband Engine and RSX Reality Synthesizer beneath their heat spreaders. Lovely looking chips, even if the machine they belonged to wasn't doing much.

My attempted repair involved dismantling the console, removing the old thermal material and applying heat around the main chips. I'd seen various methods suggested for these machines and decided to experiment with one of them. The heat spreaders made the process rather frustrating, though. They were doing exactly what they were designed to do, moving heat away from the chips.

Unfortunately, that made the temperatures difficult to judge while I was trying to heat the board. There was plenty of foil, flux and thermal paste involved, plus some copper shims. The thermal compound was particularly unpleasant to work with. I tried spreading it as instructed and somehow managed to get the stuff just about everywhere. It even looked as though somebody had mixed body glitter into it!

After cleaning up the mess, I put the heatsinks, clamps, fan and the rest of the hardware back together. I gave everything a thorough clean along the way. It was probably one of the cleanest original PlayStation 3 consoles around by the time I'd finished. Unfortunately, that didn't make it a working one.

The console still displayed the same green, yellow and blinking red light sequence, with no useful video output. I also tried the fan test by holding the eject button while switching the machine on at the rear. The fan certainly knew how to move some air, but it wasn't going to fix the original problem.

After roughly an hour and a half of work, I was left with a very clean and still very broken PlayStation 3. The heat treatment hadn't achieved what I'd hoped, and I wasn't going to pretend otherwise. Oh well. We can't save them all!

The yellow light itself didn't tell me which component had failed. I hadn't established whether this was a soldering problem, a faulty chip or something else, and there was no proper diagnosis to point towards a particular repair.

**Later note:** SYSCON error logging can provide more useful diagnostic information for a faulty PS3, but I didn't record any SYSCON codes during this attempt. Heating the board wasn't a substitute for finding out what had actually failed.

**Related Posts**

- [Sony PlayStation 3 - Initial Assessment YLOD](/sony-playstation-3-initial-assessment-ylod/)

**Sources**

- [PS3 Developer Wiki - Boot modes: YLOD](https://www.psdevwiki.com/ps3/Boot_modes)
- [PS3 Developer Wiki - Syscon Error Codes](https://www.psdevwiki.com/ps3/Syscon_Error_Codes)
