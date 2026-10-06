---
title: "Aiwa Sega Mega-CD CSD-GM1 Game Unit in Standalone Mode"
author: "Nix McRetro"
date: 2013-08-06T18:33:53.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [hacks, repairs, sega]
---

{% include youtube.html id="VkRdAXYt9x4" %}

You don't need no stinkin' boombox to play Mega Drive games, just a suitable regulated 5 V power supply. My test supply was rated for 2 A on the 5 V rail, but that is the current it can provide, not current it forces into the Game Unit.

![](/assets/images/2013/img_0414.jpg)

So you've got an Aiwa Mega-CD and you want to make sure your Game Unit attachment is working well? Good news, the Mega Drive section can be powered independently of the Aiwa Mega-CD boom box with a suitable regulated 5 V supply.

![](/assets/images/2013/img_0416.jpg)

First up you need a power source. I had an old LaCie ACML-51 external CD-ROM power brick hanging around so I gave it a go. It provides an **amp**le 2 amps (Ha!) on the 5 V rail and we won't be using the 12 V rail for this one, unless we want a fire... ;) Check with a multimeter to make sure your power adapter is outputting close to 5 V.

![](/assets/images/2013/img_0415.jpg)

Here we have ground connected to pin 12 and 5 V (white) connected to pin 24 on the unit I tested, using the numbering shown in the photograph. The red 12 V lead was left unused. Before applying power, verify the pin numbering, polarity and voltage with a multimeter, and insulate the unused lead and exposed connections so they cannot short. Connect your AV cable, insert a cartridge and then power up and sit tight.

![](/assets/images/2013/img_0417.jpg)

If you inserted a cartridge, you'll see a familiar SEGA splash screen or...

![](/assets/images/2013/img_0418.jpg)

...the very start of the Sega Mega-CD intro if you didn't insert a cartridge. With no link to the boombox's CD-ROM hardware in this setup, the intro starts but then hangs.

### Related posts

- [Aiwa Mega-CD CSD-GM1 Unit-02 Mainboard Cross-Test with Both Game Units](/aiwa-mega-cd-csd-gm1-unit-02-mainboard-cross-test-with-both-game-units/)

### Sources

- [MEAN WELL - Notes on LED Drivers & Luminaires, Note 1.5](https://led.meanwell.com/productPre.aspx)
