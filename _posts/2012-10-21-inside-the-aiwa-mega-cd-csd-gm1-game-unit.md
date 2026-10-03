---
title: "Inside the Aiwa Mega-CD CSD-GM1 Game Unit"
author: "Nix McRetro"
date: 2012-10-21T12:58:38.000+11:00
last_modified_at: 2026-10-03
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-03
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [sega, youtube]
---

{% include youtube.html id="nt5E4DaJMxM" %}

Here's a quick look inside the Mega Drive and Mega-CD Game Unit that attaches underneath the Aiwa CSD-GM1.

At the time I joked that it was pretty useless by itself unless you wanted a lead-weighted frisbee.

Turns out I was wrong about that part.

![](/assets/images/2012/img_0323.jpg)

![](/assets/images/2012/img_0325.jpg)

![](/assets/images/2012/img_0324.jpg)

The Game Unit contains the Mega Drive and Mega-CD game hardware, while the upper Aiwa section supplies power, the CD mechanism and the rest of the audio-system integration.

Later testing showed that the Mega Drive side of this particular Game Unit can actually be powered independently with a suitable regulated 5 V supply. On the unit I tested, 5 V on pin 24 and ground on pin 12 were enough to boot Mega Drive cartridges without the boombox attached.

That pinout is based on my own hardware and should be verified before anybody applies power to another unit. Feeding the wrong voltage or polarity into rare hardware is a particularly expensive way to discover a numbering mistake.

Without the Aiwa CD mechanism attached, the Mega-CD BIOS can begin its startup sequence but cannot proceed normally.

So not a frisbee after all.

As always, there are more photos in the [galleries or file server](/goodies/).

### Related posts

- [Aiwa Sega Mega-CD CSD-GM1 Game Unit in Standalone Mode](/aiwa-sega-mega-cd-csd-gm1-game-unit-in-standalone-mode/)

### Sources

- [Mega-CD.de - Aiwa CSD-GM1](https://www.mega-cd.de/japmcd2.htm) - historical reference describing the detachable lower Game Unit containing the Mega Drive and Mega-CD hardware.
