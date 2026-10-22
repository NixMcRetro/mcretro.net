---
title: "Dumping the Japanese Sega Channel BIOS (Success)"
author: "Nix McRetro"
date: 2013-12-23T07:32:00.000+11:00
last_modified_at: 2026-10-22
categories: [programming, sega, youtube]
---

{% include youtube.html id="n5CEYI2xGQU" %}

Victory is mine! And yours, and the internets! Please enjoy the dump of the Sega Channel BIOS brought to you by Dr. Eggfan and myself. For science!

After all those failed attempts, I was beginning to wonder whether we'd ever get a consistent read from this thing. The same chip in the same programmer was producing different data each time. Different checksums, different results, and not a particularly useful BIOS dump to show for it.

I'd been reading through suggestions about possible address-line and voltage problems, which got me thinking about the programmer settings. Eventually I started experimenting with the device configuration and made one particular change in the `devices.txt` file.

I changed the programmer's VCC setting from 5 V to 3.6 V. And would you believe it, the checksum stopped changing! I repeated the read around ten times, with the same result each time. At long last, we appeared to have a consistent dump.

That was the breakthrough I'd been looking for. It doesn't necessarily establish exactly why the earlier reads were inconsistent, but it was enough to get this particular chip and programmer combination cooperating.

A big thank you to Dr. Eggfan and the people sharing their discoveries on the old electronics forums. Those discussions helped point me in the right direction, and now we've finally got something worth releasing into the wild!

More details can be found over on [Sonic Retro](https://forums.sonicretro.org/index.php?threads/more-sega-channel-prototypes-dumped.25935/page-7#post-764202).

### Sega Channel Japan series

- [The Theme from Sega Channel Japan](/the-theme-from-sega-channel-japan/)
- [Japanese Sega Channel Adapter - First Look](/japanese-sega-channel-adapter-first-look/)
- [Japanese Sega Channel Adapter - Second Look](/japanese-sega-channel-adapter-second-look/)
- [Socketing the Sega Channel Adapter BIOS (Japanese Version)](/socketing-the-sega-channel-adapter-bios-japanese-version/)
- [Dumping the Japanese Sega Channel BIOS (Failure 1)](/dumping-the-japanese-sega-channel-bios-failure-1/)
- [Dumping the Japanese Sega Channel BIOS (Failure 2)](/dumping-the-japanese-sega-channel-bios-failure-2/)
