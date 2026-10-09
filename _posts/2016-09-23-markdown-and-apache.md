---
title: "Markdown and Apache"
author: "Nix McRetro"
date: 2016-09-23T21:18:35.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks]
---

![2016-09-23](/assets/images/2016/img_0563.jpg)

More specifically: Markdown, Apache and the darknet. The old McRetro v2 onion address was loading, but Apache served the Markdown source files as plain text. Baby steps, at least the site was somewhat functional... right?

I was wondering whether an Apache module, Perl script, Ruby script or PHP script could translate it on demand. In hindsight, Apache serving a static `.md` file does not automatically transform Markdown into HTML: something needs to render or build it first. With Jekyll, another approach is to build the Markdown into the generated HTML site and have Apache serve that output.

A later clarification: the old `mcretro35qepy5cy.onion` address shown here was a Tor **v2** onion address. Tor retired that 16-character address format in 2021, so the historical link no longer works on the modern Tor network.

My GitHub Pages / Jekyll setup also turned out not to support all the fancy modifications I wanted from this website experiment. Maybe this was a bad idea! :-D

### Sources

- [Jekyll - Command Line Usage](https://jekyllrb.com/docs/usage/)
- [Tor Project - Onion Service version 2 deprecation timeline](https://blog.torproject.org/v2-deprecation-timeline/)
- [GitHub Docs - About GitHub Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)

### Related posts

- [The Birth of Eleventy7.net](/the-birth-of-eleventy7-net/)
- [McRetro.net Rebooted](/mcretro-net-rebooted/)
- [Take Back the Darknet (Part 1)](/take-back-the-darknet-part-1/)
