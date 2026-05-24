---
title: "Let's Encrypt Certbot Domain Listing Order"
author: "Nix McRetro"
date: 2021-11-29T19:53:36.000+11:00
categories: [linux, news, raspberry-pi]
---

![](/assets/images/2021/img_0777.jpg)

Honestly, I didn't realise this, but it turns out the first domain listed when running [Certbot](https://certbot.eff.org) becomes the main domain on your ssl certificate. By rejiggering the order I was able to have mcretro.net displayed proudly.

 

```
sudo certbot --apache --no-redirect -d mcretro.net -d files.mcretro.net -d fishtankworld.mcretro.net -d frank.mcretro.net -d geocities.mcretro.net -d nature.mcretro.net -d pepper.mcretro.net -d photos.mcretro.net -d scifi.mcretro.net -d sonic.mcretro.net -d space.mcretro.net -d www.mcretro.net

```

Purely cosmetic, but good to know. In the future I'll probably end up getting Cloudflare more involved to help with caching. This would mean my server would connect to their server but then when anyone connects to my website it uses their ssl certificate. Whatever works I guess! 🙃
