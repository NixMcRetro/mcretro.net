---
title: "Cloudflare CDN"
author: "Nix McRetro"
date: 2016-02-10T10:43:51.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [news]
---

![Cloudflare](/assets/images/2016/img_0455.jpg)

CDN means **Content Delivery Network**. They are marvellous things! Putting Cloudflare in front of this little Raspberry Pi web server sounded extremely useful.

For web records configured through Cloudflare's proxy, visitors connect to Cloudflare first rather than directly to the origin server. Cloudflare can then cache suitable content, filter traffic and reduce the number of requests that make it all the way back to the Raspberry Pi. That sounded particularly attractive after the bot traffic that had pushed me towards FlatPress before.

The setup involved moving the domain's DNS to Cloudflare and configuring the relevant web records to use its proxy. Hopefully that means a faster site and less work for my poor Raspberry Pi and equally poor upload connection.

I still wonder how much data all these giant internet intermediaries can see along the way.

Oh well! :)

### Sources

- [Cloudflare - Proxy DNS Records](https://developers.cloudflare.com/dns/proxy-status/)
- [Cloudflare - Protect Your Origin Server](https://developers.cloudflare.com/fundamentals/security/protect-your-origin-server/)

### Related posts

- [Moved (Back) to WordPress](/moved-back-to-wordpress/)
