---
title: "Sega TeraDrive Model 3 Hard Drive Replacement"
author: "Nix McRetro"
date: 2012-06-09T03:58:09.000+10:00
last_modified_at: 2026-10-18
categories: [computing, repairs, sega]
share_description: >-
  Three IBM WDL-330P hard drives pass testing in a Sega TeraDrive Model 3, with DOS 6.22 and Windows 3.11 installed. One other drive sounds like a freight train. 💾
---

![Three black IBM hard drives laid out on a desk beside an opened Sega TeraDrive, with cables, screws and a keyboard nearby.](/assets/images/2012/img_0180.jpg)

*Three IBM WDL-330P drives lined up for the TeraDrive Model 3. I was rather pleased to find all three working.*
{: .media-caption }

![Close-up of an IBM hard drive label showing model WDL-330P and 30 MB capacity, resting on an open TeraDrive.](/assets/images/2012/img_0178.jpg)

*A closer look at one of the 30 MB IBM WDL-330P drives. Exactly the sort of storage this TeraDrive needed.*
{: .media-caption }

![Monitor showing DOS FDISK partition information for drive 1: an active 30 MB primary DOS partition using FAT16.](/assets/images/2012/img_0179.jpg)

*FDISK sees the full 30 MB as a single primary DOS partition. We're getting somewhere!*
{: .media-caption }

It worked and it worked! I can't really complain about that. Picked up three IBM WDL-330P drives for my TeraDrive Model 3, which arrived without a hard drive, and all three work well.

![AMIDiag hard-disk read/verify test screen listing three bad tracks and an error at cylinder 884, head 1, sector 1.](/assets/images/2012/img_0181.jpg)

*The read/verify test found three bad-track entries. Not immaculate, but pretty reasonable for an old drive.*
{: .media-caption }

![DOS ScanDisk surface scan at 1% complete, with a cluster map showing red B markers and 296 of 15,133 clusters examined.](/assets/images/2012/img_0185.jpg)

*A surface scan underway, with some red B markers already showing on the map. I wanted more than a quick listen to these drives.*
{: .media-caption }

![DOS ScanDisk surface scan at 3% complete, showing scattered red B markers on the cluster map and 510 clusters examined.](/assets/images/2012/img_0186.jpg)

*Another surface scan, a little further along. The bad-cluster markers make the condition of the disk rather more obvious.*
{: .media-caption }

The drives had 3, 8 and 12 bad sectors between them. Not too bad for 20-year-old drives! All three made very similar sounds during startup, which was reassuring, but I wanted to give them proper surface scans rather than judge them by ear.

SpeedStor 6.5 was the best program I could track down to scan the drives for defects and partition / format them properly. I would have liked to have tried an earlier version of SpinRite, but I could not track down a copy.

![MS-DOS C: directory listing with volume label MS-DOS_6 and 24,750,080 bytes free.](/assets/images/2012/img_0183.jpg)

*One of the three freshly prepared DOS drives, reporting 24,750,080 bytes free.*
{: .media-caption }

![MS-DOS C: directory listing showing the MS-DOS_6 volume and 24,842,240 bytes free.](/assets/images/2012/img_0182.jpg)

*Another DOS directory listing, this time with 24,842,240 bytes free. The three drives don't all report quite the same amount.*
{: .media-caption }

![MS-DOS CHKDSK results showing a roughly 30 MB disk, 147,456 bytes in bad sectors and 24,750,080 bytes available.](/assets/images/2012/img_0184.jpg)

*CHKDSK puts a number on those bad sectors: 147,456 bytes. At least the drive is still usable.*
{: .media-caption }

The drives also report different amounts of free space. Bad sectors will account for some of that, although files and formatting could also explain why the readings differ. In any case, all three are working, which is the important part!

![Monitor showing the Microsoft Windows Version 3.1 startup logo on a black background.](/assets/images/2012/img_0191.jpg)

*With DOS installed, it was time for Windows. That familiar 3.1 splash screen never gets old.*
{: .media-caption }

![Windows 3.1 Program Manager open to the Main group, showing File Manager, Control Panel, Print Manager and other icons.](/assets/images/2012/img_0192.jpg)

*Windows Program Manager is up, and the usual utilities are all there. The TeraDrive is feeling much more like a PC.*
{: .media-caption }

![Windows Program Manager About dialog showing version 3.11, licensed to TeraDrive Model 3, with 1,609 KB memory free.](/assets/images/2012/img_0195.jpg)

*Windows 3.11, licensed to TeraDrive Model 3. Nice to see the machine's name right there in the About box!*
{: .media-caption }

I've installed MS-DOS 6.22 on all three and Windows 3.11 on the drive that is staying inside the TeraDrive. I'll need to add some games and other cool programs later on. Scorched Earth is definitely on that list.

![Windows Solitaire game window with a green playing field, seven columns of cards and a blue-backed draw pile.](/assets/images/2012/img_0193.jpg)

*Naturally, Solitaire had to be tested. It ran very nicely, just as it did on my Model 2 RAMdisk setup.*
{: .media-caption }

![Windows 3.1 File Manager showing the C: drive's DOS and WINDOWS folders, with C:\\WINDOWS files listed.](/assets/images/2012/img_0194.jpg)

*A look around C: in File Manager, with Windows happily installed on the old IBM disk.*
{: .media-caption }

![Wide view of the open Sega TeraDrive on a desk, connected to a keyboard, mouse and monitor displaying the Windows 3.11 About dialog.](/assets/images/2012/img_0196.jpg)

*The whole TeraDrive setup running Windows 3.11, with the lid off and plenty of bench clutter. Just how I like it.*
{: .media-caption }

Solitaire runs amazingly well and is on par with the RAMdisk version of Windows 3.11 I had knocked together for the TeraDrive Model 2.

![Close-up of the label on an IBM Japan hard drive identifying model WDI-325Q.](/assets/images/2012/img_0187.jpg)

*The troublesome WDI-325Q. Unlike the three WDL-330Ps, this one was not keen to cooperate.*
{: .media-caption }

![IBM hard drive with its cover removed, exposing a copper-coloured platter, spindle hub and actuator arm.](/assets/images/2012/img_0189.jpg)

*I had a quick peek inside the WDI-325Q after its rather alarming behaviour. The platter didn't look especially reassuring.*
{: .media-caption }

![Close-up of an exposed hard-drive platter and its central spindle, with faint concentric marks on the surface.](/assets/images/2012/img_0190.jpg)

*A closer look at the platter surface. I'm still not sure whether those marks are unusual for a drive this old.*
{: .media-caption }

![Overhead view of an opened IBM hard drive showing the circular platter and actuator arm crossing its lower edge.](/assets/images/2012/img_0188.jpg)

*Another angle inside the WDI-325Q, showing the platter and head assembly. Interesting to see, even if the drive was a dud.*
{: .media-caption }

However, it was not all good and well. The WDI-325Q I picked up does not work properly and reports some pretty epic failures. It also sounds like a freight train when it spins up and down. Had a quick peek inside the drive and the platters do not look in the best of shape. Or perhaps this is normal for an older drive.

![Five grey ribbon cables with blue or grey connectors arranged across an IBM keyboard on a workbench.](/assets/images/2012/img_0198.jpg)

*Here are the replacement ribbon cables I picked up. The longer ones give me a bit more room to work inside the TeraDrive.*
{: .media-caption }

![Close-up of the TeraDrive circuit board with four IBM-labelled chips beside empty memory sockets, a clock module and a coin-cell battery.](/assets/images/2012/img_0197.jpg)

*A close look at the onboard memory area. I did briefly wonder about desoldering and upgrading things, but preservation won.*
{: .media-caption }

![Two green 30-pin memory modules, each carrying eight black chips marked AAA1M200J-10H, laid flat on a wooden desk.](/assets/images/2012/img_0199.jpg)

*Two memory modules out on the desk. I decided not to chase a risky upgrade when the Model 3 already had its supported 2.5 MB.*
{: .media-caption }

The 44-pin cables I picked up tested OK, which was great news. They're slightly longer than the original TeraDrive hard-drive cable as well, so there's a little more slack!

I also wondered whether the 512 KB of onboard RAM could be upgraded with some desoldering and resoldering. Sega's specifications put the Model 3's supported main memory at a maximum of 2.5 MB, though, which is what I've already got. Preservation is key for hardware like this.

![Sega TeraDrive Model 3 with its top cover fitted, connected to an IBM keyboard and mouse, with floppy disks beside it.](/assets/images/2012/img_0202.jpg)

*Back together on the desk, the TeraDrive is looking a lot more complete. Those rescued IBM drives really came in handy.*
{: .media-caption }

![Open Sega TeraDrive Model 3 showing an IBM hard drive installed beside its floppy drive and power supply.](/assets/images/2012/img_0200.jpg)

*The 30 MB IBM hard drive sitting in the TeraDrive's open chassis, alongside the floppy drive.*
{: .media-caption }

![Partially reassembled Sega TeraDrive with its front panel and metal top frame attached, exposing the drive and internal ribbon cable.](/assets/images/2012/img_0201.jpg)

*Getting the TeraDrive back together, with the front panel in place and the new hard drive tucked inside.*
{: .media-caption }

So overall, a great success, and we have some poor IBM PS/2s to thank for the hard drives and cables. Not really a surprise, since Sega and IBM Japan developed the TeraDrive together. Very convenient in this particular case!

There's even more photos in the [photo gallery](/goodies/) under the album Sega TeraDrive Model 3 100006271.

### Sources

- [Sega Hardware Archive: TeraDrive (Model 3, 2.5 MB; IBM Japan)](https://www.sega.jp/fb/segahard/md/tera.html)
