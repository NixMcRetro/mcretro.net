---
title: "Sega TeraDrive Model 2 with Windows 3.11 in a RAM Disk"
author: "Nix McRetro"
date: 2012-05-20T11:19:53.000+10:00
last_modified_at: 2026-10-02
ai_assistance:
  model: "GPT-6 Astra Max"
  date: 2026-10-02
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [repairs, sega, youtube]
---

{% include youtube.html id="znfMv-9t50Y" %}

Does this TeraDrive work never end? Will I never be content?

I picked up some cheap ISA IDE controllers from eBay, but so far I have had no luck getting them to work properly with the TeraDrive. I was reading that a controller with its own BIOS might be the better approach, so that is the next hardware experiment.

![](/assets/images/2012/img_0109.jpg)

![](/assets/images/2012/img_0110.jpg)

![](/assets/images/2012/img_0111.jpg)

I did get one of the cards to interact with the floppy drive somewhat. The activity light came on, but it would not actually read the inserted disks.

I also found a BIOS configuration disk, which at least gives me access to more of the machine's setup options.

![](/assets/images/2012/img_0112.jpg)

![](/assets/images/2012/img_0113.jpg)

![](/assets/images/2012/img_0114.jpg)

#### Back to Windows

Instead of fighting the storage hardware all night, I went back to trying to fit a newer version of Windows onto bootable floppies.

Windows for Workgroups 3.1 will run on a 286, unlike Windows for Workgroups 3.11, which requires at least a 386SX.

But I don't particularly care about Workgroups networking here.

Enter standalone Windows 3.11.

Standalone Windows 3.11 can still run in Standard Mode on a 286, which makes it much more interesting for the TeraDrive.

![](/assets/images/2012/img_0115.jpg)

![](/assets/images/2012/img_0116.jpg)

![](/assets/images/2012/img_0117.jpg)

I used essentially the same trick as with my Windows 3.00a experiment, but quickly discovered that Windows 3.11 wanted more memory. I had to shrink the RAM Disk until the machine reported another 64 KB of extended memory available to Windows. In this stripped-down configuration it booted!

Hurrah!

It is painfully slow though, and I couldn't fit any useful programs into the RAM Disk itself. Those had to live on a second floppy.

![](/assets/images/2012/img_0120.jpg)

![](/assets/images/2012/img_0118.jpg)

![](/assets/images/2012/img_0121.jpg)

![](/assets/images/2012/img_0122.jpg)

![](/assets/images/2012/img_0119.jpg)

The storage problem eventually had a much better solution. Later that year I got an XTIDE card working in the TeraDrive Model 2 and finally booted the machine from proper storage.

You can find all the files in the [file server](/goodies/) and photos in the [photo gallery](/goodies/).

### Related posts

- [Sega TeraDrive with Windows 2.1, Windows 3.00a and Game Boy](/sega-teradrive-with-windows-21-windows-300a-and-game-boy/)
- [Sega TeraDrive Model 2 XTIDE Boot Success](/sega-teradrive-model-2-xtide-boot-success/)

### Sources

- [Microsoft Knowledge Base Archive - Minimum System Requirements for Windows for Workgroups](https://jeffpar.github.io/kbarchive/kb/089/Q89333/) - documents 80286 support for Windows for Workgroups 3.1.
- [Microsoft Knowledge Base Archive - Windows Problems on AST Premium/286](https://jeffpar.github.io/kbarchive/kb/081/Q81855/) - documents standalone Windows 3.11 operation on 286-class systems in Standard Mode.
