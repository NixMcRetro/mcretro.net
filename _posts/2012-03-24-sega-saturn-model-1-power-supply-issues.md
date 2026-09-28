---
title: "Sega Saturn Model 1 Power Supply Issues"
author: "Nix McRetro"
date: 2012-03-24T23:05:20.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega]
---

{% include youtube.html id="ru07hk_idHY" %}

To reproduce the fault, I ran the Saturn for an hour or more until it was thoroughly warmed up. I found that the music player was more than sufficient to do this. I then used recordings to help narrow down where the noise appeared to be coming from. This involved investigating the internal power supply, which contains mains-voltage circuitry. Working around an exposed PSU while connected to mains is hazardous and is not recommended unless you are appropriately qualified.

{% include youtube.html id="h4uCTT9GqpE" %}

{% include youtube.html id="0lqGrb4LiUc" %}

I suspect either one of the transistors / bridge rectifying diodes or the transformer. I am absolutely in no way trained in electronics. I can tell you that using compatible power supplies from two Model 2 Saturns I owned did not cause this to happen. Saturn PSU compatibility depends on motherboard revision and PSU type, so this should not be taken to mean that every Model 2 PSU can be swapped into every Model 1. I'd buy the power supplies separately if I could track them down, but they seem to be getting a little rare due to the age of the unit most likely.


### Sources

- [Sega Saturn instruction manual](https://www.manualslib.com/manual/4140863/Sega-Saturn.html) - Sega warns that opening the console can expose users to electric shock hazards and states that there are no user-serviceable parts inside.
- [Sega-16 Forums - Sega Saturn Revisions and Models Guide](https://www.sega-16forums.com/forum/general-discussion/tech-aid/24084-sega-saturn-revisions-and-models-guide/page4) - documents Type A, Type B and Type C Saturn PSU arrangements and their motherboard revision compatibility.
