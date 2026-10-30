---
title: "NetComm Mega-i-Modem V.90 - Model CD2004"
author: "Nix McRetro"
date: 2023-08-16T17:49:56.000+10:00
categories: [linux, modems, repairs]
last_modified_at: 2026-10-18
---


{% include youtube.html id="Gm-ekXhaUKY" %}

This modem was purchased in May 2021, and you might recognise it from [June 2021](/netcomm-mega-i-modem-cd2004-capacitor-list/) when I replaced the capacitors. It's a NetComm Mega-i-Modem CD2004, still sealed in its original box when I received it. A brand-new old modem! Those are always fun to open, especially when they've been sitting around for well over a decade.

The box promises V.90 connectivity, a three-year warranty and all sorts of exciting internet activities, including MP3 downloads, email and online banking. There's even a mention of ICQ, which takes me back a bit. The modem uses a traditional serial connection rather than USB, despite the hardware itself appearing to date from around 2008.

The included documentation is an interesting little time capsule. There are references to Windows Millennium, Windows 2000, Windows XP and OS/2, along with software for faxing and other telephone features. It came with the usual collection of paperwork, installation information and cables. I spent rather longer than necessary looking through the box before getting the modem itself out.

{% include youtube.html id="Aqe99DRUrUM" %}

Next is an internal overview of the modem before it was recapped. There are those STONE-branded capacitors again! Component date codes and PCB markings suggest this is a fairly late example, possibly from around mid-to-late 2008, although that's not the same as a confirmed manufacturing date.

![](/assets/images/2021/img_0727.jpg)

Unfortunately, I only have two photographs of the modem and a rather incomplete log. I might have accidentally run a rogue...

```
rm -rf *
```

...in Terminal while working in my Desktop folder. I had backups, but they didn't include everything, so quite a few modem logs disappeared that night. That's what I get for messing about with the GeoCities archive when I should probably have been asleep.

The surviving log is from 2 June 2021. Despite the missing identification data, I did manage to get a connection at 28800 bps, which was enough to confirm that the modem could communicate over the test setup.

```
---------- 2021-06-02 12:41:41 +1000: Logging Started ----------

AT&F
OK

AT&FE0V0&D2&C1S0=0
OK

ATI0
57600
OK

ATI1
MISSING DATA

ATI2
OK

ATI3
MISSING DATA

ATI4
MISSING DATA

ATI5
MISSING DATA

ATI6
MISSING DATA

ATI7
MISSING DATA

ATI8
MISSING DATA

ATDT1234567890
CONNECT 28800
```

The internal video is useful for seeing how the modem was originally assembled, especially the capacitors before replacement. There were eleven electrolytics in total, and the majority were replaced with Panasonic FR series parts. I didn't record every original component position, so these notes are a reference for my particular CD2004 rather than an exact replacement list for every revision.

When choosing replacement capacitors, it's worth checking their polarity, capacitance, voltage, temperature ratings, ESR, ripple current and physical size against the actual board. The manufacturer part numbers are preserved below. The formatting isn't especially web friendly, so copying the block into a plain-text editor might make it easier to read. 😄

```
Value   Voltage    Height Width Notes
470uF   16V        12mm   7mm   EEUFR1C471
470uF   16V        12mm   7mm   EEUFR1C471
470uF   16V        12mm   7mm   EEUFR1C471
470uF   16V        12mm   7mm   EEUFR1C471
470uF   16V        12mm   7mm   EEUFR1C471

100uF   16V        12mm   5mm   EEUFR1C101
100uF   16V        12mm   5mm   EEUFR1C101
100uF   16V        12mm   5mm   EEUFR1C101

1uF     50V        11mm   4mm   50YXJ1M5X11
10uF    25V        11mm   4mm   EEUFR1H100  Upgraded to 50V
10uF    25V        11mm   4mm   EEUFR1H100  Upgraded to 50V

All electrolytic capacitors are radial.
Lead spacing is 2-2.5mm on most.
```

I'd put more pictures, all two of them, in the [photo gallery](/photos), and the drivers, including an ISO image of the original driver disc, on the [file server](/files). The initialisation string in the log records what I used on this modem, although other setups might need different settings.

This modem has since been donated to the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au/). At least it received a new set of capacitors and a successful dial test before heading off to its next home.

**Sources**

- [Nichicon - Application Guidelines for Aluminum Electrolytic Capacitors](https://www.nichicon.co.jp/english/series_items/catalog_pdf/e-aluminum.pdf)

**Related Posts**

- [NetComm Mega-i-Modem CD2004 Capacitor List](/netcomm-mega-i-modem-cd2004-capacitor-list/)
