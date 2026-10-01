---
title: "NetComm Roadster V.92 - Model AM5698"
author: "Nix McRetro"
date: 2023-08-12T12:39:05.000+10:00
categories: [linux, modems, repairs]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="bOloActkN2Q" %}

Back in mid-2022 I was given this modem as a gift, and while I wasn't looking for any V.92 modems I figured I'd document it. While I tend to be a little more [V.32 or V.34](https://en.wikipedia.org/wiki/List_of_ITU-T_V-series_recommendations) inclined, I am open to the idea of V.92 modems doing the work of a V.34 modem. Maybe I just really like the old Rockwell chipsets before they were floated on the stock exchange becoming [Conexant Systems](https://en.wikipedia.org/wiki/Conexant).

![](/assets/images/2023/img_1079.jpg)

Externally it is marked as a NetComm Roadster V.92 model AM5698. The power supply required is 7.5V DC centre-positive at a minimum of 450mA which seems to be the standard for the NetComm AM56XX series and the related Banksia Wave SP family of modems.

![](/assets/images/2023/img_1076.jpg)

Internally we can see the PCB is marked with ST309 REV B. Most of the date codes on the board indicate a manufacturing date of mid-late 2004 - which makes this quite a late revision and under 20 years old it came across my desk. 13 capacitors, most if not all were STONE branded. Make note of those capacitor heights. I might have made a slight misstep when replacing them. More on that later.

![](/assets/images/2023/img_1077.jpg)

Oh, what's that? We're just jumping straight into the capacitors on this one? Well there you go! Mostly Rubycon YXF series were used, but look what happens when I try to put the case back together...

![](/assets/images/2023/img_1078.jpg)

Dammit! That speaker does not have the clearance it needs. I need the ultra short capacitors. Slap in some shorter ZLG series caps and like magic...

![](/assets/images/2023/img_1080.jpg)

Perfect! Most of the affected originals were 10 µF, 25 V parts. I replaced some with 50 V parts, which increased the voltage rating but also made the cans too tall for the space under the speaker. That is not "derating" the capacitor; derating means operating a component below its rating. The shorter ZLG parts solved the mechanical problem. The capacitor at C25 is a 22 µF, 63 V part.

![](/assets/images/2023/img_1081.jpg)

C25 was more important. The fitted 22 µF, 63 V capacitor was bipolar or non-polar, while the PCB silkscreen showed a polarity mark. I originally took that silkscreen as confirmation that a polarised replacement was fine. It is not enough evidence on its own. A non-polar electrolytic may be deliberate where the voltage can reverse, so a polar replacement should only be used after checking the circuit and confirming the actual voltage polarity.

Next up we have the ATI (inquiry, information, or interrogation) results. This give us the active firmware version - this wasn't dumped because I didn't have much interest in doing it at the time. That said, it might be available through [archive.org](http://archive.org) as an available firmware update. You'll need to scour the archives to track that down though.

```
---------- 2022-10-02 20:47:01 +1100: Logging Started ----------

AT&F
OK

AT&FE0V1S0=0&C1&D2+MR=2;+DR=1;+ER=1;W2
OK

ATI0
57600
OK

ATI1
255
OK

ATI2
OK

ATI3
ACF3_V1.702-V90_P21_FSH_LL
OK

ATI4
NetComm V.92 Modem V1.702SA1
OK

ATI5
09
OK

ATI6
RCV56DPF-PLL L8571A Rev 47.00/34.00
OK

ATI7
OK

ATI8
ERROR

ATDT1234567890
CONNECT 28800

```

The capacitors were replaced in this modem in September 2022. This is a record of this ST309 REV B board, not a universal AM5698 bill of materials. The parts listed below are manufacturer part numbers. The formatting isn't too web friendly. Copy the raw text out and paste it into a plain-text editor such as Notepad or TextEdit in plain-text mode and you'll probably be fine. 😄

```
Location	Value	Voltage		Height	Width	Notes
C50			100uF	25V			12mm	6mm		25YXF100MEFC6.3X11
C67			100uF	25V			12mm	6mm		As above
C25			22uF	63V			12mm	8mm		100YXM22MEFC8X11.5 - Non-polar but had silkscreen for polar, YXM Series, 100V upgrade.
C30			4.7uF	50V			6mm		5mm		50YXF4R7MEFC5X11

C65			10uF	25V			6mm		4mm		50YXF10MEFC5X11 - YXF Series, 50V upgrade.
C64			10uF	25V			6mm		4mm		As above
C63			10uF	25V			6mm		4mm		As above
C62			10uF	25V			6mm		4mm		As above
C15			10uF	25V			6mm		4mm		As above
C16			10uF	25V			6mm		4mm		As above
C17			10uF	25V			6mm		4mm		As above

C18			10uF	25V			6mm		4mm		25ZLG10MEFC4X7 - Height restricted.
C19			10uF	25V			6mm		4mm		As above

All electrolytic capacitors are radial.
Lead spacing is 2-2.5mm on most.
Use caution under the speaker as 11/12mm (h) capacitors will not have enough clearance.

```

As always you can see more pictures in the [photo gallery](/photos) and grab any drivers from the [file server](/files). I've put an iso image up of the entire driver disc as well but you shouldn't need much more than the above init string to get dialling.

This modem has been donated to the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au/).

### Sources

- [Nichicon - Application Guidelines for Aluminium Electrolytic Capacitors](https://www.nichicon.co.jp/english/series_items/catalog_pdf/e-aluminum.pdf)
