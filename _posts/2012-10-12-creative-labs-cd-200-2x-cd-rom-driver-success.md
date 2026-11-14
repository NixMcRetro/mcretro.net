---
title: "Creative Labs CD-200 2x CD-ROM Driver Success"
author: "Nix McRetro"
date: 2012-10-12T11:16:56.000+11:00
last_modified_at: 2026-10-18
categories: [computing, repairs, youtube]
share_description: >-
  Success! The Creative Labs CD-200 finally reads discs under DOS using CCD.SYS and MSCDEX. Removing one troublesome jumper helps end the driver nightmare. 💿
---

{% include youtube.html id="Kd9hdu-FFaA" %}

We did it! After a couple of days of messing around with drivers, I've finally managed to get my Creative Labs CD-200 double-speed CD-ROM drive working under DOS. Something that ought to have been relatively straightforward turned into a surprisingly stubborn little project, mostly because finding useful information about this particular drive was a nightmare.

The breakthrough came while I was downloading and trying assorted Creative drivers. I happened to notice a reference to the CD-200 in one of the packages and thought that was a rather promising coincidence. Sure enough, `CCD.SYS` turned out to be the driver that worked in my setup. Once that loads, MSCDEX gives DOS a drive letter and we can finally start accessing discs.

There was another trick hiding on the back of the drive. I'd fitted a jumper on one of the identifier positions, and MSCDEX kept freezing during startup. Removing that jumper got me past the problem, although I wouldn't assume the same configuration is right for every controller and drive combination. These are the settings that worked with my particular Sound Blaster and CD-200.

```
CONFIG.SYS
DEVICE=C:\SBPRO\DRV\CTSBPRO.SYS /UNIT=0 /BLASTER=A:220 I:5 D:1
DEVICE=C:\SBPRO\DRV\CTMMSYS.SYS
DEVICE=C:\CCD.SYS /D:MSCD001 /P:220 /S:D

AUTOEXEC.BAT
SET SOUND=C:\SBPRO
SET BLASTER=A220 I5 D1 T4
SET MIDI=SYNTH:1 MAP:E
C:\SBPRO\SBPSET /P /Q
C:\SB16\DRV\MSCDEX.EXE /D:MSCD001 /V /M:15
```

With that configuration loaded, DOS recognised the CD-ROM and I could finally get at the disc. I was almost expecting another problem to appear when I tried it for the first time, but no, it actually worked! After staring at a desktop full of random drivers and wondering what I'd missed, that's a pretty satisfying result.

![ViewSonic monitor showing an MS-DOS startup screen where MSCDEX reports 'Drive D: = Driver MSCD001 unit 0'.](/assets/images/2012/img_0284.jpg)

*Success! MSCDEX has finally assigned drive D: to the Creative CD-ROM. After all that driver hunting, what a relief!*
{: .media-caption }

![Creative CD-200 drive resting on an open Osborne computer with a blue floppy disk partly inserted in the machine's floppy drive.](/assets/images/2012/img_0285.jpg)

*The CD-200 back on the Osborne while I finish sorting the boot disks and drivers. I'm finally getting somewhere!*
{: .media-caption }

![Close-up of the Creative CD-200 top label showing 'MODEL CD-200', '+5V 1A', 'MADE IN SINGAPORE' and Class 1 laser warnings.](/assets/images/2012/img_0286.jpg)

*The CD-200's own label, complete with its model number and laser warnings. At least we know exactly which drive we're dealing with!*
{: .media-caption }

![Rear of the Creative CD-200 CD-ROM drive showing a grey ribbon cable and printed connector labels for audio, drive ID, interface and DC power.](/assets/images/2012/img_0287.jpg)

*The connectors that caused so much head-scratching. That 40-pin ribbon cable looks deceptively familiar, but this isn't ordinary IDE.*
{: .media-caption }

![Creative CD-200 drive mounted in the front bay of a beige Osborne computer, with its yellow BUSY indicator illuminated.](/assets/images/2012/img_0288.jpg)

*And now the CD-200 is actually in the Osborne's front bay. After all that trouble, it looks right at home!*
{: .media-caption }

Thanks to everyone who helped me track this one down. A functioning double-speed Creative CD-ROM drive is now sitting in the Osborne, and I think that earns us a BBQ party!

### Resources

- [VOGONS Vintage Driver Library](https://www.vogonsdrivers.com)
- [French Driver Website](https://web.archive.org/web/20100311235635/http://www.autourdupc.com:80/index.php?sPage=/Materiel/CDROM/CDROM_IDE.htm)
- [VirtualDr - Creative Labs 2X CD](https://discussions.virtualdr.com/showthread.php?69838-Creative-Labs-2X-CD&s=becdc9d2b2ab5d5832c8dc2c373a1be6)
- [Vintage Computer Federation - Sound Blaster IDE Cards Drivers Collection](https://forum.vcfed.org/index.php?threads/sound-blaster-ide-cards-drivers-collection.24571/)
- [Metropoli BBS - Creative Labs driver directory](https://files.mpoli.fi/hardware/SOUND/CLABS/)

### Sources

- [Creative: CD-ROM Driver README.TXT (CCD.SYS/CRCCD.SYS and MSCDEX)](https://driverzone.com/drivers/creative/cdrom/crccd.htm)

### Related Posts

- [Creative Labs CD-200 2x CD-ROM Driver Hunt](/creative-labs-cd-200-2x-cd-rom-driver-hunt/)
