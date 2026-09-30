---
title: "Sony PS one ONECHIP Modchip Introduction"
author: "Nix McRetro"
date: 2013-11-27T01:27:11.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, sony, youtube]
---

{% include youtube.html id="KOO84WW6fSs" %}

MultiMode3, stand aside.

It works nicely on many of the older PlayStation revisions, but the PAL PS one SCPH-102 adds another complication.

The SCPH-102 boot ROM performs an additional territory check.

A conventional modchip that only handles the normal disc-authentication side of things does not by itself bypass that PAL PS one ROM check for imports.

Enter **ONEchip**.

ONEchip was designed specifically for the PAL PS one and combines the normal modchip behaviour with a boot-ROM patch that bypasses the additional territory check.

So my old description of this as simply "more copy protection" was directionally correct, but not particularly informative.

Naturally, now we have to install one.

### Sources

- [ConsoleMods Wiki - PS1 Region Information](https://consolemods.org/wiki/PS1:Region_Information)
- [ConsoleMods Wiki - PS1 Modchips](https://consolemods.org/wiki/PS1:Modchips)
