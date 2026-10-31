---
title: "NetComm Roadster V.92 - Model AM5698"
author: "Nix McRetro"
date: 2023-08-12T12:39:05.000+10:00
categories: [linux, modems, repairs]
last_modified_at: 2026-10-18
---

{% include youtube.html id="bOloActkN2Q" %}

Back in mid-2022 I was given this modem as a gift, and while I wasn't looking for any V.92 modems, I figured I'd document it. While I tend to be a little more [V.32 or V.34](https://en.wikipedia.org/wiki/List_of_ITU-T_V-series_recommendations) inclined, I am open to the idea of V.92 modems doing the work of a V.34 modem. Maybe I just really like the old Rockwell chipsets more than the later [Conexant Systems](https://en.wikipedia.org/wiki/Conexant) ones.

![](/assets/images/2023/img_1079.jpg)

Externally it is marked as a NetComm Roadster V.92 model AM5698, serial T510001CN0251. The label specifies 7.5 V DC, 450 mA, and I recorded the input as centre-positive. That's this unit's setup, rather than a specification for every NetComm AM56XX or Banksia Wave SP modem. The video even shows how irritating the power plugs can be: one other Roadster plug was loose in this socket, while the plug from this modem wouldn't fit the other unit at all. So much for keeping a single convenient power adaptor for the modem shelf.

![](/assets/images/2023/img_1076.jpg)

Internally, the PCB is marked ST309 REV B. The component date codes point to 2004, although they don't pin down the finished modem's exact manufacturing date. That made the components under 20 years old when it came across my desk. There were 13 capacitors, most if not all STONE branded. Make note of those capacitor heights. I might have made a slight misstep when replacing them. More on that later.

![](/assets/images/2023/img_1077.jpg)

Oh, what's that? We're just jumping straight into the capacitors on this one? Well there you go! Mostly Rubycon YXF series were used, but look what happens when I try to put the case back together...

![](/assets/images/2023/img_1078.jpg)

Dammit! That speaker does not have the clearance it needs. I need the ultra short capacitors. Slap in some shorter ZLG series caps and like magic...

![](/assets/images/2023/img_1080.jpg)

Perfect! Most of the affected originals were 10 µF, 25 V parts. I replaced some with 50 V parts, which increased the voltage rating but also made the cans too tall for the space under the speaker. That is not "derating" the capacitor; derating means operating a component below its rating. The shorter ZLG parts solved the mechanical problem. 😅 C25 was a 22 µF, 63 V part, with another little surprise waiting for me.

![](/assets/images/2023/img_1081.jpg)

C25 was the odd one out: the fitted 22 µF, 63 V capacitor was bipolar or non-polar. [Jon](https://damntechnology.blogspot.com) suggested that the factory might simply have used what it had on hand, and I took the polarity mark on the PCB as confirmation. That was a theory, not a circuit check. A non-polar electrolytic may be deliberate where the voltage can reverse, so a polar replacement should only be used after checking the circuit and confirming the actual voltage polarity.

Next up we have the ATI (inquiry, information, or interrogation) results. These give us the active firmware version. I didn't dump it because I didn't have much interest in doing so at the time. An update might be somewhere on [archive.org](http://archive.org), but I haven't tracked down a matching file.

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

The accompanying video goes much further than the recap photographs. I used Ubuntu 22.04 and wvdial through my VoIP-backed dial-up setup, with a Raspberry Pi helping out on the server side. An early connection let me ping an IP address, although name resolution and the connection's error counters were less cooperative.

I eventually found the original driver disc and tried the Roadster in Windows 98 under VirtualBox. It connected at 26.4 kbps and let me potter around Fish Tank World and some old GeoCities pages. I still preferred the character of the earlier modems, but this one could certainly do the job.

The capacitors were replaced in this modem in September 2022. This is a record of this ST309 REV B board, not a universal AM5698 bill of materials. In particular, the C25 entry records the polarised replacement I fitted; it is not evidence that this was suitable for the original non-polar position. Check the circuit, capacitor type and polarity, capacitance, voltage and temperature ratings, ESR, ripple current and physical fit before choosing replacements. The parts listed below are manufacturer part numbers. The formatting isn't too web friendly. Copy the raw text out and paste it into a plain-text editor such as Notepad or TextEdit in plain-text mode and you'll probably be fine. 😄

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

I put more pictures in the [photo gallery](/goodies) and the drivers, including an ISO image of the entire driver disc, on the [file server](/goodies). The init string above records what I used on this modem; it isn't a guarantee for every setup.

This modem has been donated to the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au/).

### Sources

- [Nichicon - Application Guidelines for Aluminium Electrolytic Capacitors](https://www.nichicon.co.jp/english/series_items/catalog_pdf/e-aluminum.pdf)
