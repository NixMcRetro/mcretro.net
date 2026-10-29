---
title: "Xbox (Original) Softmod Recovery"
author: "Nix McRetro"
date: 2013-05-26T04:08:57.000+10:00
last_modified_at: 2026-10-22
categories: [hacks, microsoft, youtube]
---

{% include youtube.html id="F0NbBUJh2kc" %}

This guide is by no means complete but might have some hints if you are stuck like I was. Soooo errr the Xbox was softmodded before I started tinkering. I attempted to TSOP flash the Winbond BIOS flash chip and broke the softmod completely. Whoops!

The original dashboard has more or less disappeared, so it's time to see if we can put everything back together again. For this little adventure I've got an old PC running Windows XP Service Pack 3 sitting alongside the Xbox.

I'm using **Ndure 3.1**, **XboxHDM 1.9**, an updated Ndure script and **ISO Recorder 2**. The idea is to build a bootable CD containing the files needed to get the Xbox hard drive back into a usable state.

**Getting Everything Ready**

The first thing worth knowing is your Xbox kernel version. Mine is `5101`, but yours could be completely different. Normally you can find this information through the original Microsoft dashboard. Of course, if you've already managed to destroy the dashboard, that becomes a little more interesting!

After selecting the appropriate options in Ndure, I put together the XboxHDM files and created a bootable ISO. Then it's onto burning the CD and persuading the old PC to cooperate.

The generated files need to end up in the correct Linux directory before running the script that assembles the disc image. There are quite a few folders inside folders here, which is a lovely way to make a simple job confusing.

The computer I'm using is also one of my Hackintosh experiments, capable of running Mac OS X 10.4. Today it gets to run Windows XP and repair an Xbox. Such a versatile old beast!

There's also the little matter of the optical drive configuration. The PC's CD drive is connected using parallel ATA, and I had to pay attention to which device was configured as master or slave. I'd much rather work that out before switching everything on than discover the arrangement is wrong halfway through the process.

**The Hard Drive Adventure**

The troublesome part is getting access to the original Xbox hard drive. It's normally locked to the console, so simply removing it and plugging it into another computer doesn't necessarily get you anywhere.

In the recording I'm attempting a hot-swap, with the Xbox and PC powered up and the drive transferred at just the right moment. Not a particularly friendly procedure, and certainly not something I'd recommend trying without understanding the risks. Getting it wrong could make an already troublesome situation considerably worse.

I also disconnected the PC's other hard drives to avoid accidentally modifying the wrong disk. Imagine finally fixing the Xbox only to discover you've wiped your main computer. That would be a tremendous achievement!

The timing is where things get really exciting. Between the Xbox, the PC, the CD drive and switching inputs on the monitor, there are quite a few things to juggle. Then I discover my USB keyboard isn't behaving properly during boot, so out comes a PS/2 keyboard.

Unfortunately, the PS/2 keyboard cable is considerably shorter. Of course it is.

With everything connected, I kept trying to catch the correct point in the boot process. The Xbox needed to unlock its drive while the computer was still ready to detect it. That meant a great deal of switching between the machines, pausing, unpausing and hoping I hadn't missed the moment. I was beginning to think this would be take number 73.

At one stage XboxHDM reported that it couldn't find an Xbox partition table, while another screen gave me some confusing messages about the drive's lock state. So the procedure certainly wasn't cooperating immediately. That also means this recording shouldn't be mistaken for a guaranteed recipe for recovering every Xbox.

After all that messing around, it's back to XboxHDM and trying to work out what the hard drive is doing. You can watch the whole process unfold in the video, including the parts where things don't quite cooperate.

Here are half of the notes I kept along the way, the rest were lost in a feverish attempt to get the darned thing working before the weekend was over. If you have the EEPROM backed up, or have recorded the hard drive unlock password, you'll be in a much better position either way.

Just keep at it and never give up. I didn't! ;)

**Related Posts**

- [Original Xbox Softmod to TSOP Flash Project](/original-xbox-softmod-to-tsop-flash-project/)
- [Original Xbox TSOP Flash Overview](/xbox-original-tsop-flash-overview/)

**Sources**

- [XboxDevWiki - EEPROM](https://xboxdevwiki.net/EEPROM)
- [ConsoleMods Wiki - Xbox Drive Locking](https://consolemods.org/wiki/Xbox:Drive_Locking)
- [ConsoleMods Wiki - Xbox TSOP Flashing](https://consolemods.org/wiki/Xbox:TSOP_Flashing)
