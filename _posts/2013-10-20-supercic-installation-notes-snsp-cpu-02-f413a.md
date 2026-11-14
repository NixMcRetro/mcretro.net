---
title: "SuperCIC Installation Notes for SNSP-CPU-02 with F413A"
author: "Nix McRetro"
date: 2013-10-20T20:08:36.000+11:00
last_modified_at: 2026-10-18
categories: [guides, hacks, nintendo]
share_description: >-
  SuperCIC installation notes for a PAL SNSP-CPU-02 with F413A, including PIC16F630 wiring and photographs. Useful reference, not a complete standalone guide. 🔧
---

These are my SuperCIC installation notes and photographs for an SNSP-CPU-02 board with the PAL F413A CIC. The original article left the PIC programming instructions and circuit diagram as placeholders, so it is not a complete standalone guide. Use Wolfsoft's installation guide and the SuperCIC project documentation linked below alongside these photographs.

**Console serial: UP15971140**

You can find the [full photo gallery](/goodies/). Look for Super Nintendo UP15971140.

The console-side SuperCIC lock uses a programmed PIC16F630 and provides switchless region control, with 50 Hz, 60 Hz and automatic modes.

### Parts I used

- PIC16F630 programmed with the SuperCIC lock firmware
- 30 AWG Kynar wire
- X-Acto knife or fine jeweller's flat-blade screwdriver for lifting pins
- PIC programmer (I used a GQ-4X)
- 5 mm dual-colour LED
- suitable current-limiting resistors for the LED

### Board connections

Locate PPU1, PPU2 and the F413A CIC. Don't mind the red wires leaving my PPU1. They were already there to repair corroded traces near the reset switch.

![Close-up of a Nintendo S-PPU2 chip on a Super Nintendo mainboard, with its fine soldered legs and neighbouring S-PPU1 chip visible.](/assets/images/2013/img_0421.jpg)

*Here's PPU2 on the SNSP-CPU-02 board, one of the chips that needs attention for the SuperCIC video mode wiring.*
{: .media-caption }

![Nintendo S-PPU1 chip on a green Super Nintendo circuit board beside red jumper wires and a black connector.](/assets/images/2013/img_0422.jpg)

*PPU1 and those existing red wires. They were already repairing corroded traces near the reset switch before this SuperCIC adventure.*
{: .media-caption }

![Close-up of a Super Nintendo board's F413A Nintendo CIC chip at U8 beside a larger S-CPU chip and a small electrolytic capacitor.](/assets/images/2013/img_0420.jpg)

*There's the original F413A CIC at U8, before the fun begins with isolating its pins.*
{: .media-caption }

### F413A CIC

On this installation I left the original F413A on the board and lifted pins 1, 2, 10 and 11 so that they no longer contacted their pads. Wolfsoft's guide describes this as one of two approaches; the other removes the original CIC completely.

![Angled close-up of an F413A Nintendo CIC chip beside the S-CPU and metal shielding on a Super Nintendo mainboard.](/assets/images/2013/img_0423.jpg)

*A closer look at that tiny F413A. I left it on the board and isolated the required pins rather than removing the chip entirely.*
{: .media-caption }

### Video mode connections

On this multi-chip board, lift PPU1 pin 24 and PPU2 pin 30 so that both are isolated from their original board connections before wiring them to the SuperCIC.

![Macro photograph of an S-PPU2 chip and its densely spaced pins on a green Super Nintendo circuit board.](/assets/images/2013/img_0424.jpg)

*PPU2 and its rather intimidating row of tiny pins. Pin 30 is the one discussed in the video mode connections.*
{: .media-caption }

![Angled photograph of the Nintendo S-PPU1 chip with a red wire soldered near its legs and a black connector alongside.](/assets/images/2013/img_0425.jpg)

*And here's PPU1 with the red wiring already in place. Tiny pins, steady hands, and no shortage of patience required.*
{: .media-caption }

### PIC placement

I mounted the PIC16F630 over the CPU. It doesn't have blast processing so it shouldn't overheat. ;)

If you are confident your chip has been programmed successfully, consider trimming the legs down. In this example I simply bent them outward slightly. Note the notch on the chip is at the top facing the back of the console.

![PIC16F630 microcontroller with its legs bent outward, positioned over the Super Nintendo CPU chip on the mainboard.](/assets/images/2013/img_0426.jpg)

*The PIC16F630 perched over the CPU. No blast processing here, so I wasn't too worried about it getting hot. ;)*
{: .media-caption }

### Wiring

Check every connection and check for shorts before powering the console. Use Wolfsoft's guide and the SuperCIC documentation for the wiring diagram missing from my original article; these photographs record my installation.

![Super Nintendo mainboard with a PIC microcontroller mounted over the CPU and thin red, blue and yellow wires soldered to nearby components.](/assets/images/2013/img_0427.jpg)

*The SuperCIC wiring is beginning to take shape, with the PIC sitting over the CPU and the first coloured wires in place.*
{: .media-caption }

![Partially rewired Super Nintendo mainboard with a PIC chip over the CPU and coloured jumper wires running to nearby chips.](/assets/images/2013/img_0428.jpg)

*A few more connections added. It's starting to look like the usual tangle of colourful Kynar wire!*
{: .media-caption }

![Close-up of Nintendo S-PPU2 and S-PPU1 chips with thin green and yellow wires soldered to pins on a Super Nintendo mainboard.](/assets/images/2013/img_0429.jpg)

*The new video mode connections running to PPU1 and PPU2. Best not to confuse those pins halfway through soldering.*
{: .media-caption }

![](/assets/images/2013/10/supercic-f413a-installation.jxl)

![Close-up of the SNES mainboard showing the S-WRAM chip, two Nintendo picture-processing chips and coloured wires connected to the PIC assembly.](/assets/images/2013/img_0431.jpg)

*Another angle on the wiring, this time showing the RAM and the connections leading towards the PIC.*
{: .media-caption }

![Overhead view of a Super Nintendo mainboard with a PIC microcontroller and a network of red, green, blue, purple and yellow wires across its chips.](/assets/images/2013/img_0432.jpg)

*A wider look at the installation. Plenty of coloured wires, but at least the layout is easier to see from above.*
{: .media-caption }

![Angled close-up of a PIC microcontroller mounted over the CPU on a Super Nintendo board, surrounded by many thin coloured wires.](/assets/images/2013/img_0433.jpg)

*One last angled look at that PIC wiring. It certainly doesn't look factory-fitted, but that's half the charm of these projects.*
{: .media-caption }

![Overhead photograph of a wired Super Nintendo mainboard showing the PIC chip, both PPU chips and multiple coloured jumper wires.](/assets/images/2013/img_0434.jpg)

*The completed-looking wiring layout from above. I'd still check every joint and look for shorts before powering it up.*
{: .media-caption }

### LED

I chose a 5 mm red/green dual-colour LED and had 220 ohm resistors on hand, which worked well. The SuperCIC uses the LED to indicate the selected operating mode.

### Sources

- [SuperCIC - ikari's project page](https://sd2snes.de/blog/cool-stuff/supercic)
- [SuperCIC lock firmware source and pin configuration](https://github.com/mrehkopf/sd2snes/blob/master/cic/supercic/supercic-lock.asm)
- [Wolfsoft - SuperCIC SNES switchless MOD (PAL)](https://web.archive.org/web/20130906130345/http://wolfsoft.de:80/wordpress/?p=603)
- [LED calculator for single LEDs](https://web.archive.org/web/20131016112311/http://led.linear1.org:80/1led.wiz)

### Related Posts

- [SNES SuperCIC Switchless Modchip - Installation (Part 1)](/snes-supercic-switchless-modchip-installation-part-1/)
- [SNES SuperCIC Switchless Modchip - The Test (Part 2)](/snes-supercic-switchless-modchip-the-test-part-2/)
- [SNES SuperCIC Switchless Modchip - More Testing (Part 3)](/snes-supercic-switchless-modchip-more-testing-part-3/)
