---
title: "286, 386, 486 - Overclocking and Upgrades"
author: "Nix McRetro"
date: 2012-06-17T11:31:02.000+10:00
categories: [ibm-pc, repairs]
---

![](/assets/images/2012/img_0204.jpg)

Wow! My mind been racing at 1000 miles an hour. I can barely keep up with the ideas for future mods jump in. Let's start with what I've been scribbling down on the paper next to my computer. I have more tabs open than a Firefox enthusiast right now!

**1\. Socketed CPUs for everyone!**\
Change the Sega TeraDrive CPU to a socketed solution. Change the Amstrad Mega PC CPU to a socketed solution.

**2\. Socketed/veroboarded crystal oscillators**\
You can't replace a CPU without replacing the counterpart crystal oscillator. Come to think of it the co-processor would have to be removed on the Mega PC too!

It came to me when I realised that the 486SLC I have in my Mega PC does not appear to have been the original board Amstrad were marketing here. I found the following in my previously saved images.

![](/assets/images/2012/img_0208.jpg) What appears to be a genuine Amstrad Mega PC Plus motherboard - Note the 386 motherboard revision, yet 486 CPU and BIOS installed.

It sure looks like a 386SX board - I mean look at the top right where it mentions VSC386SXD. But look at that a TX486SLC CPU with a 486SLC BIOS. That is a Mega PC Plus motherboard right there. I thought it was just another damaged 386SX Mega PC.

![](/assets/images/2012/img_0042.jpg)

So what does that make my 486SLC? Was mine due to be a second revision to the Mega PC Plus? It uses a newer CPU the TX486SLC/E which was apparently optimised in some way to make it use less power or whatnot. Thankfully, I have also discovered that all the 486/386 chips I am looking into are 5V and not dreaded 3.3V models. That definitely helps my mind kick back and relax knowing these is a lesser chance of failure when I do upgrade the 386SX CPU.

However, I found that it is likely I will need to upgrade at least one nearby crystal oscillator to gain full CPU speed. If I were to leave it with what it has now, it would either not run or run at the same speed it has been - effectively underclocking the CPU I install.

![](/assets/images/2012/img_0203.jpg)

This got me thinking, perhaps I can use a socketed CPU and a socketed crystal so I can mix and match. The idea had crossed my mind for the 286 TeraDrives as they were far simpler beasts. I noted they had a 20MHz crystal nearby - apparently these run at twice the speed of the CPU. Which makes sense given I have a 10MHz AMD 286 chip installed in the TeraDrives. I was able to find three half size DIP4 crystals on the IBM-built motherboard. 14.31818MHz is a crystal that has been around since time began and is present on the Mega PCs and the TeraDrives.

_The original PC used a single "base oscillator" to generate a frequency of 14.31818 MHz because this frequency was commonly used in television circuitry at the time. This base frequency was divided by 3 to give a frequency of 4.77272666 MHz that was used by the CPU, and divided by 4 to give a frequency of 3.579545 MHz that was used by the CGA video controller._

That seems to rule that one out. The ones that appear to be controlling the Mega PC motherboards is below. They are 66MHz and 50MHz. The 486SLC and 386SX respectively are 33MHz and 25MHz - so the crystal oscillators were running at twice the speed of the CPU - just like in the TeraDrive. Coincidence? I think not!

Of course if I were to move to a socketed solution (or clip on), the original CPUs would no longer fit and I'd need to get some 68-pin PLCC (Plastic Leaded Chip Carriers) shaped chips. This would work well for the TeraDrive, however for the 386SX... not so well since I already have the CPU. Now I need to rethink the whole strategy over for the 386SX...

In any case I'll start buying up all the parts I need and eventually will action it. It might not be for a while anyway. You'll all know once it is done though since I'll be posting about it on here.
