---
title: "Aiwa Mega-CD CSD-GM1 BIOS Dump: MPR-15768-T"
author: "Nix McRetro"
date: 2013-01-21T10:56:01.000+11:00
last_modified_at: 2026-10-05
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-05
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, repairs, sega]
---

This one became a three-part project:

1. disassemble the Game Unit
2. desolder the BIOS ROM
3. dump the contents

{% include youtube.html id="sBpigjWEE8M" %}

{% include youtube.html id="ff4KOWv1g9I" %}

{% include youtube.html id="YPQgP6K1KOw" %}

The BIOS chip is labelled **MPR-15768-T**. It is a mask ROM rather than an erasable 27C1024 EPROM, but I was able to read it using a 27C1024-compatible setup. A 27C1024-class device stores 1 megabit as 64K x 16 bits, which works out to 128 KiB. That is also the size of the BIOS image I dumped.

![](/assets/images/2013/img_0362.jpg)

At the time, I believed this was the first public dump of the Aiwa BIOS. MAME now catalogues `mpr-15768-t.bin` for the Aiwa with a size of 128 KiB and CRC32 `8052c7a0`. That confirms the catalogue entry, but not who released the first public dump.

That makes this little exercise rather more interesting than simply practising with the programmer.

I later came back to this same area of the Game Unit to install a BIOS socket, repair damaged traces and burn replacement EPROMs.

For now, though, the important bit is done:

BIOS preserved.

More details from the original investigation can be found in the archived [ASSEMblergames thread](https://web.archive.org/web/20191111212702/https://assemblergames.com/threads/aiwa-mega-cd-game-unit-bios-dump-mpr-15768-t-2-11c.43866/).

### Related posts

- [Aiwa Mega-CD Game Unit BIOS Socket Installation and Trace Repair](/aiwa-mega-cd-game-unit-bios-socket-installation-and-trace-repair/)
- [Aiwa Mega-CD CSD-GM1 Game Unit EPROM Programming and Repair Test](/aiwa-mega-cd-csd-gm1-game-unit-eprom-programming-and-repair-test/)

### Sources

- [Atmel - AT27C1024 Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/doc0019.pdf) - documents the 1 Mbit, 64K x 16 organisation; this does not itself establish the Aiwa mask ROM's compatibility.
- [MAME - Aiwa Mega-CD ROM definition in mdconsole.cpp](https://github.com/mamedev/mame/blob/master/src/mame/sega/mdconsole.cpp) - lists `mpr-15768-t.bin`, a load size of `0x020000` bytes (128 KiB) and CRC32 `8052c7a0`.
