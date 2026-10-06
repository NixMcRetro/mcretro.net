---
title: "SNES SuperCIC Switchless Modchip - More Testing (Part 3)"
author: "Nix McRetro"
date: 2013-11-28T19:31:02.000+11:00
last_modified_at: 2026-10-07
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-07
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="Nt16y4l6Hcg" %}

They always say you can never have enough testing, so let's test the homemade SNES cartridge I made a few weeks (or is that up to months now?) ago, combined with the SuperCIC beast.

I had to remove the CIC on the cartridge for this experiment. My guess was that the PAL donor cart was giving the SuperCIC the wrong region for the replacement game. Makes sense when you think about it!

In automatic mode, the SuperCIC follows the cartridge CIC's region, which can differ from the replacement game's region. It also has forced 50 Hz and 60 Hz modes, so it doesn't always have to match the cartridge. Removing a cartridge's CIC isn't a general requirement for using a SuperCIC console.

Years later, in 2020, I revisited this EarthBound cartridge and installed a SuperCIC key in the cartridge itself. Apparently the CIC saga was not finished with me yet.

### Sources

- [SuperCIC - ikari's project page](https://sd2snes.de/blog/cool-stuff/supercic)
- [SuperCIC lock firmware source and operating modes](https://github.com/mrehkopf/sd2snes/blob/master/cic/supercic/supercic-lock.asm)

### Related posts

- [SNES SuperCIC Switchless Modchip - Installation (Part 1)](/snes-supercic-switchless-modchip-installation-part-1/)
- [SNES SuperCIC Switchless Modchip - The Test (Part 2)](/snes-supercic-switchless-modchip-the-test-part-2/)
- [EarthBound Cartridge (SHVC-1J3M-20) SuperCIC Key](/earthbound-cartridge-shvc-1j3m-20-supercic-key/)
