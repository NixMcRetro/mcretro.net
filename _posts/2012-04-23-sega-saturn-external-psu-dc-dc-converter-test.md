---
title: "Sega Saturn External PSU DC-DC Converter Test"
author: "Nix McRetro"
date: 2012-04-23T21:08:18.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, repairs, sega]
---

{% include youtube.html id="rkyVIng0x90" %}

Finally received the DC-DC step-down converters for the Saturn. Gave them a quick bench test and confirmed that each converter produced an output. That established basic operation, but did not yet verify load regulation, ripple, current capacity or thermal behaviour under an actual Saturn load. I'll be able to wire them into a Saturn with a completely dead internal PSU in the next few weeks.

### Related posts

- [Sega Saturn Model 1 Power Supply Issues](/sega-saturn-model-1-power-supply-issues/)
- [Sega Saturn External PSU Proof of Concept](/sega-saturn-external-psu-proof-of-concept/)

### Sources

- [Keysight - Fundamentals of DC-DC Converter Testing](https://www.keysight.com/au/en/assets/7018-05723/application-notes/5992-2278.pdf) - outlines load regulation, ripple, efficiency and transient testing beyond a simple no-load output check.
