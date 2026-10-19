---
title: "Aiwa Mega-CD CSD-GM1: More Power Problems and Next Steps!"
author: "Nix McRetro"
date: 2012-10-21
last_modified_at: 2026-10-20
categories: [reconstructed, repairs, sega, youtube]
---

{% include youtube.html id="OkrtqOHkM5o" %}

I'm coming down with a terrible cold, so I think it's time to give the Aiwa Mega-CD repairs a rest for the weekend. If I keep working on these things while feeling this miserable, I'll probably end up breaking something else!

There are still quite a few problems to investigate, particularly the video distortion when using my external power supply. I've got a couple of theories, but nothing I'd call a definite answer just yet.

One possibility is that the external supply simply isn't providing enough voltage. I'm feeding around 12 V into the main power arrangement, whereas I've measured something closer to 19 or 20 V from the original transformer under the conditions I've been testing. Perhaps some of the downstream circuits aren't receiving the voltages they need, resulting in the distorted picture.

Interestingly, I've seen similar video interference with both Game Units when using the external supply, but not when using the original transformer arrangement. That's a useful clue, although I still need to measure the actual regulator outputs before drawing any conclusions.

The other Aiwa has another problem entirely. Its Mega Drive section isn't powering up, and I'm suspicious of the 6 V voltage regulator. I've been thinking about temporarily using one of my DC-DC converters to test that theory, but it's still just an idea at this stage. I really need to work out what's happening with the power rails first.

And then there's the sound! I've lost proper audio amplification on both machines. The Mega-CD BIOS audio sounds fine, but the Mega Drive games are another story. Perhaps those ageing capacitors are part of the problem. There are certainly enough of them to keep me occupied for a while!

The physically damaged mainboard also seems less cooperative when it comes to reading discs than the other one, so that's another item for the list.

So what's next? More voltage measurements, some regulator investigation, and probably a fair bit of capacitor replacement. Plenty of work left to do, but at least we're slowly learning more about these complicated old machines.

First, though, I think I'll try getting rid of this cold. The Aiwa can have the rest of the weekend off!

### Related posts

- [Aiwa Mega-CD CSD-GM1 Repairs Part 2: Power Rail Testing](/aiwa-mega-cd-csd-gm1-repairs-part-2-power-rail-testing/)
- [Aiwa Sega Mega-CD CSD-GM1 Repairs Intermission](/aiwa-sega-mega-cd-csd-gm1-repairs-intermission/)
- [Aiwa Sega Mega-CD CSD-GM1 KSS-210B Laser Replacement](/aiwa-sega-mega-cd-csd-gm1-kss-210b-laser-replacement/)
