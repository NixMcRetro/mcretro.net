---
title: "Aiwa Mega-CD CSD-GM1 Repairs Part 2: Power Rail Testing"
author: "Nix McRetro"
date: 2012-10-20T04:17:40.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, repairs, sega]
---

{% include youtube.html id="rk-CYnqxv6M" %}

The video above is not the one I originally intended to upload.

YouTube messed up the upload, then I accidentally deleted the original while trying to recover it.

It was gone.

Never mind. Enjoy some transformer rantings instead.

### Reconnecting the power wiring

I started the weekend by reconnecting the two blue wires to each other and the two white wires to each other.

They had been separated for reasons unknown.

I restored them according to their original routing and by comparing the damaged machine with my other CSD-GM1. At this stage I still didn't know exactly which sections of the machine each rail supplied.

![](/assets/images/2012/img_0308.jpg)

Next came the DC-DC step-down converters.

One was initially adjusted to 6.3 V and the other to 9.75 V. Ground was connected to the same point on the battery PCB that feeds into the transformer wiring.

![](/assets/images/2012/img_0309.jpg)

### Following the rails

The Mega-CD mechanism connects to the rest of the machine through several harnesses.

In my testing:

1. The long connector on the right powers the CD mechanism and front control buttons.
2. The medium connector on the left carries an approximately 8 V rail on one pin.
3. The short connector on the right provides the supply feeding the Mega Drive section.

That last rail should ultimately produce 5 V for the game hardware, but I was only measuring around 3.3 V and the picture looked terrible.

![](/assets/images/2012/img_0310.jpg)

The machine has to sit upside down and backwards for everything to remain connected while testing.

An excellent recipe for sanity.

![](/assets/images/2012/img_0311.jpg)

![](/assets/images/2012/img_0315.jpg)

![](/assets/images/2012/img_0312.jpg)

The back of the unit shows the two DC-DC converters connected to power.

![](/assets/images/2012/img_0313.jpg)

Blue, white, red and black are the colours of the day. I am pretty well acquainted with where they run to on the mainboard now.

![](/assets/images/2012/img_0314.jpg)

Now to power the unit on and... errr, that's not looking quite right...

### Finding the regulator problem

![](/assets/images/2012/img_0317.jpg)

![](/assets/images/2012/img_0318.jpg)

![](/assets/images/2012/img_0319.jpg)

I measured the supplies at several points.

One CD-deck rail looked reasonable, while another was almost 2 V too low.

More importantly, a regulator that should have been producing around 6 V was only giving me about 4 V.

Disconnecting one converter also established that the white-wire rail was feeding the Mega Drive side. I still did not know exactly what the blue rail powered at this point.

![](/assets/images/2012/img_0316.jpg)

Then the mistake became obvious.

I was feeding only 6.3 V into a regulator expected to produce around 6 V.

If the regulator behaves like a conventional 7806, that leaves nowhere near enough voltage headroom. A typical 7806 needs roughly another 2 V at its input to regulate properly.

So I increased the test input to 8 V.

![](/assets/images/2012/img_0320.jpg)

![](/assets/images/2012/img_0321.jpg)

![](/assets/images/2012/img_0322.jpg)

Not only did the picture improve enormously, **there was sound** from the damaged mainboard as well.

Victory!

More importantly, the result told me something useful. The 6 V rail had been starved of input headroom.

It did **not** prove that the transformer itself was definitely faulty. The transformer, rectification, filter capacitors, wiring and downstream load were all still possibilities that needed to be isolated separately.

What it did show was that my mainboard trace repairs were working well enough for the machine to produce both video and audio.

That is a very good result.

I've also got the replacement optical pickup for the CD mechanism, so perhaps I'll even get to play a Mega-CD game on this thing eventually.

Thanks again to Dutchy on the archived [ASSEMblergames forum](https://web.archive.org/web/20191110101129/https://assemblergames.com/threads/aiwa-mega-cd-csd-gm1-mainboard-repair.42186/) for reminding me that voltage regulators need some headroom above their regulated output.

That may have saved the day.

### Related posts

- [Aiwa Sega Mega-CD CSD-GM1 Repairs Part 1: Power Restored](/aiwa-sega-mega-cd-csd-gm1-repairs-part-1-power-restored/)
- [Aiwa Sega Mega-CD CSD-GM1 KSS-210B Laser Replacement](/aiwa-sega-mega-cd-csd-gm1-kss-210b-laser-replacement/)

### Sources

- [STMicroelectronics L7806 datasheet](https://mm.digikey.com/Volume0/opasdata/d220001/medias/docus/6283/L7806.pdf) - documents the input headroom required for a conventional 6 V 78xx-family linear regulator.
