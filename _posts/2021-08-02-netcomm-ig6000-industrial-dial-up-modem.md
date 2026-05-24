---
title: "NetComm IG6000 Industrial Dial-up Modem"
author: "Nix McRetro"
date: 2021-08-02T18:03:55.000+10:00
categories: [ibm-pc, repairs]
---

![](/assets/images/2021/img_0731.jpg)

I stumbled upon the IG6000 modem by mistake, I was actually looking for a regular old dial-up modem for my test dial-up network. I've since learnt that NetComm has been eaten up by Casa Systems. That's ironic because NetComm gobbled up most local modem manufacturers of the 90s. Avtek, Banskia, all absorbed into NetComm. Interestingly of the dial-up modems I have, most are NetComm branded internally with either Avtek or Banksia branding externally. A peek inside the NetComm IG6000 reveals the inner workings.

![](/assets/images/2021/img_0732.jpg)

![](/assets/images/2021/img_0733.jpg)

Anyhow, I went through and replaced all the electrolytic caps for maintenance, after discovering the board looks to have been manufactured in mid-2012. A bit early for a recap, but it was already mostly done by the time I realised my mistake.

![](/assets/images/2021/img_0734.jpg)

To make things extra interesting everything appears to be covered in a film, likely a fire retardant. Thankfully, we had _high quality?_ Licon capacitors installed and I didn't mind replacing them. The poor Sharp PQ05SZ51 voltage regulator (above) sure did look toasty.

![](/assets/images/2021/img_0735.jpg)

Unfortunately for the IG6000, one of the capacitors I was replacing intercepted a patched-up hack of some sort that wouldn't fit on the PCB (pictured above). A 1uF 50V capacitor joined to a resistor, attached to a lifted leg on what appeared to be a Fairchild PG8SB chip with V574 and some obscured letters. It _looked_ to be a 20-pin TSSOP. That's right, past tense - uh oh.

![](/assets/images/2021/img_0736.jpg)

The other side of the capacitor leg lifted the pad from the board and went... missing. A post mortem revealed the solder pad appeared to be connected to ground, albeit underneath the chip. I really should have ceased work on this once the sun disappeared behind clouds as my bench lighting is lacking.

![](/assets/images/2021/img_0737.jpg)

![](/assets/images/2021/img_0738.jpg)

This unit was powered by a Conexant RP56D/SP R6764-61 ACF2 Modem IC coupled with a Motorola MC68302PV33C RISC CPU. Going off their datecodes, they were manufactured mid-2005 and late 2000 (if I'm reading that right) respectively. Below are the capacitors that I was replacing, save it as plain text and it should format correctly. I still need to fix my formatting to scroll on either code or pre tags.

Interestingly [a reference to the IG6000 was found](https://web.archive.org/web/20001011011937/http://www.avtek.com.au:80/products/ig6000/ig6000_t.gif) on the Avtek website through archive.org in October 2000. It's a very small gif!

 

```
====================================================================================================================================================
NetComm Industrial Modem IG6000
14 capacitors
All replacements are 2x taller (What did Licon leave out?)
Completely Broken

Fatties (2x)																	Element 14 Order Code
C15		47uF		16V		6mm (h) x 5mm (w)		2-2.5mm spacing	Silkscreen is full!			8126747 	2x taller, upgraded to 35V	Order 10x
C60		47uF		16V		6mm (h) x 5mm (w)		2-2.5mm spacing	Silkscreen is full!			As above

Babies (11x)
C34		2.2uF		50V		6mm (h) x 3-4mm (w)	2-2.5mm spacing	Silkscreen is ~5mm (w)		2346265	2x taller				Order 10x
C89		2.2uF		50V		6mm (h) x 3-4mm (w)	2-2.5mm spacing	Silkscreen is ~5mm (w)		As Above
C101		2.2uF		50V		6mm (h) x 3-4mm (w)	2-2.5mm spacing	Silkscreen is ~5mm (w)		As Above
C102		2.2uF		50V		6mm (h) x 3-4mm (w)	2-2.5mm spacing	Silkscreen is ~5mm (w)		As Above

U4		1uF		50V		6mm (h) x 3-4mm (w)	2-2.5mm spacing	Attached to U4 with resistor	234626402 	This broke!				Order 10x

C53		10uF		25V		6mm (h) x 3-4mm (w)	2-2.5mm spacing	Silkscreen is ~5mm (w)		114463202 	2x taller, upgraded to 50V	Order 10x
C72		10uF		25V		6mm (h) x 3-4mm (w)	2-2.5mm spacing	Silkscreen is ~5mm (w)		As Above
C51		10uF		25V		6mm (h) x 3-4mm (w)	2-2.5mm spacing	Silkscreen is ~5mm (w)		As Above
C69		10uF		25V		6mm (h) x 3-4mm (w)	2-2.5mm spacing	Silkscreen is ~5mm (w)		As Above
C21		10uF		25V		6mm (h) x 3-4mm (w)	2-2.5mm spacing	Silkscreen is ~5mm (w)		As Above
C22		10uF		25V		6mm (h) x 3-4mm (w)	2-2.5mm spacing	Silkscreen is ~5mm (w)		As Above

POWER SUPPLY (Mean Well ~7.5V 1.6A 60mV Ripple)
GEM12I07-P1J																2815709
AC PLUG-AU2																2816209

====================================================================================================================================================
```

  

We wish our modem, the NetComm IG6000, the best of luck. Goodnight and farewell to the dearest black box we knew!

![](/assets/images/2021/img_0739.jpg)

**References:** [Datasheet, user manual and firmware](https://support.netcommwireless.com/legacy-products/IG6000)
