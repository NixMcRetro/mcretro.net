---
title: "S-MIX on the SNES SNSP-CPU-1CHIP-01 / SNSP-CPU-1CHIP-02"
author: "Nix McRetro"
date: 2016-09-07T06:45:38.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, nintendo, repairs]
---

![s-mix](/assets/images/2016/img_0552.jpg)

Long-time readers might remember the S-MIX chip with a physical hole blown in it on my old SNSP-CPU-1CHIP-02. This time I had another 1CHIP Super Nintendo with no sound and a chance to revisit the idea.

![img_0969](/assets/images/2016/img_0551.jpg)

I reversed the polarity! ...I kid, I kid. What I actually did was route audio from the UPD6379A DAC at U6 to the AV output on the underside of the board, bypassing the S-MIX path. 30 AWG Kynar fitted nicely through the vias.

On **this particular board**, the bypass restored audible game audio. From what I could tell playing Madden, the sound was all there too.

**No audio issue solved! Fixed! Repaired! Sound for everyone! :)**

Will that be good for the system long term? I have no idea. Borti warned that driving a long cable directly from the DAC could damage it over time. Bypassing the S-MIX is not electrically identical to repairing the original audio circuit, so this is a workaround on the board I tested rather than a universal no-sound repair.

Big thanks to [Stian](https://web.archive.org/web/20191029031401/http://nintendoage.com/forum/messageview.cfm?catid=8&threadid=156634), [Armando92](https://www.youtube.com/channel/UCpQ4cGZT5ugySL7jiX9LFKA), [Borti](https://web.archive.org/web/20191112060628/https://assemblergames.com/threads/snes-mainboard-repair-no-sound-serial-up17372657.63061/) and [Console5](https://console5.com/wiki/UPD6379) for the information that got me this far.

### Sources

- [Console5 TechWiki - UPD6379](https://console5.com/wiki/UPD6379)
- [NEC - UPD6379, 6379A, 6379L, 6379AL datasheet](https://wiki.console5.com/tw/images/9/98/UPD6379.pdf)
- [NintendoAge - SNES 1chip with no sound (archived)](https://web.archive.org/web/20191029031401/http://nintendoage.com/forum/messageview.cfm?catid=8&threadid=156634)
- [ASSEMblerGames - SNES mainboard repair, no sound (serial UP17372657) (archived)](https://web.archive.org/web/20191112060628/https://assemblergames.com/threads/snes-mainboard-repair-no-sound-serial-up17372657.63061/)

### Related posts

- [Damaged S-MIX on a SNES SNSP-CPU-1CHIP-02 Mainboard](/damaged-s-mix-on-a-snes-snsp-cpu-1chip-02-mainboard/)
- [Capacitor Order Day](/capacitor-order-day/)
