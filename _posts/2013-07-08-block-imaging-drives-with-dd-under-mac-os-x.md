---
title: "Block Imaging Drives with dd under Mac OS X"
author: "Nix McRetro"
date: 2013-07-08T11:23:30.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [apple, guides, raspberry-pi]
---

I've found `dd` extremely useful when dealing with older or otherwise inconvenient disk formats.

This was particularly handy for Mac OS Standard / HFS media because OS X 10.6 Snow Leopard treated HFS as read-only.

I was also using the same technique for things such as Raspberry Pi boot media containing Linux filesystems that OS X did not natively understand.

Because `dd` works at the block-device level, it does not need the Mac to understand the filesystem before making an image.

There is one extremely important catch:

**if you give `dd` the wrong output device, it will happily overwrite the wrong disk.**

Always identify the device again with `diskutil list`, unmount it and verify the disk number before pressing Return.

Do not copy the example disk number literally.

**Copy a device to an image file**

```
diskutil list
diskutil unmountDisk /dev/diskN
sudo dd if=/dev/rdiskN of=~/test.img bs=1m
diskutil eject /dev/diskN
```

**Restore an image to a device**

```
diskutil list
diskutil unmountDisk /dev/diskN
sudo dd if=~/test.img of=/dev/rdiskN bs=1m
diskutil eject /dev/diskN
```

Replace `N` with the actual disk number you verified using `diskutil list`.

On the Mac, using the raw-device form such as `/dev/rdisk3` can also be considerably faster than accessing `/dev/disk3`.

I tried Paragon ExtFS around this period as well and had bad experiences with corrupted media, so I stopped using it. That was my experience with my setup, not a general finding about every version of the software.

By 2015 I had also started using [ApplePi-Baker](https://www.tweaking4all.com/hardware/raspberry-pi/macosx-apple-pi-baker/) for Raspberry Pi images because it wrapped this sort of workflow in a considerably friendlier interface.

The command-line method remains useful.

Just check the disk number.

Then check it again.

### Sources

- [Apple - File System Programming Guide: File System Details](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemDetails/FileSystemDetails.html) - documents Mac OS Standard / HFS support limitations in later OS X releases.
- [Ask Different - Copying an image file to a USB drive in OS X](https://apple.stackexchange.com/questions/73183/copying-iso-file-to-usb-drive-in-os-x) - community reference for raw-device imaging with `rdisk`.
