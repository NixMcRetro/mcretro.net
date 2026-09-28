---
title: "Sega TeraDrive Hard Drive Interface IDE / ESDI / XTA"
author: "Nix McRetro"
date: 2012-06-24T12:26:38.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0211.jpg)

![](/assets/images/2012/img_0212.jpg)

![](/assets/images/2012/img_0213.jpg)

Above are some photos of a Sega TeraDrive hard drive. Sadly it looks like a simple interface is not possible natively by the looks. See the TeraDrive HD pinout spreadsheet on the [File Server](/files) for the differences in pins. At the time I wondered whether the apparent reduction in signal lines implied an 8-bit versus 16-bit distinction, but that observation alone was not enough to identify the interface. Sure you could possibly use an IDE controller ISA card, but where's the fun in that! The socket is there just waiting to be used. I just have to work it out.

If anyone stumbles upon this I apologise for the lack of success.

[Nemesis](https://www.exodusemulator.com), author of the Exodus Emulation Platform, believes it is possible as the microchips onboard the Sega TeraDrive match that of the Amstrad Mega PC. If anyone works it out, let me know, I'd be delighted to hear.

I pulled the data for the XTA / XT attachment from [this site](https://web.archive.org/web/20160326233143/http://1123581.tripod.com/id16.html), [this site](https://web.archive.org/web/20160326232740/http://nerdlypleasures.blogspot.com.au/2014/04/the-original-8-bit-ide-interface.html) and Vintage Computer Forums - [page one](https://web.archive.org/web/20160326233236/http://www.vcfed.org/forum/showthread.php?17101-Seeking-hard-drive-interface-pinout-for-PS-2-8530-quot-30-286-quot) and [page two.](https://web.archive.org/web/20160326233439/http://www.vcfed.org/forum/showthread.php?17101-Seeking-hard-drive-interface-pinout-for-PS-2-8530-quot-30-286-quot/page2)

![](/assets/images/2012/img_0210.jpg)

![](/assets/images/2012/img_0209.jpg)

![](/assets/images/2012/img_0214.jpg)

When I wrote this in 2012 I was trying to classify the TeraDrive interface as IDE, ESDI or XTA based on the information then available. Later IBM preservation work describes the closely related PS/2 Model 25 and Model 30 drives as proprietary direct-bus-attachment devices. They are not standard ESDI and are not ordinary 44-pin laptop IDE. The TeraDrive's confirmed compatibility with the IBM WDL-330P strongly links it to this unusual IBM storage family, but I would no longer describe the interface simply as ESDI or XTA. The 44-pin connector carries both data and power, including 5V and 12V rails.

Drives I tested successfully or identified as candidates for the TeraDrive include:
**20MB WDL-320**
- Candidate only. Likely used in Model 30, physical size unknown.

**20MB WDI-325Q**
- Candidate only. Physically too big for the TeraDrive as tested. Likely came with IBM PS/2 Model 30.

**20MB WD-325N**
- Candidate only. Seems to be 44 pin.
- Just as physically large as the WDI-325Q though.

**20MB ST-125L**
- Candidate only. Used in the IBM PS/2 286 Model 30, physical size unknown.
- IBM P/N: 6373538.
- Drive Type 36.

**30MB WDL-330PS**
- Historically reported candidate. I cannot confirm it firsthand.

**30MB WDL-330P**
- Confirmed working firsthand. I have a few of these and they work a charm in the TeraDrive.

**40MB ST-151L**
- Candidate only. Reported as a 40MB relative of the ST-125L.


### Sources

- [IBM Files - PS/2 Model 25](https://www.ibmfiles.com/pages/ps2model25.htm) - documents the proprietary direct-bus-attachment hard-drive arrangement used in early PS/2 systems and distinguishes it from standard IDE and ESDI.
