---
title: "Sega TeraDrive - Retrofitting a Mean Well PT-65B PSU"
author: "Nix McRetro"
date: 2016-10-10T17:31:52.000+11:00
last_modified_at: 2026-11-04
categories: [computing, hacks, sega]
share_description: >-
  A Mean Well PT-65B fits inside a Sega TeraDrive PSU housing in another hobbyist's retrofit. Universal mains sounds handy, but this isn't my own install. ⚡
---

![SEGA TeraDrive wordmark in blue and black lettering with blue square graphics on a white background.](/assets/images/2016/img_0575.jpg)

*The TeraDrive logo. Time for another look at keeping these unusual machines powered!*
{: .media-caption }

I've been noticing a few people looking for ways to replace failed Sega TeraDrive power supplies. Others are simply trying to get away from having to run a Japanese machine through a large external step-down transformer. I'm firmly in that second group!

DeChief over on [ASSEMblergames.com](https://web.archive.org/web/20170919030325/https://www.assemblergames.com/) has come up with an interesting solution using a Mean Well PT-65B power supply fitted inside the original TeraDrive PSU housing. The photos here are courtesy of DeChief and show his installation rather than one I've carried out myself.

The PT-65B is a 65 W triple-output switching supply, giving us:

- +5 V
- +12 V
- -12 V

It also accepts a universal 90 to 264 V AC input, which is rather convenient when dealing with Japanese computers in Australia. No more enormous transformer just to turn the thing on? Now that sounds appealing!

![Open TeraDrive PSU metal housing with a replacement circuit board, heatsink, large capacitors and several loose power leads.](/assets/images/2016/img_0566.jpg)

*DeChief's power supply retrofit inside the original metal housing. There's surprisingly little wasted space.*
{: .media-caption }

As you can see, the replacement board fits remarkably well inside the original housing. It's quite a tidy way of approaching the problem, especially if you're trying to keep the TeraDrive looking as original as possible from the outside.

One interesting difference is that the PT-65B has a -12 V output. The stock TeraDrive power arrangement doesn't normally provide that rail, so it raises the possibility of making it available to suitable expansion hardware.

Of course, having -12 V available on the power supply doesn't mean it can simply be connected to an ISA slot without checking the machine's wiring. That's another part of the modification that would need to be worked out properly.

![Close-up of a dark rectangular electrical component mounted through the TeraDrive PSU bracket, with yellow and grey wires attached.](/assets/images/2016/img_0567.jpg)

*A close-up of the PSU's bracket-mounted component and wiring in DeChief's retrofit.*
{: .media-caption }

![Close-up of the replacement PSU board showing a copper-wound coil, large black capacitor, silver heatsink and yellow and grey wires.](/assets/images/2016/img_0568.jpg)

*The view inside DeChief's PSU retrofit, with the winding, heatsink and other components packed together.*
{: .media-caption }

![Close-up of the mains lead entering the metal PSU housing beside blue disc components, a grey rectangular component and a screw.](/assets/images/2016/img_0569.jpg)

*A closer look at the cable entry and nearby board components in the TeraDrive PSU housing.*
{: .media-caption }

![Black cable passing through the TeraDrive PSU metal bracket, beside a separate wire ending in a blue-insulated ring terminal.](/assets/images/2016/img_0570.jpg)

*One of DeChief's wiring details, including the ring terminal beside the metal housing.*
{: .media-caption }

![Side view of an open TeraDrive PSU housing with its power cables and a hand holding a two-pin mains plug in front.](/assets/images/2016/img_0571.jpg)

*The power plug and the open housing, showing how the retrofitted unit is arranged. Photo courtesy of DeChief.*
{: .media-caption }

![Close-up of a broad finned aluminium heatsink inside the PSU housing, with a cardboard spacer visible underneath the circuit board.](/assets/images/2016/img_0572.jpg)

*A side-on view of the retrofit's heatsink and the material supporting the board inside the housing.*
{: .media-caption }

![Cluster of cylindrical capacitors and a wrapped transformer inside the PSU housing, with red and brown wires feeding a white connector.](/assets/images/2016/img_0573.jpg)

*Capacitors, transformer and output wiring tucked into DeChief's PSU retrofit.*
{: .media-caption }

![Bundle of coloured PSU wires joined under black sleeving and ending in a white multi-pin plastic connector on a dark tabletop.](/assets/images/2016/img_0574.jpg)

*The retrofit's cable harness and white connector laid out for a closer look.*
{: .media-caption }

There's one rather important consideration here: the PT-65B is an open-frame mains power supply. The photographs are a useful look at the physical arrangement, but they aren't a complete set of electrical installation instructions. Earthing, fusing, insulation, clearances and mains wiring all need to be dealt with correctly.

Still, it's an interesting alternative to the original supply, and certainly something worth investigating. Thanks again to DeChief for the photographs and for showing what's possible!

### Sources

- [Mean Well: PT-65 Series 65 W Triple-Output PSU Datasheet](https://www.meanwell.com/Upload/PDF/PT-65/PT-65-SPEC.PDF)

### Related Posts

- [Sega TeraDrive Model 3 Power Supply Failure](/sega-teradrive-model-3-power-supply-failure/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 1)](/sega-teradrive-model-3-faulty-power-supply-part-1/)
- [Sega TeraDrive Model 3 - Faulty Power Supply (Part 2)](/sega-teradrive-model-3-faulty-power-supply-part-2/)
- [Sega TeraDrive Power Supply Problems](/sega-teradrive-power-supply-problems/)
