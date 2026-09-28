---
title: "Co-Processors and You"
author: "Nix McRetro"
date: 2012-03-22T02:22:02.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0043.jpg)

Or more specifically co-processors for the Amstrad Mega PC or Amstrad Mega Plus PC.

![](/assets/images/2012/img_0041.jpg)

The ULSI US83S87 Advanced Math Coprocessor for 33MHz SX/SLC systems. This one has a 9401 date code and comes in a 68-pin PLCC package.

387SX-compatible math coprocessors were designed for the 386SX-style coprocessor interface, and compatible parts were also used with 486SLC systems. A 387DX-type coprocessor is not a drop-in replacement for a 387SX-compatible part; the SX and DX interfaces and packages differ. I ended up with a US83S87 ULSI Math Coprocessor in a 68-pin PLCC package rated at 33MHz for my 486SLC-based motherboard.

![](/assets/images/2012/img_0042.jpg)

For the original 386SX-based motherboard I went with a ULSI Math Co SX Advanced Math Coprocessor rated at 25MHz, and it seems to work well. A lower-rated coprocessor may physically fit, but running it in a faster system can clock the part beyond its specified rating. Matching the coprocessor rating to the system clock is the safer approach.

In summary get one if you can. They are getting rarer as the days tick on by. They were most useful in software that actually performed substantial floating-point work, but I mostly wanted to fill the empty socket anyway!


### Sources

- [Douglas W. Jones - Math Coprocessors](https://dougx.net/gaming/coproc.html) - identifies the ULSI 83S87 family, package types and SX/DX coprocessor distinctions.
- [Epson ActionTower 2000 user manual](https://files.support.epson.com/pdf/at2k__/at2k__u1.pdf) - documents 486SLC systems using clock-matched 83S87 coprocessors.
- [DOS Days - Math Coprocessors](https://www.dosdays.co.uk/topics/math_coprocessors.php) - background on software that benefited from x87-compatible floating-point hardware.
