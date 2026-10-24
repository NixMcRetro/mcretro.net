---
title: "VL400C-I 486 Motherboard Failure"
author: "Nix McRetro"
date: 2013-01-18T10:52:36.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs, youtube]
---

{% include youtube.html id="7y1TBTKKTvs" %}

Here I try to get an old VL400C-I 486 motherboard going. So much hope. Two other 486 boards had already been scrapped, and I had pinned my hopes on this one finally giving me somewhere useful to install the growing pile of ISA cards.

The plan was to put together a spare 486 machine from whatever parts I still had lying around. I fitted a DX2-66 processor, 8 MB of RAM, a Trident 9000 video card and a hard drive and floppy controller. There were plenty of other cards to choose from, but getting a reliable motherboard was proving to be the difficult part.

Two of my earlier boards had suffered battery leakage around the keyboard connector, which more or less put an end to their usefulness. This one looked a little more promising, although I still wasn't completely sure about all the jumper settings. There were quite a few of them to work through.

The machine initially started up, and I was hopeful that it might finally become a working DOS computer. Then I tried running memory diagnostics. MemTest and GoldMemory were both producing strange results or causing the machine to hang, which was rather less encouraging.

I experimented with different memory modules, but that didn't completely explain the problem. Eventually I found a jumper relating to the Gate A20 arrangement, with settings for a fast implementation or one using the keyboard controller. Changing that setting seemed to stop the errors during the next round of testing.

That was exciting for about five minutes. With the diagnostics running properly, I thought I might finally have somewhere to put my collection of ISA sound and network cards. I even started thinking about finding a suitable case for the machine.

Unfortunately, the improvement didn't last. The motherboard would intermittently stop recognising extended memory, sometimes after nothing more than a restart. Without reliable extended memory, there wasn't much point trying to install something like Windows 95. Another dead end!

I never established whether the underlying problem was in the memory controller, the RAM sockets or another part of the board. Whatever was happening, the machine wasn't reliable enough for what I wanted to do with it.

Sometimes dead is all the evidence you get. Unfortunately this board joined the others on the scrap heap, while the useful processors and ISA cards went back into the parts collection.

For now, the ISA-card collection remains homeless. At this rate I'm going to run out of motherboards before I run out of things to plug into them!
