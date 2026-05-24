---
title: "Sega Mega Drive Jailbars: A Filler Video"
author: "Nix McRetro"
date: 2021-09-05T14:19:09.000+10:00
categories: [youtube]
---

{% include youtube.html id="JbZ_0qu1i1w" %}

It's impressive that with only 17 seconds of footage I was able to create this, I want to say masterpiece, but that might be blowing my own horn! While this may have been a filler video, we are still working on things in the backend.

We're on our way. [The GeoCities Archive](http://geocities.mcretro.net) is coming along. A few key notes: - Non-SSL encrypted (unencrypted) by design - Script to "shuffle" site to visit - Run "natively" in Windows 9x - Run via physical dial-up modems connected over an SPA112 - Livestream via MiSTer (DE10-Nano) - Expose to _the darknet_

At this stage, though I'm still trying to decode and piece together the structure of GeoCities. The torrent, made way back in 2011, took long enough to unpack all the case-sensitive folders. I only discovered they were case sensitive after the torrent wouldn't verify, repeatedly. Other things on the to-do list include: - Delete any illegal objectionable content (filename search, needs to be indexed) - Fix broken links (rewrite engine perhaps?)

![](/assets/images/2021/img_0744.jpg) In other news, Docker had been driving me mad with segmentation faults due to [this issue](https://github.com/docker-library/php/issues/1176). I don't want to run amd64 images on arm64 - the problem is most of my images are built upon 20.04 LTS, not 18.04 or 22.04 (we're not there yet). I guess I'll have to look for alternatives once Mac OS 12 Monterey is released. As a workaround I was able to stop the (daily) forced snooze nags for Docker updates by adding the following custom rule to AdGuard Home: `||desktop.docker.com^$important`

{% include youtube.html id="RnrVCqL5rdk" %}

I'll keep chipping away on the GeoCities website for the time being. I can probably move all my retrojunkie.net subfolders into a subdomain structure now too. I had completely forgotten how to do all these things! Until next time, Everybody's Golf!

**Update 2021-12-05**
Docker has been updated and I've swapped to images that are based off Bullseye (Debian 11) which fixes the crashing under ARM native images. No more SIGSEGVs for me. I am also glad to noted that Docker gives the option to install updates again rather than forcing them on non-businesses. Thank you Docker!
