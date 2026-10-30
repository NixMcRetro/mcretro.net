---
title: "Microsoft Xbox OG Kasumi Blue TSOP Preparation"
author: "Nix McRetro"
date: 2020-09-05T09:05:55.000+10:00
categories: [microsoft, repairs, youtube]
last_modified_at: 2026-10-18
---


{% include youtube.html id="PNxVdTTalqQ" %}

Oh my lovely Kasumi Blue, we have long since parted ways but fond memories still remain. In this video I'm having another look inside the console, preparing the motherboard for TSOP flashing and sorting out its power supply. It's a beautiful limited-edition Xbox, although the hardware inside has a few surprises.

This particular console has a v1.0 motherboard fitted inside the much later Kasumi Blue shell. Whether it left Microsoft like that or somebody swapped the board before I got it, I don't know! The earlier motherboard has a flashable onboard TSOP, unlike the later v1.6 hardware, so there are a few interesting things we can do with it.

The first job was preparing the TSOP write-enable connections. I followed an existing guide and worked on the small solder points around the motherboard, including the area marked 7R3. One of the joints took a little more fiddling than expected, but eventually I had the bridges in place. A quick cleanup with isopropyl alcohol finished that part of the job.

That gets the board ready for flashing, although the actual BIOS flashing isn't shown in this video. Before worrying about that, I wanted to get the whole console assembled and running properly.

I also swapped in a power supply compatible with this motherboard and Australian mains. I've never been particularly fond of step-up/down transformers, and having the right internal supply makes the machine a little nicer to use. It does need to match the Xbox motherboard revision, though, since the different power-supply arrangements aren't all interchangeable.

With the power supply and motherboard connected, I attempted the first boot. Initially the console wasn't particularly happy, and I got an error indication while the drive hardware was still disconnected. The fan was making quite a racket too. Once I had more of the machine reassembled, things became considerably more encouraging.

Eventually the Xbox made it to the dashboard, although everything was in Japanese. That fits with the motherboard's apparent origin, and I could still recognise enough of the menus to have a look around. The original Seagate hard drive was installed, along with an early Thomson TGM600 DVD drive that managed to eject properly.

The disc drive made some interesting noises during operation, but at least the console was now starting. That leaves the software modifications and any further testing for another day. I'm quite pleased to have the Kasumi Blue running again.

In other news, not much else is happening. I'm *still* mulling over whether to bother with university again or whether I just fold and give in. I figure I might as well try transferring away from my old uni to a new local one at least. If they reject the application and my five first preferences fail, it's game over I think.

That said, if I do manage to transfer down here with a bit of luck I'll have some recognition of prior learning (RPL). This should make me have to do less of the same courses again. Naturally though, you don't get to know how much credit you'll get between courses until *after* you've accepted the offer at a particular institution. Oh well, time will tell!

**Sources**

- [ConsoleMods Wiki - Xbox Versions](https://consolemods.org/wiki/Xbox%3AVersions)
- [XboxDevWiki - Power Supply](https://xboxdevwiki.net/Power_Supply)

**Related Posts**

- [Microsoft Xbox OG Kasumi Blue Clock Capacitor Removed](/microsoft-xbox-og-kasumi-blue-clock-capacitor-removed/)
- [The Jewel of the Xbox](/the-jewel-of-the-xbox/)
