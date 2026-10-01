---
title: "Cloudflare CDN v2"
author: "Nix McRetro"
date: 2022-01-30T09:41:48.000+11:00
categories: [linux, news]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2022/img_0811.jpg)

Those who are long-term subscribers would remember [way back in 2016](/cloudflare-cdn/) I tried to migrate to Cloudflare. I have been hesitant to migrate from my little home server to the big world wide CDN web. That move was made, again, around a week ago.

![](/assets/images/2022/img_0812.jpg)

The motivations behind this are primarily hosting of the [GeoCities Archive](/homepages/geocities) and the [ASSEMblerGames Archive](/). Cloudflare's [Always Online](https://blog.cloudflare.com/cloudflares-always-online-and-the-internet-archive-team-up-to-fight-origin-errors/) was attractive because it could fall back to cached or Internet Archive copies of some static pages when the origin was unreachable. It was not a complete mirror of every page, but it suited the archival direction of the site.

![](/assets/images/2022/img_0813.jpg)

Another useful feature was Cloudflare's [CSAM Scanning Tool](https://blog.cloudflare.com/the-csam-scanning-tool/). It could compare content served through the Cloudflare cache against known CSAM lists, which was particularly useful for a huge inherited archive I could not manually inspect page by page.

![](/assets/images/2022/img_0815.jpg)

One reason I had trouble with Cloudflare SSL before was redirect loops in the old setup. I understand the model much better now: Cloudflare terminates the visitor's TLS connection at its edge, then makes a separate connection back to my origin. With Full (strict), the origin also needs to present a valid certificate for the requested hostname. My Let's Encrypt certificate handles that origin side.

![](/assets/images/2022/img_0814.jpg)

As I now understand the underlying mechanism through trial and error, naturally, my precious onions work. The clearnet site could sit behind Cloudflare while the `.onion` service remained a separate route to equivalent content. Cloudflare was not what made the onion service work; it protected and cached the public web side. Took a little while to get the configuration right but it works for now.

![](/assets/images/2022/img_0816.jpg)

Everything said, it means a faster website, better uptime (in theory), I get a neat dashboard showing automated and security-related traffic, and we're ready for Ubuntu 22.04 LTS (Jammy Jellyfish) due around late April 2022. Loaded with ddclient 3.9.1 which has Cloudflare dynamic DNS (DDNS) support baked in, it's going to be epic. Stay tuned!

### Sources

- [Cloudflare - Full (strict) SSL/TLS mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/)
- [Cloudflare - Always Online](https://developers.cloudflare.com/cache/how-to/always-online/)
- [Cloudflare - CSAM Scanning Tool](https://developers.cloudflare.com/cache/reference/csam-scanning/)
