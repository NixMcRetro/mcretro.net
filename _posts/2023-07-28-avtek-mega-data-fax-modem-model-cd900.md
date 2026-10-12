---
title: "Avtek Mega Data/Fax Modem - Model CD900"
author: "Nix McRetro"
date: 2023-07-28T18:30:23.000+10:00
categories: [linux, modems, repairs]
last_modified_at: 2026-10-12
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-12
  purpose: "fact-checking, sourcing, and editorial quality"
---

{% include youtube.html id="ScKgwIrByFU" %}

This modem was purchased through eBay in February 2023 and recapped in late May 2023 using whatever capacitors I had on hand. Thankfully, I had a bunch of Rubycons and Panasonics. If you order enough of them you always end up with spares.

![](/assets/images/2023/img_1045.jpg)

Here's the brain of the modem: a Rockwell RC224ATF R6641-14 with a date code of week 30, 1992. I put more photos in the [photo gallery](/photos), which is currently unavailable.

![](/assets/images/2023/img_1046.jpg)

Some of the surface-mount capacitors had leaked and started to corrode the board, but it was nothing a small scrub couldn't handle. A few pads lifted without breaking away from the PCB. Nobody likes surface-mount capacitors leaking. No one!

![](/assets/images/2023/img_1047.jpg)

Quite a simple board design, no firmware to dump as far as I could tell. The LEDs were different to other models I've seen but notice the front of the PCB and the lack of switches. Likely this board was used across a few different models, maybe even brands.

![](/assets/images/2023/img_1048.jpg)

While recapping the SMD components, I did my due diligence (for once) and removed the P1200 rather than risk getting it, let's just say **_somewhat melted_**. How did the universe repay me? Why, one of the legs fell off. I tried jamming it back in, but no dial.

So I sourced a replacement ETAL P1200 line-matching and isolation transformer. And here I was thinking it was just a relay! Isolation transformer... I'll try to remember that one!

![](/assets/images/2023/img_1049.jpg)

Hmmm, good old 2,400 bps. Not the fastest of modems. That 1992 date code gives us an early-1990s component, rather than an exact birthday for the finished modem. The chip was over 30 years old by the time I got to it! I'm not surprised those surface-mount capacitors leaked.

![](/assets/images/2023/img_1051.jpg)

The power supply was one of the three pictured here. Which one? I could not be sure... All three are labelled WW037, 15 V AC, 10 VA. I used a 15 V AC supply with the female prong connector; that is a record of this setup, not a power-supply specification for every Avtek or NetComm modem.

![](/assets/images/2023/img_1050.jpg)

I love the way they designed the front of the modem to make the LEDs shine through like the letter A (for Avtek). Last up, we have the results of probing the modem for information. Surprisingly short, as nothing beyond ATI3 registered anything apart from ERROR. Short and sweet! 😄

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

The capacitors were replaced in this modem in May 2023. The list below records this particular CD900 and the replacements I used. Before ordering, check the actual board, capacitor type and polarity, capacitance, voltage and temperature ratings, ESR, ripple-current requirements and physical size. The parts listed below are manufacturer part numbers. The formatting isn't too web friendly. Copy the raw text out and paste it into a plain-text editor such as Notepad or TextEdit in plain-text mode and you'll probably be fine. 😄

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

### Sources

- [ETAL - P1200 line-matching transformer datasheet](https://www.farnell.com/datasheets/1801043.pdf)
- [Nichicon - Application Guidelines for Aluminum Electrolytic Capacitors](https://www.nichicon.co.jp/english/series_items/catalog_pdf/e-aluminum.pdf)
