---
title: "Apple Macintosh LC 475: Solid-State SCSI Storage with a PCD-60B Card Reader"
author: "Nix McRetro"
date: 2012-12-27T12:14:00.000+11:00
last_modified_at: 2026-11-02
categories: [apple, hacks, youtube]
---

{% include youtube.html id="05efwlfmVnk" %}

The Macintosh LC 475. Now with solid-state storage. Reliable, check. Quiet, check. Awesome, heck yes! I've been wanting to get rid of that old mechanical SCSI hard drive for a while, and I think I've finally found a rather interesting way to do it.

Strictly speaking, the CompactFlash card is not a SCSI device. The Envoy Data PCD-60B is the SCSI device seen by the Macintosh, and I'm using its PCMCIA slot with a PCMCIA-to-CompactFlash adapter and a CF card installed behind that. The reader also supports several other memory-card formats, although getting all those slots working on an old Macintosh is another matter entirely.

Inspired by a thread over at the [68K Macintosh Liberation Army](https://68kmla.org/bb/threads/se-30-booting-off-cf-success.24191/), I decided to see whether this setup could replace the LC 475's mechanical SCSI hard drive. I was particularly interested in the PCMCIA slot because it appeared to be presented as LUN 0, which was important for my intended boot arrangement. The plan was to get a 2 GB CompactFlash card working as the main drive, with the other memory-card slots left for further experiments.

Physically fitting the PCD-60B was surprisingly straightforward. It's a little longer than the original hard drive, and initially I didn't bother fitting the old mounting bracket, but it sat reasonably well inside the LC 475's pizza-box case. The card reader's front bezel caused a few clearance problems, although removing it helped considerably.

Getting the Macintosh to recognise the storage was rather more entertaining. Apple's Drive Setup wasn't particularly interested, and I spent some time trying other utilities while wondering whether I had the SCSI settings right. Eventually I realised that the termination jumper was rather important. Once I had that sorted, things started looking a little more promising.

Lido managed to detect the device, although detection and actually formatting the card turned out to be two different things. I tried several approaches without much success, including utilities that appeared to recognise the reader but couldn't properly initialise the storage. At least I was getting somewhere, even if the Macintosh didn't seem particularly enthusiastic about the whole arrangement.

I also connected the PCD-60B to a PCI SCSI controller in another computer to check what it could do. That setup was able to recognise the reader and access the card, which was reassuring. It gave me a better idea of what was working and left the Macintosh side of things as the next problem to solve.

Eventually [FWB Hard Disk Toolkit](https://macintoshgarden.org/apps/fwb-toolkits-hard-disk-toolkit-v17-v206-raid-toolkit-18) from Macintosh Garden got me moving again. My first successful attempt produced a bootable volume of around 160 MB, and I copied a System Folder across to see whether the LC 475 would actually start from it. Fingers crossed... and it worked!

Once I'd managed that, creating a much larger partition suddenly seemed a lot less mysterious. The whole conversion had started around Christmas Eve or Christmas Day, I can't remember which, and after a couple of days of trial and error I had the storage working. Two gigabytes of silent storage in an LC 475. I now have it all!

Removing the old hard drive makes the machine dramatically quieter. Of course, now the remaining fan sounds much louder than it did before. I considered slowing it with a resistor, although I'd want to keep an eye on temperatures and airflow before getting too carried away with that idea.

I eventually tried the old hard-drive mounting bracket with the PCD-60B and discovered that it could be made to fit after all. Only two of the four screws could be used, but the mounting clips lined up nicely and the reader sat quite securely. With the bezel removed, the case also had enough clearance to close properly.

There are still a few other things I'd like to try, particularly with the additional memory-card slots. I haven't established whether the SD card arrangement will do everything I'd like, but there's certainly room for another experiment there. For now, I'm very happy to have the LC 475 starting from silent CompactFlash storage.

As always, there are plenty of photos in the [photo gallery](/goodies/) for an idea of how well it fits in.
