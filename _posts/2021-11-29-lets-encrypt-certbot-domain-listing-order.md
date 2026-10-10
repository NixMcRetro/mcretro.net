---
title: "Let's Encrypt Certbot Domain Listing Order"
author: "Nix McRetro"
date: 2021-11-29T19:53:36.000+11:00
categories: [linux, news, raspberry-pi]
last_modified_at: 2026-10-11
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-11
  purpose: "fact-checking, sourcing, and editorial quality"
---

![](/assets/images/2021/img_0777.jpg)

Honestly, I didn't realise this, but after rejiggering the domain order there was `mcretro.net`, displayed proudly in Safari's certificate viewer. That display is separate from Certbot's internal certificate name, which defaults to the first `-d` domain unless I specify `--cert-name` or reuse an existing certificate. All the requested domains are included as Subject Alternative Names. Putting my favourite first didn't give it any special TLS priority.

```
sudo certbot --apache --no-redirect -d mcretro.net -d files.mcretro.net -d fishtankworld.mcretro.net -d frank.mcretro.net -d geocities.mcretro.net -d nature.mcretro.net -d pepper.mcretro.net -d photos.mcretro.net -d scifi.mcretro.net -d sonic.mcretro.net -d space.mcretro.net -d www.mcretro.net

```

Purely cosmetic, but good to know. In the future I'll probably end up getting Cloudflare more involved to help with caching. With proxying enabled, visitors would connect to Cloudflare and see its TLS certificate; Cloudflare would then connect to my server when it needed to fetch content. That server-side connection is a separate part of the setup. Whatever works I guess! 🙃

### Sources

- [Certbot - Command-line options and certificate naming](https://eff-certbot.readthedocs.io/en/stable/man/certbot.html)
- [Cloudflare - SSL/TLS concepts, edge certificates and origin connections](https://developers.cloudflare.com/ssl/concepts/)
