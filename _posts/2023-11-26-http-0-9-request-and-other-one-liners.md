---
title: "HTTP/0.9 Request and Other One-Liners"
author: "Nix McRetro"
date: 2023-11-26T04:42:21.000+11:00
categories: [modems, nature, raspberry-pi]
last_modified_at: 2026-10-12
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-12
  purpose: "fact-checking, sourcing, and editorial quality"
---

{% include youtube.html id="dcrzWnWNCVs" %}

A quick look at HTTP requests on really old browsers. HTTP/0.9, originally just HTTP, was a very simple protocol: essentially a one-line `GET` request with no version token and no request headers. Mozilla has [a great write-up on it](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP). One correction to my earlier theory though: the old browsers themselves were not necessarily speaking HTTP/0.9. My [Apache logs showed MacWeb, Mosaic and Netscape reaching the server as HTTP/1.0](/mac-web-browsers-from-the-90s-and-http-0-9/). Still, it was interesting trying to get a modern CDN - Cloudflare in my case - to play nicely with browsers that are now almost older than time itself.

 

{% include youtube.html id="Q-8ZjFnQQO4" %}

Aren't cicadas neat? I've got videos queued up for both my [Nix McRetro](https://www.youtube.com/@NixMcRetro) and [Super Nature World](https://www.youtube.com/@SuperNatureWorld) channels over the coming weeks or even months. However, due to cashflow issues owing to long-term unemployment, I'll soon be forced to move to a location with no internet.

![](/assets/images/2023/img_1227.jpg)

The rush is on to get as much video processed as possible and uploaded to YouTube. It also means this self-hosted website will temporarily disappear. The new internet connection poses a bunch of potential issues too, thanks to CG-NAT. Perhaps Cloudflare Tunnel, which I was still habitually calling Argo Tunnel, might be the answer? I'll see if I can work out a temporary solution to at least put a maintenance/planned downtime notice up. Absolute worst case, there is always [archive.org](https://web.archive.org/web/20231123091212/https://mcretro.net/). 🙃

### Sources

- [MDN - Evolution of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP)
- [RFC 1945 - Hypertext Transfer Protocol, including the HTTP/0.9 simple request](https://www.rfc-editor.org/rfc/rfc1945.html)

### Related posts

- [Downtime - Planned Maintenance](/downtime-planned-maintenance/)
- [Maintenance Complete - User Is Online!](/maintenance-complete-user-is-online/)
