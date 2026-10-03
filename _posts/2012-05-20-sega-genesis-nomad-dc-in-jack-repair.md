---
title: "Sega Genesis Nomad DC-in Jack Repair"
author: "Nix McRetro"
date: 2012-05-20T10:32:14.000+10:00
last_modified_at: 2026-10-02
ai_assistance:
  model: "GPT-6 Astra Max"
  date: 2026-10-02
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [repairs, sega]
---

![](/assets/images/2012/img_0060.jpg)

![](/assets/images/2012/img_0107.jpg)

![](/assets/images/2012/img_0108.jpg)

The Sega Genesis Nomad. What an amazing beast.

It didn't work up until today. The seller had kindly offered me a full refund if I returned it.

Not while I have an empty weekend to do some repairing!

I already knew there was a problem with the DC-in jack because it was loose as a goose.

![](/assets/images/2012/img_0124.jpg)

![](/assets/images/2012/img_0125.jpg)

![](/assets/images/2012/img_0123.jpg)

Apart came the Nomad, and the problem became much clearer. The damaged DC-in jack was allowing positive and ground to short together. That also gave me a plausible explanation for why the machine would not run from the external battery pack.

For diagnosis, I traced the power input and temporarily connected one of the DC-DC step-down converters from my Saturn PSU project, adjusted to 9 V.

Positive on red, ground on black and... bingo!

Life!

That was a diagnostic experiment rather than a general power-supply recommendation. Sega's own manual specifies compatible Genesis 2 and Game Gear power adaptors for normal use.

![](/assets/images/2012/img_0126.jpg)

![](/assets/images/2012/img_0127.jpg)

![](/assets/images/2012/img_0128.jpg)

On closer inspection I found that the DC-in jack from my Mega Drive 2 was compatible with the Nomad. Both machines use the same tip-positive power arrangement. So I removed the jack from one of my working Mega Drive 2 consoles and fitted it to the Nomad.

![](/assets/images/2012/img_0129.jpg)

![](/assets/images/2012/img_0130.jpg)

![](/assets/images/2012/img_0131.jpg)

I replaced the scratched front screen, cleaned the controller buttons, put everything back together and plonked in the nearest cartridge I could find. It works from the external battery pack as well.

A great success!

The video below shows the Nomad during the initial tests.

{% include youtube.html id="X5LQolaXIL4" %}

### Related posts

- [Sega TeraDrive Model 2, Genesis Nomad and Mega Drive 2](/sega-teradrive-model-2-genesis-nomad-and-mega-drive-2/)

### Sources

- [Sega Genesis Nomad instruction manual](https://manualzilla.com/doc/6982054/sega-genesis-nomad-instruction-manual) - documents compatibility with the Genesis 2 and Game Gear AC adaptors and the Nomad's external power arrangement.
