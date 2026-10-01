---
title: "Mac Web Browsers from the 90s and HTTP/0.9"
author: "Nix McRetro"
date: 2023-05-30T21:26:09.000+10:00
categories: [ibm-pc, youtube]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="Wn0RECnBTg8" %}

Here I was thinking I had an 11 minute voiceover but I misread the timeline. I'll never use a script, I'm too lazy. Enjoy my half-completed thoughts above. You'll work it out. The protocol I was wrestling with was HTTP/0.9, not "HTML/0.9". HTML is the document format; HTTP is the protocol carrying it. The following issues we encountered are in no particular order - it adds to the fun! 😉

![](/assets/images/2023/img_1016.jpg)

Let's start with the innocent [NCSA Mosaic](https://en.wikipedia.org/wiki/NCSA_Mosaic). At this stage we were running on a [Macintosh Classic](https://web.archive.org/web/20210304075849/https://support.apple.com/kb/SP198?locale=en_US). The splash screen works well.

![](/assets/images/2023/img_1015.jpg)

We even made it to the [RetroJunkie homepage](https://retrojunkie.net)!

![](/assets/images/2023/img_1014.jpg)

Like anything running way beyond what it was designed for, it crashed a good amount. Of course there's no memory protection so Mac OS went down with it forcing a slow restart.

![](/assets/images/2023/img_1013.jpg)

We ruled out Mosaic due to the crashes and really dated HTML support. Next up we had [MacWeb by Tradewave](https://en.wikipedia.org/wiki/MacWeb). And can I say, it actually worked OK for our purposes. There is a patched version, 2.0c, that has some tweaks for black and white Macs even. Unfortunately, I picked the French localisation.

![](/assets/images/2023/img_1009.jpg)

Forbidden address. Ahhh yes. I believe this was caused by Cloudflare doing something... what exactly - I can't remember! But I was able to get it by accessing retrojunkie.net or the IP retrojunkie.net was hosted at. It's the catch-all site in case anyone strays to my server's IP address.

![](/assets/images/2023/img_1018.jpg)

So I resorted to telnet, which is very old-internet friendly as long as you type the request correctly. A true HTTP/0.9 request is just a one-line `GET` request with no HTTP version token or request headers. Throwing modern expectations, name-based virtual hosting and Cloudflare into the path made this a lot less simple than it sounds. HTTP/0.9 has no `Host` header, so it cannot select between name-based virtual hosts. I messed with the proxy settings a bit more, possibly disabling Cloudflare completely for testing and...

![](/assets/images/2023/img_1019.jpg)

Telnet successfully gets the root! By this point I'd opted to mess with the GeoCities subdomain. Now what about a web browser?

![](/assets/images/2023/img_1020.jpg)

One IP address, one resolved website. That means these would now load on older browsers.

![](/assets/images/2023/img_1010.jpg)

I only had Netscape 1.0 on hand in Windows via the MiSTer and a dial-up modem... as one does. But the IP address now resolves. Let's test with the retrojunkie.net domain name...

![](/assets/images/2023/img_1012.jpg)

And it works a charm.

![](/assets/images/2023/img_1011.jpg)

Well close enough to a charm. Especially given "charset-UTF-8" wasn't yet the rage and ISO-8859-1 would rule supreme for a while longer.

`sudo tail -f /var/log/apache2/access.log`

Tailing the Apache2 access log shows us:

![](/assets/images/2023/img_1021.jpg)

MacWeb/F2.0 uses libwww/2.17 - There's that F for French again...

![](/assets/images/2023/img_1022.jpg)

MacMosaicB6 uses libwww2.09 - MacMosaicB6 is any pre-2.0 version. In our case 1.0.3.

![](/assets/images/2023/img_1017.jpg)

And our Windows Mozilla 1.0, unsurprisingly perhaps, uses Mozilla/1.0 (Windows).

What's perhaps most interesting in these examples is the request protocol recorded by Apache. The old clients were reaching the server as HTTP/1.0. A real HTTP/0.9 request would just be a one-line `GET /path` with no HTTP version token and no request headers. Apache was not detecting an "HTML version" here at all; I had been mixing up the page format with the transport protocol.

This also corrects my earlier [Macintosh Classic, RaSCSI and The Internet](/macintosh-classic-rascsi-and-the-internet/) theory that the browsers were failing because they only supported HTTP/0.9. That conclusion did not survive testing, which is exactly why documenting the wrong turns is useful.

### Sources

Here's some of the pages I followed to get this to work, a big thanks to each of the authors!
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP)
- [https://metalbabble.wordpress.com/2020/02/08/the-final-frontier-connecting-a-macintosh-se-to-the-internet-with-a-raspberry-pi/](https://metalbabble.wordpress.com/2020/02/08/the-final-frontier-connecting-a-macintosh-se-to-the-internet-with-a-raspberry-pi/)
- [http://www.mirrorservice.org/sites/browsers.evolt.org/browsers/macweb/macweb.htm](http://www.mirrorservice.org/sites/browsers.evolt.org/browsers/macweb/macweb.htm)
- [http://www.kafsemo.org/2015/01/03_talking-HTTP-0.9%2C1.0%2C1.1.html](http://www.kafsemo.org/2015/01/03_talking-HTTP-0.9%2C1.0%2C1.1.html)
- [http://www.tobymackenzie.com/blog/2018/02/18/supporting-http-0-9/](http://www.tobymackenzie.com/blog/2018/02/18/supporting-http-0-9)
- [https://datatracker.ietf.org/doc/html/rfc7230#appendix-A.2](https://datatracker.ietf.org/doc/html/rfc7230#appendix-A.2)
