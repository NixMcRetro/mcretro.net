---
title: "IBM PS/2 Model 30 8086 Sound, Video and CPU Upgrades"
author: "Nix McRetro"
date: 2012-10-25T03:12:20.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, youtube]
---

{% include youtube.html id="_JNLqRoWb9k" %}

Easiest to start with the CPU Upgrade I suppose... Popped in a V30 8MHz chip and 8087-2 co-processor. Ran it through some basic benchmarks and it is a fair deal better than the vanilla 8086-2 (8MHz) CPU that was installed. I really didn't expect to see that much of a difference.

![](/assets/images/2012/img_0337.jpg)

Although I wouldn't have been able to do this unless I had remembered about my Oak Technology ISA VGA card to give me display on my Viewsonic LCD screen. Later on, I tried a Trident VGA card and it also worked, even though both cards have the extended 16-bit ISA connector while the Model 30 provides only an 8-bit ISA bus. Some 16-bit ISA cards can fall back to 8-bit operation if the functions they need are available through the original ISA connector, which is apparently what these video cards were able to do here.

![](/assets/images/2012/img_0338.jpg)

The Oak card also has a built-in floppy drive and hard drive controller, thankfully it did not interrupt the onboard controller - it must have been disabled... Even though I cannot find any jumper settings for this particular Oak card. If anyone knows the jumper settings, please do let me know!

![](/assets/images/2012/img_0336.jpg)

Also popped in a Sound Blaster 16 Vibra and it worked a charm too. I initially assumed the unused 16-bit ISA extension was mainly related to the CD-ROM interface, but that was too simplistic. Sound Blaster 16-family cards can use the 16-bit ISA extension for features such as 16-bit DMA, while the exact CD-ROM interface varies between card models. This particular card was still able to provide useful audio functionality in the Model 30's 8-bit ISA slot, although not necessarily every capability the card would have in a full 16-bit slot. Worked straight out of the box too, and I did not need to set a BLASTER environment variable for the software I tested. I should really try an ESS card in there to see if it works just as well.

![](/assets/images/2012/img_0335.jpg)

I'm still waiting for the replacement hard drives to arrive for this machine. I'll be lucky to have them in the next month at the rate the seller I am dealing with is progressing. Chances are I'll end up lodging a PayPal dispute and getting a full refund since time is running out for me to do that and they haven't even shipped it yet. They were completely silent until yesterday. At least they said they will get onto it tomorrow (which is yesterday). Ahhh timezones...


### Sources

- [IBM Files - PS/2 Model 25 and Model 30](https://www.ibmfiles.com/pages/ps2model25.htm) - documents the early Model 30 architecture and 8-bit ISA expansion.
- [Oracle - Sound Blaster 16 hardware configuration](https://docs.oracle.com/cd/E19504-01/805-0037/6j03u2hrk/index.html) - documents separate 8-bit and 16-bit DMA resources used by Sound Blaster 16-family hardware.
