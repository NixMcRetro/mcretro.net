---
title: "Amstrad Sega Mega PC Hard Drive Capacitor Failure and Windows for Workgroups 3.11 Sound Demo"
author: "Nix McRetro"
date: 2012-11-15T07:52:51.000+11:00
last_modified_at: 2026-10-04
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-04
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, sega, youtube]
---

{% include youtube.html id="BKoCBsni6Ts" %}

While trying to install MS-DOS 6.22 and Windows for Workgroups 3.11, the Mega PC suddenly appeared to develop a power short. I tried another power supply, switched it on and was rewarded with plumes of smoke rising from the machine.

Excellent.

After pulling everything apart, I found that a tantalum capacitor on the Seagate 107 MB hard drive had failed dramatically. The failed capacitor was the obvious source of the smoke and short-like behaviour, although I still need to inspect the surrounding circuit before assuming nothing else was damaged.

The original part is 15 uF, 25 V in a case-size D package. I've ordered a replacement. Capacitance, polarity and physical fit obviously matter. A replacement voltage rating can be equal to or higher than the original where the package and capacitor technology remain appropriate.

In the meantime I installed a 517 MB hard drive and got MS-DOS 6.22 and Windows for Workgroups 3.11 running again. The video above includes some Windows MIDI playback using the Mega PC's AdLib-compatible FM hardware.

I also managed to get the network card talking far enough to ping [RetroJunkie.net](https://retrojunkie.net/) over Ethernet.

That can become another project for another day. ;)

### Related posts

- [Amstrad Sega Mega PC AdLib Sound Repair: Card Alignment](/amstrad-sega-mega-pc-adlib-sound-repair-card-alignment/)
- [Amstrad Sega Mega PC Boot Failure: DOM and Hard Drive Troubleshooting](/amstrad-sega-mega-pc-boot-failure-dom-and-hard-drive-troubleshooting/)

### Sources

- [Amstrad - Mega PC Owners Manual, PC Sound System](https://acpc.me/ACME/AMSTRAD_PRO/AMSTRAD_PC/LITTERATURE/MANUELS/MEGA_PC_Manual%5BENG%5D.pdf) - printed page 9 describes the built-in AdLib-compatible FM synthesizer.
