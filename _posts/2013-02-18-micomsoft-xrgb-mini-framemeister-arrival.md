---
title: "Micomsoft XRGB-mini Framemeister Arrival"
author: "Nix McRetro"
date: 2013-02-18T08:10:11.000+11:00
categories: [gaming, hacks]
last_modified_at: 2026-10-18
---

{% include youtube.html id="EM1SXr8sIIo" %}

Received my XRGB-mini Framemeister today and had no suitable cable to connect it! The connector looked just like SCART, so I went looking for a wiring guide and ended up hacking together an adapter from another cable I had lying around. After switching a bunch of pins, I had lovely RGB video. I couldn't believe how clear it was.

The catch with the Framemeister is that its supplied RGB adapter uses the Japanese RGB21 pinout, not EuroSCART. The connectors look similar, but they're wired differently, so you can't simply plug an ordinary EuroSCART lead into the supplied adapter. I needed to make the appropriate connections before trying it with the Mega Drive.

I'd already tried the Framemeister with composite video, and even that looked surprisingly good. The colours needed a bit of adjustment, but it made me want to get proper RGB working as soon as possible. So out came the soldering iron, and after rearranging the RGB signals and grounds in the temporary adapter, I finally had a picture.

The Framemeister was taking the Mega Drive's 15 kHz RGB output and sending it to the television through HDMI. Even on my ordinary Toshiba television, the clarity was incredible. The camera didn't really do it justice.

I started exploring the menus, switching the output to 720p and finding the English language setting. Then I discovered the scanline and sync-level controls, along with several wonderful ways to make the picture disappear again. I'll have plenty more to experiment with once I get the proper cables sorted out.

{% include youtube.html id="uUJa1zYH54g" %}

I've since purchased a cable that runs from the XRGB-mini through to EuroSCART. That should let me use separate EuroSCART cables for the Mega Drive, Saturn and Dreamcast, although I still need a suitable switcher between the sources.

For this second recording, I tried the Framemeister with a Samsung television instead. The sync-level settings that worked on the Toshiba didn't behave quite the same way here. I had better luck with the Samsung at 720p and 60 Hz, and could raise the sync setting considerably further before the picture dropped out.

I played with the odd and even scanline controls too, making the lines much thicker than before. With the retro picture effect darkening and curving the edges, the result started looking remarkably CRT-like. I couldn't notice any serious lag while playing, although that's only an observation from this setup rather than a measured result.

I'm also curious how the Dreamcast will compare over its 15 kHz RGB output versus 31 kHz VGA mode at 480p. I'll have a better idea once the rest of the cables arrive. As a side note, I've rather fallen in love with SCART connectors. They're so easy to reconfigure and offer considerably more than the composite connections we grew up using here in Australia.

**Sources**

- [Micomsoft - Framemeister official product page](https://www.micomsoft.co.jp/xrgb-mini.html) - official specifications for the XRGB-mini Framemeister and its 21-pin RGB input.
- [Micomsoft - Framemeister manual](https://www.micomsoft.co.jp/XRGB-mini_m2.pdf) - official warning against connecting EuroSCART wiring directly to the Japanese RGB21 input.
- [Classic Console Upscaler Wiki - XRGB-mini Framemeister](https://www.junkerhq.net/xrgb/index.php/XRGB-mini_FRAMEMEISTER)
- [Classic Console Upscaler Wiki - Dreamcast](https://www.junkerhq.net/xrgb/index.php/Dreamcast)
