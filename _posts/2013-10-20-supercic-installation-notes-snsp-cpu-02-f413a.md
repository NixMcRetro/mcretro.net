---
title: "SuperCIC Installation Notes for SNSP-CPU-02 with F413A"
author: "Nix McRetro"
date: 2013-10-20T20:08:36.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, hacks, nintendo]
---

This article started life as a full SuperCIC installation guide for an SNSP-CPU-02 board using the PAL F413A CIC.

It never actually became a complete guide.

The programming section and full wiring diagram were left as placeholders, so it is safer to preserve this as **installation notes and photographs from my build** rather than pretend it is a standalone set of instructions.

**Console serial: UP15971140**

You can find the full photo gallery [here](/goodies/). Look for Super Nintendo UP15971140.

The SuperCIC console lock uses a programmed PIC16F630 and provides switchless region control, including 50 Hz, 60 Hz and automatic region behaviour.

For the complete firmware and wiring information, use the original SuperCIC documentation linked below alongside these photographs.

### Parts I used

- PIC16F630 programmed with the SuperCIC lock firmware
- 30 AWG Kynar wire
- fine knife or jeweller's screwdriver for lifting pins
- PIC programmer
- dual-colour LED
- suitable current-limiting resistors for the LED

I used 220 ohm resistors with my red/green LED.

### Board connections

Locate PPU1, PPU2 and the F413A CIC.

Don't mind the red wires leaving my PPU1. They were already there to repair corroded traces near the reset switch.

![](/assets/images/2013/img_0421.jpg)

![](/assets/images/2013/img_0422.jpg)

![](/assets/images/2013/img_0420.jpg)

### F413A CIC

On this installation I left the original F413A on the board and lifted pins 1, 2, 10 and 11 so that they no longer contacted their pads.

The original SuperCIC documentation describes this as one of two approaches. The other removes the original CIC completely.

![](/assets/images/2013/img_0423.jpg)

### Video mode connections

PPU1 pin 24 and PPU2 pin 30 are the relevant 50/60 Hz control connections on this multi-chip board.

Both need to be isolated from their original board connections before being connected according to the SuperCIC wiring.

![](/assets/images/2013/img_0424.jpg)

![](/assets/images/2013/img_0425.jpg)

### PIC placement

I mounted the PIC16F630 over the CPU.

It doesn't have blast processing so it shouldn't overheat. ;)

If you already know the PIC has programmed successfully, trimming or bending the legs can make the finished wiring considerably neater.

Note the notch on the chip is at the top facing the back of the console.

![](/assets/images/2013/img_0426.jpg)

### Wiring

My original article was supposed to contain a complete circuit diagram here.

It never did.

Rather than recreate one from memory, use the original SuperCIC documentation below and treat these photographs as a record of my SNSP-CPU-02 installation.

Check every connection and check for shorts before powering the console.

![](/assets/images/2013/img_0427.jpg)

![](/assets/images/2013/img_0428.jpg)

![](/assets/images/2013/img_0429.jpg)

![](/assets/images/2013/img_0430.jpg)

![](/assets/images/2013/img_0431.jpg)

![](/assets/images/2013/img_0432.jpg)

![](/assets/images/2013/img_0433.jpg)

![](/assets/images/2013/img_0434.jpg)

### LED

I finished the installation with a red/green dual-colour LED and 220 ohm resistors.

The SuperCIC uses the LED to indicate the selected operating mode.

### Related posts

- [SNES SuperCIC Switchless Modchip - Installation (Part 1)](/snes-supercic-switchless-modchip-installation-part-1/)
- [SNES SuperCIC Switchless Modchip - The Test (Part 2)](/snes-supercic-switchless-modchip-the-test-part-2/)
- [SNES SuperCIC Switchless Modchip - More Testing (Part 3)](/snes-supercic-switchless-modchip-more-testing-part-3/)

### Sources

- [SuperCIC Lock Firmware and Documentation](https://sd2snes.de/blog/cool-stuff/supercic)
- [NesDev Forums - SuperCIC development discussion](https://forums.nesdev.org/viewtopic.php?p=60545)
- [Wolfsoft - Original SuperCIC guide](http://wolfsoft.de/wordpress/?p=603)
- [Archived LED Resistor Calculator](https://web.archive.org/web/20201105231827/http://led.linear1.org/1led.wiz)
