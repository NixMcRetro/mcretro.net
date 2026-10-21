---
title: "Xbox DVT4 XBpartitioner and Game Demos"
author: "Nix McRetro"
date: 2019-11-24T18:59:04.000+11:00
last_modified_at: 2026-10-22
categories: [devkit, microsoft, youtube]
---

{% include youtube.html id="5LL4LrlK2DM" %}

And this video concludes the six-part Xbox DVT4 series. What a ride it has been!

With the 120 GB SSD installed and UnleashX running, I thought it was about time to make use of some of that extra storage. Xbox Partitioner 1.3 was the next thing to investigate, although it wasn't entirely happy about running with the development kit's firmware.

After a little experimenting, I managed to create and format an F partition. Back in UnleashX, there it was! Excellent. Unfortunately, getting the official XDK Launcher to see everything on that partition was another matter entirely.

There followed a rather entertaining session of copying files, restarting the Xbox and trying to work out exactly where the games were supposed to go. Xbox Neighborhood wasn't making things particularly easy either. FTP proved much more reliable for transferring the files.

Eventually I had games running from the SSD, although not every launcher or shortcut behaved exactly as expected. In-game reset wasn't particularly cooperative either, so occasionally it was back to switching the console off and on again.

I'd also made an image of the original hard drive under Ubuntu. My old notes aren't clear about which imaging tool I used. I mentioned [fatxfs](https://github.com/mborgerson/fatx), but that utility lets us mount and explore the FATX filesystem on a drive or an existing raw image.

Interestingly, the recovery software (`xdk 5849 (Xbox SDK Dec 2003).tar`) left the drive ATA-locked, making access via fatxfs somewhat less convenient. Once I'd unlocked it with Chimp 261812, it imaged without any issues.

GNU ddrescue can create a raw image or rescue readable sectors, and Ubuntu packages it as `gddrescue`, although the command itself is `ddrescue`. I'll probably do another video showing the process later on.

So there we have it. The DVT4 is running with its replacement SSD, development software and a selection of games. Not bad for an old Xbox development kit!

### Related posts

- [Xbox DVT4 Running UnleashX](/xbox-dvt4-running-unleashx/)

### Sources

- [fatxfs - FATX FUSE filesystem driver](https://github.com/mborgerson/fatx/blob/master/fatxfs/README.md)
- [GNU ddrescue 1.24 manual (October 2019 capture)](https://web.archive.org/web/20191022060414/http://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html)
- [Ubuntu 18.04 manpage - ddrescue, provided by gddrescue](https://manpages.ubuntu.com/manpages/bionic/man1/ddrescue.1.html)
- [S-Config - Original XBox Debug Console: It lives again!](https://www.s-config.com/original-xbox-debug-console/)
- [ASSEMblergames - DVT4 Slow at loading XDK Launcher](https://web.archive.org/web/20191124074925/https://assemblergames.com/threads/dvt4-slow-at-loading-xdk-launcher.58694/)
- [ASSEMblergames - Cloning an Xbox Hard Drive](https://web.archive.org/web/20191108232644/https://assemblergames.com/threads/cloning-an-xbox-hard-drive.59787/)
