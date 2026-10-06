---
title: "Bosch PHG 630 DCE Heat Gun: Destructive Xbox CPU Removal"
author: "Nix McRetro"
date: 2013-05-23T04:05:18.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, microsoft, repairs]
---

One, two, three... Lift!

{% include youtube.html id="-7eQiuuvqsY" %}

Up comes the Xbox CPU. It certainly shows that the heat gun outputs heat!

This is absolutely **not** a demonstration of how to perform a proper BGA rework.

The motherboard was already dead and I only kept it as a donor because I wanted components from it, including RAM for a future 128 MB Xbox upgrade for playing debug games. The Bosch heat gun simply provides enough broad hot air to get the solder underneath the BGA package hot enough that I can remove the processor destructively.

A proper BGA removal and replacement process uses controlled heating, board support, appropriate temperature profiling and equipment designed for the job. Blasting a motherboard with a handheld heat gun can overheat nearby components, damage the PCB, lift pads or warp the board. None of that mattered very much to this particular donor.

What it **does** give us is a nice look underneath the Xbox CPU.

BGA stands for ball grid array. Instead of visible leads running around the edge of the package, the electrical connections are arranged as a grid of solder balls underneath it.

Once the CPU is off the board, that grid becomes rather impressive. Complex little thing, isn't it?

### Sources

- [Bosch - PHG 500-2 / PHG 600-3 / PHG 630 DCE original instructions](https://s.productreview.com.au/products/manuals/76006_565e3904f3136.pdf) - manufacturer manual in a third-party PDF mirror; English section on printed pages 12-17.
- [Texas Instruments - 54-BGA Package](https://www.ti.com/lit/pdf/szza040) - generic BGA handling and controlled rework guidance, section 5.1 on printed page 14.
- [Texas Instruments - MicroStar BGA Packaging Reference Guide](https://www.ti.com/lit/pdf/szza005) - generic BGA assembly guidance, including board support on printed page 18.
