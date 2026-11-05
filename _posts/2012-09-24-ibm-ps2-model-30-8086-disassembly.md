---
title: "IBM PS/2 Model 30 8086 Disassembly"
author: "Nix McRetro"
date: 2012-09-24T22:44:16.000+10:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs]
---

{% include youtube.html id="S3ygCSMiZog" %}

Forgot I uploaded this giant video... This IBM PS/2 Model 30 sure was a fun beast to disassemble and reassemble. Despite wearing the PS/2 badge, this original 8086-based Model 30 is a little unusual within the family because it uses an 8-bit ISA expansion bus rather than Micro Channel.

The video above is the complete disassembly and reassembly, so if you have an hour to spare you can watch the whole thing. Be sure to watch all sixty minutes! Ahhh... optional viewing, I guess. The photographs below show some of the more interesting parts of the machine without requiring quite that level of commitment.

![](/assets/images/2012/img_0272.jpg)

![](/assets/images/2012/img_0276.jpg)

![](/assets/images/2012/img_0275.jpg)

![](/assets/images/2012/img_0277.jpg)

![](/assets/images/2012/img_0274.jpg)

![](/assets/images/2012/img_0273.jpg)

First up, getting the lid off. I don't have a camera stand, which makes filming this while pulling a computer to bits rather interesting. At least the top slides backwards and lifts off without too much of a fight, provided I can find a spare hand. There we go, internals! Now, what shall I pull out first?

The hard drive seems like a good start. It's around 20 MB or 21 MB and absolutely enormous for a 3.5-inch drive. I even dig out a more ordinary-sized one to compare it against. After carefully releasing the front clips and removing a plastic retaining pin, it slides straight out. Nearly into my face, mind you, but we're all good!

The drive uses a 44-pin card-edge connector, with power carried through the same cable rather than a separate Molex plug. Unfortunately the hard drive itself is broken, and finding a replacement with that arrangement isn't going to be terribly easy. I'm going to have to work something out there.

The 720 KB floppy drive is another monster, with 10 April 1987 printed on it. My camera refuses to focus on the date, naturally. There's also a little piece of foam that fell out of the head assembly when I first took it apart. I reckon the glue has let go, but I've got rather more pressing things to deal with before I start gluing bits back in.

Then there are the expansion cards. The Creative Sound Blaster CT1350B is an 8-bit card I've added, and several of its capacitors were dented when I received it, almost as though somebody had stepped on the thing. I've ordered replacements from Farnell and soldered them in, and the card works! You can certainly tell where I've been soldering, but I'm pretty pleased with that result.

There's also an Irwin tape-controller card with two fuses, a collection of jumpers and a couple of interesting connectors. The floppy cable has an extra branch leading to the card, and I reckon the arrangement might carry power through to an external tape drive. At least that would explain why the tape units I've been looking at have such odd connectors. There we go, we've worked something out!

With the ISA riser out, I get a closer look at the Panasonic lithium backup battery. Hmm, I wonder whether it's still got any voltage left after all these years? Out comes the meter and... no way! It's still showing 3 V. I should probably remove or replace it anyway, but that's a surprise!

Getting the power supply and motherboard out is considerably less elegant. There's a large mechanical power switch, enough dust and dead bugs to start a collection, and far too many flat-blade screws. Why on earth did anyone think those were a good idea? They slip, you lose the screw, you lose a limb, you lose everything. I even find another screw just when I think I've got them all!

Eventually the rear bracket comes off and the motherboard slides forward and out. It's an enormous, rather tidy-looking board, IBM part number 61X8827, with a few things I'm still trying to identify. There's an unused 34-pin connector and some chips I really ought to investigate further. If anyone knows what they're for, leave a comment!

I even declare part of the front panel impossible to separate, say goodbye, and then discover that I can't leave it alone. A little pressure on those plastic clips and, would you look at that, it comes apart after all! Now the case is properly empty. I think I've said thanks for watching about three times by this stage, but clearly that hasn't stopped me.

Now for the reassembly. I put the Sound Blaster in the lower slot so I can see more of the other cards, reconnect the controller card and try booting. Without a bootable disk, the machine drops into BASIC. It looks pretty basic... pun intended! Apparently the way out is to turn the machine off.

I'd much rather give it DOS 3.3 though. First attempt: disk boot failure. Second attempt: disk boot failure. Hmm. Is the floppy playing up, or is something else getting in the way? Turns out the dead hard drive is interfering. Once I disconnect it from the motherboard, the floppy boots. I really do need a replacement hard drive!

With that sorted, there's time for Prince of Persia and a bit of Monkey Island. The Sound Blaster gets a workout, and Monkey Island runs, although those animations can make the 8086 struggle a little. Between the painfully slow camera focus and all the time I spend saying thanks for watching, this video could go on forever. Now, back to cleaning the thing!

### Related Posts

- [IBM PS/2 Model 30 8086: External Overview](/the-ibm-ps2-model-30-8086-external-overview/)

### Sources

- [IBM Files - PS/2 Model 25 and Model 30](https://www.ibmfiles.com/pages/ps2model25.htm) - documents the original Model 30's 8-bit ISA expansion architecture.
