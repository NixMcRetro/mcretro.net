---
title: "GQ-4X EEPROM and EPROM Programmer Test"
author: "Nix McRetro"
date: 2012-11-17T01:12:50.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, programming, sega]
---


{% include youtube.html id="GdxYQdxYE5g" %}

Received my new GQ-4X EEPROM programmer from Canada. It's USB based, which saves me dragging out a computer with a parallel port every time I want to program something. Naturally I forgot the 16-bit adapter board, but there are plenty of other chips to experiment with in the meantime.

I started with a collection of ROM chips I'd pulled from old modems. The software lets me select the chip by its part number and shows exactly how it should sit in the socket, which is rather useful when I manage to put the first one in backwards. Thankfully I caught that before doing anything particularly exciting.

The first read worked! Rockwell appeared amongst the data, so it looks like I'd successfully dumped a ROM from one of those old modem boards. An AMD AM27C256 was next, followed by another chip that also turned out to contain Rockwell data. Apparently I'd collected quite a few modem ROMs over the years.

For something more interesting, I pulled the BIOS chip from my Amstrad Sega Mega PC 386SX. Underneath the label was an AMD AM27C512, which the GQ-4X recognised without requiring an adapter. I read the contents and saved a backup, ready for the day I might need to program a replacement.

The next experiment was a little more ambitious. I wanted to read, erase and reprogram an Award BIOS EPROM from an old PC motherboard, then see whether the computer would still start afterwards. This would be my first proper attempt at flashing one of these chips.

After saving and verifying the original contents, I removed the old adhesive from the EPROM's quartz window and placed it in my ultraviolet eraser. The window allows the ultraviolet light to erase the stored contents, ready for programming again. I gave it around ten minutes before putting it back in the programmer.

It worked! The GQ-4X reported that the chip was blank, so I loaded the saved BIOS image and programmed it again. Another read looked promising, but the real test would be putting it back into the motherboard.

Best of all, the PC started again with the reprogrammed BIOS. The motherboard still had its own problems, including a keyboard connection affected by battery corrosion, but I'd successfully erased and restored the BIOS chip. Not bad for my first proper attempt!

I'd originally assumed that higher-voltage writes would require the external DC supply, but that isn't quite how the GQ-4X works. The programmer generates its own programming voltages, and USB power alone was enough for the chips I tested. The external supply is mainly useful when the USB connection cannot provide enough power, such as through an unpowered hub.

MCUmall specifies a centre-positive 2.1 mm supply at 9 V and at least 200 mA when external power is required. I did have a spare Mega Drive power supply nearby, but the polarity was wrong. Scissors anyone? Don't worry, they're third-party adapters. The programmer's power connection is one place where I'll be checking everything with a multimeter first.

Eventually I want to use this for Dreamcast and Saturn BIOS work, region modifications, prototype preservation and dumping chips from various boards. After today's experiments, it looks like this could become a very useful little machine.

[This is the list](http://www.mcumall.com/comersus/store/mcumall_TrueUSBWillemsupportICs.asp) of compatible chips with the GQ-4X Programmer. Sure are a lot on there... and here's where to [download](http://www.mcumall.com/comersus/store/mcumall_download.asp) the drivers and software to run the GQ-4X.

**Sources**

- [MCUmall - GQ USB Universal Programmer User Guide, revision 4.11](https://www.mcumall.com/download/TrueUSBWillem/GQ_USB_User_Guide.PDF) - the September 2015 guide covers GQ-2X, GQ-3X and GQ-4X; pages 5-6 describe USB power and the 9 V, at-least-200 mA, centre-positive 2.1 mm external supply.
