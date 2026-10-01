---
title: "Xbox DVT4 XBpartitioner and Game Demos"
author: "Nix McRetro"
date: 2019-11-24T18:59:04.000+11:00
categories: [devkit, microsoft, youtube]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="5LL4LrlK2DM" %}

And this video concludes the six-part Xbox DVT4 series. What a ride it has been. Regarding the data on the old hard drive, I was mixing up two separate jobs in my notes: creating a raw image of the drive and mounting its FATX filesystem. [fatxfs](https://github.com/mborgerson/fatx) is the FUSE driver used to mount and browse FATX; it is not the tool that creates the raw disk image.

On this DVT4, the replacement drive ended up ATA-locked after the XDK 5849 recovery process, so I unlocked it with Chimp 261812 before working with it from Ubuntu. For block-level preservation or recovery, the tool I should have named here is GNU ddrescue. Ubuntu packages it as `gddrescue`, but the command itself is `ddrescue`. Once a raw image exists, fatxfs can then be used to mount and inspect the FATX filesystem.

Previous: [Xbox DVT4 Running UnleashX](/xbox-dvt4-running-unleashx/)

### Sources

- [fatx - FATX filesystem driver](https://github.com/mborgerson/fatx)
- [GNU ddrescue manual](https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html)
- [S-Config - Original Xbox Debug Console](https://www.s-config.com/original-xbox-debug-console/)
- [Archived ASSEMblergames - DVT4 slow at loading XDK Launcher](https://web.archive.org/web/20191124074925/https://assemblergames.com/threads/dvt4-slow-at-loading-xdk-launcher.58694/)
- [Archived ASSEMblergames - Cloning an Xbox hard drive](https://web.archive.org/web/20191108232644/https://assemblergames.com/threads/cloning-an-xbox-hard-drive.59787/)