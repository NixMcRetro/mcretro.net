---
title: "Osborne 486 Boot-Sector Virus Cleanup with F-PROT"
author: "Nix McRetro"
date: 2012-10-23T05:56:45.000+11:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs]
---

![](/assets/images/2012/img_0332.jpg)

Looks like I am not the only one who has a virus at the moment.

The trusty old Osborne ended up with what appeared to be an MBR or boot-sector infection.

The Sound Blaster 16 installation disks I had been using were also detected as infected.

At the time I assumed those disks had infected the PC.

I cannot actually prove the direction of transmission though. Without a known-clean copy of the disks from before they entered the Osborne, the PC could just as easily have infected them.

![](/assets/images/2012/img_0333.jpg)

I only discovered the problem after using the disks in the Osborne and then bringing them back to another machine to reformat and re-image.

So a big thanks to Avast under Windows XP for sounding the alarm, and to Caluser2000 over at the [Vintage Computer forums](https://forum.vcfed.org/index.php?threads/recommendations-on-antivirus-software-for-486-class-pcs.34252/#post419712) for pointing me towards a DOS-era cleanup tool.

![](/assets/images/2012/img_0334.jpg)

F-PROT 3.16f saved the day.

The archive I used was `fprot_dos_316f.zip`, with virus definitions dating into 2009.

F-PROT 3.16f was the final DOS version and is perfectly at home on a 486.

For this sort of boot-sector cleanup, the important part is starting the infected computer from known-clean media rather than booting from the compromised hard disk.

Ideally that rescue floppy should also be write-protected so the infected system cannot modify it.

Windows 95 is now installed as well, and the next challenge is getting this thing onto the internet to some degree.

### Related posts

- [Osborne Australia 486DX2-66 Overview](/osborne-australia-486dx2-66-overview/)
- [Osborne 486 Windows 95 Installation Demo](/osborne-486-windows-95-installation-demo/)

### Sources

- [DOS Days - Antivirus Utilities](https://www.dosdays.co.uk/topics/antivirus_utilities.php) - documents F-PROT 3.16f as the final DOS release and preserves historical usage details.
