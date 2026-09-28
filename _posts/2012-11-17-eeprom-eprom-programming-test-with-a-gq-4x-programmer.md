---
title: "EEPROM / EPROM Programming Test with a GQ-4X Programmer"
author: "Nix McRetro"
date: 2012-11-17T01:12:50.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, programming, sega]
---

{% include youtube.html id="GdxYQdxYE5g" %}

Received my new GQ-4X EEPROM Programmer from Canada, forgot the 16-bit adapter card though! All USB based which is certainly helpful as I didn't want to pull out a computer with a parallel port each time - not that it couldn't have been done, there's enough lying about at the moment.

Anyway, I performed some test reads and writes using only USB 5V and it seems to have worked OK. I do need an external supply for some of the older devices that need more programming power than USB alone can provide. The GQ-4X expects a centre-positive 2.1mm DC supply, around 9V with adequate current. That polarity matters, so adapting a spare console supply should only be done after verifying it properly with a multimeter rather than relying on plug size and voltage alone. Scissors anyone? Don't worry, they are third-party adapters.

I hope to one day flash some chips for use in my Dreamcasts and Saturns for region free gaming. Apart from that dumping prototypes and chips on various boards is the goal. I am surprised at how easy it was to dump, erase and flash a chip for a 486 BIOS. The best news is that it worked and the BIOS was functional.

[This is list](http://www.mcumall.com/comersus/store/mcumall_TrueUSBWillemsupportICs.asp) of the compatible chips with the GQ-4X Programmer. Sure are a lot on there... and here's where to [download](http://www.mcumall.com/comersus/store/mcumall_download.asp) the drivers and software to run the GQ-4X.


### Sources

- [MCUmall - GQ-4X external power guidance](https://www.mcumall.com/Forum/topic.asp?TOPIC_ID=11713) - documents the recommended external supply range and centre-positive polarity for the programmer.
