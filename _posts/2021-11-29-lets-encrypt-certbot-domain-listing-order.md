---
title: "Let's Encrypt Certbot Domain Listing Order"
author: "Nix McRetro"
date: 2021-11-29T19:53:36.000+11:00
categories: [linux, news, raspberry-pi]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2021/img_0777.jpg)

Honestly, I didn't realise this, but Certbot uses the first domain supplied with `-d` as the certificate name unless you specify another name or an existing certificate changes that behaviour. All of the requested domains are still included as Subject Alternative Names, so putting `mcretro.net` first was cosmetic rather than giving it any special TLS priority.

 

```
sudo certbot --apache --no-redirect -d mcretro.net -d files.mcretro.net -d fishtankworld.mcretro.net -d frank.mcretro.net -d geocities.mcretro.net -d nature.mcretro.net -d pepper.mcretro.net -d photos.mcretro.net -d scifi.mcretro.net -d sonic.mcretro.net -d space.mcretro.net -d www.mcretro.net

```

Purely cosmetic, but good to know. In the future I'll probably end up getting Cloudflare more involved to help with caching. This would mean my server would connect to their server but then when anyone connects to my website it uses their ssl certificate. Whatever works I guess! 🙃

### Sources

- [Certbot documentation](https://eff-certbot.readthedocs.io/en/stable/man/certbot.html)
