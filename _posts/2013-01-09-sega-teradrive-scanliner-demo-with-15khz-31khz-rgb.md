---
title: "Sega TeraDrive Scanliner Demo with 15 kHz / 31 kHz RGB"
author: "Nix McRetro"
date: 2013-01-09T14:06:03.000+11:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
---

{% include youtube.html id="SY35O0Kryhs" %}

Scanlines make the world go round. This was my first proper test of the new VGA scanline generator I picked up through [ASSEMbler Games](https://web.archive.org/web/20130109203054/http://www.assemblergames.com:80/forums/showthread.php?42388-Dreamcast-VGA-box-amp-Scanline-generator).

I'd promised the creator a demonstration, and what better machine to try it with than the Sega TeraDrive? I've got my Model 2 sitting here with Sonic & Knuckles ready to go and a QuickShot Pro controller. It's not that Pro, but it'll do!

The setup is a little complicated. The RGB signal goes through the scanline generator, followed by another converter to make the signal suitable for my display. I wanted something that would let me use the TeraDrive without its original monitor. My Amstrad Mega PC screen would have been another option, but that wasn't behaving properly at the time either.

The more interesting part, though, was finally seeing the TeraDrive's Mega Drive mode running through a suitable display setup.

Sega designed the TeraDrive's analogue RGB output to handle both approximately 15 kHz and 31 kHz scan rates. The PC VGA side operates at the higher scan rate, while the Mega Drive video path uses the lower television-style scan rate.

In other words, the 15 kHz Mega Drive output is a native feature of the TeraDrive. The scanline generator is a separate visual effect device rather than something that creates the TeraDrive's 15 kHz mode. My external converter is simply another part of getting this particular display arrangement working.

I had never really given the TeraDrive a proper RGB test before, and the picture looked fantastic once I switched into Mega Drive mode. Lovely, crisp scanlines!

The generator has a few different settings, ranging from fairly subtle lines to enormous dark bands. One of the modes even looked a little flickery. After trying several combinations, I settled on something that looked more like the CRT effect I was after.

I also moved everything over to the big television for another test. As predicted, the picture was bigger. While I had the camera running, I showed off the TeraDrive's slightly different Mega Drive boot screen and spent a bit of time playing Sonic & Knuckles. The video quality was excellent, and the game was running nicely.

I even switched the scanline effect off for a comparison. The RGB picture itself was still clear, but I definitely preferred it with the lines switched back on. I had simply never bothered connecting my dual-frequency Amstrad CRT to the TeraDrive before. Clearly I should have.

Mega Drive mode works beautifully. Great news all around!

### Sources

- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's official specifications document the TeraDrive's 15 kHz and 31 kHz analogue RGB output modes.
