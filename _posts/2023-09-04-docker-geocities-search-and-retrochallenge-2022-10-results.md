---
title: "Docker, GeoCities Search, and RetroChallenge 2022/10 Results"
author: "Nix McRetro"
date: 2023-09-04T14:57:22.000+10:00
categories: [hacks, news]
last_modified_at: 2026-10-12
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-12
  purpose: "fact-checking, sourcing, and editorial quality"
---

![](/assets/images/2023/img_1149.jpg)

Where to start with the last few days? Why not here! The [RetroChallenge 2022/10 results](https://www.retrochallenge.org/2023/09/rc202210-results.html) are in. Looks like I nabbed the **Grand Prize**. Not too bad.

![](/assets/images/2023/img_1150.jpg)

SuperNick (Nick) also got a place, congratulations! He won the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au/) grand prize last year.

![](/assets/images/2023/img_1148.jpg)

That poor pumpkin Mac just can't catch a break.

![](/assets/images/2023/img_1146.jpg)

I honestly believe it deserved a place. I suppose as the grand prize winner, I can relinquish my title and hand it to the true winner - [Pendleton115](https://web.archive.org/web/20230904050034/http://pendleton115.net/). Why? Pumpkin Mac has more merch of course!

![](/assets/images/2023/img_1151.jpg)

On the topic of RetroChallenge 2022/10, where we tried to bend the GeoCities archive to our needs, I've coincidentally been trying to cook up the following: [Solr](https://solr.apache.org) + [Nutch](https://nutch.apache.org) + [Blacklight](https://projectblacklight.org) in a [Docker](https://www.docker.com) setup.

So far, from what I understand: Solr is the search platform and index, Nutch is the web crawler feeding content into it, and Project Blacklight is the search frontend talking to Solr. This should allow _**full-text searching**_ of the GeoCities Archive. And Docker? Well I've wanted to make GeoCities **_even more portable_** for a long while and now I've started making inroads.

![](/assets/images/2023/img_1147.jpg)

Above is a crippled Blacklight. Not quite functional yet. Search doesn't work and I lost the formatting... wait, was PHP even installed? Maybe that's it! Nope. Blacklight is a Ruby on Rails application, so PHP was a complete red herring. This is why it is good to think out loud. 😆

Regardless, dockerising it has been tricky, but fun. I am definitely making progress though. Do I have a Dockerfile? Why yes, I do have a Dockerfile. I've dreamed of making one since 2019, and can now confirm it is magical. Quite hacky, of course, but that's generally [the way I roll](/). 😎


### Sources

- [Apache Solr Reference Guide](https://solr.apache.org/guide/solr/latest/index.html)
- [Apache Nutch](https://nutch.apache.org/)
- [Project Blacklight](https://projectblacklight.org/)

### Related posts

- [The GeoCities Archive Rebuild Blog](/the-geocities-archive-rebuild-blog/)
- [The GeoCities Archive Rebuild Goes Live](/the-geocities-archive-rebuild-goes-live/)
- [Multimeter, MiSTer and GeoCities](/multimeter-mister-and-geocities/)
- [The GeoCities Rebuild Worklog](/the-geocities-rebuild-worklog/)
- [Rebuilding GeoCities on macOS 12](/rebuilding-geocities-on-macos-12/)
- [RetroChallenge 2022/10 - GeoCities Rebuild on Dial-up at 14.4k](/retrochallenge-2022-10-geocities-rebuild-on-dial-up-at-14-4k/)
- [RetroChallenge 2022/10 - GeoCities Rebuild on Dial-up at 28.8k](/retrochallenge-2022-10-geocities-rebuild-on-dial-up-at-28-8k/)
- [GeoCities Downtime - WD Blue SA510 1TB WDS100T3B0B Failure](/geocities-downtime-wd-blue-sa510-1tb-wds100t3b0b-failure/)
- [Integrity and Extracting the GeoCities Archive - Rebuild V5](/integrity-and-extracting-the-geocities-archive-rebuild-v5/)
- [GeoCities Archive Retired, Dockerisation Abandoned](/geocities-archive-retired-dockerisation-abandoned/)
