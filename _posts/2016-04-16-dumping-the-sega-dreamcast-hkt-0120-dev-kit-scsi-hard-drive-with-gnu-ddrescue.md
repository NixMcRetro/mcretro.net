---
title: "Dumping the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive with GNU ddrescue"
author: "Nix McRetro"
date: 2016-04-16T13:12:53.000+10:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, sega, youtube]
---

{% include youtube.html id="QHFQhVVaCm8" %}

At the time I was still confusing `ddrescue` with the separate program `dd_rescue`. My original forum post names dd_rescue; the later update below records my GNU ddrescue preference. They are different programs, so the surviving notes do not establish that GNU ddrescue alone produced this dump.

Despite the confusion, I did eventually get a useful disk image. Below is the directory structure of the last main folder.

![Directory structure](/assets/images/2016/img_0471.jpg)

The [disk image](/files) I originally shared was around 1 GB compressed and about 4.5 GB decompressed. The current files page is a placeholder, so the original image still needs recovering. World Series Baseball 2K2! Or WSB2K2 as it was known amongst the cool kids?

The original [ASSEMBlergames thread](https://web.archive.org/web/20160707153456/http://assemblergames.com/l/threads/world-series-baseball-2k2-wsb2k2-dumping-from-hkt-0120.60534/) documenting the World Series Baseball 2K2 discovery is also preserved.

I've also got a solid-state replacement solution coming in the mail for the HKT-0120 SCSI drive. Hopefully that will bring it back to the best state it has ever been in, but not before we pull the entire thing apart and put it back together, obviously. Might be a while off yet. Stay tuned! :D

**Update 2022-10-09:** This is why sleep is important. In the original recording I typed `sd2` instead of `sda2`. GNU ddrescue is the program I ultimately prefer for this job. It reads the easier areas first and can use a mapfile so recovery can resume without starting over. On Ubuntu, the package command I noted was `sudo apt install gddrescue`. It's amazing what you learn as time goes forward.

### Sources

- [GNU Project - GNU ddrescue](https://www.gnu.org/software/ddrescue/)
- [GNU ddrescue manual](https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html)
- [GNU ddrescue 1.19 manual page (Debian Jessie)](https://manpages.debian.org/jessie/gddrescue/ddrescue.1.en.html)

### Related posts

- [The Sega Dreamcast HKT-0120 Development Box Teaser](/the-sega-dreamcast-hkt-0120-development-box-teaser/)
- [Preparing to Dump the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive](/preparing-to-dump-the-sega-dreamcast-hkt-0120-dev-kit-scsi-hard-drive/)
- [Dumping the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive via GUI and dd](/dumping-the-sega-dreamcast-hkt-0120-dev-kit-scsi-hard-drive-via-gui-and-dd/)
