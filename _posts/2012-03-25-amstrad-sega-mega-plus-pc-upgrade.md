---
title: "Amstrad Sega Mega Plus PC Upgrade"
author: "Nix McRetro"
date: 2012-03-25T00:42:58.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0046.jpg)

The new motherboard went in and POST passed OK, hard drives were recognised perfectly. This strongly pointed to a fault somewhere in the original 386 motherboard's storage subsystem or related circuitry, rather than the hard drives themselves. It will still be a good backup board though.

I will see how large a hard drive the machine will recognise and from there purchase a Disk On Module (DOM). A PATA DOM is flash storage that connects directly to an IDE/PATA interface and presents itself to the computer much like a conventional hard disk.

![](/assets/images/2012/img_0047.jpg)

However, I did hit a show stopper with the real time clock battery being flat. This prevented the machine retaining settings upon reboot (Yes! Even if the power was connected! Dammit!) and there is no way to bypass it without hacking apart the chip.

![](/assets/images/2012/img_0048.jpg)

The particular chip in question is the TH6887A with a date stamp 9309 as pictured above. Thankfully, these encapsulated RTC modules do not expose a separate rechargeable NiCad battery like the one on the 386 board. Unfortunately they are a pain due to their non-standardness. Removing the module causes the machine to complain on startup because this style of RTC contains much more than a battery, including the clock/calendar circuitry, battery-backed CMOS RAM, crystal and internal power source.

I found reports suggesting that Dallas DS1287-family RTC modules were compatible, so I ordered both a DS1287 and DS1287A to test rather than assuming either one would definitely work. Lead time 2-3 weeks, bummer. The wait begins again.

![](/assets/images/2012/img_0049.jpg)

![](/assets/images/2012/img_0043.jpg)

![](/assets/images/2012/img_0050.jpg)

While I was on eBay I picked up a coprocessor for the 486 board also. It was a ULSI US83S87 SX/SLC33 math coprocessor in a 68-pin PLCC package, rated at 33MHz to match the 33MHz 486SLC system. A lower-rated coprocessor may physically fit, but a faster system can run it beyond its specified clock rating, so matching the coprocessor to the system clock is the safer approach. Not that coprocessors are utilised much for what I'll be using it for.

![](/assets/images/2012/img_0054.jpg)

![](/assets/images/2012/img_0055.jpg)

I am also still waiting on my 4x4MB RAM chips to arrive from overseas. Very exciting times. The video RAM on this motherboard already appears to be maxed out and that is great news! Scorched Earth!

![](/assets/images/2012/img_0051.jpg)

![](/assets/images/2012/img_0052.jpg)

![](/assets/images/2012/img_0053.jpg)

It does look like the onboard VGA can be disabled and an ISA video card be run, however I do not think it would fare too well with the Mega Drive card. Also above are the jumper settings to bypass the Mega Drive card and run in PC only mode. And finally a readout of the auto-detected hard drive settings - Thanks American Megatrends!


### Sources

- [Transcend - PATA PTM820 Flash Module](https://au.transcend-info.com/embedded/product/embedded-flash-solutions/ptm820) - manufacturer description of a PATA flash module that connects directly to an IDE/PATA interface and replaces a conventional hard disk.
- [Analog Devices - DS12887 real-time clock](https://www.analog.com/en/products/ds12887.html) - documents the encapsulated RTC design with integrated crystal, battery and battery-backed RAM, and its relationship to the DS1287 family.
- [Epson ActionTower 2000 user manual](https://files.support.epson.com/pdf/at2k__/at2k__u1.pdf) - period documentation showing clock-matched 83S87 coprocessors used with 486SLC systems.
