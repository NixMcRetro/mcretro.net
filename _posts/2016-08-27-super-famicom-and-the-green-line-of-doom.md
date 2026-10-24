---
title: "Super Famicom and the Green Line of Doom"
author: "Nix McRetro"
date: 2016-08-27T10:35:38.000+10:00
last_modified_at: 2026-10-18
categories: [nintendo, repairs, youtube]
---

{% include youtube.html id="hI2PWPEuFB0" %}

Ever wondered what that green line is? Not everyone has it, just a few of us. This particular Super Famicom has a rather annoying vertical green line running through the picture, and I'd like to find out why. It's even moving around slightly, which makes it considerably more distracting than an ordinary bit of video noise.

The console arrived from Japan as a working unit, but the game bundled with it made the fault immediately obvious. To the seller's credit, they offered to send over a replacement motherboard, which was rather nice of them. Still, I thought I'd take this one apart and see what I could discover before replacing the whole board.

There had actually been a separate power problem when the console first arrived. It wouldn't start at all, so I checked the fuse and then looked at the 7805 voltage regulator. The fuse appeared to have continuity, and at one point I could measure an input to the regulator without getting the expected output.

Naturally, the regulator then started behaving again, because apparently electronic components enjoy making fools of people. I'd already ordered some replacements by that stage, so I decided to try fitting a new one anyway. It was at least a reasonable component to investigate given the earlier lack of power.

Once the motherboard was out of the case, I had a look for obvious problems. There wasn't anything particularly dramatic around the main chips, and I couldn't see a clear area of destroyed traces. The board was a little dusty, but that's hardly surprising for a Super Famicom that's been around for a couple of decades.

The replacement 7805 was from STMicroelectronics, and I fitted it in place of the original regulator. Getting the component positioned against the heatsink involved a little more fiddling than I'd hoped, particularly when I realised I'd lined things up incorrectly. Nothing quite like having to undo your own soldering because you chose the wrong holes!

I also noticed there didn't appear to be any thermal compound behind the original regulator. I used a little during reassembly, although applying far too much makes an impressive mess and doesn't make the repair any better. A bit of tidying up was required before I was happy with the fit.

With everything back together, I powered up the console for another test. It did take a little convincing to display a picture, which led to more fiddling with the cartridge connection. Eventually we had video again, but unfortunately that horrible green line was still present.

So the voltage regulator wasn't the answer to the green-line problem. At least we've eliminated one possibility, and I can continue looking elsewhere on the board. The next things worth investigating include the cartridge connector and the video circuitry, although I don't have enough evidence to identify the faulty component yet.

There was also an issue with the replacement fuse I'd used during earlier testing. Its rating was higher than the original, which isn't something I want to leave as a permanent solution. A correctly rated fuse matters because it's there to protect the hardware if something goes wrong.

This video goes on and on and doesn't actually solve anything, but sometimes that's the way these repairs turn out. The green line survived the regulator replacement, and the next video helps narrow things down a little further. Stay tuned! :-)

**Related Posts**

- [Super Famicom and the Green Line of Doom (Part 2)](/super-famicom-and-the-green-line-of-doom-part-2/)
