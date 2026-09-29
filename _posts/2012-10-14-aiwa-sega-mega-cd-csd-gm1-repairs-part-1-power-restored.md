---
title: "Aiwa Sega Mega-CD CSD-GM1 Repairs Part 1: Power Restored"
author: "Nix McRetro"
date: 2012-10-14T07:39:43.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega, youtube]
---

{% include youtube.html id="J0-hOrLau4Q" %}

Progress was her middle name.

Success was her first.

Not too sure what her last name was at this point. Still unwritten perhaps.

As you can see from the video, repairs are going well in the traditional sense of solving one problem and discovering another three.

![](/assets/images/2012/img_0299.jpg)

![](/assets/images/2012/img_0300.jpg)

The biggest success so far is getting power back into the damaged machine.

I repaired the broken mainboard traces with wires and solder, then connected a known-good CD mechanism from my other CSD-GM1.

With that combination the damaged machine reached the Sega Mega-CD startup screen and could play Mega Drive cartridges.

That is very encouraging. It means a surprisingly large amount of the damaged logic is alive.

![](/assets/images/2012/img_0302.jpg)

The original CD mechanism is another story.

At this stage I suspected the KSS-210B optical pickup and had already ordered a replacement, although I had not yet proved the pickup itself was the only problem.

The mechanism's PCB also has a triangular piece physically broken off it.

Luckily I found the missing piece underneath the mainboard when I disassembled the unit.

So now I "simply" need to reconnect all of the broken traces.

Simple!

![](/assets/images/2012/img_0301.jpg)

Power is still the bigger mystery.

Measuring the regulator outputs produced differences of as much as 14 V between some of the points I was comparing across the two machines.

That is far too large a difference to start connecting things blindly, so I need to map the rails properly before doing much more.

Don't want to fry any microchips!

The KSS-210B replacement did eventually get the CD mechanism reading again, but first I had to work through the power-supply mess.

### Related posts

- [Aiwa Sega Mega-CD CSD-GM1 Initial Damage Report](/aiwa-sega-mega-cd-csd-gm1-initial-damage-report/)
- [Aiwa Sega Mega-CD CSD-GM1 Repairs Intermission](/aiwa-sega-mega-cd-csd-gm1-repairs-intermission/)
- [Aiwa Mega-CD CSD-GM1 Repairs Part 2: Power Rail Testing](/aiwa-mega-cd-csd-gm1-repairs-part-2-power-rail-testing/)
- [Aiwa Sega Mega-CD CSD-GM1 KSS-210B Laser Replacement](/aiwa-sega-mega-cd-csd-gm1-kss-210b-laser-replacement/)
