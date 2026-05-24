---
title: "Sega TeraDrive Hard Drive Interface IDE / ESDI / XTA"
author: "Nix McRetro"
date: 2012-06-24T12:26:38.000+10:00
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0211.jpg)

![](/assets/images/2012/img_0212.jpg)

![](/assets/images/2012/img_0213.jpg)

Above are some photos of Sega TeraDrive hard drive. Sadly it looks like a simple interface is not possible natively by the looks. See the TeraDrive HD pinout spreadsheet on the [File Server](/goodies/) for the differences in pins. There's half the data pins missing! 8-bit vs 16-bit perhaps? Sure you could possibly use an IDE controller ISA card - but where's the fun in that! The socket is there just waiting to be used. I just have to work it out.

If anyone stumbles upon this I apologise for the lack of success.

[Nemesis](http://www.exodusemulator.com), author of the Exodus Emulation Platform, believes it is possible as the microchips onboard the Sega TeraDrive match that of the Amstrad Mega PC. If anyone works it out, let me know, I'd be delighted to hear.

I pulled the data for the XTA / XT attachment from [this site](https://web.archive.org/web/20160326233143/http://1123581.tripod.com/id16.html), [this site](https://web.archive.org/web/20160326232740/http://nerdlypleasures.blogspot.com.au/2014/04/the-original-8-bit-ide-interface.html) and Vintage Computer Forums - [page one](https://web.archive.org/web/20160326233236/http://www.vcfed.org/forum/showthread.php?17101-Seeking-hard-drive-interface-pinout-for-PS-2-8530-quot-30-286-quot) and [page two.](https://web.archive.org/web/20160326233439/http://www.vcfed.org/forum/showthread.php?17101-Seeking-hard-drive-interface-pinout-for-PS-2-8530-quot-30-286-quot/page2)

![](/assets/images/2012/img_0210.jpg)

![](/assets/images/2012/img_0209.jpg)

![](/assets/images/2012/img_0214.jpg)

"XTA (XT Attachment) - Rarely used implementation of IDE with an integrated 8 bit XT controller." It only seemed to be used on the IBM 286 models of the PS/2 Model 25 and 30, and of course our beloved Sega TeraDrive.Ultimately though the Sega TeraDrive has a ESDI style connector with 44 pins that carry both 5V and 12V rails over a few cables (probably to stop them melting).

Drives that seem to or are likely to work with the TeraDrive include: **20MB WDL-320** - Likely used in Model 30, physical size unknown. **20MB WDI-325Q** - Physically too big. Likely came with IBM PS/2 Model 30. **20MB WD-325N** - Seems to be 44 pin - just as huge as the WDI-325Q though. **20MB ST-125L** - Used in the IBM PS/2 286 Model 30, physical size unknown. IBM P/N: 6373538. Drive Type 36. **30MB WDL-330PS** - Rumoured to be present in TeraDrives. I cannot confirm firsthand. **30MB WDL-330P** - Perfect, I have a few of these and they work a charm in the TeraDrive. **40MB ST-151L** - This is a 40MB version of the ST-125L above apparently.
