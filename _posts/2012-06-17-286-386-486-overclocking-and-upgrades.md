---
title: "286, 386, 486 - Overclocking and Upgrades"
author: "Nix McRetro"
date: 2012-06-17T11:31:02.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs]
---

![](/assets/images/2012/img_0204.jpg)

Wow! My mind been racing at 1000 miles an hour. I can barely keep up with the ideas for future mods jump in. Let's start with what I've been scribbling down on the paper next to my computer. I have more tabs open than a Firefox enthusiast right now!

**1\. Socketed CPUs for everyone!**\
Change the Sega TeraDrive CPU to a socketed solution. Change the Amstrad Mega PC CPU to a socketed solution.

**2\. Socketed/veroboarded crystal oscillators**\
Replacing a CPU does not automatically require replacing the clock oscillator. If the replacement is compatible with the existing clock it may simply run at that speed. Changing the oscillator becomes relevant when attempting to change the processor or bus frequency, and the rest of the motherboard must also tolerate that clock. Come to think of it the co-processor would have to be considered on the Mega PC too!

It came to me when I realised that the 486SLC I have in my Mega PC does not appear to have been the original board Amstrad were marketing here. I found the following in my previously saved images.

![](/assets/images/2012/img_0208.jpg) What appears to be a genuine Amstrad Mega PC Plus motherboard - Note the 386 motherboard revision, yet 486 CPU and BIOS installed.

It sure looks like a 386SX-derived board - I mean look at the top right where it mentions VSC386SXD. But look at that, a TX486SLC CPU with a 486SLC BIOS. It is extremely interesting in the context of the Mega PC Plus, but I would no longer treat this photograph alone as proof that it is a factory Mega PC Plus motherboard. I thought it was just another damaged 386SX Mega PC.

![](/assets/images/2012/img_0042.jpg)

So what does that make my 486SLC? Was mine due to be a second revision to the Mega PC Plus? The replacement board uses a TI486SLC/E. Texas Instruments documented standard 25MHz and 33MHz SLC/E parts as 5V devices, while separate low-voltage variants also existed. Likewise, the specific standard Am386SX parts I was looking at here were 5V-class devices, but low-voltage variants existed in that family too. The exact part number and suffix need to be checked rather than assuming every 386SX or 486SLC uses the same supply voltage.

However, if I wanted a faster compatible CPU to run at its intended frequency, I would likely need to change the relevant clock source as well. Leaving the original clock in place could cause a compatible replacement CPU to run below its rated speed, while an incompatible part might not operate correctly at all.

![](/assets/images/2012/img_0203.jpg)

This got me thinking, perhaps I can use a socketed CPU and a socketed crystal so I can mix and match. The idea had crossed my mind for the 286 TeraDrives as they were far simpler beasts. I noted they had a 20MHz crystal nearby - apparently these run at twice the speed of the CPU. Which makes sense given I have a 10MHz AMD 286 chip installed in the TeraDrives. I was able to find three half size DIP4 crystals on the IBM-built motherboard. 14.31818MHz is a crystal that has been around since time began and is present on the Mega PCs and the TeraDrives.

_The original PC used a single "base oscillator" to generate a frequency of 14.31818 MHz because this frequency was commonly used in television circuitry at the time. This base frequency was divided by 3 to give a frequency of 4.77272666 MHz that was used by the CPU, and divided by 4 to give a frequency of 3.579545 MHz that was used by the CGA video controller._

That seems to rule that one out as the direct CPU clock source. The oscillators that appear to be controlling the Mega PC motherboards are 66MHz and 50MHz. The 486SLC and 386SX respectively are 33MHz and 25MHz, so those clock inputs run at twice the internal CPU frequency. That relationship is documented for both the TI486SLC/E and Am386SX families, so this part of the deduction was on the right track.

Of course if I were to move to a socketed solution (or clip on), the original CPUs would no longer fit and I'd need to get some 68-pin PLCC (Plastic Leaded Chip Carriers) shaped chips. This would work well for the TeraDrive, however for the 386SX... not so well since I already have the CPU. Now I need to rethink the whole strategy over for the 386SX...

In any case I'll start buying up all the parts I need and eventually will action it. It might not be for a while anyway. You'll all know once it is done though since I'll be posting about it on here.


### Sources

- [AMD Am80286 datasheet](https://www.bitsavers.org/components/amd/x86/_dataSheets/1985_80286.pdf) - documents the 80286 clock input running at twice the internal processor frequency.
- [AMD Am386SX/SXL datasheet](https://www.amd.com/content/dam/amd/en/documents/archived-tech-docs/datasheets/21020.pdf) - documents the Am386SX CLK2 relationship and distinguishes standard and low-voltage variants.
- [Texas Instruments TI486 Microprocessor Reference Guide](https://www.bitsavers.org/components/ti/TI486/1993_TI486_Microprocessor_Reference_Guide.pdf) - documents TI486SLC/E clocking, 25MHz and 33MHz operation, and voltage variants.
- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - official background on the TeraDrive and its IBM Japan collaboration.
