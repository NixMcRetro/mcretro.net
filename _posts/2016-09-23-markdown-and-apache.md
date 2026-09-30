---
title: "Markdown and Apache"
author: "Nix McRetro"
date: 2016-09-23T21:18:35.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks]
---

![2016-09-23](/assets/images/2016/img_0563.jpg)

More specifically:

Markdown, Apache and the darknet.

The old McRetro v2 onion address was loading, but Apache had no idea what I expected it to do with the Markdown source files.

So it served them as plain text.

In hindsight that is perfectly normal.

Apache serving a static `.md` file does not automatically transform Markdown into HTML. Something needs to render or build the Markdown first.

With Jekyll, the cleaner model is to build the Markdown into the generated HTML site and then have Apache serve that output.

I was originally wondering whether an Apache module, Perl script, Ruby script or PHP script could translate it on demand.

Possible?

Probably.

Sensible for this setup?

Maybe not.

The old `mcretro35qepy5cy.onion` address shown in this post was also a Tor **v2** onion address. Tor retired that 16-character address format in 2021, so the historical link no longer works on the modern Tor network.

GitHub / Jekyll also turned out not to support all the fancy modifications I wanted from this website experiment.

Maybe this was a bad idea! :-D

### Related posts

- [The Birth of Eleventy7.net](/the-birth-of-eleventy7-net/)
- [McRetro.net Rebooted](/mcretro-net-rebooted/)
- [Take Back the Darknet (Part 1)](/take-back-the-darknet-part-1/)

### Sources

- [Tor Project - V2 Onion Services Deprecation](https://support.torproject.org/onionservices/v2-deprecation/)
