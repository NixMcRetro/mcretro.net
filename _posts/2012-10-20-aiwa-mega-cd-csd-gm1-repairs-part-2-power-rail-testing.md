---
title: "Aiwa Mega-CD CSD-GM1 Repairs Part 2: Power Rail Testing"
author: "Nix McRetro"
date: 2012-10-20T04:17:40.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, repairs, sega]
share_description: >-
  The Aiwa Mega-CD's power rails get traced through transformer wiring and DC-DC converters. The game side is only seeing about 3.3 V, and the video looks awful. ⚡
---


{% include youtube.html id="rk-CYnqxv6M" %}

The video above isn't actually the one I originally intended to upload. YouTube messed up the upload, and while trying to recover it, I accidentally deleted the original. Gone! Never mind, enjoy some transformer rantings instead. At least I've got something to show for the weekend.

I've pulled the transformer out of the Aiwa Mega-CD CSD-GM1 and started tracing where all the wires go. This video is partly for my own reference, because after spending enough time looking at white, blue, red, black and yellow wires, I'm beginning to forget which ones belong where.

One thing that caught my attention was the little switch associated with the power socket. It changes state when the power cable is inserted, and it appears somebody had previously installed part of the arrangement facing the wrong way. Whoever was inside this machine before me wasn't paying much attention! I'm still working out exactly which supplies run to which sections of the Aiwa, but at least the transformer is starting to make a little more sense.

### Reconnecting the power wiring

I started the weekend by reconnecting the two blue wires to each other and the two white wires to each other. They'd been separated for reasons unknown, so I compared the wiring with my other CSD-GM1 and followed what appeared to be the original routing. These are notes from my own repair experiments rather than instructions for working on live mains circuitry, which is something to take very seriously.

![Green Aiwa battery-connection circuit board with many coloured leads and a barrel-power connector, lying on pink bubble wrap.](/assets/images/2012/img_0308.jpg)

*The Aiwa's battery-connection board with the new test wiring. I've got quite a collection of colours to keep track of now.*
{: .media-caption }

Next came the DC-DC step-down converters. I initially set one to 6.3 V and the other to 9.75 V, with their ground connection running to the same point on the battery PCB that feeds into the transformer wiring. The idea was to find out whether I could get the various sections of the machine running without relying on the troublesome original transformer.

![Two small blue DC-DC converter boards connected by red and black wires to a green Aiwa board, spread across bubble wrap on the workbench.](/assets/images/2012/img_0309.jpg)

*Two little DC-DC converters to help chase the power problem. There is a lot more wiring than I'd hoped for!*
{: .media-caption }

### Following the rails

The Mega-CD mechanism connects to the rest of the machine through several wiring harnesses, and I've been trying to work out what each one does. From the testing so far, here's what I've established:

1. The long connector on the right powers the CD mechanism and front control buttons.
2. The medium connector on the left carries an approximately 8 V supply on one pin.
3. The short connector on the right provides the supply feeding the Mega Drive section.

That last connection is particularly important because the game hardware ultimately needs a regulated 5 V supply. Unfortunately, I was only measuring around 3.3 V, and the resulting picture looked absolutely terrible. Clearly something wasn't quite right.

![Aiwa Mega-CD Game Unit with its blue plastic cover lifted, exposing a brown circuit board and grey multipin connector with attached wires.](/assets/images/2012/img_0310.jpg)

*The Game Unit opened up for testing, with the connector and controller board exposed.*
{: .media-caption }

To keep everything connected during testing, I've had to sit the machine upside down and backwards on the workbench. An excellent recipe for sanity! It isn't the most convenient arrangement in the world, but it lets me reach the boards and check the voltages without constantly dismantling everything.

![Underside of a partly dismantled blue Aiwa stereo showing its green solder-side PCB, yellow and purple jumper wires and a brown battery-contact board.](/assets/images/2012/img_0311.jpg)

*Underneath the Aiwa again, where every wire seems to lead to another mystery.*
{: .media-caption }

![Close view inside the upside-down Aiwa stereo, with a small brown spring-contact board, multicoloured harness and green PCB with repair wires.](/assets/images/2012/img_0315.jpg)

*A closer look at that crowded Aiwa wiring and the spring-contact board while I sort out the supplies.*
{: .media-caption }

![Partly opened Aiwa with its green mainboard turned over above a grey underside panel, exposing solder joints and long yellow and purple repair wires.](/assets/images/2012/img_0312.jpg)

*The Aiwa's exposed mainboard and its ever-growing network of jumper wires. It is not going back together in a hurry!*
{: .media-caption }

Here's the back of the Aiwa with both DC-DC converters connected. It looks a little ridiculous with all the extra wiring hanging out, but at least I can start testing the different supplies independently.

![Two blue DC-DC converter boards with red, black and purple wires connected to a loose power socket over the open Aiwa chassis.](/assets/images/2012/img_0313.jpg)

*The two converters connected up for power testing, with the Aiwa cabinet spread out beneath them.*
{: .media-caption }

Blue, white, red and black are the colours of the day. By this point I've become rather familiar with where the wires run around the mainboard, although I'm still not entirely certain which circuits some of them supply.

![Inside the open Aiwa stereo, showing the brown spring-contact board, multicoloured wiring and mainboard with purple jumper wires.](/assets/images/2012/img_0314.jpg)

*Another view of the Aiwa's wiring, with the power connectors and damaged board still easy to reach.*
{: .media-caption }

Now to power it on and see what happens. Errr... that's not looking quite right!

### Finding the regulator problem

![Samsung television showing a Sega Mega-CD startup screen with Sonic partly obscured by severe coloured speckling and horizontal video interference.](/assets/images/2012/img_0317.jpg)

*Errr... that's not right! The Mega-CD picture looks dreadful while the supply voltage is too low.*
{: .media-caption }

![Sony Trinitron CRT showing a heavily distorted, static-filled picture with faint Sega startup graphics barely visible.](/assets/images/2012/img_0318.jpg)

*Even the CRT is showing the same miserable mess. Definitely time to revisit the power rails!*
{: .media-caption }

![Samsung screen showing a washed-out, nearly monochrome Sega Mega-CD startup image with Sonic on the right.](/assets/images/2012/img_0319.jpg)

*The picture is still washed out and miserable. There is clearly more investigating to do.*
{: .media-caption }

I've been measuring the voltages at several points around the machine. One of the CD-deck supplies looked reasonably close to what I expected, but another was almost 2 V too low. More importantly, a regulator that should have been producing around 6 V was only giving me about 4 V. That might explain why the Mega Drive section was behaving so badly.

Disconnecting one of the converters also established that the white-wire supply was feeding the Mega Drive hardware. I still hadn't worked out exactly what the blue-wire supply was responsible for, but at least I was beginning to narrow things down.

![Handwritten Aiwa Mega-CD power-test notes on white paper, with '3.3V on short' circled and marked 'Too low!'.](/assets/images/2012/img_0316.jpg)

*My decidedly unscientific-looking notes, including that 3.3 V measurement I really did not want to see.*
{: .media-caption }

Then I realised what I'd done. I'd been feeding just 6.3 V into a regulator that was supposed to produce approximately 6 V. If it's behaving like a conventional 7806, it needs some extra voltage at the input to regulate properly, typically around another 2 V under load. No wonder the output was struggling!

I increased the test input to 8 V and gave it another go. Now we're getting somewhere!

![Samsung television showing the Sega Mega-CD startup screen with Sonic and SEGA lettering visible, although the picture retains horizontal speckling.](/assets/images/2012/img_0320.jpg)

*This is looking rather more like a Sega startup screen. Still some interference, but a lot better than before!*
{: .media-caption }

![Overhead view of the dismantled Aiwa CSD-GM1 on bubble wrap, with an exposed green mainboard, power cables, soldering tools and handwritten voltage notes.](/assets/images/2012/img_0321.jpg)

*The bench after all those power-supply experiments. The Aiwa is still in pieces, but at least things are moving forward.*
{: .media-caption }

![Samsung television showing a clear Sega Mega-CD 2 startup screen, with Sonic, the logo and Japanese start-button instruction.](/assets/images/2012/img_0322.jpg)

*There we go! The Mega-CD screen is finally looking respectable again, with sound back as well according to the test.*
{: .media-caption }

Not only did the picture improve enormously, but **there was sound coming from the damaged mainboard as well!** Victory! After all the broken tracks, damaged circuitry and fiddling around with power supplies, it's rather satisfying to see this thing producing a proper picture and audio again.

That also tells me that the 6 V regulator wasn't getting enough input voltage during my earlier tests. I'll still need to investigate the original transformer and the surrounding circuitry before deciding exactly what's wrong with the power supply. The rectification, filter capacitors, wiring and whatever load is attached could all be contributing to the problem.

More importantly, the mainboard repairs I've been working on are doing their job well enough for the Aiwa to produce both video and sound. That's a very welcome result, considering the state this machine was in when I started.

I've also got a replacement optical pickup for the CD mechanism, so perhaps I'll even get to play a Mega-CD game on this thing eventually. There's still plenty to do, but for once the repairs appear to be heading in the right direction.

Thanks again to Dutchy over on the [ASSEMbler Games forum](https://web.archive.org/web/20130920141927/http://www.assemblergames.com/forums/showthread.php?42186-Aiwa-Mega-CD-CSD-GM1-Mainboard-Repair) for reminding me that voltage regulators need some headroom above their regulated output. That little reminder may have saved the day!

### Sources

- [STMicroelectronics: L78 Datasheet (L7806A, 2 V Typical Dropout at 1 A)](https://www.st.com/resource/en/datasheet/l78.pdf)
- [HSE: Electrical Safety FAQ (Live Work and Stored Energy)](https://www.hse.gov.uk/electricity/faq.htm)

### Related Posts

- [Aiwa Sega Mega-CD CSD-GM1 Repairs Part 1: Power Restored](/aiwa-sega-mega-cd-csd-gm1-repairs-part-1-power-restored/)
- [Aiwa Sega Mega-CD CSD-GM1 KSS-210B Laser Replacement](/aiwa-sega-mega-cd-csd-gm1-kss-210b-laser-replacement/)
