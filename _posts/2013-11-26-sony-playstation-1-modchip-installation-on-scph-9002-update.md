---
title: "Sony PlayStation 1 Modchip Installation on SCPH-9002 Update"
author: "Nix McRetro"
date: 2013-11-26T19:25:54.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, sony, youtube]
---

{% include youtube.html id="Udr_CFyVsYg" %}

Make sure **Verify burn** is switched on, or you'll have more coasters than a beer hall in the Alps!

The CD burner I was using turned out to be faulty, and verification had either been disabled or ignored during some earlier burns. A failed test disc therefore wasn't enough to show that the modchip wiring or PIC programming was wrong.

Here's a little follow-up to the PlayStation modchip installation. After spending quite a while wondering why things weren't behaving themselves, I've discovered that a good part of the trouble came from the discs I was testing.

That's right, the CD burner in my PC wasn't doing a particularly good job of burning CDs. I've ended up with a whole collection of discs that don't work properly. Wonderful!

Once I tried another burner and made sure the discs were being verified, things started looking a lot more promising. The US NTSC games are now booting successfully, which is rather satisfying after all that fiddling with the modchip.

There's still a video-output issue to consider, though. I'm using a PAL PlayStation with a 50 Hz composite connection, and a game can reach the Sony Computer Entertainment America screen before the picture disappears.

Interestingly, the disc continues spinning, so a missing picture doesn't necessarily mean the console has stopped executing the game. It could be a problem with the television or video connection handling the signal after the game changes display mode.

I've got an XRGB unit available, so I'd like to investigate whether the picture is still being generated through a more suitable connection. That's another little test for another day.

The important discovery is that the unsuccessful burns had been confusing the diagnosis. It would have been very easy to blame my wiring or the programmed PIC without realising that the discs themselves were faulty.

So that's another lesson learned. When you're testing a modification that depends on reading a disc, make sure the disc is actually good before you decide the hardware is broken.

And always verify those burns!

### Related posts

- [Sony PlayStation 1 Modchip Installation Success on SCPH-9002](/sony-playstation-1-modchip-installation-success-on-scph-9002/)
