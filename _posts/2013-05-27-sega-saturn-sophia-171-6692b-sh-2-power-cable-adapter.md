---
title: "Sega Saturn Sophia 171-6692B SH-2 Power Cable Adapter"
author: "Nix McRetro"
date: 2013-05-27T04:44:44.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, repairs, sega]
share_description: >-
  Sophia's 171-6692B SH-2 boards lack the usual power header. A custom cable adapts the 2.0 mm connectors so these unusual CPU cards can work. 🔌
---

![Front view of a Sega Saturn Sophia programming box with its orange power switch glowing and a black disc drive mounted on top.](/assets/images/2013/img_0403.jpg)

*Sophia looking respectable again from the front. The unusual SH-2 power wiring is hidden inside the box.*
{: .media-caption }

Any other console, I probably wouldn't bother mentioning this, but since it is Sophia, she gets a mention. My 171-6692B SH-2 CPU cards are not quite the same as the better-documented 171-6692D boards. Most importantly for this particular problem, they are missing the second power header used by the usual Sophia Programming Box arrangement.

The 171-6692B boards do have another header available, but its pin pitch is 2.0 mm rather than the 2.54 mm pitch commonly found on PC-style connectors. So I made a short adapter cable to connect the Sophia's power lead to the available headers on these CPU boards. A little heatshrink around my fantastic solder job and she works a charm.

![Homemade four-wire adapter cable on a white worktop, with red, white, green and black leads joined under black heatshrink.](/assets/images/2013/img_0404.jpg)

*Here's my little four-wire adapter. The heatshrink is doing its best to make those solder joints look respectable!*
{: .media-caption }

![Close-up of a Sega 171-6692B SH-2 CPU card inside Sophia with red-and-black power wires spliced into the small white board connector.](/assets/images/2013/img_0405.jpg)

*The improvised power wiring attached to one of the 171-6692B SH-2 cards. Not factory-fresh, but it fits the available header.*
{: .media-caption }

Visually, the differences between the 171-6692B and 171-6692D are easy to spot. The B revision lacks the second power header and the two jumper blocks normally seen beside the processors on the D revision.

![Close-up of a green Sega 171-6692B CPU card with a Hitachi SH7095 processor, small white CN3 connector and adapted red, black and white leads.](/assets/images/2013/img_0406.jpg)

*A clearer look at the SH7095 and CN3 connector on the 171-6692B card. The adapter is tucked in beside the chip.*
{: .media-caption }

More Sophia devkit photos can be found in the [Photo Gallery](/goodies).

### Related Posts

- [Sega Saturn Sophia SH-2 CPU Cards: 171-6692B vs 171-6692D](/sega-saturn-sophia-sh-2-cpu-cards-171-6692b-vs-171-6692d/)
- [Sega Sophia Target Box PAL Switch Settings and Hardware Notes](/sega-sophia-target-box-pal-switch-settings-and-hardware-notes/)
