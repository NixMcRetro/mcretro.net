---
title: "Amstrad Sega Mega PC AdLib Sound Repair: Card Alignment"
author: "Nix McRetro"
date: 2012-11-15T00:50:42.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="AOF9JyYnzXg" %}

I've been trying to work out why the PC side of the Mega PC refuses to produce reliable AdLib sound.

At first I assumed I simply had the wrong drivers.

That was the first mistake.

### AdLib does not need a general DOS sound driver

The Mega PC manual describes its built-in FM synthesizer as AdLib-compatible.

DOS games normally talk directly to AdLib-compatible OPL hardware, so a missing general-purpose sound driver was not a convincing explanation for the failure.

Paku Paku 1.6 can detect AdLib hardware automatically, while `/adli` can be used to force that mode.

The Secret of Monkey Island can explicitly select AdLib with:

`monkey a`

Even when the Mega PC audio was distorted, I could sometimes recognise the music well enough to know that something was reaching the synthesizer.

### A misleading cache-jumper detour

The sound was extremely sensitive to the hardware being moved or bumped. Sometimes it was distorted; sometimes it disappeared completely.

I cleaned the contacts, changed BIOS resource settings and came dangerously close to experimenting with unlabelled motherboard jumpers.

The replacement motherboard is from an Amstrad PC7486SLC rather than the original Mega PC 386SX board, although it accepts the Mega PC daughterboard arrangement.

At one point changing a cache jumper appeared to restore the audio.

Naturally I thought I had found something.

Then I reassembled the machine and the distortion came straight back.

So much for that theory.

### The actual problem: alignment

Eventually it hit me like a ton of bricks.

The motherboard and daughterboards were not seating consistently.

In particular, the ISA riser and the front Mega Drive cartridge-interface assembly were sensitive to alignment after the motherboard replacement.

The Mega Drive side had continued producing sound normally, which is why I had spent so long blaming software on the PC side.

Once I carefully reassembled the machine piece by piece and made sure the boards were seated correctly, the AdLib audio worked properly again.

Paku Paku and Monkey Island both finally had FM music instead of broken or missing audio.

Another success.

Now I can get MS-DOS 6.22 and Windows for Workgroups 3.11 installed again and see how much of the Windows audio side I can get working.

You can follow the original troubleshooting discussion in the archived [ASSEMblergames thread](https://web.archive.org/web/20191110053354/https://assemblergames.com/threads/adlib-compatible-sound-in-the-amstrad-mega-pc.42694/).

### Sources

- [Centre for Computing History - Amstrad Mega PC Owners Manual](https://www.computinghistory.org.uk/det/32501/Amstrad-Mega-PC-Owners-Manual/) - identifies the Mega PC manual and its AdLib-compatible sound synthesizer.
- [Classic DOS Games - Paku Paku](https://www.classicdosgames.com/game/Paku_Paku.html) - documents Paku Paku and its AdLib sound support.
