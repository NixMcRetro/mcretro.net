---
title: "Accessing the Sega / IBM TeraDrive Built-in Setup Program"
author: "Nix McRetro"
date: 2013-04-01T10:53:52.000+11:00
categories: [sega]
last_modified_at: 2026-10-21
---

{% include youtube.html id="FwCTTdzpFkc" %}

Sure, there isn't much to the actual setup. Only three options, and none of them that exciting... I suppose it's better than a kick in the teeth! Anyway, the trick is to choose DOS from the TeraDrive menu and press F1 during the PC-side startup.

I discovered this while investigating my Model 2 TeraDrive, which has two floppy drives but no hard drive. I'd been experimenting with an XT-style IDE interface without getting very far, so I started looking for other things to try. Somewhere along the way I stumbled across the machine's built-in setup program.

The key is to press F1 during the PC startup sequence, not from an already-running DOS prompt. The menu contains options for keyboard type, power-on beep, and a window-address setting that I wasn't especially keen to experiment with. I tried enabling the beep and changing the keyboard selection. The beep worked immediately!

![](/assets/images/2013/img_0383.jpg)

Above is the setup screen itself. I couldn't tell whether changing the keyboard selection made much difference, but it's nice knowing the option is there. There's not an enormous amount to configure, although it's another part of the TeraDrive I hadn't explored before.

![](/assets/images/2013/img_0385.jpg)

This is the usual welcome screen when the TeraDrive is first powered on, the Sega TeraDrive OS-in-ROM. I've also been told there's a jumper on the motherboard that can disable this screen and start the PC side directly, although I haven't demonstrated that modification here.

![](/assets/images/2013/img_0384.jpg)

And here's the Puzzle Construction menu once it's loaded. Create your own Sega game and more! It looks remarkably similar to the startup screen, doesn't it? The TeraDrive has since been implemented in MAME, whose driver notes also record F1 during POST as the way into the setup program.

### More Fun with DOS-in-ROM

{% include youtube.html id="nruzUvZfBGU" %}

While trying to work out how to attach a hard drive to the Model 2, I came across a couple of DOS utilities called `CUSTOMIZ.EXE` and `CONFIGUR.EXE`. Good old DOS 8.3 filenames!

Unlike the F1 setup menu, `CUSTOMIZ.EXE` deals with how the machine starts up. It offers choices such as trying a floppy disk, using the built-in DOS, or booting from a hard drive that I don't actually have yet. There's also an option to bypass the Sega menu, along with settings for Num Lock and where `CONFIG.SYS` and `AUTOEXEC.BAT` should be loaded from.

I even found references to Microsoft Works and Prodigy among the possible startup choices. That's quite a few options for a computer with such an elaborate built-in menu, although I haven't confirmed that all of those choices work with my machine.

Unfortunately, `CONFIGUR.EXE` was rather less cooperative. It promptly informed me that it wasn't designed to run on this system. I haven't established whether any of my changes were saved successfully, but these utilities give me a few more things to investigate while I continue working on the TeraDrive's hard drive interface.

**Related Posts**

- [Sega TeraDrive Hard Drive Interface Investigation](/sega-teradrive-hard-drive-interface-investigation/)

**Sources**

- [MAME - Sega TeraDrive driver notes](https://github.com/mamedev/mame/blob/master/src/mame/pc/teradrive.cpp)
