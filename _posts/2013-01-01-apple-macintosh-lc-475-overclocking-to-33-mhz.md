---
title: "Apple Macintosh LC 475: Overclocking to 33 MHz"
author: "Nix McRetro"
date: 2013-01-01T13:45:33.000+11:00
last_modified_at: 2026-11-02
categories: [apple, hacks, youtube]
---

{% include youtube.html id="GbJmgxy_Kb0" %}

A thirty percent increase in speed? Yes, please! This time I'm going to overclock the Apple Macintosh LC 475 from its standard 25 MHz to 33 MHz by changing two tiny surface-mount resistors on the logic board.

I did consider trying 40 MHz, but I didn't have the components needed for that modification. Besides, 33 MHz sounded like a perfectly respectable improvement without getting too greedy. It works out to roughly a 32% increase in clock speed, although that doesn't mean every application will suddenly become 32% faster.

With the logic board upside down, the modification involves moving the resistor at R21 to R24 and the one at R25 to R22. Simple enough on paper. Unfortunately, the components are absolutely tiny and my available soldering equipment was rather less delicate than the job deserved.

I was using a 40 W soldering iron rather than a proper fine-tipped soldering pencil. One pad started lifting, the resistors were reluctant to cooperate and my soldering wasn't exactly going to win any awards. I'd actually attempted a similar modification as a teenager, without much success, so apparently I hadn't learnt everything in the intervening years.

Eventually both resistors were in their new positions. The joints weren't pretty, but it was time to put the machine back together and see whether my handiwork had achieved anything other than making a mess.

{% include youtube.html id="YgzQLAsQmcg" %}

Benchmarks! Everybody loves a good before-and-after benchmark, especially when the machine actually boots after you've attacked its motherboard with a soldering iron.

For the initial testing I left the original 25 MHz-rated 68LC040 installed, now running at 33 MHz with a heatsink attached. I'd taken some benchmark readings before the modification, including scores of 2699 and 2702. After the overclock, the corresponding runs came back at approximately 3567 and 3862.

Speedometer told much the same story. Depending on the test, the machine was generally around 20 to 30% faster, with some variation between CPU, maths and graphics results. The disk result was a little less impressive, but I was using CompactFlash storage and wasn't about to complain too loudly about a silent drive with a couple of gigabytes of space.

So that earlier claim about a 15 to 30% performance improvement wasn't entirely pulled out of thin air. Those were the sorts of gains I was seeing on my own machine, rather than a guarantee for every LC 475 in existence.

The next part of the experiment was the processor upgrade. The original 68LC040 doesn't have a floating-point unit, and I'd specifically bought a full 68040 to remedy that. Since the replacement was rated for 40 MHz, running it at 33 MHz shouldn't have been asking too much of it.

{% include youtube.html id="4_t4jBz-Jts" %}

Dude, where's my FPU? The replacement processor booted the machine and produced benchmark results, but I couldn't find the floating-point unit I was supposed to have gained. The results looked remarkably similar to those from the original LC chip, and the system still appeared to identify itself as having an LC processor.

My immediate suspicion was that I'd bought a counterfeit or remarked CPU. Blighters! I was sufficiently annoyed to start thinking about a PayPal dispute, although the testing shown here doesn't conclusively establish what was wrong. A defective processor or a compatibility or detection issue could also explain what I saw.

The important thing is that the replacement never demonstrated the FPU functionality I'd bought it for. That part of the experiment was disappointing, but at least the LC 475 itself was running happily at 33 MHz.

Baby steps. One successful overclock and one mysterious processor are quite enough for New Year's Day.

### Sources

- [Apple: Macintosh LC 475 Specifications (Stock 25 MHz 68LC040)](https://support.apple.com/en-la/112204)
- [NXP: MC68040 Processor (Integrated FPU)](https://www.nxp.com/products/MC68040)

### Related Posts

- [Apple Macintosh LC 475: Removing the Socketed CPU](/apple-macintosh-lc-475-removing-the-socketed-cpu/)
- [Apple Macintosh LC 475: Modifications Overview](/apple-macintosh-lc-475-modifications-overview/)
