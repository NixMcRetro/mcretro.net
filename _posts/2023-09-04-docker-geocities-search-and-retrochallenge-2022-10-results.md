---
title: "Docker, GeoCities Search, and RetroChallenge 2022/10 Results"
author: "Nix McRetro"
date: 2023-09-04T14:57:22.000+10:00
categories: [hacks, news]
---

![](/assets/images/2023/img_1149.jpg)

Where to start with the last few days. Why not here! The [RetroChallenge 2022/10 results](https://www.retrochallenge.org/2023/09/rc202210-results.html) are in. Looks like I nabbed the **Grand Prize**. Not too bad.

![](/assets/images/2023/img_1150.jpg)

SuperNick also got a place, congratulations! SuperNick won the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au/) grand prize last year.

![](/assets/images/2023/img_1148.jpg)

That poor pumpkin Mac just can't catch a break.

![](/assets/images/2023/img_1146.jpg)

I honestly believe it deserved a place. I suppose as the grand prize winner, I can relinquish my title and hand it to the true winner - [Pendleton115](https://web.archive.org/web/20230904050034/http://pendleton115.net/). Why? Pumpkin Mac has more merch of course!

![](/assets/images/2023/img_1151.jpg)

On the topic of RetroChallenge 2022/10, where we looked to bend the GeoCities archive to our needs. I have been coincidentally trying to cook up the following. [Solr](https://solr.apache.org) + [Nutch](https://nutch.apache.org) + [Blacklight](https://projectblacklight.org) in a [Docker](https://www.docker.com) instance.

So far, from what I understand- Solr is the database. Nutch is the indexer. Project Blacklight will be the search box frontend exposed to the web. This will allow _**full-text searching**_ of the GeoCities Archive. And Docker? Well I've wanted to make GeoCities **_even more portable_** for a long while and now I've started making inroads.

![](/assets/images/2023/img_1147.jpg)

Above is a crippled Blacklight. Not quite functional yet. Search doesn't work and I lost the formatting... wait, was PHP even installed? Maybe that's it! This is why it is good to think out loud. 😆

Regardless, dockerising it has been proving a bit tricky, but fun. I am definitely making progress though. Do I have a Dockerfile? Why yes, I do have a Dockerfile. As far back as 2019 I have dreamed of making a Dockerfile. I've now made one and can confirm it is magical. It's quite hacky of course, but that's generally [the way I roll](/). 😎
