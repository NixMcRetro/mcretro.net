---
title: "MiSTer ao486 Core - Dial-up Modem Testing via VoIP"
author: "Nix McRetro"
date: 2023-08-24T10:35:30.000+10:00
categories: [ibm-pc, linux, youtube]
last_modified_at: 2026-10-12
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-12
  purpose: "fact-checking, sourcing, and editorial quality"
---

{% include youtube.html id="0JuVKWFa0yg" %}

First thing I should probably note: this footage is from relatively early in my VoIP testing, back in 2021. I didn't use anything fancy apart from the VoIP box, some phone cables and good luck. Coupled with [Doge Microsystems' really great dial-up pool guide](https://dogemicrosystems.ca/wiki/Dial-up_pool), of course.

![](/assets/images/2023/img_1126.jpg)

It does get to a point where you stop and ask yourself, "How many modems are too many modems?" I think I've worked out the answer. They had a very limited use case for me: testing them while testing [the GeoCities Archive](/homepages/geocities). With that work mostly behind me, the modems don't really serve a purpose.

![](/assets/images/2023/img_1127.jpg)

That said, I still have plenty of modem video footage to process. Most of the modems have made their way to the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au/) after having their capacitors replaced.

![](/assets/images/2023/img_1128.jpg)

In the end, the computer side of this setup can be recreated in an FPGA project like the MiSTer, while the modems remain real hardware. If that isn't powerful enough for you, there's always software-based emulation. It takes up a fraction of the space, which is great for someone like me. 😄

### Sources

- [MiSTer-devel - ao486 core](https://github.com/MiSTer-devel/ao486_MiSTer)
