---
title: "S-MIX on the SNES SNSP-CPU-1CHIP-01 / SNSP-CPU-1CHIP-02"
author: "Nix McRetro"
date: 2016-09-07T06:45:38.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, nintendo, repairs]
---

![s-mix](/assets/images/2016/img_0552.jpg)

Long-time readers might remember the S-MIX chip with a physical hole blown in it on my old SNSP-CPU-1CHIP-02.

This time I had another 1CHIP Super Nintendo with no sound and a chance to revisit the idea.

I reversed the polarity!

...I kid, I kid.

![img_0969](/assets/images/2016/img_0551.jpg)

What I actually did was route audio from the UPD6379A DAC at U6 to the AV output on the underside of the board, bypassing the S-MIX path.

30 AWG Kynar fitted nicely through the vias.

On **this particular board**, the bypass restored audible game audio.

At the time I was ready to declare:

**No audio issue solved! Fixed! Repaired! Sound for everyone! :)**

That enthusiasm got a little ahead of the evidence.

That makes it a useful fault workaround, but I should not have immediately declared it a universal repair for every 1CHIP SNES / Super Famicom.

The S-MIX normally sits in the audio path for a reason, and bypassing circuitry is not electrically identical to repairing the original circuit.

At the time I did not know the long-term implications of loading the DAC this way. There was already discussion about whether the direct arrangement could stress it.

So the useful historical result is:

**this bypass restored sound on the board I tested.**

It is not evidence that every no-sound 1CHIP should be rewired this way without diagnosis.

Big thanks to [Stian](https://web.archive.org/web/20191029031401/http://nintendoage.com/forum/messageview.cfm?catid=8&threadid=156634), [Armando92](https://www.youtube.com/channel/UCpQ4cGZT5ugySL7jiX9LFKA), [Borti](https://web.archive.org/web/20191113111423/https://assemblergames.com/members/borti4938.90935/) and [Console5](https://console5.com/wiki/UPD6379) for the information that got me this far.

### Related posts

- [Damaged S-MIX on a SNES SNSP-CPU-1CHIP-02 Mainboard](/damaged-s-mix-on-a-snes-snsp-cpu-1chip-02-mainboard/)

### Sources

- [Console5 - UPD6379](https://console5.com/wiki/UPD6379)
- [NintendoAge - S-MIX discussion (archived)](https://web.archive.org/web/20191029031401/http://nintendoage.com/forum/messageview.cfm?catid=8&threadid=156634)
