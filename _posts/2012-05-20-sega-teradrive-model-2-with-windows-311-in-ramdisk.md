---
title: "Sega TeraDrive Model 2 with Windows 3.11 in RAMdisk"
author: "Nix McRetro"
date: 2012-05-20T11:19:53.000+10:00
categories: [repairs, sega, youtube]
---

{% include youtube.html id="znfMv-9t50Y" %}

Does this TeraDrive work never end? Will I never be content? Picked up some cheap ISA IDE controllers from eBay. No luck though, they do not want to work with my lowly 286 properly. I'll try some with BIOS onboard, from what I've been reading they are the way to go.

![](/assets/images/2012/img_0109.jpg)

![](/assets/images/2012/img_0110.jpg)

![](/assets/images/2012/img_0111.jpg)

I was able to get the controller card to recognise the floppy drive somewhat, the green light would access but not read any disks inserted. Also got a BIOS configuration disk so I can change some of the settings.

![](/assets/images/2012/img_0112.jpg)

![](/assets/images/2012/img_0113.jpg)

![](/assets/images/2012/img_0114.jpg)

So instead of messing with hardware, I went back to getting a newer version of Windows on a bootable floppy. Did a quick test using Windows for Workgroups 3.1 as it can work on a 286, unlike Windows for Workgroups 3.11. It seemed to work - but alas I do not care for networking. Enter Windows 3.11. None of this Workgroups junk.

![](/assets/images/2012/img_0115.jpg)

![](/assets/images/2012/img_0116.jpg)

![](/assets/images/2012/img_0117.jpg)

I managed to get it to work using the old method I used in Windows 3.00a, however I found quickly that Windows 3.11 was a little more RAM hungry than 3.00a. I had to shrink the RAMdisk down a little to provide it with 64KB of extended memory. It booted! Hurrah! It sure is slow though and I wasn't able to get any programs on the RAMdisk. They all had to be on disk 2.

![](/assets/images/2012/img_0120.jpg)

![](/assets/images/2012/img_0118.jpg)

![](/assets/images/2012/img_0121.jpg)

![](/assets/images/2012/img_0122.jpg)

![](/assets/images/2012/img_0119.jpg)

You can find all the files in the [file server](/goodies/) and photos in the [photo gallery](/goodies/).
