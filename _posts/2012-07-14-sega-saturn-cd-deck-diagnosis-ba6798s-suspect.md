---
title: "Sega Saturn CD Deck Diagnosis: BA6798S Suspect"
author: "Nix McRetro"
date: 2012-07-14T11:55:30.000+10:00
last_modified_at: 2026-10-03
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-03
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [repairs, sega]
---

{% include youtube.html id="49G-pKXLBy8" %}

You might remember the video above from a little while back if you're a regular.

The disc appears to spin backwards while the laser mechanism goes completely berserk. From the video alone I still can't prove that the spindle is actually being driven in reverse, but something in the CD deck control system is clearly very unhappy.

Enter the BA6798S on the left side of the CD deck board.

ROHM describes the BA6798S as a four-channel H-bridge BTL driver for CD-player motors and actuators. Since several parts of this mechanism are behaving strangely at the same time, that makes it a plausible common suspect.

Plausible is not the same as proven though. The symptoms could still come from something elsewhere in the servo or control circuitry.

So once more the white Saturn goes back onto the shelf while I wait for parts.

### Related posts

- [Faulty Japanese Sega Saturn: CD Drive Problems](/faulty-japanese-sega-saturn-cd-drive-problems/)

### Sources

- [ROHM BA6798S datasheet](https://www.alldatasheet.com/datasheet-pdf/pdf/36119/ROHM/BA6798S.html) - identifies the BA6798S as a four-channel H-bridge BTL driver for CD-player motors and actuators.
