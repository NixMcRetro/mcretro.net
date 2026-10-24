---
title: "Apple Macintosh LC 475: Slowing the Fan with a Resistor"
author: "Nix McRetro"
date: 2013-01-03T13:54:58.000+11:00
last_modified_at: 2026-10-18
categories: [apple, hacks, youtube]
---

{% include youtube.html id="cllZ5zuXryI" %}

Resistors are fun! With the new 68040 processor and plans to run the LC 475 at 33 MHz, I've been experimenting with additional cooling. Unfortunately, the little fan I've installed is darned noisy, so I thought I'd try slowing it down with a resistor.

I've got four resistors left over from previous projects, some of which I've probably long forgotten. Rather than buy something new, why not experiment with what I've already got? The fan normally receives approximately 8 V from the connection I'm using, so the idea is to reduce that a little without stopping it altogether.

The first few experiments were interesting. One resistor reduced the voltage so much that the fan barely moved, while another got incredibly hot. I eventually found one that brought the voltage down to around 5.5 V and seemed to offer a reasonable balance between noise and fan speed.

There's also the small matter of fitting everything inside the LC 475. The fan is sitting rather close to the lid, and with a heatsink on the processor there's not exactly an enormous amount of room to play with. Still, things are looking promising.

{% include youtube.html id="gkGAGWQ2UVI" %}

And here is the promised second part with the installation and soldering of the resistor to the red power cable on the fan.

Naturally, the soldering didn't go quite as smoothly as planned. My heat-shrink tubing was much too large, I wasn't particularly impressed with some of my soldering, and the heat gun made things a little meltier than intended. Eventually everything was connected and insulated, so back into the Macintosh it went.

Then came the question of which way to mount the fan. I'd have preferred to blow air into the case, but the fan's bracket and the existing grille made that arrangement rather noisy. Turning it around worked better with the available clearance, so that settled that little argument.

The resistor certainly made things quieter, although slowing a fan down also means reducing the airflow. Some of the earlier resistors wouldn't even let the fan start properly, so that's something I'd want to keep an eye on before relying on it for cooling.

And just as I was showing off the heatsink on my 33 MHz processor, something snapped. Oh, wonderful! At least it happened on film.

Right, where's the super glue?

### Sources

- [Noctua - Fan troubleshooting and starting voltage](https://www.noctua.at/en/support/faqs/my-fan-is-not-working-as-intended-is-it-faulty) - explains why fans need sufficient voltage to start reliably.
