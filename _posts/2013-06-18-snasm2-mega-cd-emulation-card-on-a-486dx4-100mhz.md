---
title: "SNASM2 Sega Mega-CD Emulation Card on a 486DX4-100"
author: "Nix McRetro"
date: 2013-06-18T15:30:06.000+10:00
last_modified_at: 2026-10-23
categories: [devkit, sega, youtube]
---

{% include youtube.html id="14gpE2PKm5M" %}

What are we rocking today? Have a look at this beautiful PC! I've finally managed to put together a machine that seems rather happy running the SNASM2 development card and Sega Mega-CD emulation hardware. After all the trouble I've had with newer computers, that's a rather nice change!

The machine is a 486DX4 running at 100 MHz, with dual floppy drives, dual CD-ROM drives and a collection of ISA and VLB cards. There's a Trident 1 MB VLB graphics card, a Winbond controller handling the drives, and a Transcend 4 GB Disk on Module for storage. We've also got 64 MB of RAM installed using four 16 MB modules. Beautiful!

There's a Creative Sound Blaster CT1350B installed as well, although it's sitting a little crookedly. Unfortunately, this particular card doesn't have the CMS chips fitted, but at least we've got something for ordinary PC audio. There's even a proper PC speaker in this machine rather than a tiny little beeper.

Now for the interesting part. The SNASM2 card is connected to the Sega development hardware, so let's boot the machine and see whether it actually communicates. Into the SNASM2 directory we go, followed by `SNTEST`.

Connected!

That's exactly what I wanted to see. The development card and the Mega-CD hardware are communicating, which is considerably more than I was achieving with some of the other computers I'd been trying.

It seems to be rather particular about the motherboard. One Pentium 100 system wasn't cooperating, while a Pentium III motherboard could work but had another problem entirely. The development card is so tall that it wouldn't physically fit in the case arrangement I wanted to use. It's roughly a centimetre or so taller than the normal expansion-card bracket, which makes things interesting!

I also tried a smaller desktop case, but there wasn't enough clearance. At least I managed to salvage some useful components from that machine. The motherboard had suffered battery corrosion, including damage around the BIOS, so it wasn't exactly a good candidate for restoration anyway.

I've heard there can also be compatibility problems involving certain Sound Blaster cards, although I haven't established whether that applies to this particular setup. For now I'm leaving the old Creative card installed and concentrating on getting the Sega hardware working.

A big thank you to Jackhead over at ASSEMbler Games, who helped me with the hardware and supplied the motherboard I'm using here. It's been quite a learning experience getting these development cards to cooperate.

So there we have it. A 486DX4-100, a collection of rather interesting ISA cards, and a working connection to the Sega Mega-CD development hardware. This machine is a beast!

### Related posts

- [Sega SNASM2 and CD Emulation Cards with Gravis UltraSound](/sega-snasm2-and-cd-emulation-cards-with-gravis-ultrasound/)
- [IntelDX4 OverDrive 100 MHz 486 Workstation and ISA Cards](/inteldx4-overdrive-100mhz-486-workstation-and-isa-cards/)
