---
title: "Amstrad Sega Mega PC AdLib Sound Repair: Card Alignment"
author: "Nix McRetro"
date: 2012-11-15T00:50:42.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="AOF9JyYnzXg" %}

I've been trying to work out why the PC side of the Mega PC refuses to produce reliable AdLib sound. At first I assumed I simply had the wrong drivers. That was the first mistake.

It was Saturday night, around 10:30 pm, and I was still trying to get sound out of this machine. The power supply fan was making a dreadful racket, which made the whole exercise even more enjoyable.

### AdLib Does Not Need a General DOS Sound Driver

The Mega PC manual describes its built-in FM synthesizer as AdLib-compatible. DOS games normally talk directly to AdLib-compatible OPL hardware, so a missing general-purpose sound driver was not a convincing explanation for the failure.

Paku Paku 1.6 can detect AdLib hardware automatically, while `paku /adlib` can be used to force that mode.

The Secret of Monkey Island can explicitly select AdLib with:

`monkey a`

The PC speaker audio and the FM sound are both routed through the machine's speaker arrangement, although the external audio connection and volume controls aren't quite the same. The PC speaker volume is controlled at the rear, while the FM and Mega Drive audio use the front control.

That gave me a few ways to test what was going on. Paku Paku worked with the ordinary PC speaker, but when I forced AdLib, the sound was often distorted or completely missing. Every now and then I could just about recognise the music coming through.

At least something was reaching the synthesizer. Unfortunately, what came out sounded rather like circuit bending, only considerably more frustrating.

Even when the Mega PC audio was distorted, I could sometimes recognise the music well enough to know that something was reaching the synthesizer.

### A Misleading Cache-Jumper Detour

The sound was extremely sensitive to the hardware being moved or bumped. Sometimes it was distorted; sometimes it disappeared completely. I cleaned the contacts, changed BIOS resource settings and came dangerously close to experimenting with unlabelled motherboard jumpers.

The replacement motherboard is from an Amstrad PC7486SLC rather than the original Mega PC 386SX board, although it accepts the Mega PC daughterboard arrangement.

At one point changing a cache jumper appeared to restore the audio. Naturally I thought I had found something. Then I reassembled the machine and the distortion came straight back. So much for that theory.

### The Actual Problem: Alignment

Eventually it hit me like a ton of bricks.

The motherboard and daughterboards were not seating consistently. In particular, the ISA riser and the front Mega Drive cartridge-interface assembly were sensitive to alignment after the motherboard replacement.

I could actually make the AdLib sound work when the front connector board was only partially seated. Push things back together, and the audio would disappear again. That was a pretty good clue that I was chasing a connection problem rather than a missing driver.

I pulled the boards apart, cleaned the contacts, and tried again. The amount of grime coming off the gold fingers was impressive considering they didn't look particularly dirty.

For a while I had Monkey Island producing lovely FM music, only for everything to go wrong when I moved the machine. I tried shifting the motherboard slightly, which helped, but the problem wasn't completely gone.

Eventually I loosened the four mounting screws securing the board assembly and adjusted its position relative to the front connector board. That brought the boards back into proper alignment.

The Mega Drive side had continued producing sound normally, which is why I had spent so long blaming software on the PC side. The PC side is finicky as all hell.

Once I carefully reassembled the machine piece by piece and made sure the boards were seated correctly, the AdLib audio worked properly again. Paku Paku and Monkey Island both finally had FM music instead of broken or missing audio, without needing command-line switches.

I'd managed to introduce the alignment problem myself when I originally replaced the motherboard and dismantled everything for photographs. A mistake made months earlier had now consumed most of my weekend. Wonderful!

Still, the important thing is that it works. I can switch between the Mega Drive and PC sides, and both are producing sound as they should. Now I can get MS-DOS 6.22 and Windows for Workgroups 3.11 installed again and see how much of the Windows audio side I can get working.

You can follow the original troubleshooting discussion in the archived [ASSEMbler Games thread](https://web.archive.org/web/20191110053354/https://assemblergames.com/threads/adlib-compatible-sound-in-the-amstrad-mega-pc.42694/).

### Related Posts

- [Amstrad Sega Mega PC: Activating PC-Only Mode](/amstrad-sega-mega-pc-activating-pc-only-mode/)

### Sources

- [Amstrad - Mega PC Owners Manual, PC Sound System](https://acpc.me/ACME/AMSTRAD_PRO/AMSTRAD_PC/LITTERATURE/MANUELS/MEGA_PC_Manual%5BENG%5D.pdf) - printed page 9 describes the built-in AdLib-compatible FM synthesizer.
- [Jason M. Knight - Paku Paku 1.6 README and Turbo Pascal source](https://www.classicdosgames.com/files/games/jasonmknight/paku_1_6.rar) - the original distribution documents the /adlib option and implements automatic AdLib detection.
