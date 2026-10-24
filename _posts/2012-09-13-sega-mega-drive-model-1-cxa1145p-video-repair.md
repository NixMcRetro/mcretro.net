---
title: "Sega Mega Drive Model 1 CXA1145P Video Repair"
author: "Nix McRetro"
date: 2012-09-13T21:16:09.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega]
---

{% include youtube.html id="bA2IFh3eIJM" %}

Success! Replacing the Sony CXA1145P video encoder fixed the yellow and green flickering completely. This was the Mega Drive that behaved badly from a cold start and then settled down after warming up. As you can see in the original footage, Knuckles was having something of a disco party before I started pulling the machine apart.

I'd ordered a couple of replacement CXA1145P chips to find out whether the encoder was responsible for the problem. Sony designed this chip to convert the Mega Drive's analogue RGB signals into composite video, so it seemed like a reasonable suspect. Of course, ordering a replacement and actually getting the old chip off the motherboard are two very different things!

Unfortunately, I was working away from home and didn't have all my usual equipment available. My soldering iron had a rather questionable neck, I was short on desoldering braid and the Hakko 808 vacuum desoldering tool would have been particularly useful. Getting that 24-pin DIP chip out of the board turned into quite an adventure.

The old chip didn't survive the removal particularly gracefully. Some of its legs broke off and remained stuck inside the PCB holes, which made fitting the replacement much more difficult. I eventually cleared enough of the connections to get the new chip installed, although I also managed to lift a trace around the third pin. Marvellous!

Fortunately, the connection continued through to the other side of the board, so I was able to work around the damaged area and finish soldering the replacement. The new chip looked slightly different from the original, which made me wonder about its origins, but its appearance alone wasn't going to tell me whether it worked. Only one way to find out!

Back together went the Mega Drive, with Sonic & Knuckles ready for the test. Power on, and would you believe it? No more flickering reds, no more strange colour changes and Knuckles was behaving himself again. The picture looked lovely and stable, even after all the trouble I'd had getting that chip onto the board.

Since the flickering disappeared after replacing the CXA1145P, the original encoder is the strongest culprit in this particular repair. I can't say exactly what failed inside the old chip, and the same symptoms on another Mega Drive could have a different cause. Still, at around five dollars for the replacement, it was a rather satisfying gamble.

I broke the repaired Mega Drive in with some Metallic Uniframe Super Hybrid Armor. I'd also noticed some solder joints underneath that suggested somebody might have modified this machine before me. Nothing too surprising there, given the age of these things and the adventures they've probably had.

![](/assets/images/2012/img_0261.jpg)

![](/assets/images/2012/img_0260.jpg)

![](/assets/images/2012/img_0259.jpg)

![](/assets/images/2012/img_0258.jpg)

![](/assets/images/2012/img_0257.jpg)

As you can see, complete success, even with the fairly limited tools I had on hand. I could really have used my Hakko 808 vacuum desoldering tool for removing that 24-pin DIP cleanly. It would have made life considerably easier, but at least this Mega Drive is back to producing a beautiful picture. If only my Sega Saturn repairs went this well!

**Related Posts**

- [Sega Mega Drive Video Flicker and the Sony CXA1145P](/sega-mega-drive-video-flicker-and-the-sony-cxa1145p/)

**Sources**

- [Sony CXA1145P datasheet](https://datasheet4u.com/datasheet-pdf/Sony-Corporation/CXA1145P/pdf.php?id=199042) - documents the CXA1145P as an RGB encoder producing composite video.
- [Hakko 808 Desoldering Tool documentation](https://www.hakko.com/english/products/hakko_808.html) - identifies the Hakko 808 as a vacuum desoldering tool.
