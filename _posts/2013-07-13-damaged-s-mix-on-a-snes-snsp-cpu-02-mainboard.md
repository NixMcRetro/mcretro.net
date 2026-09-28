---
title: "Damaged S-MIX on a SNES SNSP-CPU-02 Mainboard"
author: "Nix McRetro"
date: 2013-07-13T19:14:56.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
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

**EDIT:** Turns out it doesn't work! They are not compatible, so there you go! You can, however, bypass the audio mixing completely, which works well enough if you are just after some sound. The S-MIX normally combines audio from the APU with the cartridge and expansion-port audio inputs, so bypassing it also bypasses that mixing. At the time I wondered whether driving the output directly might put extra strain on the preceding audio circuitry, but I hadn't established that. Still, what are you going to do, game in silence? Unacceptable! ;)

Later information also confirmed why the LM324 substitution failed: S-MIX is a Nintendo custom mixer and is not pin-compatible with the LM324 despite occupying a similar 14-pin position in the audio circuitry.

I came back to the same S-MIX problem in [S-MIX on the SNES SNSP-CPU-1CHIP-01 / SNSP-CPU-1CHIP-02](/s-mix-on-the-snes-snsp-cpu-1chip-01-snsp-cpu-1chip-02/).

### Sources

- [Console5 Wiki - Quad Op Amp](https://console5.com/wiki/OpAmp_-_Quad)
- [Console5 Wiki - SNES](https://console5.com/wiki/SNES)
- [SNESdev Wiki - S-MIX Pinout](https://snes.nesdev.org/wiki/S-MIX_Pinout)
