---
title: "Lunchbeat / PICkit 2 - LEDs (Part 4)"
author: "Nix McRetro"
date: 2015-08-23T21:12:37.000+10:00
last_modified_at: 2026-10-18
categories: [programming, youtube]
---

{% include youtube.html id="EoG5tyq1vC0" %}

Well, something seems to work: we have lights and buttons! There are still some missing bits, so the build is not finished yet. Hopefully the rest of the parts turn up soon.

The PICkit 2 clone is looking a little more complete now that I've fitted the LEDs. There's a rather beautiful green one, an amber-looking yellow and a reasonably respectable red. Unfortunately, I also discovered I'd installed a 2N7000 transistor where a BS250P was supposed to go at Q1. Wonderful. At least the correct replacement has arrived.

The remaining components are still coming in, including some capacitors, resistors and the right-angled headers. I'd quite like to get the PICkit working properly because the Lunchbeat is waiting for its programming hardware too. Building two projects at once seemed like a brilliant idea at the time!

Over on the Lunchbeat, I've been experimenting with LED colours. The power indicator is green, while I've been trying blue and white for the sequencer lights. I originally considered using nothing but blue LEDs, although that was perhaps a little much even for me.

During the first power tests, one of the LEDs was so bright that it was practically like staring into the sun. I had to experiment with different resistor values to get things looking more reasonable. Eventually I settled on 470 ohm resistors for several of the LEDs, which gave me a much nicer result.

Once the resistors and LEDs were in, I was finally able to get the board responding to button presses. The prototype firmware was still on the ATmega328P, so the controls weren't behaving in quite the right order. Some LEDs were lighting up when I pressed the wrong buttons, but they were lighting up!

The playback and step-edit modes were also doing something useful, although I wasn't getting any sound out of the board during these tests. That's probably asking a bit much when I'm still waiting for parts and haven't got the correct firmware programmed yet.

For now, I'm rather pleased with the little light show. There is still work to do on the programming side, but the Lunchbeat is gradually turning into something that resembles a finished instrument. Progress, but at what cost? Mostly LEDs and a surprising number of resistors!

### Lunchbeat / PICkit 2 series

- [Lunchbeat / PICkit 2 - PCB Arrival (Part 1)](/lunchbeat-pickit-2-pcb-arrival-part-1/)
- [Lunchbeat / PICkit 2 - Programming the PIC18F2550 (Part 2)](/lunchbeat-pickit-2-programming-the-pic18f2550-part-2/)
- [Lunchbeat / PICkit 2 - Update (Part 3)](/lunchbeat-pickit-2-update-part-3/)
- [Lunchbeat / PICkit 2 - Programming 101 (Part 5)](/lunchbeat-pickit-2-programming-101-part-5/)
- [Lunchbeat / PICkit 2 - Programming 102 (Part 6)](/lunchbeat-pickit-2-programming-102-part-6/)
- [Lunchbeat / PICkit 2 - Sound Demo Int. Clock (Part 7)](/lunchbeat-pickit-2-sound-demo-int-clock-part-7/)
- [Lunchbeat / PICkit 2 - Sound Demo Ext. Clock (Part 8)](/lunchbeat-pickit-2-sound-demo-ext-clock-part-8/)
- [Lunchbeat / PICkit 2 - Resistor Upgrade (Part 9)](/lunchbeat-pickit-2-resistor-upgrade-part-9/)
