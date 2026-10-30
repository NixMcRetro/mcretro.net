---
title: "Accolade Code Monkeys Dev Cart for the Sega Mega Drive / Genesis"
author: "Nix McRetro"
date: 2013-02-15T08:09:40.000+11:00
categories: [devkit, gaming, sega]
last_modified_at: 2026-10-18
---

{% include youtube.html id="m-UYDH0lgdM" %}

This development cartridge seems to have been used by The Code Monkeys and is Accolade-made. Quite an interesting piece of Mega Drive history! I haven't worked out exactly what it's supposed to do yet. When I insert it into a Mega Drive, it displays the Code Monkeys introduction, but there's also a peculiar cable hanging off the cartridge.

That cable ends in a 9-pin connector, with what appears to be only one contact wired up. I initially wondered whether it might connect to the expansion port on the back of an early Mega Drive, or perhaps some other piece of development equipment. At this stage I really don't know. If anyone recognises the arrangement, I'd love to hear about it! The board itself is also worth a closer look.

![](/assets/images/2013/img_0370.jpg)

The card is quite fashionable, especially as it came from a third-party publisher. There's an awful lot of black epoxy covering the components, which makes it harder to inspect the circuitry or determine what everything does.

Several capacitors sit close to the edge of the cartridge. They look as though they've been catching on the cartridge-slot flaps over the years, and one near C9 may already have been damaged. The components appear to be 47 uF, 10 V electrolytics, so at least replacements shouldn't be difficult to find.

I may put some protective tape over that area before inserting the cartridge too many more times. There are also two socketed EPROMs, marked as 27256-class devices. It's always nice to see socketed components rather than everything being permanently soldered down.

![](/assets/images/2013/img_0374.jpg)

Above is the intro that appears when the cartridge is inserted into a functioning Sega Mega Drive. It looks as though the cart is doing something useful, although I haven't established whether it's simply a test ROM or part of a larger PC-controlled development setup.

![](/assets/images/2013/img_0372.jpg)

Next up we have the Accolade silkscreen on the PCB that was blacked out with what appears to have been a marker pen. When I received the board I wasn't entirely sure who had manufactured it. After cleaning around the marking, the Accolade name became much easier to recognise.

The Code Monkeys connection is interesting too, particularly because I've encountered references to them in the paperwork accompanying my Cross Products Mega-CD development unit.

![](/assets/images/2013/img_0371.jpg)

Finally, the interesting 9-pin cable hanging off the cartridge might have been related to [Zero Tolerance](https://en.wikipedia.org/wiki/Zero_Tolerance_(video_game)), as one YouTube commenter suggested.

Zero Tolerance supported connecting two Mega Drives through their second controller ports. Technopop later stated that its proprietary two-player Network Link Cable had been offered free with purchases of the game, and published the wiring needed to build one.

Accolade's development manual also describes a PC-to-console connection as part of its development system. Neither that manual nor Zero Tolerance's link feature establishes what the 9-pin lead on this particular cartridge was for. That connection was a suggestion from a commenter, not something I established at the time.

![](/assets/images/2013/img_0373.jpg)

I've also seen what looks like a very similar cartridge in old Sega development footage, with comparable epoxy-covered circuitry. It's another little clue, but unfortunately it doesn't tell me exactly how the hardware was used.

So there you have it, a piece of history! If you know anything more about this development cartridge, please feel free to reach out! :-)

### Sources

- [Accolade - The Sega Development System, version 2.0 (21st February 1991)](https://drive.google.com/file/d/1C_T91q6Pf_TTA5Bl5IUbqscrgapqxAq8/view) - original setup instructions describe the PC and console connections; they do not identify this cartridge's loose lead.
- [Exodus Emulator TechDocs - Sega Mega Drive Development Hardware](https://techdocs.exodusemulator.com/Console/SegaMegaDrive/Hardware.html)
- [Technopop - Zero Tolerance / 2-Player Network Link Cable](http://www.technopop.net/)
- [Sega-16 - Tech Talk: Zero Tolerance Link Cable](https://www.sega-16.com/2009/12/sega-gear-zero-tolerance-link-cable/)
