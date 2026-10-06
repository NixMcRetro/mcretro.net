---
title: "Original Xbox Clock Capacitor Cleanup and Repair"
author: "Nix McRetro"
date: 2013-05-09T04:00:35.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [microsoft, repairs, youtube]
---

Back to the original Xbox from the previous assessment. The leaking clock capacitor has now become an actual repair rather than just something horrible to point at.

{% include youtube.html id="D56_9VYWIIU" %}

The important part is not simply removing the failed capacitor. Its alkaline leakage can attack nearby copper traces and component leads over time, so the surrounding motherboard needs to be inspected and cleaned as well.

On a pre-1.6 Xbox like this one, the clock capacitor itself is not required by the hardware for normal operation. Older BIOS or softmod setups without the clock-loop fix can still need a software update. The console will lose its stored time after being unplugged, but that is vastly preferable to allowing the failed capacitor to continue eating the motherboard.

Progress!

There is still more to do before this machine reaches the important stage of the repair: actually playing games again.

### Related posts

- [Original Xbox Initial Damage Assessment](/original-xbox-initial-damage-assessment/)
- [Original Xbox Softmod to TSOP Flash Project](/original-xbox-softmod-to-tsop-flash-project/)

### Sources

- [ConsoleMods Wiki - Xbox Clock Capacitor](https://consolemods.org/wiki/Xbox:Clock_Capacitor) - documents the alkaline leakage problem and trace damage associated with the older clock capacitors.
