---
title: "Sega TeraDrive Model 3 - Faulty Power Supply (Part 5)"
author: "Nix McRetro"
date: 2019-12-24T09:24:40.000+11:00
last_modified_at: 2026-10-22
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="m_oP07ZiVmM" %}

We're well into summertime here in Sydney, Australia. Time to throw another shrimp on the barbie, as they say. Not much relevance to this video, especially considering how long this repair has been waiting to be finished!

The capacitors have now been replaced, and it's time to finish the soldering before giving the TeraDrive another test. Two of the particularly suspicious components were rated at 3300 µF and 6800 µF, both at 10 V. Those were among the capacitors showing signs of trouble.

Unfortunately, the surrounding corrosion had left some of the solder connections in rather poor condition. One of the pads was especially troublesome, so I spent some time ensuring the component was properly connected before reassembling the power supply.

And then came the moment of truth. Power on, listen carefully, and see whether the TeraDrive will start. Unfortunately, although there were no immediate signs of anything burning, the machine still wasn't producing a useful display.

Out came the multimeter again. The 12 V rail was now measuring approximately 12.1 V under load, which was considerably more encouraging than the earlier results. The 5 V rail, however, was another matter entirely.

At one point I measured around 4.83 V, with the voltage occasionally falling towards 4.73 V. The readings weren't particularly stable, and the original failure to start remained. So the capacitor replacement appears to have improved part of the power supply's behaviour without fixing the whole problem.

I tried a known-working power supply for comparison, and the TeraDrive produced video again. That was an encouraging result for the rest of the machine, but rather less encouraging for my original power supply!

After all this experimenting, I decided it might be wiser to replace the troublesome supply with a suitable modern enclosed unit rather than keep chasing faults around the original circuitry. I started looking at Mean Well RD-65A supplies for that purpose.

So there we have it. A considerable amount of soldering, some genuine capacitor damage discovered, and a partial improvement in the voltage readings. Unfortunately, no successful repair of the original power supply.

Sometimes you just have to know when to stop. Although apparently I haven't quite learnt that lesson yet!

### Related posts

- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 4)](/sega-teradrive-model-3-faulty-power-supply-part-4/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 6)](/sega-teradrive-model-3-faulty-power-supply-part-6/)
