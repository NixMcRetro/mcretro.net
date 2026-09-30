---
title: "Dumping the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive with GNU ddrescue"
author: "Nix McRetro"
date: 2016-04-16T13:12:53.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, sega, youtube]
---

{% include youtube.html id="QHFQhVVaCm8" %}

This final recovery attempt used **GNU ddrescue**.

In the original post I kept confusing `ddrescue` with the separate program `dd_rescue`.

They are not the same tool.

GNU ddrescue is the one I ultimately prefer for this job. It is specifically designed for recovering data from problematic block devices, reads the easier areas first, and can use a mapfile so the recovery can be resumed without starting over.

There was another sleepy mistake in the original recording too: at one point I typed `sd2` instead of `sda2`.

This is why sleep is important.

Despite the confusion, I did eventually get a useful disk image.

![Directory structure](/assets/images/2016/img_0471.jpg)

The archived [disk image](/files) is around 1 GB compressed and about 4.5 GB decompressed.

The original [ASSEMBlergames thread](https://web.archive.org/web/20191109235322/https://assemblergames.com/threads/world-series-baseball-2k2-wsb2k2-dumping-from-hkt-0120.60534/) documenting the World Series Baseball 2K2 discovery is also preserved.

I've also got a solid-state replacement solution coming for the HKT-0120 SCSI drive.

Not before we pull the entire thing apart, obviously.

Stay tuned! :D

### Related posts

- [The Sega Dreamcast HKT-0120 Development Box Teaser](/the-sega-dreamcast-hkt-0120-development-box-teaser/)
- [Preparing to Dump the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive](/preparing-to-dump-the-sega-dreamcast-hkt-0120-dev-kit-scsi-hard-drive/)
- [Dumping the Sega Dreamcast HKT-0120 Dev Kit SCSI Hard Drive via GUI and dd](/dumping-the-sega-dreamcast-hkt-0120-dev-kit-scsi-hard-drive-via-gui-and-dd/)

### Sources

- [GNU Project - GNU ddrescue](https://www.gnu.org/software/ddrescue/)
- [GNU ddrescue manual](https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html)
