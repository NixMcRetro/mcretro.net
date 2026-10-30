---
title: "Converting XRGB-mini Adapter to EuroSCART"
author: "Nix McRetro"
date: 2013-04-04T03:26:01.000+11:00
categories: [guides, hacks, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="IjVLwkI85zY" %}

Just a quick video on the pinout of my XRGB-mini adapter cable. Taste the colours! Aqua, Pink and Blue! I've removed the connector from the supplied Framemeister adapter so I can rewire it for EuroSCART.

The problem is that the supplied adapter uses the Japanese RGB21 pinout. It looks remarkably like EuroSCART, but the connections are different, so plugging an ordinary EuroSCART cable straight into the original adapter isn't a good idea. I'd been looking at wiring diagrams and trying to work out which conductor carried each signal.

The main RGB wires were fairly distinctive in this particular cable: aqua was green, blue was blue, and pink was red. There were also two ground connections and several thinner wires for the remaining signals. I used a multimeter to trace the conductors rather than relying on their colours alone.

I identified the thin yellow wire as right audio, the thin brown wire as left audio, and the thin green wire as sync. Those colours are specific to the cable I was examining, not a general wiring standard for every Framemeister adapter.

With the conductors identified, I could compare them with the EuroSCART pinout and rearrange the connections. Each signal needs to end up on the correct pin, with the appropriate grounds connected as well. It's worth checking everything again with a multimeter before attaching the hardware, because the fact that a connector fits doesn't mean it's wired correctly.

I really do like SCART connectors, though. They're easy to dismantle and reconfigure, and there's so much more you can do with them than the composite connections I grew up using here in Australia.

**Sources**

- [Micomsoft - Framemeister manual](https://www.micomsoft.co.jp/XRGB-mini_m2.pdf) - the manufacturer warning on printed page 58 distinguishes the PAL and NTSC 21-pin wiring.
- [Micomsoft - Framemeister official product page](https://www.micomsoft.co.jp/xrgb-mini.html) - official specifications for the XRGB-mini and its 21-pin analogue RGB input.
- [Classic Console Upscaler Wiki - XRGB-mini Framemeister](https://www.junkerhq.net/xrgb/index.php/XRGB-mini_FRAMEMEISTER)
