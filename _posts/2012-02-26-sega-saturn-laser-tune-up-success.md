---
title: "Sega Saturn Laser Tune-up Success"
author: "Nix McRetro"
date: 2012-02-26T01:49:26.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [repairs, sega]
---

![](/assets/images/2012/img_0005.jpg)

Turned the laser-power trimpot, a small variable resistor on the pickup, with a good power supply installed and it now reads commercially pressed games fine. The laser had trouble reading a Taiyo Yuden CD-R with CD audio on it; a little more adjustment and it played perfectly.

![](/assets/images/2012/img_0006.jpg)

It is amazing how much of a difference a one or two degree turn of a trimpot can make. This increases the laser's output rather than repairing the underlying wear. Sega's service documentation warns that adjusting this control can damage the laser diode and recommends replacing the pickup when laser output has fallen too low. The good news is that it was assumed completely dead, which it is no longer!

![](/assets/images/2012/img_0007.jpg)

I am trying to work out why the power supply is dead in the above Saturn though. With the good working PSU from the other Saturn installed it works fine. And with the dead PSU in the good working Saturn it doesn't work either. Nothing looked visibly blown. The blue-capped varistors did not appear shorted on a basic continuity test, and the capacitors showed resistance or charging behaviour, although those simple checks were not enough to prove the components were healthy.

I am considering hacking apart a PC power supply to see if it can run on the +3.3V, +5V and +9V rails. I was not quite sure at the time how I would provide the Saturn's +9V rail from a PC power supply. Early Saturn PSUs of this type use +3.3V, +5V and +9V, while ATX supplies normally provide +3.3V, +5V and +12V rather than a native +9V output. I need to get image upload working to show pictures of all these things I am working on.

**EDIT (2016):** Lightbox works now on pictures! Also pictures are now showing. **EDIT (2018):** Fixed those pictures again, bad Google breaking all my image links.


### Sources

- [Sega Saturn Service Manual](https://www.manualshelf.com/manual/sega/saturn/service-manual.html) - documents the optical pickup laser adjustment and warns against field adjustment.
- [Sega-16 Forums - Sega Saturn Revisions and Models Guide](https://www.sega-16forums.com/forum/general-discussion/tech-aid/24084-sega-saturn-revisions-and-models-guide/page4) - documents Saturn PSU rail arrangements across revisions.
- [Fluke - How to measure resistance](https://www.fluke.com/en-au/learn/blog/digital-multimeters/how-to-measure-resistance) - explains limitations of in-circuit resistance measurements.
