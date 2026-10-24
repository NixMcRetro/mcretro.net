---
title: "Original Xbox Clock Capacitor Cleanup and Repair"
author: "Nix McRetro"
date: 2013-05-09T04:00:35.000+10:00
last_modified_at: 2026-10-18
categories: [microsoft, repairs, youtube]
---

{% include youtube.html id="D56_9VYWIIU" %}

Back to the original Xbox from the previous assessment. The leaking clock capacitor has now become an actual repair rather than just something horrible to point at. I've been replacing the affected capacitors on the motherboard, and it's looking considerably more respectable than it did with a random 9 V battery and assorted wires rattling around inside!

The original clock capacitor was a 2.5 V, 1 F "super" capacitor, and it had made quite a mess of the surrounding board. I fitted a replacement and also changed several nearby electrolytic capacitors, using Panasonic replacements for some of the work. I had a few spare capacitors left over from a multipack, so naturally I found a use for those too.

Most of my attention went to the area around the leaking capacitor. There was corrosion on both sides of that section of the motherboard, and some of it proved rather difficult to remove. I cleaned things up as best I could, although I wasn't particularly keen on damaging more components while trying to make it look perfect.

We did have one casualty along the way. A tiny component marked C7G7 had disappeared from the board, presumably during the cleaning and repair work. Wonderful! I couldn't immediately tell what effect its absence might have, so the sensible thing was to finish inspecting the board and see whether the Xbox would actually start.

The important part of a leaking clock capacitor repair isn't simply removing the failed component. Its alkaline leakage can attack nearby copper traces and component leads over time, so the surrounding motherboard needs attention too. On a pre-1.6 Xbox like this one, the original clock capacitor isn't required for normal hardware operation, although older BIOS and softmod configurations can have their own clock-related complications.

With the capacitors replaced, I put everything back together for the first proper power-on test. I hadn't actually powered up this Xbox before the repair, so I wasn't entirely sure what to expect. Fortunately, the machine started, the fans came to life and we had a picture on the television. That's considerably better than a motherboard covered in corrosion!

But could it play games? Of course, that was the important question. I gave Burnout Revenge a go and it worked! Lots of crashing, flames and thoroughly enjoyable automotive destruction. Unfortunately, I managed to lose the gameplay recording, so the video only has a couple of screenshots to show for it. Typical!

There are still other things I want to do with this Xbox, including some TSOP flashing experiments. For now, though, we've gone from a suspicious collection of wires and leaking capacitors to a machine that actually boots and plays Burnout Revenge. I'll take that!

**Related Posts**

- [Original Xbox Initial Damage Assessment](/original-xbox-initial-damage-assessment/)
- [Original Xbox Softmod to TSOP Flash Project](/original-xbox-softmod-to-tsop-flash-project/)

**Sources**

- [ConsoleMods Wiki - Xbox Clock Capacitor](https://consolemods.org/wiki/Xbox:Clock_Capacitor) - documents the alkaline leakage problem and trace damage associated with the older clock capacitors.
