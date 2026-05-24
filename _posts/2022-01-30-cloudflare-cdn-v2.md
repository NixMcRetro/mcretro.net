---
title: "Cloudflare CDN v2"
author: "Nix McRetro"
date: 2022-01-30T09:41:48.000+11:00
categories: [linux, news]
---

![](/assets/images/2022/img_0811.jpg)

Those who are long-term subscribers would remember [way back in 2016](/cloudflare-cdn/) I tried to migrate to Cloudflare. I have been hesitant to migrate from my little home server to the big world wide CDN web. That move was made, again, around a week ago.

![](/assets/images/2022/img_0812.jpg)

The motivations behind this are primarily hosting of the [GeoCities Archive](/homepages/geocities) and the [ASSEMblerGames Archive](/). Cloudflare's [Always Online](https://blog.cloudflare.com/cloudflares-always-online-and-the-internet-archive-team-up-to-fight-origin-errors/) has been on my bucket list too long. Now it is a reality.

![](/assets/images/2022/img_0813.jpg)

Another great feature from Cloudflare is the [CSAM Scanning Tool](https://blog.cloudflare.com/the-csam-scanning-tool/). This will be great for GeoCities as there's too much data for me to sift through. I can then also alert other GeoCities mirrors if anything is found.

![](/assets/images/2022/img_0815.jpg)

One of the reasons I had troubles with Cloudflare SSL was that it would get stuck in redirect loops on my old setup. Since then, My understanding of Certbot and Let's Encrypt on Debian (Ubuntu) have come a long way. I have my own certificate going out to Cloudflare, then they have their own linking the end user to Cloudflare. In strict mode, no worries!

![](/assets/images/2022/img_0814.jpg)

As I now understand the underlying mechanism through trial and error, naturally, my precious onions work. The darknet lives on, backed by Cloudflare. Took a little while to get the configuration right but it works for now.

![](/assets/images/2022/img_0816.jpg)

Everything said, it means a faster website, better uptime (in theory), I get a neat dashboard with stats of how many bots / hackers are flooding my sites and we're ready for Ubuntu 22.04 LTS (Jammy Jellyfish) due around late April 2022. Loaded with ddclient 3.9.1 which has Cloudflare dynamic DNS (ddns) support baked in, it's going to be epic. Stay tuned!
