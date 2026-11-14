---
title: "Sega Genesis Nomad DC-in Jack Repair"
author: "Nix McRetro"
date: 2012-05-20T10:32:14.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega]
share_description: >-
  A broken Genesis Nomad comes back to life after its shorting DC-in jack is replaced with one borrowed from a Mega Drive 2. New screen, clean buttons, actual handheld gaming. 🎮
---

![Front of a black Sega Genesis Nomad handheld with a scratched, unlit screen, directional pad and six action buttons.](/assets/images/2012/img_0060.jpg)

*Here's the Nomad as it arrived, complete with a scratched screen. That loose DC-in jack was the next problem to tackle.*
{: .media-caption }

![Close-up of the Sega Genesis Nomad MK-6100 identification label on the back, showing its serial number and DC power rating.](/assets/images/2012/img_0107.jpg)

*Even the back label gets a photo. It's a Genesis Nomad MK-6100, and the power specifications are worth keeping in mind.*
{: .media-caption }

![Top edge of a Sega Genesis Nomad showing its red power switch, DC-in socket, cartridge slot and round AV connector.](/assets/images/2012/img_0108.jpg)

*Here's the top of the Nomad, including the troublesome DC-in socket. A tiny connector was enough to stop the whole machine.*
{: .media-caption }

The Sega Genesis Nomad. What an amazing beast. It didn't work up until today, and the seller had kindly offered me a full refund if I returned it. Not while I have an empty weekend to do some repairing! I already knew there was a problem with the DC-in jack because it was loose as a goose.

![Disassembled Sega Nomad circuit boards surrounding a lit LCD displaying the SEGA logo, with temporary power wires and a converter board attached.](/assets/images/2012/img_0124.jpg)

*With the Nomad spread across the desk and a temporary 9 V supply attached, the SEGA logo appears. That's a good sign!*
{: .media-caption }

![Close-up of a Sega Nomad circuit board with red and black test wires attached near the labelled power test points.](/assets/images/2012/img_0125.jpg)

*My temporary power leads on the Nomad board. I initially got the wiring backwards, which wasn't terribly helpful!*
{: .media-caption }

![Partly disassembled Sega Genesis Nomad on a desk with its LCD illuminated and wires leading to a small DC-DC converter board.](/assets/images/2012/img_0123.jpg)

*It's alive on the bench, running from the temporary step-down converter. Not glamorous, but at least the Nomad can power up.*
{: .media-caption }

Apart came the Nomad, and the problem became much clearer. The damaged DC-in jack was allowing positive and ground to short together. That also gave me a plausible explanation for why the machine would not run from the external battery pack.

For diagnosis, I traced the power input and temporarily connected one of the DC-DC step-down converters from my Saturn PSU project, adjusted to 9 V. Positive on red, ground on black and... bingo! Life! I had initially wired the DC-DC converter the wrong way around and got absolutely nowhere, although thankfully nothing appeared to have been damaged. In the recording, red runs to TP201 and black to TP202.

![Close-up of the metal DC-in socket fitted to a Sega Nomad motherboard, beside capacitors and printed circuit markings.](/assets/images/2012/img_0126.jpg)

*A close look at the original DC jack on the board. It looked innocent enough until the electrical testing.*
{: .media-caption }

![Removed black DC barrel power socket resting on a wooden desk, with metal solder tabs and a round opening visible.](/assets/images/2012/img_0127.jpg)

*Out comes the troublesome DC-in jack. Not much to look at, but it's enough to bring an entire handheld to a halt.*
{: .media-caption }

![Front view of a black barrel-style DC power jack on a wooden desk, with its centre socket and bent metal terminal visible.](/assets/images/2012/img_0128.jpg)

*Here's the replacement power jack borrowed from my Mega Drive 2. Thankfully, it was compatible with the Nomad.*
{: .media-caption }

On closer inspection I found that the DC-in jack from my Mega Drive 2 was compatible with the Nomad. Both machines use the same tip-positive power arrangement. So I removed the jack from one of my working Mega Drive 2 consoles and fitted it to the Nomad.

![Sega Genesis Nomad handheld powered on with a Sonic & Knuckles cartridge inserted and game characters visible on the screen.](/assets/images/2012/img_0129.jpg)

*The Nomad lives! Sonic & Knuckles is in, and I've finally got a working handheld instead of a repair project.*
{: .media-caption }

![Close-up of a Sega Nomad displaying Sonic, Tails, Knuckles and Dr. Robotnik beneath an inserted Sonic & Knuckles cartridge.](/assets/images/2012/img_0130.jpg)

*Sonic, Tails, Knuckles, and Robotnik have appeared on the screen. Much more fun than looking at a dead Nomad.*
{: .media-caption }

![Sega Genesis Nomad displaying the Sonic & Knuckles title screen with its game cartridge inserted in the top.](/assets/images/2012/img_0131.jpg)

*There's the Sonic & Knuckles title screen. New screen cover, clean buttons, repaired power socket, and a working Nomad at last.*
{: .media-caption }

I replaced the scratched front screen, cleaned the controller buttons, put everything back together and plonked in the nearest cartridge I could find. It works from the external battery pack as well.

{% include youtube.html id="X5LQolaXIL4" %}

So overall... success! The video above shows the Nomad during the initial tests.

### Sources

- [Sega Genesis Nomad Instruction Manual](https://manualzilla.com/doc/6982054/sega-genesis-nomad-instruction-manual)

### Related Posts

- [Sega TeraDrive Model 2, Genesis Nomad and Mega Drive 2](/sega-teradrive-model-2-genesis-nomad-and-mega-drive-2/)
