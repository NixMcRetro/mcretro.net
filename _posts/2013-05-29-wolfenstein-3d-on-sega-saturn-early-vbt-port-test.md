---
title: "Wolfenstein 3D on Sega Saturn: Early VBT Port Test"
author: "Nix McRetro"
date: 2013-05-29T05:15:06.000+10:00
last_modified_at: 2026-10-18
categories: [devkit, gaming, sega]
---

{% include youtube.html id="9Rxxr97mrdE" %}

VBT over at [ASSEMblergames.com](https://web.archive.org/web/20170919030325/https://www.assemblergames.com/) has been working on getting Wolfenstein 3D running on the Sega Saturn. More specifically, this is early Saturn support for Wolf4SDL, and it already seems to work in emulators. Naturally, I wanted to see what would happen on the real hardware!

I started with my Sophia development hardware, but couldn't get much further than the licence screen. Trying an Action Replay Plus didn't improve matters either, so I decided to give a retail Saturn a go. That got a little further, which was encouraging, but something was still going wrong.

I did wonder whether the modchip in the retail Saturn might be interfering, although I never established that. At least I was getting different results from the two machines, which gave me something else to investigate. Keep up the good work, VBT, and I'll be playing W3D in no time!

**Update:** Apparently it should have worked, but it didn't in my case. Perhaps the strange development hardware I was using had something to do with it, although I never established that. :)

VBT continued developing the Saturn port after this experiment. On 15th December 2023, VBT described this old version as deprecated; on 21st December, he pointed users towards the newer project. The video above remains a snapshot of the port during its early development.

### Sources

- [SegaXtreme - Wolfenstein 3D for Saturn](https://segaxtreme.net/threads/wolfenstein-3d-for-saturn.20539/)
