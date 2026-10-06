---
title: "SuperCIC Installation Notes for SNSP-CPU-02 with F413A"
author: "Nix McRetro"
date: 2013-10-20T20:08:36.000+11:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, hacks, nintendo]
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
- 5mm dual-colour LED
- suitable current-limiting resistors for the LED

### Board connections

Locate PPU1, PPU2 and the F413A CIC. Don't mind the red wires leaving my PPU1. They were already there to repair corroded traces near the reset switch.

![](/assets/images/2013/img_0421.jpg)

![](/assets/images/2013/img_0422.jpg)

![](/assets/images/2013/img_0420.jpg)

### F413A CIC

On this installation I left the original F413A on the board and lifted pins 1, 2, 10 and 11 so that they no longer contacted their pads. Wolfsoft's guide describes this as one of two approaches; the other removes the original CIC completely.

![](/assets/images/2013/img_0423.jpg)

### Video mode connections

On this multi-chip board, lift PPU1 pin 24 and PPU2 pin 30 so that both are isolated from their original board connections before wiring them to the SuperCIC.

![](/assets/images/2013/img_0424.jpg)

![](/assets/images/2013/img_0425.jpg)

### PIC placement

I mounted the PIC16F630 over the CPU. It doesn't have blast processing so it shouldn't overheat. ;)

If you are confident your chip has been programmed successfully, consider trimming the legs down. In this example I simply bent them outward slightly. Note the notch on the chip is at the top facing the back of the console.

![](/assets/images/2013/img_0426.jpg)

### Wiring

Check every connection and check for shorts before powering the console. Use Wolfsoft's guide and the SuperCIC documentation for the wiring diagram missing from my original article; these photographs record my installation.

![](/assets/images/2013/img_0427.jpg)

![](/assets/images/2013/img_0428.jpg)

![](/assets/images/2013/img_0429.jpg)

![](/assets/images/2013/img_0430.jpg)

![](/assets/images/2013/img_0431.jpg)

![](/assets/images/2013/img_0432.jpg)

![](/assets/images/2013/img_0433.jpg)

![](/assets/images/2013/img_0434.jpg)

### LED

I chose a 5mm red/green dual-colour LED and had 220 ohm resistors on hand, which worked well. The SuperCIC uses the LED to indicate the selected operating mode.

### Sources

- [SuperCIC - ikari's project page](https://sd2snes.de/blog/cool-stuff/supercic)
- [SuperCIC lock firmware source and pin configuration](https://github.com/mrehkopf/sd2snes/blob/master/cic/supercic/supercic-lock.asm)
- [Wolfsoft - SuperCIC SNES switchless MOD (PAL)](https://web.archive.org/web/20130906130345/http://wolfsoft.de:80/wordpress/?p=603)
- [LED calculator for single LEDs](https://web.archive.org/web/20131016112311/http://led.linear1.org:80/1led.wiz)

### Related posts

- [SNES SuperCIC Switchless Modchip - Installation (Part 1)](/snes-supercic-switchless-modchip-installation-part-1/)
- [SNES SuperCIC Switchless Modchip - The Test (Part 2)](/snes-supercic-switchless-modchip-the-test-part-2/)
- [SNES SuperCIC Switchless Modchip - More Testing (Part 3)](/snes-supercic-switchless-modchip-more-testing-part-3/)
