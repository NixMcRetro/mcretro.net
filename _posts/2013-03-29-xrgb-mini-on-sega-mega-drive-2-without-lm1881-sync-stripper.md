---
title: "XRGB-mini on Sega Mega Drive 2 Without an LM1881 Sync Stripper"
author: "Nix McRetro"
date: 2013-03-29T00:52:36.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, sega]
---

{% include youtube.html id="9_ALl1W0Mbg" %}

Interesting result from the Mega Drive 2 and Framemeister experiments. With this particular cable setup, everything works beautifully once the LM1881N sync stripper is removed. Leave it in place and the XRGB-mini doesn't seem happy at all.

I'd been experimenting with a rather unconventional RGB cable and was curious whether the sync-separation circuit was actually necessary. The cable wasn't a standard factory arrangement, and some of the wire colours didn't mean what you'd expect. In this case, the sync connection was running through a conductor I'd normally have associated with something else.

After sorting out the wiring and removing the LM1881, I finally had a stable picture. The Framemeister detected the Mega Drive's RGB output properly, although I still needed to adjust the sync-level setting. At least now I had a picture to work with instead of a blank screen!

I disconnected the sync wire while everything was running to see what happened. The picture disappeared immediately, the Framemeister briefly showed a blue screen, and then it reported that there was no usable input. As soon as I reconnected the wire, the picture came back.

That doesn't mean the Framemeister universally dislikes sync strippers. The Mega Drive 2 can provide a native composite-sync signal when the cable is wired appropriately. An LM1881 is useful for separating sync from composite video, but there's not much point adding that extra stage when the signal you need is already available.

The result here is specific to my Mega Drive 2, this cable, and my Framemeister setup. The cable came from [Retro Gaming Cables](https://www.retrogamingcables.co.uk/), and I'll be doing more experiments once I get everything wired up properly. At the moment I've still got SCART cables lying around in pieces everywhere!

**Related Posts**

- [Micomsoft XRGB-mini Framemeister Arrival](/micomsoft-xrgb-mini-framemeister-arrival/)
- [Converting XRGB-mini Adapter to EuroSCART](/converting-xrgb-mini-adapter-to-euroscart/)

**Sources**

- [Texas Instruments - LM1881 Video Sync Separator](https://www.ti.com/product/LM1881) - manufacturer description of extracting sync signals from composite video.
- [Retro Gaming Cables - CSYNC RGB SCART cables](https://www.retrogamingcables.co.uk/CSYNC-RGB-SCART-CABLES) - specialist reference explaining native composite sync and sync separation in retro-console RGB cabling.
- [Classic Console Upscaler Wiki - XRGB-mini Framemeister](https://www.junkerhq.net/xrgb/index.php/XRGB-mini_FRAMEMEISTER) - specialist Framemeister setup and compatibility reference.
