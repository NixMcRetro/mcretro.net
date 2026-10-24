---
title: "DreamShell 4.0.0 RC1 Boot Attempt with SD Adapter"
author: "Nix McRetro"
date: 2013-04-06T03:35:16.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, sega, youtube]
---

{% include youtube.html id="ILqrG6tCvtE" %}

Some progress with DreamShell 4.0.0 RC1, but this setup is still behaving unpredictably. I've been trying to get the Dreamcast booting from an SD card using one of those serial-port adapters, with varying degrees of success. Sometimes it works, sometimes it doesn't, and sometimes it just sits there complaining about the file system. Wonderful!

The first part of the experiment involved preparing the SD cards. I tried a 32 GB SDHC card formatted as FAT32 and a smaller 2 GB card using FAT16. Both appeared to be recognised at various points, although formatting a card through Mac OS caused problems that I didn't encounter when using Windows.

That was slightly inconvenient because I was running Windows XP through Parallels, and the virtual machine wasn't particularly happy with my card reader. It had a habit of disappearing from the USB bus when I tried to use it. I eventually resorted to formatting one of the cards in the camera instead. Whatever works!

DreamShell comes with a few different boot options. There's the full CD version and a separate bootloader that lets you start the environment from another device. I was particularly interested in the bootloader because it should reduce the amount of work the Dreamcast's optical drive has to do.

For this arrangement, I copied the DreamShell `DS` folder onto the SD card and burned the bootloader CDI using ImgBurn. The Dreamcast would start reading the disc, but then I kept getting an error about being unable to initialise the file system. Not exactly the result I was hoping for.

The adapter itself wasn't particularly confidence-inspiring either. There was a fair bit of hot glue inside it, and moving the connection around sometimes seemed to change the behaviour. At one point, after another attempt with a smaller SanDisk card, DreamShell actually made it into the interface. There we go!

The picture wasn't especially happy on my television, though. It appeared in black and white at 50 Hz, which is a little ridiculous considering where I live. Changing to 60 Hz helped with that, and I was finally able to poke around the DreamShell menus.

The controller could be used to move the pointer, and there was even an on-screen keyboard. Unfortunately, the small SD card didn't have anything particularly useful on it, so this wasn't a demonstration of a game loading successfully. At least the interface itself was doing something.

What I am seeing here does not tell me whether DreamShell itself is the problem. The SD card, adapter or some interaction between the two could just as easily be involved. I've therefore ordered another SD card and a different DreamShell adapter. We'll have to wait and see whether that behaves any better.

Stay tuned! :)

**Update:** Unfortunately, I don't appear to have documented the final outcome of this experiment in any later posts, so this one remains unresolved in the archive!

**Sources**

- [DC-SWAT - DreamShell 4.0 RC1 discussion](https://dc-swat.ru/www/forum/thread-1787-post-21648.html) - contemporary DreamShell RC1 discussion and boot-method context.
