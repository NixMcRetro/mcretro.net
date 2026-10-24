---
title: "Lunchbeat / PICkit 2 - Resistor Upgrade (Part 9)"
author: "Nix McRetro"
date: 2015-12-06T01:11:42.000+11:00
last_modified_at: 2026-10-18
categories: [programming, youtube]
---

{% include youtube.html id="hJ1wHtEFg7E" %}

We finally reach the end of the Lunchbeat saga! The final tweak is changing the LED series resistors in my build from 470 ohms to 10 kOhms because the LEDs I picked were far too bright. Increasing the resistance cuts the LED current substantially, which is exactly what I wanted here.

I've also changed my mind about the colours. The original arrangement had alternating blue and white LEDs, but I've decided to go with red indicators instead. There's an orange one for the play/stop button, while the power indicator remains green, although I downsized that one from a 5 mm LED to a 3 mm LED.

After removing the old components and fitting the replacements, the board was looking much more civilised. The battery holder doesn't quite match the markings on the PCB, and I still haven't fitted a proper power switch. I've temporarily bridged the switch connection with a capacitor leg. Not exactly a beautiful finishing touch, but there you go!

With the hardware back together, it was time for a demonstration. Naturally, the first attempt didn't produce the sound I expected. I started blaming the wrong connection, then the volume, before discovering that the audio cable itself was playing up. A dodgy cable! At least that was an easy problem to identify.

Once the cable behaved itself, the Lunchbeat made all sorts of wonderful electronic noises. Each control produces different sounds, and the little adjustment pots let me fiddle with how those sounds behave. Some are rather short and percussive, while others keep going for longer than you might expect.

The built-in sequencer is where things get particularly interesting. You can move through the steps with the step-edit control and decide which sounds should play at each position. The LEDs give a visual indication of what's enabled, so it's possible to build up a little rhythm one step at a time.

Of course, it's also possible to make something that sounds like a Geiger counter having a particularly bad day. That's half the fun of a little machine like this. I've been through quite a few adventures getting it programmed and assembled, but now I've actually got a functioning 1-bit groovebox making noises on the bench.

There were moments during the programming work when I genuinely wondered whether I'd ever get the project finished. Working with the Atmel hardware and getting the programming tools behaving under macOS took a fair bit of persistence. I learned quite a lot along the way, and the end result is a rather delightful little techno dance machine.

### Lunchbeat / PICkit 2 series

- [Lunchbeat / PICkit 2 - PCB Arrival (Part 1)](/lunchbeat-pickit-2-pcb-arrival-part-1/)
- [Lunchbeat / PICkit 2 - Programming the PIC18F2550 (Part 2)](/lunchbeat-pickit-2-programming-the-pic18f2550-part-2/)
- [Lunchbeat / PICkit 2 - Update (Part 3)](/lunchbeat-pickit-2-update-part-3/)
- [Lunchbeat / PICkit 2 - LEDs (Part 4)](/lunchbeat-pickit-2-leds-part-4/)
- [Lunchbeat / PICkit 2 - Programming 101 (Part 5)](/lunchbeat-pickit-2-programming-101-part-5/)
- [Lunchbeat / PICkit 2 - Programming 102 (Part 6)](/lunchbeat-pickit-2-programming-102-part-6/)
- [Lunchbeat / PICkit 2 - Sound Demo Int. Clock (Part 7)](/lunchbeat-pickit-2-sound-demo-int-clock-part-7/)
- [Lunchbeat / PICkit 2 - Sound Demo Ext. Clock (Part 8)](/lunchbeat-pickit-2-sound-demo-ext-clock-part-8/)
