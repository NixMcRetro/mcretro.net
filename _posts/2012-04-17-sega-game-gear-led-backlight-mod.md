---
title: "Sega Game Gear LED Backlight Mod"
author: "Nix McRetro"
date: 2012-04-17T04:59:10.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, repairs, sega]
---

{% include youtube.html id="EbIFteeC-GQ" %}

One of my Game Gears had bad capacitors, so I replaced them. Then I discovered that the original fluorescent backlight was another part of the problem, which gave me a good excuse to try an LED conversion. Unfortunately, the DC-in socket was also loose. Apparently this Game Gear wasn't quite finished finding things to complain about!

I've been following a period modification guide, removing some of the original backlight circuitry and preparing to fit a pair of white LEDs. These are rated at around 45,000 mcd, which is rather bright. I even ground down the rounded tops to help spread the light, using some concrete render because I didn't have a convenient piece of concrete nearby.

I also experimented with heat-shrink material as a diffuser. The idea was to spread the light from the LEDs more evenly across the screen, rather than ending up with two obvious bright spots. I thought the thicker material might work better than a drinking straw, but there was only one way to find out.

For this experiment I used a 62-ohm resistor with the two LEDs. Looking back, I'm not entirely convinced I calculated that correctly, particularly with one resistor shared between them. That value isn't a general recommendation for this modification, since the correct resistor arrangement depends on the supply voltage, LED characteristics and wiring.

The backlight itself worked, but the light wasn't distributed as evenly as I'd hoped. Even trying a diffuser from a broken LCD panel didn't completely solve the problem. You might gain some battery life by replacing the fluorescent tube, but that isn't much consolation if the screen ends up looking blotchy!

The capacitor work wasn't especially attractive either. Some of the replacement capacitors were awkwardly positioned and interfered with the case, and I'd installed a few with the polarity reversed relative to the motherboard markings. Definitely not the part of this experiment to copy.

In the end, I salvaged enough parts from two Game Gears to get one usable machine. I moved the clean battery contacts into the better unit and donated the other one to my boss. Perhaps he'll restore it, or perhaps it'll disappear under a mountain of old Macs. I hope he gives it a go!

**Related Posts**

- [Game Gear Capacitor, Backlight Repair and LED Mod](/game-gear-capacitor-backlight-repair-and-led-mod/)

**Sources**

- [Gamefrog - Game Gear LED Backlight Mod](https://xantufrog-games.blogspot.com/2009/05/game-gear-led-backlight-mod.html) - period guide covering the original fluorescent backlight, LED conversion and diffusion problems.
