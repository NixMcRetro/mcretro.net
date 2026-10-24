---
title: "Drag Soldering a 29F032 TSOP Chip"
author: "Nix McRetro"
date: 2016-03-05T10:38:01.000+11:00
last_modified_at: 2026-10-18
categories: [guides, repairs, youtube]
---

{% include youtube.html id="w0vsgrKIE4E" %}

Have a fear of drag soldering or just want to see how it is done? Look no further! This educational video gives some pointers on how to get the job done properly. Well, how I went about it anyway, including a few things that didn't go quite according to plan.

We're working with AMD AM29F032B flash memory chips and some Type 2 adapter boards that allow them to be fitted into Super Nintendo cartridges. These are 32 Mbit flash devices, which is considerably more storage than you'd expect from some of the original SNES games. The chips I'd purchased appeared to be secondhand, probably pulled from other equipment, but that's not necessarily a problem if they still work.

Would you just look at the size of the TSOP40 pin pitch, 0.5 mm, that's tiny! The legs on a DIP40 chip have a pin pitch of 2.54 mm, just over five times wider. Getting all those little legs lined up on their corresponding pads is half the battle, particularly when you're trying to do it on camera.

For this exercise I've got the adapters, flash chips, no-clean flux paste, solder and desoldering braid ready to go. I'm using 0.8 mm solder, which isn't exactly microscopic compared with the spacing between the pins. Thankfully, a whole lot of flux makes the job rather more manageable, although it also creates an impressive mess.

The idea behind drag soldering is to tack the chip in place, apply flux and work the soldering iron along the row of leads. You don't need to create a beautiful individual solder joint on every pin with the first pass. Instead, the solder flows across the pins and pads, and the inevitable excess can be removed with braid afterwards.

And yes, I managed to create some magnificent solder bridges along the way. That's not particularly alarming by itself, provided you remove them and check the connections properly before trying to power anything. Desoldering braid is remarkably useful here, although it does get very hot. Ask me how I know!

I used Blu-Tack to hold the tiny board in place, which was perhaps not the greatest decision ever made. It became wonderfully sticky and stringy, and getting it off the board afterwards was an adventure of its own. Something rather more suitable for holding a PCB steady would have made the whole process less entertaining.

Once the flash chip was attached, I still needed to fit the adapter's through-hole pins and make the required connections. Some of the tracks needed to be bridged, and naturally I managed to lift a pad while filming the demonstration. I'd already made several of these adapters without that happening, so of course the one I chose to record had to be different!

Rather than pretending the damaged pad never existed, I repaired the connection using a short piece of insulated wire. It wasn't the neatest thing on the board, but it gave me a way to restore the intended connection without putting even more heat into the damaged area. The last thing I wanted was to lift another pad while fixing the first one.

By the end of the recording the adapter was assembled, and the next useful check would be to put it through the programmer. I've got a Wellon VP390 and a custom TSOP adapter arrangement for that sort of testing. A chip looking nicely soldered doesn't prove every connection is sound, so the programming and verification stage still matters.

This is a long video, but I thought it was worth leaving the detail in for anyone who wants to see what the process actually looks like, mistakes included. If you're going to make your own SNES flash cartridges you'll also need the appropriate donor cartridge and correct wiring for the ROM you're replacing. One little TSOP adapter is only part of the adventure!

**Related Posts**

- [ROM Hacking Super Mario World (USA) with MIX4AAE](/rom-hacking-super-mario-world-usa-with-mix4aae/)
