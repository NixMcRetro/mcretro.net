---
title: "EarthBound Cartridge (SHVC-1J3M-20) SuperCIC Key"
author: "Nix McRetro"
date: 2020-01-22T21:14:51.000+11:00
categories: [hacks, nintendo, programming]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2020/img_0643.jpg)

Ahh yes, trusty old EarthBound also known as:

**EARTH BOUND NTSC**  
24 Mbit (3 MB) ROM  
64 kbit (8 KB) SRAM  
HiROM / FastROM  
English

**SHVC-1J3M-20**  
1 = one ROM chip  
J = HiROM  
3 = 64 kbit / 8 KB SRAM  
M = MAD-1 family decoder

After realising my CIC chip was missing from my EarthBound cart when trying to play on my non-modded Super Famicom, I knew I wasn’t in for a good time. I'm still not entirely sure what happened to my SuperCIC (lock) modded Super Nintendo.

Anyway the Super Nintendo / Super Famicom uses a lock (console) and key (cartridge) lockout system to make sure you are playing the right game on the right console. Who doesn’t enjoy region locking? Just about every consumer ever!

![](/assets/images/2020/img_0647.jpg)

I’d previously used the 14-pin PIC16F630 for the console-side SuperCIC lock, but now it was time to try the opposite: a SuperCIC key in the cartridge. Since my original CIC was missing and I happened to have a spare 8-pin PIC12F629, maybe this was meant to happen five years ago. Who knows! So I went ahead and flashed [supercic-key.hex](https://sd2snes.de/blog/cool-stuff/supercic) to the PIC12F629 with the trusty TL866CS...

![](/assets/images/2020/img_0646.jpg)

and completed the soldering work...

![](/assets/images/2020/img_0644.jpg)

![](/assets/images/2020/img_0642.jpg)

and triple checked the pinout from [http://www.dbwbp.com/](http://www.dbwbp.com/index.php/10-electronic-projects/24-snes-cart-region-free-modification-replacing-cic-lockout-chip-with-supercic)...only to forget the CLK line!

![](/assets/images/2020/img_0645.jpg)

It was all worth it though as the Super Famicom booted up.

![](/assets/images/2020/img_0641.jpg)

Will it continue to work through the [copy](https://tcrf.net/EarthBound) [protections](http://media.earthboundcentral.com/2011/05/earthbounds-copy-protection/index.html)? Time will tell, sooner or later. Time will tell.

Finding an old note from myself later reminded me why the donor CIC had disappeared in the first place. Back in 2013 I had been experimenting with removing the original cartridge CIC where its region no longer matched the replacement game image. That earlier experiment is documented in [SNES SuperCIC Switchless Modchip - More Testing (Part 3)](/snes-supercic-switchless-modchip-more-testing-part-3/). This time the SuperCIC key gave the cartridge its own compatible CIC implementation.

### References

- [DBWBP - SNES cartridge region-free modification / SuperCIC key](http://www.dbwbp.com/index.php/10-electronic-projects/24-snes-cart-region-free-modification-replacing-cic-lockout-chip-with-supercic)
- [SuperCIC firmware and documentation](https://sd2snes.de/blog/cool-stuff/supercic)
- [HackMii - The Weird and Wonderful CIC](https://hackmii.com/2010/01/the-weird-and-wonderful-cic/)
- [ROM Laboratory - cartridge types (Wayback history)](https://web.archive.org/web/*/http://nintendoallstars.w.interia.pl/romlab/cart_types.htm)
- [NesDev thread 8289 (archived)](https://web.archive.org/web/20231014212226/https://forums.nesdev.org/viewtopic.php?t=8289)
- [SNES Central - cartridge PCB information](https://snescentral.com/article.php?id=0909)
- [ROM Laboratory - cartridge to EPROM information (archived)](https://web.archive.org/web/20130914200141/http://nintendoallstars.w.interia.pl/romlab/cart2epr.htm)
- [SNESDev - game select information (archived)](https://web.archive.org/web/20120712033436/http://snesdev.romhack.de/game_select.htm)
- [MCUmall forum topic 4858 (Wayback history)](https://web.archive.org/web/*/http://www.mcumall.com/forum/topic.asp?TOPIC_ID=4858)
- [Emu-Docs - Super NES cartridge documentation (archived)](https://web.archive.org/web/20161219041616/http://emu-docs.org/Super%20NES/Cartridges/sfcdev2.php)
- [SuperCIC notes from cs.umb.edu (archived)](https://web.archive.org/web/20190311181602/https://www.cs.umb.edu/~bazz/snes/helpful/SuperCIC.html)
- [NesDev thread 8884 (archived)](https://web.archive.org/web/20231014233041/https://forums.nesdev.org/viewtopic.php?t=8884)