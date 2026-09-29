---
title: "IBM PS/2 Model 30 8086 Sound, Video and CPU Upgrades"
author: "Nix McRetro"
date: 2012-10-25T03:12:20.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, youtube]
---

{% include youtube.html id="_JNLqRoWb9k" %}

Easiest to start with the CPU upgrade, I suppose.

### NEC V30 and 8087

I replaced the original 8 MHz 8086-2 with an 8 MHz NEC V30 and installed an 8087-2 math coprocessor.

The V30 is a pin-compatible 8086 replacement and executes many instructions more efficiently. Running a few basic benchmarks showed a noticeable improvement over the original 8086-2.

I genuinely wasn't expecting the difference to be that obvious.

![](/assets/images/2012/img_0337.jpg)

### VGA

I also remembered that I had an Oak Technology ISA VGA card available, which gave me proper VGA output on my ViewSonic LCD.

Later I tried a Trident VGA card and that worked as well.

Both cards physically have the extended 16-bit ISA connector, while this Model 30 only provides an 8-bit ISA bus. In these particular cards, enough of the VGA functionality was available through the original 8-bit portion of the connector for them to operate.

The Oak card also includes floppy and hard-drive controller hardware.

Thankfully it did not interfere with the Model 30's onboard controllers, so those functions appear to have been disabled or inactive.

I still cannot find the jumper settings for this particular Oak card. If anyone knows them, please let me know!

![](/assets/images/2012/img_0338.jpg)

### Sound Blaster 16 ViBRA

I also installed a Sound Blaster 16 ViBRA and, somewhat surprisingly, it worked.

I had originally assumed the unused 16-bit ISA extension was mainly related to the CD-ROM interface. That was far too simplistic.

Sound Blaster 16-family cards can use the extended ISA connector for functions such as 16-bit DMA, and the exact feature set varies between card revisions.

This particular card still provided useful audio in the Model 30's 8-bit slot, although that does not mean every feature available in a full 16-bit ISA system was present.

It worked straight out of the box for the software I tested, and I didn't even need to define a BLASTER environment variable.

I should really try an ESS card next.

![](/assets/images/2012/img_0336.jpg)

### Still waiting for storage

I'm still waiting for the replacement hard drives.

At the rate the seller is progressing I'll be lucky to see them within the next month.

Chances are I'll end up lodging a PayPal dispute before the deadline expires. They were completely silent until yesterday, when they promised to get onto it tomorrow.

Which is yesterday.

Ahhh, time zones...

![](/assets/images/2012/img_0335.jpg)

### Related posts

- [IBM PS/2 Model 30 8086: External Overview](/the-ibm-ps2-model-30-8086-external-overview/)
- [IBM PS/2 Model 30 8086 Disassembly](/ibm-ps2-model-30-8086-disassembly/)
- [IBM PS/2 Model 30 8086 with ISA XTIDE Card](/ibm-ps2-model-30-8086-with-isa-xtide-card/)

### Sources

- [IBM Files - PS/2 Model 25 and Model 30](https://www.ibmfiles.com/pages/ps2model25.htm) - documents the early Model 30 architecture and 8-bit ISA expansion.
- [Oracle - Sound Blaster 16 hardware configuration](https://docs.oracle.com/cd/E19504-01/805-0037/6j03u2hrk/index.html) - documents separate 8-bit and 16-bit DMA resources used by Sound Blaster 16-family hardware.
