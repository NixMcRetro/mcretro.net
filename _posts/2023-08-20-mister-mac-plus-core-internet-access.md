---
title: "MiSTer Mac Plus Core - Internet Access"
author: "Nix McRetro"
date: 2023-08-20T09:07:02.000+10:00
categories: [apple, modems, youtube]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="W9TQBRUclFc" %}

Last year we were playing around with the Macintosh Classic, thanks to [Pendleton115](https://web.archive.org/web/20230904050034/http://pendleton115.net/). We wanted to get it internet-ready, but the old browsers were fighting my modern hosting setup. At the time I blamed HTTP/0.9; [later testing](/mac-web-browsers-from-the-90s-and-http-0-9/) showed MacWeb, Mosaic and Netscape reaching Apache as HTTP/1.0. The MiSTer has a Mac Plus core, and the original Plus gives us the right sort of starting point: Motorola 68000 at a whopping 8MHz, up to 4MB RAM, with System 7.5.5 as the last supported system version.

{% include youtube.html id="eApRV4d1zwg" %} You can see more of the emulation settings in the above live stream from [McRetro Gaming](/channels). Thanks to the MiSTer settings, we can switch the core to the Macintosh SE ROM and select a 68020 at 16MHz, with the same 4MB of RAM. That is a MiSTer configuration rather than a stock Macintosh SE specification, but it gave the old software some extra legs. We were still limited by the paltry hardware and contemporary web browser support. Maybe asking a 1980s computer architecture to browse the 2020s web is a little unfair!

![](/assets/images/2023/img_1110.jpg)

Another alternative is to run System 7.5 through the Amiga core and [ShapeShifter](http://shapeshifter.cebix.net), which might sound familiar to some. However I (mis)recognise it best from [SheepShaver](http://sheepshaver.cebix.net). Turns out they were both initially created by the same person, Christian Bauer. However, I didn't know the ins and outs of AmigaOS well enough to get it to dial-out. That said, there's definitely potential there.

{% include youtube.html id="l7z3d2ErFvU" %}

Here's a closer look at the TradeWave MacWeb 2.0 browser. It can load websites provided they are very basic. I was being too harsh when I called anything beyond HTML 1.0 too complicated: MacWeb had forms support in 1994 and even supported HTML 2.0 image inputs during development. Modern pages were still far beyond its comfort zone. That said, at the time [retrojunkie.net](https://retrojunkie.net) was configured not to use any proxy or CDN through Cloudflare and it worked OK. I was impressed I was able to work that out on my little Apache web server!

![](/assets/images/2023/img_1111.jpg)

The MiSTer, powered by the DE10-nano, is great for being able to output to HDMI and VGA using the analog board add-on. This way I can enjoy the VGA screen resolution on a 5:4 screen with a giant System 7.5 staring at me in the, not-far-away-enough distance. But why do I only have one hard drive mounted with the option for two drives to be mounted?

![](/assets/images/2023/img_1112.jpg)

Enter Big Bob. Big Bob was a great hard drive image we made up for the Macintosh Classic. However, the Mac Plus core at the time seemed to like corrupting drives around reboot. I wondered if we were using a drive that was too large for the system or something along those lines. Interestingly, a 2025 MiSTer issue later documented VHD corruption after reboot when using the SE ROM with 68010 or 68020 CPU modes. That is very consistent with what I was seeing here, although it does not prove that was the exact cause of Big Bob's demise. Big Bob will be missed but lives on in our hearts. ❤️

### Sources

- [Apple - Macintosh Plus: Technical Specifications](https://support.apple.com/en-au/112183)
- [MiSTer-devel - MacPlus_MiSTer](https://github.com/MiSTer-devel/MacPlus_MiSTer)
- [MacWeb 0.98 alpha release announcement, 1994](https://www.krsaborio.net/internet/research/www/1994-q3/0468.html)
- [MiSTer MacPlus issue 15 - VHD corruption after reboot](https://github.com/MiSTer-devel/MacPlus_MiSTer/issues/15)
