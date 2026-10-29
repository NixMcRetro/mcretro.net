---
title: "NES Mainboard Capacitor Replacement - Mattel Version"
author: "Nix McRetro"
date: 2014-06-21T20:13:41.000+10:00
last_modified_at: 2026-10-22
categories: [nintendo, repairs, youtube]
---

{% include youtube.html id="F_YxoAKun_k" %}

There are only three electrolytic capacitors visible on the mainboard section I'm working on... but that doesn't stop me! There are more components hiding around the power and RF circuitry, so this isn't a complete recap.

I thought I'd give the NES a little preventative maintenance while everything was apart. Unfortunately, my first attempts with the soldering iron and desoldering braid weren't going particularly well. Eventually I went back to my trusty 40 W iron and managed to get things moving.

I'd recently bought a new soldering station and holder, which was a considerable improvement over the cheap little stands I'd been using. The trouble was that I was trying to do this job with a 20 W soldering iron. Apparently I've become so accustomed to the 40 W iron that I'd forgotten just how much longer the smaller one can take to get some of these joints moving!

At one point I decided I might as well unpack the Hakko desoldering gun. I'd been avoiding it because I didn't feel like setting up the step-down transformer. Eventually I realised that spending all evening fighting with braid was hardly a more sensible option. Out comes the Hakko!

The 1 uF and 100 uF capacitors were fairly straightforward to replace. The 2.2 uF component was another matter, because I didn't have the correct replacement available. I tried a 3.3 uF capacitor temporarily, although that's a fairly substantial change in capacitance and not something I'd recommend assuming is equivalent.

Nintendo thoughtfully marked the capacitor values and polarity on the board, which made identifying the replacements rather straightforward. Well done, Nintendo! I also managed to disturb a nearby ceramic capacitor while desoldering, so naturally I had another little joint to tidy up before continuing.

While working on the board, I also noticed something rather interesting about the security chip. One of its legs was missing! That explained the suspicious screw we'd noticed during the earlier disassembly. Somebody had apparently been inside this NES before and disabled the CIC lockout circuit.

The CIC normally communicates with the corresponding chip in a game cartridge. If that communication fails, the console can repeatedly reset, producing the familiar blinking power light. Removing the connection was one method people used to get around the lockout system.

Looking closely, it seemed that someone had gone to considerable effort to disable that particular connection. I was expecting a machine that had simply been opened before, not one with a previous modification hiding on the motherboard. That explains a few things!

After putting everything back together, however, I wasn't getting anything particularly useful from the NES. Just white screens! I even reinstalled the original 2.2 uF capacitor to rule out my substitute, but that didn't solve the problem either.

So I've ordered a replacement cartridge connector and a proper 2.2 uF capacitor. There's obviously more work to do before this Nintendo is behaving itself again. At least we now know what somebody did to the security chip, and I've got another excuse to pull the whole thing apart when the parts arrive. There's obviously more work to do before this Nintendo is behaving itself again.

**Related Posts**

- [NES Disassembly - Mattel Version](/nes-disassembly-mattel-version/)
- [NES Cartridge Slot Cleaning - Mattel Version](/nes-cartridge-slot-cleaning-mattel-version/)
