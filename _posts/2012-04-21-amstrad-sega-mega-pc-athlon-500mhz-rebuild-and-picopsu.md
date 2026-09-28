---
title: "Amstrad (Sega) Mega PC, Athlon 500MHz Rebuild and PicoPSU"
author: "Nix McRetro"
date: 2012-04-21T11:39:33.000+10:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

![The Amstrad Mega PC](/assets/images/2012/img_0067a.jpg)

After loading Windows 95 to the Amstrad Mega PC, it is quite clear that it will not be a good choice to leave it running like a broken down horse-drawn buggy. So poking around the internet Windows 3.11 is the perfect choice. Lightweight and can be modified to act like a more modern Windows OS. Enter [Calmira](http://www.calmira.de/).

Found this while hunting down a copy of Counterpoint (Amstrad's OS for the Mega PC). Have a look at this [internet archive](https://web.archive.org/web/20080630223212/http://web.ukonline.co.uk/joe.gentile/Text/amstradCP.htm). Interestingly the download links were archived too. Looks like I'll be running Counterpoint Version 2.5 very soon along with a copy of MS-DOS 5 running underneath/in parallel.

![](/assets/images/2012/img_0067.jpg)

In other news, my side project The Athlon 500MHz Project came to life today. I was able to get the Athlon coupled with an ASUS K7V (Rev 1.01) to install Windows XP. Very happy with that result. Now I just need a rockin' case for it with some horns if possible. This particular CPU holds significant sentimental value - it was used in the first PC I put together as a teenager back in the year 2000. According to the warranty sticker on the CPU February 2000. I remember that day well. We were searching for a faster CPU but the entry level 500MHz was all they had. I was not leaving empty handed. The markings on this particular 500MHz Athlon appeared to identify a 650MHz-rated core, something that was also reported on some early Slot A 500MHz parts.

![](/assets/images/2012/img_0068.jpg)

I ran into some trouble with my BIOS though and breaking one of the many hard drive size limitations. I ended up using a drive overlay program like I did on the Mega PC though and it managed to get \*most\* of the 160GB of space. That's right, the good old 128GiB / 137GB limit caused by 28-bit LBA addressing. That is still well beyond the roughly 33GB limit I was hitting with the BIOS. I originally thought I could simply allocate the remaining space as another partition, but that does not bypass the 28-bit LBA limit. Access beyond roughly 128GiB / 137GB requires 48-bit LBA support through the relevant hardware, BIOS or driver path and operating system.

![](/assets/images/2012/img_0069.jpg)

![](/assets/images/2012/img_0070.jpg)

Another problem I came across was my Samsung 250GB that I pulled from an el cheapo PVR I had. It only recognises as 160GB instead of the 250GB on the label. Why it identified at the lower capacity was not established. It could have involved firmware, capacity limiting or configuration, but I did not investigate it far enough to determine the cause. Who cares! It works and it runs much quieter than my other PATA drives.

Tested the [PicoPSU](https://www.mini-box.com/picoPSU-80) that arrived from the US a few days back and it seems to work a charm. Unsure of what I will end up using it on. I am toying with the thought of getting the old Mega PC 386SX motherboard powered up and functional as a spare old PC. I'd just need a very small [Disk on Module](https://en.wikipedia.org/wiki/Disk_on_module), a safe replacement for the original rechargeable NiCad backup battery and the PicoPSU... perhaps! Ordinary non-rechargeable AA or AAA cells must not be connected directly to a charging circuit, so any external battery holder would need appropriate isolation or a compatible rechargeable battery arrangement.


### Sources

- [ASUS K7V motherboard manual](https://dlcdnet.asus.com/pub/ASUS/mb/slota/k7v/k7v-101.pdf) - documents support for Slot A AMD Athlon processors, including models up to 1GHz.
- [Seagate - Windows 137GB Capacity Barrier](https://www.seagate.com/support/kb/disc/tp/137gb.pdf) - explains the 28-bit LBA limit and the need for 48-bit addressing to access capacity beyond 137GB decimal.
- [Mini-Box - picoPSU-80](https://www.mini-box.com/picoPSU-80) - manufacturer specifications for the regulated 12V-input DC-DC ATX supply.
- [Duracell - Battery FAQ](https://duracell.com/faq) - warns that non-rechargeable batteries must not be recharged because they can leak or rupture.
