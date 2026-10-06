---
title: "Block Imaging Drives with dd under Mac OS X"
author: "Nix McRetro"
date: 2013-07-08T11:23:30.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [apple, guides, raspberry-pi]
---

I've found `dd` extremely useful when dealing with older or otherwise inconvenient disk formats. This was particularly handy for Mac OS Standard / HFS media because OS X 10.6 Snow Leopard treated HFS as read-only. I also used it for Raspberry Pi media containing Linux filesystems that OS X did not natively understand: block imaging does not require the Mac to understand the filesystem. Using the raw-device form, `rdisk` rather than `disk`, made the copy much quicker in my tests.

I tried Paragon ExtFS around this period, but in my setup it seemed to corrupt disks fairly quickly. That was my experience, not a general finding about every version of the software.

The blocks below preserve my original working notes, including the example `disk3`, root shell and `/test.img` path. They mix commands with instructions and are not paste-ready. **The wrong `dd` output device will overwrite the wrong disk.** Identify the actual device with `diskutil list`, unmount its volumes before imaging or restoring, and verify the input and output paths. Do not copy `disk3` literally.

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

In October 2015, after OS X 10.11 El Capitan was released, I found a great little program called [ApplePi-Baker](https://www.tweaking4all.com/hardware/raspberry-pi/macosx-apple-pi-baker/), then at version 1.81. I was unsure whether the commands above still held up under El Capitan, but they had worked well for me in 10.6 Snow Leopard.

### Sources

- [Apple - File System Programming Guide: File System Details](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemDetails/FileSystemDetails.html) - documents Mac OS Standard / HFS support limitations in later OS X releases.
- [Apple Open Source - dd manual](https://github.com/apple-oss-distributions/file_cmds/blob/main/dd/dd.1) - documents the input, output and block-size operands.
