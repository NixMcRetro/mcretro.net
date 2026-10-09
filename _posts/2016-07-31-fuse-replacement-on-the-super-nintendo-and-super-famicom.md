---
title: "Fuse Replacement on the Super Nintendo and Super Famicom"
author: "Nix McRetro"
date: 2016-07-31T08:48:33.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [nintendo, repairs]
---

![4466233](/assets/images/2016/img_0506.jpg)

Back in March 2012 I replaced a fuse in a [Sega Mega-CD](/fuse-replacement-on-the-sega-mega-cd-model-1/), and the good news is these PICO parts are still around. The parts I was considering here have a different current rating. Before replacing a blown SNES or Super Famicom fuse, first confirm that the original fuse is actually open with a multimeter and consider why it failed.

I originally wrote that PAL consoles wanted 250 V fuses because Australia uses high-voltage mains, while NTSC consoles wanted 125 V parts. That's not how this fuse rating works. The console fuse is in the low-voltage circuit after the external power supply. A fuse's voltage rating is the **maximum circuit voltage it can safely interrupt**. A 250 V rated fuse can be used in a much lower-voltage circuit, provided its other ratings and characteristics suit that circuit. It does not mean 250 V is flowing through the SNES.

For a replacement, the important things include:

- the required current rating
- the correct operating speed / time-current characteristic
- sufficient voltage and interrupting ratings for the circuit's AC or DC supply
- the appropriate physical package

The 1.5 A 250 V Littelfuse PICO parts I was looking at are therefore candidates to check against the original fuse and the actual board, not automatic replacements for every SNES or Super Famicom.

The parts I had been looking at included the ["LITTELFUSE 026301.5WRT1L FUSE, PCB, 1.5A, 250V, VERY FAST ACTING"](https://docs.rs-online.com/d2e5/0900766b8146424d.pdf) and ["LITTELFUSE 026301.5MXL FUSE, PCB, 1.5A, 250V, VERY FAST ACTING"](https://au.element14.com/littelfuse/026301-5mxl/fuse-pcb-1-5a-250v-very-fast-acting/dp/1183391).

```text
Product Range: PICO II Series Fuse
Current: 1.5A
Voltage Rating V AC: 250VAC
Blow Characteristic: Very Fast Acting
Fuse Case Style: Axial Leaded
Breaking Capacity Current AC: 50A at 250VAC
```

And if the replacement fuse immediately opens again, stop and find the underlying fault. A fuse is usually protecting the circuit from something else, not asking for an endless supply of fresh fuses. Replace those caps, you know you want to! ...after actually diagnosing the problem. ;)

### Sources

- [Littelfuse - 263 Series, PICO II 250 Volt, Very Fast-Acting Fuse (2013 datasheet)](https://docs.rs-online.com/d2e5/0900766b8146424d.pdf)
- [Littelfuse - Fuseology Selection Guide](https://www.littelfuse.com/assetdocs/fuseology-selection-guide?assetguid=e0a12d55-c89a-4e06-94e0-9fe3281f889f)

### Related posts

- [Fuse Replacement on the Sega Mega-CD Model 1](/fuse-replacement-on-the-sega-mega-cd-model-1/)
- [PICO Fuses by Littelfuse](/pico-fuses-by-littelfuse/)
