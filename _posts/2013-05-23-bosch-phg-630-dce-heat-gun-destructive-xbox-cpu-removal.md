---
title: "Bosch PHG 630 DCE Heat Gun: Destructive Xbox CPU Removal"
author: "Nix McRetro"
date: 2013-05-23T04:05:18.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, microsoft, repairs]
---


{% include youtube.html id="-7eQiuuvqsY" %}

I've picked up a few new tools for the workbench, including a decent pair of bent needle-nose pliers and some wire cutters. The pliers are particularly nice, even better than the pair I've been using at work. The most exciting purchase, though, is a Bosch PHG 630 DCE heat gun, which cost me around $100 Australian from Bunnings.

It's quite a substantial tool, with a long power cable, three fan speeds and adjustable temperature control. There's even a display on the back so I can see what the gun is doing. Much nicer than the generic handheld heat gun I've been using previously.

Naturally I had to find something to test it on. What better candidate than the dead Xbox motherboard sent to me by Hex1gon? This board was already beyond repair as far as I was concerned, but I wanted to keep it for donor components, including the RAM for a possible 128 MB Xbox upgrade in the future.

The idea was to see whether I could remove the CPU and have a look underneath the package. I turned the heat gun up and started applying hot air, with a small jeweller's screwdriver ready to lift the chip once the solder softened. The gun also appeared to reduce its output when I moved it too close to the board, which was an interesting feature to watch.

One, two, three... Lift!

Up came the Xbox CPU! It certainly showed that the Bosch could produce plenty of heat, although the result wasn't particularly gentle. Some of the solder balls remained attached, while others tore away with parts of the connection underneath. The motherboard was already dead, so preserving those connections wasn't the aim of this experiment.

BGA stands for ball grid array. Instead of having visible leads along the sides of the chip, the connections are arranged as solder balls underneath the package. Once the CPU was removed, the whole grid was exposed, making it much easier to see how the processor was connected to the board.

The temperature displayed on the heat gun was the gun's setting and feedback, not a measurement of the actual solder-joint temperature. This was a destructive demonstration on a scrap board, not a proper BGA rework procedure. Reliable removal and replacement requires controlled heating, support for the PCB and equipment designed for that job.

I also talked about how solder joints can be affected by repeated heating and cooling. That can be relevant to some failures, although seeing a BGA package removed like this doesn't establish the cause of the Xbox 360's Red Ring of Death or the PlayStation 3's Yellow Light of Death. There are several possible failure mechanisms involved in those machines.

For the moment, the dead Xbox motherboard can go back into the donor pile. I still want to recover some of the RAM and see whether I can put it to good use in another console. The Bosch heat gun seems like a useful workshop addition, even if this particular demonstration was rather rough on the poor old CPU.

**Sources**

- [Bosch - PHG 500-2 / PHG 600-3 / PHG 630 DCE Original Instructions](https://s.productreview.com.au/products/manuals/76006_565e3904f3136.pdf) - manufacturer instructions, English section on printed pages 12-17.
- [Texas Instruments - 54-BGA Package](https://www.ti.com/lit/pdf/szza040) - generic BGA handling and controlled rework guidance.
- [Texas Instruments - MicroStar BGA Packaging Reference Guide](https://www.ti.com/lit/pdf/szza005) - generic BGA assembly and board-support guidance.
