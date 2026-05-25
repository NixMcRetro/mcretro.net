---
title: "Circuit Bending - Sonic the Hedgehog"
author: "Nix McRetro"
date: 2016-08-12T07:44:45.000+10:00
categories: [guides, hacks, sega]
---

{% include youtube.html id="_cXIrhNazys" %}

I finally got around to doing some soldering on a somewhat faulty Mega Drive 2 I had lying about. Now I took the schematic from [gieskes.nl](https://web.archive.org/web/20160219222212/http://www.gieskes.nl/) but noticed that there were two VSS / VCC lines into the 40 pin static VRAM. So I decided to avoid them and just stick with address lines A0 - A8 and grounding them seems to be the easiest way to get results.

![VRAM_pinout_Circuit Bending](/assets/images/2016/img_0470.jpg)

Then I started messing with the Z80 RAM in particular address lines A8, A9, A10, A11 and whatever /OE is. Possibly with a dash of /CE1. Messing with the data lines almost guarantees a hang and forces a power cycle. Plenty more address lines to play with there though.

![Z80 RAM](/assets/images/2016/img_0532.jpg)

I've decided to pop circuit bending on the McRetro Gaming YouTube channel since technically it's some sort of gaming. I'll be doing one of these a week if I remember and people show enough interest in staring at all the pretty patterns and odd sounds. It will be very interesting to see what each game can do.

![Sonic1_Glitch](/assets/images/2016/img_0531.jpg)

Big thanks to [Console5](https://console5.com/store/) for the pinouts.
