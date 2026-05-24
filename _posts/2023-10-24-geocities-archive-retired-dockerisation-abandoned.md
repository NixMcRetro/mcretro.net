---
title: "GeoCities Archive Retired, Dockerisation Abandoned"
author: "Nix McRetro"
date: 2023-10-24T04:48:06.000+11:00
categories: [news]
---

![](/assets/images/2023/img_1180.jpg)

There's something about waking up at 3am every morning that just gives you that extra bit of time to blog. Today we're touching on what happened to my [GeoCities Archive](http://geocities.mcretro.net). A while back I had an idea to dockerise my Apache-based web server.

![](/assets/images/2023/img_1181.jpg)

There wasn't much point in having a dedicated piece of hardware when I could just use Docker Desktop on one of my other computers. I began to put pen to paper in early September. I could merge a better version of the GeoCities Archive, make it use a Mac OS native filesystem such as APFS.

![](/assets/images/2023/img_1182.jpg)

I rsycned my data with a little help from [Jon](http://damntechnology.blogspot.com/2010/09/how-to-disassemble-and-clean-game-watch.html) and it was all looking good. Until I realised how much smut and gore was in the archive. What's interesting is most of it appears to be after Yahoo's purchase of GeoCities.

This posed a very big problem for me. While [Cloudflare's CSAM implementation](https://blog.cloudflare.com/the-csam-scanning-tool/) helped, it couldn't help me purge any user content that would have violated the original terms of service (ToS).

Sure, I could manually search for pornography and gore based on filename but I was finding that only had a discovery rate of 5-10%. Plus I had to look at these sites to assess whether they were worth keeping.

![](/assets/images/2023/img_1183.jpg)

In most cases, they were not worth keeping and I made the decision to pull the plug. Only a few days ago, I reverted back to the Raspberry Pi setup without the GeoCities Archive. I also trimmed away [Sci-Fi](http://scifi.mcretro.net) and [Assembler Games](http://assember.mcretro.net). If I remove GeoCities, I can also remove the blade hard drive from the web server.

![](/assets/images/2023/img_1179.jpg)

The good news? Any violations of the original ToS for GeoCities has been reported to [archive.org](https://archive.org) to purge. I just hope they do actually purge all the questionable content I had to sift through. It was nice knowing you GeoCities, but perhaps you are best left in the past - in our memories. 🥲
