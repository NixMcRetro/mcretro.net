---
title: "Sega TeraDrive BIOS Dump"
author: "Nix McRetro"
date: 2012-11-07T21:08:36.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, sega]
---

![](/assets/images/2012/img_0355.jpg)

You can grab this dump from the [File Server](/goodies/). It was dumped using DEBUG.COM - see the mess link in the references for how this was done.

If anyone can tell me more about this system by analysing the above BIOS dumps, it would be most appreciated. If the link above is dead, let me know and I'll reupload them if you are interested. Just leave a comment below or contact me via the contact form.

While on the topic of TeraDrives, I found this [interesting tidbit](http://www.tvt.ne.jp/~luckyboy/room.html). In particular: MEM : 6.5MB \[2.5MB(SIMM)+4MB(ISA)\] ISAバスにはメモリ(I・O DATA-PIO-AX34F)を装着。

I could not read the Japanese when I first posted this, but the page is actually quite explicit. The owner had 6.5MB total RAM: 2.5MB from the TeraDrive's normal SIMM memory plus a 4MB I-O DATA PIO-AX34F card in an ISA slot. They were using QRAM, a 286-compatible memory manager, with that configuration. That has got me interested... I have a RAM card at work, so I'll need to get that to see if it can be addressed by the TeraDrives. If it is anything the TeraDrives need, especially the Model 2 which has no hard drive, it would be RAM. That got me wondering whether some of the extra memory could be turned into a RAM disk, much like my earlier Windows experiments. The ISA card itself is memory rather than a storage device, so actually booting software from it would require an appropriate RAM-disk or memory-manager arrangement.

[https://web.archive.org/web/20160306064823/https://www.mess.org/dumping/dump\_bios\_using\_debug](https://web.archive.org/web/20160306064823/https://www.mess.org/dumping/dump_bios_using_debug)


### Sources

- [Luckyboy - TeraDrive configuration](http://www.tvt.ne.jp/~luckyboy/room.html) - documents a TeraDrive with 6.5MB total RAM, including a 4MB I-O DATA PIO-AX34F ISA memory card and QRAM.
