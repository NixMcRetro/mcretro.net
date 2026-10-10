---
title: "Xbox DVT4 XBpartitioner and Game Demos"
author: "Nix McRetro"
date: 2019-11-24T18:59:04.000+11:00
categories: [devkit, microsoft, youtube]
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
---

{% include youtube.html id="5LL4LrlK2DM" %}

And this video concludes the six-part Xbox DVT4 series. What a ride it has been. The original hard drive was imaged under Ubuntu, though my old notes aren't clear about which tool made the image. I mentioned [fatxfs](https://github.com/mborgerson/fatx), but that lets us mount and poke around the FATX filesystem on a drive or an existing raw image.

Interestingly, the recovery software (`xdk 5849 (Xbox SDK Dec 2003).tar`) left the drive ATA-locked, making "easy" access via fatxfs a little less easy. Once I'd unlocked it with Chimp 261812, it imaged without any issues. GNU ddrescue can make a raw image or rescue readable sectors; Ubuntu packages it as `gddrescue`, but the command itself is `ddrescue`. I'll probably do another video showing the process later on.

Previous: [Xbox DVT4 Running UnleashX](/xbox-dvt4-running-unleashx/)

### Sources

- [fatxfs - FATX FUSE filesystem driver](https://github.com/mborgerson/fatx/blob/master/fatxfs/README.md)
- [GNU ddrescue 1.24 manual (October 2019 capture)](https://web.archive.org/web/20191022060414/http://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html)
- [Ubuntu 18.04 manpage - ddrescue, provided by gddrescue](https://manpages.ubuntu.com/manpages/bionic/man1/ddrescue.1.html)
- [S-Config - Original XBox Debug Console: It lives again!](https://www.s-config.com/original-xbox-debug-console/)
- [ASSEMblergames - DVT4 Slow at loading XDK Launcher](https://web.archive.org/web/20191124074925/https://assemblergames.com/threads/dvt4-slow-at-loading-xdk-launcher.58694/)
- [ASSEMblergames - Cloning an Xbox Hard Drive](https://web.archive.org/web/20191108232644/https://assemblergames.com/threads/cloning-an-xbox-hard-drive.59787/)