---
title: "Lunchbeat / PICkit 2 - Sound Demo Ext. Clock (Part 8)"
author: "Nix McRetro"
date: 2015-11-27T18:20:47.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [programming, youtube]
---

{% include youtube.html id="dt0s9hSIgiI" %}

This was the final AVRDUDE flash of the [Lunchbeat by Buranelectrix](https://web.archive.org/web/20131112015528/http://buranelectrix.com/).

We also reminisce about how good SuperNick (Nick) was at holding down buttons while flashing things. Whether this was entirely necessary throughout the flash... I can't remember.

Just sit back and listen to the tunes. They sure can be catchy, and you can join multiple Lunchbeats together if you have two or more.

Just think of the possibilities!

I believed the earlier setup had effectively been running at around 1 MHz before moving to the external 16 MHz crystal, and the change certainly made the sound playback behave much better.

One correction to the terminology I used in the previous video: the ATmega328P's internal clock source is an RC oscillator, not an internal crystal. The 16 MHz crystal is the external clock source used here.

That's what happens when I hack about with things beyond my understanding.

Quite a fun little project.

One more video to come.

### Lunchbeat / PICkit 2 series

- [Lunchbeat / PICkit 2 - PCB Arrival (Part 1)](/lunchbeat-pickit-2-pcb-arrival-part-1/)
- [Lunchbeat / PICkit 2 - Programming the PIC18F2550 (Part 2)](/lunchbeat-pickit-2-programming-the-pic18f2550-part-2/)
- [Lunchbeat / PICkit 2 - Update (Part 3)](/lunchbeat-pickit-2-update-part-3/)
- [Lunchbeat / PICkit 2 - LEDs (Part 4)](/lunchbeat-pickit-2-leds-part-4/)
- [Lunchbeat / PICkit 2 - Programming 101 (Part 5)](/lunchbeat-pickit-2-programming-101-part-5/)
- [Lunchbeat / PICkit 2 - Programming 102 (Part 6)](/lunchbeat-pickit-2-programming-102-part-6/)
- [Lunchbeat / PICkit 2 - Sound Demo Int. Clock (Part 7)](/lunchbeat-pickit-2-sound-demo-int-clock-part-7/)
- [Lunchbeat / PICkit 2 - Resistor Upgrade (Part 9)](/lunchbeat-pickit-2-resistor-upgrade-part-9/)

### Sources

- [Microchip - ATmega328P Datasheet](https://ww1.microchip.com/downloads/en/devicedoc/atmel-7810-automotive-microcontrollers-atmega328p_datasheet.pdf)
