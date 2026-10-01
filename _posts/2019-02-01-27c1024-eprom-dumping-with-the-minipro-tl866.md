---
title: "27C1024 EPROM Dumping with the MiniPro TL866"
author: "Nix McRetro"
date: 2019-02-01T07:42:35.000+11:00
categories: [guides, programming, youtube]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="ZfEeTAFjEug" %}

Ah yes, the ways of the 16-bit chip. Here we dump a Mega-CD BIOS several times to make sure we're getting consistent reads. It's also a good idea to reseat the chip between dumps, giving the socket contacts another chance to betray you if something isn't making a clean connection. Mind you, I was quite happy to see the TL866CS support the 27C1024.

At the time I was using the MiniPro software supplied for the programmer. There is also an open-source command-line tool called [minipro](https://gitlab.com/DavidGriffith/minipro/) for the TL866 family, which is particularly handy if you're using macOS or Linux rather than Windows.

Now that everyone has recovered from the NSFW Dreamcast controller unboxing video, it's back to business as usual. Unfortunately though... my studies are fast approaching. We'll see what I can get done before the end of February at any rate.
