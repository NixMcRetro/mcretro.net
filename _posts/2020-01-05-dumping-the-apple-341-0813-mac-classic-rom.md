---
title: "Dumping the Apple 341-0813 Mac Classic ROM"
author: "Nix McRetro"
date: 2020-01-05T21:59:02.000+11:00
categories: [apple]
---

![](/assets/images/2020/img_0640.jpg)

Ah yes, the old Apple 341-0813 ROM written onto a [TC534200P-F749 maskrom](/assets/uploads/TOSHS15431-1.pdf). Looks to be a match with the [27C400 EPROM](https://static1.squarespace.com/static/51f517f0e4b01da70d01ca2a/t/5454661be4b0f13e01c65a6b/1414817502296/M27C400.pdf). On the GQ-4X programmer the D27C4000 (aka uPD27C4000) also seems to be compatible. Then I remembered that particular model of chip from way back when I was given some [Japanese Sega Channels to dump](https://forums.sonicretro.org/index.php?threads/more-sega-channel-prototypes-dumped.25935/page-8#post-764315).

Anyway the Apple ROM dumps fed back 02FFEC64 via GQ-4X. Interestingly using the AM27C400 instead of the generic 27C400 or D27C4000 resulted in a bad dump with the same checksum of 0361A4B4. Only the correct dump that provided 02FFEC64 was good. ROM images from the internet need to be byteswapped before writing to the 27C400.

![](/assets/images/2020/img_0638.jpg)

The ROM that the dump it matched from the internet was the "A49F9914 - Classic (with XO ROMDisk).rom". I guess it was from a Mac Classic. Quite an interesting machine with [System 6.0.3 in the ROM](https://lowendmac.com/1990/mac-classic/).

![](/assets/images/2020/img_0639.jpg)

Thanks to [Mini vMac](https://www.gryphel.com/c/minivmac/) for allowing us to test the ROM easily and to the ROM creators for adding using Gary as padding.
