---
title: "Lunchbeat / PICkit 2 - Sound Demo Int. Clock (Part 7)"
author: "Nix McRetro"
date: 2015-11-21T14:55:32.000+11:00
last_modified_at: 2026-10-18
categories: [programming, youtube]
share_description: >-
  The Lunchbeat makes gloriously peculiar noises using its internal clock. Laser beams meet Geiger counters while the external crystal waits its turn. 🎵
---

{% include youtube.html id="4Zxtn0eLWYw" %}

In this video we finally give the Lunchbeat a chance to play some phat tunes. Something isn't quite right, though. If you guessed that it isn't using the external crystal and is instead running from the internal clock source, you'd be correct! :D

The Lunchbeat is making some rather wonderful noises. There are knobs for changing the sounds and their timing, and I've managed to get something that sounds like a laser beam being fired next to a Geiger counter. Lovely! One of the noises even reminds me of something exploding in Scorched Earth.

The sequencer is working too, although I'm still figuring out which buttons do what. I've managed to find myself in some sort of programming mode without knowing how I got there. That's what happens when you rely on guesswork instead of reading the instructions!

After a bit more button pressing, I've got a pattern playing and can adjust the tempo. There's quite a bit you can do with this little machine, even when you have absolutely no idea what you're doing. I'm not a professional DJ, as you can probably tell!

The clock settings are making a difference to the sound. The ATmega328P has an internal 8 MHz RC oscillator, but its factory clock settings divide that by eight, leaving us with a 1 MHz system clock. That might explain why some of these sounds are a little on the relaxed side. The external 16 MHz crystal hasn't had its turn yet.

I can also get into the configuration menu to change the clock settings and synchronisation options. Apparently you have to hold the button down for quite a while! Maybe I should've read that part of the documentation first.

It's a fantastic little project, even if most of my musical creations sound like a laser beam, drum and bass, or some terrible combination of both. I'll make another video once I manage to produce something resembling actual music. Then again, perhaps I've already invented techno!

### Sources

- [Microchip - ATmega328P Datasheet](https://ww1.microchip.com/downloads/en/devicedoc/atmel-7810-automotive-microcontrollers-atmega328p_datasheet.pdf)

### Related Posts

- [Lunchbeat / PICkit 2 - PCB Arrival (Part 1)](/lunchbeat-pickit-2-pcb-arrival-part-1/)
- [Lunchbeat / PICkit 2 - Programming the PIC18F2550 (Part 2)](/lunchbeat-pickit-2-programming-the-pic18f2550-part-2/)
- [Lunchbeat / PICkit 2 - Update (Part 3)](/lunchbeat-pickit-2-update-part-3/)
- [Lunchbeat / PICkit 2 - LEDs (Part 4)](/lunchbeat-pickit-2-leds-part-4/)
- [Lunchbeat / PICkit 2 - Programming 101 (Part 5)](/lunchbeat-pickit-2-programming-101-part-5/)
- [Lunchbeat / PICkit 2 - Programming 102 (Part 6)](/lunchbeat-pickit-2-programming-102-part-6/)
- [Lunchbeat / PICkit 2 - Sound Demo Ext. Clock (Part 8)](/lunchbeat-pickit-2-sound-demo-ext-clock-part-8/)
- [Lunchbeat / PICkit 2 - Resistor Upgrade (Part 9)](/lunchbeat-pickit-2-resistor-upgrade-part-9/)
