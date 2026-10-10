---
title: "27C1024 EPROM Dumping with the MiniPro TL866"
author: "Nix McRetro"
date: 2019-02-01T07:42:35.000+11:00
categories: [guides, programming, youtube]
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
---

{% include youtube.html id="ZfEeTAFjEug" %}

Ah yes, the ways of the 16-bit chip. Here we dump a Mega-CD BIOS several times to make sure we're getting consistent reads. It's also a good idea to reseat the chip between dumps, giving the socket contacts another chance to betray you if something isn't making a clean connection. Mind you, I was quite happy to see the TL866CS support the 27C1024.

Now that everyone has recovered from the NSFW Dreamcast controller unboxing video, it's back to business as usual. Unfortunately though... my studies are fast approaching. We'll see what I can get done before the end of February at any rate.

**2021-08-23 update:** You can also use the open-source command-line tool [minipro](https://gitlab.com/DavidGriffith/minipro/) with the TL866 family. It's separate from the MiniPro software supplied with the programmer. Great news for those of us on a Mac or Linux-powered machine!

### Sources

- [David Griffith - minipro: open-source TL866 programmer software](https://gitlab.com/DavidGriffith/minipro/)
