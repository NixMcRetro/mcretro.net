---
title: "Amstrad Sega Mega PC Running Windows 95 OSR 2.5"
author: "Nix McRetro"
date: 2012-04-20T01:10:18.000+10:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="5w2H9iUdraI" %}

Now I see why minimum requirements are called minimum requirements. Microsoft's published Windows 95 minimum called for a 386DX or higher, and my Mega PC started with a 386SX, although I had been experimenting with the 486SLC board by this point. This thing runs like a beast on Windows 95.

I've managed to get the old Amstrad Sega Mega PC into a rather useful state, with both its PC and Mega Drive sides functioning. It's had a few changes along the way, including the upgraded motherboard, a network card and some attention to that delightful Dallas real-time clock arrangement. At least it now boots when I ask it to!

![](/assets/images/2012/img_0064.jpg)

For storage I'm using a 4 GB Disk on Module, although the BIOS doesn't particularly appreciate drives of that size. It appears to have the familiar 504 MB limitation, so I've used OnTrack's Dynamic Drive Overlay to make the additional capacity accessible. It's a rather ridiculous amount of storage for this old machine, but that's half the fun.

The DOM hasn't been completely trouble-free either. Its power connector managed to break, so I soldered the connection back together and secured it as best I could. At least the storage itself has no moving parts, which is one less mechanical thing waiting to cause trouble.

I've installed MS-DOS 7.1 and Windows 95 OSR 2.5, the final major OEM release of Windows 95. Windows 98 might be asking a bit too much from this setup, especially with the relatively modest processor. Even Windows 95 gives the machine plenty to think about, although it does eventually get where it's going.

![](/assets/images/2012/img_0065.jpg)

The network card is working nicely too. The first card I bought for the machine didn't cooperate, but thankfully I had another one available. With Netscape 4.8 installed, I can actually get the old Mega PC onto the internet. Well, after giving Netscape a little while to contemplate the meaning of life.

I managed to visit Google and even loaded my own website, although the page formatting was looking rather questionable in such an old browser. JavaScript errors, overlapping text and other delightful surprises. Nobody wanted to read all that anyway!

Gaming is still a much better reason to use this machine. Scorched Earth behaved well during testing, and I can load other DOS-era favourites such as Lemmings. There's even MIDI music playback, although I wouldn't expect the poor thing to be decoding MP3s while doing anything else useful.

![](/assets/images/2012/img_0066.jpg)

I think I will kick it back to Windows 3.11, or perhaps dual boot with two 2 GB partitions. It will be interesting to get the network cranking under Windows 3.11 so I can do some web browsing.

With a working PC side, a functioning Mega Drive section and a decent amount of solid-state storage, this is turning into quite a lovely old machine. I genuinely didn't expect to get it this far quite so quickly. There's still plenty more tinkering to be done, of course!

More to come one day, including a detailed video of how to mod the Dallas DS1287, DS1287A or DS12887 RTC chip to use an external battery pack. Should be fun! ;)

**Sources**

- [Microsoft Knowledge Base Archive - Windows 95 Installation Requirements](https://jeffpar.github.io/kbarchive/kb/138/Q138349/) - Microsoft's published minimum specifies a 386DX or higher processor and 4 MB of RAM, with a 486 recommended.
