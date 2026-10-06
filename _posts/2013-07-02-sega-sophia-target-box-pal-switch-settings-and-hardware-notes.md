---
title: "Sega Sophia Target Box PAL Switch Settings and Hardware Notes"
author: "Nix McRetro"
date: 2013-07-02T12:01:49.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, repairs, sega]
---

![](/assets/images/2013/img_0409.jpg)

Here are the PAL switch settings and hardware notes I recorded from my Sega Saturn Sophia Programming Box. I originally called these the "factory settings", but I have not established that they were universal PAL factory defaults.

One useful troubleshooting note from the time: if no video appears, it may be worth trying the NTSC / PAL switch in the NTSC (OFF) position. I remember some display trouble around this setting, although I did not fully characterise it. A TV that supports both PAL and NTSC makes that experiment easier. Thanks globalisation!

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

**Hardware notes**

- My Sophia arrived with one 8 MB Samsung KMM5362000B2G-7 SIMM, rated at 70 ns.
- Sega's Programming Box documentation supports up to four 8 MB SIMMs, giving a maximum of 32 MB.
- The A-Bus board is the upper board carrying the SIMM sockets.
- The cable from the A-Bus area to the SH-2 CPU cards is the branched EVA-board power cable I had been investigating.

**Things I hadn't worked out yet**

- What are the HCD63 markings on Sophia?
- What is the EVA-PO-S / EVA-P0-S 4-pin header CN10 connector that joins CN4 on the SH-2 CPU Card?
- 171-6692B (ADK-7000) vs 171-6692D (HCD63) - manufacturers perhaps?

Until we know, I guess we'll never know.

### Sources

- [Sega Saturn Developer FAQ - Programming Box SIMM system](http://docs.exodusemulator.com/Archives/SSDDV25/segahtml/faq/devl/p08_10.htm)
