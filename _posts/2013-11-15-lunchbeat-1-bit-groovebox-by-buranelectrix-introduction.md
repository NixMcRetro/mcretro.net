---
title: "Lunchbeat 1-bit Groovebox by Buranelectrix: Introduction"
author: "Nix McRetro"
date: 2013-11-15T06:39:39.000+11:00
last_modified_at: 2026-10-18
categories: [programming, youtube]
---

{% include youtube.html id="xiE_-fCGows" %}

Thanks to [Buranelectrix](https://web.archive.org/web/20131112015528/http://buranelectrix.com/) for creating this great little project based on the Atmel ATmega328P chip. I'll be making one on a proper fabricated PCB in the near future.

The design runs at 16 MHz, with six buttons, five potentiometers and eight LEDs. Four individually generated 1-bit sounds are mixed through a 3-bit resistor DAC into a wonderfully compact little noise machine. The next post lets this one make some noise.

Of course, my version isn't exactly what you'd call compact. The proper circuit boards hadn't arrived, and I was getting impatient, so I decided to wire the whole thing together using whatever bits I had available. There's an ATmega328P, a 74HC595 shift register, a pile of LEDs and resistors, and wires going in just about every direction.

The audio circuitry includes a resistor ladder DAC and an LM358 op-amp. I've also fitted a socket for the ATmega because I wasn't especially confident that I'd programmed it correctly. Being able to pull the chip out without desoldering it seemed like a rather sensible decision for once.

The first test involved connecting 5 V from a USB supply and touching some wires together in place of the missing buttons. A couple of LEDs lit up, which was promising, although I wasn't entirely sure what the board was attempting to tell me. At least it was doing something!

After wiring in the op-amp and attaching a little speaker, I finally managed to get an actual beat out of the thing. Excellent! There were still no proper buttons or potentiometers, so controlling it involved touching different wires to ground. Not the most elegant musical interface ever invented, but it worked.

I also experimented with the audio output and found that removing one of the capacitors changed the sound considerably. I've still got plenty to learn about why this arrangement behaves the way it does, although I'm rather pleased with the noise it's making.

Once the proper PCB arrives, I should be able to build something a little less... well, terrifying to look at. But for now, I'm guess I'm quite happy with this tangled collection of components. What a mess. It's beautiful!

**Sources**

- [Buranelectrix - DIY Noisemaking and Related Devices](https://web.archive.org/web/20131112015528/http://buranelectrix.com/)
- [Analogue Haven - Buranelectrix Lunchbeat](https://www.analoguehaven.com/buranelectrix/lunchbeat/)

**Related Posts**

- [Lunchbeat 1-bit Groovebox by Buranelectrix - Demo](/lunchbeat-1-bit-groovebox-by-buranelectrix-demo/)
