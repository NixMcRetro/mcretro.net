---
title: "Sega Saturn CD Deck Diagnosis: BA6798S Suspect"
author: "Nix McRetro"
date: 2012-07-14T11:55:30.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega]
---


{% include youtube.html id="49G-pKXLBy8" %}

You might remember this rather unhappy Japanese Sega Saturn from a little while back. The disc appears to spin backwards while the laser assembly goes completely berserk, and the motor sounds like it's trying to escape from the CD deck. I bought the poor thing as faulty, and it certainly hasn't disappointed in that department!

I've been having another look at the drive board to see whether I can work out what's making everything behave so strangely. One component that's caught my attention is the BA6798S on the left-hand side. It's a ROHM four-channel H-bridge BTL driver, which is responsible for driving various motors and actuators in CD mechanisms.

That makes it rather interesting when I've got a CD deck with a spindle motor racing away and a laser assembly moving all over the place. Could it be the problem? Possibly! But I haven't proved anything yet, and there's still the servo and control circuitry to consider. It could just as easily be something else telling the driver to behave like a maniac.

For now I'm putting the white Saturn back on the shelf while I wait for parts and work out what to investigate next. We'll make you better, faster, stronger! Or at least get the disc spinning the right way, which would be a pretty good start.

### Related posts

- [Faulty Japanese Sega Saturn: CD Drive Problems](/faulty-japanese-sega-saturn-cd-drive-problems/)

### Sources

- [ROHM BA6798S datasheet](https://www.alldatasheet.com/datasheet-pdf/pdf/36119/ROHM/BA6798S.html) - identifies the BA6798S as a four-channel H-bridge BTL driver for CD-player motors and actuators.
