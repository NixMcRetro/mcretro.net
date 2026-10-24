---
title: "Lunchbeat / PICkit 2 - Programming 101 (Part 5)"
author: "Nix McRetro"
date: 2015-09-09T21:15:35.000+10:00
last_modified_at: 2026-10-18
categories: [programming, youtube]
---

{% include youtube.html id="yLU5i_mNRek" %}

More programming under OS X! Well, something seems to work: we have lights and buttons! Some of the bits are still missing, so hopefully they'll turn up soon.

I've been working on the Lunchbeat and PICkit 2 projects together because the idea is to use the programmer to work with the Atmel chip in the Lunchbeat. The remaining inductor for the PICkit and some potentiometers for the Lunchbeat have finally arrived. That's another couple of components crossed off the list.

The Lunchbeat was previously working with some firmware on the breadboard, although I've since managed to misplace the HEX file. Naturally. I'll have to compile it again, which means getting the programming arrangement sorted out first. What could possibly go wrong?

I've wired the Lunchbeat's AVR ISP header over to the PICkit and have been experimenting with software to make the two cooperate. The useful discovery was `PK2AVRISP`, which lets the PICkit hardware communicate with AVR programming software. I've also been trying AVRDUDE and a graphical front end, since staring at command-line options all afternoon isn't my idea of fun.

Getting the ATmega328P detected was an adventure in itself. The reset button turned out to be important, and holding it down while attempting detection finally produced a successful chip identification. That's progress! Unfortunately, recognising a chip and successfully programming it are two rather different achievements.

I also ran into trouble with the PICkit's programming voltage. One of the PIC chips wasn't receiving quite enough voltage from the programmer, so I tried feeding it an external 5 V supply from USB. That made a difference, and I was finally able to erase a chip and verify that it was blank rather than merely trusting the software's cheerful messages.

Of course, I'd also managed to upset one of the PICkits while attempting a firmware upgrade. Fortunately, I still had another working unit, and was able to reprogram the troublesome one. At least something came back to life during this experiment!

With the programmer behaving a little better, I returned to the Lunchbeat. The ATmega328P could be detected, but getting the firmware compiled and reliably written was still causing problems. The LEDs were doing some interesting things, although not necessarily the things I wanted them to do.

So we've made progress, even if the Lunchbeat isn't quite ready to start making music again. I've learned rather more about PIC and AVR programming than I originally intended, and there's still plenty of experimenting ahead. Those right-angled headers would be nice too, whenever they decide to turn up.

### Lunchbeat / PICkit 2 series

- [Lunchbeat / PICkit 2 - PCB Arrival (Part 1)](/lunchbeat-pickit-2-pcb-arrival-part-1/)
- [Lunchbeat / PICkit 2 - Programming the PIC18F2550 (Part 2)](/lunchbeat-pickit-2-programming-the-pic18f2550-part-2/)
- [Lunchbeat / PICkit 2 - Update (Part 3)](/lunchbeat-pickit-2-update-part-3/)
- [Lunchbeat / PICkit 2 - LEDs (Part 4)](/lunchbeat-pickit-2-leds-part-4/)
- [Lunchbeat / PICkit 2 - Programming 102 (Part 6)](/lunchbeat-pickit-2-programming-102-part-6/)
- [Lunchbeat / PICkit 2 - Sound Demo Int. Clock (Part 7)](/lunchbeat-pickit-2-sound-demo-int-clock-part-7/)
- [Lunchbeat / PICkit 2 - Sound Demo Ext. Clock (Part 8)](/lunchbeat-pickit-2-sound-demo-ext-clock-part-8/)
- [Lunchbeat / PICkit 2 - Resistor Upgrade (Part 9)](/lunchbeat-pickit-2-resistor-upgrade-part-9/)
