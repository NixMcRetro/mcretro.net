---
title: "Aiwa Mega-CD CSD-GM1: External Power Supply Testing"
author: "Nix McRetro"
date: 2012-10-15
last_modified_at: 2026-10-20
categories: [repairs, sega, youtube]
---

{% include youtube.html id="6qr6_9mnZjI" %}

I'm going to be late for work because of this Aiwa Mega-CD. But never mind, we've got more important things to investigate! The CSD-GM1 without the spectacular cracks running through its mainboard has now decided to stop powering on, and the transformer arrangement isn't looking particularly healthy either. It's sitting rather crookedly in its mounting, which certainly isn't encouraging.

I started wondering whether I could get the machine running through its battery connections instead. It normally takes eight C-cell batteries, but I wasn't particularly keen on going out and buying a whole collection of those just for an experiment. Instead, I've connected an external 12 V supply through the battery circuit to see which parts of the Aiwa will respond.

I'd originally thought about using one of the little DC-DC stepdown modules left over from my Sega Saturn power supply experiments. That wasn't going to help with the available input voltage, so I've connected the supply directly to the battery contacts for this test. As you can see in the video, I've run out of sensible wire colours as well. Purple is negative and yellow is positive. Very conventional, I'm sure!

And would you believe it? We're getting somewhere! Tape mode works, the radio plays and CD mode responds by showing a zero on the front display. The CD mechanism still isn't working properly, but at least the machine is showing signs of life again.

Mega Drive mode is another story. Nothing! I'm beginning to suspect one of the regulators supplying the game hardware, although the original transformer arrangement also appears to provide higher voltages than the battery circuit. I'd seen readings around 20 V in the other machine, compared with the 12 V I'm feeding into this one, so I still need to work out how those different supplies are used.

Naturally, I couldn't just leave the experiment there. I decided to connect the other Game Unit and see whether that would make any difference. I'm already late for work, so another few minutes won't hurt. Probably!

Unfortunately, that didn't solve it either. The Mega Drive section still refused to start, although the tape and radio were behaving better than I expected. At least we've established which parts of this machine respond to the alternative power source, even if the game hardware remains stubbornly silent.

Looks like I'll have to investigate the transformer and its associated power rails more closely. Further testing required!

### Related posts

- [Aiwa Sega Mega-CD CSD-GM1 Repairs Intermission](/aiwa-sega-mega-cd-csd-gm1-repairs-intermission/)
- [Aiwa Sega Mega-CD CSD-GM1 Repairs Part 1: Power Restored](/aiwa-sega-mega-cd-csd-gm1-repairs-part-1-power-restored/)
- [Aiwa Mega-CD CSD-GM1 Repairs Part 2: Power Rail Testing](/aiwa-mega-cd-csd-gm1-repairs-part-2-power-rail-testing/)
