---
title: "Sega Saturn Victor RG-JX2(Y) VA9 Region Issues"
author: "Nix McRetro"
date: 2016-08-20T07:40:18.000+10:00
categories: [repairs, sega]
---

![IMG\_0808 2](/assets/images/2016/img_0540.jpg)

So how did I get to this point, error after error "Cartridge unsuitable for this system" or "Game disk unsuitable for this system". Stop whining already Segata! Plus instead of Japanese text, it would prompt which language to enter each time it was powered on (like it didn't know).

It looks like by removing whatever the original modchip, switchless at 60Hz only perhaps, stopped the console from recognising itself as a "proper" region, hardcoding of NTSC-U, NTSC-J and PAL maybe? No idea to be sure.

What gave that away was the "Cartridge unsuitable for this system" with an Action Replay and GameShark, which meant I'd have no chance getting a disc working either. So unsurprisingly that's why I was also getting "Game disk unsuitable for this system" on NTSC-U, NTSC-J and PAL retail discs, although audio CDs still worked well as they are not region locked.

A gentleman on [Assembler Games](https://web.archive.org/web/20191206184256/https://assemblergames.com/), Nopileus, cracked the code to work out which exact jumpers needed to be bridged. Bridging JP6 and JP11 with some bare kynar wire... so just... wire, and it was back to Japanese and reading GameShark / Action Replays without a hitch, and played CD-R backups with no issue. Perfect!

![before](/assets/images/2016/img_0542.jpg)

![after](/assets/images/2016/img_0541.jpg)

The above jumpers (red annotations and green links) are what makes a Japanese Saturn Japanese.

Another technically minded gentleman, TriMesh, threw in a bit of info about the possible regions, 14 usable with an additional two "do not use" regions for 16 total. Who knows, I could have been using one of those! More information on this can be found at [Assembler Games](https://web.archive.org/web/20191113141823/https://assemblergames.com/threads/sega-saturn-victor-va9-modchip-mess.62691/).

And thanks to the following websites for documenting their findings! [Sega Saturn UK](https://segasaturngroup.proboards.com/thread/1393/game-disk-unsuitable-system) [Wolfsoft](http://wolfsoft.de/wordpress/?p=354) [KNZL](https://knzl.at/saturnmod/) (Creator of the “switchless mod”)
