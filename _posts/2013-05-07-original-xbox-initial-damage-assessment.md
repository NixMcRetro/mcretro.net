---
title: "Original Xbox Initial Damage Assessment"
author: "Nix McRetro"
date: 2013-05-07T03:59:31.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [microsoft, repairs]
---

{% include youtube.html id="ImMqvVFw1VY" %}

Here's something for the _modern_ gamers out there. A friend dug this original Xbox out of his garage and handed it over for an assessment. There are a few things going on here.

![](/assets/images/2013/img_0396.jpg)

Interesting placement of a random 9 V battery, isn't it?

![](/assets/images/2013/img_0398.jpg)

These wires look like they should be connected to something... somewhere!

![](/assets/images/2013/img_0397.jpg)

The problem we definitely cannot blame on the previous owner is the clock capacitor: a busted "super" cap. It has failed and leaked onto the motherboard.

The original Xbox uses a supercapacitor to maintain the real-time clock briefly while the console is unplugged. On most pre-1.6 boards the notorious original clock capacitor can simply be removed once any leakage and board contamination are dealt with.

Some late 1.4 boards and all 1.6 systems used a different gold-coloured capacitor that is less prone to destructive leakage. The 1.6 hardware is also different because it requires a functioning clock-capacitor circuit, or a suitable bypass, to boot.

So this repair is not quite as universal as "find capacitor, rip capacitor out".

There's nothing wrong with cell batteries, nor getting the time from the internet.

This will likely be a three-part repair. Hopefully we'll have Burnout Revenge running in the next few weeks.

Priorities.

### Sources

- [ConsoleMods Wiki - Xbox Clock Capacitor](https://consolemods.org/wiki/Xbox:Clock_Capacitor)
- [XboxDevWiki - Hardware Revisions](https://xboxdevwiki.net/Hardware_Revisions)
