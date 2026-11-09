---
title: "Mitsumi Newtronics 5.25-inch Floppy Drive Failure"
author: "Nix McRetro"
date: 2012-11-18
last_modified_at: 2026-10-20
categories: [ibm-pc, reconstructed, youtube]
---


{% include youtube.html id="t1swG5Owro0" %}

Another 5.25-inch floppy drive, another adventure! This time I've got a Mitsumi Newtronics D509V3 1.2 MB drive that I picked up for a couple of dollars on eBay. It has a rather nice green activity LED on the front, but unfortunately it hasn't been doing much in the way of reading disks. I've cleaned the heads and given the drive a general tidy-up without much success.

Then I discovered something interesting about the edge connector. The cable wasn't making proper contact with all the pins, and apparently that was enough to make the drive behave as though it was completely dead. Once I corrected the connection, would you believe it? I could actually access the disk!

Just to be sure, I decided to format a floppy and see how far we could get. The format completed, so I transferred `COMMAND.COM` and the other system files across. Everything seemed to be working beautifully, and for a brief moment I thought I'd managed to rescue another troublesome drive with nothing more complicated than fixing a connection.

Of course, it wouldn't be one of my floppy-drive adventures without a final surprise. Right at the end of the recording, the machine starts reporting errors again, including a bad track zero and an unusable disk. The motor doesn't look particularly happy either, which makes me wonder whether there's another mechanical problem hiding in there.

So the drive managed to format a disk and copy files, but that obviously wasn't the end of its troubles. I've had enough odd experiences with these old 5.25-inch drives to know that a brief moment of success doesn't necessarily mean they're going to keep working.

Oh well. At least we got to see it cooperate for a little while! Floppy drives. What do you do with them?

### Related Posts

- [Miscellaneous ISA and PCI Cards](/miscellaneous-isa-and-pci-cards/)
- [Osborne 486 5.25-inch Floppy Drive Addition](/osborne-486-525-inch-floppy-drive-addition/)
- [Wyse 2112-40 286 Revival Project](/wyse-2112-40-286-revival-project/)
