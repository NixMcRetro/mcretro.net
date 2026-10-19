---
title: "Photographing the Sega Saturn Collection"
author: "Nix McRetro"
date: 2012-08-27T08:52:03.000+10:00
last_modified_at: 2026-10-20
categories: [devkit, sega, youtube]
---

![](/assets/images/2012/img_0255.jpg)

![](/assets/images/2012/img_0256.jpg)

Sophia is still out and about. Today I gave her a careful dusting with a paintbrush to remove the top layer of smoky dust. She looks considerably cleaner now. You won't see that in the photos above though. Those were taken before the cleaning.

![](/assets/images/2012/img_0248.jpg)

![](/assets/images/2012/img_0249.jpg)

![](/assets/images/2012/img_0250.jpg)

I've also started retaking photographs of my Saturn hardware. I had far too many pictures of chips taken from strange side angles.

Clearly the best way to photograph a microchip is from above.

I managed to document both of my Model 1 Saturns with VA0 mainboards as well. There are many more photos in the [photo gallery](/goodies/).

![](/assets/images/2012/img_0254.jpg)

![](/assets/images/2012/img_0252.jpg)

![](/assets/images/2012/img_0251.jpg)

![](/assets/images/2012/img_0253.jpg)

One thing that really stands out on the VA0 is the size of the mainboard and the fact that the controller ports are integrated directly onto it. I also spotted a `9524` marking, which I interpreted as a date code for the 24th week of 1995.

But while I had the machine apart, I noticed something extremely familiar. The separate SH-1 CD-processing board looked remarkably like the one inside my Sega Saturn Sophia development unit.

Time for a side-by-side comparison!

{% include youtube.html id="MUfzJHk7atc" %}

At first glance, the two SH-1 boards looked identical. Same general layout, same components, and very little to distinguish them.

Then I spotted a difference. Hitachi had moved its logo on one of the chips! Well, there goes my claim that they're completely identical.

The Sophia board also has a serial-number marking on the back, which distinguishes it from the retail Saturn board.

More importantly, the similarities suggested that the CD hardware might be interchangeable between the early VA0 Saturn and the Sophia. The connecting cable looked promising, and the CD mechanisms appeared to be much the same.

I even started trying to explain how the cable connected through the Sophia's other boards, including its SCSI-related hardware and the BCD board, before completely forgetting what I was talking about. Excellent technical commentary on my part.

Of course, looking alike doesn't necessarily mean everything is electrically compatible. I hadn't actually tested swapping the SH-1 boards or CD mechanisms at this stage, and Sophia was still missing her two SH-2 processor cards.

Still, with so little documentation available for these development units, I thought the comparison was worth recording. At least we have another useful clue about how closely related the early Saturn hardware is to Sophia.

### Related posts

- [Sega Saturn Sophia Development Kit: Internal View](/sega-saturn-sophia-development-kit-internal-view/)
- [Sega Saturn Sophia and VA0 Parts Compatibility Test](/sega-saturn-sophia-and-va0-parts-compatibility-test/)

### Sources

- [ConsoleMods - Saturn Model Differences](https://consolemods.org/wiki/Saturn:Saturn_Model_Differences) - documents the separate CD-processing daughterboard arrangement used in early VA0 Saturn hardware.
