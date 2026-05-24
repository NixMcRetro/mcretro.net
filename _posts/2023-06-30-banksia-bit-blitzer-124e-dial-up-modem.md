---
title: "Banksia BIT Blitzer 124E Dial-up Modem - Model BBM124E-B2CL"
author: "Nix McRetro"
date: 2023-06-30T22:31:21.000+10:00
categories: [linux, modems, repairs]
---

{% include youtube.html id="cyZtVOeXYCg" %}

This is the first video in a two parter for the Banksia Bit Blitzer. This is quite a slow modem clocking in at 2400 bps. You can't get those levels of slow just anywhere you know. Model number found on the underside reads BBM124E-B2CL with a serial number of 303159.

![](/assets/images/2023/img_1027.jpg)

Not the fastest, but the cool factor is pretty high on this modem. Look at all those LEDs! Everything was through-hole inside and it was amazing to replace the capacitors. This modem was purchased in May 2023 and was recapped, had the ROM dumped and was tested all in May 2023.

![](/assets/images/2023/img_1026.jpg)

The ROM is dated 891210, so just before Christmas 1989. If you're interested in the ROM, you can download it [here](/files/dumps/). This was dumped using a [TL866CS programmer](https://proghq.org/wiki/TL866). The PCB has the markings Banksia Bit Blitzer 124E/1234E-A which would imply that the same board was used on multiple models.

{% include youtube.html id="As8rEfB5iCw" %}

Above is part two following on from the video at the start of this post. Some of the components onboard seem to have date codes around mid-late 1990. To this unit would have shipped just short of a year after the firmware was ready.

![](/assets/images/2023/img_1028.jpg)

Here's the Arlec power supply that came with it running on 240V 50Hz power it steps it down a little to 9V AC at 500mA. Other markings on the power supply are APP. NO. V/79309/61227. You can find more photos over in the [photo gallery](/photos).

Next up we have data from the modem itself and what might be a functioning AT string, probably found thanks to [wvdialconf](https://wiki.archlinux.org/title/Wvdial).

```
---------- 2023-05-27 16:19:13 +1000: Logging Started ----------

ATZ
OK

AT&FS0=0V1X3
OK

ATI0
M1234EA V1.9 891210
OK

ATI1
LOADED CHECKSUM = 8C
CALCULATED CHECKSUM = 8C
OK

ATI2
OK

ATI3
M1234EA V1.9 891210
OK

ATI4
M1234EA V1.9 891210
OK

ATI5
LOADED CHECKSUM = 8C
CALCULATED CHECKSUM = 8C
OK

ATI6
OK

ATI7
M1234EA V1.9 891210
OK

ATI8
M1234EA V1.9 891210
OK

ATI9
LOADED CHECKSUM = 8C
CALCULATED CHECKSUM = 8C
OK

ATI10
OK

ATI11
M1234EA V1.9 891210
OK

ATI12
M1234EA V1.9 891210

ATDT1234567890
CONNECT 2400

```

Last but not least, we have the original capacitor values and what they were replaced with. The parts listed below are manufacturer part numbers. The formatting isn’t too web friendly, copy the raw text out and paste it into a non-rich text editor (Such as Notepad or TextEdit – in plain text mode) and you’ll probably be fine. 😄

```
Radial Electrolytic

Location	Value	Voltage	Dimensions		Notes
C2		220uF	16V	8mm (W) x 12mm (H)	25ZLG220MEFC8X11.5 - Rubycon ZLG Series, 25V upgrade
C46		220uF 	16V	8mm (W) x 12mm (H)	25ZLG220MEFC8X11.5 - Rubycon ZLG Series, 25V upgrade

C43		10uF	16V	5mm (W) x 11mm (H)	50YXF10MEFC5X11 - Rubycon YXF Series, 50V upgrade
C7		10uF	16V	5mm (W) x 11mm (H)	50YXF10MEFC5X11 - Rubycon YXF Series, 50V upgrade
C21		10uF	16V	5mm (W) x 11mm (H)	50YXF10MEFC5X11 - Rubycon YXF Series, 50V upgrade

C3		33uF 	16V	5mm (W) x 11mm (H)	EEU-FR1V330B - Panasonic FR Series, 35V upgrade
C8		33uF 	16V	5mm (W) x 11mm (H)	EEU-FR1V330B - Panasonic FR Series, 35V upgrade
C18		33uF 	16V	5mm (W) x 11mm (H)	EEU-FR1V330B - Panasonic FR Series, 35V upgrade
C20		33uF 	16V	5mm (W) x 11mm (H)	EEU-FR1V330B - Panasonic FR Series, 35V upgrade
C31		33uF 	16V	5mm (W) x 11mm (H)	EEU-FR1V330B - Panasonic FR Series, 35V upgrade

C9		1000uF	25V	12mm (W) x 20mm (H)	35ZLH1000MEFC12.5X20 - Rubycon ZLH Series, 35V upgrade
C10		1000uF	25V	12mm (W) x 20mm (H)	35ZLH1000MEFC12.5X20 - Rubycon ZLH Series, 35V upgrade
C11		1000uF	25V	12mm (W) x 20mm (H)	35ZLH1000MEFC12.5X20 - Rubycon ZLH Series, 35V upgrade

```

This modem has been donated to the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au/).
