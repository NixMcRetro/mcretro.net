---
title: "Sony PlayStation 1 - Modchip Overview"
author: "Nix McRetro"
date: 2016-01-29T19:39:47.000+11:00
categories: [guides, sony]
---

First up a little information on the best modchips for the PS1 and why we do or don't use them. This is mostly educated guesses upon reading things on the _\*internet\*_ - of all things... and probably shouldn't be taken as gospel!

* * *

**GQ-4X** doesn't seem to program PIC chips properly. It fails to read and write the config section from the hex code onto the chip!

The **MiniPro TL866CS** seems to be the weapon of choice for this task.

My **K150** kept exploding when I tried to program... losing connection... Why?

**PICkit2** doesn't seem to support anything but the 12F508, not the 12C508... let alone the 12F629.

* * *

**MultiMode3** - Uses the internal PIC oscillator to generate a clock signal frequency that's _\*almost\*_ completely in sync with the CD Drive controller frequency of the PlayStation. Additionally the MM3 is sensitive to temperature and can cause it to go out of sync causing issues with games not loading or extended load boot times. Code is available for the 12C508 / 12C508A / 12F508 / 12C509 / 12F629.

**Mayumi 4** - Uses the PlayStation's own clock signal which is of course far more accurate. As a result Mayumi 4 _\*should\*_ be more stable than the MultiMode3 chip. Code is available for the 12C508 / 12C508A / 12F508 / 12C509 / 12F629.

**ONEchip** - Best compatibility with games on SCPH-102.

* * *

![TL866CS](/assets/images/2016/img_0450.jpg)

Initially I had issues with Mayumi 4 for PIC12C508, PIC12C508A and PIC12F508 not reading back the correct data... turns out the Mayumi 4 hex code has the code protect flag enabled by default to prevent reading back of the code to duplicate the chip presumably. MultiMode 3 never had this enabled which is why I was a little confused as to what was happening to all my 12C508A chips. It's amazing what you learn after going back to what you were already supposed to know.

Thanks to Master991 and Bad\_Ad84 for teaching me about code protect. More information can be viewed [here](https://web.archive.org/web/20191112062242/https://assemblergames.com/threads/mayumi-v4-on-the-pic12c508a-pic12f508.59924/) at Assembler Games.

**References**
 - [http://www.fatcat.co.nz/psx/ps1.html](https://web.archive.org/web/20231014203434/http://www.fatcat.co.nz/psx/ps1.html)
