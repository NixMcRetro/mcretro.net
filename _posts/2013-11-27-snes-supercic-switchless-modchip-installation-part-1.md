---
title: "SNES SuperCIC Switchless Modchip - Installation (Part 1)"
author: "Nix McRetro"
date: 2013-11-27T19:29:01.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="xsNbIkLImV0" %}

Another evening spent attacking perfectly good retro hardware with a soldering iron! This time I've been installing a SuperCIC switchless modchip into one of my Super Nintendo consoles. The idea is to get more control over the console's region and 50 Hz / 60 Hz operation without having to drill holes for a collection of switches.

The project uses a PIC16F630 microcontroller running the console-side SuperCIC firmware. It's a reprogrammable PIC, which is always welcome when I'm experimenting with something that might need a second attempt.

I'd been following the SuperCIC information from ikari and the installation photographs on Wolfsoft. The modifications involved the original CIC circuitry and connections to the two PPU chips, including the relevant video-mode control pins. Nothing particularly complicated on paper, although those tiny chip legs are another matter entirely.

Naturally, I'd decided to do the work rather late at night, with a soldering iron tip that was far too large for the job. A nice fine tip would have made things considerably easier, but apparently I prefer to turn simple tasks into entertainment.

The Super Nintendo motherboard had also been repaired previously, so it wasn't exactly a stranger to my soldering adventures. I managed to get the necessary connections made, although I did discover an unwanted solder bridge along the way. Fortunately I spotted it before trying to power everything up.

The wiring took rather longer than I'd hoped. I was using very fine 30 AWG wire, and of course I'd forgotten my wire strippers. I also ran out of different colours and started reusing them. Good thing I knew which wire went where, or at least I hoped I did!

There was another little worry involving the PIC itself. My programming attempt had reported a configuration verification failure, so I wasn't entirely certain whether the chip would behave properly. I'd already done most of the installation by that point, so there was only one sensible thing to do: finish it and find out.

I wanted a two-colour indicator LED to show which mode the SuperCIC was using. I'd found some red and green LEDs left over from a Mega Drive modification I had planned, which seemed rather appropriate.

Unfortunately, I managed to connect one of them directly to a 5 V supply during testing. It changed colour rather dramatically before burning out. Apparently the LED wasn't quite as enthusiastic about my experimental approach as I was.

With a replacement LED and suitable resistors, the indicator wiring was looking considerably better. By the time I'd finished the main installation it was around one in the morning, and the top of the Super Nintendo was beginning to resemble a packet of Skittles that somebody had dropped onto a circuit board.

At least the connections were all there, and the machine was ready for its first proper tests. The original PAL CIC and the new SuperCIC arrangement gave me plenty to check before I could declare the modification a success.

The installation was completed in this first video, but I hadn't established that every mode worked correctly yet. That would have to wait for the testing videos, when I could finally find out whether all those hours of soldering had been worthwhile.

**Sources**

- [SuperCIC - ikari's project page](https://sd2snes.de/blog/cool-stuff/supercic)

**Related Posts**

- [SuperCIC Installation Notes for SNSP-CPU-02 with F413A](/supercic-installation-notes-snsp-cpu-02-f413a/)
- [SNES SuperCIC Switchless Modchip - The Test (Part 2)](/snes-supercic-switchless-modchip-the-test-part-2/)
