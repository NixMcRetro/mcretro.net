---
title: "Aiwa Sega Mega-CD CSD-GM1 Game Unit in Standalone Mode"
author: "Nix McRetro"
date: 2013-08-06T18:33:53.000+10:00
categories: [hacks, repairs, sega]
---

{% include youtube.html id="VkRdAXYt9x4" %}

You don't need no stinkin' boombox to play Mega Drive games, just a hacked up 5V 1A+ power supply. In fact, you could probably do it with less than 1A!

![](/assets/images/2013/img_0414.jpg)

So you've got an Aiwa Mega-CD and you want to make sure your Game Unit attachment is working well? Good news, if you have a 5V ~1amp power adapter (even USB might work) you're in luck! It is possible to power the Mega Drive section independently of the Aiwa Mega-CD boom box section.

![](/assets/images/2013/img_0416.jpg)

First up you need a power source. I had an old LaCie external CD-ROM power brick hanging around so I gave it a go. It provides an **amp**le 2 amps (Ha!) on the 5V rail and we won't be using the 12V rail for this one, unless we want a fire... ;) Check with a multimeter to make sure your power adapter is outputtng close to 5V.

![](/assets/images/2013/img_0415.jpg)

Here we have ground connected to pin 12, 5V (white) connected to pin 24 and of course 12V (red - unused). Connect your AV cable, insert a cartridge and then initiate power and and sit tight. If you connect it wrong and get no video, get ready to pull the power to prevent excessive damage to the internals!

![](/assets/images/2013/img_0417.jpg)

If you inserted a cartridge, you'll see a familiar SEGA splash screen or...

![](/assets/images/2013/img_0418.jpg)

...the very start of the Sega Mega-CD intro if you didn't to insert a cartridge. Since there's no hardware linking up to the CD-ROM the BIOS startup isn't quite sure what to do - so it hangs!
