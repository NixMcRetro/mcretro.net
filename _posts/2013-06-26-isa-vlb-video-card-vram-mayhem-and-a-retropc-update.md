---
title: "ISA / VLB Video Card VRAM Mayhem and a RetroPC Update"
author: "Nix McRetro"
date: 2013-06-26T14:41:57.000+10:00
last_modified_at: 2026-10-22
categories: [ibm-pc, youtube]
---

{% include youtube.html id="3uTllzL53Jw" %}

Good to see I got nowhere with this, another dead video card is all I ever seem to have! :D

I'd picked up another old video card for the princely sum of $1, with postage costing about eight times as much. Unfortunately, it was producing some rather interesting graphical rubbish, and I suspected the video RAM might be responsible. The card uses a familiar chipset, but the memory arrangement is a little different from the other boards I've got lying around.

I've seen similar graphical problems when RAM or ROM data isn't being read properly, so swapping the memory chips seemed like a reasonable place to start. I've got a collection of other VGA cards with removable memory, although the chips aren't all the same speed. There were 60 ns, 70 ns and 80 ns parts to investigate.

I had a few other cards lying around, so naturally the next step was to start borrowing RAM chips and swapping them about. Different speeds, different cards, different results, but nothing that actually fixed the troublesome board. So much for a quick and easy repair!

There was also a little corrosion on the back of the card, and some fairly questionable solder joints. I gave things a clean and tried a few more experiments before deciding I'd had quite enough of that particular problem for one evening. Even removing the BIOS chip produced some similar nonsense, which didn't exactly make the diagnosis any easier.

Instead, I moved some of the RAM onto another Trident-based card, which was rather more cooperative and reported 2048 KB of video memory. That would do nicely for the time being. At least some of these components were good for something!

Meanwhile, the 486 workstation was becoming quite an elaborate contraption. With the IntelDX4 OverDrive running at 100 MHz, I was trying to fit the Sega Mega-CD development hardware, Gravis UltraSound, Sound Blaster Pro 2 and assorted controller cards into the available slots.

A shorter GoldStar Prime 2 IDE controller proved especially useful, allowing my 2 GB disk-on-module to work without occupying quite so much space. I'd originally bought some of these cards for the TeraDrive, where they weren't particularly cooperative, but in this workstation the arrangement worked rather nicely.

Space inside the machine was becoming a problem. The VLB video card was quite long, and that enormous heatsink on the Intel OverDrive CPU wasn't helping matters. I still wanted room for the Gravis UltraSound, Sound Blaster and the Mega-CD development hardware, so card placement became a rather interesting puzzle.

By the end of the video, the machine was taking shape and most of the hardware was cooperating. The Sound Blaster was configured, the Gravis was mostly behaving itself, and the development card was being recognised on most boots. I still needed to finish the optical-drive arrangements, but at least the workstation itself was getting somewhere.

The original troublesome video card, however, wasn't quite so fortunate. One less working VGA card, one more working collection of retro PC components. I'll take what I can get!

**Related Posts**

- [IntelDX4 OverDrive 100 MHz 486 Workstation and ISA Cards](/inteldx4-overdrive-100mhz-486-workstation-and-isa-cards/)
- [SNASM2 Sega Mega-CD Emulation Card on a 486DX4-100](/snasm2-mega-cd-emulation-card-on-a-486dx4-100mhz/)
