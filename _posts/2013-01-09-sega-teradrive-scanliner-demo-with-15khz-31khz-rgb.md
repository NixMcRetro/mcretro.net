---
title: "Sega TeraDrive Scanliner Demo with 15 kHz / 31 kHz RGB"
author: "Nix McRetro"
date: 2013-01-09T14:06:03.000+11:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
---

{% include youtube.html id="SY35O0Kryhs" %}

Scanlines make the world go round. This was my first proper test of the VGA scanline generator I picked up through [ASSEMbler Games](https://web.archive.org/web/20130109203054/http://www.assemblergames.com:80/forums/showthread.php?42388-Dreamcast-VGA-box-amp-Scanline-generator). I'd promised the creator a demonstration, and what better machine to try it with than the Sega TeraDrive? I've got my Model 2 sitting here with Sonic & Knuckles ready to go and a QuickShot Pro controller. It's not that Pro, but it'll do!

The setup is a little complicated. The RGB signal goes through the scanline generator and then another converter to make it suitable for my display. I wanted to use the TeraDrive without its original monitor, and my Amstrad Mega PC screen wasn't behaving properly at the time either.

Sega designed the TeraDrive's analogue RGB output to handle approximately 15 kHz and 31 kHz scan rates. The PC side uses the higher scan rate, while Mega Drive mode uses the lower, television-style signal. The scanline generator doesn't create that 15 kHz output; it's simply adding the visual effect before my external converter handles the display.

I'd never given the TeraDrive a proper RGB test before, and the picture looked fantastic once I switched into Mega Drive mode. The generator has several settings, from subtle scanlines to enormous dark bands, with one mode looking a little flickery. After experimenting with the combinations, I found something much closer to the CRT appearance I was after.

I moved everything over to the big television for another test. As predicted, the picture was bigger! While the camera was running, I showed off the TeraDrive's slightly different Mega Drive boot screen and spent some time playing Sonic & Knuckles. The game was running nicely, and the RGB picture was lovely and clear.

Switching off the scanline effect made a useful comparison. The picture still looked good, but I preferred it with the lines switched back on. I'd simply never bothered connecting my dual-frequency Amstrad CRT to the TeraDrive before, which seems a bit silly now that I've seen how good Mega Drive mode looks.

**Sources**

- [Sega Hardware Archive - TeraDrive](https://www.sega.jp/fb/segahard/md/tera.html) - Sega's official specifications document the TeraDrive's 15 kHz and 31 kHz analogue RGB output modes.
