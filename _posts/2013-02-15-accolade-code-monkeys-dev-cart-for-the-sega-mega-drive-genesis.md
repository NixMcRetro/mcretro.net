---
title: "Accolade Code Monkeys Dev Cart for the Sega Mega Drive / Genesis"
author: "Nix McRetro"
date: 2013-02-15T08:09:40.000+11:00
categories: [devkit, gaming, sega]
last_modified_at: 2026-10-18
---

{% include youtube.html id="m-UYDH0lgdM" %}

This development cartridge seems to have been used by The Code Monkeys and was made by Accolade. Quite an interesting piece of Mega Drive history! I haven't worked out exactly what it's supposed to do yet. When I insert it into a Mega Drive, it displays the Code Monkeys introduction, but there's also a strange cable hanging off the cartridge.

The cable ends in a 9-pin connector, with what appears to be only one contact wired up. I initially wondered whether it might connect to the expansion port on an early Mega Drive or perhaps another piece of development equipment. I'm still not sure, so if anyone recognises the arrangement, I'd love to hear about it.

![](/assets/images/2013/img_0370.jpg)

The cartridge itself is quite fashionable, especially for something made by a third-party publisher. There's an awful lot of black epoxy covering the components, which makes the circuitry difficult to inspect.

Several capacitors sit close to the edge of the board, where they seem to have been catching on the cartridge-slot flaps over the years. One near C9 may already have been damaged. They appear to be 47 uF, 10 V electrolytics, so at least replacements shouldn't be difficult to find.

I might put some protective tape over that area before inserting the cartridge too many more times. There are also two socketed EPROMs marked as 27256-class devices, which is nice to see. Socketed components are always a welcome sight when examining unusual hardware like this.

![](/assets/images/2013/img_0374.jpg)

Above is the Code Monkeys intro displayed by the cartridge in a working Mega Drive. The cart is clearly doing something, but I haven't established whether this is simply a test ROM or part of a larger PC-controlled development setup.

![](/assets/images/2013/img_0372.jpg)

Next up is the Accolade silkscreen on the PCB. It had been blacked out with what looks like a marker pen, so I wasn't initially sure who'd made the board. After cleaning around the marking, the Accolade name became much easier to recognise.

The Code Monkeys connection is interesting too, particularly because I've encountered references to them in the paperwork that accompanied my Cross Products Mega-CD development unit.

![](/assets/images/2013/img_0371.jpg)

One YouTube commenter suggested that the unusual 9-pin lead might be related to [Zero Tolerance](https://en.wikipedia.org/wiki/Zero_Tolerance_(video_game)). That game supported connecting two Mega Drives through their second controller ports, using a special link cable. Technopop later published the wiring needed to build one, but I don't know whether it has anything to do with this cartridge.

Accolade's development manual describes a PC-to-console connection as part of its development system, which offers another possibility. Neither that manual nor Zero Tolerance's multiplayer feature tells me what this particular lead was used for, so I'll keep the mystery open for now.

![](/assets/images/2013/img_0373.jpg)

I've also seen what looks like a similar cartridge in old Sega development footage, with comparable epoxy-covered circuitry. Another little clue, although it doesn't tell me exactly how the hardware was used. If anyone knows more about these Accolade or Code Monkeys cartridges, please feel free to get in touch! :-)

**Sources**

- [Accolade - The Sega Development System, version 2.0 (21st February 1991)](https://drive.google.com/file/d/1C_T91q6Pf_TTA5Bl5IUbqscrgapqxAq8/view) - original setup instructions describe the PC and console connections; they do not identify this cartridge's loose lead.
- [Exodus Emulator TechDocs - Sega Mega Drive Development Hardware](https://techdocs.exodusemulator.com/Console/SegaMegaDrive/Hardware.html)
- [Technopop - Zero Tolerance / 2-Player Network Link Cable](http://www.technopop.net/)
- [Sega-16 - Tech Talk: Zero Tolerance Link Cable](https://www.sega-16.com/2009/12/sega-gear-zero-tolerance-link-cable/)
