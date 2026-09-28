---
title: "PicoPSU 80W on PIII 800MHz Overview"
author: "Nix McRetro"
date: 2012-11-05T19:32:48.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="svhVakdRmKI" %}

Here's an idea of what the PicoPSU chews up when connected to a Pentium III 800MHz machine with 512MB RAM, hard drive, and floppy drive attached. It performs surprisingly well. I should really retest this with the unit under load and see how high the wattage use can become.

The PicoPSU was first tested on the Amstrad Mega PC a few months ago with an adapter to suit AT-style power supplies. It worked well then, but I did not have access to a power usage meter. Now I can check the juice that is being eaten by whatever device is attached. Load monitoring is quite important. The PicoPSU-80 has an 80W overall rating, but individual rail limits and the capacity of the external 12V supply also matter. An overloaded setup may become unstable, shut down, overheat or potentially damage components depending on which limit is being exceeded. The wall-power meter also includes losses in the external AC-to-12V power brick, so its reading is not the same as the DC output load on the PicoPSU itself.


### Sources

- [Mini-Box picoPSU-80](https://mini-box.com.au/product/picopsu-80-80w/) - documents the 80W rating, 12V input and individual output limits of the picoPSU-80.
