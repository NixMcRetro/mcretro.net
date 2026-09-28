---
title: "Amstrad Sega Mega PC HD Failure and Windows 3.11 Sound Demo"
author: "Nix McRetro"
date: 2012-11-15T07:52:51.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, sega, youtube]
---

{% include youtube.html id="BKoCBsni6Ts" %}

While trying to install MS-DOS 6.22 and Windows 3.11, the machine suddenly developed what appeared to be a power short. I tried another power supply thinking it was simply that, and what happened? Plumes of smoke rising from the machine! After pulling the machine apart I found that a tantalum capacitor on the Seagate 107MB hard drive had failed dramatically and was the obvious suspect. Of course, I'll be attempting to repair the hard drive. A 15uF 25V tantalum in case size D is on order and due in the next week or two. Before fitting a replacement, the capacitance, voltage rating, polarity and package arrangement all need to match the original part closely enough for the circuit.

In the meantime, while waiting for that capacitor to be repaired I have replaced the hard drive with a 517MB drive and got DOS and Windows installed. Also, enjoy the MIDI playback demo inside Windows for Workgroups 3.11, with the MIDI data being rendered through the Mega PC's AdLib-compatible FM synthesizer. Also managed to get some network support as I was able to ping [RetroJunkie.net](https://retrojunkie.net) over ethernet. Will need to look into that further another day! ;)


### Sources

- [Centre for Computing History - Amstrad Mega PC Owners Manual](https://www.computinghistory.org.uk/det/32501/Amstrad-Mega-PC-Owners-Manual/) - identifies the Mega PC manual and describes its AdLib-compatible sound synthesizer.
