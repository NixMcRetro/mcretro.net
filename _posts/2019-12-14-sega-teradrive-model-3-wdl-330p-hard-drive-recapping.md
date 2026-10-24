---
title: "Sega TeraDrive Model 3 WDL-330P Hard Drive Recapping"
author: "Nix McRetro"
date: 2019-12-14T09:44:42.000+11:00
categories: [ibm-pc, sega, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="uHWhDq0oe2M" %}

With the two spare hard drives recapped, we move onto the main course: removing and recapping the drive from the Sega TeraDrive Model 3. After this we have just the floppy drives to recap, which prove to be a much more error-filled adventure. Tear a cable here, tear a cable there. That's my motto!

Getting the drives out of the TeraDrive was the first challenge. The power supply was in the way, and naturally it was faulty too. Why have one problem when you can have several?

The front of the machine reminded me quite a bit of an IBM PS/2 Model 30, which isn't terribly surprising given the TeraDrive's IBM PC heritage. There are little plastic clips securing the drives, and I was rather keen not to snap them. I've seen what happens to old plastic on the Amstrad Mega PC. Yikes!

After a little fiddling with the clips and ribbon cables, both the hard drive and floppy drive were free. The drive assembly was marked May 1991, which gives some idea of what we're dealing with here.

Unfortunately, the hard drive's circuit board had already suffered during my earlier capacitor experiments. At least one solder pad was completely gone, and another had lifted. Not exactly the sort of thing you want to discover when you're trying to tidy up a repair.

The plan was to replace the old radial capacitors with surface-mount parts, as I'd been doing on the spare WDL-330P drives. That meant a 100 uF capacitor in the middle and two 47 uF capacitors on either side, with the polarity checked against the board.

The missing connection around C6 was the awkward part. Fortunately, there was a little bit of wire and a nearby via to work with, so I attempted to make a bridge rather than give up on the board entirely.

That turned into a considerably longer soldering adventure than I'd expected. The wire was tiny, the lighting wasn't helping, and every time I thought the connection was behaving itself, another poke seemed to make matters worse. Perhaps I should stop poking things once they're working?

I did get the replacement capacitors fitted, although the repaired connection was still bothering me. The multimeter readings weren't particularly straightforward to interpret, especially when comparing different points on the circuit. I eventually found readings that gave me some confidence that the wire was making contact, but I'd much rather see the drive actually working.

At least the soldering was looking tidier by the end. Not perfect, mind you. I certainly wouldn't describe these as professionally reworked drives. But they were my drives, and I was learning a fair bit about repairing damaged pads along the way.

This also reminded me why I'd become interested in alternatives such as the XT-IDE project. I'd acquired these old drives after discovering they worked natively with the TeraDrive, only to find myself wondering whether I really needed quite so many ageing mechanical hard drives after all.

Still, that's all three WDL-330P drives recapped. The Model 3's main drive hasn't had a proper in-system test yet, so I'll find out whether the repair has done the job once the TeraDrive itself is ready.

Next come the floppy drives. How difficult could they possibly be?

Previous: [Sega TeraDrive Spare Drive WDL-330P #2 Recapping](/sega-teradrive-spare-drive-wdl-330p-2-recapping/)

Next: [Sega TeraDrive WDL-330P Comparison](/sega-teradrive-wdl-330p-comparison/)
