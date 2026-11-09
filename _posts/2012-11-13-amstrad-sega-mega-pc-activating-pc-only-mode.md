---
title: "Amstrad Sega Mega PC: Activating PC-Only Mode"
author: "Nix McRetro"
date: 2012-11-13T21:14:24.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, sega, youtube]
---


{% include youtube.html id="RUAqjHtVLXQ" %}

Here's a little trick for anyone working on an Amstrad Mega PC who wants to run the PC side without having the Mega Drive ISA card installed. A few people have been asking how I manage to get video output with the Sega hardware removed, so I thought I'd record a quick demonstration. I'm fairly sure I've mentioned this before, but now there's actually a video to go with it.

The Mega PC normally uses a ribbon cable and the Mega Drive hardware as part of its PC/Mega Drive mode-selection arrangement. If you simply pull out the Sega card, the PC doesn't necessarily know which configuration it's supposed to use, and you can end up with no video. The jumper arrangement shown in the video allows me to force PC-only mode so I can work on the motherboard without all that Sega hardware getting in the way.

This is particularly useful because the Mega Drive card sits over much of the PC motherboard. Want to change the RAM? You have to start dismantling the machine to get at it. I've been trying assorted memory modules, including some 8 MB ones I've recently acquired, and the extra access makes things considerably easier.

The board I'm showing here uses a Texas Instruments 486SLC rather than the original 386SX. It came from a separate beige PC, and I picked it up because the connections and general arrangement looked compatible with what I needed for the Mega PC. The CPU and memory layout are different, but important things such as the rear port positions and keyboard and mouse connectors lined up. I figured it was worth a try if it meant giving the Mega PC a little more power.

Another welcome difference is the RAM-slot construction. My earlier 386 board used plastic retaining clips, which aren't particularly reassuring after twenty years of ageing. This 486 board has metal clips instead. At least somebody decided not to save a few cents there!

The jumper configuration in the video is the one I've been using to get PC-side video without the Mega Drive card. Once that's sorted, I can carry on testing memory and the rest of the motherboard without wrestling with the entire rear assembly every time. As always, there are more photos in the [photo gallery](/goodies/).

### Sources

- [Centre for Computing History: Amstrad Mega PC (Integrated PC/Mega Drive)](https://www.computinghistory.org.uk/det/2534/Amstrad-Mega-PC/)

### Related Posts

- [Amstrad Sega Mega PC AdLib Sound Repair: Card Alignment](/amstrad-sega-mega-pc-adlib-sound-repair-card-alignment/)
