---
title: "27C1024 EPROM Dumping with the MiniPro TL866"
author: "Nix McRetro"
date: 2019-02-01T07:42:35.000+11:00
categories: [guides, programming, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="ZfEeTAFjEug" %}

Ah yes, the ways of the 16-bit chip. Here we dump a Mega-CD BIOS several times to make sure we're getting consistent reads. It's also a good idea to reseat the chip between dumps, giving the socket contacts another chance to betray you if something isn't making a clean connection.

The programmer for this experiment is my MiniPro TL866CS, which I've used for quite a few different EPROM and microcontroller projects. It's a fairly small USB device, but it can handle an impressive collection of chips. Thankfully, the AMD 27C1024 is one of them.

The chip itself arrived from somebody on ASSEMbler Games, who wanted to check an existing Sega CD BIOS dump. There were a couple of slightly bent pins from its journey through the post, so I straightened those before putting the EPROM into the programmer.

The 27C1024 is a 16-bit EPROM in a 40-pin DIP package. That makes it rather different from the smaller 8-bit devices I've worked with in other projects, but the process is much the same once the correct chip has been selected in the software.

I was running the MiniPro software under Windows XP, which is always a pleasant trip back in time. The software lets you choose the manufacturer and part number, then shows where the device should sit in the programmer's socket. After checking the orientation, I hit Read and hoped for the best.

The first read completed successfully, and the data appeared in the buffer. Looking through the contents revealed a Sega CD boot ROM, version 1.10. That's a good sign, although it doesn't necessarily tell me whether every byte has been read correctly.

The next step was saving the file and reading the chip again. I like doing several independent reads of these older devices because a bad contact or marginal chip can occasionally produce inconsistent data. There's not much point archiving a BIOS if the file changes every time you read it!

Once the files have been saved, they can be compared with a hex editor. I normally use Hex Fiend on the Mac for this sort of thing, although there are plenty of other tools available. If the repeated dumps match, that's rather more reassuring than relying on a single successful message from the programmer.

Mind you, I was quite happy to see the TL866CS support the 27C1024. The MiniPro has its limitations with certain larger devices, but this one was a relatively straightforward job once I'd got everything connected.

Now that everyone has recovered from the NSFW Dreamcast controller unboxing video, it's back to business as usual. Unfortunately though... my studies are fast approaching. We'll see what I can get done before the end of February at any rate.

**Update 23rd August 2021:** You can also use the open-source command-line tool [minipro](https://gitlab.com/DavidGriffith/minipro/) with the TL866 family. It's separate from the MiniPro software supplied with the programmer. Great news for those of us on a Mac or Linux-powered machine!

**Sources**

- [David Griffith - minipro: open-source TL866 programmer software](https://gitlab.com/DavidGriffith/minipro/)
