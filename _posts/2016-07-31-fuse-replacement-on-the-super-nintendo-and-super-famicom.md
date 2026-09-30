---
title: "Fuse Replacement on the Super Nintendo and Super Famicom"
author: "Nix McRetro"
date: 2016-07-31T08:48:33.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [nintendo, repairs]
---

![4466233](/assets/images/2016/img_0506.jpg)

Before replacing a blown SNES or Super Famicom fuse, first confirm that the original fuse is actually open with a multimeter and consider why it failed.

I originally wrote that PAL consoles wanted 250 V fuses because Australia uses high-voltage mains, while NTSC consoles wanted 125 V parts.

That's not how this fuse rating works.

The console fuse is in the low-voltage circuit after the external power supply.

A fuse's voltage rating is the **maximum circuit voltage it can safely interrupt**. A 250 V rated fuse can therefore be used in a much lower-voltage circuit. It does not mean 250 V is flowing through the SNES.

For a replacement, the important things include:

- the required current rating
- the correct operating speed / time-current characteristic
- sufficient voltage and interrupting ratings
- the appropriate physical package

The 1.5 A 250 V Littelfuse PICO parts I was looking at can therefore be suitable replacements for a compatible 1.5 A lower-voltage part, but not because the console happens to be PAL.

The parts I had been looking at included the ["LITTELFUSE 026301.5WRT1L FUSE, PCB, 1.5A, 250V, VERY FAST ACTING"](https://au.element14.com/littelfuse/026301-5wrt1l/fuse-pcb-1-5a-250v-very-fast-acting/dp/1826481) and ["LITTELFUSE 026301.5MXL FUSE, PCB, 1.5A, 250V, VERY FAST ACTING"](https://au.element14.com/littelfuse/026301-5mxl/fuse-pcb-1-5a-250v-very-fast-acting/dp/1183391).

`Product Range: PICO II Series Fuse
Current: 1.5A
Voltage Rating V AC: 250VAC
Blow Characteristic: Very Fast Acting
Fuse Case Style: Axial Leaded
Breaking Capacity Current AC: 50A`

And if the replacement fuse immediately opens again, stop and find the underlying fault.

A fuse is usually protecting the circuit from something else, not asking for an endless supply of fresh fuses.

Replace those caps, you know you want to!

...after actually diagnosing the problem. ;)

### Related posts

- [PICO Fuses by Littelfuse](/pico-fuses-by-littelfuse/)

### Sources

- [Littelfuse - Fuse Selection Technical Application Guide](https://www.littelfuse.com/technical-resources/fuseology)
