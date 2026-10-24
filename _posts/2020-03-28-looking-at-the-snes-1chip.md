---
title: "Looking at the SNES 1CHIP"
author: "Nix McRetro"
date: 2020-03-28T13:33:31.000+11:00
categories: [nintendo, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="1F007E4l-H4" %}

Today we look back on the Super Nintendo 1CHIP console. Relevant at just about any time in history, really! To be fair, this video was already a few years old when I posted it.

This particular PAL SNES came to me broken, which was rather convenient because it meant I paid considerably less than I would have for a working one. I've managed to persuade it to read a cartridge and produce a picture, but the sound is still missing. You can't have everything, apparently.

The test game is Madden, which isn't exactly my favourite way of showing off a Super Nintendo. Still, there's something rather satisfying about seeing the players running around on the screen when the console was originally doing very little at all.

The 1CHIP models are interesting because Nintendo combined much of the earlier graphics hardware into a single large chip. That makes the board considerably less crowded than some of the older revisions. It also gives me another collection of parts to stare at while wondering what might have gone wrong.

The picture on this machine was looking surprisingly good. The cartridge connector could still use some attention, but the video itself was clear. Unfortunately, there wasn't any audio, so I started thinking about the capacitors and other components involved in the sound circuitry.

I've also got another Super Nintendo sitting around with its own collection of problems, including a vertical line in the picture. I'd tried a replacement voltage regulator on that one without getting particularly far, and there were still questions about its fuse and power circuitry.

For this 1CHIP, capacitor replacement seemed like a reasonable next experiment. I had most of the parts available, although there were still a few things to order before getting properly stuck into it. I also wanted some replacement fuses for the other console.

Eventually I'd like to install an in-game reset arrangement and SuperCIC mod once the hardware is behaving. There's not much point adding modifications to a console that hasn't even got working sound yet, though. One job at a time!

Today I'm actually adding RGB output to a Japanese Nintendo 64, which is quite straightforward if you've got the right revision. For the simple RGB-amp mod on these Japanese consoles, that means a VDC-NUS or VDC-NUS A chip.

I've opted against the HDMI console mods for now and am instead hedging my bets on MiSTer FPGA, or whatever eventually succeeds it, to keep bringing more of this hardware into the FPGA world.

For now, the SNES is producing a picture and reading a cartridge, which is more than it managed when it arrived. The missing sound can wait for the next repair session. Stay tuned!

**Sources**

- [RetroRGB - RGB-Compatible N64 Systems](https://retrorgb.com/n64rgbcompatible.html)
- [RetroRGB - N64 RGB Mod](https://retrorgb.com/n64rgbmod.html)

**Related Posts**

- [MiSTer FPGA on the DE10-Nano](/mister-fpga-on-the-de10-nano/)
