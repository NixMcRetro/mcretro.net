---
title: "Super Nintendo Serial UP15971140 PPU1 Trace Repair"
author: "Nix McRetro"
date: 2013-07-11T20:05:58.000+10:00
last_modified_at: 2026-10-22
categories: [nintendo, repairs, youtube]
---

{% include youtube.html id="fvXOWPn8YXM" %}

Here we go repairing the traces on Super Nintendo \`UP15971140\` that were corroded away by an unknown liquid, probably many eons ago. This is the one that was producing some rather spectacular video distortion, and after poking around with the multimeter I've managed to narrow things down to three damaged connections around PPU1, the picture processing unit.

Two of the connections weren't making it through from the chip to their corresponding points on the board, while another trace had been eaten away further along its path. The good news was that I could follow where they were supposed to go, so the plan was to bridge the damaged sections with wire and test the console after each repair.

The first wire went in rather nicely. I scraped back a little of the board to expose the copper, and the solder managed to flow into the via and hold the new connection in place. Wonderful! Time to give the SNES another test with *Lemmings*.

Straight away there was an improvement. We had colour again, and the television was correctly detecting PAL rather than jumping between video standards. The picture still wasn't right, but at least things were heading in the right direction. I also had to account for a previously blown fuse during testing, so there was still more electrical work to sort out beyond the video traces.

Next up was *John Madden Football '93*, which made the remaining faults rather obvious. The picture was still distorted, with text behaving strangely and some rather nasty vertical bars. After fitting the second connection to PPU1, those bars became noticeably thinner. Not quite a touchdown yet, but we're getting there!

Finally, I connected the remaining damaged trace. Three wires installed, and suddenly the picture looked remarkably clear. No more dreadful vertical bars, no more backwards-looking text. There was *John Madden Football '93* looking like a proper game again!

I took the board downstairs afterwards for a better look at the soldering work. Some of those connections were a little awkward to make, particularly where the copper had corroded around the vias, but they were holding. There were a few other suspicious-looking areas that I'd cleaned up as best I could, so hopefully they wouldn't cause more trouble later.

Issue resolved! This one was fun.

### Related posts

- [Super Nintendo Serial UP15971140 - Video Distortion](/super-nintendo-serial-up15971140-video-distortion/)
