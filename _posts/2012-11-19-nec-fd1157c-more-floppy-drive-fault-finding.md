---
title: "NEC FD1157C: More Floppy Drive Fault Finding"
author: "Nix McRetro"
date: 2012-11-19
last_modified_at: 2026-10-20
categories: [ibm-pc, reconstructed, youtube]
share_description: >-
  An NEC FD1157C floppy drive sometimes reads disks when pressure is applied to its head, then returns to errors. A clue, perhaps, but certainly not a repair. 💾
---


{% include youtube.html id="gOmd-R_ICe8" %}

Never give up on your dreams, they said! Well, here I am again with the troublesome NEC FD1157C 1.2 MB floppy drive. Cleaning it hasn't exactly produced a miraculous recovery, and the computer is still throwing all sorts of errors whenever I try to read a disk. Not ready, sector not found, general failure. Take your pick!

I did discover something interesting, though. If I apply a little pressure to the drive head while trying to access a floppy, the machine sometimes manages to read it. Take the pressure away and we're straight back to errors, with the motor spinning away while the heads apparently fail to make proper contact with the disk. It's hardly a practical way to use a floppy drive, but at least it's given me something to investigate.

In fact, I managed to get far enough to copy *Paku Paku* onto a disk and try reading it back. Getting the pressure just right is the difficult part, especially when everything is moving around inside the drive. Sometimes it works beautifully for a moment, and then the next attempt is another general failure. Wonderful!

One viewer later suggested that pressing on the head might be slowing the disk slightly, which could explain why it becomes readable. That's certainly an interesting theory, although I haven't measured the motor speed or confirmed it. It might just as easily be a problem with head contact, alignment or something else in the mechanism.

I was even considering whether the heads could be brought a little closer together without damaging them. Given how much trouble this drive has already caused, I've pretty much written it off for the moment, but at least the experiment has shown me where to look next.

So we're not quite at the point of calling this a repair. We've got a floppy drive that occasionally reads disks when I press on the head, which is ridiculous but rather interesting all the same. These old drives certainly know how to keep me entertained!

### Related Posts

- [Miscellaneous ISA and PCI Cards](/miscellaneous-isa-and-pci-cards/)
- [Osborne 486 5.25-inch Floppy Drive Addition](/osborne-486-525-inch-floppy-drive-addition/)
- [Wyse 2112-40 286 Revival Project](/wyse-2112-40-286-revival-project/)
