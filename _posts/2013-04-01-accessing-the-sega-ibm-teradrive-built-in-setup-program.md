---
title: "Accessing the Sega / IBM TeraDrive Built-in Setup Program"
author: "Nix McRetro"
date: 2013-04-01T10:53:52.000+11:00
categories: [sega]
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="FwCTTdzpFkc" %}

Sure, there isn't much to the actual setup. Only three options and none of them that exciting... I suppose it is better than a kick in the teeth! Anyway, to sum it all up, choose DOS from the TeraDrive menu and press F1 during the PC-side startup!

![](/assets/images/2013/img_0383.jpg)

Above is the setup screen accessed by pressing F1 during the PC-side startup.

![](/assets/images/2013/img_0385.jpg)

This is the usual welcome screen when the Sega TeraDrive is first powered on, the Sega TeraDrive OS-in-ROM. I have been told that there is also a jumper on the mainboard that will disable this screen and boot straight to DOS.

![](/assets/images/2013/img_0384.jpg)

The Puzzle Construction menu once loaded up. Create your own Sega game and more! Looks very similar to the above screen doesn't it?

**2026 update:** The TeraDrive is now implemented in MAME, whose current driver documentation records F1 during POST as the way to enter the setup menu. That later documentation places the keypress during the PC-side startup sequence rather than at an already-running DOS prompt.

### Sources

- [MAME - Sega TeraDrive driver notes](https://github.com/mamedev/mame/blob/master/src/mame/pc/teradrive.cpp)

**AI-assisted revision:** This post was reviewed and edited with OpenAI GPT-5.6 Sol on 28 September 2026 for fact-checking, sourcing, and editorial cleanup. Final editorial responsibility remains with the author.
