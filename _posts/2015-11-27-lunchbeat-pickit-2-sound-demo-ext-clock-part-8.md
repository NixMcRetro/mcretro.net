---
title: "Lunchbeat / PICkit 2 - Sound Demo Ext. Clock (Part 8)"
author: "Nix McRetro"
date: 2015-11-27T18:20:47.000+11:00
last_modified_at: 2026-10-18
categories: [programming, youtube]
---

{% include youtube.html id="dt0s9hSIgiI" %}

This is the final AVRDUDE flash of the [Lunchbeat by Buranelectrix](https://web.archive.org/web/20131112015528/http://buranelectrix.com/). We've got everything connected, with the Lunchbeat getting its power from the PICkit 2 rather than a battery. Hopefully it's all going to behave!

We also reminisce about how good SuperNick (Nick) is at holding down buttons while flashing things. Whether that's entirely necessary throughout the flash... I can't remember. Still, the PICkit 2 is doing its thing, and after a little waiting we're all done!

As it turns out, I was doing it wrong before. I hadn't set the fuses to use the external 16 MHz crystal, so the ATmega328P was still running from its internal clock. That lovely crystal sitting on the board was effectively just decoration! Whoops!

With the clock settings sorted out, the sound playback is much better. I've made a little tune to demonstrate it, and the Lunchbeat is finally doing something a bit closer to what it's supposed to do. Just sit back and listen. They sure can be catchy!

We've actually got three of these machines assembled, and this particular Lunchbeat belongs to SuperNick (Nick). There are still a couple of little things to tidy up, including the battery holder and the on/off switch arrangement, but the important part is working.

You can even connect multiple Lunchbeats together if you've got two or more. Just think of the possibilities! That's what happens when I hack about with things beyond my understanding. Quite a fun little project, and one more video to come.

### Sources

- [Buranelectrix - Lunchbeat: 1bit groovebox](https://web.archive.org/web/20131112013520/http://buranelectrix.com/lunchbeat/lunchbeat.php)
- [Microchip - ATmega328P Datasheet](https://ww1.microchip.com/downloads/en/devicedoc/atmel-7810-automotive-microcontrollers-atmega328p_datasheet.pdf)

### Lunchbeat / PICkit 2 series

- [Lunchbeat / PICkit 2 - PCB Arrival (Part 1)](/lunchbeat-pickit-2-pcb-arrival-part-1/)
- [Lunchbeat / PICkit 2 - Programming the PIC18F2550 (Part 2)](/lunchbeat-pickit-2-programming-the-pic18f2550-part-2/)
- [Lunchbeat / PICkit 2 - Update (Part 3)](/lunchbeat-pickit-2-update-part-3/)
- [Lunchbeat / PICkit 2 - LEDs (Part 4)](/lunchbeat-pickit-2-leds-part-4/)
- [Lunchbeat / PICkit 2 - Programming 101 (Part 5)](/lunchbeat-pickit-2-programming-101-part-5/)
- [Lunchbeat / PICkit 2 - Programming 102 (Part 6)](/lunchbeat-pickit-2-programming-102-part-6/)
- [Lunchbeat / PICkit 2 - Sound Demo Int. Clock (Part 7)](/lunchbeat-pickit-2-sound-demo-int-clock-part-7/)
- [Lunchbeat / PICkit 2 - Resistor Upgrade (Part 9)](/lunchbeat-pickit-2-resistor-upgrade-part-9/)
