---
title: "Sega Saturn Phantom Universal Modchip Testing & Region Lock"
author: "Nix McRetro"
date: 2020-01-20T09:58:52.000+11:00
categories: [guides, sega, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="mI_V0MdpCL4" %}

The last step in every mod is testing, and probably something about region locks if the title of this post is to be believed. I've got the Phantom Universal modchip installed in my Japanese Saturn, so it's time to find out which discs it will actually boot. There are a few different things to check here, especially once you start mixing PAL, NTSC-U and Japanese games.

The important thing to remember is that the Phantom handles disc authentication, not the Saturn's region protection. That means compatible CD-R backups can boot, but a game from another region still needs a separate region bypass. I'd completely forgotten about that little distinction when I started preparing my test discs. Whoops!

This particular Saturn has a Japanese BIOS, which means it's expecting NTSC-J games. For testing I've got a selection of discs, including Burning Rangers, NiGHTS into Dreams and Street Fighter: The Movie. I've also got two cartridges that should help with the region problem, an Action Replay and a GameShark.

The first test was to confirm that the Saturn could still read an ordinary commercial disc. Without a region bypass, the console recognised the disc but complained that it wasn't intended for this region. At least the CD mechanism was doing something useful. That's always a good start!

Next came the black Action Replay cartridge. Getting these things seated correctly can be rather annoying, especially when the Saturn cartridge connector decides it doesn't want to cooperate. Once it was properly inserted, NiGHTS booted and I was able to get into the game. Beautiful!

The more interesting test was Burning Rangers on a CD-R. With the Phantom handling the disc authentication and the Action Replay bypassing the region check, the game booted successfully. I hadn't spent much time playing Burning Rangers before, so naturally I got distracted by the game rather than concentrating on the repair.

I then swapped over to the GameShark and tried Street Fighter: The Movie. That booted as well, although the game itself was another matter entirely. I'm not particularly good at fighting games, and this one wasn't doing much to change my opinion. I did eventually manage to button-mash my way into something resembling a fight.

By the end of the session I'd confirmed that the Saturn could read commercial imports with a region-bypass cartridge, and that a CD-R backup could boot through the Phantom. That's exactly what I wanted from the modification.

We'll have another model of Saturn being modded in the future, so stay tuned for that madness. Bad_Ad84's Retro Gamer Stuff store later closed, but you can still read his [farewell](https://web.archive.org/web/20250820045546/https://retrogamerstuff.com/blogs/news/a-farewell).

**Sources**

- [GDEMU - Enter Rhea (disc authentication and region-lock discussion)](https://gdemu.wordpress.com/2014/09/30/enter-rhea/)
- [Pseudo Saturn Kai](https://ppcenter.webou.net/pskai/)

**Related Posts**

- [Sega Saturn Phantom Universal Modchip CD Drive Identification](/sega-saturn-phantom-universal-modchip-cd-drive-identification/)
- [Sega Saturn Phantom Universal Modchip Installation Tips](/sega-saturn-phantom-universal-modchip-installation-tips/)
- [Sega Saturn Phantom Universal Modchip Overview & Disassembly](/sega-saturn-phantom-universal-modchip-overview-disassembly/)
- [Sega Saturn Phantom Universal Modchip Installation](/sega-saturn-phantom-universal-modchip-installation/)
- [Installation of the Sega Saturn Phantom Universal Modchip](/installation-of-the-sega-saturn-phantom-universal-modchip/)
- [Sega Saturn Phantom Universal Modchip - Testing, Testing!](/sega-saturn-phantom-universal-modchip-testing-testing/)
