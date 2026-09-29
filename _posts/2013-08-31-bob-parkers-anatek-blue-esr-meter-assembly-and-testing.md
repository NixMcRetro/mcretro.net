---
title: "Bob Parker's AnaTek Blue ESR Meter: Assembly and Testing"
author: "Nix McRetro"
date: 2013-08-31T22:46:25.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, youtube]
---

{% include youtube.html id="Lq9-9A8kn8Q" %}

Here are the final assembly and testing steps for my new Bob Parker Blue ESR meter from AnaTek.

ESR means equivalent series resistance, and it is an extremely useful measurement when diagnosing ageing electrolytic capacitors.

One of the clever features of this meter is its ability to test many capacitors while they are still installed in the circuit.

It does that using a test voltage below 100 mV, low enough that ordinary semiconductor junctions are generally not driven into conduction during the measurement.

That makes it much faster to work through a board looking for suspicious electrolytics.

But:

**"in-circuit testing" does not mean "never remove another capacitor".**

Capacitors should still be discharged before testing, and an ambiguous in-circuit result may still require further investigation.

No more removing capacitors?

Well...

Considerably fewer, perhaps.

Unless I'm in the mood, of course!

### Sources

- [Blue ESR Meter Operating Instructions](https://manuals.plus/anatek/0-01-blue-esr-low-ohms-meter-manual)
