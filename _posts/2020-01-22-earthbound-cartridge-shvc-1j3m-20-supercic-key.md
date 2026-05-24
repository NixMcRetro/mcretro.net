---
title: "EarthBound Cartridge (SHVC-1J3M-20) SuperCIC Key"
author: "Nix McRetro"
date: 2020-01-22T21:14:51.000+11:00
categories: [hacks, nintendo, programming]
---

![](/assets/images/2020/img_0643.jpg)

Ahh yes, trusty old EarthBound also known as:

**EARTH BOUND NTSC** 24Mbit (3MB) ROM and SRAM 64 kbit (8kB) FastROM English

**SHVC-1J3M-20** 1 indicates number of ROM chips. J means HiRom 3 means 8kB SRAM M is MAD-1 chip

After realising my CIC chip was missing from my EarthBound cart when trying to play on my non-modded Super Famicom, I knew I wasn’t in for a good time. I'm still not entirely sure what happened to my SuperCIC (lock) modded Super Nintendo.

Anyway the Super Nintendo / Super Famicom uses a lock (console) and key (cartridge) lockout system to make sure you are playing the right game on the right console. Who doesn’t enjoy region locking? Just about every consumer ever!

![](/assets/images/2020/img_0647.jpg)

I’d previously used the PIC16F630 (8-pin chips) for the lock (SuperCIC) but now it’s time to try the opposite, the key in the cartridge. Since mine is missing and I happened to have a spare PIC12F629, maybe this was meant to happen five years ago, who knows! So I went ahead and flashed [supercic-key.hex](https://sd2snes.de/blog/cool-stuff/supercic) to a PIC12F629 with the trusty TL866CS...

![](/assets/images/2020/img_0646.jpg)

and completed the soldering work...

![](/assets/images/2020/img_0644.jpg)

![](/assets/images/2020/img_0642.jpg)

and triple checked the pinout from [http://www.dbwbp.com/](http://www.dbwbp.com/index.php/10-electronic-projects/24-snes-cart-region-free-modification-replacing-cic-lockout-chip-with-supercic)...only to forget the CLK line!

![](/assets/images/2020/img_0645.jpg)

It was all worth it though as the Super Famicom booted up.

![](/assets/images/2020/img_0641.jpg)

Will it continue to work through the [copy](https://tcrf.net/EarthBound) [protections](http://media.earthboundcentral.com/2011/05/earthbounds-copy-protection/index.html)? Time will tell, sooner or later. Time will tell.

**Edit:** Found a note from myself about half a decade ago.

Remove CIC from Cartridge (otherwise lockout activates... why?) [http://www.cs.umb.edu/~bazz/snes/helpful/SuperCIC.html](https://web.archive.org/web/20190311181602/https://www.cs.umb.edu/~bazz/snes/helpful/SuperCIC.html) [http://forums.nesdev.com/viewtopic.php?t=8884](http://forums.nesdev.com/viewtopic.php?t=8884)

**References** [http://www.dbwbp.com/index.php/10-electronic-projects/24-snes-cart-region-free-modification-replacing-cic-lockout-chip-with-supercic](http://www.dbwbp.com/index.php/10-electronic-projects/24-snes-cart-region-free-modification-replacing-cic-lockout-chip-with-supercic) [https://sd2snes.de/blog/cool-stuff/supercic](https://sd2snes.de/blog/cool-stuff/supercic) [https://hackmii.com/2010/01/the-weird-and-wonderful-cic/](https://hackmii.com/2010/01/the-weird-and-wonderful-cic/) [http://nintendoallstars.w.interia.pl/romlab/cart\_types.htm](https://www.interia.pl/) [http://forums.nesdev.com/viewtopic.php?t=8289](http://forums.nesdev.com/viewtopic.php?t=8289) [http://www.snescentral.com/article.php?id=0909](http://snescentral.com/article.php?id=0909) [http://nintendoallstars.w.interia.pl/romlab/cart2epr.htm](https://www.interia.pl/) [http://web.archive.org/web/20120712033436/http://snesdev.romhack.de/game\_select.htm](http://web.archive.org/web/20120712033436/http://snesdev.romhack.de/game_select.htm) [http://www.mcumall.com/forum/topic.asp?TOPIC\_ID=4858](http://www.mcumall.com/forum/topic.asp?TOPIC_ID=4858) [https://web.archive.org/web/20161219041616/http://emu-docs.org/Super%20NES/Cartridges/sfcdev2.php](https://web.archive.org/web/20161219041616/http://emu-docs.org/Super%20NES/Cartridges/sfcdev2.php)
