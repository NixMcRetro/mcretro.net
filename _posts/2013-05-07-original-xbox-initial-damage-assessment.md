---
title: "Original Xbox Initial Damage Assessment"
author: "Nix McRetro"
date: 2013-05-07T03:59:31.000+10:00
last_modified_at: 2026-10-18
categories: [microsoft, repairs]
---

{% include youtube.html id="ImMqvVFw1VY" %}

Here's something for the *modern* gamers out there. A friend dug this original Xbox out of his garage and handed it over for an assessment. There are a few things going on here, and I'm not entirely sure what the person who last worked on it had in mind!

![](/assets/images/2013/img_0396.jpg)

Interesting placement of a random 9 V battery, isn't it? It was sitting inside the Xbox wrapped in tape, surrounded by a collection of cut wires and what appeared to be the remains of an LED modification. There was even a switch fitted to the rear of the machine, which made the whole arrangement considerably more mysterious.

After clearing away some of the mess, it became apparent that the battery was supplying power to the extra LEDs, with the rear switch turning them on and off. That seems like a terribly inefficient way of lighting up an Xbox! At least I now had some idea what the thing was supposed to do.

![](/assets/images/2013/img_0398.jpg)

These wires look like they should be connected to something... somewhere! Two of the controller-port cable assemblies had been cut, affecting players two and four, while players one and three were still intact. The fourth controller socket looked particularly unhappy, and one of the tracks around the second port had lifted from the board.

Fortunately, replacement controller-port assemblies were available on eBay, so I wouldn't necessarily have to rebuild every damaged connection by hand. I removed the loose wiring that I wasn't going to use, rather than leave stripped wires floating around inside the machine. Some of them were rather close to the power supply, which wasn't particularly encouraging!

![](/assets/images/2013/img_0397.jpg)

The problem we definitely cannot blame on the previous owner is the clock capacitor: a busted "super" cap. It has failed and leaked onto the motherboard. This particular capacitor was marked 2.5 V, 1 F, and there was a fair amount of corrosion around the surrounding components.

The original Xbox uses a supercapacitor to maintain the real-time clock briefly while the console is unplugged. On most pre-1.6 boards the notorious original clock capacitor can simply be removed once any leakage and board contamination are dealt with. I wasn't particularly worried about losing the clock, but I certainly wasn't keen on leaving that mess to eat any more of the motherboard.

Some late 1.4 boards and all 1.6 systems used a different gold-coloured capacitor that is less prone to destructive leakage. The 1.6 hardware is also different because it requires a functioning clock-capacitor circuit, or a suitable bypass, to boot. So this repair is not quite as universal as "find capacitor, rip capacitor out".

There were some other surprises inside. The IDE ribbon cable had been modified, apparently for a hard-drive activity LED, and the hard drive was missing its mounting screws. Even the optical-drive cover had screws missing! It's quite impressive how much somebody managed to remove from a machine while leaving the important bits behind.

I was planning to clean up the corrosion and look at replacing the affected capacitors. There were a few nearby components worth inspecting, although I didn't particularly want to recap somebody else's entire Xbox without a good reason. First we needed to get the wiring and motherboard into a more respectable state.

There's nothing wrong with cell batteries, nor getting the time from the internet. This will likely be a three-part repair. Hopefully we'll have Burnout Revenge running in the next few weeks.

**Sources**

- [ConsoleMods Wiki - Xbox Clock Capacitor](https://consolemods.org/wiki/Xbox:Clock_Capacitor)
- [XboxDevWiki - Hardware Revisions](https://xboxdevwiki.net/Hardware_Revisions)
