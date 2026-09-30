---
title: "PICO Fuses by Littelfuse"
author: "Nix McRetro"
date: 2016-08-15T07:53:43.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs]
---

![Littelfuse_Fuse_Pico_CL](/assets/images/2016/img_0534.jpg)

There I was replacing a fuse in a Super Famicom when I noticed the original part was marked **1.5 A, 125 V**.

My first thought was:

"125 V? But this is Australia! We have 250 V fuses here!"

That was the wrong reason.

A fuse's voltage rating is the maximum circuit voltage at which it is designed to interrupt safely.

A 250 V rated fuse can therefore be used in a 125 V, 12 V or other lower-voltage circuit, provided the rest of its characteristics are appropriate.

It does **not** mean the Super Famicom somehow has Australian mains voltage running through its internal fuse.

So a compatible **1.5 A, 250 V** PICO fuse can replace an appropriate **1.5 A, 125 V** fuse.

The current rating should not simply be increased, and matching amperage alone is not enough. Fuse speed, interrupting capability and physical format matter too.

My capacitor comparison also needed a qualifier.

With capacitors, using the specified capacitance and an equal or higher voltage rating is often appropriate, but polarity, capacitor technology, ESR, ripple-current capability, temperature rating and physical size can also matter.

Maybe electronics does work according to rules after all.

How would I know?

I'm just the weekend staff! ;)

### Related posts

- [Fuse Replacement on the Super Nintendo and Super Famicom](/fuse-replacement-on-the-super-nintendo-and-super-famicom/)

### Sources

- [Littelfuse - Fuseology](https://www.littelfuse.com/technical-resources/fuseology)
