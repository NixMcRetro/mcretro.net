---
title: "Xbox DVT4 Running UnleashX"
author: "Nix McRetro"
date: 2019-11-24T18:38:42.000+11:00
last_modified_at: 2026-10-22
categories: [devkit, microsoft, youtube]
---

{% include youtube.html id="auBZlw0l5qw" %}

Sometimes I leave the raw footage for these videos sitting on my computer way too long. This DVT4 series dates back to early 2019 and, by the time I edited it, I couldn't remember what half of the clips were supposed to demonstrate.

This one is a perfect example. I originally called this "booting signed code" and rambled about the DVT4's "game developerness", but UnleashX is homebrew rather than retail-signed Xbox software. Whatever I had in mind, I'm pretty sure getting UnleashX running on the DVT4 is a win!

With XDK 5933 installed, I wanted to get UnleashX running on the development kit. Unfortunately, copying it across wasn't quite enough. The console wasn't particularly interested in launching it, so there was obviously another step I'd managed to overlook.

I fired up Xbox Neighborhood under Windows 7 and started moving some files around. Unfortunately, Neighborhood was having a wonderful time freezing, crashing and generally refusing to cooperate. At least I was getting plenty of practice opening new windows!

Eventually I discovered that I'd put one of the necessary files in the wrong location. A closer look at the instructions, a little more copying and another reboot later, UnleashX finally appeared. Success!

I also switched the network configuration over to DHCP so the console could obtain an IP address. That would make transferring files over FTP rather more convenient, especially since Xbox Neighborhood wasn't exactly winning any reliability awards.

Next up, we'll investigate the extra storage available on that 120 GB SSD and see whether we can get a few games running.

### Related posts

- [Xbox DVT4 Network Update (XDK 5933)](/xbox-dvt4-network-update-xdk-5849-5933/)
- [Xbox DVT4 XBpartitioner and Game Demos](/xbox-dvt4-xbpartitioner-and-game-demos/)
