---
title: "Avtek Flash Modem 288 V.34 - Model CD1500M"
author: "Nix McRetro"
date: 2023-07-24T17:02:18.000+10:00
categories: [linux, modems, repairs]
---

{% include youtube.html id="ikJBM0HyRdM" %}

One thing I never get tired of is making videos about modems. And above is a modem video! An Avtek Flash Modem 288 V.34 purchased second-hand in August 2022 with a serial number of 601000266. The model number is CD1500M, with the M at the end signifying that it is the Mac version. Being a Mac version the only difference appears to be the inclusion of a Mac-compatible serial cable.

To check the internals, I had to open the case and it might be an understatement to say that I had a little bit of trouble. The plastic was far more brittle than I would have liked aaaand all the clips holding it together snapped when attempting to open it.

![](/assets/images/2023/img_1042.jpg)

And once the clips had snapped, I was able to look at the horrors inside. Those poor capacitors are not having a good time. Bad circuit design? Did someone not derate them? Orrrrr did we use a junk brand... Oh, Nichicon - is that you? A good example of why I don't use Nichicon in anything.

![](/assets/images/2023/img_1044.jpg)

Here's an surface mount capacitor I'm pretty sure I didn't replace because it was on the underside of the modem. There was no silkscreen with component numbering which was a little annoying.

![](/assets/images/2023/img_1041.jpg)

At least the power supply was well built (solid). It's a NetComm 9V AC 1A (240V AC 50Hz) with markings WW069 and N14311.

![](/assets/images/2023/img_1043.jpg)

The Rockwell chipset is noteably absent and we have a Motorola chipset. The only other modem I've seen with a Motorola chipset to date is the Acer AcerModem 56 Surf (AME-MU00). Which is strange as NetComm/Sirius was well aligned with Rockwell and odd for Motorola, from what I understand from [here](https://goughlui.com/2016/05/03/project-the-definitive-collection-of-v-90v-92-modem-sounds/) most of their modems were internal.

{% include youtube.html id="P3bVila54tk" %}

But I guess this is just a rebadged Motorola made to look like an Avtek. Cost cutting perhaps or an attempt to diversity maybe. This Avtek doesn't feel like an Avtek with it being reported as a Motorola Lifestyle 28.8 External in ROM.

![](/assets/images/2023/img_1040.jpg)

I will admit that because I didn't really need this modem - or want it. Due to the clips failing and it being beige, we **_might_** not have done the best job on the capacitor replacement. Using on-hand caps with pads lifting here and there. There are more photos in the [photo gallery](/photos) (surprise!) if you have a hunger for modem photos.

Below are the initialisation strings used, whether they are the best ones... I couldn't be sure. But I'll throw in some ATI (inquiry, information, or interrogation) results.

```
---------- 2022-09-02 10:25:09 +1000: Logging Started ----------

ATZ
OK

AT&D2X3V1Q0S7=70
OK

ATI0
28800
OK

ATI1
6318
OK

ATI2
OK

ATI3
Motorola Lifestyle 28.8 External 68356 ROM  SW REV 6
S209415900 -01 03/13/97   10:00 AM
OK

ATI4
OK

ATI5
LAST DISCONNECT: NO DIALTONE
OK

ATI6
ERROR

ATI7
ERROR

ATI8
ERROR

ATI9
ERROR

ATI10
ERROR

ATDT1234567890
CONNECT 115200

```

Whoops looks like I didn't quite have those init strings right and ended up with a DTE (modem to computer) instead of DCE (modem to modem) for that last command. Oh well, at least externally it looks OK, as long as you don't try to pick it up.

Next is a listing of the capacitors replaced with order numbers are Element 14 (Australia). The capacitors were replaced in this modem in September 2022. The formatting isn't too web friendly, copy the raw text out and paste it into a non-rich text editor (Such as Notepad or TextEdit - in plain text mode) and you'll probably be fine. 😄

```
Value	Voltage  	Width	Height	Notes
2200uF	16V		15mm	15mm	1144631 - Spacing 7.5mm, too tall needs to bend

120uF	16V		6mm	12mm	2346210 - Upgraded to 35V, wider 8mm
120uF	16V		6mm	12mm	2346210 - Upgraded to 35V, wider 8mm
120uF	16V		6mm	12mm	2346210 - Upgraded to 35V, wider 8mm
120uF	16V		6mm	12mm	2346210 - Upgraded to 35V, wider 8mm

220uF	16V		10mm	10mm	1144621 - SMD, replaced with radial (25V)
220uF	16V		10mm	10mm	1144621 - SMD, replaced with radial (25V)

10uF	100V		6mm	12mm	1144640
10uF	100V		6mm	12mm	1144640

10uF	16V		4mm	4mm	1144632 - SMD, replaced with radial
10uF	16V		4mm	4mm	1144632 - SMD, replaced with radial
10uF	16V		4mm	4mm	1144632 - SMD, replaced with radial
10uF	16V		4mm	4mm	1144632 - SMD, replaced with radial

47uF	16V		6mm	6mm	1144619 - SMD, replaced with radial
47uF	16V		6mm	6mm	1144619 - SMD, replaced with radial

```

**Special thanks to:** [Doge Microsystems](https://dogemicrosystems.ca) as always for their VoIP guides and Gough's write ups on [modem sounds](https://goughlui.com/2017/05/30/project-the-large-collection-of-v-34-modem-sounds/).

As a footnote to a footnote, I've left Twitter because I do not agree with a lot of things the company- [if you wanna call it a band, because it’s a one man name](https://en.wikipedia.org/wiki/The_Rockafeller_Skank) - has been doing as of late and Mastodon is getting a bit more traction as a Twitter replacement. **Good riddance** I say! 😎

This modem has been donated to the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au/).
