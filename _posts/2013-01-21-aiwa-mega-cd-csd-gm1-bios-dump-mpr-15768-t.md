---
title: "Aiwa Mega-CD CSD-GM1 BIOS Dump: MPR-15768-T"
author: "Nix McRetro"
date: 2013-01-21T10:56:01.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, repairs, sega]
---

This one became a three-part project:

1. disassemble the Game Unit
2. desolder the BIOS ROM
3. dump the contents

{% include youtube.html id="sBpigjWEE8M" %}

{% include youtube.html id="ff4KOWv1g9I" %}

{% include youtube.html id="YPQgP6K1KOw" %}

The BIOS chip is labelled **MPR-15768-T**.

It is a mask ROM rather than an erasable 27C1024 EPROM, but I was able to read it using a 27C1024-compatible setup.

A 27C1024-class device stores 1 megabit as 64K x 16 bits, which works out to 128 KiB.

That is also the size of the BIOS image I dumped.

![](/assets/images/2013/img_0362.jpg)

At the time, I believed this was the first public dump of the Aiwa BIOS.

I cannot independently prove that priority claim now, so I would rather preserve it as what I understood in January 2013 than turn it into a definite modern claim.

What I **can** establish is that MPR-15768-T is now preserved and catalogued as a 128 KiB Aiwa Mega-CD BIOS image, with CRC32 `8052c7a0`.

That makes this little exercise rather more interesting than simply practising with the programmer.

I later came back to this same area of the Game Unit to install a BIOS socket, repair damaged traces and burn replacement EPROMs.

For now, though, the important bit is done:

BIOS preserved.

More details from the original investigation can be found in the archived [ASSEMblergames thread](https://web.archive.org/web/20191111212702/https://assemblergames.com/threads/aiwa-mega-cd-game-unit-bios-dump-mpr-15768-t-2-11c.43866/).

### Related posts

- [Aiwa Mega-CD Game Unit BIOS Chip Socket Install & Trace Repair](/aiwa-mega-cd-game-unit-bios-chip-socket-install-trace-repair/)
- [Preparing and Burning an EPROM for the Aiwa Mega-CD CSD-GM1 Game Unit](/preparing-and-burning-an-eprom-for-the-aiwa-mega-cd-csd-gm1-game-unit/)

### Sources

- [Microchip AT27C1024](https://www.microchip.com/en-us/product/AT27C1024) - documents the 1 Mbit, 64K x 16 organisation used as the compatible reading format.
- [Sega-16 Forums - Existing Mega-CD BIOS Versions](https://www.sega-16forums.com/forum/console-talk/sega-cd-station/33430-list-of-existing-mega-cd-bios-versions) - preservation reference listing MPR-15768-T as a 128 KiB Aiwa Mega-CD BIOS with CRC32 8052c7a0.
