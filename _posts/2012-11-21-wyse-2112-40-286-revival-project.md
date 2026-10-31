---
title: "Wyse 2112-40 286 Revival Project"
author: "Nix McRetro"
date: 2012-11-21T21:43:56.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, ibm-pc, repairs]
---

{% include youtube.html id="pNFAPLzcT74" %}

This machine was originally earmarked to be stripped for parts. Then curiosity got the better of me, and I spent the next couple of days trying to get it back into a workable state. It's a Wyse 2112-40 with a 12.5 MHz 80286, a 40 MB hard drive and an original 720 KB 3.5-inch floppy drive. Quite an impressive old beast!

The first video shows the result of all that fiddling. The machine boots to DOS, the hard drive is accessible, and I can even play Paku Paku straight from it. There's a button on the front that switches between 8 MHz and 12.5 MHz, complete with a little speed indicator. The keyboard works too, although I've still got some screws and drive brackets to sort out.

I also noticed that the case looks remarkably similar to the Amdek 286. There are enough similarities to make me wonder whether the machines are related, but I haven't found sufficient documentation to establish exactly how.

{% include youtube.html id="-2QCB8n6xn8" %}

Getting to that working DOS prompt was quite an adventure. The original floppy arrangement wasn't cooperating, and I couldn't find an obvious way into the machine's setup utility. The 5.25" drive wasn't working, and the 3.5" drive didn't seem interested in becoming the boot device.

After pulling apart the machine, I had a look at the enormous CPU card, the memory expansion and the disk controller hardware. There's plenty of room inside, which is fortunate because some of these old expansion cards are enormous. The keyboard also weighs an absolute ton. They certainly didn't skimp on the construction!

Eventually I tried an Oak VGA card that included its own floppy and hard-drive controllers. That caused another problem because the machine already had controllers installed. Both were trying to handle the storage hardware, which wasn't especially helpful.

With very little documentation available, I experimented with the Oak card's jumpers until I found a combination that disabled its unwanted controller functions. Moving the relevant jumpers from positions 1-2 to 2-3 appeared to do the trick. I later identified the card as a Pine Technology PT-604, although at the time it was mostly trial and error.

Once the controller conflict was sorted out, the original 720 KB floppy drive began working again. I'd also tried a borrowed 1.44 MB floppy mechanism from another PC, and the Wyse seemed happy enough to operate it. That didn't establish whether the machine could actually format or use 1.44 MB high-density disks, of course. I could finally boot DOS and turn my attention to the hard drive.

The Seagate drive uses 820 cylinders, 17 sectors and 5 heads, but the BIOS didn't offer an exact match and the user-defined option wasn't cooperating. I ended up using drive type 8, which has matching heads and sectors but fewer cylinders. It cost me some capacity, bringing the usable space down to roughly 30 MB, but at least the drive became accessible.

After all that, the Wyse was finally running DOS and playing games. Not bad for a machine that was nearly sacrificed for spare parts! I've documented the investigation in my [Vintage Computer Forums thread](https://forum.vcfed.org/index.php?threads/wyse-technology-286-model-2112-40.34628/) if anyone wants to follow the earlier experiments.

**Sources**

- [Stason - Wyse PC 286 Model 2112](https://www.stason.org/TULARC/pc/motherboards/W/WYSE-TECHNOLOGY-INC-286-WYSE-PC-286-MODEL-2112.html) - documents the 12.5 MHz 80286 configuration.
- [GSETUP Boot Disk Guide](https://www.minuszerodegrees.net/5170/setup/5170_gsetup_720.htm) - IBM 5170 setup reference; compatibility with other BIOS implementations varies.
- [VCFed - How to Get into BIOS, Tulip DC-286](https://forum.vcfed.org/index.php?threads/how-to-get-into-bios-tulip-dc-286.25006/) - historical discussion of alternative BIOS setup methods.
- [VCFed - Seagate ST-251 MLC1 on IBM XT-286](https://forum.vcfed.org/index.php?threads/seagate-st-251-mlc1-on-ibm-xt-286.18735/) - the hard-drive geometry discussion referenced during my troubleshooting.
- [Pine Technologies PT-604 Information (Archived)](https://web.archive.org/web/20010412185405/http://www.riceball.com/computertips/pt604.html) - archived information about the VGA/controller card.
