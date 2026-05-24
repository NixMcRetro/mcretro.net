---
title: "Amstrad Sega Mega PC AdLib Sound Issues Repaired"
author: "Nix McRetro"
date: 2012-11-15T00:50:42.000+11:00
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="AOF9JyYnzXg" %}

I've been having issues with getting any sound from the PC side of my Mega PC. At first, I thought it might be because I have no idea what drivers to use. However, because it is AdLib based, as in original AdLib sound card it should just work out of the box. That is the way it was designed to work anyway. The games I was testing with Paku Paku 1.6 and Monkey Island VGA Version from 1990 were all giving PC speaker sounds by default unless switches to force AdLib were entered.

Even with the distorted sound, the tunes could sometimes be recognised. Looking into it more I found that the card was very sensitive to being bumped causing the sound output to change from distorted to none. Eventually I discovered that it was the alignment of the card inside the machine that was preventing some kind of correct connection. At this point I had tried it all, cleaning all the contacts, switching resources around in the BIOS and even nearly started playing with unlabelled jumpers on the motherboard.

Why change the jumpers on the motherboard? The reason was simple. This motherboard was not from an Amstrad Mega PC, it was from an Amstrad PC7486SLC which just happens to have the same connections probably to save on manufacturing costs (Thanks Amstrad!). But after changing a cache jumper on the motherboard, I had sound... Tried a few more settings and it seemed to be working well. Reassembled and it stopped working again - back to distorted sound.

Then it hit me like a ton of bricks, the alignment of the motherboard and daughterboards. Especially the ISA riser card and front Mega Drive cartridge interface. Since I had replaced the motherboard from the 386SX version a long time ago there was every chance of misalignment, I never noticed though as the Mega Drive sound was working great, so I assumed a driver was needed on the PC side. But no, the Mega Drive sound works no matter how poorly aligned the card is. The PC side is finicky as all hell.

But, we have ended up with a working machine, reassembled piece by piece this afternoon successfully. Monkey Island and Paku Paku both working well through AdLib, no command line switches needed either. For reference though Paku Paku uses "paku /adli" and Monkey Island uses "monkey a". Overall another success. Now to get MS-DOS 6.22 and Windows 3.11 (WFW) installed again and hopefully with full sound support on the Windows side!

You can have a look at how things evolved on the [ASSEMblergames forums](https://web.archive.org/web/20191110053354/https://assemblergames.com/threads/adlib-compatible-sound-in-the-amstrad-mega-pc.42694/).
