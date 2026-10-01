---
title: "HTTP/0.9 Request and Other One-Liners"
author: "Nix McRetro"
date: 2023-11-26T04:42:21.000+11:00
categories: [modems, nature, raspberry-pi]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="dcrzWnWNCVs" %}

A quick look at HTTP requests on really old browsers. HTTP/0.9, originally just HTTP, was a very simple protocol: essentially a one-line `GET` request with no version token and no request headers. Mozilla has [a great write up on it](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP). One correction to my earlier theory though: the old browsers themselves were not necessarily speaking HTTP/0.9. In my later Apache logs I caught MacWeb, Mosaic and Netscape reaching the server as HTTP/1.0. Still, it was interesting trying to get a modern CDN - Cloudflare in my case - to play nicely with browsers that are now almost older than time itself.

 

{% include youtube.html id="Q-8ZjFnQQO4" %}

Aren't cicadas neat? I've got videos queued up for both my [Nix McRetro](https://www.youtube.com/@NixMcRetro) and [Super Nature World](https://www.youtube.com/@SuperNatureWorld) channels over the coming weeks or even months. However, due to cashflow issues owing to long-term unemployment, I'll soon be forced to move to a location with no internet.

![](/assets/images/2023/img_1227.jpg)

The rush is on to get as much video processed as possible and uploaded to YouTube. It also means that this website will temporarily cease to exist as it is self-hosted. New internet poses a bunch of potential issues too with CG-NAT. Perhaps Cloudflare Tunnel, which I was still habitually calling Argo Tunnel, might be the answer to that? I'll see if I can work out a temporary solution to at least put a maintenance/planned downtime notice up. Absolute worst case there is always [archive.org](https://web.archive.org/web/20231123091212/https://mcretro.net/). 🙃

Next: [Downtime - Planned Maintenance](/downtime-planned-maintenance/)
