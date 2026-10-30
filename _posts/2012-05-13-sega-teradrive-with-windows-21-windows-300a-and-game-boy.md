---
title: "Sega TeraDrive with Windows 2.1, Windows 3.00a and Game Boy"
author: "Nix McRetro"
date: 2012-05-13T00:13:41.000+10:00
last_modified_at: 2026-10-21
categories: [ibm-pc, nintendo, sega]
---

{% include youtube.html id="bWKMif9u-5g" %}

I've been experimenting with Windows on the Sega TeraDrive Model 2. Since this machine has two floppy drives and no hard drive, I've decided to see just how much Microsoft software I can squeeze onto a disk.

Windows 2.1 went surprisingly well. I managed to get it running from a single floppy, and even the mouse worked without too much trouble. There were a few complaints from the setup program, but the Windows 286 environment loaded and let me explore applications such as MS-DOS Executive, Calculator, Notepad, and Write.

It's not especially glamorous compared with newer versions of Windows, but it runs rather nicely for a 10 MHz 286 with floppy storage. I even managed a quick calculation in the calculator. Twice the speed of the machine, apparently!

{% include youtube.html id="Tk93s2BfL-I" %}

Next came Windows 3.00a. I stripped the installation down to the files needed to start it and somehow managed to fit the result onto a floppy disk. The Sega file manager can launch it, and I even got Solitaire running. Don't judge me! I happen to like Solitaire.

Getting Windows running from a floppy wasn't quite enough, though. What I really wanted was to load everything into RAM and leave both floppy drives available for other programs. With no internal hard drive, that would make the TeraDrive considerably more useful.

{% include youtube.html id="S2Bc_2RNHTc" %}

Loading `HIMEM.SYS` made things much more interesting. The system reported just under 2 MB of available memory with very little else loaded. That's more than the capacity of a high-density floppy disk, so I reckoned it might be enough for a compact Windows installation in a RAM disk.

{% include youtube.html id="uNJ6U6cssGY" %}

And here's the end result: a self-booting Windows 3.00a floppy using MS-DOS 6.22 to prepare a RAM disk of around 1.7 MB. The startup process copies and extracts the Windows files into memory before launching the system. It takes a while to get there, but once loaded, programs such as Solitaire run considerably faster than they did directly from the floppy.

I also experimented with DOSBox to prepare the stripped-down Windows installation and work out which files were actually necessary. The TeraDrive's limited memory means I can't simply install a newer version of Windows without thinking about what will fit, so this has turned into a rather entertaining exercise in trimming things down.

The next challenge is still getting a hard drive into this machine. There's an unusual 44-pin connector on the motherboard, and I might also be able to use an ISA expansion card. Either option would make life a lot easier than juggling floppy disks all evening. You can even see the change in daylight between the recordings; the sun had long since set by the time I finished!

![](/assets/images/2012/img_0092.jpg)

In other news, please welcome Nintendo Game Boy to the family. I had one of these back in primary school, I think, although that was a very long time ago now.

![](/assets/images/2012/img_0090.jpg)

Good times with Tetris and Super Mario Land, not to mention Snow Brothers on my dodgy 10-in-1 pirate cartridge. There's something lovely about having one of these little grey bricks around again.

![](/assets/images/2012/img_0091.jpg)

**Related Posts**

- [Sega TeraDrive Model 2 with Windows 3.11 in a RAM Disk](/sega-teradrive-model-2-with-windows-311-in-a-ram-disk/)

**Further Reading**

- [Sega TeraDrive Hard Drive Interface Investigation](/sega-teradrive-hard-drive-interface-investigation/) - my later investigation into the TeraDrive's unusual 44-pin hard-drive interface.
