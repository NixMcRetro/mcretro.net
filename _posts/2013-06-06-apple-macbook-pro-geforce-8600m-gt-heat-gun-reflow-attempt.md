---
title: "Apple MacBook Pro GeForce 8600M GT Heat-Gun Reflow Attempt"
author: "Nix McRetro"
date: 2013-06-06T23:22:24.000+10:00
last_modified_at: 2026-10-18
categories: [apple, hacks, repairs]
---


{% include youtube.html id="iP4HwYD9LaQ" %}

Here we have a beautiful 17-inch MacBook Pro from the mid-2007 to early-2008 era, and unfortunately it has developed a rather serious problem. The machine powers on, the optical drive resets and the front indicator lights up, but there is no display or startup chime. The caps lock key doesn't respond either, which suggests the machine isn't getting very far through startup.

I tried removing the RAM to see whether the board would respond differently. Normally I'd expect some indication that the memory was missing, but there was still no useful response. With the RAM itself assumed to be functional, I suspected the problem was somewhere on the logic board.

These MacBook Pro models were among those Apple identified as potentially affected by failures involving the NVIDIA GeForce 8600M GT. Apple's service notice recommended having affected machines evaluated and repaired through Apple or an authorised service provider. Mine was already in a rather sorry state, complete with missing screws and a memory cover being held on with tape, so I decided to experiment.

The tool for this particular experiment was my Bosch PHG 630 DCE heat gun. I removed the logic board, cleared away the thermal paste and applied broad heat around the main chips before allowing everything to cool. I didn't bother with the foil shielding I'd previously suggested using, although that was another risk in an already rather uncontrolled experiment.

A handheld heat gun isn't a proper BGA rework tool. It doesn't provide the controlled heating, board support or temperature profile needed for a reliable repair, and there's plenty of opportunity to damage nearby components or the board itself. What I wanted to know was whether this particular machine would show any signs of life afterwards.

Once the logic board was back in the case, the first test was promising. Without RAM installed, the MacBook began responding differently from before. After reinstalling the memory and reconnecting everything, I finally got video output!

There wasn't a hard drive in the machine, so I used an optical disc to boot into Mac OS X. It took a fair while, but eventually the graphical interface appeared and there was no obvious video corruption. I also checked System Profiler and found the graphics connection reporting the expected PCI Express link width for this model.

That's considerably better than a machine that wouldn't even complete its initial startup. I didn't have a spare hard drive available for extended testing, though, so I couldn't say how reliably it would behave in ordinary use.

Back when I made the video, I suggested that a heat-gun treatment might last somewhere between three and twelve months, perhaps longer with flux. I don't have evidence for a predictable lifespan like that, and adding flux doesn't turn uncontrolled heating into a proper repair. The result here is simply that the heat treatment temporarily revived this particular MacBook Pro.

I'd previously tried a similar experiment with a PC video card and was considering trying it on a PlayStation 3 and Xbox 360. Those ideas were part of my experiments at the time, not recommendations to repair other machines with a heat gun.

Still, seeing this MacBook Pro boot again after arriving in such a poor state was rather satisfying! :)

**Sources**

- [Apple Support - MacBook Pro: Distorted Video or No Video Issues (Archived)](https://web.archive.org/web/20100105062655/http://support.apple.com/kb/TS2377) - archived Apple support notice covering affected GeForce 8600M GT MacBook Pro systems and Apple's service response.
