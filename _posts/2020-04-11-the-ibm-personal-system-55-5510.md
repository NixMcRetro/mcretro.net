---
title: "The IBM Personal System/55 5510"
author: "Nix McRetro"
date: 2020-04-11T10:00:55.000+10:00
categories: [ibm-pc, sega]
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
---

The IBM PS/55 5510 material below is a rough machine translation of [FunkyGoods' Japanese article about the PS/55 TYPE 5510](https://funkygoods.com/schwarzschild/2010_02/2010_02_21.html), published on 21 February 2010. It caught my attention because of the overlap with the Sega TeraDrive Model 2. The photographs and hands-on observations belong to the original article, not to a teardown I performed. The translation is not the best, and I have not independently verified every technical statement.

### Rough translation

![](/assets/images/2020/img_0667.jpg)

After removing the cover of the genuine machine manufactured by IBM, PS/55 TYPE 5510-Z02. The upper elongated block is the power supply unit. This model has two FDDs, so no HDD is stored. The motherboard is of course dedicated, not a so-called Baby AT form factor.

\- Decaying compatible machine hobby (No. 32) (2010/02/21) \[PS/55 TYPE 5510 Anatomy\]

This series is also very rude, and more recently, it was ironic that "Omae's decadent compatible machine series has already been read!" . Well, of course, since it's a content that doesn't get more elaborate, it makes sense. Moreover, there is no useful information for people living in this era, and this is a waste of time. Nevertheless, the only reason to continue this series is as a senior crock ...

As previously announced, this is the anatomy of PS55 TYEP5510, an IBM genuine PC/AT compatible machine. That said, I just removed the lid and looked inside. Well, of course, it's quite different from modern machines, and it has a proprietary IBM-designed motherboard that has a completely different configuration than Baby AT machines that were common at the time. The ISA bus, which is a proof of AT compatible machines, is installed horizontally using a riser card from the motherboard, and there are only three slots. However, this motherboard has all the necessary Siripara I/O and video, so the small number of slots should not be a problem.

The main chips are listed below. Since it is an old machine of the 286 era, the chip consolidation has not been done much and the number of parts is very large. If you analyze the chip model number, you will get a vague idea of ​​the board configuration.

- N80286-12 286 CPU (Intel, 12 MHz, PLCC)
- C80287XL coprocessor (Intel)
- WD76C10LP-LR system controller (Western Digital)
- WD76C20-JU floppy disk controller (Western Digital)
- WD76C30-JU serial/parallel I/O and clock generator (Western Digital)
- WD90C10-LR VGA chip (Western Digital)
- iP8042AH keyboard controller (Intel)
- IMSG176P 6-bit palette DAC (Inmos)
- IBM 79F2661, unidentified (possibly the hard disk controller)

The devices were manufactured in the second half of 1990. Their functions are spread across several chips, mostly from Western Digital. The onboard memory is IBM-branded, with four 30-pin SIMM sockets for expansion. Those sockets were initially empty, but I installed some suitable modules left in the cupboard and got them recognised.

![](/assets/images/2020/img_0668.jpg)

Take a bird's eye view of the motherboard. The vertical connector in the center of the board is for inserting the riser card in the ISA bus slot. A rare battery for older motherboards, the CR2032 CMOS retention battery is common and can be replaced immediately. There was a stamp stamped on April 3, 1991 inside the case. .

![](/assets/images/2020/img_0669.jpg)

80286-12MHz CPU and 80287 coprocessor. Copro is an optional retrofit. The trace of the modified jumper line is vivid. Copro is a ceramic package and a gold lid, and is now a valuable item.

![](/assets/images/2020/img_0670.jpg)

Onboard main memory and 30Pin SIMM optional memory. At the time of product purchase, there was no memory in the SIMM socket. The onboard memory is genuine IBM. You can see the WD system controller chip, WD76C10, on the right side of the screen, and the keyboard controller i8042 on the left side.

![](/assets/images/2020/img_0671.jpg)

The chip at the bottom of the screen is WD76C30 for Siripara I/O and clock generator. At the top of the screen you can see the WD90C10 VGA chip, VRAM, DAC, etc. The colorful flat cable is a mysterious FDD connection cable. The reason for the mystery will be described later.

Jumper wires are flying around on the board. Even though it is a mother equipped with 80286. Even with just this much manual wiring, it would have increased the cost considerably. What's weird is the pin count of the FDD and HDD board-side connectors. Normally, a compatible cable uses a flat cable of 34 pins for FDD and a flat cable of 40 pins for HDD (IDE). However, for some reason, this board has a 40-pin connector for FDD and a 44-pin connector for HDD.

This model is only FDD type. I confirmed that even the FD drive is not a special specification, and the drive side is a general 34 Pin. Special specifications were on the cable. I don't know why, but the header of the flat cable that connects to the board is floating with 6 pins unused. Perhaps the cable that connects to the HDD has a similar mechanism. This part is a small part, but it is a little puzzling. I am very worried. I'm gonna worry about this! Even if it is said, I am worried. . .

By the way, the price at the time of release of this machine was 198,000 yen for the basic model of 5510-Z02. It was exceptionally cheap for an IBM genuine product. The HDD-equipped model had a 40MB IDE, but the price at the time of release was unknown. It must have been expensive. . . Next time, let's take a look at mysterious expansion cards. The metamorphosis of this card is panae ... !! !!

![](/assets/images/2020/img_0672.jpg)

Jumper wiring around the system control chip. Very detailed work is done.

![](/assets/images/2020/img_0673.jpg)

Riser card with 3 slots for ISA bus. From this, you can feel that this machine is a PC/AT compatible machine.

![](/assets/images/2020/img_0674.jpg)

It seems to have a riser card. Three full-size ISA expansion boards can be installed.

![](/assets/images/2020/ps_55_18.jpg)

Mysterious FDD connection cable. For some reason, the number of pins on the board header is 40 Pin. Since the cable itself is a common 34Pin, you can see that it does not use 6Pin (the right side of the connector). Why is that? Wake Wakaran... Perhaps it was reserved for signals when using a drive compatible with 3 modes, but it is strange that the IDE HDD has many pins... After all, it is an unreasonable assumption.

![](/assets/images/2020/img_0675.jpg)

When I was looking at the FDC WD76C20 data sheet, I found a block diagram very similar to the configuration of this machine. The only difference is the video DAC. If you use WD chips to harden it, it will look like this.

![](/assets/images/2020/img_0676.jpg)

For reference, the original article includes this IBM PC/AT Type 5170 motherboard for comparison. It has no onboard VGA or serial/parallel ports. The article's "1984" and "8 MHz" description should not be treated as an exact identification of this board: IBM's product reference distinguishes the 6 MHz 5170-068 from the 8 MHz 5170-319 and 5170-339.

### Sources

- [FunkyGoods / Schwarzschild Cafe - PS/55 TYPE 5510 解剖編 (21 February 2010)](https://funkygoods.com/schwarzschild/2010_02/2010_02_21.html)
- [IBM - Personal System/2 and IBM Personal Computer Product Reference, Version 4.0 (April 1987), page 49](https://bitsavers.org/pdf/ibm/pc/PS2_and_IBM_PC_Product_Reference_Version_4.0_Apr87.pdf)

### Related posts

- [Sega TeraDrive Model 2, Genesis Nomad and Mega Drive 2](/sega-teradrive-model-2-genesis-nomad-and-mega-drive-2/)
