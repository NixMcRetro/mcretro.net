---
title: "SNES SuperCIC Switchless Modchip - Installation (Part 1)"
author: "Nix McRetro"
date: 2013-11-27T19:29:01.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, nintendo, youtube]
share_description: >-
  A SuperCIC switchless mod goes into a PAL Super Nintendo with a PIC16F630, lifted CIC pins and tiny PPU connections. Solder bridges keep things interesting. 🔧
---

{% include youtube.html id="xsNbIkLImV0" %}

Another evening spent attacking perfectly good retro hardware with a soldering iron! This time I've been installing a SuperCIC switchless modchip into one of my Super Nintendo consoles. The idea is to give me control over the console's region and 50 Hz / 60 Hz operation without drilling a collection of extra switches into the case.

I'm using a PIC16F630 microcontroller for the SuperCIC firmware, which is reprogrammable and therefore quite handy when you're experimenting. I'd been following the information from ikari and the installation photographs on Wolfsoft, trying to work out how best to route everything around the motherboard.

The first stage involved lifting the relevant CIC connections, including pins 1, 2, 10 and 11, and making the video-mode connections to the two PPU chips. Pins 24 and 30 came into the discussion here, although I even managed to get myself muddled over which PPU I was referring to while talking through the work. Better double-check those diagrams!

Naturally, I'd chosen to attempt all this rather late at night, using a soldering iron tip that was far too large for the job. A nice fine pencil tip would have made life considerably easier, but apparently I'd rather make a challenge out of something that was already fiddly enough.

This particular Super Nintendo had seen some repair work before, so the motherboard wasn't exactly unfamiliar with my soldering iron. I managed to get the PPU connections made, although I did discover an unwanted solder bridge between a couple of pins. Fortunately I spotted it before powering anything up. That could have made the evening considerably more interesting!

The wiring took rather longer than I'd expected. I was using very fine 30 AWG wire and, of course, had forgotten to bring my wire strippers. At one point I resorted to stripping it with my teeth. It was around half past eleven on a Sunday night and I was beginning to suspect the sun might be up before I finished.

I also ran out of different wire colours, so some of them ended up being used more than once. That made following the wiring rather entertaining, although at least I could compare everything with the diagrams and photographs as I went.

There was another small concern involving the PIC itself. The programming process had given me a configuration verification failure, and I wasn't entirely sure what that meant for the finished installation. Given how much wiring I'd already done, I decided to carry on and find out whether it would actually work.

I wanted a red and green indicator LED to show the SuperCIC's operating mode. Fortunately I'd found some three-legged LEDs left over from a Mega Drive modification I'd been planning. Funny how I ended up using parts intended for a Sega project to modify a Nintendo!

Unfortunately, I managed to connect one of the LEDs straight to a 5 V supply while testing it. It turned a rather exciting orange colour and then burnt out. That's one less LED in the world! Luckily I had plenty more, so I could get on with fitting another one.

The first resistors I found were around 300 Ohms, which seemed a little higher than I wanted. Just when I thought I'd have to make do with those, I discovered some 220 Ohm resistors among my parts. Perfect! I'd probably bought them for that Mega Drive modification in the first place.

By the time the indicator was wired into the Super Nintendo controller-port area, it was around one in the morning. Everything was starting to look like somebody had dropped a packet of Skittles onto the motherboard. Actually, a packet of Skittles would have been rather nice by that point.

With the main wiring finished and the indicator fitted, I could finally move on to testing the console. The original PAL CIC arrangement had been modified, so I wanted to begin by checking that the machine could still run the PAL games it was supposed to.

The installation itself was finished in this first video, but I still had plenty of testing ahead before I could celebrate. After all those hours of soldering, and the occasional small fire, I was rather keen to discover whether the SuperCIC was going to cooperate!

**Sources**

- [SuperCIC - ikari's project page](https://sd2snes.de/blog/cool-stuff/supercic)

**Related Posts**

- [SuperCIC Installation Notes for SNSP-CPU-02 with F413A](/supercic-installation-notes-snsp-cpu-02-f413a/)
- [SNES SuperCIC Switchless Modchip - The Test (Part 2)](/snes-supercic-switchless-modchip-the-test-part-2/)
