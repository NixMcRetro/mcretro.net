---
title: "Amstrad Sega Mega PC Hard Drive Capacitor Failure and Windows for Workgroups 3.11 Sound Demo"
author: "Nix McRetro"
date: 2012-11-15T07:52:51.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, sega, youtube]
---


{% include youtube.html id="BKoCBsni6Ts" %}

Never a dull moment with the Amstrad Mega PC! I was getting ready to install MS-DOS 6.22 and Windows for Workgroups 3.11 when the machine suddenly switched itself off. I tried turning it back on, but nothing happened. Fair enough, I thought, perhaps the power supply has decided to call it a day.

I connected another supply to see whether that would get things moving again. Instead I was rewarded with an impressive puff of smoke from inside the machine. That's probably not a good sign! Time to pull everything apart and discover which unfortunate electronic component had just earned its wings.

The motherboard appeared to be in reasonable condition, and I couldn't immediately find anything burnt around it. That left the floppy and hard drives as possible suspects, so I kept digging. Eventually I found the culprit: a tantalum capacitor on the Seagate 107 MB hard drive had failed rather spectacularly.

The original capacitor is a 15 uF, 25 V part in a case-size D package. I've ordered a replacement and may try repairing the drive, although I'll want to inspect the surrounding circuitry as well. The capacitor is clearly where the smoke came from, but I still don't know whether it failed on its own or whether something else contributed to the problem. At least the floppy drives appear to have survived.

In the meantime I've installed a 517 MB hard drive and got the machine running again. That's a ridiculous amount of space for some of the things I want to do on this Mega PC. DOS 6.22, Windows for Workgroups 3.11, the Entertainment Pack and probably a fair few games should keep it occupied. Monkey Island, anyone?

The video also includes a demonstration of the Mega PC's AdLib-compatible FM synthesiser playing MIDI under Windows. I had to do a little more fiddling to get the audio working properly, but once the MIDI playback started, it was rather nice hearing those old tunes coming out of the machine again.

I even got the network card talking well enough to ping [RetroJunkie.net](https://retrojunkie.net/) over ethernet. That's something I can investigate properly another day. For now, the Mega PC is running, the sound works and there's no more smoke coming out of the hard drive. All's well that ends well, I suppose. ;)

### Related posts

- [Amstrad Sega Mega PC AdLib Sound Repair: Card Alignment](/amstrad-sega-mega-pc-adlib-sound-repair-card-alignment/)
- [Amstrad Sega Mega PC Boot Failure: DOM and Hard Drive Troubleshooting](/amstrad-sega-mega-pc-boot-failure-dom-and-hard-drive-troubleshooting/)

### Sources

- [Amstrad - Mega PC Owners Manual, PC Sound System](https://acpc.me/ACME/AMSTRAD_PRO/AMSTRAD_PC/LITTERATURE/MANUELS/MEGA_PC_Manual%5BENG%5D.pdf) - printed page 9 describes the built-in AdLib-compatible FM synthesizer.
