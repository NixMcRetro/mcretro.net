---
title: "GeoCities Archive Retired, Dockerisation Abandoned"
author: "Nix McRetro"
date: 2023-10-24T04:48:06.000+11:00
categories: [news]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2023/img_1180.jpg)

There's something about waking up at 3am every morning that just gives you that extra bit of time to blog. Today we're touching on what happened to my [GeoCities Archive](/homepages/geocities). A while back I had an idea to dockerise my Apache-based web server.

![](/assets/images/2023/img_1181.jpg)

There wasn't much point in having a dedicated piece of hardware when I could just use Docker Desktop on one of my other computers. I began to put pen to paper in early September. I could merge a better version of the GeoCities Archive, make it use a Mac OS native filesystem such as APFS.

![](/assets/images/2023/img_1182.jpg)

I rsynced my data with a little help from [Jon](http://damntechnology.blogspot.com/2010/09/how-to-disassemble-and-clean-game-watch.html) and it was all looking good. Until I realised how much smut and gore was in the archive. In the material I kept stumbling across, a lot of it appeared to date from after Yahoo!'s acquisition of GeoCities in May 1999. That is an observation from what I was finding in this copy of the archive, not a claim about GeoCities as a whole.

This posed a very big problem for me. While [Cloudflare's CSAM implementation](https://blog.cloudflare.com/the-csam-scanning-tool/) helped with one very specific category, it could not solve the broader moderation problem. The tool compared cached images against hashes of known CSAM. It was not a general pornography, gore or GeoCities ToS scanner, so everything else still needed some other way of being found.

Sure, I could manually search for pornography and gore based on filename but I was finding that only had a discovery rate of 5-10%. Plus I had to look at these sites to assess whether they were worth keeping.

![](/assets/images/2023/img_1183.jpg)

In most cases, they were not worth keeping and I made the decision to pull the plug. Only a few days ago, I reverted back to the Raspberry Pi setup without the GeoCities Archive. I also trimmed away [Sci-Fi](/) and [Assembler Games](/). If I remove GeoCities, I can also remove the blade hard drive from the web server.

![](/assets/images/2023/img_1179.jpg)

The good news? Material I found that appeared to violate the original GeoCities ToS was reported to [archive.org](https://archive.org) for review and possible removal. I just hope they do actually purge all the questionable content I had to sift through. It was nice knowing you GeoCities, but perhaps you are best left in the past - in our memories. 🥲

### Sources

- [Yahoo! - GeoCities acquisition closing filing](https://www.sec.gov/Archives/edgar/data/1011006/000091205799005431/0000912057-99-005431-d2.html)
- [Cloudflare - An update to our CSAM scanning tool](https://blog.cloudflare.com/a-simpler-path-to-a-safer-internet-an-update-to-our-csam-scanning-tool/)
