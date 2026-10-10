---
title: "The Darknet, Tor and SSL"
author: "Nix McRetro"
date: 2018-02-12T12:08:21.000+11:00
categories: [news]
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
---

![](/assets/images/2018/img_0621.jpg)

I love to tinker and with my website, I've been doing a whole lot of it over the past few weeks. First, I fixed all the broken links and images. Then I went through and cleaned up each post, which had become mangled from an import many eons ago. Finally, I got SSL working again through [Certbot](https://certbot.eff.org).

And now? I've got the darknet websites working again! I've set up [RetroJunkie.net](https://web.archive.org/web/20180115202352/http://retrojunkie.net/) and its darknet mirror `mcretrorigsr7qag.onion` as a landing page for what will one day be a bunch of websites coded by hand and viewable on very old hardware - think early versions of Netscape and Internet Explorer. Maybe not initial HTML1 but closer to HTML3.2. That'll put us smack bang in the mid-90s - which is fantastic!

It's also a great idea to dilute the darknet of scary websites as [Some Ordinary Gamers](https://www.youtube.com/user/SomeOrdinaryGamers) have shown us on their YouTube channel. Quite fun to configure at the very least! :D

If you want to know more about digital online anonymity and privacy, jump over to The Electronic Frontier Foundation with their [great write-up](https://web.archive.org/web/20180109215502/https://www.eff.org/pages/tor-and-https) on how HTTPS and Tor work together to achieve just that.

I still need to see if I can get SSL enabled on onion sites, but I'll leave that for another day I think! ;)

**Later clarification:** I had the right practical conclusion for the wrong technical reason. Tor onion services do not "use SSL" underneath. The onion-service protocol already provides end-to-end encryption and authenticates the onion address, so an HTTPS certificate is not required merely to stop the Tor connection being plaintext. HTTPS can still be layered on top for other reasons.

The 16-character onion address I was using here was a version 2 onion address, which Tor retired in 2021. At the time, [Scallion](https://github.com/lachesis/scallion) still seemed to be the weapon of choice for vanity onion addresses. It generates those retired v2 addresses and is no longer a current recommendation.

This eventually continued in [The Darknet Revisited](/the-darknet-revisited/).

### Sources

- [Tor Project - Understanding and using onion services in Tor Browser](https://support.torproject.org/tor-browser/features/onion-services/)
- [Tor Project - Onion Service version 2 deprecation timeline](https://blog.torproject.org/v2-deprecation-timeline/)
