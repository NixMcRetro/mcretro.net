---
title: "Fuse Replacement on the Sega Mega-CD Model 1"
author: "Nix McRetro"
date: 2012-03-02T23:36:31.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega]
---

![](/assets/images/2012/img_0008.jpg)

Ohhhoooo so very [shiny](https://en.wikipedia.org/wiki/Firefly_(TV_series))! I discovered one of my Sega Mega-CDs has a blown fuse that someone replaced with a big blob of solder.

It certainly passes power that way, but the fuse is there for a reason. I want the little guy to have its proper overcurrent protection back, so a little bit of research led me to this:

**LITTELFUSE - 026302.5MXL**
- PICO II 263 Series
- Current rating: 2.5A
- Voltage rating: 250VAC
- Response: Very fast acting
- Mounting: Through-hole
- Package: Axial leaded
- Breaking capacity: 50A at 250VAC

This is the replacement I selected for my PAL unit. Another hardware revision or region may use something different, so check the board and service information rather than assuming the same specification.

Anyway [element14](https://au.element14.com/littelfuse/026302-5mxl/fuse-pcb-2-5a-250v-fast-acting/dp/1183392?Ntt=026302.5MXL) has them for a few dollars each. If not element14, you could always try [Farnell](https://www.farnell.com/) since they're the same company.

Looks pretty good to me. I should have my hands on them early next week.

### Sources

- [Littelfuse - 263 Series PICO II Fuse datasheet](https://www.littelfuse.com/assetdocs/littelfuse-fuse-263-datasheet?assetguid=bc110884-dddd-4484-99b4-3f33344a7afa) - manufacturer specifications for the 026302.5MXL fuse.
