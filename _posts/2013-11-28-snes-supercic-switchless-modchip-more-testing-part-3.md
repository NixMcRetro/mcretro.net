---
title: "SNES SuperCIC Switchless Modchip - More Testing (Part 3)"
author: "Nix McRetro"
date: 2013-11-28T19:31:02.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, nintendo, youtube]
---

{% include youtube.html id="Nt16y4l6Hcg" %}

They always say you can never have enough testing.

So let's combine the SuperCIC console with the homemade SNES cartridge I built a few weeks earlier.

This exposed an interesting problem.

The donor cartridge was PAL, so it still carried a PAL CIC key.

The game image I had programmed into the cartridge was from another region.

A SuperCIC console lock can normally detect the region of an ordinary cartridge CIC and switch accordingly.

In this homemade cartridge, however, the donor CIC was describing the **donor board's region**, not necessarily the region expected by the replacement game image.

That is why removing the donor CIC helped this particular experiment.

It should not be turned into the general rule that cartridges need their CIC removed to work with a SuperCIC console.

I eventually revisited this exact EarthBound cartridge years later and installed a SuperCIC key in the cartridge itself.

Apparently the CIC saga was not finished with me yet.

### Related posts

- [SNES SuperCIC Switchless Modchip - Installation (Part 1)](/snes-supercic-switchless-modchip-installation-part-1/)
- [SNES SuperCIC Switchless Modchip - The Test (Part 2)](/snes-supercic-switchless-modchip-the-test-part-2/)
- [EarthBound Cartridge (SHVC-1J3M-20) SuperCIC Key](/earthbound-cartridge-shvc-1j3m-20-supercic-key/)

### Sources

- [SuperCIC Lock Firmware and Documentation](https://sd2snes.de/blog/cool-stuff/supercic)
