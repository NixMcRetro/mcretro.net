---
title: "Moved (Back) to WordPress"
author: "Nix McRetro"
date: 2016-02-08T11:18:27.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [news, raspberry-pi]
---

![WordPress logo](/assets/images/2016/img_0453.jpg)

If you can see this post, it means I managed to get the website working sufficiently well under WordPress on a Raspberry Pi 2.

I'd used FlatPress for a while, but I was missing some of the great WordPress features... errr, well I mean:

- drop-down category and archive menus in the sidebar
- consistent sidebar integration across the website

I also wanted to put Cloudflare in front of the little Raspberry Pi web server, which was particularly appealing with only around **0.8 Mbps upload** here. That was a separate web-server choice rather than a feature requiring WordPress.

The next challenge was getting the onion-service mirror working properly again. WordPress kept redirecting requests back to the normal clearnet website.

Apparently changing blogging platforms three times was not enough.

### Related posts

- [New Blog Ready for Action - Dropplets](/new-blog-ready-for-action-dropplets/)
- [Blog Resurrection](/blog-resurrection/)
- [Cloudflare CDN](/cloudflare-cdn/)
