---
title: "SuperCIC Planning Notes for SNSP-CPU-1CHIP-01 with F413B"
author: "Nix McRetro"
date: 2013-07-08T19:06:30.000+10:00
last_modified_at: 2026-10-22
categories: [guides, hacks, nintendo]
---

![](/assets/images/2013/img_0410.jpg)

This will be the article on how to install SuperCIC for switchless region-free gaming. Provided I can find the time.

The board I'm working with is an `SNSP-CPU-1CHIP-01`, featuring the PAL `F413B` lockout chip at U8. The idea is to install a SuperCIC and hopefully get around some of those annoying region restrictions without having to install a great big switch hanging out the back of the console.

SuperCIC uses a programmed PIC microcontroller to replace the original Nintendo lockout system. It can also provide automatic region selection and allow switching between 50 Hz and 60 Hz. Quite clever for such a tiny little chip!

I've been looking at [Wolfsoft's SuperCIC installation guide](https://wolfsoft.de/blog/2010/05/10/supercic-snes-switchless-mod/), but there's a little problem. Their example uses the older `F413A` arrangement with separate PPU chips, while this particular Super Nintendo is one of the later 1CHIP models. Naturally, the wiring isn't quite the same.

The first job is working out how to deal with the original F413B lockout chip. Then there's the business of connecting everything else correctly, particularly the video mode selection. I don't fancy lifting pins and soldering little wires everywhere only to discover I've connected something to entirely the wrong place!

So this remains a collection of notes rather than a complete installation guide. I've got the motherboard identified and some useful documentation, but the actual wiring for this board still needs sorting out.

One problem at a time. Preferably without setting fire to anything. :)

### Related posts

- [SuperCIC Installation Notes for SNSP-CPU-02 with F413A](/supercic-installation-notes-snsp-cpu-02-f413a/)
- [SNES SuperCIC Switchless Modchip - Installation (Part 1)](/snes-supercic-switchless-modchip-installation-part-1/)
- [SNES SuperCIC Switchless Modchip - The Test (Part 2)](/snes-supercic-switchless-modchip-the-test-part-2/)

### Sources

- [Wolfsoft - SuperCIC SNES Switchless MOD (PAL)](https://wolfsoft.de/blog/2010/05/10/supercic-snes-switchless-mod/)
- [ikari - SuperCIC Project and Firmware](https://sd2snes.de/blog/cool-stuff/supercic)
