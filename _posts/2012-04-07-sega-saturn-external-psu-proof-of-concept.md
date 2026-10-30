---
title: "Sega Saturn External PSU - Proof of Concept"
author: "Nix McRetro"
date: 2012-04-07T04:52:52.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, repairs, sega]
---

{% include youtube.html id="TkwPwoOMudo" %}

Success! It sure does taste sweet. After the trouble I've been having with ageing Sega Saturn power supplies, I've managed to get an early Saturn running without its original internal PSU. This is only a rather messy proof of concept, but it's good enough to show that an external DC-powered arrangement is possible.

At the moment I've got two external supplies and a collection of temporary wiring feeding the Saturn's required rails. The original arrangement needs 9 V, 5 V, and 3.3 V, although the equipment I'm experimenting with isn't exactly ideal. One supply is a cheap iPod-style adapter with a rather broad output range, and the nominal 3.3 V connection is measuring closer to 4.4 V. That's considerably higher than I'd like!

The 5 V source also has less current capacity than the original supply arrangement calls for. I'm not going to pretend this collection of adapters is suitable for permanent use, but I wanted to establish whether the Saturn would respond before spending money on proper DC-DC converters.

With everything connected, the console powers up and the CD mechanism responds to a disc. That's a very welcome result considering there's no original PSU inside the machine. I'll need better regulated supplies with adequate current capacity before thinking about a permanent replacement.

{% include youtube.html id="KqML5KnUJqI" %}

Here's the follow-up test with the Saturn connected to a display. The machine boots, reaches its normal interface, and recognises an audio disc, which is considerably more encouraging than simply seeing the power light come on.

I'm still conscious that the temporary supplies aren't correctly rated for extended operation, but at least I know the idea is worth pursuing. My next step is to invest in proper converters and build something a little more respectable.

Now I can sleep at night without worrying quite so much that all my Model 1 Saturns are destined to die when their original power supplies fail. Well, assuming the rest of the hardware chooses to cooperate!

**Related Posts**

- [Sega Saturn Model 1 Power Supply Issues](/sega-saturn-model-1-power-supply-issues/)
- [Sega Saturn External PSU DC-DC Converter Test](/sega-saturn-external-psu-dc-dc-converter-test/)

**Sources**

- [Sega-16 Forums - Sega Saturn Revisions and Models Guide](https://www.sega-16forums.com/forum/general-discussion/tech-aid/24084-sega-saturn-revisions-and-models-guide/page4) - documents early Saturn PSU rail arrangements and revision differences.
