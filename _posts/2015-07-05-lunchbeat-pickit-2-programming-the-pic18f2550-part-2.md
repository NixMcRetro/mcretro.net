---
title: "Lunchbeat / PICkit 2 - Programming the PIC18F2550 (Part 2)"
author: "Nix McRetro"
date: 2015-07-05T21:10:03.000+10:00
last_modified_at: 2026-10-18
categories: [programming, youtube]
---

{% include youtube.html id="PhpF1AXMBZg" %}

This time I'm programming the PIC18F2550 that forms the heart of the PICkit 2 programmer. That's separate from the AVR microcontroller in the Lunchbeat itself, which is another adventure entirely!

I've managed to get quite a few components installed on the boards, although I'm still waiting for some more parts to arrive. I also managed to order the wrong number of transistors. Whoops! Apparently counting the things you need before placing an order is a useful skill.

The good news is that the PIC18F2550 fits straight into my GQ-4X programmer. I'd been expecting to run wires from the socket to the chip legs, but there's no need for any of that nonsense. It just fits. Fantastic!

I've loaded the firmware into the programming software and let the GQ-4X do its thing. The VCC and VPP indicators are hard at work, and after a bit of waiting the chip is programmed. Nice and easy! That's one more piece of the PICkit 2 build sorted out.

There are still some resistors and capacitors to arrive, including the 2.7 kΩ resistors I'm waiting on. Once everything is assembled, the bonus challenge is still to use the PICkit 2 with AVRDUDE to program the Atmel chip in the Lunchbeat... just for kicks... in OS X!

### Sources

- [Microchip - PICkit 2 Programmer/Debugger User's Guide](https://www.microchip.com/content/dam/mchp/documents/OTH/ProductDocuments/UserGuides/51553E.pdf)
- [AVRDUDE - Version 6.0 Manual (2013)](https://download-mirror.savannah.gnu.org/releases/avrdude/avrdude-doc-6.0.1.pdf)

### Related Posts

- [Lunchbeat / PICkit 2 - PCB Arrival (Part 1)](/lunchbeat-pickit-2-pcb-arrival-part-1/)
- [Lunchbeat / PICkit 2 - Update (Part 3)](/lunchbeat-pickit-2-update-part-3/)
- [Lunchbeat / PICkit 2 - LEDs (Part 4)](/lunchbeat-pickit-2-leds-part-4/)
- [Lunchbeat / PICkit 2 - Programming 101 (Part 5)](/lunchbeat-pickit-2-programming-101-part-5/)
- [Lunchbeat / PICkit 2 - Programming 102 (Part 6)](/lunchbeat-pickit-2-programming-102-part-6/)
- [Lunchbeat / PICkit 2 - Sound Demo Int. Clock (Part 7)](/lunchbeat-pickit-2-sound-demo-int-clock-part-7/)
- [Lunchbeat / PICkit 2 - Sound Demo Ext. Clock (Part 8)](/lunchbeat-pickit-2-sound-demo-ext-clock-part-8/)
- [Lunchbeat / PICkit 2 - Resistor Upgrade (Part 9)](/lunchbeat-pickit-2-resistor-upgrade-part-9/)
