---
title: "Aiwa Sega Mega-CD CSD-GM1 Unit-01 Mainboard: More Capacitors"
author: "Nix McRetro"
date: 2013-08-06T15:29:07.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega, youtube]
---

More capacitor work on the revision 1 `01-01` mainboard.

While going through the replacements I discovered that one capacitor supplied by Element14 was the wrong electrical value even though the physical part looked like it belonged there.

{% include youtube.html id="9pupCizxXtE" %}

Good reminder:

matching physical size does not make two capacitors electrically equivalent.

The intended capacitance still needs to match, while the voltage rating may be equal to or higher than the original where the replacement type and application are otherwise suitable.

I happened to notice the discrepancy while changing to a 16 V-rated replacement.

Would the incorrectly supplied part have caused trouble in the long term?

I don't know.

I caught it before leaving it installed, so there is no useful experiment to answer that question.

Much later I compiled the capacitor values from these Aiwa boards into a separate reference, which is considerably safer than ordering replacements by physical appearance.

### Related posts

- [Aiwa Mega-CD CSD-GM1 Capacitor Values](/aiwa-mega-cd-csd-gm1-capacitor-values/)
