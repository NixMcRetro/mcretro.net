---
title: "Sony PS one ONECHIP Modchip Introduction"
author: "Nix McRetro"
date: 2013-11-27T01:27:11.000+11:00
last_modified_at: 2026-10-07
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-07
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, sony, youtube]
---

{% include youtube.html id="KOO84WW6fSs" %}

MultiMode3, stand aside! It works nicely on many of the older PlayStation revisions, but Sony (creator of all things PlayStation) added another complication to the little PAL PS one SCPH-102: an additional territory check in the boot ROM.

Enter **ONECHIP**, the modchip firmware that combines normal disc-authentication behaviour with a boot-ROM patch to bypass that extra check for imports. A conventional modchip that only handles disc authentication doesn't bypass the additional PAL PS one check by itself. Naturally, now we have to install one.

### Sources

- [ConsoleMods Wiki - PS1 Region Information](https://consolemods.org/wiki/PS1:Region_Information)
- [ConsoleMods Wiki - PS1 Modchips](https://consolemods.org/wiki/PS1:Modchips)
- [TheFrietMan - PsNee v6 source and ONECHIP BIOS-patch analysis (2016)](https://gist.github.com/gbraad/d0c4e7396727bd362cd67e1e9e023385#file-psnee-v6-ino)
