---
title: "Apple Macintosh LC 475 Slowing the Fan with a Resistor"
author: "Nix McRetro"
date: 2013-01-03T13:54:58.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [apple, hacks, youtube]
---

{% include youtube.html id="cllZ5zuXryI" %}

Determining which resistor to use from a selection of four or so resistors from previous projects that I have either shelved or long forgotten.

{% include youtube.html id="gkGAGWQ2UVI" %}

And here is the promised second part with the installation and soldering of the resistor to the red power cable on the fan.


This did reduce the noise, but a series resistor also reduces the voltage available to the fan, lowering both speed and airflow. It can also make startup unreliable if the resulting fan voltage falls below its starting requirement. If doing something similar today I would verify reliable cold starts and monitor internal temperatures rather than assuming that quieter automatically means adequate cooling.

### Sources

- [Noctua - Fan troubleshooting and starting voltage](https://www.noctua.at/en/support/faqs/my-fan-is-not-working-as-intended-is-it-faulty) - explains that fans require sufficient voltage to start and that operation below their specified range can be unreliable.
