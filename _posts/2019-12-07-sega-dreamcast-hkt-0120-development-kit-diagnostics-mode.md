---
title: "Sega Dreamcast HKT-0120 Development Kit Diagnostics Mode"
author: "Nix McRetro"
date: 2019-12-07T22:37:23.000+11:00
last_modified_at: 2026-10-22
categories: [devkit, sega, youtube]
---

{% include youtube.html id="x6z55gkKjoI" %}

This handy little piece of built-in software, Sega Katana Set5 Checker, is great for checking your Sega Dreamcast HKT-0120 functionality and ensuring it is firing on all cylinders. I've been having another play with the development kit and discovered quite a few interesting things hiding behind its switches and diagnostic menus. Some of them I understand, while others are still a bit of a mystery. That's half the fun of playing with development hardware!

First up, I've got *World Series Baseball 2K2* running from a retail disc. The development kit is quite happy to read it, which is an excellent start. Always nice when an expensive-looking piece of hardware can do something useful!

**Switches, Video Modes and Other Mysteries**


There are DIP switches on the front of the unit, along with a rotary selector that I suspect has something to do with the region settings. I haven't worked through all the documentation yet, so we're doing a little exploring. Nothing like flicking switches on an expensive development kit and seeing what happens!

Changing the switches gives us some rather interesting results. One moment we're looking at the composite output on the television, and the next the unit has decided to send us over to VGA. That works nicely, although I've got a lovely large television in the background too.

The front panel is quite a collection of controls, and I'm still trying to establish exactly which ones affect which modes. It doesn't help that certain settings appear to move the display from one output to another without much warning. Fortunately, I've got both the television and monitor connected, so at least I can see where the picture has gone!

**The Set5 Checker**


Now for the interesting bit. The diagnostic software runs through various internal checks, including the SH-4 processor, and presents a collection of test patterns that look like they belong in a hardware repair workshop. Some of them are quite familiar, while others are rather colourful. A few even look like something out of *Battlestar Galactica*.

Some of the screens remind me of the diagnostic programs I used when repairing computers. Lots of patterns, version numbers and hardware checks, all very useful if you actually know what the machine is trying to tell you. I'm still working that part out, but it's certainly entertaining to watch.

We've also got tests associated with the GD-ROM drive, Maple and the G2 interface. There's even a G2 link program lurking in one of the modes, although I don't particularly fancy getting too adventurous with that until I've worked out what it actually does. One slightly amusing moment comes when I decide to eject the disc, only for the machine to start checking the GD-ROM drive. Of course it does. Timing is everything!

There are also a collection of bus and board checks, with the occasional unfamiliar diagnostic program appearing as I change the settings. Some complete almost immediately, while others appear to want considerably more time. It's quite a lot of software to have built into the machine, especially when most of it is completely hidden from ordinary Dreamcast owners.

**More Rotary Switch Fiddling**


I've been experimenting with the rotary selector to see what changes. Different positions appear to bring up different screens and test arrangements, with the occasional unfamiliar mode thrown in for good measure. It's quite entertaining not knowing exactly what's going to appear next.

Eventually I manage to find an NTSC-U setting. Naturally, turning the switch the other way in the first place might have saved me quite a bit of messing around. Never mind, we got there eventually!

One particularly interesting discovery is that changing the rotary switch can bring up different diagnostics and video modes. I've been trying to relate the positions to the region settings, but I still haven't worked out the complete relationship. It's tempting to keep flicking things around just to see what happens, although I probably ought to read the documentation eventually.

It's interesting seeing just how much testing software Sega built into these development units. The retail Dreamcast doesn't give you quite this level of access to its innards, and there's clearly still plenty to investigate here. In particular, I'd like to work out exactly what all those switches and development features do.

For an earlier look at the software side of the HKT-0120, see my [Sega Dreamcast Dev Kit Software Overview](/sega-dreamcast-dev-kit-software-overview/).

**Related Posts**


- [Sega Dreamcast Dev Kit Software Overview](/sega-dreamcast-dev-kit-software-overview/)
