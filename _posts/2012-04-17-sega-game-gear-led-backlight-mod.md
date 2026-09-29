---
title: "Sega Game Gear LED Backlight Mod"
author: "Nix McRetro"
date: 2012-04-17T04:59:10.000+10:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, repairs, sega]
---

{% include youtube.html id="EbIFteeC-GQ" %}

One of my Game Gears had bad capacitors, so I replaced them. Then I discovered that the original fluorescent backlight tube was another part of the problem, so I decided to try the LED backlight mod.

Then I found yet another problem: the DC-in socket was loose.

At that point I stripped the clean battery contacts from it and moved them into my other functional Game Gear.

From two Game Gears, one was salvaged.

I donated the other one to my boss, who might do something with it, or he might just let it rot under a pile of old Macs. Ha! I hope he tries to save it.

Promises of tantalum capacitors instead of radial electrolytics just seem so far away.

Anyway, the LED mod itself was a success. I used two white LEDs rated at about 45,000 mcd with a 62-ohm resistor.

That 62-ohm value describes this particular experiment, not a general Game Gear recommendation. The resistor required depends on the supply voltage, LED forward voltage, desired current and how the LEDs are wired. The period guide I was working from used different LEDs and a different resistor value, so recalculate rather than blindly copying mine.

Proof of concept success!

Be warned though: as much battery life as you may gain, you'll end up with a wonky-looking backlight unless you can get the diffusion right. Even using a diffuser from a broken LCD panel did not spread the light evenly enough.

You can also see my terrible capacitor work above. Observe and do not copy this part.

Polarised electrolytic capacitors have to be installed with the correct polarity. I managed to put some of mine in facing the wrong direction compared with the markings on the Game Gear motherboard.

My bad!

### Related posts

- [Game Gear Capacitor, Backlight Repair and LED Mod](/game-gear-capacitor-backlight-repair-and-led-mod/)

### Sources

- [Gamefrog - Game Gear LED Backlight Mod](https://xantufrog-games.blogspot.com/2009/05/game-gear-led-backlight-mod.html) - period LED conversion guide documenting the original fluorescent tube, inverter circuitry, directional LED hot spots and resistor selection.
