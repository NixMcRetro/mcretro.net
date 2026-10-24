---
title: "NUC8i7BEH Hackintosh Catalina Overview"
author: "Nix McRetro"
date: 2020-05-10T18:32:43.000+10:00
categories: [apple, ibm-pc, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="oE0TKa81qf0" %}

A bit of fiddling and we finally get Bluetooth working on the NUC8i7BEH, running Apple's latest and greatest at the time: macOS Catalina 10.15.4. Most other things were working well at this stage and I hadn't run into any ongoing stability problems, although there had been an earlier GPU-related kernel panic.

This little Intel NUC has become something of a project in itself. I've fitted 32 GB of RAM, which is probably a rather ridiculous amount for what I actually use it for, and installed the whole arrangement into a lovely fanless enclosure. The machine sits not far from my head, so not having a fan whining away all day is a definite advantage.

Getting the wireless hardware sorted out took rather more effort than I'd hoped. I'm using an Apple-compatible Wi-Fi and Bluetooth card through a PCI Express adaptor, with external antennas because of the enclosure. The Bluetooth data connections needed to be wired separately to an internal USB header before that side of things would behave itself.

I wanted Bluetooth working properly, partly for the sake of having a complete Hackintosh and partly because I thought it might be nice to use some of Apple's Continuity features. Do I desperately need them? Probably not. But I've come this far, and leaving something half-working would be rather annoying.

The machine had been running for a week or two by the time I recorded the overview. I'd encountered a GPU-related kernel panic earlier, although I suspected that might have been connected with the way the display was configured. Apart from that episode, the setup had been remarkably pleasant to use.

Originally I started off with Windows 10, but found it a bit flaky for what I needed this machine to do: stream video to McRetro Gaming. In particular, my 4K television and Windows high-DPI handling weren't getting along. I'd come back to find all the icons had changed size, which was becoming rather tiresome.

I wanted capture hardware using UVC (USB Video Class), so I could move the setup between operating systems more easily. My old StarTech capture device was tied to Windows with its driver, alas. I've since moved on to an Inogeni HDMI capture device with loop-through and it has been amazing!

There'll be more on the Inogeni later as I am very impressed by how well it works. Just check out the McRetro Gaming live streams and you'll probably have to agree with me!

The NUC isn't exclusively a gaming-stream machine either. I've also been using it for ordinary video playback and distributed computing projects such as Folding@home and Rosetta. It's a surprisingly capable little box for something that sits quietly in the corner. A glorified Raspberry Pi, only considerably more expensive!

I'm rather pleased with how Catalina is running on this hardware. Of course, there's always the next macOS release to look forward to, which will probably break everything and send me back to the beginning. That's half the fun of a Hackintosh, isn't it?

**Sources**

- [sarkrui - Building a Mac mini beast with NUC8i7BEH (Mojave guide)](https://github.com/sarkrui/NUC8i7BEH-Hackintosh-Build/blob/master/README.md)
- [Intel - NUC8i7BEH Technical Product Specification](https://www.intel.com/content/dam/support/us/en/documents/mini-pcs/nuc-kits/NUC8i3BE_NUC8i5BE_NUC8i7BE_TechProdSpec.pdf)
