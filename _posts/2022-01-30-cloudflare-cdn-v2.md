---
title: "Cloudflare CDN v2"
author: "Nix McRetro"
date: 2022-01-30T09:41:48.000+11:00
categories: [linux, news]
last_modified_at: 2026-10-18
---

![](/assets/images/2022/img_0811.jpg)

Those who are long-term subscribers would remember that [way back in 2016](/cloudflare-cdn/) I tried putting my sites behind Cloudflare. I have been hesitant to let my little home server loose on the big world wide CDN web. That move was made, again, around a week ago, with the home server still doing the hosting behind it.

![](/assets/images/2022/img_0812.jpg)

The motivations behind this are primarily hosting the [GeoCities Archive](/homepages/geocities) and the [ASSEMblerGames Archive](/the-assembler-games-archive/). Cloudflare's [Always Online](https://blog.cloudflare.com/cloudflares-always-online-and-the-internet-archive-team-up-to-fight-origin-errors/) has been on my bucket list too long. Now it is a reality. If my home server is unreachable, it can serve cached or Internet Archive copies of some static pages. It won't be a complete mirror of everything, but that's a handy fallback for an archive.

![](/assets/images/2022/img_0813.jpg)

Another great feature from Cloudflare is the [CSAM Scanning Tool](https://blog.cloudflare.com/the-csam-scanning-tool/). It can compare hashes of cached images against known CSAM hashes, which is useful for an inherited GeoCities archive with far too much data for me to sift through. It won't check every kind of file or guarantee the whole archive is clear, but if it finds a match I can also alert other GeoCities mirrors.

![](/assets/images/2022/img_0815.jpg)

One of the reasons I had trouble with Cloudflare SSL was that it would get stuck in redirect loops on my old setup. Since then, my understanding of Certbot and Let's Encrypt on Debian (Ubuntu) has come a long way. Cloudflare handles the visitor's TLS connection at its edge, then makes a separate connection back to my home server. Full (strict) checks that the origin has a valid certificate for the requested hostname, which my Let's Encrypt certificate handles. In strict mode, no worries!

![](/assets/images/2022/img_0814.jpg)

As I now understand the underlying mechanism through trial and error, naturally, my precious onions work. The clearnet site could sit behind Cloudflare while the `.onion` service remained a separate route to equivalent content. Cloudflare was not what made the onion service work; it protected and cached the public web side. Took a little while to get the configuration right but it works for now.

![](/assets/images/2022/img_0816.jpg)

Everything said, it should mean a faster website, better uptime (in theory), and a neat dashboard showing what the bots and would-be hackers are throwing at my sites. We're ready for Ubuntu 22.04 LTS (Jammy Jellyfish) due around late April 2022. Loaded with ddclient 3.9.1 which has Cloudflare dynamic DNS (DDNS) support baked in, it's going to be epic. Stay tuned!

### Sources

- [Cloudflare - Full (strict) SSL/TLS mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/)
- [Cloudflare - Always Online](https://developers.cloudflare.com/cache/how-to/always-online/)
- [Cloudflare - Announcing the CSAM Scanning Tool, Free for All Cloudflare Customers](https://blog.cloudflare.com/the-csam-scanning-tool/)
- [ddclient - v3.9.1 source with Cloudflare support](https://raw.githubusercontent.com/ddclient/ddclient/v3.9.1/ddclient)

### Related posts

- [Cloudflare CDN](/cloudflare-cdn/)
- [The GeoCities Archive Rebuild Goes Live](/the-geocities-archive-rebuild-goes-live/)
- [The ASSEMbler Games Archive](/the-assembler-games-archive/)
- [Let's Encrypt Certbot Domain Listing Order](/lets-encrypt-certbot-domain-listing-order/)
