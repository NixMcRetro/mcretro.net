---
title: "dd Progress Bar in Mac OS"
author: "Nix McRetro"
date: 2022-11-17T03:21:54.000+11:00
categories: [apple, guides]
---

![](/assets/images/2022/img_0989.jpg)

I've been using dd to clone some disks on occasion recently, usually when they are non-native to Mac OS and let's be honest, Mac OS isn't Linux and Linux isn't Unix. They all have some things in common though. And those that don't can be enabled with [brew.sh](https://brew.sh). Now, thanks to [davejansen.com](https://davejansen.com/dd-with-progress-indication-on-macos/), I won't ever have to guess how long is remaining on a disk level clone.

The power of [Pipe Viewer (pv)](https://formulae.brew.sh/formula/pv).

```
brew install pv
```

```
sudo dd if=/dev/rdiskX bs=1m | pv -s 2000G | sudo dd of=/dev/rdiskY bs=1m
```

And now I have some idea of where my clones are up to. Consider it noted down for future reference! 🙂
