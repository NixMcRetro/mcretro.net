---
title: "Sony PlayStation 1 Modchip Installation Success on SCPH-9002"
author: "Nix McRetro"
date: 2013-11-26T00:23:47.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, sony, youtube]
---

{% include youtube.html id="cCzbp0DwzGY" %}

What a mess! But I guess that's just the way I like it. :) After all those earlier attempts at programming and installing a PlayStation modchip, I've finally got MultiMode3 (MM3) running in the SCPH-9002. Hooray!

I'd originally been trying to use a PIC12C508A, but eventually switched over to a PIC12F629. It's a flash-based, reprogrammable chip, which means I can erase it and start again if something goes wrong. Given how many mistakes I've made during this project, that's a rather attractive feature!

The chips were around the same price too, so there wasn't much reason to keep sacrificing one-time-programmable PICs. I'd rather have a stack of chips I can reflash than another collection of expensive little mistakes.

Programming the MM3 firmware went well enough, although the GQ-4X still gave me a configuration verification failure at the end. That was a little worrying, but I'd already decided to give the chip a try. As you'll see, the installation actually worked despite that message!

The wiring certainly isn't going to win any awards. Some of the wires turned out shorter than I'd planned, so the modchip couldn't sit in the position I'd originally chosen. Instead, I've stuck it on top of another Sony chip with a bit of Blu Tack underneath. Classy. Very classy!

Fortunately, all the connections survived being moved around. I hadn't managed to pull any more tiny components off the motherboard, which was a pleasant change from the earlier installation attempt. The important thing was that the modification was functional, even if its appearance left plenty of room for improvement.

I added some Kapton tape for insulation and worked out how to secure the modchip so it wouldn't touch the metal shielding. There was enough room inside this particular PlayStation for everything to fit, although I definitely want to make a tidier job of the next one. I've got plenty more PlayStations to practise on!

With the console back together, it was time for some testing. First up was *Crash Bandicoot*, or at least a PAL-compatible version, and the familiar Sony Computer Entertainment Europe screen appeared. The game started properly, which was rather encouraging after all the trouble I'd had getting to this point.

Of course, I couldn't leave it there. I had a pile of other discs to try, many of which weren't even labelled, and I was already having problems with the CD burner I'd used to make them. Some hadn't verified correctly, but naturally I decided to see what the PlayStation would make of them anyway.

One disc reached the Sony Computer Entertainment America screen and then refused to go any further. That showed something was happening with the modchip, although it was hardly the result I'd been hoping for. Between the questionable discs and the PAL console's handling of NTSC video through composite, there were plenty of things that could go wrong.

Eventually I tried a PAL-patched version of *Final Fantasy VIII*, and this time we actually got into the game! Beautiful! I hadn't really worked out what I was supposed to be doing, but that didn't stop me from wandering around, making questionable decisions and getting into trouble.

Unfortunately, the fun didn't last. The disc already had reported CRC errors, and after a while the music started skipping and the game stopped behaving itself. I managed to get through some of the opening sections before it all came unstuck. I really needed a CD burner that could burn properly!

Still, the PlayStation was booting the modified discs and the MM3 was doing its job. The troublesome gameplay was another matter, especially when some of those discs had already failed verification before I even put them into the console.

And yes, that tiny surface-mount component I'd knocked off during the original installation is back on the motherboard. I believe it was a 10 kOhm resistor, although I wasn't completely certain of its value in the recording. At least the PlayStation was behaving rather better than it had when I first started attacking it.

So after all the failed programming attempts, missing components, untidy wires and troublesome discs, I've finally got a functioning MultiMode3 installation. It's not pretty, but it works. I'll take that!

**Update:** The CD burner I was using for the test games turned out to be faulty. In the excitement of getting everything working, **Verify burn** had either been switched off or ignored. Whoops! The follow-up explains what I discovered, and it certainly accounts for why those discs were such a miserable collection of test candidates.

**Sources**

- [Microchip - PIC12F629/675 Data Sheet](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/DataSheets/41190G.pdf)
- [MCUmall Forum - Update the PIC chip OSCCAL value](http://www.mcumall.com/forum/topic.asp?TOPIC_ID=4858)

**Related Posts**

- [Sony PlayStation 1 Modchip Installation Failure on SCPH-9002](/sony-playstation-1-modchip-installation-failure-on-scph-9002/)
- [PIC12F629 Blinking LED Test and McCain Pizza Pockets](/pic12f629-blinking-led-test-and-mccain-pizza-pockets/)
- [Sony PlayStation 1 Modchip Installation on SCPH-9002 Update](/sony-playstation-1-modchip-installation-on-scph-9002-update/)
