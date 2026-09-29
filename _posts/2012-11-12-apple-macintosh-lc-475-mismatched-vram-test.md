---
title: "Apple Macintosh LC 475 Mismatched VRAM Test"
author: "Nix McRetro"
date: 2012-11-12T21:09:50.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [apple, hacks, repairs]
---

{% include youtube.html id="0mDyQ1gm8MU" %}

Ever wonder what happens when you install one 256 KB VRAM SIMM and one 512 KB VRAM SIMM in an LC 475?

They say you shouldn't do it.

They have a good reason.

The display becomes a complete mess: lines everywhere, poor screen updates and mouse-pointer trails that refuse to disappear.

Interestingly, the machine did still produce a usable-enough display to demonstrate the failure. I wasn't expecting it to work at all.

Apple's own specification explains the problem. The LC 475 supports VRAM as a matched pair: either two 256 KB modules for 512 KB total or two 512 KB modules for 1 MB total.

One of each is outside the supported configuration.

Science achieved.

I also installed the replacement power supply I ordered from the US a few weeks ago.

TDK makes a lovely solid-feeling PSU.

This one carries a 1993 date code and I believed it may have come from an LC III, although the date code alone does not establish which Macintosh originally donated it.

Whatever its history, it works beautifully and, unlike my old one, isn't covered in rust.

Kudos to whichever Macintosh donated the organs.

### Sources

- [Apple - Macintosh LC 475 Technical Specifications](https://support.apple.com/en-ca/112204) - documents the supported matched VRAM configurations for the LC 475.
