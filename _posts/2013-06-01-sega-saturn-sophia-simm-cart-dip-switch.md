---
title: "Sega Saturn Sophia SIMM CART DIP Switch"
author: "Nix McRetro"
date: 2013-06-01T05:16:58.000+10:00
last_modified_at: 2026-10-18
categories: [devkit, repairs, sega]
---

{% include youtube.html id="BRctWGCd0h4" %}

Here's a test of the `SIMM CART` switch on SW2 at the front of the Sega Saturn Sophia Programming Box. My first interpretation was that it simply selected between the internal SIMM memory and the Saturn cartridge slot. Sega's development documentation shows that it is more complicated than that.


I've got quite a collection of SIMMs sitting around the workbench, and naturally I've managed to forget which ones are which. Some appear to be 4 MB or 8 MB modules, and there are different access speeds too. Sophia's documentation calls for particular memory specifications, so there's rather more to this than simply finding a module that fits the socket.

The hardware itself is still a bit of an adventure. I'm using the 171-6692B SH-2 boards rather than the versions I really want, and I've had to make a few custom connections to get everything working. One day I'll find the proper processor cards for this machine. One day!

**What SIMM CART Actually Changes**

The Programming Box can map its internal SIMM memory into address space associated with the Saturn's external cartridge area.

Sega's development FAQ documents these SIMM mappings:

- `SIMMCART OFF`: SIMM mapped at `24000000h` to `24FFFFFFh`, giving a 16 MB contiguous address window
- `SIMMCART ON`: SIMM mapped at `22000000h` to `23FFFFFFh`, giving a 32 MB contiguous address window

Sega's extended RAM documentation separately warns that installed Programming Box SIMM memory can overlap the extended RAM cartridge address space. It also states that when DIP switch 2, `SIMMCART`, is OFF, the system cannot read the external cartridge ID.

So the behaviour I observed was real, but my original "SIMM versus cartridge slot" explanation was too simple. `SIMMCART` is involved in how the Programming Box maps its SIMM memory, and that mapping can interfere with access to retail extended-RAM cartridges.

In this test, `SIMM CART ON` (down) appeared to ignore the cartridge slot, while `SIMM CART OFF` (up) booted to the Action Replay. Booting its menu did not establish that the RAM expansion was working.

I started with *X-Men Vs. Street Fighter*, which requires a 4 MB RAM cartridge, followed by *The King of Fighters '96*, which uses a 1 MB cartridge. Both were giving me error messages, although interpreting the Japanese text was proving almost as difficult as getting the memory working.

I tried different SIMMs and switch positions, turning the machine off between changes. Unfortunately, the games were remarkably consistent in their refusal to cooperate. I was beginning to suspect that my understanding of the switch was completely wrong.

With the Action Replay 4M Plus installed, things became a little more interesting. In this test, `SIMM CART ON` (down) appeared to ignore the cartridge slot, while `SIMM CART OFF` (up) booted to the Action Replay. Booting its menu did not establish that the RAM expansion was working.

**Retail RAM Cartridge Test Candidates**

My test notes and possible follow-ups included:

- [The King of Fighters '96](https://www.satakore.com/sega-saturn-game,,T-3108G,,The-King-of-Fighters-96-JPN.html) (`T-3108G`), 1 MB RAM cartridge; my original test notes warned of garbled graphics with a 4 MB cartridge.
- [X-Men Vs. Street Fighter](https://www.satakore.com/sega-saturn-game,,T-1227G,,X-Men-Vs.-Street-Fighter-JPN.html) (`T-1227G`), 4 MB RAM cartridge.
- [Pia Carrot he Youkoso!! 2](https://www.satakore.com/sega-saturn-game,,T-20114G,,Pia-Carrot-he-Youkoso-2-JPN.html) (`T-20114G`), optional 1 MB or 4 MB RAM cartridge in my test notes. I hoped its title screen might help distinguish no RAM, 1 MB and 4 MB configurations.

I even spent some time testing *Pia Carrot*, which was rather more entertaining than staring at error screens all evening. Unfortunately, watching a game boot isn't quite the same as proving which RAM configuration it's using. At least it gave the XRGB-Mini something interesting to display.

In my 26th May 2013 forum notes, I reported error screens from both The King of Fighters '96 and X-Men Vs. Street Fighter on the Sophia, and trouble getting the Action Replay Plus recognised as a valid RAM cartridge. A retail Saturn cross-check was mixed: X-Men Vs. Street Fighter still failed with that Action Replay, while The King of Fighters '96 worked.

I still don't trust "auto" Action Replay cartridges as a clean diagnostic tool for this sort of thing. Better to test known hardware against known configurations.

So we've established that the switch makes a difference, even if it isn't doing quite what I originally expected. Sophia is rather more complicated than an ordinary retail Saturn, which probably explains why the whole thing needs to live in a box almost large enough to transport on a pickup truck!

More information can be found in the archived [ASSEMblergames discussion](https://web.archive.org/web/20191111163144/https://assemblergames.com/threads/saturn-sh-2-supports-16mb-mem-ram-upgrade.42122/).

**Sources**

- [Sega Saturn Developer FAQ - Simple CD simulator and SIMM system](http://docs.exodusemulator.com/Archives/SSDDV25/segahtml/faq/devl/p08_10.htm) - documents the Programming Box SIMM address mappings for `SIMMCART` OFF and ON.
- [Sega Saturn Developer's Information STN-47](https://www.infochunk.com/saturn/segahtml_en/info/hon/stn47.htm) - documents the extended RAM cartridge address-space overlap and the cartridge-ID limitation when `SIMMCART` is OFF.
