---
title: "Avtek Mega Data/Fax Modem - Model CD900"
author: "Nix McRetro"
date: 2023-07-28T18:30:23.000+10:00
categories: [linux, modems, repairs]
---

{% include youtube.html id="ScKgwIrByFU" %}

This modem was purchased through eBay in February 2023 and recapped in late May 2023 using whatever capacitors I had on hand. Thankfully, I had a bunch of Rubycons and Panasonics. If you order enough of them you always end up with spares.

![](/assets/images/2023/img_1045.jpg)

Here's the brains of the modem. A Rockwell RC224ATF R6641-14 with datecode of week 30, 1992. More photos can be found in the [photo gallery](/photos).

![](/assets/images/2023/img_1046.jpg)

Some of the surface mount capacitors had leaked and started to corrode the board but nothing a small scrub couldn't handle. The pads did lift in some cases but didn't sever from the PCB. Nobody likes surface mount capacitors leaking. No one!

![](/assets/images/2023/img_1047.jpg)

Quite a simple board design, no firmware to dump as far as I could tell. The LEDs were different to other models I've seen but notice the front of the PCB and the lack of switches. Likely this board was used across a few different models, maybe even brands.

![](/assets/images/2023/img_1048.jpg)

While recapping the SMD components, I used due diligence (for once) and removed the P1200 component rather than risking it getting, let's just say **_somewhat melted_**. How did the universe repay me? Why one of the legs fell off. I tried jamming it back in but no dial.

So I sourced a replacement - P1200 ETAL isolation transformer TH line matching, 100 µA. Also known as a telecom transformer, line matching, 1.5 dB, 148 ohm, 100 µA, 3.88 kVrms. And here I was thinking it was just a relay! Isolation transformer... I'll try to remember that one!

![](/assets/images/2023/img_1049.jpg)

Hmmm good old 2,400 bps. Not the fastest of modems and going off the datecodes on the majority of chips, we're looking at a birthday of mid-late 1992 for this modem. That's over 30 years old! I'm not surprised those surface mounts capacitors leaked.

![](/assets/images/2023/img_1051.jpg)

The power supply was one of the three pictured here. Which one? I could not be sure... But it was 15V AC with a female prong connector. Pretty standard for this era of Avteks and even NetComm modems - they did share the same parent company after all.

![](/assets/images/2023/img_1050.jpg)

I love the way they designed the front of the modem to make the LEDs shine through like the letter A (for Avtek). Last up we have the results of the probing the modem for information. Surprisingly short as nothing beyond ATI3 registered anything apart from ERROR. Short and sweet! 😄

```
---------- 2023-05-28 15:36:54 +1000: Logging Started ----------

ATI0
242
OK

ATI1
192
OK

ATI2
OK
OK

ATI3
AFES-C2501-H0
OK

ATI4
ERROR

ATDT1234567890
CONNECT 2400

```

The capacitors were replaced in this modem in May 2023. The parts listed below are manufacturer part numbers. The formatting isn’t too web friendly, copy the raw text out and paste it into a non-rich text editor (Such as Notepad or TextEdit – in plain text mode) and you’ll probably be fine. 😄

```
SMD Electrolytic
Location	Value		Voltage  	Dimensions		Notes
C63		2.2uF		50V		4mm (W) x 5mm (H)	EEE-HD1H2R2R - Panasonic HD Series
C64		2.2uF		50V		4mm (W) x 5mm (H)	EEE-HD1H2R2R - Panasonic HD Series
C65		2.2uF		50V		4mm (W) x 5mm (H)	EEE-HD1H2R2R - Panasonic HD Series
C25		2.2uF		50V		4mm (W) x 5mm (H)	EEE-HD1H2R2R - Panasonic HD Series
C27		2.2uF		50V		4mm (W) x 5mm (H)	EEE-HD1H2R2R - Panasonic HD Series

Radial Electrolytic
Location	Value		Voltage  	Dimensions		Notes
C51		100uF		16V		5mm (W) x 11mm (H)	16ZLH100MEFC5X11 - Rubycon ZLH Series
C13		220uF		35V		10mm (W) x 12mm (H)	35ZLK220M10X12.5 - Rubycon ZLK Series
C28		220uF		35V		10mm (W) x 12mm (H)	35ZLK220M10X12.5 - Rubycon ZLK Series
C30		220uF		35V		10mm (W) x 12mm (H)	35ZLK220M10X12.5 - Rubycon ZLK Series
C54		220uF		35V		10mm (W) x 12mm (H)	35ZLK220M10X12.5 - Rubycon ZLK Series
C59		220uF		35V		10mm (W) x 12mm (H)	35ZLK220M10X12.5 - Rubycon ZLK Series

```

This modem has been donated to the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au/).
