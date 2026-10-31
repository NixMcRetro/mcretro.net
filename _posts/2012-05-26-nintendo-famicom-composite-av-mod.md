---
title: "Nintendo Famicom Composite AV Mod"
author: "Nick"
date: 2012-05-26T19:18:06.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, nintendo, youtube]
---

![](/assets/images/2012/img_0167.jpg)

The Nintendo Family Computer. Ohhhh yeahhhh! I've been experimenting with a composite AV modification for this Famicom, and after three revisions I've managed to get it working. This particular console actually belongs to somebody else, so the aim is to give its owner a usable video and audio output rather than relying on Japanese RF television reception.

![](/assets/images/2012/img_0148.jpg)

The first attempt was a proof of concept, hence the mess of cables. Functional yet hideous, but at least it gave me something to work from.

![](/assets/images/2012/img_0149.jpg)

The second attempt used a slightly longer piece of prototyping board. I was building it with some fairly questionable parts, including a cable tie pressed into service as a wire for ground. It worked, but I still wasn't happy with the arrangement.

![](/assets/images/2012/img_0157.jpg)

By the third revision I'd managed to shrink everything onto a much smaller piece of prototyping board. Much better! Now the modification is compact enough to tuck into the Famicom without leaving quite such a spectacular collection of wires hanging everywhere.

### Parts used

This is the circuit that worked on this particular Famicom motherboard. Board revisions differ, so the photographs and component values are a record of my build rather than a universal recipe for every Famicom.

- 1 x 110 ohm resistor, 0.25 W, 1% tolerance
- 1 x 300 ohm resistor, 0.5 W, 5% tolerance
- 2 x 220 uF, 16 V, 105°C electrolytic capacitors
- 1 x PNP transistor, reused from the Famicom mainboard in this build
- Flexible light-duty hookup wire or Kynar wire
- 7 x 5-hole prototyping board or stripboard
- 25 to 40 W soldering iron and solder
- RCA cables, plugs and sockets

To make it all come together and actually give us composite AV, read on!

### Removing the video transistor

![](/assets/images/2012/img_0143.jpg) Half-desoldered A937Q D PNP transistor on the Famicom mainboard. Note the ECB on the mainboard. Emitter, Collector and Base.

![](/assets/images/2012/img_0141.jpg) Desoldering the A937Q D PNP transistor from the Famicom mainboard.

![](/assets/images/2012/img_0142.jpg) Desoldering the A937Q D PNP transistor from the Famicom mainboard.

![](/assets/images/2012/img_0147.jpg) A937Q D PNP transistor desoldered from the Famicom mainboard.

![](/assets/images/2012/img_0144.jpg) Desoldering the A937Q D PNP transistor from the Famicom mainboard.

![](/assets/images/2012/img_0145.jpg) A937Q D PNP transistor desoldered from the Famicom mainboard. It fell into the Famicom...

First, the PNP transistor needs to come off the mainboard so it can be reused in the composite circuit. I originally used a small flatblade screwdriver to help lift it while heating the solder joints. The component eventually came free, although as you can see from the photographs, it even managed to fall inside the console at one point.

I'd be gentler doing this now. A desoldering pump, braid or proper desoldering tool places much less mechanical stress on an ageing PCB, and the last thing you want is a lifted pad or a damaged transistor before you've even built the new circuit.

### Wiring the Famicom

![](/assets/images/2012/img_0163.jpg)

![](/assets/images/2012/img_0164.jpg)

![](/assets/images/2012/img_0171.jpg)

![](/assets/images/2012/img_0172.jpg)

![](/assets/images/2012/img_0169.jpg)

![](/assets/images/2012/img_0166.jpg)

Next, identify the four solder points shown above. These are the connections I used on this board revision, so if yours looks different, don't assume the same points will apply. Sadly, I can't help much with a different motherboard from these photographs alone.

![](/assets/images/2012/img_0162.jpg) +5 V source

The purple cable taps into the LM7805 voltage regulator and supplies +5 V to the modification. From there, the power goes into the resistor and transistor circuit on my little prototyping board.

![](/assets/images/2012/img_0159.jpg) Sound

The orange cable carries the audio signal from the Famicom mainboard. It also needs a ground connection to complete the audio output, which brings us to the next wire.

![](/assets/images/2012/img_0160.jpg) Ground

The black cable is the ground point. I ran a wire from there to the prototyping board, where it branches out for the other ground connections. It's a bit easier to deal with everything in one place instead of trying to attach half a dozen wires directly to the Famicom.

![](/assets/images/2012/img_0161.jpg) Composite video

The green cable carries the composite-video signal from the mainboard into the amplifier circuit. The yellow output wire from the finished board goes to the centre pin of the video RCA connection, while the outer connection is grounded.

Adding a little fresh solder and flux can make an old joint easier to rework because it helps the solder flow properly. Melt the existing joint and add just enough fresh solder to make a clean connection. I usually add enough that I don't bother tinning the wires separately. Yes... I know... lazy, isn't it!

### Building the composite board

Once the four wires are installed, grab the prototyping board. I cut mine down to size with whatever seemed appropriate at the time, including a knife, a flatblade screwdriver and, on one occasion, a hacksaw. A fine collection of precision engineering instruments, wouldn't you say?

![](/assets/images/2012/img_0151.jpg)

![](/assets/images/2012/img_0152.jpg)

![](/assets/images/2012/img_0155.jpg)

The finished board uses a 5 x 7-hole layout, as shown in the photographs. The resistors aren't polarised, but the electrolytic capacitors are, so their orientation matters. The original transistor also needs to go back into the circuit with the correct emitter, collector and base connections.

![](/assets/images/2012/img_0153.jpg) Cut this track on your prototyping board

There's also a copper track on the underside that needs to be cut so the circuit sections are properly isolated. I scraped through it with a flatblade screwdriver. Check the break with a multimeter to make sure there is no continuity before applying power, because discovering a short circuit the exciting way is not particularly desirable.

![](/assets/images/2012/img_0165.jpg)

![](/assets/images/2012/img_0156.jpg)

For reference, these are the cable colours I used:

- Purple: +5 V from the LM7805
- Green: composite video from the mainboard
- Black and grey: ground
- Yellow: composite video output to the RCA centre pin

![](/assets/images/2012/img_0146.jpg)

![](/assets/images/2012/img_0150.jpg)

![](/assets/images/2012/img_0151.jpg)

With the components in place, the little board is ready to connect to the Famicom. Take particular care with the transistor orientation and capacitor polarity. If the modification doesn't work as expected, switch everything off and disconnect the power adaptor before checking the wiring.

### Audio output

![](/assets/images/2012/img_0158.jpg)

![](/assets/images/2012/img_0170.jpg)

![](/assets/images/2012/img_0154.jpg)

The orange audio wire runs into a 220 uF, 16 V electrolytic capacitor. In this build, the positive side faces the Famicom mainboard and the negative side runs towards the centre pin of the audio RCA connection. Add the ground connection and that's the sound output taken care of.

The owner decided to remove the second-player controller because the games being used were single-player. That also gave me a convenient route for the audio and video cables to leave the rear of the console. The modification board fits inside with enough cable slack to rearrange things later if necessary.

### Finished result

![](/assets/images/2012/img_0173.jpg)

![](/assets/images/2012/img_0174.jpg)

![](/assets/images/2012/img_0168.jpg)

Now all that's left is to enjoy Kirby and Spelunker! Composite video and audio are both working, although I haven't completely escaped the infamous jailbars. They're particularly noticeable in Kirby, and nobody likes jailbars. Not even people who are behind them!

I tried two ways of reducing them: connecting PPU pins 20 and 22, and adding connections to the PPU's +5 V and ground. Neither method helped on this machine, so for now the owner will have to live with the remaining interference. At least the Famicom itself is working through the new AV output.

Below are three videos showing the board, its wiring and the finished result.

{% include youtube.html id="zfdA--W3E5A" %}

{% include youtube.html id="dPkrig13CxE" %}

{% include youtube.html id="VaGMn3mrMa4" %}

**Update 2016:** A later guide covering improved Famicom AV modification and jailbar-reduction techniques can be found in [JPX72 - Famicom AV mod - NEW!](http://jpx72web.blogspot.com/2016/11/famicom-av-mod-new.html). It includes useful schematics and a related approach, although the jailbar-reduction methods I tried didn't work for me. Your luck may vary. Good luck!

### Related posts

- [Humble Beginnings: Nintendo Famicom Incoming](/humble-beginnings-nintendo-famicom-incoming/)
- [Nintendo Famicom AV Mod Complete](/nintendo-famicom-av-mod-complete/)

### Resources

- [McRetro Photo Gallery](/goodies)

### Sources

- [JPX72 - Famicom AV mod - NEW!](http://jpx72web.blogspot.com/2016/11/famicom-av-mod-new.html) - a later guide, published in 2016, covering Famicom AV modification and jailbar reduction.
- [ConsoleMods - NES Top Loader AV Mod](https://consolemods.org/wiki/NES:Top_Loader_AV_Mod) - documents a closely related PNP-transistor composite amplifier topology used in Nintendo RF-only hardware.
- [Ctrl-Alt-Rees - Nintendo Famicom Composite Video Output Mod](https://ctrl-alt-rees.com/2019-01-26-nintendo-famicom-composite-video-output-mod.html) - documents Famicom board-revision differences and later composite-mod approaches.
