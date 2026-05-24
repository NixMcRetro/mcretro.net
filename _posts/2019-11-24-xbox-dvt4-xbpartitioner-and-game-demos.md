---
title: "Xbox DVT4 XBpartitioner and Game Demos"
author: "Nix McRetro"
date: 2019-11-24T18:59:04.000+11:00
categories: [devkit, microsoft, youtube]
---

{% include youtube.html id="5LL4LrlK2DM" %}

And this video concludes the five or six parter on the Xbox DVT4 Development Console. What a ride it has been. Regarding data on the old hard drive... the original hard drive was imaged thanks to [fatxfs](https://github.com/mborgerson/fatx) under Ubuntu.

Interestingly while the recovery software for the Xbox "xdk 5849 (Xbox SDK Dec 2003).tar" allows installation on a new hard drive, it does lock the hard drive to prevent "easy" access via fatxfs. Once unlocked (using Chimp 261812), it imaged without any issues. From there data recovery could be run on the image under Ubuntu via gddrescue or ddrescue. I'll probably do another video showing the process later on.

**References**\
[https://www.s-config.com/original-xbox-debug-console/](https://www.s-config.com/original-xbox-debug-console/)\ [https://assemblergames.com/threads/dvt4-slow-at-loading-xdk-launcher.58694/](https://web.archive.org/web/20191124074925/https://assemblergames.com/threads/dvt4-slow-at-loading-xdk-launcher.58694/)\
[https://assemblergames.com/threads/cloning-an-xbox-hard-drive.59787/](https://web.archive.org/web/20191108232644/https://assemblergames.com/threads/cloning-an-xbox-hard-drive.59787/)