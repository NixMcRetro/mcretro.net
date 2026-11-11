---
title: "Apple Macintosh LC 475: Checking CPU Capabilities"
author: "Nix McRetro"
date: 2013-06-01
last_modified_at: 2026-10-20
categories: [apple, reconstructed, youtube]
share_description: >-
  A supposedly full 68040 in an LC 475 reports no FPU in TattleTech. The 33 MHz Mac still runs, but what exactly was inside that replacement CPU? 🍎
---

{% include youtube.html id="rafNQf4PCh4" %}

The LC 475 is back for another round of experimentation! Remember that supposedly full 68040 processor I bought to replace the original 68LC040? The whole point was to gain the floating-point unit missing from the original processor, but things haven't been going quite according to plan.

This time I'm using TattleTech to investigate exactly what the Macintosh thinks is installed. I've already had the machine running at 33 MHz, and I've got the jumper set so it identifies as a Quadra rather than an LC. Time to see what this replacement processor actually has to offer.

TattleTech has quite a useful collection of hardware information, but there's one entry I was particularly interested in: the FPU. Unfortunately, it reports **None**. So much for that supposedly full 68040! Where's my FPU?!

I've also got a temporary heatsink sitting on the processor, although it isn't properly attached. The chip doesn't seem particularly warm at the moment, but that's hardly the result I was hoping to get from this experiment.

Whether I've ended up with a mislabelled processor, a defective chip or something else entirely is another question. I can't really declare it counterfeit just because the results aren't what I wanted, but it's certainly suspicious. I'd like to get hold of a known-working full 68040 and test that in the same machine, just to see what happens.

At least the LC 475 itself has been taking all these experiments rather well. If only the processor would cooperate! In the meantime, I've got a few more CompactFlash cards to play with, including an 8 GB one that should make for another interesting experiment.

### Related Posts

- [Apple Macintosh LC 475: Removing the Socketed CPU](/apple-macintosh-lc-475-removing-the-socketed-cpu/)
- [Apple Macintosh LC 475: Overclocking to 33 MHz](/apple-macintosh-lc-475-overclocking-to-33-mhz/)
- [Apple Macintosh LC 475: Modifications Overview](/apple-macintosh-lc-475-modifications-overview/)
