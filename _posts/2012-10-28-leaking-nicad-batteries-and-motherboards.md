---
title: "Leaking NiCad Batteries and Motherboards"
author: "Nix McRetro"
date: 2012-10-28T06:58:02.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs]
---

{% include youtube.html id="VTKAVvqteMM" %}

I hate NiCad batteries. I hate them so much. Here's another old 486 motherboard suffering from a leaking rechargeable battery, and this time the corrosion has made its way towards the keyboard connector. Not exactly where I'd like to find it!

This board came with an optical drive I'd purchased, so getting a 486DX running at 33 MHz with it was a nice little bonus. Unfortunately, the 3.6 V barrel battery had started leaving green and blue deposits around its terminals. I had similar trouble with my Amstrad Mega PC, and I'd rather not repeat that experience.

The rechargeable NiCad batteries found on many vintage motherboards contain an alkaline electrolyte, rather than an acid. That doesn't make the damage any less unpleasant. Once the material reaches copper tracks and component connections, you can end up with a substantial repair job.

I removed the battery using my soldering equipment and desoldering braid, taking care not to leave the leaking cell on the board any longer than necessary. Most of the visible trouble appeared to be around the negative terminal, and I was relieved to see that it hadn't spread across the underside as badly as I'd feared.

The motherboard also has an external battery connector, which might be useful if I decide to keep it in service. After removing the old battery, I powered the system up and got a picture, although it complained about the keyboard and lost configuration settings. Not surprising considering where the corrosion had reached.

{% include youtube.html id="2en2GsA_70Q" %}

The second board came from the same collection of hardware, and naturally it had another leaking NiCad battery. This one has several memory slots and a socketed 486 processor, with a board marking dated June 1993. Unfortunately, the corrosion around the keyboard connector looked even worse than on the first motherboard.

Once the battery was out, I gave the board a power-on test. The keyboard lights responded, and pressing F1 actually worked! The machine reached its BIOS setup and appeared to be functioning, which was a much better result than I'd expected from the appearance of the board.

That leaves me with a couple of useful old motherboards, although I don't have an immediate need for another 486DX running at 33 MHz. Who knows what the future holds?

I've also got machines with Dallas-style RTC modules and others using replaceable lithium coin cells. Those arrangements avoid the familiar barrel-NiCad leakage problem, but it's still worth checking the condition of any decades-old backup battery. If replacing a rechargeable cell with a non-rechargeable battery, the original charging circuit must also be accounted for rather than simply swapping one type for another.

**Sources**

- [Saft - Nickel-cadmium block battery: Technical manual](https://manualmachine.com/saft/nickelcadmiumblockbattery/28659126-technical-manual/) - describes the alkaline electrolyte used in nickel-cadmium batteries.
- [Analog Devices - DS12887 Real-Time Clock](https://www.analog.com/en/products/ds12887.html) - details the encapsulated battery arrangement used by Dallas-style RTC modules.
- [Panasonic Energy - Battery FAQ](https://www.panasonic.com/global/energy/products/eneloop/en/faq.html) - explains the distinction between rechargeable and primary cells.
