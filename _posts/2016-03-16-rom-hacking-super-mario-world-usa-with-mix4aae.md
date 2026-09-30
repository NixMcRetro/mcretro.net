---
title: "ROM Hacking Super Mario World (USA) with MIX4AAE"
author: "Nix McRetro"
date: 2016-03-16T13:26:35.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [hacks, nintendo, youtube]
---

![SMW_MIX4AAE](/assets/images/2016/img_0468.jpg)

I had a request for some help on getting [this](https://w.atwiki.jp/sm4wiki_mix/pages/64.html) working on a flash cart. So I figured sure, why not! :)

First up we take the Super Mario World (US) ROM which weighs in at 512 kB, making it a 4 Mbit ROM. Then apply the IPS patch from the link above.

I used the good old reliable [SFC/SNES ROM UTILITY V2.1](https://www.romhacking.net/utilities/593/) under Windows 10. I couldn't get [MultiPatcher 1.5](http://projects.sappharad.com/tools/multipatch.html) to patch correctly on the Mac side, so quickly gave up on that.

Open the Super Mario World (US) ROM in the utility. It reports a 0.5 MB, 4 Mbit NTSC LoROM.

Select the IPS Patch option, choose the MIX4AAE IPS file and follow the prompt about the headered ROM.

The patched file grows to about **3.00 MB**, which is **24 Mbit** of data. It still fits comfortably inside the **32 Mbit / 4 MB** AM29F032B or M29F032D flash chips I was using.

![IPS patch and checksum repair](/assets/images/2016/img_0469.jpg)

For the sake of being complete, we'll also fix up the checksum. No one likes a dirty checksum.

I used [IpsAndSum](https://www.romhacking.net/utilities/499/). Open the newly patched file, select "Repair Snes CheckSum", accept the repair prompt and save the resulting ROM.

![MIX4AAE](/assets/images/2016/img_0467.jpg)

Now fire up an emulator to test that the patched ROM actually works.

I used Snes9x 1.53 on the Mac. It also reported the information I needed for finding a suitable donor cartridge:

- LoROM
- 32 Mbits
- NTSC
- SRAM: 16 kbits
- Battery

That 32 Mbit value is what Snes9x reported from the ROM metadata. The patched file itself is still about 3.00 MB, or 24 Mbit of actual data.

The original mask-ROM capacity is not the main concern once we're replacing that ROM with a larger flash device, but the donor PCB still matters. The board needs the appropriate LoROM mapping and save-memory hardware for the patched game, including suitable SRAM and battery support where required.

The old [SNES PCB List-full.xls](/files) was useful for comparing donor boards.

You could technically use a Super Mario World cart. For other candidates, check that the PCB layout, mapping and save hardware suit the patched game.

Once you find a suitable donor cart, also make sure the region matches or use appropriate region-modification hardware.

From there it is a matter of getting the ROM data onto the TSOP flash chip and installing it in the cartridge.

{% include youtube.html id="dV6J6cpVUfg" %}

This first video shows part of the ROM flashing process using EarthBound as an example. EarthBound is a 24 Mbit game that fits inside a 32 Mbit TSOP40 flash chip.

{% include youtube.html id="w0vsgrKIE4E" %}

The second video is a guide to soldering the TSOP device itself.

A later write-up from [The Poor Student Hobbyist](https://thepoorstudenthobbyist.com/2017/09/14/how-to-make-a-snes-reproduction-cartridge/#step7d) also goes through SNES reproduction-cartridge construction in much more detail, with several board and chip options.

And of course, remember to have fun! Good luck! :)

### Related posts

- [Drag Soldering a 29F032 TSOP Chip](/drag-soldering-a-29f032-tsop-chip/)

### References

- [NintendoAge discussion archive](https://web.archive.org/web/20191027015856/http://www.nintendoage.com/forum/messageview.cfm?catid=22&threadid=85308)
