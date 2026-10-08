---
title: "Dumping the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive via GUI and dd"
author: "Nix McRetro"
date: 2016-04-09T13:03:38.000+10:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [sega, youtube]
---

{% include youtube.html id="ynXxOYtCZYY" %}

Everyone loves WSB2K2! World Series Baseball 2K2! In this part I try imaging the HKT-0120 SCSI drive with R-Studio for Linux and ordinary `dd`. The results are not terrible, but there appears to be a small amount of unreadable data.

A raw copy with `dd` is useful when a disk is healthy enough, but it is not specialised recovery software. When a drive starts returning read errors, repeatedly hammering the bad areas is not ideal. That's why the next part turns to recovery tools, including GNU ddrescue, which is designed specifically around recovering readable areas first and keeping track of what still needs attention.

Stay tuned for part 3. And yes, at the time I was still trying to remember whether the program was called `ddrescue` or `dd_rescue`. :)

### Sources

- [ASSEMBlergames - World Series Baseball 2K2 dumping thread](https://web.archive.org/web/20160708220702/http://assemblergames.com/l/threads/world-series-baseball-2k2-wsb2k2-dumping-from-hkt-0120.60534/)
- [R-Studio for Linux](https://www.r-studio.com/data_recovery_linux/Download.shtml)
- [GNU Project - GNU ddrescue](https://www.gnu.org/software/ddrescue/)

### Related posts

- [Preparing to Dump the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive](/preparing-to-dump-the-sega-dreamcast-hkt-0120-dev-kit-scsi-hard-drive/)
- [Dumping the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive with GNU ddrescue](/dumping-the-sega-dreamcast-hkt-0120-dev-kit-scsi-hard-drive-with-gnu-ddrescue/)
