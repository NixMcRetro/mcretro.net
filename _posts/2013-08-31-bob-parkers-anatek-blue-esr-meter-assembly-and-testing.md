---
title: "Bob Parker's AnaTek Blue ESR Meter: Assembly and Testing"
author: "Nix McRetro"
date: 2013-08-31T22:46:25.000+10:00
last_modified_at: 2026-10-18
categories: [guides, youtube]
---

{% include youtube.html id="Lq9-9A8kn8Q" %}

Here are the final steps of assembly and testing of my new Bob Parker Blue ESR meter from AnaTek. It can measure many capacitors for their equivalent series resistance (ESR) while they are still in the circuit! The low test voltage helps keep ordinary semiconductor junctions from conducting during a measurement.

I picked this one up as a kit from the United States for around $79, before shipping. After assembling the board and getting everything into its little blue case, I thought I'd give it a proper workout with some of the capacitors I've removed from previous repair projects. There certainly isn't any shortage of those around here!

The first thing I wanted to understand was the meter's display and the reference chart printed on the front. Different capacitor values have different expected ESR ranges, so the numbers don't mean very much unless you know what you're comparing them against. Fortunately, the chart makes that part reasonably straightforward.

I've got a collection of removed electrolytics, including some from the Sega Saturn Sophia development hardware. A few are quite obviously past their best, while others still look perfectly reasonable. The interesting part is seeing how the measurements compare with their condition.

One of the capacitors had leaked enough material to leave a rather unpleasant crust around its legs. Curiously, its ESR reading wasn't especially alarming. Just because a capacitor gives you a reasonable number on one test doesn't mean it's healthy in every other respect. I wouldn't be putting that one back into anything!

Some of the larger 470 uF capacitors also produced interesting comparisons. I measured older parts and newer Rubycon replacements, with several of the older components giving noticeably higher readings. Others were closer to the reference limits than I'd like. It's useful having a tool that can help sort out the questionable ones.

I spent a bit of time trying to get the camera to focus on the display, which naturally proved almost as difficult as assembling the meter in the first place. At least the numbers were doing what they should. I think the camera was enjoying the experiment considerably less than I was.

One of the selling points of the Blue ESR meter is that many measurements can be made without first removing the capacitor from the circuit. That's particularly handy when you've got an entire board full of components to investigate. It isn't a magic answer to every fault, but it should save a fair bit of unnecessary desoldering.

Capacitors should still be discharged before testing, and an ambiguous in-circuit result may need a capacitor removed for further investigation. No more removing capacitors? Well, fewer, unless I'm in the mood, of course!

I'm rather pleased with this little instrument. Next time Sophia or one of her sisters develops another mysterious fault, at least I'll have something useful to measure with instead of immediately replacing every capacitor in sight.

**Sources**

- [Bob Parker and Alltronics/AnaTek - Blue ESR Meter Kit Assembly, Use & Troubleshooting Manual (May 2024 edition, hosted copy)](https://manuals.plus/m/de1ab2bcb96fda46b2015c3cd9b3aee9bdb5b7727ff944b908d73a81ac5070f4_optim.pdf)
