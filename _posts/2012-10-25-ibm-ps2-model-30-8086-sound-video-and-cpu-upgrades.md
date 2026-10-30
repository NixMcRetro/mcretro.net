---
title: "IBM PS/2 Model 30 8086 Sound, Video and CPU Upgrades"
author: "Nix McRetro"
date: 2012-10-25T03:12:20.000+11:00
last_modified_at: 2026-10-21
categories: [ibm-pc, youtube]
---


{% include youtube.html id="_JNLqRoWb9k" %}

I've been doing a few upgrades to my IBM PS/2 Model 30 8086, and it's becoming a rather nice little machine. I've been debating whether to keep it or replace it with the Model 30 286 I originally wanted, but this early PS/2 certainly has its charms. Let's see how far we can get with a new CPU, VGA card and sound card.

### NEC V30 and 8087

I replaced the original 8 MHz 8086-2 with an 8 MHz NEC V30 and installed an 8087-2 maths co-processor. The V30 is a pin-compatible replacement for the 8086 and can execute many instructions more efficiently. A few simple benchmarks showed a noticeable improvement over the original Intel CPU.

I genuinely wasn't expecting the difference to be that obvious. The computer is still an 8 MHz machine, but it's a little more responsive than before. Interestingly, the co-processor was getting quite warm during testing, even though the main CPU wasn't nearly as hot.

### VGA

I'd also remembered that I had an Oak Technology ISA VGA card sitting around. The Model 30's original MCGA output wasn't particularly compatible with some of the modes on my ViewSonic LCD, so a proper VGA card seemed worth trying. Thankfully the Oak worked, and I could finally see the games properly.

The card uses an OTI067 VGA chip and also includes floppy and hard-drive controller hardware. Those extra features didn't appear to interfere with the Model 30's onboard controllers, although I still haven't been able to find the jumper settings for this particular Oak card. If anyone knows them, please let me know!

![](/assets/images/2012/img_0337.jpg)

The real test was Monkey Island. Previously it had been painfully slow on this machine, especially during scenes with a lot happening on the screen. With the new hardware installed, the scrolling and animation were considerably better. I suspect the VGA card made a particularly big difference here, although the V30 was also helping things along.

Later I tried a Trident VGA card and that worked as well. Both cards physically have the extended 16-bit ISA connector, while the Model 30 only provides an 8-bit ISA bus. In these particular cards, enough of the VGA functionality was available through the original 8-bit portion of the connector for them to operate.

![](/assets/images/2012/img_0338.jpg)

The Trident card also seemed rather quick in Monkey Island, although I didn't have a controlled benchmark comparing the two VGA cards. It was impressive enough watching the animation move smoothly on an old machine that had previously struggled with the same game.

### Sound Blaster 16 ViBRA

I also installed a Sound Blaster 16 ViBRA (CT2810) and, somewhat surprisingly, it worked. I had originally assumed the unused 16-bit ISA extension was mainly related to the CD-ROM interface, which was far too simplistic.

Sound Blaster 16-family cards can use the extended connector for features such as 16-bit DMA, and the exact capabilities depend on the card revision. This particular ViBRA still provided useful sound in the Model 30's 8-bit slot, although that doesn't mean every feature available in a full 16-bit ISA system was working.

Monkey Island detected the card without much trouble, and I didn't even need to define a BLASTER environment variable for the software I tested. Hearing proper game audio from this old IBM was rather satisfying. I should really try an ESS card next.

![](/assets/images/2012/img_0336.jpg)

### Still Waiting for Storage

I'm still waiting for the replacement hard drives. At the rate the seller is progressing I'll be lucky to see them within the next month. The floppy drive works, although another drive I'd purchased turned out to be faulty, so there's still some work to do before the storage side is sorted.

Chances are I'll end up lodging a PayPal dispute before the deadline expires. The seller was completely silent until yesterday, when they promised to get onto it tomorrow. Which is yesterday. Ahhh, time zones...

![](/assets/images/2012/img_0335.jpg)

### Another Look at the Upgrades

{% include youtube.html id="QgmnF8piESE" %}

Here's another look around the Model 30, showing a slightly different combination of hardware. We've still got the NEC V30 and maths co-processor running at 8 MHz, but this time the VGA card is identified as a Trident 9000B, and the sound card is a Sound Blaster 2.0, apparently a CT1350B, rather than the ViBRA discussed above.

The Sound Blaster needed a little attention before it was entirely happy. Two of its 470 uF capacitors looked as though someone had stepped on them, so I replaced those and, if I remember correctly, another 100 uF capacitor. The resulting audio sounds fantastic!

The Trident VGA card is also a bit of a curiosity. It has a 16-bit ISA edge connector, yet works in the Model 30's 8-bit slot without those additional contacts connected. I'm certainly not complaining.

Between the graphics card, sound card and original tape-controller card, the ISA slots are now full. The floppy drive works, but I'm still waiting for a replacement hard drive. I've also got XTIDE cards coming, although I'm more interested in using those with my Sega TeraDrives.

That's about as upgraded as this machine is going to get for the moment. Not bad for an old 8086, even if it isn't technically running an Intel 8086 anymore!

**Related Posts**

- [IBM PS/2 Model 30 8086: External Overview](/the-ibm-ps2-model-30-8086-external-overview/)
- [IBM PS/2 Model 30 8086 Disassembly](/ibm-ps2-model-30-8086-disassembly/)
- [IBM PS/2 Model 30 8086 with ISA XTIDE Card](/ibm-ps2-model-30-8086-with-isa-xtide-card/)

**Sources**

- [IBM Personal System/2 Model 30 Technical Reference](https://www.ibmfiles.com/ibmfiles/ps2/25/model30tr.pdf) - documents the 8 MHz 8086-2, coprocessor support and 8-bit I/O expansion channel.
- [NEC uPD70116 (V30) 16-bit Microprocessor Datasheet](https://ardent-tool.com/CPU/docs/NEC/V20-V30/NEC_uPD70116.pdf) - documents the V30 pinout and 8 MHz variant.
- [Oracle - Creative Labs Sound Blaster 16, Sound Blaster AWE32, Sound Blaster Vibra 16](https://docs.oracle.com/cd/E19504-01/805-0037/6j03u2hrk/index.html) - documents separate 8-bit and 16-bit DMA resources used by Sound Blaster 16-family hardware.
