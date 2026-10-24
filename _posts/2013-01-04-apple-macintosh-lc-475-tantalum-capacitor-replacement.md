---
title: "Apple Macintosh LC 475: Tantalum Capacitor Replacement"
author: "Nix McRetro"
date: 2013-01-04T14:00:49.000+11:00
last_modified_at: 2026-10-18
categories: [apple, repairs, youtube]
---

{% include youtube.html id="XvC7XDLE49U" %}

Time to replace the old electrolytic capacitors in my Apple Macintosh LC 475 with some nice new tantalums. Hopefully this attempt will go a little better than the last one, where I managed to lift a solder pad and damage a trace on my other LC 475 motherboard. That particular board is now missing a 100 uF capacitor. Whoops!

Some of the original capacitors on this board have leaked quite badly, and there's plenty of unpleasant residue hiding underneath them. Unfortunately, removing these things isn't quite as easy as I'd hoped. The plastic supports are brittle, the solder pads are rather delicate, and one wrong move can make a real mess of the motherboard.

I started by working on the 100 uF capacitors, carefully removing the old parts and cleaning up the affected areas. Thankfully the first couple came off without too much damage, although I did manage to lift a pad or track later on. This is starting to become an expensive way of learning how to remove surface-mount capacitors!

I tried a few different removal techniques as I went. Originally I couldn't understand why some repair guides suggested separating the capacitor body before removing the remaining connections, but after a few close calls I could certainly see the appeal. I thought removing Game Gear capacitors was bad. Compared with this, that was a cakewalk!

For the replacements I've used case size D instead of case size C. The larger packages happened to suit the capacitor values and voltage ratings I'd chosen, and they do fit on the board. Getting them soldered on straight is another matter, though. Some of these things are a little crooked, but I'm not entering the Macintosh in a beauty contest!

The polarity markings are also worth watching. Unlike the old electrolytics, where the stripe identifies the negative connection, the marked end of these tantalum capacitors is positive. I made sure to check everything carefully before the first power-on, because an exploding capacitor isn't exactly what I'm hoping to achieve here.

{% include youtube.html id="PaDyFWXIflo" %}

First power-on with the new capacitors installed! There are nine 47 uF, 25 V capacitors and two 100 uF, 16 V capacitors, all in case size D.

Note the lack of fire! ;)

The Macintosh gave me a startup chime, which was an excellent start, although the video didn't appear immediately. After a little more fiddling, we had a picture! I also checked the PRAM battery and discovered it was only producing around 1 V. That's not particularly useful, so I replaced it with another battery measuring approximately 3.6 V.

With that sorted, I connected the remaining hardware and gave the machine a proper boot test. There was an unexpected restart along the way, something I'd noticed before replacing the capacitors too, but eventually we were up and running.

What better way to test the sound than with a game of Maniac? I hooked up the stereo audio and had a rather enjoyable session, complete with some excellent music and a score of over 86,000 points. Probably one of my better games, and you got to watch it!

The replacement capacitors came from element14. I selected 25 V parts for the 47 uF positions, replacing the original 16 V electrolytics with higher-rated tantalums to provide additional voltage headroom. The correct derating depends on the particular capacitor series, but these were the parts I'd chosen for this repair.

And there we have it. The LC 475 boots, the sound works, and nothing caught fire. Now that's a considerably better result than I was expecting after all that soldering!

For more context on the derating rule I was using at the time, see [Apple Macintosh LC 475 Derating Tantalum Capacitors](/apple-macintosh-lc-475-derating-tantalum-capacitors/).

### Sources

- [KYOCERA AVX - Voltage Derating Rules for Solid Tantalum and Niobium Capacitors](https://www.kyocera-avx.com/news/voltage-derating-rules-for-solid-tantalum-and-niobium-capacitors/) - explains why derating guidance depends on capacitor technology and application.
