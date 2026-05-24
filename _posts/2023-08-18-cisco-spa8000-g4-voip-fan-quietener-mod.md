---
title: "Cisco SPA8000-G4 VoIP Fan Quietener Mod"
author: "Nix McRetro"
date: 2023-08-18T08:43:38.000+10:00
categories: [hacks, repairs, youtube]
---

{% include youtube.html id="h9isDzHVapY" %}

I really don't like small fans. Dreamcast, looking at you. Then again, I've added small fans to things in the past. Right [Netgear DG834Gv5](/netgear-dg834gv5-adsl2-modem-router-cooling-mod/)? Above we have the smash hit follow up to the [Cisco SPA8000-G4 post-recap video](/cisco-spa8000-g4-8-port-ip-telephony-gateway-recap-overview/) from... **_\*checks notes\*_** eight months ago. Whoops! 😅

![](/assets/images/2023/img_1099.jpg)

This SPA8000 was originally slated to replace my Linksys PAP2T. However, I ended up moving to the similar Cisco SPA112. The SPA8000 was overkill for my needs - testing some dial-up modems. It wasn't ever going to hang around for long. Since this will probably be the last post on this device, I probably should tie up some lose ends.

![](/assets/images/2023/img_1101.jpg)

First up is the capacitor replacement. These capacitors must have been rated with Nichicon-levels of life. Because the 10V and 16V both had the same form factor in the Panasonic FR series. Which leads me to believe that these capacitors were either not both 470uF and 10V. I was able to get around it be elevating the capacitors slightly off the PCB.

![](/assets/images/2023/img_1102.jpg)

Here's the fan controller that was used. Relatively simple and cheap. I swapped out the 50V Sanyo for a 25V Panasonic capacitor to fit flush with the PCB. Not ideal as you want it to have room to vent, but I knew the input voltage wouldn't exceed the input voltage of where the fan wires came from.

![](/assets/images/2023/img_1103.jpg)

Some of the case needed to be dremelled to fit the potentiometer through. Kapton tape on the underside of the controller PCB to prevent shorts.

![](/assets/images/2023/img_1105.jpg)

Doesn't look too bad with the dial attached.

![](/assets/images/2023/img_1104.jpg)

And you can hardly even notice it from the front.

![](/assets/images/2023/img_1106.jpg)

I mean it looks neat, that's not like me at all. I'd want the fan to be on at all times - even at the lowest setting for peace of mind. Even after this modification I still found the fan, at the lowest speed, to be noisy. Probably that grill blocking airflow and increasing turbulence. Definitely a deciding factor in moving to the Cisco SPA112 instead - no fan!

![](/assets/images/2023/img_1100.jpg)

The parts listed below are manufacturer part numbers. The formatting isn’t too web friendly, copy the raw text out and paste it into a non-rich text editor (Such as Notepad or TextEdit – in plain text mode) and you’ll probably be fine. 😄  

```
Location	Value	Voltage		Dimensions				Lead Spacing	Notes
EC1/EC2		1500uF	16V			12.5mm (h) x 12.5mm (w)	5mm				EEUFR1C152	Panasonic FR Series

VC353		27uF	100V		12.5mm (h) x 8mm (w)	3.0-3.5mm		EEUFS2A270	Panasonic FS Series
VC333		27uF	100V		12.5mm (h) x 8mm (w)	3.0-3.5mm		As above
VC246		27uF	100V		12.5mm (h) x 8mm (w)	3.0-3.5mm		As above
VC266		27uF	100V		12.5mm (h) x 8mm (w)	3.0-3.5mm		As above
VC139		27uF	100V		12.5mm (h) x 8mm (w)	3.0-3.5mm		As above
VC119		27uF	100V		12.5mm (h) x 8mm (w)	3.0-3.5mm		As above
VC32		27uF	100V		12.5mm (h) x 8mm (w)	3.0-3.5mm		As above
VC12		27uF	100V		12.5mm (h) x 8mm (w)	3.0-3.5mm		As above

VEC8		100uF	10V			12.5mm (h) x 5mm (w)	2.0mm			EEUFR1C101	Panasonic FR Series, upgraded to 16V
VEC7		100uF	10V			12.5mm (h) x 5mm (w)	2.0mm			As above
VEC6		100uF	10V			12.5mm (h) x 5mm (w)	2.0mm			As above
VEC5		100uF	10V			12.5mm (h) x 5mm (w)	2.0mm			As above
VEC4		100uF	10V			12.5mm (h) x 5mm (w)	2.0mm			As above
VEC3		100uF	10V			12.5mm (h) x 5mm (w)	2.0mm			As above
VEC2		100uF	10V			12.5mm (h) x 5mm (w)	2.0mm			As above
VEC1		100uF	10V			12.5mm (h) x 5mm (w)	2.0mm			As above

EC10		470uF	10V			12.5mm (h) x 6mm (w)	2.0-2.5mm		EEUFR1C471	Panasonic FR Series, upgraded to 16V
EC8			470uF	10V			12.5mm (h) x 6mm (w)	2.0-2.5mm		As above	Lead spacing is 3.5mm, 8mm wide not 6mm... may not fit...
EC5			470uF	10V			12.5mm (h) x 6mm (w)	2.0-2.5mm		As above	Solution - Raised them up above the board a few millimeters.
EC4			470uF	10V			12.5mm (h) x 6mm (w)	2.0-2.5mm		As above	Originals were definitely below their rated spec.

Fan			12V 	0.043A		35mm (w) x 35mm (h) 10mm (d) 			MC011510	For Replacement of Superred CHC3512CB DC 12V 0.13A 35x35x10mm 2-Wire Server Fan

```

One issue I encountered on first power on, which is probably worth mentioning, was boot looping. Here's the initial specs of the software I was running and the device serial number.  

```
Serial: 		CFH01T701904
Software:		5.1.10
Modem reset:	ATDT****,,,,73738#,,,,1

```

I was able to perform a factory reset using dial-up modems. I was likely using an Avtek MegaPlus V.32bis. You may need to adjust the pauses (commas) as it gives the Sipura menu time to respond.

![](/assets/images/2023/img_1094.jpg)

The firmware was out of date, which wasn't all that surprising. Keep your eyes on the IP address in the location bar. That caused a few headaches.

![](/assets/images/2023/img_1095.jpg)

Cisco offer a [nice article](https://www.cisco.com/c/en/us/support/docs/smb/collaboration-endpoints/cisco-ip-phone-8800-series/1739-SPA8000-upgrade-firmware-to-6112.html) on how to update to the latest.

![](/assets/images/2023/img_1096.jpg)

The [quick start guide](https://www.cisco.com/c/dam/en/us/td/docs/voice_ip_comm/csbpvga/spa8000/quick_start/guide/spa8000_quick.pdf) also came in handy.

![](/assets/images/2023/img_1097.jpg)

[I wasn't alone](https://community.cisco.com/t5/atas-gateways-and-accessories/spa8000-stuck-in-a-boot-loop/td-p/1675301) on the boot loop issue thankfully.

![](/assets/images/2023/img_1098.jpg)

It seems to get around the boot loop issue, do not connect ethernet. An active ethernet connection seemed to cause the device to boot loop. Now the AUX port is OK to access manually assigned IP of 192.168.0.1. Another thing that was kicking me was the lack of a time server so the date/time wouldn't update. Adding a primary time server under WAN status (Advanced) of time.nist.gov solved that.

There's more photos of this device in the [photo gallery](/photos) if you are interested in that sort of thing. No judgement from this side of the table! 😄 I've also added the latest firmware at the time of writing and some pdfs on configuring the SPA8000 onto the [file server](/files).
