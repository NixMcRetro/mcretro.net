---
title: "Aiwa Sega Mega-CD CSD-GM1 Part 4: Tracing the Missing 8 V Rail"
author: "Nix McRetro"
date: 2013-07-23T15:27:51.000+10:00
last_modified_at: 2026-10-22
categories: [repairs, sega, youtube]
---

{% include youtube.html id="kflIsgH0umI" %}

What's that? A transistor stopped my 8 V electricity flow? I've narrowed the missing rail down to the transistor stage, but that does not yet prove the transistor itself is the culprit.

We're getting around 7.7 V going into this particular area of the circuit, but only about 0.05 V coming out. That's hardly going to make the 7806 voltage regulator particularly happy, considering it needs a decent input voltage before it can produce its regulated 6 V output.

Increasing the supply voltage didn't make any difference, so it was time to have another look at the circuit. Fortunately, I've got another Aiwa Mega-CD sitting here for comparison. Unfortunately, that's the one with the horribly cracked circuit board. There's always something!

Comparing the two boards revealed some differences between their revisions. More importantly, the other machine was getting approximately 8 V into its 7806 regulator and producing about 5.96 V at the output. Much more like it! At least now I've got a better idea of where to concentrate my attention.

The next challenge is tracking down a suitable replacement for the suspect component and seeing whether that gets things moving again. Another instalment of troubleshooting 101, otherwise known as poking things with a stick.

### Related posts

- [Aiwa Sega Mega-CD CSD-GM1 (Part 3: Reviewing the Situation)](/aiwa-sega-mega-cd-csd-gm1-part-3-reviewing-the-situation/)
- [Aiwa Sega Mega-CD CSD-GM1 Unit-01 Mainboard: More Capacitors](/aiwa-sega-mega-cd-csd-gm1-unit-01-mainboard-more-caps/)
