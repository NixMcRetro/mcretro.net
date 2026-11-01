---
title: "Building a Development PC"
author: "Nix McRetro"
date: 2018-11-04T20:47:44.000+11:00
categories: [devkit, sega, study]
last_modified_at: 2026-10-18
---

{% include youtube.html id="NmhDKQmf_kc" %}

Quick, down memory lane! This was a fun video to put together, slowly piecing together an AMD Athlon K7 development PC using a brand-new, old-stock motherboard. I wanted something suitable for experimenting with my Sega Dreamcast HKT-0120 development kit, along with a few other bits of older hardware that modern computers aren't particularly interested in talking to.

The motherboard is an MSI MS-6167 Slot A model, still in its original packaging after all those years. Opening it was rather exciting, especially with all the wonderful artwork and marketing material from around the turn of the millennium. There were futuristic spaceships on the box, a Y2K approval claim and the usual promises of magnificent computing performance. Apparently we were supposed to have a few more spaceships by now!

One reason I chose this motherboard was its collection of expansion slots. We've got two ISA slots, five PCI slots and one AGP slot, which gives me plenty of flexibility for older hardware. The Dreamcast development kit needs a SCSI interface, and having ISA available could also come in handy for experimenting with other development equipment. Try finding that combination on a modern motherboard!

I'd also been looking forward to building another Athlon system. My original machine from around 2000 had been an AMD Athlon 500 MHz, and I'd picked up what I thought was a 750 MHz processor for this project. Unfortunately, I'd managed to read the marking incorrectly. K7 500 doesn't mean K7 750! So now I've got two 500 MHz Athlons. Apparently reading the label properly is an optional part of computer building.

For graphics, I've got a lovely 3dfx Voodoo5 5500. It's an impressive-looking card, complete with its two little fans, and rather more interesting than whatever ordinary graphics adapter I could have found in the spare-parts collection. There's also a SCSI card for the Dreamcast development kit, along with three 128 MB SDRAM modules giving me 384 MB of memory. The RAM is rated for PC133 operation, although it's quite happy running at the motherboard's lower memory speed.

Everything went into a Corsair case with a rather excessive 500 W power supply. The ATX layout made fitting the old motherboard considerably easier than I'd expected, although the cable management was another matter. The case also had openings in the rear I/O plate for onboard sound connections the motherboard didn't actually provide. Wonderful! I was already making plans to replace that plate with something more suitable.

After fitting the Voodoo5, SCSI card, memory and a parallel ATA optical drive, it was time to see whether the machine would start. Power on, fans spinning, and there was the Voodoo graphics card announcing itself on the screen. Excellent! The BIOS detected the Athlon at 500 MHz and the installed memory, while the SCSI card went through its usual startup routine looking for devices that weren't connected yet.

With no proper hard drive arrangement ready, I tried booting a Linux live CD. It worked, which was a rather encouraging result for a machine built from hardware that had been sitting around for nearly two decades. The graphics performance wasn't exactly astonishing, but the motherboard, processor and memory were behaving well enough for me to continue.

The next problem was storage. I wanted to avoid relying on an ancient mechanical hard drive, so I'd been experimenting with CompactFlash cards connected through IDE adapters. In theory, it's a lovely arrangement for an old PC. You get something that behaves rather like an ordinary IDE drive without having to listen to a collection of ageing hard-drive bearings.

Unfortunately, the first adapter wasn't cooperating. Windows 98 setup kept getting stuck, and I initially wondered whether something was wrong with the CompactFlash card or the installation itself. After trying different cards and eventually changing the adapter, I discovered the original adapter was the problem. One of the cards had even developed file-allocation-table errors during the experiments. Just what I needed!

With another adapter fitted, things started behaving considerably better. I formatted the CompactFlash storage again, got Windows 98 Second Edition installing properly and finally reached the desktop. Beautiful! The machine was using a CompactFlash card of roughly 32 GB, which is a rather generous amount of storage for something running Windows 98.

I'd been debating whether to use Windows 98, Windows 2000 or Windows XP. I always had a soft spot for Windows 2000 because of how stable it seemed compared with Windows 9x, but Windows 98 made sense for this particular collection of older hardware. There were still chipset and graphics drivers to sort through, and I wanted to make sure the SCSI interface would behave properly with the Dreamcast development kit.

I also updated the motherboard BIOS and spent some time identifying the AMD-751 and AMD-756 chipset components. Finding old drivers and documentation for hardware like this can be frustrating, particularly when the manufacturer's website no longer has everything available. Fortunately, the original motherboard packaging included a driver CD, which was a welcome change from hunting around the internet for every little file.

By the end of the video, the machine was looking rather respectable. We'd got the Athlon 500 MHz, Voodoo5 5500, 384 MB of RAM, SCSI interface, USB expansion card and CompactFlash storage all fitted into the Corsair case. The floppy drive still needed a suitable power adapter, and I had a few more things to configure, but Windows 98 was up and running.

Better still, this PC went on to be used for testing the Sega Dreamcast HKT-0120 development kit, and it worked a charm. Unfortunately, it eventually got passed on to some kids who ended up setting it on fire. After all that effort getting everything together! Good times?

As usual, there was plenty of unrelated rambling during the build, including my approaching university examinations. I'd somehow managed to let most of the semester disappear without doing quite as much study as I'd intended. Final exams were only a few weeks away, and I was beginning to wonder where those previous 12 or 13 weeks had gone.

I kept promising myself I'd be a better student, but attendance just wasn't my thing. It turns out that taking apart computers is substantially more interesting than revising for exams. Who could have guessed?

Anyway, I'd better get back and lock down for the study period. There's a development PC to finish configuring, examinations to prepare for and no shortage of other projects waiting for attention. Stay in school, kids! Or perhaps just stay enrolled. Everything is recorded these days, after all. We really do live in wondrous times!
