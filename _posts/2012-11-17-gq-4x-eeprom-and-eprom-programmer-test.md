---
title: "GQ-4X EEPROM and EPROM Programmer Test"
author: "Nix McRetro"
date: 2012-11-17T01:12:50.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, programming, sega]
---

{% include youtube.html id="GdxYQdxYE5g" %}

Received my new GQ-4X EEPROM programmer from Canada.

Naturally I forgot the 16-bit adaptor board.

At least it is USB based, which saves me dragging out a computer with a parallel port every time I want to program something.

I performed some test reads, erases and writes using USB power alone and everything worked.

I originally assumed that older EPROMs requiring higher programming voltages would automatically require the external DC supply.

That isn't quite how the GQ-4X works.

The programmer has its own voltage-generation circuitry for programming devices. The external supply is mainly useful when the USB connection cannot provide enough power, such as through an unpowered hub.

MCUmall's guidance calls for a centre-positive 2.1 mm supply around 9 V and at least 200 mA when external power is required.

So if I adapt some random old power brick, voltage and plug size are not enough. Polarity gets checked with the multimeter first.

Scissors anyone?

Don't worry, they're third-party adaptors.

Eventually I want to use this for Dreamcast and Saturn BIOS work, region modifications, prototype preservation and dumping chips from various boards.

For a first proper test I dumped, erased and reflashed a 486 BIOS chip.

Best of all, the BIOS still worked afterwards.

This could become a very useful little machine.

[This is the list](http://www.mcumall.com/comersus/store/mcumall_TrueUSBWillemsupportICs.asp) of compatible chips with the GQ-4X Programmer. Sure are a lot on there... and here's where to [download](http://www.mcumall.com/comersus/store/mcumall_download.asp) the drivers and software to run the GQ-4X.

### Sources

- [MCUmall - GQ-4X external power guidance](https://www.mcumall.com/Forum/topic.asp?TOPIC_ID=11713) - documents the recommended external supply range and centre-positive polarity for the programmer.
