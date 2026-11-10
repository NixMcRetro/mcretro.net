---
title: "Amstrad Sega Mega PC Repair"
author: "Nix McRetro"
date: 2012-03-18T09:33:45.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs, sega]
---

![Amstrad Mega PC motherboard with a blue NiCad battery and blue-green deposits across nearby circuitry.](/assets/images/2012/img_0017.jpg)

*Amstrad Mega PC motherboard with a blue NiCad battery and blue-green deposits across nearby circuitry.*
{: .media-caption }

![Close-up of blue-green corrosion around the Mega PC's battery, nearby chips and circuit board tracks.](/assets/images/2012/img_0018.jpg)

*The NiCad battery left a rather impressive blue mess behind. The motherboard was less impressed.*
{: .media-caption }

![Close-up of two black diodes, nearby chips and scattered blue corrosion on the motherboard.](/assets/images/2012/img_0019.jpg)

*Those copper tracks are not going to be happy!*
{: .media-caption }

![Empty battery footprint with blue residue near two black diodes and exposed copper tracks.](/assets/images/2012/img_0020.jpg)

*Well at least the battery disappeared from the board easily enough.*
{: .media-caption }

Such a wonderful shade of blue. Unfortunately it has eaten the tracks on the motherboard. That's the damage a leaking NiCad battery can do. The electrolyte is alkaline potassium hydroxide rather than acid, but it can still make an impressive mess of a motherboard.

![Discoloured copper trace beneath the floppy-drive connector on the Mega PC motherboard.](/assets/images/2012/img_0022.jpg)

*I don't like the way the vias near the floppy drive have bright blue in them...*
{: .media-caption }

![Wider view of the motherboard showing the empty battery footprint, exposed copper and floppy-drive headers.](/assets/images/2012/img_0021.jpg)

*Or the way the copper tracks are now exposed and no longer shielded.*
{: .media-caption }

![Underside of the Mega PC motherboard showing discoloured tracks, vias and rows of solder joints.](/assets/images/2012/img_0023.jpg)

*Just as messy, if not worse on the underside.*
{: .media-caption }

I cleaned everything up as best I could with some isopropyl alcohol, then mapped out the damage. The alcohol cleaned the surface, although it wasn't chemically neutralising the alkaline electrolyte. Multimeter time.

![Annotated underside of the Mega PC motherboard, with coloured lines tracing connections around the damaged area.](/assets/images/2012/img_0015.jpg)

*I mapped the affected tracks on the underside...*
{: .media-caption }

![Annotated component side of the Mega PC motherboard, with red and green lines tracing connections near the former battery.](/assets/images/2012/img_0016.jpg)

*...and on the topside before the soldering started.*
{: .media-caption }

From the maps above it looked as though most of the damage affected at least one of the serial ports. Serial? Pffft, I have PS/2 connectors.

Unfortunately, one of the main power tracks from the power connector was damaged as well. I handed the board over to a guy with a red shirt and he did some soldering while I stood around eating candy.

![Close-up of the cleaned battery area, nearby diodes and exposed trace on the Mega PC motherboard.](/assets/images/2012/img_0025.jpg)

*D12 to C127 if I'm reading that right!*
{: .media-caption }

![Underside of the motherboard with blue, orange and red jumper wires soldered across damaged tracks.](/assets/images/2012/img_0026.jpg)

*Thick traces need thicker wire.*
{: .media-caption }

![Underside of the motherboard showing repair wires held in place beneath yellow Kapton tape.](/assets/images/2012/img_0027.jpg)

*A generous amount of Kapton tape to keep our shiny new wires away from the case.*
{: .media-caption }

Shiny new wires on the underside of the board. We added a generous amount of Kapton tape to insulate the repairs from the case.

![Blue BIOS setup screen with onboard IDE enabled and manual cylinder, head and sector settings for the first hard drive.](/assets/images/2012/img_0024.jpg)

*Hard drive auto-detect didn't work, so I manually entered the drive geometry.*
{: .media-caption }

![Seagate ST3120A hard drive identification label, shown during attempts to get the Mega PC's storage working.](/assets/images/2012/img_0028.jpg)

*The 106 MB Seagate was happy in another machine. The Mega PC had other ideas.*
{: .media-caption }

![Quadtel Extended BIOS Setup screen showing enabled onboard IDE and a user-defined hard-drive geometry.](/assets/images/2012/img_0029.jpg)

*Quadtel Extended BIOS Setup really felt modern!*
{: .media-caption }

After reassembling everything, I found that the PC side wouldn't recognise either of the hard drives I tried. I started with a roomy 106MB Seagate, then moved on to a beefy 365MB IBM drive. Both worked fine in another machine.

Either I'm really bad at entering drive geometry or something hard-drive-controller-like on the motherboard is fried.

![FDISK drive-selection screen showing disk 2 with 102 MB free and disk 1 reporting zero megabytes.](/assets/images/2012/img_0030.jpg)

*FDISK could see 102 MB free. Actually partitioning it was another matter.*
{: .media-caption }

![MaxBlast Plus warning dialog reading 'BIOS Read Error 80 on drive 81'.](/assets/images/2012/img_0032.jpg)

*MaxBlast Plus was not particularly optimistic either: BIOS Read Error 80.*
{: .media-caption }

![Quadtel BIOS setup screen showing another user-defined hard-drive geometry with onboard IDE enabled.](/assets/images/2012/img_0031.jpg)

*Can't get enough of that sweet Quadtel BIOS setup!*
{: .media-caption }

I thought I was close with that FDISK result above, but partitioning still failed and the system kept throwing errors. There is only one hard-drive connector on the motherboard, so I'll have to wait for the other motherboard I ordered to arrive and start comparing.

Overall, though, a good result. The Sega side works perfectly and the PC side works somewhat. I'm very much looking forward to receiving the other Amstrad motherboard so I can finally work out what is going on with the hard drive.

### Sources

- [Energizer: Nickel Cadmium Application Manual](https://data.energizer.com/pdfs/nickelcadmium_appman.pdf)

### Related Posts

- [Amstrad Sega Mega PC 386SX Arrival](/amstrad-sega-mega-pc-386sx-arrival/)
- [Amstrad Sega Mega PC 386SX Overview](/amstrad-sega-mega-pc-386sx-overview/)
