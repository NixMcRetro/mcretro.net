---
title: "Sega Dreamcast Broadband Adapter (BBA) Dumping"
author: "Nix McRetro"
date: 2016-08-26T10:19:25.000+10:00
categories: [hacks, sega]
---

![crazy\_taxi1](/assets/images/2016/img_0546.jpg)

The Dreamcast Broadband Adapter is one of the most awesome pieces of technology for a Sega Dreamcast system. Not only does it enable you to "download" your GD-ROMs and GD-Rs, it allows you to download your BIOS straight from your Dreamcast. You can then run a CRC32 via Terminal (on OS X) and compare with what data [Redump.org](http://redump.org) has. If it's a match, you have nothing special...

![crazy\_taxi2](/assets/images/2016/img_0547.jpg)

As I discovered with four "silvers", discs that were commercially pressed by Sega but had no labels printed / pressed onto them - a very late beta if you will. Anyway, I had Chu Chu Rocket, Space Channel 5, Crazy Taxi and Virtua Striker - all NTSC-U and none differ from the retail versions which is mighty boring. It never hurts to check though!

![virtua\_striker](/assets/images/2016/img_0549.jpg)

Virtua Striker wasn't in the database so I hit up a scene release from way back when and had a search with a hex editor for "SEGAKATANA" to find the header buried inside a CDI file. That gave me the details I needed to write off Virtua Striker as being retail.

![system\_disc](/assets/images/2016/img_0548.jpg)

And while I'm at it, here's some details on the Dreamcast System 2 Disc, both my copies (S-2XXX and S-3XXX) are identical! Best to use the XDP browser (as it's not entirely in Japanese) to set a static IP address so that httpd-ack can see the network properly too! :-)

**References** [http://redump.org](http://redump.org)
