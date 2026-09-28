---
title: "Sega Saturn Sophia SIMM CART DIP Switch"
author: "Nix McRetro"
date: 2013-06-01T05:16:58.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [devkit, repairs, sega]
---

{% include youtube.html id="BRctWGCd0h4" %}

A test of the DIP switch labelled SIMM CART (on SW2) located on the front of the Sega Saturn Sophia Programming Box. At the time, it looked as though this simply switched between the SIMM RAM and the cartridge slot. There appeared to be some incompatibilities between the Sophia hardware and retail games as a result. I might pick up some retail RAM cartridges to be sure... I don't trust "auto" Action Replay cartridges...

Sega's technical documentation makes the interaction clearer. With SIMM fitted in the Programming Box, its address space overlaps the extended RAM cartridge area, and when DIP switch 2, SIMMCART, is turned off the system cannot read the cartridge ID. So the behaviour I saw was real, but describing the switch as simply selecting between SIMM RAM and the cartridge slot was too broad.

The King of Fighters '96 \[T-3108G\] - [1MB Cart Only](https://www.satakore.com/sega-saturn-game,,T-3108G,,The-King-of-Fighters-96-JPN.html) (If a 4MB cart is detected the graphics will be garbled.)

X-Men Vs. Street Fighter \[T-1227G\] - [4MB Cart Only](https://www.satakore.com/sega-saturn-game,,T-1227G,,X-Men-Vs.-Street-Fighter-JPN.html)

Pia Carrot he Youkoso!! 2 \[T-20114G\] - [1MB RAM or 4MB RAM Cart](https://www.satakore.com/sega-saturn-game,,T-20114G,,Pia-Carrot-he-Youkoso-2-JPN.html)

While RAM carts aren't required for this game, they will apparently show a different title screen. This would be helpful for showing what the Sophia is loading, whether it be no RAM, 1MB or 4MB.

SIMM CART ON (down) = Ignores Cart Slot SIMM CART OFF (up) = Boots to Cart Slot (Action Replay for Example)

More information can be found on [ASSEMblergames](https://web.archive.org/web/20191111163144/https://assemblergames.com/threads/saturn-sh-2-supports-16mb-mem-ram-upgrade.42122/) .

### Sources

- [SEGA SATURN TECHNICAL BULLETIN #47 - SEGASaturn Extended RAM Cartridge Manual Ver. 1.02](https://antime.kapsi.fi/sega/files/ST-TECH-47.pdf)
