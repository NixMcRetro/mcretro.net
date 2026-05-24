---
title: "Disabling F413A and Installing SuperCIC onto an SNSP-CPU-02 Board"
author: "Nix McRetro"
date: 2013-10-20T20:08:36.000+11:00
categories: [guides, hacks, nintendo]
---

This article details how to install the SuperCIC for switchless region free gaming. You can find the full photo gallery [here](/goodies/). Look for Super Nintendo UP15971140.

* * *

**Preliminary notes:** You'll need a few things to get this up and running. PIC16F630 chip - Pretty important as this becomes the SuperCIC chip. SuperCIC code - Download here Wire - I used Kynar 30AWG, you could use thicker if you wanted to. X-Acto-knife or fine jewellers flat-blade EEPROM Programmer - I used a GQ-4X, many others can be used though. 5mm Dual colour LED - I picked green and red, other colours will work OK Resistors to match your LEDs - I had 220 ohm resistors on hand and they worked well

* * *

**STEP 1:** Make sure you have a programmed PIC16F630. Here's how to program one first;

**PROGRAM PIC INFORMATION GOES HERE.**

* * *

**STEP 2:** Locate the three chips we'll be tapping into - PPU1, PPU2 and the CIC. Don't mind the red wires leaving my PPU1, they were to fix some corroded traces near the reset switch.

![](/assets/images/2013/img_0421.jpg)

![](/assets/images/2013/img_0422.jpg)

![](/assets/images/2013/img_0420.jpg)

* * *

**STEP 3:** Lift legs 1, 2, 10 and 11 on the CIC (F413A in my case) so that they are no longer touching the pads on the mainboard. Best off using either an X-Acto-knife or a very fine jewellers flat-blade screwdriver.

![](/assets/images/2013/img_0423.jpg)

* * *

**STEP 4:** Move on over to your PPUs and lift pin 24 on PPU1 and lift pin 30 on PPU2.

![](/assets/images/2013/img_0424.jpg)

![](/assets/images/2013/img_0425.jpg)

* * *

**STEP 5:** Next find a good place to position the SuperCIC chip. On top of the CPU seems a good place. It doesn't have blast processing so it shouldn't overheat ;)

If you are confident your chip has been written successfully, consider trimming the legs down. In this example I simply bent them outward slightly.

Note the notch on the chip is at the top facing the back of the console.

![](/assets/images/2013/img_0426.jpg)

* * *

**STEP 6:** Start wiring in all your wires, making sure there are no short circuits.

**CIRCUIT DIAGRAM GOES HERE**

![](/assets/images/2013/img_0427.jpg)

![](/assets/images/2013/img_0428.jpg)

![](/assets/images/2013/img_0429.jpg)

![](/assets/images/2013/img_0430.jpg)

![](/assets/images/2013/img_0431.jpg)

![](/assets/images/2013/img_0432.jpg)

![](/assets/images/2013/img_0433.jpg)

![](/assets/images/2013/img_0434.jpg)

* * *

**STEP 7:** Wire up your dual colour 5mm LED with resistors.

**Sources:** [Original Guide](http://wolfsoft.de/wordpress/?p=603) [LED Resistor Calculator](https://web.archive.org/web/20201105231827/http://led.linear1.org/1led.wiz)
