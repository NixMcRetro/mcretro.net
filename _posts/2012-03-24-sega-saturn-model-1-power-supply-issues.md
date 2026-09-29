---
title: "Sega Saturn Model 1 Power Supply Issues"
author: "Nix McRetro"
date: 2012-03-24T23:05:20.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega]
---

{% include youtube.html id="ru07hk_idHY" %}

To reproduce the fault, I ran the Saturn for more than an hour until it was thoroughly warmed up. The music player was more than sufficient for this. I then made some recordings to help narrow down where the noise seemed to be coming from.

This meant investigating the Saturn's internal power supply, which contains mains-voltage circuitry. Sega's own documentation warns against opening the console because of the electric-shock hazard. Working around an exposed PSU while it is connected to mains is not something to attempt unless you are appropriately qualified.

{% include youtube.html id="h4uCTT9GqpE" %}

{% include youtube.html id="0lqGrb4LiUc" %}

From what I could hear, I suspected either one of the transistors, the bridge-rectifier circuitry or the transformer. But I was guessing. I am absolutely in no way trained in electronics.

What I could establish was that compatible power supplies from two Model 2 Saturns I owned did not produce the same problem. That does not mean every Model 2 PSU can be swapped into every Model 1, since Saturn PSU compatibility depends on the motherboard revision and PSU type.

I'd buy another power supply separately if I could track one down, but these things are becoming harder to find. This problem is also giving me a good reason to investigate whether I can replace the original PSU with an external DC-powered arrangement instead.

### Related posts

- [Sega Saturn Laser Tune-up Success](/sega-saturn-laser-tune-up-success/)
- [Sega Saturn External PSU Proof of Concept](/sega-saturn-external-psu-proof-of-concept/)

### Sources

- [Sega Saturn instruction manual](https://www.manualslib.com/manual/4140863/Sega-Saturn.html) - Sega warns that opening the console can expose users to electric shock hazards and states that there are no user-serviceable parts inside.
- [Sega-16 Forums - Sega Saturn Revisions and Models Guide](https://www.sega-16forums.com/forum/general-discussion/tech-aid/24084-sega-saturn-revisions-and-models-guide/page4) - documents Type A, Type B and Type C Saturn PSU arrangements and their motherboard revision compatibility.
