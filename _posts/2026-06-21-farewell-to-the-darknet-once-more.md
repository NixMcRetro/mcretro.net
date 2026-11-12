---
title: "Farewell to the Darknet... Once More!"
author: "Nix McRetro"
date: 2026-06-21T12:00:00+10:00
categories: [news]
---

![A retro synthwave illustration of a Raspberry Pi web server shutdown, with a CRT screen listing retired Tor onion services and the words “The End of My Self-Hosted Web Server - A Final Farewell”.](/assets/images/2026/06/farewell-to-the-darknet-once-more/farewell-to-the-darknet-once-more-hero.jxl)

*Farewell to the self-hosted era - the Raspberry Pi web server, Tor onion services, and nine retired websites, all switched off on 31st May 2026.*
{: .media-caption }

Well, that's that then. On 31st May 2026, I permanently shut down my self-hosted web server, taking all nine of my Tor onion websites with it. I mentioned back on 22nd May that the onions weren't going to survive the move to GitHub Pages, but now it's official. Farewell, darknet! 🧅

I've spent a rather ridiculous amount of time over the years configuring Apache, fiddling with virtual hosts, generating onion addresses and getting various websites to work on hardware that probably had better things to do. And for what? To host ordinary personal websites on the darknet, of course!

### How Did We Get Here?

Some of you might remember my [Take Back the Darknet](/take-back-the-darknet/) project from January 2016. I was experimenting with hosting websites through Tor using a Raspberry Pi, partly because it was interesting and partly because I liked the idea of putting perfectly ordinary websites somewhere people didn't necessarily expect to find them.

The darknet has a reputation for all sorts of peculiar things, but there's no reason it can't also be home to a website about a sausage dog or a rather Sonic the Hedgehog (SatAM) fan site. That was part of the appeal!

By 2018, I'd managed to get [RetroJunkie.net running on Tor again](/the-darknet-tor-and-ssl/), and in August 2019 I revisited the whole setup using version 3 onion addresses. These were the newer 56-character monsters, some with customised names that I spent time generating.

Because apparently a normal domain name just wasn't complicated enough.

In 2020, I even got Tor Browser's [Onion-Location feature](/onions-great-with-all-websites/) working. Instead of remembering an enormous address, visitors could follow a little purple notification to the onion version of a website from the clearnet version. Pretty neat! It also meant I could stop trying to remember which collection of seemingly random letters belonged to which site.

### Nine Onions, Please!

At the time of the shutdown, the network consisted of nine onion websites. Some were personal homepages, some were mirrors of existing sites, and others were part of my ongoing obsession with keeping bits of the old internet alive.

For posterity, here they are one last time:

- **Sonic the Hedgehog**  
  [http://sonicmfly4cagomgelwtd4hkbsopuhkahfprcvk5hwvb5i2c2q6s7iqd.onion](http://sonicmfly4cagomgelwtd4hkbsopuhkahfprcvk5hwvb5i2c2q6s7iqd.onion)
- **Space / Planets**  
  [http://spacewarpwv4jfef5um36c7bzofwrslnvky2lkgk2e3tqgvlzbwvbcyd.onion](http://spacewarpwv4jfef5um36c7bzofwrslnvky2lkgk2e3tqgvlzbwvbcyd.onion)
- **Frank the Snake**  
  [http://frank666vaq7j5kt7ek62urayao3ovmeqr3kiwiulshu32hkseuamuyd.onion](http://frank666vaq7j5kt7ek62urayao3ovmeqr3kiwiulshu32hkseuamuyd.onion)
- **Fish Tank World**  
  [http://fishnetski77aqzeo7trux7agla7mqb6jzw5r43mmdzkmjsmsdikodid.onion](http://fishnetski77aqzeo7trux7agla7mqb6jzw5r43mmdzkmjsmsdikodid.onion)
- **Channel Chirp**  
  [http://chirpysl54soda3vpws5erwcoh32cjky33xkrj4cr7fxbaia2cqhdnyd.onion](http://chirpysl54soda3vpws5erwcoh32cjky33xkrj4cr7fxbaia2cqhdnyd.onion)
- **Pepper the Dog**  
  [http://pepperfoxgryauwqd4llzyqyczdbi3gey67dm7ug7xhf7ponf5i65zyd.onion](http://pepperfoxgryauwqd4llzyqyczdbi3gey67dm7ug7xhf7ponf5i65zyd.onion)
- **RetroJunkie.net**  
  [http://retro56qdosu3zuisr5tiuh7ihpn6owzpwjwvs7djlweiqb3mcspahyd.onion](http://retro56qdosu3zuisr5tiuh7ihpn6owzpwjwvs7djlweiqb3mcspahyd.onion)
- **McRetro.net**  
  [http://mcretro4lov3ycyvikjdeer3dgl5wel5aer6xakj5mxa26a3qvrp22qd.onion](http://mcretro4lov3ycyvikjdeer3dgl5wel5aer6xakj5mxa26a3qvrp22qd.onion)
- **GeoCities Archive:**  
  [http://geocitiesllczuf44da2nj45jn3fntdjpw27ercfbhkrw3mnegti7pid.onion](http://geocitiesllczuf44da2nj45jn3fntdjpw27ercfbhkrw3mnegti7pid.onion)

Obviously, these addresses are no longer operational. I'm including them here for historical purposes, not because I expect anyone to actually load them.

I mean they were all my babies but now it is time to set them free as I embrace the power of GitHub Pages and potentially Cloudflare R2.

### Goodbye, Little Web Server!

The shutdown wasn't entirely out of the blue. Hosting from home had become increasingly difficult, and the website had already experienced plenty of downtime. Back on 18th May, I started rebuilding McRetro.net as a Markdown-based website using Jekyll and GitHub Pages.

I've moved websites between different machines, operating systems and publishing platforms more times than I care to remember. Raspberry Pis, Apache, WordPress, Debian, Ubuntu, an N100 NUC and various other bits of hardware have all had their turn. There was even a plan to Dockerise everything at one point, because apparently I hadn't made things complicated enough already.

This time, however, I wanted something that didn't depend on having my own web server running at home because 4G Home Internet doesn't cut it with only two bars of reception.

GitHub Pages seems to be doing the job quite nicely. The site is static, there's no MySQL database to worry about, and I'm no longer responsible for keeping the old web server connected to the internet. There are some limitations, of course, but so far I think the trade-off is worth it.

Unfortunately, that also means the onion websites have to go. GitHub Pages doesn't run Tor onion services for me, and I'm not particularly interested in setting up another machine solely to keep nine mirrors online.

Not right now, anyway. Famous last words...?

### What Happens to Everything Else?

The good news is that retiring the onion websites doesn't mean I want to forget about the websites themselves.

[McRetro.net](https://mcretro.net) is already being rebuilt, and [Channel Chirp](https://channelchirp.com) has its own little corner of the internet. I'd still like to keep working on the older personal homepages, especially Sonic, Frank, Pepper and the other oddities I've accumulated over the years.

The GeoCities project is a different story. I already [retired the public archive in 2023](/geocities-archive-retired-dockerisation-abandoned/) after encountering more problems than I was comfortable dealing with. There may still be worthwhile preservation work to do, but running that enormous archive as a public website isn't something I'm bringing back with this migration.

For now, the plan is to concentrate on the websites and material I can reasonably maintain, rather than having yet another server that needs constant attention. Such as my retro hardware photo gallery and file server perhaps.

### One Last Onion

I enjoyed tinkering with Tor, even when the configuration was being particularly uncooperative. There was something satisfying about getting an ordinary little website to load through an onion address, especially one that had no business being quite so complicated.

I don't regret building the network. It was a fun way to learn about web servers, networking, privacy technologies and an unreasonable number of Apache configuration files. I might even revisit some of it one day, although I think nine separate onion websites is probably enough for one lifetime.

So that's the end of the McRetro darknet network, at least for now. The server is off, the onions are gone, and I'm concentrating on getting the regular websites into shape.

Thanks to anyone who visited one of these strange little corners of the internet over the years. I hope you found something interesting, even if it was just a picture of a parrot.

Farewell, darknet. It's been fun! 🥲

### Sources

- [McRetro.net Changelog](/changelog.txt)
- [Tor Project: Onion Services](https://community.torproject.org/onion-services/)
- [Tor Project: Onion-Location](https://community.torproject.org/onion-services/advanced/onion-location/)

### Related Posts

- [Take Back the Darknet: The Complete 2016 Guide](/take-back-the-darknet/)
- [The Darknet, Tor and SSL](/the-darknet-tor-and-ssl/)
- [The Darknet Revisited](/the-darknet-revisited/)
- [Onions, Great with All Websites!](/onions-great-with-all-websites/)
- [GeoCities Archive Retired, Dockerisation Abandoned](/geocities-archive-retired-dockerisation-abandoned/)
