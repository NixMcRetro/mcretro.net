---
title: "PIC12F629 Blinking LED Test and McCain Pizza Pockets"
author: "Nix McRetro"
date: 2013-11-25T19:22:44.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, programming, sony]
share_description: >-
  A PIC12F629 happily blinks a two-colour LED from a Nokia charger, but still refuses to verify the PlayStation modchip firmware. Also, McCain Pizza Pockets. 💡
---

{% include youtube.html id="Yg8A5agB0j4" %}

Not sure why my GQ-4X is reporting a configuration failure when I try programming PIC12F629s for PS1 modchips. The funny thing is that I can program one with a simple LED-blinking test without any trouble, and it blinks away quite happily. So why won't the modchip programming work? One mystery at a time!

I've put together a little test rig using a 5 V Nokia charger, a 220-ohm resistor, a two-colour LED and a switch. The charger is centre-positive, with the positive supply going to pin 1 of the PIC12F629 and ground to pin 8. The switch lets me choose which colour of the LED lights up, while the chip does the blinking.

There's a little program on the PIC that switches its output on and off every second or so. Don't forget the resistor, unless you fancy burning out your LED! I used 220 ohms, but something a little higher will do the job too, with a slightly dimmer result. A suitable 5 V USB supply could also power the arrangement.

Naturally, the one thing I couldn't find was a dark room to test it in, so I stuck the whole thing inside a kitchen utensil holder instead. The LED blinks away nicely, and flicking the switch changes the colour. Excellent! Might even put together a little guide so you can try the test yourself.

The PIC12F629 is Flash-based and reprogrammable, which is rather handy when you're experimenting. Unfortunately, somewhere in the middle of all this I got distracted by McCain Pizza Pockets. That advert has been stuck in my head for about twenty years, and apparently it's not going anywhere!

Here's the result, with some 1990s nostalgia and lunch thrown in. At least I know I can program a PIC12F629 to blink an LED. Now I just need to sort out that annoying PS1 modchip configuration failure!

### Sources

- [Microchip - PIC12F629/675 Data Sheet](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/DataSheets/41190G.pdf)

### Related Posts

- [Sony PlayStation 1 Modchip Installation Success on SCPH-9002](/sony-playstation-1-modchip-installation-success-on-scph-9002/)
- [Sony PlayStation 1 Modchip Installation on SCPH-9002 Update](/sony-playstation-1-modchip-installation-on-scph-9002-update/)
