---
title: "Macintosh Classic, RaSCSI and The Internet"
author: "Nix McRetro"
date: 2022-04-26T01:25:17.000+10:00
categories: [apple, hacks, repairs]
---

{% include youtube.html id="hO2O4d3ZtaI" %}

A Macintosh Classic! What a great platform to test [GeoCities](http://geocities.mcretro.net). No, just no. Stop right there. No way. Let's dig a little deeper. Perhaps some background would help. First came the Macintosh Plus (Jan 1986 - Oct 1990). The Macintosh Classic (Oct 1990 - Sept 1992) followed on from there. Both were powered by Motorola 68000s at 8MHz with up to 4MB of RAM.

![](/assets/images/2022/img_0926.jpg)

This machine has had the internal hard drive upgraded to a [RaSCSI](https://github.com/akuker/RASCSI) using PCB v2.3. There's a little bit of an unaddressed voltage drop happening that **_probably_** won't be an issue so we'll just ignore the video above with the [lack of red LED](https://raspberrypi.stackexchange.com/questions/51615/raspberry-pi-power-limitations).

 

> If the Red Power LED is not illuminated this means the supply voltage is inadequate. (The newer Pi have a well engineered power circuit, and may continue to function even if the input voltage is below spec; the same may not be true of peripherals).

This tech is not ready for mid-late 1990s internet. I just didn't realise just how incompatible early 1990s internet was! When setting up my web server I tried to make [GeoCities](http://geocities.mcretro.net), [RetroJunkie.net](http://retrojunkie.net) and even my [files archive](http://files.mcretro.net) as simple as possible to avoid issues. It all seems to have boiled down to old browsers missing something. Then it hit me! They all had HTTP/0.9 support but probably nothing more recent.

![](/assets/images/2022/img_0939.jpg)

HTTP/1.0 and HTTP/1.1 are way past cool in my book. Look at this crazy mapping of the internet standards history by Cloudflare.

![](/assets/images/2022/img_0938.jpg)

At least that was the theory. HTTP/0.9 only supports GET. That's not enough in the modern worked (~1996 onward) I tried some websites I thought **_should_** have worked.

![](/assets/images/2022/img_0927.jpg)

![](/assets/images/2022/img_0928.jpg)

But nothing. To try and rule out a browser issue I tried a couple of different browsers. TradeWeb MacWeb F2.0 (Turns out the F is for French...) and NCSA Mosaic 1.0.3. No dice. I am a little limited on what can run in System 7.5.x with only 4MB of RAM. iCab 2.9.9 needs at least 3.9MB to run. That used to work great on [my old LC 475](/apple-macintosh-lc-475-internet-ready/).

I hit up a relatively simple site (google.com) which I believed was supposed to pass through MacProxy, a part of the RaSCSI software bundle. Looking back now, maybe the MacProxy wasn't working properly as the results were the same on my Windows 98 installation.

![](/assets/images/2022/img_0936.jpg)

MacWeb 2.0 (French) doesn't really like it.

![](/assets/images/2022/img_0937.jpg)

Neither does Mosaic 1.0.3. At least they are giving similar results but I had to test elsewhere to confirm whether it was HTTP/0.9 causing issues. When I got home I jumped onto the information superhighway.

![](/assets/images/2022/img_0929.jpg)

And using Internet Explorer 5.0 grabbed Mosaic 1.0 from [my file server](http://files.mcretro.net).

![](/assets/images/2022/img_0930.jpg)

Not the slowest download I've had. A couple of minutes later I was able to load up the same websites at home in Windows 98.

![](/assets/images/2022/img_0931.jpg)

![](/assets/images/2022/img_0932.jpg)

![](/assets/images/2022/img_0933.jpg)

And it seems that [retrojunkie.net](http://retrojunkie.net), [files.mcretro.net](http://files.mcretro.net) and [google.com](http://google.com) were all giving the same errors. We'll try another browser again, shall we?

![](/assets/images/2022/img_0934.jpg)

![](/assets/images/2022/img_0935.jpg)

Netscape 1.0 doesn't want to play nice either. I'm putting this down to older browsers only supporting HTTP/0.9. Feel free to prove me otherwise.

![](/assets/images/2022/img_0925.jpg)

While it would be nice to be able to do things on a 68000 powered Mac, we're just not ready for it yet. Stick with a faster classic Mac like the LC475 for a true internet experience. Leave the early 1990s for bulletin boards! :)

**References:** [https://ia600503.us.archive.org/21/items/macweb-evolt_browsers/macweb.htm](https://ia600503.us.archive.org/21/items/macweb-evolt_browsers/macweb.htm) [https://browsers.evolt.org/browsers/archive/macweb](https://browsers.evolt.org/browsers/archive/macweb) [https://browsers.evolt.org/browsers/archive/macweb/1.1.1E/](https://browsers.evolt.org/browsers/archive/macweb/1.1.1E/) [https://browsers.evolt.org/browsers/archive/macweb/2.0/](https://browsers.evolt.org/browsers/archive/macweb/2.0/) [https://browsers.evolt.org/browsers/archive/macweb/0.98a/](https://browsers.evolt.org/browsers/archive/macweb/0.98a/) [https://www.angelfire.com/mac/68kmacrevival/68kdownloads.html](https://www.angelfire.com/mac/68kmacrevival/68kdownloads.html) [https://web.archive.org/web/20010406030443/http://www.sjoki.uta.fi/~shmhav/68000.txt](https://web.archive.org/web/20010406030443/http://www.sjoki.uta.fi/~shmhav/68000.txt) [https://www.jagshouse.com/classicinternet.html](https://www.jagshouse.com/classicinternet.html) [https://vintageapple.org/gamba2/browsers.html](https://vintageapple.org/gamba2/browsers.html)
