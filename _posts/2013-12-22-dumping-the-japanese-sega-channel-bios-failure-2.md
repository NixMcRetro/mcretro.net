---
title: "Dumping the Japanese Sega Channel BIOS (Failure 2)"
author: "Nix McRetro"
date: 2013-12-22T23:23:33.000+11:00
last_modified_at: 2026-10-22
categories: [programming, sega, youtube]
---

{% include youtube.html id="LQViF0ci6_0" %}

Another bad dump on this one too. Multiple dumps, different data each time, and the checksums don't match! How frustrating. Let's see if we can get a little closer to the bottom of this mystery.

This time I'm working on the other Japanese Sega Channel adapter. The first job is to remove its NEC BIOS chip, which is a 40-pin device marked D23C4000SCZ. Fortunately, the Hakko 808 makes the desoldering considerably more pleasant than it would otherwise be.

A couple of pins were still holding on after the first pass, so I added a little fresh solder and went over them again. That did the trick! The chip came out nicely, and it was time to see whether the programmer would cooperate. Its marking pointed to week 49 of 1994, while the readable BIOS text would later show July of that year. A little Christmas present from NEC, perhaps a bit late.

Unfortunately, the exact device wasn't listed in the GQ-4X software. I even had to stop and find the 16-bit adapter once it became obvious the first socket arrangement wasn't going to do the job. After some experimenting, I managed to read data using the 16-bit adapter and the D27C4000 device selection. A byte swap revealed some recognisable text, including the July 1994 date and BIOS version 2.11J.

That certainly looked promising, so I saved the image and tried loading it in the Fusion emulator. Unfortunately, we didn't get a working Sega Channel screen. The title displayed a "not support" message, and changing the byte order didn't produce the result I'd hoped for either.

Worse still, repeated reads weren't giving consistent checksums. That left us with some identifiable BIOS data, but not a verified dump I could confidently release as correct. Whether the remaining problem was the programmer configuration, the read process or something else wasn't yet clear.

We've established that the chip can produce recognisable data, which is more than we had at the beginning. We'll have another go at those programmer settings and see whether we can finally get the same result at least twice.

### Sega Channel Japan series

- [The Theme from Sega Channel Japan](/the-theme-from-sega-channel-japan/)
- [Japanese Sega Channel Adapter - First Look](/japanese-sega-channel-adapter-first-look/)
- [Japanese Sega Channel Adapter - Second Look](/japanese-sega-channel-adapter-second-look/)
- [Socketing the Sega Channel Adapter BIOS (Japanese Version)](/socketing-the-sega-channel-adapter-bios-japanese-version/)
- [Dumping the Japanese Sega Channel BIOS (Failure 1)](/dumping-the-japanese-sega-channel-bios-failure-1/)
- [Dumping the Japanese Sega Channel BIOS (Success)](/dumping-the-japanese-sega-channel-bios-success/)
