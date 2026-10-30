---
title: "Converting XRGB-mini Adapter to EuroSCART"
author: "Nix McRetro"
date: 2013-04-04T03:26:01.000+11:00
categories: [guides, hacks, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="IjVLwkI85zY" %}

Just a quick video on the pinout of my XRGB-mini adapter cable. Taste the colours! Aqua, Pink and Blue! I've removed the connector from the official Framemeister adapter so I can rewire it for EuroSCART. The supplied XRGB-mini adapter uses the Japanese RGB21 pinout, which looks remarkably like SCART but is wired differently.

Naturally, that means plugging an ordinary EuroSCART cable directly into the Japanese adapter isn't a particularly good idea. I'd been looking at wiring diagrams and trying to work out which wires inside the cable corresponded to the different signals. There are several colours in here, but the colours themselves aren't a reliable substitute for checking the actual connections.

At least the main RGB wires are fairly distinctive in this particular cable. The aqua wire is green, blue is blue, and pink is red. There are also two ground connections and some much thinner wires for the remaining signals. I used a multimeter to trace the conductors rather than relying entirely on my guesses.

On this particular adapter, I identified the thin yellow wire as right audio, the thin brown wire as left audio, and the thin green wire as the sync connection. That's the wiring I found in this cable, not a universal colour code that can be applied to every Framemeister adapter.

With the conductors identified, I could compare them against the EuroSCART pinout and reconnect the adapter accordingly. The important thing is that each signal reaches the correct pin, with the appropriate grounding and wiring for the equipment being connected.

The adapter supplied with the XRGB-mini Framemeister uses the Japanese RGB21 pinout, not EuroSCART. The 21-pin connectors are physically the same shape but are wired differently. This video shows repinning the supplied adapter for EuroSCART use; EuroSCART should not be connected directly to the unmodified RGB21 adapter.

Once everything has been rewired, the connections should be checked before attaching the actual hardware. A working-looking connector isn't much use if the wrong signals end up on the wrong pins.

I really do like SCART connectors, though. They're easy to take apart and reconfigure, and there's so much more you can do with them than the old composite connections I grew up using here in Australia.

### Sources

- [Micomsoft - Framemeister manual](https://www.micomsoft.co.jp/XRGB-mini_m2.pdf) - the manufacturer warning on printed page 58 distinguishes the PAL and NTSC 21-pin wiring.
- [Micomsoft - Framemeister official product page](https://www.micomsoft.co.jp/xrgb-mini.html) - official specifications for the XRGB-mini and its 21-pin analogue RGB input.
- [Classic Console Upscaler Wiki - XRGB-mini Framemeister](https://www.junkerhq.net/xrgb/index.php/XRGB-mini_FRAMEMEISTER)
