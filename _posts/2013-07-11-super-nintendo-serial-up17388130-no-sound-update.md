---
title: "Super Nintendo Serial UP17388130 - No Sound Update"
author: "Nix McRetro"
date: 2013-07-11T14:39:08.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [nintendo, repairs, youtube]
---

{% include youtube.html id="nLMw_Uv4IzU" %}

Closer inspection of the no-sound SNES has finally produced a much better clue.

The S-MIX chip at U10 has visible physical damage.

That might explain why there is no sound.

It's amazing what you can find when you really focus on the problem.

I had already replaced the capacitors, which is useful maintenance, but the damaged mixer now becomes the much stronger suspect.

I later investigated whether an LM324 could substitute for S-MIX.

It cannot.

S-MIX is a Nintendo custom audio mixer with a different pinout and function, despite occupying a similar-looking 14-pin position in the circuit.

So the next step is figuring out what to do when the chip you actually need has a hole blown through it.

### Related posts

- [Damaged S-MIX on a SNES SNSP-CPU-02 Mainboard](/damaged-s-mix-on-a-snes-snsp-cpu-02-mainboard/)

### Sources

- [SNESdev Wiki - S-MIX Pinout](https://snes.nesdev.org/wiki/S-MIX_Pinout)
