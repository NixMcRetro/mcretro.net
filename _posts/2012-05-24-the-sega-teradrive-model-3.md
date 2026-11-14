---
title: "The Sega TeraDrive Model 3"
author: "Nix McRetro"
date: 2012-05-24T12:25:50.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega]
share_description: >-
  A Sega TeraDrive Model 3 arrives without its 30 MB hard drive. Windows runs from floppy, but finding a compatible replacement for that unusual 44-pin interface is another matter. 💾
---

![Front of a black Sega TeraDrive with a 3.5-inch floppy drive, volume control, headphones socket and orange power switch.](/assets/images/2012/img_0133.jpg)

*The Model 3 finally gets its turn on the bench. Floppy drive up front, but the missing hard drive is another matter.*
{: .media-caption }

![Rear of a Sega TeraDrive Model 3 showing its expansion opening, audio and video RCA sockets, RGB port, serial and printer connectors.](/assets/images/2012/img_0134.jpg)

*Around the back are the composite video, stereo audio, and RGB connections. Plenty of sockets, but still no hard drive.*
{: .media-caption }

![Close-up of a Sega TeraDrive Model 3 HTR-2002 label showing an AC 100 V, 27 W, 50/60 Hz rating and a serial number.](/assets/images/2012/img_0132.jpg)

*The HTR-2002 label confirms the Model 3 and its 100 V power rating. A handy reminder that this is Japanese hardware.*
{: .media-caption }

Finally got a chance to test the Sega TeraDrive Model 3 that arrived a few days ago. Sega sold the Model 3 as the top configuration, with 2.5 MB of RAM, one 3.5-inch floppy drive and a 30 MB internal hard drive. Mine arrived without its hard drive, but thankfully the original cable, screws and hard-drive sled are still present. It boots Windows 3.11 from floppy just like my Model 2.

![Interior of the Sega TeraDrive showing a long black expansion connector, a smaller ribbon-cable connector and a grey ribbon cable above its motherboard.](/assets/images/2012/img_0136.jpg)

*Under the lid are the expansion connectors and ribbon cable. The next job is figuring out what hard drive this machine actually wants.*
{: .media-caption }

![Open Sega TeraDrive with a green SEGA motherboard, yellow circuit wiring, ribbon cables, and the front drive assembly visible.](/assets/images/2012/img_0135.jpg)

*Here's the mainboard with the lid off. The yellow wiring is definitely easier on the eyes than the green stuff in my Model 2.*
{: .media-caption }

![Overhead view of an opened Sega TeraDrive Model 3 showing its SEGA circuit board, power supply, floppy drive and ribbon cables.](/assets/images/2012/img_0137.jpg)

*The entire interior of the Model 3, minus its original hard drive. At least the cables and mounting pieces are still here.*
{: .media-caption }

The next problem is working out exactly what sort of replacement hard drive the TeraDrive wants. The connector has 44 pins, but it isn't standard laptop IDE. I've been digging through information on early IBM PS/2 Model 25 and Model 30 hard drives, which use a similarly unusual arrangement. Some older references call these drives XT IDE or XTA, while the storage design is more accurately described as a proprietary direct-bus-attachment interface.

![Close-up of a Sega TeraDrive circuit board showing a large black chip, smaller integrated circuits and several bright yellow wires.](/assets/images/2012/img_0138.jpg)

*A closer look at one of the Model 3's chips and that bright yellow wiring. Not a hard-drive breakthrough, but it caught my eye.*
{: .media-caption }

![Angled view inside a Sega TeraDrive showing yellow wires crossing the green SEGA motherboard beside several integrated circuits and a ribbon cable.](/assets/images/2012/img_0140.jpg)

*The yellow wiring winds all over the board. Apparently even trace routing can have a cosmetic upgrade!*
{: .media-caption }

![Close-up of a Sega TeraDrive board with yellow wires routed between Mitsubishi memory chips and a nearby AMD N80L286 processor.](/assets/images/2012/img_0139.jpg)

*More yellow wires running between the chips, beside the AMD 286. The Model 3 wins my entirely unofficial wiring beauty contest.*
{: .media-caption }

I'm still waiting on the ISA IDE controller card from the UK for the Model 2. In the meantime, I need to find a compatible drive to get the Model 3 back to its proper configuration.

Another thing I noticed is that the trace wiring on the Model 3 travels to slightly different locations from my Model 2. The Model 3 also has much nicer-looking yellow wiring, while the Model 2 uses mostly green. Not exactly the most important engineering discovery of the century, but there it is!

Time to get a hard drive installed and see how far this one can go. Many more images can be found in the [photo gallery](/goodies) filed under Sega TeraDrive Model 2 and Model 3.

### Sources

- [Sega Hardware Archive: TeraDrive (Model 3 Specifications)](https://www.sega.jp/fb/segahard/md/tera.html)
- [IBM Files: PS/2 Model 25/30 (Proprietary Hard Drive Interface)](https://www.ibmfiles.com/pages/ps2model25.htm)

### Related Posts

- [Sega TeraDrive Model 3 Hard Drive Replacement](/sega-teradrive-model-3-hard-drive-replacement/)
- [Sega TeraDrive Hard Drive Interface Investigation](/sega-teradrive-hard-drive-interface-investigation/)
