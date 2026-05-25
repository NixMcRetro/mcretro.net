---
title: "Creative Labs CD-200 2x CD-ROM Success"
author: "Nix McRetro"
date: 2012-10-12T11:16:56.000+11:00
categories: [ibm-pc, repairs, youtube]
---

{% include youtube.html id="Kd9hdu-FFaA" %}

Mission accomplished. If anyone from the future comes here in search of how to get their Creative CD-200 functioning they will need to use CCD.SYS or CRCCD.SYS as the driver. Below are my specific CONFIG.SYS settings and AUTOEXEC.BAT settings and a video of it moments after I discovered it actually worked.

```
CONFIG.SYS
DEVICE=C:SBPRODRVCTSBPRO.SYS /UNIT=0 /BLASTER=A:220 I:5 D:1
DEVICE=C:SBPRODRVCTMMSYS.SYS
DEVICE=C:CCD.SYS /D:MSCD001 /P:220 /S:D

AUTOEXEC.BAT
SET SOUND=C:SBPRO
SET BLASTER=A220 I5 D1 T4
SET MIDI=SYNTH:1 MAP:E
C:SBPROSBPSET /P /Q
C:SB16DRVMSCDEX.EXE /D:MSCD001 /V /M:15

```

![](/assets/images/2012/img_0284.jpg)

![](/assets/images/2012/img_0285.jpg)

![](/assets/images/2012/img_0286.jpg)

![](/assets/images/2012/img_0287.jpg)

![](/assets/images/2012/img_0288.jpg)

**Resources:**
- [VOGONS Vintage Driver Library](https://www.vogonsdrivers.com)
- [French Driver Website](http://www.autourdupc.com/index.php?sPage=/Materiel/CDROM/CDROM_IDE.htm)
- [Virtual Dr](https://discussions.virtualdr.com/showthread.php?69838-Creative-Labs-2X-CD&s=becdc9d2b2ab5d5832c8dc2c373a1be6)
- [Vintage Computer Sound Blaster ISA Card Collection](https://forum.vcfed.org/index.php?threads/sound-blaster-ide-cards-drivers-collection.24571/)
- [Another Driver Website](https://files.mpoli.fi/hardware/SOUND/CLABS/)
