---
title: "Lunchbeat / PICkit 2 - Sound Demo Int. Clock (Part 7)"
author: "Nix McRetro"
date: 2015-11-21T14:55:32.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [programming, youtube]
---

{% include youtube.html id="4Zxtn0eLWYw" %}

In this video we finally give the Lunchbeat a chance to play some phat tunes.

Something isn't quite right, though.

If you guessed that the ATmega328P is running from its internal clock source instead of the external crystal, you'd be correct! :D

One technical correction to my original wording: there is not a tiny crystal hiding inside the microcontroller. The ATmega328P has a calibrated internal RC oscillator.

The external crystal comes into play in the next sound demo.

### Lunchbeat / PICkit 2 series

- [Lunchbeat / PICkit 2 - PCB Arrival (Part 1)](/lunchbeat-pickit-2-pcb-arrival-part-1/)
- [Lunchbeat / PICkit 2 - Programming the PIC18F2550 (Part 2)](/lunchbeat-pickit-2-programming-the-pic18f2550-part-2/)
- [Lunchbeat / PICkit 2 - Update (Part 3)](/lunchbeat-pickit-2-update-part-3/)
- [Lunchbeat / PICkit 2 - LEDs (Part 4)](/lunchbeat-pickit-2-leds-part-4/)
- [Lunchbeat / PICkit 2 - Programming 101 (Part 5)](/lunchbeat-pickit-2-programming-101-part-5/)
- [Lunchbeat / PICkit 2 - Programming 102 (Part 6)](/lunchbeat-pickit-2-programming-102-part-6/)
- [Lunchbeat / PICkit 2 - Sound Demo Ext. Clock (Part 8)](/lunchbeat-pickit-2-sound-demo-ext-clock-part-8/)
- [Lunchbeat / PICkit 2 - Resistor Upgrade (Part 9)](/lunchbeat-pickit-2-resistor-upgrade-part-9/)

### Sources

- [Microchip - ATmega328P Datasheet](https://ww1.microchip.com/downloads/en/devicedoc/atmel-7810-automotive-microcontrollers-atmega328p_datasheet.pdf)
