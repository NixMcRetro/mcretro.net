---
title: "The Sega TeraDrive Model 3"
author: "Nix McRetro"
date: 2012-05-24T12:25:50.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega]
---

![](/assets/images/2012/img_0133.jpg)

![](/assets/images/2012/img_0134.jpg)

![](/assets/images/2012/img_0132.jpg)

Finally got a chance to test the Sega TeraDrive Model 3 that arrived a few days ago. Sega sold the Model 3 as the top configuration, with 2.5 MB of RAM, one 3.5-inch floppy drive and a 30 MB internal hard drive. Mine arrived without its hard drive, but thankfully the original cable, screws and hard-drive sled are still present. It boots Windows 3.11 from floppy just like my Model 2.

![](/assets/images/2012/img_0136.jpg)

![](/assets/images/2012/img_0135.jpg)

![](/assets/images/2012/img_0137.jpg)

The next problem is working out exactly what sort of replacement hard drive the TeraDrive wants. The connector has 44 pins, but it isn't standard laptop IDE. I've been digging through information on early IBM PS/2 Model 25 and Model 30 hard drives, which use a similarly unusual arrangement. Some older references call these drives XT IDE or XTA, while the storage design is more accurately described as a proprietary direct-bus-attachment interface.

![](/assets/images/2012/img_0138.jpg)

![](/assets/images/2012/img_0140.jpg)

![](/assets/images/2012/img_0139.jpg)

I'm still waiting on the ISA IDE controller card from the UK for the Model 2. In the meantime, I need to find a compatible drive to get the Model 3 back to its proper configuration.

Another thing I noticed is that the trace wiring on the Model 3 travels to slightly different locations from my Model 2. The Model 3 also has much nicer-looking yellow wiring, while the Model 2 uses mostly green. Not exactly the most important engineering discovery of the century, but there it is!

Time to get a hard drive installed and see how far this one can go. Many more images can be found in the [photo gallery](/goodies) filed under Sega TeraDrive Model 2 and Model 3.

### Sources

- [Sega Hardware Archive: TeraDrive (Model 3 Specifications)](https://www.sega.jp/fb/segahard/md/tera.html)
- [IBM Files: PS/2 Model 25/30 (Proprietary Hard Drive Interface)](https://www.ibmfiles.com/pages/ps2model25.htm)

### Related Posts

- [Sega TeraDrive Model 3 Hard Drive Replacement](/sega-teradrive-model-3-hard-drive-replacement/)
- [Sega TeraDrive Hard Drive Interface Investigation](/sega-teradrive-hard-drive-interface-investigation/)
