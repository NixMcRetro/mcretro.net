---
title: "Sega Mega Drive 2 50 Hz / 60 Hz Mod, Mark II"
author: "Nix McRetro"
date: 2013-01-20T10:54:39.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, repairs, sega]
---

{% include youtube.html id="CnRq9yR02_Y" %}

This is the Mega Drive 2 I was talking about in the previous video. I knew I had it somewhere. More importantly, I knew this one worked properly. Well... close to properly.

It's another peaceful Sunday afternoon, despite me initially thinking it was Saturday morning. That's what happens when you sleep until midday! I've already drilled the holes for the switches, and I'm rather pleased with how neatly they fit into the casing.

This one had a different style of switch fitted for the language selection, but I've decided to use toggle switches for both settings. They're easier to mount because all I need is a round hole. Naturally, after removing the original switch I realised that I hadn't written down the wiring. Wonderful! Time to retrieve the discarded switch and work it out again.

This is my second pass at the 50 Hz / 60 Hz modification. Mega Drive region configuration is controlled by the console's language and video-frequency settings. Switching the video-frequency signal lets a suitable board move between 50 Hz and 60 Hz operation.

Model 2 hardware varies considerably by motherboard revision, though. Some revisions route the relevant signals differently and some early ASIC versions make the modification considerably more delicate, so the connection points shown in one Mega Drive 2 should not automatically be copied onto another without identifying the board first.

After a bit of soldering, the new language switch was in place and I could give the machine a test. Switching over to 60 Hz sped things up rather nicely, and the horrible rolling blue lines I'd been seeing on the other Mega Drive weren't present in the same way. Now we're getting somewhere!

This particular console has quite an interesting history. I'd previously modified it to run at 60 Hz by cutting a trace, only to discover that I'd lost colour output in the process. There's still a brown jumper wire on the board restoring that connection. I must have done that rather early in my Mega Drive collecting adventures!

Reassembling everything was another exercise in remembering where the different screws belonged. I also secured the external crystal circuit so it couldn't touch anything conductive inside the case. With the switches fitted, the wiring tucked away and the casing back together, it was finally time for a proper game test.

Streets of Rage seemed like a suitable candidate. The machine switched between 50 Hz and 60 Hz, and I could also change the language setting. I did have to restart it after one of the changes, but ultimately everything was behaving much better than the previous console.

So that's two Mega Drive modifications down, and this one is definitely the nicer of the two. Now I can get back to the other projects scattered across the workbench!

{% include youtube.html id="90scC8EhPqc" %}

You can catch The Damo Monster above as well. His original guide was one of the references I was using for this modification.

**Related Posts**

- [Drilling Region-Switch Holes in a Sega Mega Drive 2](/drilling-region-switch-holes-in-a-sega-mega-drive-2/)

**Sources**

- [Damo Monster - Sega Mega Drive Model 2 region modification](https://web.archive.org/web/20121209141749/http://www.damomonster.com/Mod_Pages/SegaMegaDriveM2.html) - archived contemporary guide used for this modification.
- [ConsoleMods - Genesis Region Information](https://consolemods.org/wiki/Genesis:Region_Information) - documents Mega Drive language and video-frequency region configuration.
