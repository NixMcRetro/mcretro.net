---
title: "Sega Sophia Target Box - Factory Settings for PAL"
author: "Nix McRetro"
date: 2013-07-02T12:01:49.000+10:00
categories: [guides, repairs, sega]
---

![](/assets/images/2013/img_0409.jpg)

Here's some notes from my work on the Sega / Cross Systems Sophia. Please note that if no video is showing it might be worth switching the NTSC / PAL switch to NTSC (OFF) as there were some issues from memory. Doesn't mean much these days with TVs being 50 / 60Hz worldwide - Thanks globalisation!

**Switch Bank 1**

- AREA0 = ON
- AREA1 = ON
- AREA2 = OFF
- AREA3 = OFF
- NTSC/PAL = ON
- 6 = OFF
- 7 = OFF
- 8 = OFF

**Switch Bank 2**

- WS0 = OFF
- WS1 = OFF
- SCSIBOOT = OFF
- SCSI ON = OFF
- SIMMCART = ON
- 6 = OFF
- 7 = OFF
- 8 = ON

**Notes**

- Sophia shipped with 1x 8MB RAM chip from factory, Samsung KMM5362000B2G-7, access time 70ns.
- The A-Bus board is the top board with the RAM slots.
- Maximum RAM is 32MB (4x 8MB).
- The cable running from the Sophia A-Bus board to the SH-2 CPU cards is a branched EVA board power cable.

**Things I hadn't worked out yet**

- What are the HCD63 markings on Sophia?
- What is the EVA-PO-S / EVA-P0-S 4-pin header CN10 connector that joins CN4 on the SH-2 CPU Card?
- 171-6692B (ADK-7000) vs 171-6692D (HCD63) - manufacturers perhaps?

Until we know, I guess we'll never know.
