---
title: "Osborne 486 MBR Virus Infection"
author: "Nix McRetro"
date: 2012-10-23T05:56:45.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs]
---

![](/assets/images/2012/img_0332.jpg)

Looks like I am not the only one who has a virus at the moment. Trusty old Osborne ended up with an MBR or boot-sector virus, and the Sound Blaster 16 installation disks I had been using were also found to be infected. At the time I assumed the infection had come from those disks, although without a known-clean copy to compare against I cannot establish whether the disks infected the PC or the PC infected the disks.

![](/assets/images/2012/img_0333.jpg)

It was only discovered after I'd used the disks in the machine and brought them back to reformat / re-image more data onto them. So a big thanks to Avast for Windows XP for detecting issues on my floppy disks and another big thanks to Caluser2000 over at the [Vintage Computer forums](https://forum.vcfed.org/index.php?threads/recommendations-on-antivirus-software-for-486-class-pcs.34252/#post419712) for pointing me in the right direction so quickly.

![](/assets/images/2012/img_0334.jpg)

F-Prot 3.16f saved the day. The file I downloaded was called fprot\_dos\_316f.zip and contains definitions as recent as 2009. Runs in pure DOS mode - just be sure to boot from a known-clean and preferably write-protected floppy disk so the infected system cannot alter the rescue disk. Windows 95 has also been installed and I'll now be attempting to get internet access to some degree.
