---
title: "Cloning CompactFlash Cards with HDD Raw Copy Tool"
author: "Nix McRetro"
date: 2016-03-02T09:45:27.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, microsoft]
---

![](/assets/images/2016/img_0458.gif)

While dealing with XTIDE and CompactFlash cards, I've been using [HDD Raw Copy Tool](https://hddguru.com/software/HDD-Raw-Copy-Tool/) under Windows XP.

I could also have done this with `dd` under Linux or Mac OS, but this time I decided to use Windows XP inside a virtual machine.

Watch the animated GIF above to see the process. You get five seconds per frame. Use them wisely.

One important warning with any raw-disk cloning tool: double-check which device is the source and which is the destination before starting.

A raw clone does exactly what you ask, including happily overwriting the wrong drive if you select it by mistake.

![](/assets/images/2016/img_0459.bmp)

Maybe I just like that Prairie Wind background tile.

Either way, the useful part is that I now have a complete working backup. I can thoroughly destroy one XTIDE configuration and then restore it instead of starting over.

Dammit, that is a nice tile. 🙃
