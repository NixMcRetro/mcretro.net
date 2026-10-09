---
title: "Super Nintendo - Replacing C59 on the SNSP-CPU-01"
author: "Nix McRetro"
date: 2016-08-29T11:19:22.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [nintendo, repairs, youtube]
---

{% include youtube.html id="UsNQNxMeQok" %}

In this video we replace C59 on a PAL SNSP-CPU-01 mainboard. The important detail is that C59 is not completely consistent across these revisions. The -01 revision and some -02 boards were fitted with a polarised capacitor at C59, while most -02 boards use a bipolar / non-polar capacitor there. Nintendo therefore appears to have corrected this position during the revision history, but you should inspect the component actually fitted to the board rather than assuming every CPU-02 is identical.

I originally said this was the only noticeable difference between CPU-01 and CPU-02. That's too broad. The boards are extremely similar, but CPU-02 also has small layout changes such as the additional C67 mounting option.

In this machine all the other capacitors had already been replaced recently, leaving C59 as the lone job for the day. We also get to use the Hakko tweezers. Incredible how well they worked! Leaked SMD capacitors are mostly what I deal with, unfortunately. The entire repair took around 15 minutes, just enough time for my salmon to cook. :-)

### Sources

- [ConsoleMods - SNES Model Differences](https://consolemods.org/wiki/SNES:SNES_Model_Differences)

### Related posts

- [Capacitor Order Day](/capacitor-order-day/)
