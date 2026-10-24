---
title: "Sega Dreamcast Dev Kit Software Overview"
author: "Nix McRetro"
date: 2019-01-19T02:52:56.000+11:00
categories: [devkit, repairs, sega]
last_modified_at: 2026-10-18
---

{% include youtube.html id="iMvG31AtV0U" %}

Time to have another play with the Sega Dreamcast HKT-0120 development kit, and this time we're looking at some of the software used to control it. I've also got the HKT-0400 GD writer connected, so there's plenty of expensive-looking Sega hardware making noises around the room. What more could you want?

The first job was getting the development kit's storage into a rather more convenient state. It originally had a fairly clunky Seagate SCSI hard drive, which I'd imaged before trying a replacement arrangement using an SD card. The adapter is mounted in a 3D-printed bracket, and getting everything fitted properly proved more troublesome than I expected.

I'd also recovered a copy of World Series Baseball 2K2 from the original drive, which gave me something useful to test with. It's not exactly the most exciting game in the world, but when you're investigating a Dreamcast development kit, any compatible software is good news. Unfortunately, the recovered copy wasn't behaving quite as well as I'd hoped.

First up we have DA-Check v2.32, which lets me communicate with the hardware and switch between its operating modes. The OS mode presents the familiar Dreamcast development environment, while the CPU mode is rather less exciting to look at. There are also diagnostic functions that help check whether various parts of the hardware are responding.

I had a few problems with some of the tests until I went back and checked how the storage was configured. That was a useful reminder that the development kit can be perfectly capable of doing something while the computer controlling it is the part making all the trouble. It's never just one cable or one setting with these things!

Next we have GDWorkshop 2.9.0K, alongside the development hardware's 2.9.1b firmware. The program gives us a look at the structure of a GD-ROM image, including its high-density and low-density areas, individual tracks and the files that make up the disc. It's rather interesting seeing how Sega's development tools present information that an ordinary Dreamcast owner never normally encounters.

There are controls for opening and closing the drive, transferring data and managing the writing process. You can inspect the disc layout and watch the various status messages as the software communicates with the hardware. Of course, the HKT-0400 isn't something you would have wanted to accidentally knock off the desk while a disc operation was underway!

I tried running World Series Baseball 2K2 from the development setup, but the recovered version didn't get all the way through its startup sequence. It reached the introduction before becoming stuck. That could have been something I'd configured incorrectly, or perhaps the original failing hard drive had already given me a damaged copy.

Running the game from its original GD-ROM gave me a useful comparison. The behaviour wasn't quite the same, and it was good to confirm that the drive hardware could at least read an actual game disc. That doesn't settle every question about the SD-based replacement, but it narrows things down a little.

The diagnostics themselves are interesting too, particularly the video tests with their elaborate patterns and moving shapes. Not every test can be completed without the appropriate external accessories or loopback connections, so an isolated failure isn't always evidence of faulty development hardware.

There's still a fair amount to learn about this equipment, and I'm certainly not pretending to have mastered the entire Katana development environment. But we've got DA-Check talking to the HKT-0120, GDWorkshop communicating with the writer and enough working hardware to continue investigating the troublesome recovered game. That's an excellent start!

**Sources**

- [SEGA - Getting Started with Dreamcast (Katana SDK R10.1 mirror)](https://github.com/Kochise/dreamcast-docs/blob/master/SDK/EXES/INSTALL%20KATANA%20SDK/INPUT/R10.1_000518/GetStart.txt)
