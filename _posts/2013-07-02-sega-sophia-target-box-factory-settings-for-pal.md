---
title: "Sega Sophia Target Box - Factory Settings for PAL"
author: "Nix McRetro"
date: 2013-07-02T12:01:49.000+10:00
categories: [guides, repairs, sega]
---

![](/assets/images/2013/img_0409.jpg)

Here's some notes from my work on the Sega / Cross Systems Sophia. Please note that if no video is showing it might be worth switching the NTSC / PAL switch to NTSC (OFF) as there were some issues from memory. Doesn't mean much these days with TVs being 50 / 60Hz worldwide - Thanks globalisation!

`**Switch Bank 1** AREA0=ON AREA1=ON AREA2=OFF AREA3=OFF NTSC/PAL=ON 6=OFF 7=OFF 8=OFF`

`**Switch Bank 2** WS0=OFF WS1=OFF SCSIBOOT=OFF SCSI ON=OFF SIMMCART=ON 6=OFF 7=OFF 8=ON`

**Notes:** - Sophia shipped with 1x 8MB RAM chip from factory, Samsung KMM5362000B2G-7, access time 70ns. - A-Bus board is the top board with RAM slots. 32MB RAM maximum (4x8MB). - Cable running from Sophia A-Bus board to SH-2 CPU cards is a branched EVA board power cable.

What I haven't been able to work out is the following: - What are the HCD63 markings on Sophia. - What is the EVA-PO-S / EVA-P0-S 4-pin header CN10 connector joins CN4 on SH-2 CPU Card. - 171-6692B (ADK-7000) vs 171-6692D (HCD63) - Manufacturers perhaps?

Until we know, I guess we'll never know.
