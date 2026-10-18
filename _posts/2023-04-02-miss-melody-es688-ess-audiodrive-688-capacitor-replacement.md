---
title: "Miss Melody ES688 - ESS AudioDrive 688 Capacitor Replacement"
author: "Nix McRetro"
date: 2023-04-02T14:53:48.000+10:00
categories: [repairs, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="TU2rRy1BW78" %}

Recently I had the joy of replacing the capacitors on a Miss Melody ES688. The poor thing had NCK-branded caps, which are way past their best-before date. I've installed some Panasonics and Rubycons and it's ready to roll. Just need a machine to test it in.

![](/assets/images/2023/img_0999.jpg)

Those old capacitors were way past their prime and couldn't even be found on the [big list](/capacitors-manufacturer-tier-list-ranking/) of decent to less-than-decent capacitors.

![](/assets/images/2023/img_1000.jpg)

More information on this card can be found in [AmoRetro's Miss Melody ES688 overview](https://amoretro.de/2011/06/miss-melody-ess-audiodrive-688-es688.html) and [VC Collection's AudioDrive ES688F overview](https://vccollection.ru/?page_id=4860). The [VOGONS discussion of ES688F cards](https://www.vogons.org/viewtopic.php?f=62&t=70102&start=20) is also a useful place to start looking for drivers, though the right driver and setup still depend on the card.

The values below record this particular card. Before ordering replacements, check the actual board and fitted capacitor type, polarity, capacitance, voltage rating, ESR, ripple-current and temperature ratings, lead spacing and physical fit.

```
===================================================================
ES688 AudioDrive Caps
"Miss Melody"
Recapped 2022-10-31
=============================================================================

Location 	Rating	Voltage		Dimensions		Lead Spacing	Order Code
C1			47uF	16V			7mm(h)x5mm(w)	2mm				8126747			
C17			47uF	16V			7mm(h)x5mm(w)	2mm				As above
C45			47uF	16V			7mm(h)x5mm(w)	2mm				As above

C51			470uF	16V			15mm(h)x8mm(w)	3mm				2760329
C50			470uF	16V			15mm(h)x8mm(w)	3mm				As above

C18			1uF		50V			7mm(h)x4mm(w)	2mm				2346264
C46			1uF		50V			7mm(h)x4mm(w)	2mm				As above
	
C15			100uF	16V			7mm(h)x6mm(w)	3mm				1144620
C35			100uF	16V			7mm(h)x6mm(w)	3mm				As above
C34			100uF	16V			7mm(h)x6mm(w)	3mm				As above
C36			100uF	16V			7mm(h)x6mm(w)	3mm				As above
C85			100uF	16V			7mm(h)x6mm(w)	3mm				As above		

C74			10uF	25V			7mm(h)x4mm(w)	2mm				1281813
C75			10uF	25V			7mm(h)x4mm(w)	2mm				As above
C76			10uF	25V			7mm(h)x4mm(w)	2mm				As above
C27			10uF	25V			7mm(h)x4mm(w)	2mm				As above
C39			10uF	25V			7mm(h)x4mm(w)	2mm				As above

=============================================================================
Order codes are Element 14.
8126747 are Rubycon ZLH series.
2760329 are Panasonic FR series.
2346264 are Rubycon YXJ series.
1144620 are Rubycon YXF series.
Note: 1144620 - Too big for the silkscreen but fits physically.
=============================================================================

```

![](/assets/images/2023/img_1001.jpg)

That's a good looking sound card!

### Sources

- [Rubycon - Aluminum Electrolytic Capacitor Technical Notes](https://www.rubycon.co.jp/wp-content/uploads/products-aluminum/al-technical-note_en.pdf)
