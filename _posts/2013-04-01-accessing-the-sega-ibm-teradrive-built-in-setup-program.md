---
title: "Accessing the Sega / IBM TeraDrive Built-in Setup Program"
author: "Nix McRetro"
date: 2013-04-01T10:53:52.000+11:00
categories: [sega]
last_modified_at: 2026-10-21
---

{% include youtube.html id="FwCTTdzpFkc" %}

Sure, there isn't much to the actual setup. Only three options and none of them that exciting... I suppose it is better than a kick in the teeth! Anyway, to sum it all up, choose DOS from the TeraDrive menu and press F1 during the PC-side startup!

I discovered this while investigating the Model 2 TeraDrive, which has two floppy drives but no hard drive. I'd been experimenting with an XT-style IDE interface and getting nowhere particularly quickly, so I started looking for other things to try. Somewhere along the way I stumbled across the machine's hidden setup program.

The trick is to enter the PC startup sequence and press F1 at the appropriate point. It's not a command you enter from an already-running DOS prompt, even if that's roughly where I thought I was when I first encountered it.

The setup menu has a few options, including the keyboard type, power-on beep, and a window-address setting that I wasn't particularly keen to experiment with. I did try switching on the power-on beep and changing the keyboard setting. The beep worked immediately! Modern technology at its finest.

I couldn't really tell whether changing the keyboard selection had made much difference, but it's nice knowing the option is there.

![](/assets/images/2013/img_0383.jpg)

Above is the setup screen accessed by pressing F1 during the PC-side startup.

![](/assets/images/2013/img_0385.jpg)

This is the usual welcome screen when the Sega TeraDrive is first powered on, the Sega TeraDrive OS-in-ROM. I have been told that there is also a jumper on the mainboard that will disable this screen and boot straight to DOS.

![](/assets/images/2013/img_0384.jpg)

The Puzzle Construction menu once loaded up. Create your own Sega game and more! Looks very similar to the above screen doesn't it? The TeraDrive is now implemented in MAME, whose driver documentation also records F1 during POST as the way to enter the setup menu.

### More Fun with DOS-in-ROM

{% include youtube.html id="nruzUvZfBGU" %}

Now here's another interesting discovery from my TeraDrive investigations. While trying to work out how to attach a hard drive to the Model 2, I came across a couple of DOS utilities called `CUSTOMIZ.EXE` and `CONFIGUR.EXE`. Good old DOS 8.3 filenames!

Unlike the F1 setup screen above, `CUSTOMIZ.EXE` deals with how the machine starts up. I can choose whether it tries a floppy disk, the built-in DOS, or a hard drive that I don't actually have yet. There's also the option to bypass the Sega menu and start elsewhere, along with settings for Num Lock and where `CONFIG.SYS` and `AUTOEXEC.BAT` should be loaded from.

That's quite a few options for a machine that came with its own rather elaborate startup menu. I even found references to Microsoft Works and Prodigy among the possible startup choices. Plenty to investigate!

Unfortunately, the other configuration program wasn't nearly as cooperative. It promptly informed me that it wasn't designed to run on this system.

I'm not claiming any of these changes were successfully saved or tested yet, but it's another little piece of the TeraDrive puzzle. Perhaps it'll help with the ongoing hard drive investigation.

### Related Posts

- [Sega TeraDrive Hard Drive Interface Investigation](/sega-teradrive-hard-drive-interface-investigation/)

### Sources

- [MAME - Sega TeraDrive driver notes](https://github.com/mamedev/mame/blob/master/src/mame/pc/teradrive.cpp)
