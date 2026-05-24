---
title: "ROM Hacking Super Mario World (USA) with MIX4AAE"
author: "Nix McRetro"
date: 2016-03-16T13:26:35.000+11:00
categories: [hacks, nintendo, youtube]
---

![SMW_MIX4AAE](/assets/images/2016/img_0468.jpg)

I had a request for some help on getting [this](https://w.atwiki.jp/sm4wiki_mix/pages/64.html) working on a flash cart. So I figured sure, why not! :)

First up we take the Super Mario World (US) ROM which weighs in at 512kB, making it a 4Mbit ROM. Then apply the IPS patch on [here](https://w.atwiki.jp/sm4wiki_mix/pages/64.html). I used the good old reliable [SFC/SNES ROM UTILITY V2.1](http://www.romhacking.net/utilities/593/) under Windows 10. I couldn't get [MultiPatcher 1.5](http://projects.sappharad.com/tools/multipatch.html) to patch correctly on the Mac side, so quickly gave up on that.

Hit file, open select your Super Mario World (US) ROM. It will then load it up and give you some information about the ROM. size is 0.5MB, It is a 4Mbit LoROM and it NTSC. Hit the "IPS Patch" radio button and then OK. Select the MIX4AAE.ips file and when prompted select yes where it asks about a headered ROM. It will then create a new file that is patched. You'll note that the size has jumped up to 3.00MB and is now a 32Mbit LoROM.

![ipsandsum](/assets/images/2016/img_0469.jpg)

For the sake of being complete, we'll also fix up the checksum (no one likes a dirty checksum). Grab [IpsAndSum](http://www.romhacking.net/utilities/499/). Once open, file and open your newly patched file. Nothing will happen until you go back into file and select "Repair Snes CheckSum", it will tell you that the "CheckSum Does not match. Repair it?" Hit yes. It will advise success and to save the ROM. Head back to file again and then "Save..." - Excellent! You now have a patched Super Mario World ROM.

![MIX4AAE](/assets/images/2016/img_0467.jpg)

Now you can fire up an emulator of your choice to test that the ROM works. I went with the time-tested Snes9x 1.53 on the Mac. It also gives the information we need to find an appropriate donor cartridge: - LoROM - 32Mbits - NTSC - SRAM: 16kbits - Battery

Next head over to the [Server](/goodies/) page and visit the Google Drive and locate a document called [SNES PCB List-full.xls](http://files.mcretro.net). It is a great big list I found somewhere a while back. It lists all the details we need! The size of the cartridge isn't important as we will be replacing the ROM with a TSOP40 AM29F032B or an ST M29F032D chip. SRAM is usually important to match in size. LoROM is also important as that is how the cartridge is wired up. You could technically use a Super Mario World cart! The only thing not listed is whether the game has battery backup support. Find a ROM, throw it into Snes9x and check for ROM+RAM+BAT on startup.

Once you find a suitable donor cart also make sure the region matches or install a SuperCIC modchip in your SNES / SFC to bypass any region checks. From there it is just a matter of getting the ROM code onto the TSOP chip and into your cartridge. It's more complicated than it sounds, these videos might help.

 

{% include youtube.html id="dV6J6cpVUfg" %}

This first video shows a bit of the ROM flashing process using EarthBound as an example. EarthBound is a 24Mbit game that fits well on a 32Mbit TSOP40 chip.

 

{% include youtube.html id="w0vsgrKIE4E" %}

The above video is more a guide on how to solder TSOP chips. There will be a part two on programming in the near future. In the meantime, if you get stuck, feel free to ask around on forums. I'd recommend [AssemblerGames](https://web.archive.org/web/20191206184256/https://assemblergames.com/) or [ROMhacking.net](http://www.romhacking.net) as a good starting point for any questions. And of course, remember to have fun! Good luck! :)

**January 2020 edit:** [The Poor Student Hobbyist](https://thepoorstudenthobbyist.com/2017/09/14/how-to-make-a-snes-reproduction-cartridge/#step7d) has a fantastic write up with many details and a heap of options depending on cartridge and chips you decide to work with.

**References** [https://web.archive.org/web/20191027015856/http://www.nintendoage.com/forum/messageview.cfm?catid=22&threadid=85308](https://web.archive.org/web/20191027015856/http://www.nintendoage.com/forum/messageview.cfm?catid=22&threadid=85308)
