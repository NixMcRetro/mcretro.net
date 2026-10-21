---
title: "XBOX (Original) Softmod Recovery"
author: "Nix McRetro"
date: 2013-05-26T04:08:57.000+10:00
last_modified_at: 2026-10-22
categories: [hacks, microsoft, youtube]
---

{% include youtube.html id="F0NbBUJh2kc" %}

This guide is by no means complete but might have some hints if you are stuck like I was. Soooo errr the Xbox was softmodded before I started tinkering. I attempted to TSOP flash the Winbond BIOS flash chip and broke the softmod completely. Whoops!

The original dashboard has more or less disappeared, so it's time to see if we can put everything back together again. For this little adventure I've got an old PC running Windows XP Service Pack 3 sitting alongside the Xbox.

I'm using **Ndure 3.1**, **XboxHDM 1.9**, an updated Ndure script and **ISO Recorder 2**. The idea is to build a bootable CD containing the files needed to get the Xbox hard drive back into a usable state.

### Getting everything ready

The first thing worth knowing is your Xbox kernel version. Mine is `5101`, but yours could be completely different. Normally you can find this information through the original Microsoft dashboard. Of course, if you've already managed to destroy the dashboard, that becomes a little more interesting!

After selecting the appropriate options in Ndure, I put together the XboxHDM files and created a bootable ISO. Then it's onto burning the CD and persuading the old PC to cooperate.

The computer I'm using is also one of my Hackintosh experiments, capable of running Mac OS X 10.4. Today it gets to run Windows XP and repair an Xbox. Such a versatile old beast!

### The hard drive adventure

The troublesome part is getting access to the original Xbox hard drive. It's normally locked to the console, so simply removing it and plugging it into another computer doesn't necessarily get you anywhere.

In the recording I'm attempting a hot-swap, with the Xbox and PC powered up and the drive transferred at just the right moment. Not a particularly friendly procedure, and certainly not something I'd recommend trying without understanding the risks. Getting it wrong could make an already troublesome situation considerably worse.

I also disconnected the PC's other hard drives to avoid accidentally modifying the wrong disk. Imagine finally fixing the Xbox only to discover you've wiped your main computer. That would be a tremendous achievement!

The timing is where things get really exciting. Between the Xbox, the PC, the CD drive and switching inputs on the monitor, there are quite a few things to juggle. Then I discover my USB keyboard isn't behaving properly during boot, so out comes a PS/2 keyboard.

Unfortunately, the PS/2 keyboard cable is considerably shorter. Of course it is.

After all that messing around, it's back to XboxHDM and trying to work out what the hard drive is doing. You can watch the whole process unfold in the video, including the parts where things don't quite cooperate.

Here are half of the notes I kept along the way, the rest were lost in a feverish attempt to get the darned thing working before the weekend was over. If you have the EEPROM backed up, or have recorded the hard drive unlock password, you'll be in a much better position either way.

Just keep at it and never give up. I didn't! ;)

### Related posts

- [Original Xbox Softmod to TSOP Flash Project](/original-xbox-softmod-to-tsop-flash-project/)
- [Original Xbox TSOP Flash Overview](/xbox-original-tsop-flash-overview/)

### Sources

- [XboxDevWiki - EEPROM](https://xboxdevwiki.net/EEPROM)
- [ConsoleMods Wiki - Xbox Drive Locking](https://consolemods.org/wiki/Xbox:Drive_Locking)
- [ConsoleMods Wiki - Xbox TSOP Flashing](https://consolemods.org/wiki/Xbox:TSOP_Flashing)
