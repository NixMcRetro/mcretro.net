---
title: "Installation of the Sega Saturn Phantom Universal Modchip"
author: "Nix McRetro"
date: 2020-06-29T12:30:35.000+10:00
categories: [guides, sega, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="t2gWT1esQAw" %}

This continues the Phantom Universal adventures from earlier in the year. The chip was developed by Bad_Ad84 and Zer0-2k11 and lets CD-R backups boot, but it doesn't remove the Saturn's region lock. This time we're installing one into a PAL Model 2 Saturn, which sounds simple enough until you actually start arranging all those ribbon cables.

Naturally I started the project having forgotten that I didn't have any Kynar wire available. That's rather important when you're supposed to be wiring in a modchip! Thankfully I've now got some, along with the chip and the appropriate cables for this particular drive.

The first job was getting the Saturn apart and working out where everything needed to go. There are a remarkable number of Saturn motherboard and CD drive variations, which is why identifying the hardware beforehand is so useful. The cable arrangement in this machine was particularly annoying, with one section much longer than I really needed.

I spent rather more time trying to fold and position the ribbon cable than I did identifying the solder connections. Every time I thought I'd found a sensible arrangement, something ended up twisted, folded the wrong way or sticking out where the CD drive needed to sit. This is supposed to be the easy part!

For the electrical connections, the Phantom needed its power wiring and the appropriate jumper configuration. I used Kynar wire, with 26 to 30 AWG working well for my wiring, including the 5 V connection. I also checked the drive connection against the installation guide, rather than relying entirely on my increasingly questionable memory.

The soldering itself wasn't particularly complicated, although getting a neat joint on the chip took some fiddling. Then it was back to cable routing, keeping the additional wire out of the way and making sure the chip wasn't going to short against the surrounding metalwork.

After another round of arranging cables and applying insulation, everything was looking considerably more sensible. Not exactly factory quality, but at least the components were connected and the drive could be put back into position. I wasn't particularly interested in sealing everything up before testing it, given how much work it would be to take apart again.

This recording finishes with the installation prepared for testing. I didn't show a successful game boot in this particular video, so the actual results belong with the follow-up. At least the wiring adventure is out of the way, and we'll find out whether it was all worthwhile.

Most of this footage is quite, let's say... aged. By June 2020 there were already newer ways to load games from SD cards, including Rhea / Phoebe, with the Satiator on the way and Fenrir then available for 20-pin drives. Those are disc-free options; the Phantom still uses the Saturn's CD drive.

I've also ordered a bunch of capacitors to recap a VA15 This is COOL Saturn. Strangely, they're all through-hole caps, and I was delighted to see only one SH-2 package! Both SH-2 CPUs are still there, integrated into the single 315-6018 package rather than the two separate packages on earlier revisions.

**Related Posts**

- [Sega Saturn Phantom Universal Modchip CD Drive Identification](/sega-saturn-phantom-universal-modchip-cd-drive-identification/)
- [Sega Saturn Phantom Universal Modchip Installation Tips](/sega-saturn-phantom-universal-modchip-installation-tips/)
- [Sega Saturn Phantom Universal Modchip Overview & Disassembly](/sega-saturn-phantom-universal-modchip-overview-disassembly/)
- [Sega Saturn Phantom Universal Modchip Installation](/sega-saturn-phantom-universal-modchip-installation/)
- [Sega Saturn Phantom Universal Modchip Testing & Region Lock](/sega-saturn-phantom-universal-modchip-testing-region-lock/)
- [Sega Saturn Phantom Universal Modchip - Testing, Testing!](/sega-saturn-phantom-universal-modchip-testing-testing/)

**Sources**

- [Phantom Universal - Model 1 Installation Guide](/assets/uploads/PhantomUniversal_Model1_Install-Guide.pdf)
- [GDEMU - Enter Rhea](https://gdemu.wordpress.com/2014/09/30/enter-rhea/)
- [Fenrir - Firmware version history](https://www.fenrir-ode.fr/firmware/)
- [ConsoleMods Wiki - Saturn Model Differences](https://consolemods.org/wiki/Saturn%3ASaturn_Model_Differences)
