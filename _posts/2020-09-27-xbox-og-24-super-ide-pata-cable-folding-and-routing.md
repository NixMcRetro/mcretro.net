---
title: "Xbox OG 24\" Super IDE PATA Cable Folding and Routing"
author: "Nix McRetro"
date: 2020-09-27T10:47:31.000+10:00
categories: [guides, microsoft, youtube]
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
---

{% include youtube.html id="oHE2vqzA61g" %}

These things are supposed to be limited to 18 inches. I had no issues in my testing at 24 inches, but that's still beyond the normal cable limit. Your mileage may vary! The 80-conductor cable still uses 40-pin connectors; the extra 40 wires are grounds between the signal wires, helping to reduce crosstalk. That helps with the higher UDMA modes, although extra length can still cause signal trouble. Don't look at me, I'm not a physicist. Unless I'm playing Half-Life.

With the power of a super-long 24-inch, 80-conductor IDE/PATA cable, we get to work. I just hope the cable you have... has the connectors in the correct orientation!

{% include youtube.html id="PzYaKbfWQ44" %}

I referenced the above cable-folding video by Mod-Heure when routing this around the Xbox. This is an 80-conductor IDE/PATA cable with 40-pin connectors.

### Sources

- [Seagate - Medalist ATA installation guide (18-inch cable limit)](https://www.seagate.com/staticfiles/support/disc/iguides/ata/k33igb.pdf)
- [Intel - 855GME and 6300ESB Embedded Platform Design Guide (80-conductor IDE cable, page 195)](https://download.intel.com/design/intarch/designgd/30066905.pdf)
