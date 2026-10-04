---
title: "Disk on Modules and the XTIDE BIOS on the Sega TeraDrive"
author: "Nix McRetro"
date: 2013-02-17T19:11:53.000+11:00
categories: [ibm-pc, repairs, sega]
last_modified_at: 2026-10-05
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-05
  purpose: "fact-checking, sourcing, and editorial quality"
---

![](/assets/images/2013/img_0377.jpg)

So many types of disk on modules, so little time. Found this [in the XTIDE Universal BIOS v2.0.0 manual](https://www.xtideuniversalbios.org/browser/xtideuniversalbios/wiki/Manual_v2_0_0.wiki?rev=329#Problems_with_Compact_Flash_cards_and_microdrives) while searching.

> Some CF cards and microdrives do not work properly with IBM 5150/5160 when using XTIDE rev 1 or rev 2. Some of the symptoms are improperly displayed drive name on boot menu or the drive appears to work on some occasions and sometimes not. This is a hardware related problem and cannot be fixed by software.

So far I've gone through three types / brands of disk on modules. I was after one that was powered on pin 20 for 5V and preferably around 2GB in size. That is a convenient ceiling for a single FAT16 partition under the MS-DOS versions I was using, where 2GB is the normal maximum partition size. It's plenty of room for a 286-class machine as well.

| DOM tested | 5 V from pin 20 | Recognised with XTIDE in this setup |
| --- | --- | --- |
| Transcend 4 GB | Yes | No |
| KingSpec 2 GB | No | Yes |
| TopSSD 4 GB | Yes | Yes |

Unfortunately, I can't track down these TopSSD drives anywhere. I was hoping the Transcend ones would work best, but they didn't. They had voltage, but weren't recognised correctly with the XTIDE software. Limitations or issues with the Transcends sure is harsh. But at least I have now seen all three possible scenarios these DOMs provide. There can't be any more ways to fail, right? RIGHT?!?!?! :D

The XTIDE warning quoted above specifically concerns CompactFlash cards and Microdrives, so it should not be taken as proof of why this particular Transcend DOM failed detection. All I established here was that the Transcend unit had power but was not recognised correctly in my setup. Current XTIDE documentation still notes compatibility quirks with some CF cards and Microdrives.

![](/assets/images/2013/img_0375.jpg)

![](/assets/images/2013/img_0376.jpg)

### Sources

- [XTIDE Universal BIOS - Documentation and known storage compatibility issues](https://xtideuniversalbios.org/)
- [XTIDE Universal BIOS v2.0.0 Manual](https://www.xtideuniversalbios.org/browser/xtideuniversalbios/wiki/Manual_v2_0_0.wiki?rev=329)
