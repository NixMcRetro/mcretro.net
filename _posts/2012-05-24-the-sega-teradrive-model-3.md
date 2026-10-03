---
title: "The Sega TeraDrive Model 3"
author: "Nix McRetro"
date: 2012-05-24T12:25:50.000+10:00
last_modified_at: 2026-10-02
ai_assistance:
  model: "GPT-6 Astra Max"
  date: 2026-10-02
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [repairs, sega]
---

![](/assets/images/2012/img_0133.jpg)

![](/assets/images/2012/img_0134.jpg)

![](/assets/images/2012/img_0132.jpg)

Finally got a chance to test the Sega TeraDrive Model 3 that arrived a few days ago.

Sega sold the Model 3 as the top configuration, with 2.5 MB of RAM, one 3.5-inch floppy drive and a 30 MB internal hard drive.

Mine arrived without its hard drive. Thankfully the original cable, screws and hard-drive sled are still present, and it boots Windows 3.11 from floppy just like my Model 2.

![](/assets/images/2012/img_0136.jpg)

![](/assets/images/2012/img_0135.jpg)

![](/assets/images/2012/img_0137.jpg)

At this point I was trying to work out exactly what sort of replacement drive the TeraDrive wanted.

The connector uses 44 pins, but it is not standard laptop IDE. Later investigation linked it to the unusual proprietary storage arrangement used in some early IBM PS/2 systems.

I found information about the similarly unusual hard-drive arrangement in early IBM PS/2 Model 25 and Model 30 systems. Older references often call these drives XT IDE or XTA, while later preservation work describes the interface more carefully as a proprietary direct-bus-attachment design.

The important result came later: IBM WDL-330P drives work in the TeraDrive Model 3. I eventually tested several of them successfully.

![](/assets/images/2012/img_0138.jpg)

![](/assets/images/2012/img_0140.jpg)

![](/assets/images/2012/img_0139.jpg)

I am still waiting on the ISA IDE controller card from the UK for the Model 2. In the meantime, I need to find a compatible drive to get the Model 3 back to its proper configuration.

Another thing I noticed is that the trace wiring on the Model 3 travels to slightly different locations from my Model 2. The Model 3 also has much nicer-looking yellow wiring, while the Model 2 uses mostly green.

Not exactly the most important engineering discovery of the century, but there it is.

Time to get a hard drive installed and see how far this one can go.

Many more images can be found in the [photo gallery](/photos) filed under Sega TeraDrive Model 2 and Model 3.

### Related posts

- [Sega TeraDrive Model 3 Hard Drive Replacement](/sega-teradrive-model-3-hard-drive-replacement/)
- [Sega TeraDrive Hard Drive Interface Investigation](/sega-teradrive-hard-drive-interface-investigation/)

### Sources

- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's official specifications list the Model 3 with 2.5 MB RAM, one floppy drive and a 30 MB hard drive.
- [IBM Files - PS/2 Model 25 / 30](https://www.ibmfiles.com/pages/ps2model25.htm) - documents the proprietary hard-drive arrangement used in early PS/2 systems and distinguishes it from standard IDE.
