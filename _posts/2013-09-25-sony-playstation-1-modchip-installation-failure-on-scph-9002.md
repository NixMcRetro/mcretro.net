---
title: "Sony PlayStation 1 Modchip Installation Failure on SCPH-9002"
author: "Nix McRetro"
date: 2013-09-25T00:25:12.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, sony, youtube]
---

{% include youtube.html id="bA2Xc0uRxZY" %}

Oh geez! Another video of a guide I was attempting to make, only to have everything go horribly wrong. Rather than throw the recording away, I thought I might as well let the internet enjoy my suffering. Perhaps somebody will learn what not to do!

After the unsuccessful attempt to program a MultiMode3 chip, I'd also been working on getting the wiring installed in my Sony PlayStation SCPH-9002. The idea was to prepare the seven connections needed for the modchip and get everything into position for a proper installation.

The first few connections looked promising enough. I was using some thin wire and trying to work out a sensible place to mount the PIC once it was ready. There wasn't an enormous amount of space available, especially with the metal shielding that would eventually have to go back over the motherboard.

Unfortunately, one of the soldering points was rather close to a tiny surface-mount component. A little too close, as it turned out. The component decided to evacuate the motherboard while I was working nearby. Whoops! Not only was I struggling to finish the modchip installation, but now I had another repair to do before I could continue.

The component was absolutely tiny. I put it beside an Australian one-dollar coin to give some idea of the scale, although that didn't make the prospect of soldering it back into place any less entertaining.

I did manage to get some of the other wires attached, but the routing wasn't particularly tidy. This was supposed to become a proper installation guide, and instead I'd created a rather convincing demonstration of how much trouble you can get yourself into with a soldering iron.

There's also a second recording from this rather unsuccessful adventure, including my attempt at stop-motion editing in Final Cut Pro X.

{% include youtube.html id="V6QhAZckY8w" %}

Things can only get better! ;)

![Small surface-mount component beside an Australian one-dollar coin](/assets/images/2013/img_0419.jpg)

As with the previous programming attempt, the lack of a successfully programmed modchip meant there was only so far I could get anyway. Even perfectly installed wiring wasn't going to make much difference without a chip that actually worked.

I've since bought myself a proper pair of wire strippers. How I managed to spend so much time playing around with electronics without owning a decent pair is beyond me!

I've also picked up some reprogrammable PIC flash chips. At least with those I can make a mistake, erase the device and have another go, rather than sacrificing another one-time-programmable chip every time something goes wrong.

So this wasn't a successful installation, and I'm certainly not going to pretend it was. The damaged component and the rather questionable wiring still needed attention. At least I had a better idea of what equipment to use for the next attempt.

That's the power of flash! Or, in this particular case, the power of learning from a spectacularly unsuccessful afternoon.

**Related Posts**

- [Sony PlayStation Modchip Programming Failure with a PIC12C508A](/sony-playstation-modchip-programming-failure-with-pic12c508a/)
- [Sony PlayStation 1 Modchip Installation on SCPH-9002 Update](/sony-playstation-1-modchip-installation-on-scph-9002-update/)
- [Sony PlayStation 1 Modchip Installation Success on SCPH-9002](/sony-playstation-1-modchip-installation-success-on-scph-9002/)

**Sources**

- [Microchip - PIC12F629/675 Data Sheet](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/DataSheets/41190G.pdf)
