---
title: "Sega Game Gear LED Backlight Mod"
author: "Nix McRetro"
date: 2012-04-17T04:59:10.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, repairs, sega]
---

{% include youtube.html id="EbIFteeC-GQ" %}

One of my Game Gears had bad capacitors, so I replaced them. I then found that the original fluorescent backlight tube was another part of the problem. I decided to attempt the LED backlight mod. I then found it had more problems with the DC-in socket being loose. So I stripped it of it's clean battery contacts and stuck them in my other functional Game Gear.

From two one was salvaged. I have donated the other to my boss who might do something with it, or he will just let it rot under a pile of old Macs. Ha! I hope he tries to save it. Promises of tantalum capacitors instead of radial electrolytic capacitors just seems so far away.

Anyway, the mod was a success. I used two white LEDs rated at about 45,000 mcd with a 62-ohm resistor. One resistor for two LEDs is not automatically wrong if they are wired appropriately. The resistor value depends on the supply voltage, LED forward voltage, desired current and wiring arrangement, so I would recalculate it before treating 62 ohms as a general recommendation. Proof of concept success! Be warned though, as much battery life as you will gain, you'll have a wonky looking backlight unless you can get the diffusion right. Even using a diffuser from a broken LCD panel does not diffuse the light well enough!

You can see my terrible modding of the capacitors above. Observe and do not copy this part. Polarised electrolytic capacitors must be installed with the correct polarity. I put some of them facing the wrong direction compared with the markings on the Game Gear motherboard... my bad!


### Sources

- [Gamefrog - Game Gear LED Backlight Mod](https://xantufrog-games.blogspot.com/2009/05/game-gear-led-backlight-mod.html) - period LED conversion guide documenting the original fluorescent tube, inverter circuitry, directional LED hot spots and resistor selection.
