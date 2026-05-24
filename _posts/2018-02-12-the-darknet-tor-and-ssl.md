---
title: "The Darknet, Tor and SSL"
author: "Nix McRetro"
date: 2018-02-12T12:08:21.000+11:00
categories: [news]
---

![](/assets/images/2018/img_0621.jpg)

I love to tinker and with my website, I've been doing a whole lot of it over the past few weeks. First, I fixed all the broken links and images. Then I went through and cleaned up each post, which had become mangled from an import many eons ago. Finally, I got SSL working again through [Certbot](https://certbot.eff.org).

And now? I've got the darknet websites working again! I've established [RetroJunkie.net](https://retrojunkie.net) and its darknet mirror [mcretrorigsr7qag.onion](/) to be a landing page on what will one day be a bunch of websites coded by hand that will be viewable on very old hardware - think early versions of Netscape and Internet Explorer. Maybe not initial HTML1 but closer to HTML3.2. That'll put us smack bang in the mid-90s - which is fantastic!

It's also a great idea to dilute the darknet of scary websites as [Some Ordinary Gamers](https://www.youtube.com/user/SomeOrdinaryGamers) have shown us on their YouTube channel. Quite fun to configure at the very least! :D

If you want to know more about digital online anonymity and privacy, jump over to The Electronic Frontier Foundation with their [great write-up](https://www.eff.org/pages/tor-and-https) on how HTTPS and Tor work together to achieve just that.

I still need to see if I can get SSL enabled on onion sites, but I'll leave that for another day I think! ;)

**Edit:** [Scallion](https://github.com/lachesis/scallion) still seems to be the weapon of choice for vanity URLs for onion websites. It also turns out Tor already uses SSL in one form or another, so SSL certificates are not required. Cool! :D
