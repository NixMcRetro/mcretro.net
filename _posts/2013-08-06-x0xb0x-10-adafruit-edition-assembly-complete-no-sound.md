---
title: "x0xb0x 1.0 Adafruit Edition: Assembly Complete, No Sound"
author: "Nix McRetro"
date: 2013-08-06T21:36:01.000+10:00
last_modified_at: 2026-10-22
categories: [news, youtube]
share_description: >-
  SuperNick's x0xb0x is fully assembled but silent. A temporary voltage test coaxes out some sound, pointing towards the audio circuitry. Repair still pending. 🎵
---

{% include youtube.html id="S2i51mFvv0g" %}

Some good news and some not-so-good news from the x0xb0x project! SuperNick (Nick) has finished assembling the Adafruit-era x0xb0x synthesiser, but unfortunately it isn't producing any sound through its normal controls. Rather disappointing when the whole point of building a synthesiser is to make some music!

The sequencer appears to be working, with LEDs lighting up and the different modes responding as expected. Earlier tests had also produced sawtooth and square-wave signals from parts of the circuit, so we knew at least some sections were alive.

The problem now seems to be somewhere around the audio circuitry. I've got a multimeter handy, although I don't have a proper oscilloscope here, so I'm going to poke around and see what the voltages are doing. This should be exciting!

One of the components I'm particularly interested in is the BA6110 chip. During testing, I noticed that pin 4 wasn't receiving the voltage change I'd expected when pressing a note in keyboard mode. I was expecting something around 1 to 1.2 V there, which should help activate the following circuitry and get some sound happening. Instead, nothing!

I decided to try feeding a small external voltage into that part of the circuit to see whether anything further along would respond. For the experiment I used a rechargeable battery providing approximately 1.2 V, connected to the test point and ground. A bit of bench troubleshooting to narrow down the problem, rather than a completed repair.

And wouldn't you know it, the x0xb0x made a noise! A rather strange noise, but a noise nonetheless. Beautiful!

With the test connection in place, I was even able to trigger some notes and get a little tune happening. I wouldn't exactly call it a masterpiece, but after all that silence it was wonderful to hear something coming from the machine.

The BA6110 is certainly looking suspicious, although I still need to work out whether the chip itself is faulty or whether the problem is with the signal feeding it. What we do know is that supplying the missing voltage made the audio circuitry respond. That's a pretty useful discovery, even if the synthesiser still won't behave on its own.

Replacement chips seem to be available, but I'll want to make sure any new one is genuine and suitable before going any further. There's no point swapping one problem for another!

I also owe a thank you to the people who have been documenting their own x0xb0x sound problems online. Some of their troubleshooting discussions helped point me in the right direction, and that's always appreciated when you're working through a circuit without all the equipment you'd ideally like to have.

So the assembly is complete, and we've made a rather useful discovery about the audio fault. The synthesiser still isn't fully repaired, but we now know that at least part of the sound-generating circuitry can respond.

See if you can spot the moment where the raving cats appear. Hopefully the next time we visit this project, SuperNick (Nick) will have a fully working x0xb0x and we can make some proper tunes!

### Related Posts

- [x0xb0x 1.0 Adafruit Edition: Quick Peek](/x0xb0x-10-adafruit-edition-quick-peek/)
- [x0xb0x 1.0 Adafruit Edition - Progress Report](/x0xb0x-10-adafruit-edition-progress-report/)
