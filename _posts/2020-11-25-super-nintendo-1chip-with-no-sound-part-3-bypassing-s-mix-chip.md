---
title: "Super Nintendo 1CHIP with No Sound - Part 3 Bypassing S-MIX Chip"
author: "Nix McRetro"
date: 2020-11-25T21:19:21.000+11:00
categories: [hacks, nintendo, repairs]
last_modified_at: 2026-10-18
---

{% include youtube.html id="7XT6kErqjfo" %}

You know what? Just forget it, S-MIX. You're out of the equation now!

I've been trying to get the sound working on this Super Nintendo 1CHIP motherboard. The capacitors have already been replaced, but the console still isn't producing any audio. I encountered something similar on another 1CHIP board years ago, so I thought I'd revisit the workaround I used back then.

My suspicion was around the S-MIX audio path, although I hadn't established whether the chip itself was faulty. Rather than continuing to replace components, I decided to experiment with routing the audio signals around that part of the circuit.

I identified the left and right audio outputs on another chip and attached a couple of wires so I could test them independently. I chose blue and green wire, partly because apparently making life difficult for myself with unusual colour choices is more entertaining than using red for right audio!

With the connections made, I tried the audio through the television. Would you believe it, there was sound! Both channels were producing game audio, which was considerably more than I'd been getting through the original output path.

I then routed the connections towards the output area of the motherboard, using the existing board connections where possible. It isn't exactly an elegant restoration of the original circuit, but it got the game audio back and gave me something useful to work with.

That doesn't establish whether the S-MIX chip itself was responsible for the failure. I haven't fully traced the original audio circuitry, and bypassing part of it may change the output characteristics or introduce other problems. For now, though, the console produces sound again.

Sure, something *might* catch fire or burn out at a later date. That's a problem for future **Nix**. Future-me will have better diagnostic and troubleshooting skills... right? I mean, I'll be *from the future*! Then again, maybe not...

We're fast approaching the end of 2020, and what a year it has been. I've managed to offload most of my development hardware just in time to think about returning to university and finishing this degree. Working and studying at the same time should be interesting, assuming I can work out how many jobs I apparently have this week!

There are a couple more videos to come before the new year, along with some old car repair footage I discovered while tidying up my hard drive. A Holden Commodore VY Series II handbrake replacement, anyone? Apparently my collection of things needing repairs extends well beyond game consoles.

**Related Posts**

- [Super Nintendo 1CHIP with No Sound - Part 1 Capacitor Replacement](/super-nintendo-1chip-with-no-sound-part-1-capacitor-replacement/)
- [Super Nintendo 1CHIP with No Sound - Part 2 Final Capacitors](/super-nintendo-1chip-with-no-sound-part-2-final-capacitors/)
- [S-MIX on the SNES SNSP-CPU-1CHIP-01 / SNSP-CPU-1CHIP-02](/s-mix-on-the-snes-snsp-cpu-1chip-01-snsp-cpu-1chip-02/)
