---
title: "Sega Saturn Sophia A-Bus Capacitor Replacement"
author: "Nix McRetro"
date: 2013-04-05T03:32:41.000+11:00
last_modified_at: 2026-10-22
categories: [repairs, sega, youtube]
---

{% include youtube.html id="PSiZzTdsUVw" %}

The lovely Sophia is getting a fresh set of capacitors on the A-Bus board today. That's board 171-6834C, revision 0.7, and I've got the Hakko 808 ready for another evening of desoldering.

There are six main electrolytic capacitors to remove, all rated at 220 uF and 10 V. Fortunately, the Hakko made relatively short work of clearing the holes, and the old components came out without too much trouble. I really do enjoy using that thing!

I've got a whole collection of replacement capacitors ready for this job, so hopefully I'll have enough for the other boards too. The six main capacitors are easy enough to identify, and it's rather satisfying seeing them come out without having to spend half the evening fighting with desoldering braid.

The original components all have their negative sides facing towards the rear of the machine, which makes checking the replacements relatively straightforward. I also made a note of their positions before soldering everything in. There's nothing quite like installing a capacitor backwards to make a simple repair considerably more interesting.

With the old capacitors removed, I installed the replacements and checked their polarity against the markings on the board. I also left a little space beneath them rather than pushing every component completely flush against the PCB.

It's quite nice seeing the new Rubycon capacitors sitting neatly in their places. I deliberately left a small gap beneath them, so if anything ever went wrong in the future it might be easier to spot. Some were sitting a little higher than the others, but that's fine by me.

Just when I thought everything was finished, I spotted another capacitor I'd missed. C1 was a smaller 10 uF, 16 V component. Fortunately, I had a spare, so that one was replaced too.

I was looking forward to seeing whether replacing all these capacitors would make any difference to Sophia's original problem. The board looked considerably tidier after the work, and I still had plenty more capacitors waiting to go into the other sections of the machine.

After reassembling Sophia, it was time for the moment of truth. Unfortunately, the original fault was still there. We had power, the fan was spinning and the board LEDs were doing their thing, but the machine wasn't behaving any better.

The front panel still had its blinking indicator, while the main power light remained on. There were red LEDs visible on the A-Bus board and the mainboard too, but none of that was particularly useful in telling me why the machine wasn't starting properly.

So the A-Bus capacitor replacement didn't solve the problem. That is still useful information, because it gives me another reason to investigate the mainboard next. There are plenty more capacitors waiting for my attention down there.

**Related Posts**

- [Sega Saturn Sophia Programming Box Mainboard Repairs](/sega-saturn-sophia-programming-box-mainboard-repairs/)
- [Sophia Systems Sega Saturn Programming Box: Capacitor Restoration Complete](/sophia-systems-sega-saturn-programming-box-capacitor-restoration-complete/)
