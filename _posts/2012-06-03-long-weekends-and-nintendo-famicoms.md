---
title: "Long Weekends and Nintendo Famicoms"
author: "Nix McRetro"
date: 2012-06-03T07:25:27.000+10:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [nintendo, repairs, sega]
---

![](/assets/images/2012/img_0176.jpg)

Some good news, and some more good news. It looks like I am going to have Thursday to Monday off work.

This means nothing but organising and sorting through my console collection.

I have also received some boxed Japanese Saturn accessories, including a floppy drive, keyboard, mouse, modem and RF cable. There may be more, but that's everything that comes to mind at the moment.

It appears I will now need to find a boxed Japanese Model 2 Saturn to match all these cool accessories!

![](/assets/images/2012/img_0177.jpg)

![](/assets/images/2012/img_0175.jpg)

In other news, the Nintendo Famicom has been successfully AV modded.

Jailbars are still present. At the time I was experimenting with capacitor-based fixes, including adding a large decoupling capacitor. Later Famicom work has shown that jailbar severity and reduction depend heavily on motherboard revision, PCB routing and interference, so there isn't one magic capacitor value that fixes every console.

I'll report back on how it all goes. In the meantime, the photos are in the [photo gallery](/goodies/) under Nintendo Famicom H10865915.

Oh, and I zapped myself on the Sega TeraDrive.

Well, technically it was the open AT power supply I was using while trying to power a hard drive through an ISA controller card.

Nothing useful came from that experiment except a reminder that an exposed AT PSU contains hazardous mains-voltage circuitry. Working around one while it is energised is not something to do unless you know exactly what you are doing.

Since the ISA experiment was getting nowhere, I picked up a few IBM WDL-330P 30 MB hard drives and an IBM WDI-325Q 20 MB drive.

The WDL-330P drives should fit nicely into the Model 3 TeraDrive that arrived without its hard drive. I also picked up some matching cables.

At this stage I hoped an ordinary IDE drive might somehow be adapted to the TeraDrive with enough rewiring. I later discovered that the storage interface is much stranger than that.

The good news is that the IBM WDL-330P drives I had just ordered turned out to work.

I have a 40 MB Conner Peripherals drive around for more experiments too.

Stay tuned for some great pictures and video of retro goodies late this week and early next!

### Related posts

- [Nintendo Famicom Composite AV Mod](/nintendo-famicom-composite-av-mod/)
- [Sega TeraDrive Model 3 Hard Drive Replacement](/sega-teradrive-model-3-hard-drive-replacement/)

### Further Reading

- [Sega TeraDrive Hard Drive Interface Investigation](/sega-teradrive-hard-drive-interface-investigation/) - my later investigation into compatible drives and the TeraDrive's unusual 44-pin hard-drive interface.

### Sources

- [NESdev Forums - Famicom jailbar discussion](https://forums.nesdev.org/viewtopic.php?t=18508) - documents how jailbar reduction depends on board revision, signal routing and decoupling rather than a single universal capacitor value.
