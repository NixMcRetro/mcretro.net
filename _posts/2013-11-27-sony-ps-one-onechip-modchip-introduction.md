---
title: "Sony PS one ONECHIP Modchip Introduction"
author: "Nix McRetro"
date: 2013-11-27T01:27:11.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, sony, youtube]
---

{% include youtube.html id="KOO84WW6fSs" %}

MultiMode3, stand aside! It works nicely on many of the older PlayStation revisions, but Sony (creator of all things PlayStation) added another complication to the little PAL PS one SCPH-102: an additional territory check in the boot ROM.

Enter **ONEchip**, the modchip firmware that combines normal disc-authentication behaviour with a boot-ROM patch to bypass that extra check for imports. A conventional modchip that only handles disc authentication doesn't bypass the additional PAL PS one check by itself. Naturally, now we have to install one.

I've got a few of the little PS one consoles here, and they're rather lovely machines. Much smaller than the original grey PlayStation, with a rather tidy internal layout. I've been playing *Final Fantasy VIII* and testing the CD mechanisms while deciding which machine will get the modchip treatment.

Unfortunately, the ONEchip installation wasn't going to happen quite as quickly as I'd hoped. The firmware and programming information I had at the time called for a PIC12C508A, which is a one-time-programmable device.

Naturally, what did I have sitting around? A whole collection of PIC12F629 chips, which can be erased and programmed again. Perfectly useful little things, just not what I needed for this particular ONEchip build. So the modchip experiment had to go on hold until I could sort out the right parts.

Wonderful. I finally work out which modchip I want, and then discover I've collected the wrong PICs! Since I already had the consoles on the bench, I spent some time pulling them apart and comparing their condition.

One machine was working quite nicely, although its laser assembly was a little noisy. Another had suffered some truly impressive liquid damage. The damaged one was particularly unpleasant, with corrosion around parts of the board and a CD mechanism that wasn't doing anything useful.

At least it powered on, so there was something to work with if I decided to tackle the repairs later. I tried swapping a CD assembly between the machines to see whether the fault followed the mechanism. The damaged console still wasn't behaving itself, but the assembly proved useful in another unit that had a troublesome spindle hub.

So while I didn't get the ONEchip fitted in this video, I did manage to make one PS one work properly by combining parts from the others. Mix and match, and you've got yourself a functioning PlayStation! I also sorted out a sticky reset button along the way. Sometimes it's the smallest jobs that turn out to be the least troublesome.

The ONEchip project remains on the list. I've got the console, I've got the reason for using a different modchip, and now I just need to get the correct programmable device sorted out. It would be nice if one of these projects could be completed without requiring another parts order. Just once!

**Sources**

- [ConsoleMods Wiki - PS1 Region Information](https://consolemods.org/wiki/PS1:Region_Information)
- [ConsoleMods Wiki - PS1 Modchips](https://consolemods.org/wiki/PS1:Modchips)
- [TheFrietMan - PsNee v6 source and ONEchip BIOS-patch analysis (2016)](https://gist.github.com/gbraad/d0c4e7396727bd362cd67e1e9e023385#file-psnee-v6-ino)
