---
title: "Downtime - Planned Maintenance"
author: "Nix McRetro"
date: 2023-11-28T18:20:51.000+11:00
categories: [news]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2023/img_1229.jpg)

Here comes the downtime. As my NBN connection regresses to 4G home internet, expect this site to be down for at least a few weeks while I get my head around carrier-grade network address translation, or CG-NAT for short. Unlike the NAT in my own router, this one lives in the carrier's network and I don't control the public IPv4 mapping.

![](/assets/images/2023/img_1228.jpg)

I initially thought it should be as simple as pressing a few different buttons to what I normally press when installing ddclient on my server. Not quite. `ddclient` can keep a DNS record pointed at a changing public address, but it cannot punch an inbound connection through a carrier's NAT that I don't control. I couldn't really test alternatives until the new network was up and running. I guess stay tuned and in the meantime enjoy this page as served by [Cloudflare's Always Online](https://www.cloudflare.com/en-au/always-online/) service. Until we next meet, be excellent to each other and to other creatures too! 🙃

Next: [Maintenance Complete - User Is Online!](/maintenance-complete-user-is-online/)

### Sources

- [RFC 6888 - Common Requirements for Carrier-Grade NATs](https://www.rfc-editor.org/info/rfc6888/)
- [Cloudflare - Always Online](https://developers.cloudflare.com/cache/how-to/always-online/)

🪲 🐌 🪳 🐟 🦎 🦗
