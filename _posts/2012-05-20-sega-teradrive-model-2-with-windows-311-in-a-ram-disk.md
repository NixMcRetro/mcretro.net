---
title: "Sega TeraDrive Model 2 with Windows 3.11 in a RAM Disk"
author: "Nix McRetro"
date: 2012-05-20T11:19:53.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
---


{% include youtube.html id="znfMv-9t50Y" %}

Does this Sega TeraDrive work never end? Will I never be content? I've been trying to get Windows 3.11 running on the Model 2, which is rather ambitious considering the machine has just 2.5 MB of RAM and no hard drive. Still, I've managed to squeeze it down onto a bootable floppy, with a second disk for the applications.

![](/assets/images/2012/img_0109.jpg)

Before getting to Windows, I've also been experimenting with some cheap ISA IDE controllers from eBay. So far they haven't been particularly cooperative with the TeraDrive, although one managed to access the floppy controller well enough to light up the drive. Unfortunately it couldn't actually read anything.

![](/assets/images/2012/img_0110.jpg)

![](/assets/images/2012/img_0111.jpg)

I've ordered a Promise controller from the UK with its own BIOS, hoping that might provide a way around the storage problems. I also found a BIOS configuration disk, which at least gives me access to more of the TeraDrive's setup options. We'll see whether any of this eventually leads to a proper hard drive.

![](/assets/images/2012/img_0112.jpg)

![](/assets/images/2012/img_0113.jpg)

![](/assets/images/2012/img_0114.jpg)

#### Back to Windows

Rather than spend the entire weekend fighting storage controllers, I returned to my earlier experiment with Windows 3.00a running from a RAM Disk. This time I wanted Windows 3.11. Importantly, I'm talking about standalone Windows 3.11, not Windows for Workgroups 3.11, which requires a 386SX or better.

![](/assets/images/2012/img_0115.jpg)

Windows for Workgroups 3.1 can run on a 286, but I don't particularly care about Workgroups networking here. I'm just interested in seeing how far this old Sega and IBM machine can be pushed. A stripped-down copy of standalone Windows 3.11 seemed like a much better candidate.

![](/assets/images/2012/img_0116.jpg)

![](/assets/images/2012/img_0117.jpg)

The boot disk works much like my Windows 3.00a version. It creates a RAM Disk and uses PKUNZIP Junior to extract roughly 700 KB of compressed Windows files into about 1.4 to 1.5 MB of memory. That takes a fair while on a 286, and there's not much room left for anything else.

![](/assets/images/2012/img_0120.jpg)

Windows 3.11 also wanted more memory than 3.00a. I initially tried giving it almost everything for the RAM Disk, but eventually discovered that leaving another 64 KB of extended memory available was enough to get it started. A fair bit of trial and error went into that little discovery.

![](/assets/images/2012/img_0118.jpg)

And there it is, Windows 3.11 running on the Sega TeraDrive Model 2! The Program Manager looks familiar enough, although the whole thing is blisteringly slow. I was seeing around 295 KB of free memory, compared with roughly 400 KB in my earlier Windows 3.00a experiment.

![](/assets/images/2012/img_0121.jpg)

I included File Manager and Control Panel on the boot disk, but there wasn't enough space for many useful applications. Those live on the second floppy, which means Windows has to keep going back to the drive whenever it needs something. Saving changes to the Windows configuration wasn't something I'd implemented either.

![](/assets/images/2012/img_0122.jpg)

Of course, I had to try Solitaire. If you're a professional Solitaire player, I would not recommend this particular machine. Everything seems to involve another trip to the floppy drive, and even moving cards around is painfully slow. Windows 3.00a was considerably better suited to that sort of thing.

![](/assets/images/2012/img_0119.jpg)

Still, it boots and runs, which was the whole point of the experiment. With 612 KB of conventional memory reported and only 64 KB of extended memory left free, there isn't a great deal more I can squeeze out of this configuration. Anyone with another 286 and a bit more RAM might have better luck.

The storage problem eventually had a much better solution. Later that year I got an XTIDE card working in the TeraDrive Model 2 and finally booted the machine from proper storage. You can find all the files in the [file server](/goodies/) and photos in the [photo gallery](/goodies/).

**Related Posts**

- [Sega TeraDrive with Windows 2.1, Windows 3.00a and Game Boy](/sega-teradrive-with-windows-21-windows-300a-and-game-boy/)
- [Sega TeraDrive Model 2 XTIDE Boot Success](/sega-teradrive-model-2-xtide-boot-success/)

**Sources**

- [Microsoft Knowledge Base Archive - Minimum System Requirements for Windows for Workgroups](https://jeffpar.github.io/kbarchive/kb/089/Q89333/) - documents 80286 support for Windows for Workgroups 3.1.
- [Microsoft Knowledge Base Archive - Windows Problems on AST Premium/286](https://jeffpar.github.io/kbarchive/kb/081/Q81855/) - documents standalone Windows 3.11 operation on 286-class systems in Standard Mode.
