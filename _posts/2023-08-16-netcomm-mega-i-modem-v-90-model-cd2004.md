---
title: "NetComm Mega-i-Modem V.90 - Model CD2004"
author: "Nix McRetro"
date: 2023-08-16T17:49:56.000+10:00
categories: [linux, modems, repairs]
last_modified_at: 2026-10-12
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-12
  purpose: "fact-checking, sourcing, and editorial quality"
---

{% include youtube.html id="Gm-ekXhaUKY" %}

This modem was purchased in May 2021 and you might recognise this modem from [June 2021](/netcomm-mega-i-modem-cd2004-capacitor-list/) when the capacitors were replaced. As you can see in the above video this was originally a boxed modem in brand new condition.

  {% include youtube.html id="Aqe99DRUrUM" %}

Up next we have an internal overview of the modem before it was recapped. There's those STONE-branded capacitors again. Quite a late model, estimated to be around mid-late 2008 going off the date codes on the components and the PCB silkscreen markings.

![](/assets/images/2021/img_0727.jpg)

I only have two photos of the modem and the following log is limited because I might have accidentally run a rogue...

```
rm -rf *
```

... in terminal while in my Desktop folder... I had backups but they sadly didn't include that modem. Many modem log files were lost that day. I guess that's what I get for messing about with the GeoCities archive late at night.

```
---------- 2021-06-02 12:41:41 +1000: Logging Started ----------

AT&F
OK

AT&FE0V0&D2&C1S0=0
OK

ATI0
57600
OK

ATI1
MISSING DATA

ATI2
OK

ATI3
MISSING DATA

ATI4
MISSING DATA

ATI5
MISSING DATA

ATI6
MISSING DATA

ATI7
MISSING DATA

ATI8
MISSING DATA

ATDT1234567890
CONNECT 28800

```

Looks like the majority were replaced with Panasonic FR series caps. There were 11 capacitors in total. I didn't note down each location, so the video is useful context, but check your actual board before ordering. As with my 2021 capacitor post, this is a record of this particular CD2004. Check capacitor type and polarity, capacitance, voltage and temperature ratings, ESR, ripple current and physical fit. The parts listed below are manufacturer part numbers. The formatting isn't too web friendly. Copy the raw text out and paste it into a plain-text editor such as Notepad or TextEdit in plain-text mode and you'll probably be fine. 😄

```
Value	Voltage		Height	Width	Notes
470uF	16V			12mm	7mm		EEUFR1C471
470uF	16V			12mm	7mm		EEUFR1C471
470uF	16V			12mm	7mm		EEUFR1C471
470uF	16V			12mm	7mm		EEUFR1C471
470uF	16V			12mm	7mm		EEUFR1C471

100uF	16V			12mm	5mm		EEUFR1C101
100uF	16V			12mm	5mm		EEUFR1C101
100uF	16V			12mm	5mm		EEUFR1C101

1uF	    50V			11mm	4mm		50YXJ1M5X11
10uF	25V			11mm	4mm		EEUFR1H100	Upgraded to 50V
10uF	25V			11mm	4mm		EEUFR1H100	Upgraded to 50V

All electrolytic capacitors are radial.
Lead spacing is 2-2.5mm on most.

```

I put more pictures - OK, two pictures - in the [photo gallery](/photos), and the drivers, including an ISO image of the entire driver disc, on the [file server](/files). Both are currently unavailable. The init string above records what I used on this modem; it isn't a guarantee for every setup.

This modem has been donated to the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au/).

### Sources

- [Nichicon - Application Guidelines for Aluminum Electrolytic Capacitors](https://www.nichicon.co.jp/english/series_items/catalog_pdf/e-aluminum.pdf)

### Related posts

- [NetComm Mega-i-Modem CD2004 Capacitor List](/netcomm-mega-i-modem-cd2004-capacitor-list/)
