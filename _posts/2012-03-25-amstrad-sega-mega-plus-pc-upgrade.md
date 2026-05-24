---
title: "Amstrad Sega Mega Plus PC Upgrade"
author: "Nix McRetro"
date: 2012-03-25T00:42:58.000+11:00
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0046.jpg)

The new motherboard went in and POST passed OK, hard drives were recognised perfectly. Sadly this indicates that the 386 board that was originally in the machine has an issue with the hard drive controller on the motherboard. It will still be a good backup board though.

I will see how bigger hard drive the machine will recognise and from there purchase a Disk On Module (DOM) which, as far as I can tell, is a flash drive that can hook into a PATA port. They are very low sized - which will be ideal for this system.

![](/assets/images/2012/img_0047.jpg)

However, I did hit a show stopper with the real time clock battery being flat. This prevented the machine retaining settings upon reboot (Yes! Even if the power was connected! Dammit!) and there is no way to bypass it without hacking apart the chip.

![](/assets/images/2012/img_0048.jpg)

The particular chip in question is the TH6887A with a date stamp 9309 as pictured above. Thankfully, these batteries do not leak all over the motherboard like the "Sealed" NiCad on the 386 board. Unfortunately they are a pain due to their non-standardness. Removing the chip causes the machine to beep on startup - it contains more than just a battery I discovered.

They can be substituted with a Dallas DS1287A or DS1287 - which one I am not sure. Chances are they both work, so I've ordered one of each from China. Lead time 2-3 weeks, bummer. The wait begins again.

![](/assets/images/2012/img_0049.jpg)

![](/assets/images/2012/img_0043.jpg)

![](/assets/images/2012/img_0050.jpg)

While I was on eBay I picked up a coprocessor for the 486 board also. It was a ULSI US83S87 SX/SLC33 MATH COPROCESSOR 68-PIN PLCC. 33MHz to run alongside with the 33MHz 486 CPU. Failing that I was going to pickup a Chips coprocessor rated at 35MHz. If you choose less it can give false results. I figured it is better to be safe than sorry. Not that coprocessors are utilised much for what I'll be using it for.

![](/assets/images/2012/img_0054.jpg)

![](/assets/images/2012/img_0055.jpg)

I am also still waiting on my 4x4MB RAM chips to arrive from overseas. Very exciting times. The video RAM on this motherboard already appears to be maxed out and that is great news! Scorched Earth!

![](/assets/images/2012/img_0051.jpg)

![](/assets/images/2012/img_0052.jpg)

![](/assets/images/2012/img_0053.jpg)

It does look like the onboard VGA can be disabled and an ISA video card be run, however I do not think it would fare too well with the Mega Drive card. Also above are the jumper settings to bypass the Mega Drive card and run in PC only mode. And finally a readout of the auto-detected hard drive settings - Thanks American Megatrends!
