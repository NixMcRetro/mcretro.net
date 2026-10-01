---
title: "Sega Mega Drive Jailbars: A Filler Video"
author: "Nix McRetro"
date: 2021-09-05T14:19:09.000+10:00
categories: [youtube]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="JbZ_0qu1i1w" %}

It's impressive that with only 17 seconds of footage I was able to create this, I want to say masterpiece, but that might be blowing my own horn! While this may have been a filler video, we are still working on things in the backend.

We're on our way. [The GeoCities Archive](/homepages/geocities) is coming along. The plan was plain HTTP by design for old browsers, a shuffle script for wandering through random sites, native Windows 9x-era browser support, physical dial-up through an SPA112, MiSTer livestreaming, and an onion-service route for extra silliness.

At this stage I was still trying to decode and piece together GeoCities' structure. The Archive Team torrent was published in October 2010, and it took long enough just to unpack all the case-sensitive folders. I discovered the case sensitivity after the torrent repeatedly refused to verify.

The to-do list was still fairly grim: find and remove objectionable material, index filenames, and work out whether broken links could be repaired server-side.

![](/assets/images/2021/img_0744.jpg) In other news, Docker had been driving me mad with segmentation faults due to [this issue](https://github.com/docker-library/php/issues/1176). I don't want to run amd64 images on arm64 - the problem is most of my images are built upon 20.04 LTS, not 18.04 or 22.04 (we're not there yet). I guess I'll have to look for alternatives once Mac OS 12 Monterey is released. As a workaround I was able to stop the (daily) forced snooze nags for Docker updates by adding the following custom rule to AdGuard Home: `||desktop.docker.com^$important`

{% include youtube.html id="RnrVCqL5rdk" %}

I'll keep chipping away on the GeoCities website for the time being. I can probably move all my retrojunkie.net subfolders into a subdomain structure now too. I had completely forgotten how to do all these things! Until next time, Everybody's Golf!

By 5 December 2021 Docker had been updated and I had moved to Bullseye (Debian 11) based images, which stopped the ARM-native crashes. Docker also gave me the choice to install updates again rather than forcing the old snooze cycle. No more SIGSEGVs for me. Thank you Docker!

### Sources

- [Archive Team - GeoCities Project](https://wiki.archiveteam.org/index.php/GeoCities_Project)
