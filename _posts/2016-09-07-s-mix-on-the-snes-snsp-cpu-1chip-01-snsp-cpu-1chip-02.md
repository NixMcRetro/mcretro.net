---
title: "S-MIX on the SNES SNSP-CPU-1CHIP-01 / SNSP-CPU-1CHIP-02"
author: "Nix McRetro"
date: 2016-09-07T06:45:38.000+10:00
categories: [hacks, nintendo, repairs]
---

![s-mix](/assets/images/2016/img_0552.jpg)

Those long time listeners out there might remember this photo of a hole that was blown in the S-MIX chip on the SNSP-CPU-1CHIP-02 mainboard I had a while back. Well good news, I got a chance to revisit the issue - on a completely different Super Nintendo! Only this time, I have a solution. [Unlike last time](/damaged-s-mix-on-a-snes-snsp-cpu-02-mainboard/). So how did I do it?

![img\_0969](/assets/images/2016/img_0551.jpg)

I reversed the polarity!... I kid, I kid! Actually, I wired from the 6379A, aka UPD6379A, chip at U6 to the AV port on the underside of the board. 30AWG Kynar fits perfectly through the vias on the board. Essentially I'm skipping the S-MIX altogether now and just going straight from the DAC to the output. Will that be good for the system long term? I have no idea, I'll check back in a few years (if I remember).

It's good to finally have a solution for 1CHIP SNES / SFC units that lose their sound. From what I could tell playing Madden, the sound is all there too. [Borti](https://web.archive.org/web/20191112060628/https://assemblergames.com/threads/snes-mainboard-repair-no-sound-serial-up17372657.63061/) reports that the DAC might eventually explode, but at least it can give audio for now. With that, I'm going to say - No audio issue solved! Fixed! Repaired! Sound for everyone! :)

Big thanks to [Stian](https://web.archive.org/web/20191029031401/http://nintendoage.com/forum/messageview.cfm?catid=8&threadid=156634) on Nintendo Age, [Armando92](https://www.youtube.com/channel/UCpQ4cGZT5ugySL7jiX9LFKA) on YouTube and [Borti](https://web.archive.org/web/20191113111423/https://assemblergames.com/members/borti4938.90935/) of Assembler Games. As well as [Console5](https://console5.com/wiki/UPD6379) for their magnificent website.
