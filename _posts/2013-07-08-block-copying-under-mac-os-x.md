---
title: "Block Copying Under Mac OS X"
author: "Nix McRetro"
date: 2013-07-08T11:23:30.000+10:00
categories: [apple, guides, raspberry-pi]
---

I've found that using dd is quite useful for older software. This has been especially important for copying Mac OS Standard disks since 10.6+ do not support read/write. One thing to note is that using "rdisk" instead of "disk" allows the copy to complete much quicker. Recently I've used this method for imaging things such as the Raspberry Pi boot disk (ext4 - very unMac OS friendly). While I tried Paragon ExtFS, it seemed to corrupt disks fairly quickly.

**Copy original USB device to disk image**

```
Open Terminal
diskutil list (my USB drive was disk3)
sudo -s
Enter password
dd if=/dev/rdisk3 bs=1m of=/test.img
Wait a long time, check Activity Monitor for disk activity.

```

**Copy disk Image to new drive**

```
Open Terminal
diskutil list (my USB drive was disk3)
sudo -s
Enter password
dd if=/test.img of=/dev/rdisk3 bs=1m
Wait a long time, check Activity Monitor for disk activity.

```

**Oct 2015 Edit:** Since 10.11.x has been released, I've found that a great little program called [ApplePi-Baker](https://www.tweaking4all.com/hardware/raspberry-pi/macosx-apple-pi-baker/), currently version 1.81 as of this edit. Whether the above commands still hold up under OS X 10.11 El Capitan I am unsure, however, they did work well in 10.6 Snow Leopard.
