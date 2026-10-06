---
title: "Damaged S-MIX on a SNES SNSP-CPU-1CHIP-02 Mainboard"
author: "Nix McRetro"
date: 2013-07-13T19:14:56.000+10:00
last_modified_at: 2026-10-06
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-06
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [nintendo, repairs]
---

![](/assets/images/2013/img_0411.jpg)

As you can see there is a hole blown through the S-MIX chip at U10. The following repair attempt will proceed in the next few weeks.

I originally labelled this board `SNSP-CPU-02`. In my 2016 follow-up, I identified the photographed board as `SNSP-CPU-1CHIP-02`; the photo also shows its S-APU at U2.

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

Reasons I thought it might work - both types tend to be at U10. Earlier PAL SNSP-CPU-02 boards used a quad op-amp there, while this damaged board has S-MIX. The same board position does not establish pin compatibility. Does S-MIX have some changes under the hood? Or was it simply masked? Time will tell. Sooner or later, time will tell.

**EDIT:** Turns out it doesn't work! The LM324 substitution did not work in my test, so there you go! You can, however, bypass the audio mixing completely, which worked well enough here if you were just after some sound. That bypass does not reproduce the original mixing circuit. At the time I wondered whether driving the output directly might put extra strain on the preceding audio circuitry, but I hadn't established that. Still, what are you going to do, game in silence? Unacceptable! ;)

I came back to the same S-MIX problem in [S-MIX on the SNES SNSP-CPU-1CHIP-01 / SNSP-CPU-1CHIP-02](/s-mix-on-the-snes-snsp-cpu-1chip-01-snsp-cpu-1chip-02/).

### Related posts

- [Super Nintendo Serial UP17388130 - No Sound Update](/super-nintendo-serial-up17388130-no-sound-update/)

### Sources

- [Console5 Wiki - Quad Op Amp](https://console5.com/wiki/OpAmp_-_Quad)
- [Console5 Wiki - SNES](https://console5.com/wiki/SNES)
- [Texas Instruments - LM324 Quadruple Operational Amplifiers datasheet](https://www.ti.com/lit/ds/symlink/lm324.pdf)
