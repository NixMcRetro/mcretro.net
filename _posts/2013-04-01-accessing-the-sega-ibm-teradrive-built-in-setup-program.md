---
title: "Accessing the Sega / IBM TeraDrive Built-in Setup Program"
author: "Nix McRetro"
date: 2013-04-01T10:53:52.000+11:00
categories: [sega]
last_modified_at: 2026-10-21
---

{% include youtube.html id="FwCTTdzpFkc" %}

Sure, there isn't much to the actual setup. Only three options and none of them that exciting... I suppose it is better than a kick in the teeth! Anyway, to sum it all up, choose DOS from the TeraDrive menu and press F1 during the PC-side startup!

![](/assets/images/2013/img_0383.jpg)

Above is the setup screen accessed by pressing F1 during the PC-side startup.

![](/assets/images/2013/img_0385.jpg)

This is the usual welcome screen when the Sega TeraDrive is first powered on, the Sega TeraDrive OS-in-ROM. I have been told that there is also a jumper on the mainboard that will disable this screen and boot straight to DOS.

![](/assets/images/2013/img_0384.jpg)

The Puzzle Construction menu once loaded up. Create your own Sega game and more! Looks very similar to the above screen doesn't it?

The TeraDrive is now implemented in MAME, whose current driver documentation records F1 during POST as the way to enter the setup menu. That later documentation places the keypress during the PC-side startup sequence rather than at an already-running DOS prompt.

### More fun with DOS-in-ROM

{% include youtube.html id="nruzUvZfBGU" %}

Now here's another interesting discovery from my TeraDrive investigations. While trying to work out how to attach a hard drive to the Model 2, I came across a couple of DOS utilities called `CUSTOMIZ.EXE` and `CONFIGUR.EXE`, or something very close to that second name. Good old DOS 8.3 filenames!

Unlike the F1 setup screen above, `CUSTOMIZ.EXE` deals with how the machine starts up. I can choose whether it tries a floppy disk, the built-in DOS, or a hard drive that I don't actually have yet. There's also the option to bypass the Sega menu and start elsewhere, along with settings for Num Lock and where `CONFIG.SYS` and `AUTOEXEC.BAT` should be loaded from.

That's quite a few options for a machine that came with its own rather elaborate startup menu. I even found references to Microsoft Works and Prodigy among the possible startup choices. Plenty to investigate!

Unfortunately, the other configuration program wasn't nearly as cooperative. It promptly informed me that it wasn't designed to run on this system. Well, that's rather rude.

I'm not claiming any of these changes were successfully saved or tested yet, but it's another little piece of the TeraDrive puzzle. Perhaps it'll help with the ongoing hard drive investigation.

### Related posts

- [Sega TeraDrive Hard Drive Interface Investigation](/sega-teradrive-hard-drive-interface-investigation/)

### Sources

- [MAME - Sega TeraDrive driver notes](https://github.com/mamedev/mame/blob/master/src/mame/pc/teradrive.cpp)
