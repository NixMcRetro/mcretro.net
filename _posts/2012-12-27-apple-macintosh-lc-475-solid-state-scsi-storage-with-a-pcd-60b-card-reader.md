---
title: "Apple Macintosh LC 475: Solid-State SCSI Storage with a PCD-60B Card Reader"
author: "Nix McRetro"
date: 2012-12-27T12:14:00.000+11:00
last_modified_at: 2026-11-02
categories: [apple, hacks, youtube]
---

{% include youtube.html id="05efwlfmVnk" %}

The Macintosh LC 475. Now with solid-state storage. Reliable, check. Quiet, check. Awesome, heck yes! I made it home just in time for Christmas, and removing the old mechanical hard drive seemed like a perfectly reasonable way to celebrate.

The device I'm experimenting with is the Envoy Data PCD-60B card reader, which connects to the Macintosh through SCSI and offers several different memory-card formats. The video identifies the reader as an SCM PCD-60B, so there may be some branding or identification differences worth looking into. Either way, strictly speaking the CompactFlash card isn't a SCSI device itself. It's installed in a PCMCIA-to-CompactFlash adapter in the reader's PCMCIA slot, with the PCD-60B providing the SCSI interface seen by the Mac.

I was inspired by a discussion over at the [68K Macintosh Liberation Army](https://68kmla.org/bb/threads/se-30-booting-off-cf-success.24191/) and wanted to find out whether this combination could replace the LC 475's ordinary hard drive. The 2 GB CompactFlash card seemed like a good candidate, but at first I was only guessing about how well the Mac would handle the reader's multiple logical units.

Fitting the reader into the LC 475 was surprisingly promising, although it's slightly longer than the original drive and the front card slots make clearance rather interesting. I initially installed it without the normal drive bracket, removed the reader's front bezel and discovered that it could sit almost flush with the Macintosh's case. Later, I found that a drive bracket could be made to fit using two mounting screws, which was a much nicer result than I'd expected.

Getting it recognised was another story. Apple's Drive Setup didn't want to initialise the card, and for a while I was staring at a spinning cursor and wondering whether I'd wasted my time. One important detail was SCSI termination: I needed the termination jumper set correctly on the reader. That made a real difference, even though the card still wasn't ready to behave as an ordinary Macintosh hard drive.

I tried Lido and checked the reader from another computer using a PCI SCSI adapter. The reader and its available card formats were detected there, which gave me some confidence that the hardware itself was working. The PCD-60B was running firmware revision 1.2.8, and I could see the card reader over the SCSI connection. Now I just needed to persuade the LC 475 to use it.

The breakthrough came with [FWB Hard Disk Toolkit](https://macintoshgarden.org/apps/fwb-toolkits-hard-disk-toolkit-v17-v206-raid-toolkit-18). I initially managed a small 160 MB volume, copied a System Folder across and rebooted. It worked! After all that mucking around, the Macintosh was finally booting from the CompactFlash card.

Once I understood how the partitioning utility wanted to be used, I went back and created a much larger partition using the 2 GB card. Suddenly the whole operation seemed terribly straightforward. Trial and error remains my favourite way of learning things, even when it takes far longer than it probably should.

Removing the original hard drive also made the machine dramatically quieter. Of course, that only makes the remaining fan noise seem louder. I did briefly consider reducing the fan's speed with a resistor, although any reduction in airflow would need proper temperature testing. A quieter, compatible replacement fan might be the better way to go.

There are still some interesting possibilities to investigate, including whether the reader's other card slots might be usable and whether an accessible slot could be added to the front of the Macintosh case. For now, however, the important part is working: two gigabytes of silent solid-state storage in my LC 475. I now have it all!

As always, there are more photos in the [Goodies collection](/goodies/) if you'd like a closer look at how the hardware fits.

### Sources

- [Apple - Macintosh LC 475 Technical Specifications](https://support.apple.com/en-ug/112204) - documents the LC 475's internal SCSI storage interface.
