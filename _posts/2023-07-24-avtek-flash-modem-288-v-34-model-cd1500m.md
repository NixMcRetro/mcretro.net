---
title: "Avtek Flash Modem 288 V.34 - Model CD1500M"
author: "Nix McRetro"
date: 2023-07-24T17:02:18.000+10:00
categories: [linux, modems, repairs]
last_modified_at: 2026-10-18
---

{% include youtube.html id="ikJBM0HyRdM" %}

One thing I never get tired of is making videos about modems. And above is a modem video! An Avtek Flash Modem 288 V.34 purchased second-hand in August 2022 with a serial number of 601000266. The model number is CD1500M, with the M at the end signifying that it is the Mac version. Being a Mac version the only difference appears to be the inclusion of a Mac-compatible serial cable.

To check the internals, I had to open the case and it might be an understatement to say that I had a little bit of trouble. The plastic was far more brittle than I would have liked aaaand all the clips holding it together snapped when attempting to open it.

![](/assets/images/2023/img_1042.jpg)

And once the clips had snapped, I was able to look at the horrors inside. Those poor capacitors are not having a good time. Bad circuit design? Did someone not derate them? Orrrrr did we use a junk brand... Oh, Nichicon - is that you? A good example of why I don't use Nichicon in anything.

![](/assets/images/2023/img_1044.jpg)

Here's a surface-mount capacitor I'm pretty sure I didn't replace because it was on the underside of the modem. There was no silkscreen with component numbering, which was a little annoying.

![](/assets/images/2023/img_1041.jpg)

At least the power supply was well built (solid). It's a NetComm 9V AC 1A (240V AC 50Hz) with markings WW069 and N14311.

![](/assets/images/2023/img_1043.jpg)

The Rockwell chipset is notably absent and we have a Motorola chipset instead. The only other modem I've seen with a Motorola chipset to date is the Acer AcerModem 56 Surf (AME-MU00). An odd sight for me! Gough's [V.90/V.92 modem-sounds collection](https://goughlui.com/2016/05/03/project-the-definitive-collection-of-v-90v-92-modem-sounds/) also includes an Acer Motorola-based external modem.

{% include youtube.html id="P3bVila54tk" %}

The firmware calls it a `Motorola Lifestyle 28.8 External 68356`, so there's good reason to call this a Motorola-based Avtek. That string doesn't tell us who manufactured the finished modem, though, so I can't call it a straight rebadge on that alone. Cost cutting perhaps, or an attempt to diversify maybe. This Avtek still doesn't feel like an Avtek.

![](/assets/images/2023/img_1040.jpg)

I will admit that I didn't really need this modem - or want it. With the clips failing and it being beige, we **_might_** not have done the best job on the capacitor replacement. We used on-hand caps, with pads lifting here and there. There are more photos in the [photo gallery](/photos) (surprise!) if you have a hunger for modem photos, though the gallery is currently offline.

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

Whoops, that final `CONNECT 115200` isn't a 115.2 kbit/s telephone-line connection from a 28.8 modem. It's a serial-side reporting or configuration artefact, not a measurement of the modem-to-modem line speed. I couldn't pin down the exact setting from this log alone. Oh well, at least externally it looks OK, as long as you don't try to pick it up.

Next is a listing of the capacitors replaced, with order numbers from Element 14 Australia. The capacitors were replaced in this modem in September 2022. This records my work on CD1500M serial 601000266, including some awkward fits and surface-mount parts replaced with radials. Before copying it, check the actual board and fitted capacitor type, polarity, capacitance, voltage rating, ESR, ripple-current and temperature ratings, lead spacing and physical fit. A higher voltage rating alone doesn't establish a suitable replacement. The formatting isn't too web friendly; copy the raw text out and paste it into a plain-text editor such as Notepad or TextEdit in plain-text mode and you'll probably be fine. 😄

```
Value	Voltage  	Width	Height	Notes
2200uF	16V			15mm	15mm	1144631 - Spacing 7.5mm, too tall needs to bend

120uF	16V			6mm		12mm	2346210 - Upgraded to 35V, wider 8mm
120uF	16V			6mm		12mm	2346210 - Upgraded to 35V, wider 8mm
120uF	16V			6mm		12mm	2346210 - Upgraded to 35V, wider 8mm
120uF	16V			6mm		12mm	2346210 - Upgraded to 35V, wider 8mm

220uF	16V			10mm	10mm	1144621 - SMD, replaced with radial (25V)
220uF	16V			10mm	10mm	1144621 - SMD, replaced with radial (25V)

10uF	100V		6mm		12mm	1144640
10uF	100V		6mm		12mm	1144640

10uF	16V			4mm		4mm		1144632 - SMD, replaced with radial
10uF	16V			4mm		4mm		1144632 - SMD, replaced with radial
10uF	16V			4mm		4mm		1144632 - SMD, replaced with radial
10uF	16V			4mm		4mm		1144632 - SMD, replaced with radial

47uF	16V			6mm		6mm		1144619 - SMD, replaced with radial
47uF	16V			6mm		6mm		1144619 - SMD, replaced with radial

```

**Special thanks to:** [Doge Microsystems](https://dogemicrosystems.ca/wiki/Main_Page) as always for their VoIP guides, and Gough's write-ups on [V.34 modem sounds](https://goughlui.com/2017/05/30/project-the-large-collection-of-v-34-modem-sounds/).

As a footnote to a footnote, I've left Twitter because I do not agree with a lot of things the company, [if you wanna call it a band, because it’s a one man name](https://en.wikipedia.org/wiki/The_Rockafeller_Skank), has been doing as of late and Mastodon is getting a bit more traction as a Twitter replacement. **Good riddance** I say! 😎

This modem has been donated to the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au/).

### Sources

- [Gough Lui - The Definitive Collection of V.90/V.92 Modem Sounds](https://goughlui.com/2016/05/03/project-the-definitive-collection-of-v-90v-92-modem-sounds/)
- [Gough Lui - The Large Collection of V.34 Modem Sounds](https://goughlui.com/2017/05/30/project-the-large-collection-of-v-34-modem-sounds/)
- [Rubycon - Aluminum Electrolytic Capacitor Technical Notes](https://www.rubycon.co.jp/wp-content/uploads/products-aluminum/al-technical-note_en.pdf)
