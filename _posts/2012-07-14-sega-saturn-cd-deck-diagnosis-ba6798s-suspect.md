---
title: "Sega Saturn CD Deck Diagnosis: BA6798S Suspect"
author: "Nix McRetro"
date: 2012-07-14T11:55:30.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega]
---

{% include youtube.html id="49G-pKXLBy8" %}

You might remember this rather unhappy Japanese Sega Saturn from a little while back. The disc appears to spin backwards while the laser assembly goes completely berserk, and the motor sounds like it's trying to escape from the CD deck. I've still got plenty of work ahead of me with this one.

While looking over the drive board, I started wondering about the BA6798S on the left-hand side. ROHM describes it as a four-channel H-bridge BTL driver responsible for controlling motors and actuators in CD players. With several parts of this mechanism misbehaving at the same time, it's certainly worth investigating.

That doesn't mean I've found the guilty component just yet. Something elsewhere in the servo or control circuitry could still be causing the trouble, and I haven't finished tracing the fault. For now, the white Saturn is going back onto the shelf while I wait for parts.

### Related posts

- [Faulty Japanese Sega Saturn: CD Drive Problems](/faulty-japanese-sega-saturn-cd-drive-problems/)

### Sources

- [ROHM BA6798S datasheet](https://www.alldatasheet.com/datasheet-pdf/pdf/36119/ROHM/BA6798S.html) - identifies the BA6798S as a four-channel H-bridge BTL driver for CD-player motors and actuators.
