---
title: "Gravis UltraSound MAX Rev 1.8 Demo"
author: "Nix McRetro"
date: 2012-11-16T01:01:12.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, youtube]
share_description: >-
  The Gravis UltraSound MAX Rev 1.8 gets a MIDI demonstration, complete with sample-based sound and the occasional crackle. It's enormous, and there's more to learn. 🎵
---


{% include youtube.html id="JQ9DJwRKeds" %}

Croissants for all! It's Friday night, and instead of going out drinking or spending time with friends, I'm sitting here with a Gravis UltraSound MAX. Better known as GUS, or GUX as I've somehow come to know him. This particular card is a Rev 1.8, and I thought I'd give everyone a quick demonstration of what it sounds like.

The UltraSound MAX uses Gravis's GF1 chip, which takes a rather different approach to sound than the Sound Blaster cards I've been playing with. Instrument samples are loaded into the card's own RAM and mixed in hardware, which makes it particularly interesting for tracker music and software with native GUS support. The MAX also includes a Crystal CS4231A codec for additional recording, mixing and Windows Sound System capabilities.

So far I've only managed to get the supplied MIDI demonstration working properly. It sounds pretty impressive, although there's the occasional crackle, and I've still got plenty of reading to do before I understand everything this card can manage. I suppose that's what happens when you acquire hardware this interesting and expect it to work without reading the manual.

One thing I definitely noticed is the size of the card. It's spectacularly long! The only board I could find that was longer came out of the Wyse PC, and even that only beat it by about a centimetre or so. I'm not entirely sure which of my computers will have room for this thing, but hopefully I can find somewhere to put it. It has more red on it than a racing fire truck!

Later in the video I worked out how to enable Sound Blaster emulation using `SBOS`. With the Gravis software installed from the UltraSound 4.11 CD, running the SBOS batch file allowed me to try *The Secret of Monkey Island*. Money Island? Isn't that a television show?

The music plays, although some of the instruments and notes don't sound quite right. It isn't a perfect demonstration, but it's useful to hear how the emulation behaves compared with software designed specifically for the UltraSound. I still need to spend more time experimenting with the card's native MIDI and other capabilities.

I didn't take many photos of GUX, so enjoy the video and the great sounds of a great card. There's plenty more to investigate, and I suspect I'm going to have a lot of fun with this one.

### Sources

- [Advanced Gravis: UltraSound SDK v2.22 (Sample Mixing and MAX Codec)](https://www.infania.net/misc1/GUS/docs/UltraSound%20Lowlevel%20ToolKit%20v2.22%20%2821%20December%201994%29.pdf)
- [Crystal Semiconductor: CS4231A Codec (Windows Sound System, Recording)](https://www.ardent-tool.com/datasheets/Crystal_CS4231A_alt.pdf)
- [Retronn: Gravis UltraSound MAX (GF1 and CS4231A)](https://retronn.de/imports/hwgal/hw_sound_card_gravis_ultrasound_max_front.html)
