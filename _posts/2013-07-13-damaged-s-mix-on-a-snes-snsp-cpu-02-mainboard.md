---
title: "Damaged S-MIX on a SNES SNSP-CPU-02 Mainboard"
author: "Nix McRetro"
date: 2013-07-13T19:14:56.000+10:00
categories: [nintendo, repairs]
---

![](/assets/images/2013/img_0411.jpg)

As you can see there is a hole blown through the S-MIX chip at U10. The following repair attempt will proceed in the next few weeks.

```
     +---+--+---+
1OUT |1  +--+ 14| 4OUT
-1In |2       13| -4In
+1In |3       12| +4In
VCC  |4       11| VEE
+2In |5       10| +3In
-2In |6        9| -3In
2OUT |7        8| 3OUT
     +----------+

```

Above is the pinout of the LM324. I am hoping the S-MIX chip is the same. I'll be able to test and compare outputs from a known working S-MIX chip and from a known working LM324. With a bit of luck, they will be pin compatible and we'll have sound.

Reasons it might work - both chips tend to be at location U10. LM324 was last seen in the PAL region on SNSP-CPU-02 (as far as I can tell). S-MIX A appeared on the next revision. Does S-MIX have some changes under the hood? Or was it simply masked? Time will tell. Sooner or later, time will tell.

**EDIT:** Turns out it doesn't work! They are not compatible, so there you go! You can, however, bypass the audio mixing completely, which works well enough if you are just after some sound. I believe whatever gets mixed at the S-MIX doesn't get mixed when S-MIX is bypassed and might put extra strain on the prior chip the signal is coming from... but what are you going to do, game in silence? Unacceptable! ;)

**Sources:** [https://console5.com/wiki/OpAmp\_-\_Quad](https://console5.com/wiki/OpAmp_-_Quad) [https://console5.com/wiki/SNES](https://console5.com/wiki/SNES)
