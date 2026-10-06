---
title: "Sega Saturn Sophia SIMM CART DIP Switch"
author: "Nix McRetro"
date: 2013-06-01T05:16:58.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [devkit, repairs, sega]
---

Here's a test of the `SIMM CART` switch on SW2 at the front of the Sega Saturn Sophia Programming Box. My first interpretation was that it simply selected between the internal SIMM memory and the Saturn cartridge slot. Sega's development documentation shows that it is more complicated than that.

{% include youtube.html id="BRctWGCd0h4" %}

### What SIMMCART actually changes

The Programming Box can map its internal SIMM memory into address space associated with the Saturn's external cartridge area.

Sega's development FAQ documents these SIMM mappings:

- `SIMMCART OFF`: SIMM mapped at `24000000h` to `24FFFFFFh`, giving a 16 MB contiguous address window
- `SIMMCART ON`: SIMM mapped at `22000000h` to `23FFFFFFh`, giving a 32 MB contiguous address window

Sega's extended RAM documentation separately warns that installed Programming Box SIMM memory can overlap the extended RAM cartridge address space. It also states that when DIP switch 2, `SIMMCART`, is OFF, the system cannot read the external cartridge ID.

So the behaviour I observed was real, but my original "SIMM versus cartridge slot" explanation was too simple. `SIMMCART` is involved in how the Programming Box maps its SIMM memory, and that mapping can interfere with access to retail extended-RAM cartridges.

In this test, `SIMM CART ON` (down) appeared to ignore the cartridge slot, while `SIMM CART OFF` (up) booted to the Action Replay. Booting its menu did not establish that the RAM expansion was working.

### Retail RAM cartridge test candidates

My test notes and possible follow-ups included:

- [The King of Fighters '96](https://www.satakore.com/sega-saturn-game,,T-3108G,,The-King-of-Fighters-96-JPN.html) (`T-3108G`), 1 MB RAM cartridge; my original test notes warned of garbled graphics with a 4 MB cartridge.
- [X-Men Vs. Street Fighter](https://www.satakore.com/sega-saturn-game,,T-1227G,,X-Men-Vs.-Street-Fighter-JPN.html) (`T-1227G`), 4 MB RAM cartridge.
- [Pia Carrot he Youkoso!! 2](https://www.satakore.com/sega-saturn-game,,T-20114G,,Pia-Carrot-he-Youkoso-2-JPN.html) (`T-20114G`), optional 1 MB or 4 MB RAM cartridge in my test notes. I hoped its title screen might help distinguish no RAM, 1 MB and 4 MB configurations.

In my 26 May 2013 forum notes, I reported error screens from both The King of Fighters '96 and X-Men Vs. Street Fighter on the Sophia, and trouble getting the Action Replay Plus recognised as a valid RAM cartridge. A retail Saturn cross-check was mixed: X-Men Vs. Street Fighter still failed with that Action Replay, while The King of Fighters '96 worked.

I still don't trust "auto" Action Replay cartridges as a clean diagnostic tool for this sort of thing. Better to test known hardware against known configurations.

More information can be found in the archived [ASSEMblergames discussion](https://web.archive.org/web/20191111163144/https://assemblergames.com/threads/saturn-sh-2-supports-16mb-mem-ram-upgrade.42122/).

### Sources

- [Sega Saturn Developer FAQ - Simple CD simulator and SIMM system](http://docs.exodusemulator.com/Archives/SSDDV25/segahtml/faq/devl/p08_10.htm) - documents the Programming Box SIMM address mappings for `SIMMCART` OFF and ON.
- [Sega Saturn Developer's Information STN-47](https://www.infochunk.com/saturn/segahtml_en/info/hon/stn47.htm) - documents the extended RAM cartridge address-space overlap and the cartridge-ID limitation when `SIMMCART` is OFF.
