---
title: "Dumping the Apple 341-0813 Mac Classic ROM"
author: "Nix McRetro"
date: 2020-01-05T21:59:02.000+11:00
categories: [apple]
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
---

![](/assets/images/2020/img_0640.jpg)

Ah yes, the old Apple 341-0813 ROM, stored in a [TC534200P-F749 mask ROM](/assets/uploads/TOSHS15431-1.pdf). Its pin layout matches the [M27C400 EPROM](https://static1.squarespace.com/static/51f517f0e4b01da70d01ca2a/t/5454661be4b0f13e01c65a6b/1414817502296/M27C400.pdf), whose programmer profile worked for reading it. The GQ-4X's D27C4000 / uPD27C4000 profile also produced usable reads. These were read profiles for this ROM, not programming settings for a mask ROM. Then I remembered that chip from way back when I was given some [Japanese Sega Channels to dump](https://forums.sonicretro.org/index.php?threads/more-sega-channel-prototypes-dumped.25935/page-8#post-764315).

The reads I trusted repeatedly produced `02FFEC64` as the checksum displayed by the GQ-4X. Selecting the AM27C400 profile instead gave a different but repeatable `0361A4B4` result, which did not match the reference ROM image. A repeatable checksum alone doesn't make a dump good.

![](/assets/images/2020/img_0638.jpg)

The good dump matched the reference image labelled `A49F9914 - Classic (with XO ROMDisk).rom`, and it also worked in Mini vMac. For my GQ-4X workflow, I had to byte-swap that image before writing it to a 27C400 EPROM. Quite an interesting machine with [System 6.0.3 in the ROM](https://lowendmac.com/1990/mac-classic/).

![](/assets/images/2020/img_0639.jpg)

Thanks to [Mini vMac](https://www.gryphel.com/c/minivmac/) for allowing us to test the ROM easily, and to the ROM creators for using Gary as padding.

### Sources

- [Toshiba TC534200 mask ROM datasheet](/assets/uploads/TOSHS15431-1.pdf)
- [STMicroelectronics M27C400 EPROM datasheet](https://static1.squarespace.com/static/51f517f0e4b01da70d01ca2a/t/5454661be4b0f13e01c65a6b/1414817502296/M27C400.pdf)
