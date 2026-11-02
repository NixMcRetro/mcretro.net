---
title: "Block Imaging Drives with dd under Mac OS X"
author: "Nix McRetro"
date: 2013-07-08T11:23:30.000+10:00
last_modified_at: 2026-10-18
categories: [apple, guides, raspberry-pi]
---

I've found dd extremely useful when dealing with old disks and filesystems that Mac OS X doesn't necessarily understand. Sometimes all I want is a complete image of a drive, without worrying about whether the Mac can read the files sitting on it.

Mac OS X 10.6 Snow Leopard was particularly awkward with Mac OS Standard / HFS media, since it treated that filesystem as read-only. I've also used dd to make images of Raspberry Pi storage containing Linux filesystems that OS X couldn't natively access. That's the nice thing about working with the disk at block level: I don't need to mount the filesystem to copy the whole thing.

Using the raw-device form, rdisk rather than disk, made a considerable difference to the speed in my tests. I also tried Paragon ExtFS around this period, but it seemed to corrupt disks rather quickly in my setup. I can't speak for every version of the software, but that was enough to send me looking for another approach!

Below are my original working notes. They're a mixture of instructions and commands, not something to paste straight into Terminal without reading. My example drive was disk3, but yours probably won't be. Check the device with diskutil list, make sure the relevant volumes are unmounted, and double-check which path is the input and which is the output. Getting those backwards can overwrite a perfectly good disk. That would rather defeat the purpose!

**Copy original USB device to disk image**

```text
Open Terminal
diskutil list (my USB drive was disk3)
sudo -s
Enter password
dd if=/dev/rdisk3 bs=1m of=/test.img
Wait a long time, check Activity Monitor for disk activity.

```

**Copy disk image to new drive**

```text
Open Terminal
diskutil list (my USB drive was disk3)
sudo -s
Enter password
dd if=/test.img of=/dev/rdisk3 bs=1m
Wait a long time, check Activity Monitor for disk activity.

```

**Update Oct 2015:** Since OS X 10.11 El Capitan was released, I found a great little program called [ApplePi-Baker](https://www.tweaking4all.com/hardware/raspberry-pi/macosx-apple-pi-baker/), then at version 1.81. I was unsure whether the commands above still held up under El Capitan, but they had worked well for me in 10.6 Snow Leopard.

### Sources

- [Apple - File System Programming Guide: File System Details](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemDetails/FileSystemDetails.html) - documents Mac OS Standard / HFS support limitations in later OS X releases.
- [Apple Open Source - dd manual](https://github.com/apple-oss-distributions/file_cmds/blob/main/dd/dd.1) - documents the input, output and block-size operands.
