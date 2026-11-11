---
title: "Apple Macintosh LC 475: Removing the Socketed CPU"
author: "Nix McRetro"
date: 2012-12-31T13:43:52.000+11:00
last_modified_at: 2026-11-02
categories: [apple, repairs, youtube]
share_description: >-
  Removing the socketed 68LC040 from a Macintosh LC 475 makes way for a full 68040 experiment. Careful levering beats bent pins, and cooling needs attention too. 🍎
---

{% include youtube.html id="IcpjLEVPcMs" %}

Here's a quick demonstration of how to remove the socketed processor from an Apple Macintosh LC 475. Unlike a CPU soldered directly to the logic board, this one can be removed and replaced without turning the whole exercise into a major soldering project.

I'm using a flat-blade screwdriver, carefully working it into the gap between the processor and its socket. The trick is to lift one side a little, move around to another side and keep working evenly until the chip comes free. It's tempting to lever one side straight out, but bent processor pins would rather spoil the fun.

The original 68LC040 was surprisingly hot when I removed it. I was replacing it with a full 68040, which should give me the floating-point unit missing from the original LC processor. At least, that was the plan when I bought the replacement.

Once the new CPU was seated properly, I borrowed the old heatsink and used some thermal paste for the initial testing. I intended to sort out a more permanent attachment using suitable thermal adhesive later. This was a quick experiment, not an invitation to leave a loose heatsink rattling around inside a Macintosh.

So that's the CPU swap. The next experiment is to get the LC 475 running at 33 MHz and see what happens.

### Sources

- [Apple: Macintosh LC 475 Technical Specifications (Stock 68LC040)](https://support.apple.com/en-la/112204)

### Related Posts

- [Apple Macintosh LC 475: Overclocking to 33 MHz](/apple-macintosh-lc-475-overclocking-to-33-mhz/)
