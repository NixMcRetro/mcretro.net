---
title: "Dumping the Apple 341-0813 Mac Classic ROM"
author: "Nix McRetro"
date: 2020-01-05T21:59:02.000+11:00
categories: [apple]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2020/img_0640.jpg)

Ah yes, the old Apple 341-0813 ROM, implemented here as a [TC534200P-F749 mask ROM](/assets/uploads/TOSHS15431-1.pdf). Its layout made the [M27C400 EPROM](https://static1.squarespace.com/static/51f517f0e4b01da70d01ca2a/t/5454661be4b0f13e01c65a6b/1414817502296/M27C400.pdf) a useful programmer profile for this job. On the GQ-4X, the D27C4000 / uPD27C4000 profile also produced usable reads. "Compatible" here means those profiles worked for reading this particular ROM in my setup, not that every similarly named device is automatically interchangeable. Then I remembered that particular model of chip from way back when I was given some [Japanese Sega Channels to dump](https://forums.sonicretro.org/index.php?threads/more-sega-channel-prototypes-dumped.25935/page-8#post-764315).

The reads I trusted repeatedly produced `02FFEC64` as the checksum displayed by the GQ-4X. Selecting the AM27C400 profile instead gave a different but repeatable `0361A4B4` result, which did not match the known-good ROM image. A repeatable checksum is useful, but the important part is verifying the actual dumped bytes rather than assuming repetition alone means the data is correct.

![](/assets/images/2020/img_0638.jpg)

The good dump matched the known Macintosh Classic ROM image labelled `A49F9914 - Classic (with XO ROMDisk).rom`, and it also worked in Mini vMac. When preparing that known image for my particular programmer workflow, I had to byte-swap it for the 16-bit ROM layout. That byte-swap belongs to this setup rather than being a universal instruction for every programmer. Quite an interesting machine with [System 6.0.3 in the ROM](https://lowendmac.com/1990/mac-classic/).

![](/assets/images/2020/img_0639.jpg)

Thanks to [Mini vMac](https://www.gryphel.com/c/minivmac/) for allowing us to test the ROM easily and to the ROM creators for adding using Gary as padding.

### Sources

- [Toshiba TC534200 mask ROM datasheet](/assets/uploads/TOSHS15431-1.pdf)
- [STMicroelectronics M27C400 EPROM datasheet](https://static1.squarespace.com/static/51f517f0e4b01da70d01ca2a/t/5454661be4b0f13e01c65a6b/1414817502296/M27C400.pdf)
