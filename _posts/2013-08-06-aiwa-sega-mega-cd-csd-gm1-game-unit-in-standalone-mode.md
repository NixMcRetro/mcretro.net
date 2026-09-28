---
title: "Aiwa Sega Mega-CD CSD-GM1 Game Unit in Standalone Mode"
author: "Nix McRetro"
date: 2013-08-06T18:33:53.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, repairs, sega]
---

{% include youtube.html id="VkRdAXYt9x4" %}

You don't need no stinkin' boombox to play Mega Drive games, just a suitable regulated 5V power supply. My test supply was rated for 2A on the 5V rail, but that is the current it can provide, not current it forces into the Game Unit.

![](/assets/images/2013/img_0414.jpg)

So you've got an Aiwa Mega-CD and you want to make sure your Game Unit attachment is working well? Good news, the Mega Drive section can be powered independently of the Aiwa Mega-CD boom box with a suitable regulated 5V supply.

![](/assets/images/2013/img_0416.jpg)

First up you need a power source. I had an old LaCie external CD-ROM power brick hanging around so I gave it a go. It provides an **amp**le 2 amps (Ha!) on the 5V rail and we won't be using the 12V rail for this one, unless we want a fire... ;) Check with a multimeter to make sure your power adapter is outputting close to 5V.

![](/assets/images/2013/img_0415.jpg)

Here we have ground connected to pin 12 and 5V (white) connected to pin 24 on the unit I tested. The 12V lead from my power supply was left unused. Connect your AV cable, insert a cartridge and then initiate power and sit tight. Verify the pin numbering, polarity and voltage with a multimeter before applying power, as putting the wrong voltage onto the 5V rail risks damaging the hardware.

![](/assets/images/2013/img_0417.jpg)

If you inserted a cartridge, you'll see a familiar SEGA splash screen or...

![](/assets/images/2013/img_0418.jpg)

...the very start of the Sega Mega-CD intro if you didn't insert a cartridge. Since there's no hardware linking up to the CD-ROM the BIOS startup isn't quite sure what to do - so it hangs!

### Sources

- [All About Circuits - An Introduction to Current Sources](https://www.allaboutcircuits.com/technical-articles/an-introduction-to-current-source/)
