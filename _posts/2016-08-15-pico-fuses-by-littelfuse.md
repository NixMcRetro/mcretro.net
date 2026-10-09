---
title: "PICO Fuses by Littelfuse"
author: "Nix McRetro"
date: 2016-08-15T07:53:43.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [repairs]
---

![Littelfuse_Fuse_Pico_CL](/assets/images/2016/img_0534.jpg)

There I was sitting at my workbench replacing a fuse in a Super Famicom when I noticed the original part was marked **1.5 A, 125 V**. My first thought was: "125 V? But this is Australia! We have 250 V fuses here!" That was the wrong reason.

A fuse's voltage rating is the maximum circuit voltage at which it is designed to interrupt safely. A 250 V rated fuse can therefore be used in a 125 V, 12 V or other lower-voltage circuit, provided the rest of its characteristics are appropriate. It does **not** mean the Super Famicom somehow has Australian mains voltage running through its internal fuse. A compatible **1.5 A, 250 V** PICO fuse can replace an appropriate **1.5 A, 125 V** fuse, but matching amperage alone is not enough. Fuse speed, interrupting capability, AC or DC suitability and physical format matter too, and the current rating should not simply be increased.

My capacitor comparison also needed a qualifier. With capacitors, using the specified capacitance and an equal or higher voltage rating is often appropriate, but polarity, capacitor technology, ESR, ripple-current capability, temperature rating and physical size can also matter. Maybe electronics does work according to rules after all. How would I know? I'm just the weekend staff! ;)

### Sources

- [Littelfuse - Fuseology Selection Guide](https://www.littelfuse.com/assetdocs/fuseology-selection-guide?assetguid=e0a12d55-c89a-4e06-94e0-9fe3281f889f)

### Related posts

- [Fuse Replacement on the Super Nintendo and Super Famicom](/fuse-replacement-on-the-super-nintendo-and-super-famicom/)
