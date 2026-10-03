---
title: "Creative Labs CD-200 2x CD-ROM Driver Success"
author: "Nix McRetro"
date: 2012-10-12T11:16:56.000+11:00
last_modified_at: 2026-10-03
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-03
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [ibm-pc, repairs, youtube]
---

{% include youtube.html id="Kd9hdu-FFaA" %}

Mission accomplished.

If anyone from the future arrives here trying to get a Creative Labs CD-200 working under DOS, the breakthrough was finding a Creative driver that worked with this drive. `CCD.SYS` worked in my setup. Once the hardware driver is loaded, MSCDEX provides the DOS drive letter.

The settings below are the exact configuration that worked in this particular machine. The port address and driver switches depend on the controller or sound card the CD-ROM is connected through, so don't assume every CD-200 will use precisely the same values.

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

And there it is. A functioning double-speed Creative CD-ROM drive. After the desktop full of random drivers in the previous post, this was a particularly satisfying result.

BBQ party successfully earned.

![](/assets/images/2012/img_0284.jpg)

![](/assets/images/2012/img_0285.jpg)

![](/assets/images/2012/img_0286.jpg)

![](/assets/images/2012/img_0287.jpg)

![](/assets/images/2012/img_0288.jpg)

### Related posts

- [Creative Labs CD-200 2x CD-ROM Driver Hunt](/creative-labs-cd-200-2x-cd-rom-driver-hunt/)

### Resources

- [VOGONS Vintage Driver Library](https://www.vogonsdrivers.com)
- [French Driver Website](https://web.archive.org/web/20100311235635/http://www.autourdupc.com:80/index.php?sPage=/Materiel/CDROM/CDROM_IDE.htm)
- [VirtualDr - Creative Labs 2X CD](https://discussions.virtualdr.com/showthread.php?69838-Creative-Labs-2X-CD&s=becdc9d2b2ab5d5832c8dc2c373a1be6)
- [Vintage Computer Federation - Sound Blaster IDE Cards Drivers Collection](https://forum.vcfed.org/index.php?threads/sound-blaster-ide-cards-drivers-collection.24571/)
- [Metropoli BBS - Creative Labs driver directory](https://files.mpoli.fi/hardware/SOUND/CLABS/)

### Sources

- [Creative CD-ROM driver package README.TXT](https://driverzone.com/drivers/creative/cdrom/crccd.htm) - describes updating CCD.SYS/CRCCD.SYS and installing MSCDEX separately. The configuration above records what worked in my machine.
