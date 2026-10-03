---
title: "Amstrad Sega Mega PC 486SLC Upgrade Progress"
author: "Nix McRetro"
date: 2012-03-25T00:42:58.000+11:00
last_modified_at: 2026-10-02
ai_assistance:
  model: "GPT-6 Astra Max"
  date: 2026-10-02
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0046.jpg)

The replacement PC7486SLC motherboard is in. It passes POST and, unlike the original 386 board, recognises the hard drives perfectly. That strongly points to a fault somewhere in the original motherboard's storage subsystem or related circuitry rather than the drives themselves. The old board will still make a useful spare.

I want to see how large a hard drive this machine will recognise and then try a Disk on Module. A PATA DOM is flash storage that plugs directly into the IDE/PATA interface and presents itself to the computer much like a conventional hard disk.

![](/assets/images/2012/img_0047.jpg)

#### The RTC problem

I did hit one show-stopper: the TH6887A real-time clock module has a flat internal battery. On this board that means the machine will not retain its setup properly.

![](/assets/images/2012/img_0048.jpg)

The module is marked TH6887A 9309. It is more than a battery. It contains the clock and calendar circuitry, battery-backed CMOS RAM, crystal and internal power source, all sealed into one package. So simply removing it does not solve the problem.

I found reports suggesting that Dallas DS1287-family RTC modules were compatible, so I ordered both a DS1287 and DS1287A to test rather than assuming either one would definitely work. Lead time: two to three weeks. Bummer. The wait begins again.

![](/assets/images/2012/img_0049.jpg)

![](/assets/images/2012/img_0043.jpg)

![](/assets/images/2012/img_0050.jpg)

#### Math coprocessor

While I was on eBay I picked up a coprocessor for the 486 board as well. It is a ULSI US83S87 SX/SLC33 in a 68-pin PLCC package, rated at 33 MHz to match the 33 MHz 486SLC system. Period documentation for other 486SLC-33 machines specifies an 83S87-33 coprocessor as well, so this is exactly the sort of part I want here. Not that coprocessors are going to be heavily utilised for what I'll be doing with it. Mostly, there was an empty socket and this situation clearly had to be corrected.

![](/assets/images/2012/img_0054.jpg)

![](/assets/images/2012/img_0055.jpg)

#### Memory, video and jumpers

I am also still waiting on my four 4 MB SIMMs to arrive from overseas. Very exciting times. The video RAM on this motherboard already appears to be maxed out, which is great news. Scorched Earth!

![](/assets/images/2012/img_0051.jpg)

![](/assets/images/2012/img_0052.jpg)

![](/assets/images/2012/img_0053.jpg)

It also looks like the onboard VGA can be disabled and an ISA video card used, although I do not know how happily that would coexist with the Mega Drive card.

The photographs above also show the jumper settings for bypassing the Mega Drive card and running the machine in PC-only mode, along with the BIOS auto-detected hard-drive settings.

Thanks American Megatrends!

### Related posts

- [Amstrad Sega Mega PC 486SLC Upgrade Experiment](/amstrad-sega-mega-pc-486slc-upgrade-experiment/)
- [Math Coprocessors and You](/math-coprocessors-and-you/)

### Sources

- [Transcend - PATA PTM820 Flash Module](https://au.transcend-info.com/embedded/product/embedded-flash-solutions/ptm820) - manufacturer description of a PATA flash module that connects directly to an IDE/PATA interface and replaces a conventional hard disk.
- [Analog Devices - DS12887 real-time clock](https://www.analog.com/en/products/ds12887.html) - documents the encapsulated RTC design with integrated crystal, battery and battery-backed RAM, and its relationship to the DS1287 family.
- [Epson ActionTower 2000 user manual](https://files.support.epson.com/pdf/at2k__/at2k__u1.pdf) - period documentation showing clock-matched 83S87 coprocessors used with 486SLC systems.
